import { useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  LEGACY_ANCHOR_REDIRECTS,
  PILLARS,
  servicesInPillar,
  type Service,
  type ServicePillar,
} from "@shared/services";
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
              Partly delivered with {service.partner.name}
            </span>
          )}
          {!service.deliveryLead && (
            <span className="mt-2 inline-flex w-fit items-center rounded-full border border-dashed border-amber-500/60 px-3 py-1 text-xs font-bold text-amber-700">
              Needs delivery lead
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

function Pillar({ pillar, muted }: { pillar: ServicePillar; muted?: boolean }) {
  const services = servicesInPillar(pillar);
  if (services.length === 0) return null;

  return (
    <section className={muted ? "border-t border-border bg-muted/20 py-16" : "py-16"}>
      <div className="site-container space-y-10">
        <div className="max-w-3xl space-y-3">
          <h2 className="font-heading text-h2 font-bold text-primary">
            {PILLARS[pillar].name}
          </h2>
          <p className="leading-relaxed text-muted-foreground">{PILLARS[pillar].description}</p>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <ServiceCard key={service.slug} service={service} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default function Services() {
  useLegacyAnchorRedirect();

  return (
    <div className="min-h-screen bg-background font-body">
      {/* Header */}
      <section className="bg-primary py-20 text-primary-foreground">
        <div className="site-container space-y-6 text-center">
          <h1 className="font-heading text-h1 font-bold">Our Services</h1>
          <p className="content-narrow text-xl text-primary-foreground/80">
            Governance first, then the strategy, structure and growth work that depends on it — for
            SMEs in Egypt and the MENA region.
          </p>
        </div>
      </section>

      <Pillar pillar="governance" />
      <Pillar pillar="strategy-organisation" muted />
      <Pillar pillar="growth" />

      {/* Partner note */}
      <section className="border-t border-border bg-muted/20 py-12">
        <div className="site-container content-narrow space-y-3 text-center">
          <h2 className="font-heading text-lg font-bold text-foreground">
            Where a partner delivers part of the work
          </h2>
          <p className="text-sm leading-relaxed text-muted-foreground">
            Anti-bribery and integrity work is delivered with VisionEthics, and consumer research
            with In Light Consumer Insights. Each service page states exactly which components are
            theirs and who is accountable for what. More about both on the{" "}
            <Link href="/corporate-partners">
              <span className="link cursor-pointer font-bold">
                corporate partners page
              </span>
            </Link>
            .
          </p>
        </div>
      </section>

      {/* Call to action */}
      <section className="py-16">
        <div className="site-container flex flex-col items-center gap-6 text-center">
          <h2 className="font-heading text-h2 font-bold text-primary">
            Not sure which of these you need?
          </h2>
          <p className="content-narrow leading-relaxed text-muted-foreground">
            Most engagements start with a problem rather than a service — an investor asking
            questions, a client sending a compliance questionnaire, a structure that has stopped
            working. Describe it and we will tell you which of these applies, or whether none does.
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
