  await db.insert(corporatePartners).values(data);
}

export async function updateCorporatePartner(id: number, data: Partial<NewCorporatePartner>) {
  await db.update(corporatePartners).set(data).where(eq(corporatePartners.id, id));
}

export async function deleteCorporatePartner(id: number) {
  await db.delete(corporatePartners).where(eq(corporatePartners.id, id));
}

// ── Client portal access ─────────────────────────────────────────────────────

export async function getAllClientAccounts() {
  return db
    .select({
      id: clientAccounts.id,
      clientName: clientAccounts.clientName,
      username: clientAccounts.username,
      portalUrl: clientAccounts.portalUrl,
      portalKey: clientAccounts.portalKey,
      portalRole: clientAccounts.portalRole,
      isActive: clientAccounts.isActive,
      failedAttempts: clientAccounts.failedAttempts,
      lockedUntil: clientAccounts.lockedUntil,
      createdAt: clientAccounts.createdAt,
      updatedAt: clientAccounts.updatedAt,
    })
    .from(clientAccounts)
    .orderBy(asc(clientAccounts.clientName), asc(clientAccounts.id));
}

export async function getClientAccountByUsername(username: string) {
  const records = await db
    .select()
    .from(clientAccounts)
    .where(eq(clientAccounts.username, username))
    .limit(1);
  return records[0] ?? null;
}

export async function getClientAccountById(id: number) {
  const records = await db
    .select()
    .from(clientAccounts)
    .where(eq(clientAccounts.id, id))
    .limit(1);
  return records[0] ?? null;
}

export async function insertClientAccount(data: NewClientAccount) {
  await db.insert(clientAccounts).values(data);
}

export async function updateClientAccount(id: number, data: Partial<NewClientAccount>) {
  await db.update(clientAccounts).set(data).where(eq(clientAccounts.id, id));
}

export async function deleteClientAccount(id: number) {
  await db.delete(clientAccounts).where(eq(clientAccounts.id, id));
}

export async function recordFailedClientLogin(id: number, previousAttempts: number) {
  const failedAttempts = previousAttempts + 1;
  const lockedUntil =
    failedAttempts >= 5 ? Date.now() + 15 * 60 * 1000 : null;
  await updateClientAccount(id, { failedAttempts, lockedUntil, updatedAt: Date.now() });
}

export async function resetClientLoginAttempts(id: number) {
  await updateClientAccount(id, {
    failedAttempts: 0,
    lockedUntil: null,
    updatedAt: Date.now(),
  });
}

export async function createCentralAuthorizationCode(input: {
  clientAccountId: number;
  codeHash: string;
  portalKey: "darwish_hub" | "nabta_quest" | "training_server";
  expiresAt: number;
}) {
  await db.insert(centralAuthCodes).values({
    ...input,
    usedAt: null,
    createdAt: Date.now(),
  });
}

export async function consumeCentralAuthorizationCode(input: {
  codeHash: string;
  portalKey: "darwish_hub" | "nabta_quest" | "training_server";
}) {
  const now = Date.now();
  return db.transaction(async tx => {
    const records = await tx
      .select({
        codeId: centralAuthCodes.id,
        clientId: clientAccounts.id,
        clientName: clientAccounts.clientName,
        username: clientAccounts.username,
        portalRole: clientAccounts.portalRole,
        portalKey: clientAccounts.portalKey,
        isActive: clientAccounts.isActive,
      })
      .from(centralAuthCodes)
      .innerJoin(clientAccounts, eq(centralAuthCodes.clientAccountId, clientAccounts.id))
      .where(and(
        eq(centralAuthCodes.codeHash, input.codeHash),
        eq(centralAuthCodes.portalKey, input.portalKey),
        isNull(centralAuthCodes.usedAt),
        gt(centralAuthCodes.expiresAt, now),
      ))
      .limit(1);
    const grant = records[0];
    if (!grant || !grant.isActive || grant.portalKey !== input.portalKey) return null;

    const updateResult = await tx
      .update(centralAuthCodes)
      .set({ usedAt: now })
      .where(and(eq(centralAuthCodes.id, grant.codeId), isNull(centralAuthCodes.usedAt)));
    const updateHeader = (Array.isArray(updateResult) ? updateResult[0] : updateResult) as { affectedRows?: number };
    const affectedRows = Number(updateHeader?.affectedRows ?? 0);
    if (affectedRows !== 1) return null;

    return {
      clientId: grant.clientId,
      clientName: grant.clientName,
      username: grant.username,
      portalRole: grant.portalRole,
      portalKey: grant.portalKey,
    };
  });
}

