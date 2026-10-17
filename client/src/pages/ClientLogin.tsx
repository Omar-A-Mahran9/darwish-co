import { useState } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { KeyRound, LockKeyhole, ArrowRight, ShieldCheck } from "lucide-react";
import { toast } from "sonner";

export default function ClientLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!username.trim() || !password) {
      toast.error("Enter the username and password issued to you.");
      return;
    }

    setSubmitting(true);
    try {
      const response = await fetch("/api/client-login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      const result = await response.json();
      if (!response.ok || !result.success || !result.portalUrl) {
        toast.error(result.error || "Unable to sign in. Please check your credentials.");
        return;
      }

      window.location.assign(result.portalUrl);
    } catch {
      toast.error("We could not reach the client access service. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-7rem)] bg-secondary/20 py-16 sm:py-24">
      <div className="site-container grid max-w-5xl items-stretch overflow-hidden border border-border bg-white shadow-xl lg:grid-cols-[1.05fr_0.95fr]">
        <section className="bg-foreground px-8 py-12 text-white sm:px-12">
          <div className="flex h-full flex-col justify-between gap-14">
            <div>
              <span className="inline-flex items-center gap-2 border border-white/20 bg-white/10 px-3 py-1 text-xs font-bold uppercase tracking-[0.16em] text-white/85">
                <ShieldCheck className="h-3.5 w-3.5 text-chart-2" /> Secure access
              </span>
              <h1 className="mt-6 font-heading text-h1 font-bold">Client Login</h1>
              <p className="mt-5 max-w-md text-base leading-relaxed text-white/75 sm:text-lg">
                Sign in with the username and password issued by Darwish &amp; Co. to access your dedicated client portal.
              </p>
            </div>
            <div className="border-t border-white/15 pt-6 text-sm leading-relaxed text-white/65">
              For access assistance, please contact your Darwish &amp; Co. engagement lead or email info@darwish-co.com.
            </div>
          </div>
        </section>

        <section className="px-8 py-12 sm:px-12">
          <div className="mb-8">
            <div className="mb-4 flex h-11 w-11 items-center justify-center bg-primary/10 text-primary">
              <KeyRound className="h-5 w-5" />
            </div>
            <h2 className="font-heading text-2xl font-bold text-foreground">Enter your credentials</h2>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">Your credentials direct you only to the portal assigned to your organisation.</p>
          </div>

          <form className="space-y-5" onSubmit={handleSubmit}>
            <label className="block space-y-2 text-sm font-semibold text-foreground">
              Username
              <Input
                autoComplete="username"
                value={username}
                onChange={(event) => setUsername(event.target.value)}
                placeholder="Your issued username"
                className="h-12 "
              />
            </label>
            <label className="block space-y-2 text-sm font-semibold text-foreground">
              Password
              <Input
                type="password"
                autoComplete="current-password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                placeholder="Your issued password"
                className="h-12 "
              />
            </label>
            <Button type="submit" disabled={submitting} className="h-12 w-full bg-primary text-white hover:bg-primary/90">
              {submitting ? "Checking access…" : <>Access my portal <ArrowRight className="ml-2 h-4 w-4" /></>}
            </Button>
          </form>

          <Link href="/contact">
            <span className="link mt-8 inline-block cursor-pointer text-sm font-medium">Need help with access?</span>
          </Link>
        </section>
      </div>
    </div>
  );
}
