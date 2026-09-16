import { useEffect } from "react";
import { Link, useLocation, useParams } from "wouter";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  getService,
  PUBLISHED_SERVICES,
  SERVICE_REDIRECTS,
  WITHDRAWN_SERVICES,
} from "@shared/services";
import { ACCENT, ServiceIcon } from "@/components/serviceStyles";
import { ArrowLeft, ArrowRight, Check, ChevronRight, ExternalLink } from "lucide-react";

export default function ServiceDetail() {
  const params = useParams<{ slug: string }>();
  const [, navigate] = useLocation();
  const service = params.slug ? getService(params.slug) : undefined;
  const redirect = params.slug ? SERVICE_REDIRECTS[`/services/${params.slug}`] : undefined;

  // The server answers old addresses with a 301; this covers the same links
  // followed inside an already-loaded page.
  useEffect(() => {
    if (!service && redirect) navigate(redirect, { replace: true });
  }, [service, redirect, navigate]);

  if (!service) {
    if (redirect) return null;

    // A service withdrawn with no successor says so plainly. The server answers
    // this address with 410, so it also leaves the index rather than lingering.
    const withdrawn = params.slug ? WITHDRAWN_SERVICES[`/services/${params.slug}`] : undefined;

    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-6 px-4 text-center font-body">
        <h1 className="font-heading text-3xl font-bold text-foreground">
          {withdrawn ? "This service is no longer offered" : "Service not found"}
        </h1>
        {withdrawn && (
          <p className="max-w-lg leading-relaxed text-muted-foreground">
            {withdrawn} The firm now works in governance, strategy and growth for SMEs.
          </p>
        )}
        <Link href="/services">
          <Button variant="outline">
            <ArrowLeft className="mr-2 h-4 w-4" /> See what we do offer
          </Button>
        </Link>
      </div>
    );
  }

  const accent = ACCENT[service.accent];
  const others = PUBLISHED_SERVICES.filter((entry) => entry.slug !== service.slug).slice(0, 3);
  const groups = service.offerings
    .map((offering) => offering.group ?? "")
    .filter((group, index, all) => all.indexOf(group) === index);

  return (
    <div className="min-h-screen bg-background font-body">
      {/* Header */}
      <section className="bg-primary py-16 text-primary-foreground md:py-20">
        <div className="container space-y-6">
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-sm text-primary-foreground/70">
            <Link href="/">
              <span className="cursor-pointer hover:text-primary-foreground hover:underline">Home</span>
            </Link>
            <ChevronRight className="h-3.5 w-3.5" aria-hidden="true" />
            <Link href="/services">
              <span className="cursor-pointer hover:text-primary-foreground hover:underline">Services</span>
            </Link>
            <ChevronRight className="h-3.5 w-3.5" aria-hidden="true" />
            <span className="text-primary-foreground">{service.navLabel}</span>
          </nav>

          <div className="flex flex-wrap items-start gap-4">
            <div className="rounded-xl bg-white/10 p-3">
              <ServiceIcon name={service.icon} className="h-8 w-8 text-white" />
            </div>
            <div className="max-w-3xl space-y-3">
              <h1 className="font-heading text-3xl font-bold leading-tight md:text-5xl">
                {service.name}
              </h1>
              <p className="text-lg text-primary-foreground/80">{service.tagline}</p>
              {service.partner && (
                <a
                  href={service.partner.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1 text-xs font-bold transition-colors hover:bg-white/20"
                >
                  Delivered with {service.partner.name} <ExternalLink className="h-3 w-3" />
                </a>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Introduction */}
      <section className="py-14">
        <div className="container max-w-3xl space-y-6">
          <p className="text-lg leading-relaxed text-foreground">{service.intro}</p>
          {service.partner && (
            <p className={`border-l-4 ${accent.border} bg-muted/30 py-4 pl-5 text-sm leading-relaxed text-muted-foreground`}>
              {service.partner.note}
            </p>
          )}
          {service.relatedNote && (
            <p className="text-sm leading-relaxed text-muted-foreground">
              {service.relatedNote.text}{" "}
              <Link href={service.relatedNote.href}>
                <span className={`cursor-pointer font-bold ${accent.text} hover:underline`}>
                  {service.relatedNote.linkText}
                </span>
              </Link>
              .
            </p>
          )}
        </div>
      </section>

      {/* Partner statistics */}
      {service.stats && (
        <section className="pb-14">
          <div className="container grid grid-cols-2 gap-4 md:grid-cols-4">
            {service.stats.map((stat) => (
              <div key={stat.label} className={`border ${accent.border} ${accent.soft} p-4 text-center`}>
                <div className={`font-heading text-xl font-bold ${accent.text}`}>{stat.value}</div>
                <div className="mt-1 text-xs text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* What we do */}
      <section className="border-t border-border bg-muted/20 py-16">
        <div className="container space-y-12">
          <h2 className="font-heading text-2xl font-bold text-primary md:text-3xl">What we do</h2>

          {groups.map((group) => {
            const offerings = service.offerings.filter(
              (offering) => (offering.group ?? "") === group,
            );
            return (
              <div key={group || "all"} className="space-y-6">
                {group && (
                  <h3 className="font-heading text-lg font-bold text-foreground">{group}</h3>
                )}
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {offerings.map((offering) => (
                    <Card key={offering.title} className="border-border/50 bg-background shadow-sm transition-shadow hover:shadow-md">
                      <CardHeader>
                        <div className="mb-3">
                          <ServiceIcon name={offering.icon} className={`h-6 w-6 ${accent.text}`} />
                        </div>
                        <CardTitle className="font-heading text-base leading-snug text-primary">
                          {offering.title}
                        </CardTitle>
                        {offering.byPartner && service.partner && (
                          <span className={`mt-2 inline-flex w-fit items-center rounded-full ${accent.soft} px-2.5 py-0.5 text-[11px] font-bold ${accent.text}`}>
                            Delivered by {service.partner.name}
                          </span>
                        )}
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm leading-relaxed text-muted-foreground">
                          {offering.description}
                        </p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Who it's for / What you get */}
      <section className="py-16">
        <div className="container grid gap-12 md:grid-cols-2">
          <div className="space-y-6">
            <h2 className="font-heading text-2xl font-bold text-primary">Is this you?</h2>
            <ul className="space-y-4">
              {service.isThisYou.map((item) => (
                <li key={item} className="flex gap-3 text-muted-foreground">
                  <ArrowRight className={`mt-1 h-4 w-4 flex-shrink-0 ${accent.text}`} aria-hidden="true" />
                  <span className="leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-6">
            <h2 className="font-heading text-2xl font-bold text-primary">What you get</h2>
            <ul className="space-y-4">
              {service.whatYouGet.map((item) => (
                <li key={item} className="flex gap-3 text-muted-foreground">
                  <Check className={`mt-1 h-4 w-4 flex-shrink-0 ${accent.text}`} aria-hidden="true" />
                  <span className="leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Who is accountable, where a partner delivers part of the work */}
      {service.partner && (
        <section className="pb-16">
          <div className="container">
            <div className={`border ${accent.border} ${accent.soft} p-6 md:p-8`}>
              <h2 className="font-heading text-lg font-bold text-foreground">
                Who delivers, and who is accountable
              </h2>
              <p className="mt-3 max-w-3xl leading-relaxed text-muted-foreground">
                {service.partner.accountability}
              </p>
              <a
                href={service.partner.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`mt-4 inline-flex items-center gap-1.5 text-sm font-bold ${accent.text} hover:underline`}
              >
                About {service.partner.name} <ExternalLink className="h-3.5 w-3.5" />
              </a>
            </div>
          </div>
        </section>
      )}

      {/* Who leads this — v3 requires a named, accountable delivery lead */}
      <section className="pb-16">
        <div className="container">
          {service.deliveryLead ? (
            <div className="border border-border bg-muted/20 p-6 md:p-8">
              <h2 className="font-heading text-lg font-bold text-foreground">Who leads this</h2>
              <p className="mt-3 leading-relaxed text-muted-foreground">
                <span className="font-bold text-foreground">{service.deliveryLead.name}</span> —{" "}
                {service.deliveryLead.role}
              </p>
            </div>
          ) : (
            <div className="border-2 border-dashed border-amber-500/60 bg-amber-50 p-6 md:p-8">
              <p className="text-xs font-bold uppercase tracking-widest text-amber-700">
                Needs delivery lead
              </p>
              <h2 className="mt-2 font-heading text-lg font-bold text-foreground">Who leads this</h2>
              <p className="mt-2 max-w-3xl leading-relaxed text-muted-foreground">
                A named person accountable for delivering this service has not been confirmed.
                Positioning v3 requires one before the page is published, alongside a defined
                scope, a sample output and relevant experience.
              </p>
              <p className="mt-2 text-sm text-muted-foreground">
                Internal review note — remove before this page goes live.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Standards genuinely applied in the work */}
      {service.standards && (
        <section className="border-t border-border py-16">
          <div className="container space-y-8">
            <h2 className="font-heading text-2xl font-bold text-primary md:text-3xl">
              Standards we work with
            </h2>
            <dl className="grid gap-8 md:grid-cols-3">
              {service.standards.map((standard) => (
                <div key={standard.name} className="space-y-2">
                  <dt className={`font-heading text-lg font-bold ${accent.text}`}>
                    {standard.name}
                  </dt>
                  <dd className="text-sm leading-relaxed text-muted-foreground">{standard.note}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>
      )}

      {/* How an engagement runs */}
      <section className="border-y border-border bg-muted/20 py-16">
        <div className="container space-y-10">
          <h2 className="font-heading text-2xl font-bold text-primary md:text-3xl">
            How an engagement runs
          </h2>
          <ol className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {service.howItWorks.map((step, index) => (
              <li key={step.title} className="space-y-3">
                <div className={`flex h-9 w-9 items-center justify-center rounded-full ${accent.soft} font-heading font-bold ${accent.text}`}>
                  {index + 1}
                </div>
                <h3 className="font-heading text-lg font-bold text-foreground">{step.title}</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">{step.description}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Questions */}
      <section className="py-16">
        <div className="container max-w-3xl space-y-8">
          <h2 className="font-heading text-2xl font-bold text-primary md:text-3xl">
            Common questions
          </h2>
          <Accordion type="single" collapsible className="w-full">
            {service.faqs.map((faq, index) => (
              <AccordionItem key={faq.question} value={`faq-${index}`}>
                <AccordionTrigger className="text-left font-heading text-base font-bold text-foreground">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="leading-relaxed text-muted-foreground">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* Call to action */}
      <section className="bg-primary py-16 text-primary-foreground">
        <div className="container flex flex-col items-center gap-6 text-center">
          <h2 className="font-heading text-2xl font-bold md:text-3xl">
            Talk to us about {service.navLabel.toLowerCase()}
          </h2>
          <p className="max-w-2xl text-primary-foreground/80">
            A first conversation costs nothing and commits you to nothing. Tell us what has
            prompted the work and we will tell you honestly whether we are the right people for it.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link href="/contact">
              <Button size="lg" variant="secondary" className="font-bold">
                Book a consultation
              </Button>
            </Link>
            {service.partner && (
              <a href={service.partner.url} target="_blank" rel="noopener noreferrer">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white/40 bg-transparent font-bold text-white hover:bg-white/10 hover:text-white"
                >
                  Visit {service.partner.name} <ExternalLink className="ml-2 h-4 w-4" />
                </Button>
              </a>
            )}
          </div>
        </div>
      </section>

      {/* Other services */}
      <section className="py-16">
        <div className="container space-y-8">
          <h2 className="font-heading text-xl font-bold text-foreground">Other services</h2>
          <div className="grid gap-6 md:grid-cols-3">
            {others.map((entry) => (
              <Link key={entry.slug} href={`/services/${entry.slug}`}>
                <Card className="h-full cursor-pointer border-border/50 shadow-sm transition-shadow hover:shadow-md">
                  <CardHeader>
                    <div className="mb-3">
                      <ServiceIcon
                        name={entry.icon}
                        className={`h-6 w-6 ${ACCENT[entry.accent].text}`}
                      />
                    </div>
                    <CardTitle className="font-heading text-base text-primary">
                      {entry.name}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm leading-relaxed text-muted-foreground">{entry.tagline}</p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
