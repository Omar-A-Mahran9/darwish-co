/** About us: one page for the firm, its experts, partners and way of working (ported from render_about). */
import ContactSection from "@/site/ContactSection";
import { ABOUT } from "@/site/content/about";
import { AssetSlot, Crumbs, DarkHero, Icon, SiteLink, n2 } from "@/site/sx";

const LEAD = "Share a brief overview of your challenge. Our team will review it and contact you to agree on the next step.";

export default function About() {
  const a = ABOUT;
  const w = a.who, f = a.founder, g = a.guides, m = a.method, x = a.experts, pr = a.principles, pa = a.partners, sc = a.sectors;
  const [lt, lh] = w.link;
  const [fsrc, fw, fh] = f.photo;
  return (
    <div className="sx sx-gov sx-about">
      <DarkHero
        h={a.hero}
        extraClass=" ab-hero"
        crumbs={
          <Crumbs
            items={[
              ["Home", "/"],
              ["About us", null],
            ]}
          />
        }
      />

      <section className="ab-props" aria-labelledby="ab-props-h">
        <div className="sx-wrap">
          <h2 id="ab-props-h" className="sr-only">
            Our strengths
          </h2>
          <ul className="ab-props-list">
            {(a.props as [string, string, string][]).map(([i, t, xx]) => (
              <li key={t}>
                <Icon name={i} cls="sx-ico ab-pico" />
                <h3>{t}</h3>
                <p>{xx}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="sx-sec sx-white ab-who" aria-labelledby="ab-who-h">
        <div className="sx-wrap">
          <div className="ab-who-grid">
            <div className="gv-head">
              <h2 id="ab-who-h" className="sx-h2">
                {w.title}
              </h2>
              {(w.paras as string[]).map((p) => (
                <p className="gv-body" key={p}>
                  {p}
                </p>
              ))}
            </div>
            {w.image ? <img className="ab-who-img" src={w.image[0]} alt={w.image[3]} width={w.image[1]} height={w.image[2]} loading="lazy" /> : <AssetSlot slot={w.slot} cls="ab-who-slot" />}
          </div>
          <h3 className="ab-sub">{w.advise_title}</h3>
          <dl className="cl-coord ab-advise">
            {(w.advise as [string, string][]).map(([k, v]) => (
              <div key={k}>
                <dt>{k}</dt>
                <dd>{v}</dd>
              </div>
            ))}
          </dl>
          <p className="ab-links">
            <SiteLink className="sx-link" href={lh}>
              {lt}
            </SiteLink>
          </p>
        </div>
      </section>

      <section className="sx-sec sx-navy ab-founder" aria-labelledby="ab-fd-h">
        <div className="sx-wrap ab-founder-grid">
          <img className="ab-founder-img" src={fsrc} alt={f.alt} width={fw} height={fh} loading="lazy" decoding="async" />
          <figure className="ab-quote">
            <h2 id="ab-fd-h" className="ab-eyebrow">
              {f.eyebrow}
            </h2>
            <blockquote>
              <p>“{f.quote}”</p>
            </blockquote>
            <p className="ab-qtext">{f.text}</p>
            <figcaption>
              <strong>{f.name}</strong>
              <span>{f.role}</span>
            </figcaption>
          </figure>
        </div>
      </section>

      <section className="sx-sec sx-warm" aria-labelledby="ab-gd-h">
        <div className="sx-wrap">
          <h2 id="ab-gd-h" className="sx-h2">
            {g.title}
          </h2>
          <div className="ab-guides">
            <div className="ab-purpose">
              <h3>Purpose</h3>
              <p>{g.purpose}</p>
            </div>
            <div className="ab-mv">
              <div>
                <h3>Mission</h3>
                <p>{g.mission}</p>
              </div>
              <div>
                <h3>Vision</h3>
                <p>{g.vision}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="sx-sec sx-white" id="how-we-work" aria-labelledby="ab-md-h">
        <div className="sx-wrap">
          <div className="gv-head">
            <h2 id="ab-md-h" className="sx-h2">
              {m.title}
            </h2>
            <p className="gv-body">{m.intro}</p>
          </div>
          <ol className="ab-method">
            {(m.steps as [string, string][]).map(([t, xx], i) => (
              <li key={t}>
                <p className="ab-step">
                  <span>{n2(i + 1)}</span>
                  {t}
                </p>
                <p className="ab-step-d">{xx}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="sx-sec sx-warm" id="experts" aria-labelledby="ab-ex-h">
        <div className="sx-wrap">
          <div className="gv-head">
            <h2 id="ab-ex-h" className="sx-h2">
              {x.title}
            </h2>
            <p className="gv-body">{x.intro}</p>
          </div>
          <ul className="ab-people">
            {(x.people as [string, string, string][]).map(([slug, n, r]) => (
              <li key={slug}>
                <div className="ab-person">
                  <img src={`/media/people/${slug}.jpg`} alt="" width={400} height={400} loading="lazy" decoding="async" />
                  <strong>{n}</strong>
                  <span>{r}</span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="sx-sec sx-pale" aria-labelledby="ab-pr-h">
        <div className="sx-wrap">
          <h2 id="ab-pr-h" className="sx-h2">
            {pr.title}
          </h2>
          <ul className="ab-princ">
            {(pr.items as [string, string, string][]).map(([ic, t, d], i) => (
              <li className={i === 0 ? "is-featured" : undefined} key={t}>
                <Icon name={ic} />
                <h3>{t}</h3>
                <p>{d}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="sx-sec sx-white" id="partners" aria-labelledby="ab-pa-h">
        <div className="sx-wrap">
          <div className="gv-head">
            <h2 id="ab-pa-h" className="sx-h2">
              {pa.title}
            </h2>
            <p className="gv-body">{pa.intro}</p>
          </div>
          <div className="ab-partners">
            {(pa.groups as [string, [string, string, string][]][]).map(([gname, items]) => (
              <div className="ab-pgroup" key={gname}>
                <h3>{gname}</h3>
                <ul>
                  {items.map(([n, src, t]) => (
                    <li key={n}>
                      <span className="ab-logo">
                        <img src={src} alt="" loading="lazy" decoding="async" />
                      </span>
                      <div>
                        <h4>{n}</h4>
                        <p>{t}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <p className="ab-closing">{pa.closing}</p>
        </div>
      </section>

      <section className="sx-sec sx-warm" aria-labelledby="ab-sc-h">
        <div className="sx-wrap gv-split">
          <div className="gv-head">
            <h2 id="ab-sc-h" className="sx-h2">
              {sc.title}
            </h2>
            <p className="gv-body">{sc.text}</p>
          </div>
          <div>
            <ul className="ab-sectors">
              {(sc.items as string[]).map((t) => (
                <li key={t}>{t}</li>
              ))}
            </ul>
            <p className="ab-note">{sc.note}</p>
            <p className="ab-links">
              {(sc.links as [string, string][]).map(([t, h]) => (
                <SiteLink className="sx-link" href={h} key={h}>
                  {t}
                </SiteLink>
              ))}
            </p>
          </div>
        </div>
      </section>

      <ContactSection title={a.contact.title} text={a.contact.text} lead={LEAD} idPrefix="ab" />
    </div>
  );
}
