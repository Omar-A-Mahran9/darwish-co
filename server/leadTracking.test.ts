import { describe, expect, it } from "vitest";
import { contactMethodOf } from "../client/src/site/leadTracking.js";

describe("lead tracking", () => {
  it("recognises email, phone and WhatsApp links, and nothing else", () => {
    expect(contactMethodOf("mailto:info@darwish-co.com")).toBe("email");
    expect(contactMethodOf("MAILTO:info@darwish-co.com?subject=Hi")).toBe("email");
    expect(contactMethodOf("tel:+201132842250")).toBe("phone");
    expect(contactMethodOf("https://wa.me/201132842250")).toBe("whatsapp");
    expect(contactMethodOf("https://api.whatsapp.com/send?phone=201132842250")).toBe("whatsapp");
    expect(contactMethodOf("whatsapp://send?phone=201132842250")).toBe("whatsapp");
    expect(contactMethodOf("/contact")).toBe(null);
    expect(contactMethodOf("https://www.linkedin.com/company/darwishandcoeg/")).toBe(null);
    expect(contactMethodOf("https://example.com/wa.me/")).toBe(null);
  });
});
