import { useCallback, useEffect, useState } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { KeyRound, LockKeyhole, Plus, Pencil, Trash2, RefreshCw, LogOut, ExternalLink } from "lucide-react";
import { toast } from "sonner";

type ClientAccount = {
  id: number;
  clientName: string;
  username: string;
  portalUrl: string;
  portalKey: "darwish_hub" | "nabta_quest" | "training_server";
  portalRole: "owner" | "editor" | "viewer";
  isActive: boolean;
  failedAttempts: number;
  lockedUntil: number | null;
  createdAt: number;
};

type AccountForm = {
  clientName: string;
  username: string;
  password: string;
  portalUrl: string;
  portalKey: "darwish_hub" | "nabta_quest" | "training_server";
  portalRole: "owner" | "editor" | "viewer";
  isActive: boolean;
};

const ADMIN_TOKEN_KEY = "darwish_admin_token";
const portalOptions = {
  darwish_hub: { label: "Darwish Hub", url: "https://darwishhub-rs8nk5xu.manus.space" },
  nabta_quest: { label: "Nabta Quest", url: "https://nabtaquest-fvgnftnq.manus.space" },
  training_server: { label: "Training Server", url: "https://trainingsrv-jpszljho.manus.space" },
} as const;
const emptyForm: AccountForm = { clientName: "", username: "", password: "", portalUrl: portalOptions.darwish_hub.url, portalKey: "darwish_hub", portalRole: "viewer", isActive: true };

export default function AdminClientAccess() {
  const [token, setToken] = useState(() => sessionStorage.getItem(ADMIN_TOKEN_KEY) || "");
  const [tokenInput, setTokenInput] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [accounts, setAccounts] = useState<ClientAccount[]>([]);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState<AccountForm>(emptyForm);
  const [editing, setEditing] = useState<ClientAccount | null>(null);
  const [lastIssued, setLastIssued] = useState<{ clientName: string; username: string; password: string } | null>(null);

  const request = useCallback(async (path: string, options: RequestInit = {}, activeToken = token) => {
    const response = await fetch(path, {
      ...options,
      headers: { "Content-Type": "application/json", "x-admin-token": activeToken, ...(options.headers || {}) },
    });
    const data = await response.json();
    if (!response.ok || !data.success) throw new Error(data.error || "Request failed.");
    return data;
  }, [token]);

  const fetchAccounts = useCallback(async (activeToken = token) => {
    setLoading(true);
    try {
      const data = await request("/api/admin/client-accounts", {}, activeToken);
      setAccounts(data.accounts);
      setIsAuthenticated(true);
      sessionStorage.setItem(ADMIN_TOKEN_KEY, activeToken);
    } catch (error) {
      setIsAuthenticated(false);
      sessionStorage.removeItem(ADMIN_TOKEN_KEY);
      if (activeToken) toast.error(error instanceof Error ? error.message : "Access denied.");
    } finally {
      setLoading(false);
    }
  }, [request, token]);

  useEffect(() => {
    if (token) fetchAccounts(token);
  }, []);

  const updateForm = (key: keyof AccountForm, value: string | boolean) => setForm(current => ({ ...current, [key]: value }));
  const selectPortal = (portalKey: AccountForm["portalKey"]) => setForm(current => ({ ...current, portalKey, portalUrl: portalOptions[portalKey].url }));

  const resetForm = () => {
    setForm(emptyForm);
    setEditing(null);
  };

  const handleAdminLogin = (event: React.FormEvent) => {
    event.preventDefault();
    if (tokenInput.trim()) {
      setToken(tokenInput.trim());
      fetchAccounts(tokenInput.trim());
    }
  };

  const handleSave = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    try {
      if (editing) {
        const data: Partial<AccountForm> = {
          clientName: form.clientName,
          portalUrl: form.portalUrl,
          portalRole: form.portalRole,
          isActive: form.isActive,
        };
        if (form.password) data.password = form.password;
        await request(`/api/admin/client-accounts/${editing.id}`, { method: "PATCH", body: JSON.stringify(data) });
        toast.success("Client account updated.");
      } else {
        await request("/api/admin/client-accounts", { method: "POST", body: JSON.stringify(form) });
        setLastIssued({ clientName: form.clientName, username: form.username, password: form.password });
        toast.success("Client credentials issued.");
      }
      resetForm();
      await fetchAccounts();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Unable to save client account.");
    } finally {
      setLoading(false);
    }
  };

  const beginEdit = (account: ClientAccount) => {
    setEditing(account);
    setLastIssued(null);
    setForm({ clientName: account.clientName, username: account.username, password: "", portalUrl: account.portalUrl, portalKey: account.portalKey, portalRole: account.portalRole, isActive: account.isActive });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (account: ClientAccount) => {
    if (!window.confirm(`Delete ${account.clientName}'s portal access? This cannot be undone.`)) return;
    setLoading(true);
    try {
      await request(`/api/admin/client-accounts/${account.id}`, { method: "DELETE" });
      toast.success("Client account deleted.");
      if (editing?.id === account.id) resetForm();
      await fetchAccounts();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Unable to delete client account.");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    setToken("");
    setTokenInput("");
    setIsAuthenticated(false);
    setAccounts([]);
    sessionStorage.removeItem(ADMIN_TOKEN_KEY);
  };

  if (!isAuthenticated) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-secondary/20 p-4">
        <Card className="w-full max-w-md border-0 shadow-xl">
          <CardHeader className="pb-4 text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary"><LockKeyhole className="h-8 w-8" /></div>
            <CardTitle className="font-heading text-2xl text-foreground">Client Access Management</CardTitle>
            <p className="mt-1 text-sm text-muted-foreground">Enter the owner admin token to issue and manage client credentials.</p>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleAdminLogin} className="space-y-4">
              <Input type="password" placeholder="Admin token" value={tokenInput} onChange={(event) => setTokenInput(event.target.value)} className="h-12 text-center" autoFocus />
              <Button type="submit" disabled={loading} className="h-12 w-full rounded-none bg-primary text-white hover:bg-primary/90">{loading ? "Verifying…" : "Access Client Accounts"}</Button>
            </form>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-secondary/10 pb-16 font-body">
      <header className="sticky top-0 z-10 border-b border-border bg-white/95 backdrop-blur">
        <div className="container flex items-center justify-between py-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center bg-primary/10 text-primary"><KeyRound className="h-5 w-5" /></div>
            <div><h1 className="font-heading text-lg font-bold text-foreground">Client Access Management</h1><p className="text-xs text-muted-foreground">Issue credentials and assign secure portal routes</p></div>
          </div>
          <div className="flex items-center gap-2">
            <Link href="/admin/inbox"><Button variant="outline" size="sm" className="rounded-none">Inbox</Button></Link>
            <Button variant="outline" size="sm" onClick={() => fetchAccounts()} disabled={loading} className="rounded-none"><RefreshCw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} /></Button>
            <Button variant="outline" size="sm" onClick={handleLogout} className="gap-2 rounded-none text-destructive"><LogOut className="h-4 w-4" />Logout</Button>
          </div>
        </div>
      </header>

      <main className="container grid max-w-7xl gap-8 py-8 lg:grid-cols-[0.85fr_1.15fr]">
        <div className="space-y-6">
          <Card className="border-0 shadow-md">
            <CardHeader><CardTitle className="font-heading text-xl">{editing ? "Update client access" : "Issue client credentials"}</CardTitle><p className="text-sm text-muted-foreground">Passwords are hashed before they are saved. The selected role is carried securely into the assigned portal.</p></CardHeader>
            <CardContent>
              <form onSubmit={handleSave} className="space-y-4">
                <label className="block space-y-1.5 text-sm font-semibold">Client or organisation<Input value={form.clientName} onChange={(event) => updateForm("clientName", event.target.value)} placeholder="Client organisation name" className="h-11 rounded-none" /></label>
                <label className="block space-y-1.5 text-sm font-semibold">Username<Input value={form.username} disabled={Boolean(editing)} onChange={(event) => updateForm("username", event.target.value)} placeholder="e.g. acme.client" className="h-11 rounded-none" /></label>
                <label className="block space-y-1.5 text-sm font-semibold">{editing ? "New password or access code (optional)" : "Temporary password or access code"}<Input type="password" inputMode={form.portalKey === "training_server" ? "numeric" : "text"} value={form.password} onChange={(event) => updateForm("password", event.target.value)} placeholder={editing ? "Leave empty to keep current credential" : form.portalKey === "training_server" ? "Six numeric digits" : "At least 12 characters"} className="h-11 rounded-none" /></label>
                <label className="block space-y-1.5 text-sm font-semibold">Assigned portal<select value={form.portalKey} onChange={(event) => selectPortal(event.target.value as AccountForm["portalKey"])} className="h-11 w-full rounded-none border border-input bg-background px-3 text-sm"><option value="darwish_hub">Darwish Hub</option><option value="nabta_quest">Nabta Quest</option><option value="training_server">Training Server</option></select></label>
                <label className="block space-y-1.5 text-sm font-semibold">Portal role<select value={form.portalRole} onChange={(event) => updateForm("portalRole", event.target.value)} className="h-11 w-full rounded-none border border-input bg-background px-3 text-sm"><option value="owner">Owner — full administration</option><option value="editor">Editor — can update content</option><option value="viewer">Viewer — read-only access</option></select></label>
                {editing && <label className="flex items-center gap-3 text-sm font-semibold"><input type="checkbox" checked={form.isActive} onChange={(event) => updateForm("isActive", event.target.checked)} className="h-4 w-4 accent-primary" />Account is active</label>}
                <div className="flex gap-3"><Button type="submit" disabled={loading} className="rounded-none bg-primary text-white hover:bg-primary/90">{editing ? "Save changes" : <><Plus className="mr-2 h-4 w-4" />Issue credentials</>}</Button>{editing && <Button type="button" variant="outline" className="rounded-none" onClick={resetForm}>Cancel</Button>}</div>
              </form>
            </CardContent>
          </Card>

          {lastIssued && <Card className="border border-chart-2/30 bg-chart-2/5 shadow-sm"><CardContent className="space-y-3 pt-6"><p className="text-xs font-bold uppercase tracking-widest text-chart-2">Credentials issued — copy now</p><p className="font-semibold text-foreground">{lastIssued.clientName}</p><dl className="space-y-2 text-sm"><div className="flex justify-between gap-4"><dt className="text-muted-foreground">Username</dt><dd className="font-mono font-semibold">{lastIssued.username}</dd></div><div className="flex justify-between gap-4"><dt className="text-muted-foreground">Password</dt><dd className="font-mono font-semibold">{lastIssued.password}</dd></div></dl><p className="text-xs leading-relaxed text-muted-foreground">This password is not displayed again after you leave this screen. Reset it later if required.</p></CardContent></Card>}
        </div>

        <Card className="border-0 shadow-md">
          <CardHeader className="border-b border-border"><div className="flex items-center justify-between gap-4"><div><CardTitle className="font-heading text-xl">Issued client accounts</CardTitle><p className="mt-1 text-sm text-muted-foreground">{accounts.length} configured client {accounts.length === 1 ? "account" : "accounts"}</p></div><Badge className="rounded-none bg-primary text-white">{accounts.filter(account => account.isActive).length} active</Badge></div></CardHeader>
          <CardContent className="p-0">
            {accounts.length === 0 ? <div className="p-12 text-center text-muted-foreground"><KeyRound className="mx-auto mb-3 h-10 w-10 text-muted-foreground/30" /><p className="font-semibold">No client accounts issued yet</p><p className="mt-1 text-sm">Create the first client access record from the form.</p></div> : <div className="divide-y divide-border">{accounts.map(account => <div key={account.id} className="space-y-4 p-5"><div className="flex flex-wrap items-start justify-between gap-3"><div><p className="font-semibold text-foreground">{account.clientName}</p><p className="mt-1 font-mono text-xs text-muted-foreground">{account.username}</p></div><div className="flex items-center gap-2"><Badge variant="outline" className={account.isActive ? "border-chart-2/30 bg-chart-2/10 text-chart-2" : "border-destructive/30 bg-destructive/10 text-destructive"}>{account.isActive ? "Active" : "Inactive"}</Badge>{account.lockedUntil && account.lockedUntil > Date.now() && <Badge variant="outline" className="border-chart-3/30 bg-chart-3/10 text-chart-3">Temporarily locked</Badge>}</div></div><a href={account.portalUrl} target="_blank" rel="noopener noreferrer" className="inline-flex max-w-full items-center gap-1 truncate text-sm text-primary hover:underline">{account.portalUrl}<ExternalLink className="h-3.5 w-3.5 shrink-0" /></a><div className="flex gap-2"><Button size="sm" variant="outline" className="gap-2 rounded-none" onClick={() => beginEdit(account)}><Pencil className="h-3.5 w-3.5" />Edit</Button><Button size="sm" variant="outline" className="gap-2 rounded-none text-destructive" onClick={() => handleDelete(account)}><Trash2 className="h-3.5 w-3.5" />Delete</Button></div></div>)}</div>}
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
