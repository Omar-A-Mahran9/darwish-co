import { useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LEGACY_ANCHOR_REDIRECTS, SERVICES, type Service } from "@shared/services";
import { ACCENT, ServiceIcon } from "@/components/serviceStyles";
import { ArrowRight } from "lucide-react";

/**
 * Sends the old single-page anchors (/services#grc) to the page that replaced
 * them, so links shared before the split still land in the right place.
 */
function useLegacyAnchorRedirect() {
  const [, navigate] = useLocation();

  useEffect(() => {
    const anchor = window.location.hash.replace("#", "");
    const destination = anchor ? LEGACY_ANCHOR_REDIRECTS[anchor] : undefined;
    if (destination) {
      navigate(destination, { replace: true });
    }
  }, [navigate]);
}

function ServiceCard({ service }: { service: Service }) {
  const accent = ACCENT[service.accent];

  return (
    <Link href={`/services/${service.slug}`}>
      <Card className="flex h-full cursor-pointer flex-col border-border/50 shadow-sm transition-shadow hover:shadow-md">
        <CardHeader>
          <div className="mb-4">
            <ServiceIcon name={service.icon} className={`h-7 w-7 ${accent.text}`} />
          </div>
          <CardTitle className="font-heading text-xl leading-snug text-primary">
            {service.name}
          </CardTitle>
          {service.partner && (
            <span className={`mt-2 inline-flex w-fit items-center gap-1.5 rounded-full ${accent.soft} px-3 py-1 text-xs font-bold ${accent.text}`}>
              Delivered with {service.partner.name}
            </span>
          )}
        </CardHeader>
        <CardContent className="flex flex-1 flex-col justify-between gap-5">
          <p className="leading-relaxed text-muted-foreground">{service.tagline}</p>
          <span className={`inline-flex items-center gap-2 text-sm font-bold ${accent.text}`}>
            What this covers <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </span>
        </CardContent>
      </Card>
    </Link>
  );
}

export default function Services() {
  useLegacyAnchorRedirect();

  const inHouse = SERVICES.filter((service) => !service.partner);
  const withPartners = SERVICES.filter((service) => service.partner);

  return (
    <div className="min-h-screen bg-background font-body">
      {/* Header */}
      <section className="bg-primary py-20 text-primary-foreground">
        <div className="container space-y-6 text-center">
          <h1 className="font-heading text-4xl font-bold md:text-5xl">Our Services</h1>
          <p className="mx-auto max-w-2xl text-xl text-primary-foreground/80">
            Governance, risk and compliance, strategy, people and growth services for SMEs in the
            MENA region.
          </p>
        </div>
      </section>

      {/* Delivered by Darwish & Co. */}
      <section className="py-16">
        <div className="container space-y-10">
          <div className="max-w-3xl space-y-3">
            <h2 className="font-heading text-2xl font-bold text-primary md:text-3xl">
              Delivered by Darwish &amp; Co.
            </h2>
            <p className="leading-relaxed text-muted-foreground">
              Five practices, each with its own page setting out what the work covers, who it
              suits, what you receive and how an engagement runs.
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {inHouse.map((service) => (
              <ServiceCard key={service.slug} service={service} />
            ))}
          </div>
        </div>
      </section>

      {/* Delivered with partners */}
      <section className="border-t border-border bg-muted/20 py-16">
        <div className="container space-y-10">
          <div className="max-w-3xl space-y-3">
            <h2 className="font-heading text-2xl font-bold text-primary md:text-3xl">
              Delivered with our partner network
            </h2>
            <p className="leading-relaxed text-muted-foreground">
              Two specialist services delivered together with partner firms. Darwish &amp; Co.
              scopes and manages the engagement; the specialist capability belongs to the partner,
              and we say which is which.
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            {withPartners.map((service) => (
              <ServiceCard key={service.slug} service={service} />
            ))}
          </div>
          <p className="text-sm text-muted-foreground">
            More about the firms we work with on the{" "}
            <Link href="/corporate-partners">
              <span className="cursor-pointer font-bold text-primary hover:underline">
                corporate partners page
              </span>
            </Link>
            .
          </p>
        </div>
      </section>

      {/* Call to action */}
      <section className="py-16">
        <div className="container flex flex-col items-center gap-6 text-center">
          <h2 className="font-heading text-2xl font-bold text-primary md:text-3xl">
            Not sure which of these you need?
          </h2>
          <p className="max-w-2xl leading-relaxed text-muted-foreground">
            Most engagements start with a problem rather than a service — an investor asking
            questions, a structure that has stopped working, a market decision that needs
            evidence. Describe it and we will tell you which of these applies, or whether none does.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link href="/contact">
              <Button size="lg" className="font-bold">
                Book a consultation
              </Button>
            </Link>
            <Link href="/projects">
              <Button size="lg" variant="outline" className="font-bold">
                See our work <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
