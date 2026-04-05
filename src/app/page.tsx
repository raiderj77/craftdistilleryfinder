/* eslint-disable @next/next/no-img-element */
import type { Metadata } from 'next';
import Link from 'next/link';
import locations from '@/data/locations.json';

export const dynamic = 'force-static';

export const metadata: Metadata = {
  title: 'Craft Distillery Finder — Discover Local Distilleries Across America',
  description: 'Find craft distilleries near you. Explore whiskey, gin, rum, and artisan spirit producers with tours and tastings across all 50 states.',
};

const ALL_STATES = [
  'Alabama','Alaska','Arizona','Arkansas','California','Colorado','Connecticut','Delaware',
  'Florida','Georgia','Hawaii','Idaho','Illinois','Indiana','Iowa','Kansas','Kentucky',
  'Louisiana','Maine','Maryland','Massachusetts','Michigan','Minnesota','Mississippi',
  'Missouri','Montana','Nebraska','Nevada','New Hampshire','New Jersey','New Mexico',
  'New York','North Carolina','North Dakota','Ohio','Oklahoma','Oregon','Pennsylvania',
  'Rhode Island','South Carolina','South Dakota','Tennessee','Texas','Utah','Vermont',
  'Virginia','Washington','West Virginia','Wisconsin','Wyoming',
];

const IMG_KEYWORDS = ['whiskey+distillery','craft+spirits','bourbon+distillery','gin+distillery','rum+distillery','craft+brewery+copper'];

export default function Home() {
  const featured = locations.slice(0, 6);
  const statesWithData = Array.from(new Set(locations.map((l) => l.state))).length;

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        '@context':'https://schema.org','@type':'WebSite',url:'https://craftdistilleryfinder.com',
        name:'Craft Distillery Finder',
        potentialAction:{'@type':'SearchAction',target:{'@type':'EntryPoint',urlTemplate:'https://craftdistilleryfinder.com/search?q={search_term_string}'},'query-input':'required name=search_term_string'},
      }) }} />

      {/* Hero */}
      <section style={{ position: 'relative', background: 'linear-gradient(160deg, var(--charcoal) 0%, #1a1008 45%, #2a1a08 100%)', overflow: 'hidden', padding: '7rem 1.5rem 8rem' }}>
        {/* Dot-grid texture */}
        <div aria-hidden style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(rgba(201,123,42,0.06) 1px, transparent 1px)', backgroundSize: '24px 24px', pointerEvents: 'none' }} />
        {/* Grain vignette */}
        <div aria-hidden style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at center, transparent 40%, rgba(28,24,20,0.6) 100%)', pointerEvents: 'none' }} />
        <div className="container" style={{ textAlign: 'center', position: 'relative', zIndex: 1 }}>
          <p className="anim-fade-up" style={{ display: 'inline-block', color: 'var(--amber-lt)', fontWeight: 700, fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.16em', marginBottom: '1rem', fontFamily: 'var(--font-display)', background: 'rgba(201,123,42,0.12)', padding: '0.4rem 1.2rem', borderRadius: '50px', border: '1px solid rgba(201,123,42,0.25)' }}>
            🥃 Artisan Spirits Directory
          </p>
          <h1 className="anim-fade-up anim-delay-1" style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem, 5vw, 3.5rem)', color: 'var(--white)', fontWeight: 800, marginBottom: '1.25rem', lineHeight: 1.12 }}>
            Discover <span style={{ color: 'var(--amber-lt)' }}>Craft</span> Distilleries<br />Across America
          </h1>
          <p className="anim-fade-up anim-delay-2" style={{ fontSize: '1.05rem', color: '#c0a07a', marginBottom: '2.75rem', maxWidth: '500px', margin: '0 auto 2.75rem', fontFamily: 'var(--font-display)', lineHeight: 1.65 }}>
            Whiskey, gin, rum, vodka &amp; artisan spirits — handcrafted by local distillers in every state.
          </p>
          <form method="GET" action="/search" className="anim-fade-up anim-delay-3">
            <div className="search-wrap">
              <input type="text" name="q" placeholder="Search by state, city, or distillery name…" className="search-input" />
              <button type="submit" className="search-btn">Find Distilleries</button>
            </div>
          </form>
        </div>
        <svg aria-hidden viewBox="0 0 1440 60" xmlns="http://www.w3.org/2000/svg" style={{ position: 'absolute', bottom: 0, left: 0, width: '100%', display: 'block' }} preserveAspectRatio="none">
          <path d="M0,30 C360,60 1080,0 1440,30 L1440,60 L0,60 Z" fill="var(--ivory)" />
        </svg>
      </section>

      {/* Stats bar */}
      <section style={{ background: 'var(--white)', borderBottom: '1px solid rgba(201,123,42,0.1)' }}>
        <div className="container" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)' }}>
          {[
            { n:`${locations.length}+`, l:'Distilleries Listed' },
            { n:`${statesWithData}`, l:'States Covered' },
            { n:'Tours', l:'& Tastings' },
            { n:'Craft', l:'& Artisan' },
          ].map(({n,l}) => (
            <div key={l} className="stat-item">
              <div className="stat-number">{n}</div>
              <div className="stat-label">{l}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Featured */}
      <section style={{ padding: '5rem 1.5rem 4rem' }}>
        <div className="container">
          <p className="section-label">🥃 Top Picks</p>
          <h2 className="section-title">Featured Distilleries</h2>
          <p className="section-sub" style={{ marginBottom: '3rem' }}>Hand-selected craft distilleries offering tours, tastings, and exceptional artisan spirits.</p>
          <div className="grid-3">
            {featured.map((loc, i) => (
              <Link key={loc.slug} href={`/${loc.stateSlug}/${loc.slug}`} style={{ textDecoration: 'none' }}>
                <article className="card">
                  <img src={`https://picsum.photos/seed/${loc.slug}/800/500`} alt={loc.name} className="card-img" loading="lazy" width={800} height={500} />
                  <div className="card-body">
                    <div className="card-meta"><span>📍</span><span>{loc.city ? `${loc.city}, ` : ''}{loc.state}</span></div>
                    <h3 className="card-title">{loc.name}</h3>
                    <p style={{ fontSize: '0.875rem', color: '#667', lineHeight: 1.65, flex: 1, marginBottom: '1rem' }}>{loc.description.slice(0,110)}…</p>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
                      {loc.amenities.slice(0,3).map((a) => <span key={a} className="chip">{a}</span>)}
                    </div>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section style={{ background: 'var(--cream)', borderTop: '1px solid rgba(201,123,42,0.08)', padding: '5rem 1.5rem' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
            <p className="section-label">Simple Process</p>
            <h2 className="section-title">Plan Your Distillery Visit</h2>
          </div>
          <div className="grid-3">
            {[
              { icon:'🗺️', title:'Browse by State', desc:'Explore craft distilleries in any state. Filter by spirit type, tours available, and distance.' },
              { icon:'🥃', title:'Check Details', desc:'Review the distillery profile — spirit lineup, tasting room hours, tour options, and amenities.' },
              { icon:'🎉', title:'Visit & Taste', desc:"Navigate to your chosen distillery and experience the craft. Many offer exclusive bottle releases only available on-site." },
            ].map(({icon,title,desc}) => (
              <div key={title} style={{ textAlign: 'center', padding: '1.5rem', background: 'var(--white)', borderRadius: 'var(--radius)', boxShadow: 'var(--shadow-card)', border: '1px solid rgba(201,123,42,0.1)' }}>
                <div className="step-icon">{icon}</div>
                <h3 style={{ fontFamily: 'var(--font-display)', color: 'var(--charcoal)', fontSize: '1.15rem', marginBottom: '0.75rem' }}>{title}</h3>
                <p style={{ color: 'var(--gray)', lineHeight: 1.7, fontSize: '0.95rem' }}>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Content article */}
      <section style={{ padding: '5rem 1.5rem' }}>
        <div className="container" style={{ maxWidth: '860px' }}>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.8rem', color: 'var(--charcoal)', marginBottom: '1.25rem' }}>{"America's Craft Distillery Renaissance"}</h2>
          <p style={{ lineHeight: 1.85, marginBottom: '1.25rem' }}>The United States is experiencing a golden age of craft distilling. From bourbon country in Kentucky to innovative gin producers in the Pacific Northwest, small-batch distillers are crafting world-class spirits with local ingredients and generations of tradition.</p>
          <p style={{ lineHeight: 1.85, marginBottom: '1.25rem' }}>Craft distilleries differ from large commercial producers in one fundamental way: they care deeply about every bottle. Many source their grain from local farms, use copper pot stills that have been in their families for decades, and age their spirits in small barrels that impart more flavor in less time.</p>
          <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.3rem', color: 'var(--charcoal)', marginTop: '2rem', marginBottom: '0.75rem' }}>What to Expect on a Distillery Tour</h3>
          <p style={{ lineHeight: 1.85, marginBottom: '1.25rem' }}>Most craft distilleries offer guided tours that walk you through the entire production process — from grain to glass. You'll see the mash tuns, fermentation tanks, and gleaming copper stills up close. The highlight is always the tasting room, where you'll sample expressions that may never appear on retail shelves.</p>
          <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.3rem', color: 'var(--charcoal)', marginTop: '2rem', marginBottom: '0.75rem' }}>Supporting Local Distillers</h3>
          <p style={{ lineHeight: 1.85 }}>Every bottle purchased at a craft distillery supports the local economy, small farmers, and passionate artisans. Many craft spirits also reflect regional terroir — the local water, grain, and climate that make each spirit uniquely tied to its place of origin.</p>
        </div>
      </section>

      {/* FAQ */}
      <section style={{ background: 'var(--cream)', borderTop: '1px solid rgba(201,123,42,0.08)', padding: '5rem 1.5rem' }}>
        <div className="container" style={{ maxWidth: '800px' }}>
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <p className="section-label">Common Questions</p>
            <h2 className="section-title">FAQ</h2>
          </div>
          {[
            { q:'What is a craft distillery?', a:'A craft distillery is a small-batch spirits producer that emphasizes quality, local ingredients, and traditional methods over mass production. They typically produce whiskey, gin, rum, vodka, brandy, and other spirits in small quantities.' },
            { q:'Do I need to book distillery tours in advance?', a:'Many craft distilleries require advance reservations for tours and tastings, especially on weekends. Always check the distillery\'s website or call ahead to confirm tour times and availability.' },
            { q:'Can I buy bottles directly from distilleries?', a:'Yes! Most craft distilleries sell exclusive expressions and limited releases only available at their tasting room. This is one of the best reasons to visit in person.' },
            { q:'Are distillery tours family-friendly?', a:'Policies vary. Some distilleries welcome all ages on tours but restrict tasting to adults 21+. Others are adults-only. Always check the distillery\'s age policy before bringing children.' },
            { q:'What is the best time to visit distilleries?', a:'Weekday visits typically offer a more personal experience with staff. Spring and fall are popular times for distillery tourism. Many distilleries release limited seasonal products throughout the year.' },
          ].map(({q,a}) => (
            <details key={q} className="faq-item">
              <summary>{q}</summary>
              <div className="faq-answer">{a}</div>
            </details>
          ))}
        </div>
      </section>

      {/* Browse States */}
      <section style={{ padding: '5rem 1.5rem' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
            <p className="section-label">All 50 States</p>
            <h2 className="section-title">Browse Distilleries by State</h2>
          </div>
          <div className="grid-states">
            {ALL_STATES.map((s) => (
              <Link key={s} href={`/${s.toLowerCase().replace(/\s+/g,'-')}`} className="state-link">{s}</Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ background: 'var(--charcoal)', padding: '4rem 1.5rem', textAlign: 'center' }}>
        <div className="container" style={{ maxWidth: '600px' }}>
          <p className="ornament">— ⬥ —</p>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '2rem', color: 'var(--white)', marginBottom: '1rem' }}>Ready to Explore Craft Spirits?</h2>
          <p style={{ color: '#8a7a6a', marginBottom: '2rem', lineHeight: 1.7, fontFamily: 'var(--font-display)' }}>Discover {locations.length}+ craft distilleries across {statesWithData} states.</p>
          <Link href="/browse" className="btn btn-amber" style={{ padding: '0.9rem 2.25rem', borderRadius: '50px', fontFamily: 'var(--font-display)' }}>Explore Distilleries →</Link>
        </div>
      </section>
    </>
  );
}
