/* eslint-disable @next/next/no-img-element */
import type { Metadata } from 'next';
import Link from 'next/link';
import locations from '@/data/locations.json';

const MAPBOX_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_TOKEN ?? '';

function getMapboxImage(lat: number, lng: number, width = 800, height = 500): string {
  return `https://api.mapbox.com/styles/v1/mapbox/satellite-streets-v12/static/${lng},${lat},14,0/${width}x${height}?access_token=${MAPBOX_TOKEN}`;
}

function getDistilleryPreview(d: { name: string; state: string; city: string; amenities: string[]; description: string }): string {
  const amenityCount = d.amenities.length;
  const location = d.city ? `${d.city}, ${d.state}` : d.state;
  if (amenityCount >= 2) {
    return `Craft distillery in ${location} offering ${d.amenities.slice(0, 2).join(' and ').toLowerCase()}.`;
  }
  return `Craft distillery in ${location}. Open for visitors.`;
}

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

export default function Home() {
  const featured = locations.slice(0, 6);
  const statesWithData = Array.from(new Set(locations.map((l) => l.state))).length;

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        '@context':'https://schema.org','@type':'WebSite',url:'https://craftdistilleryfinder.com',
        name:'Craft Distillery Finder',dateModified:'2026-04-07',
        potentialAction:{'@type':'SearchAction',target:{'@type':'EntryPoint',urlTemplate:'https://craftdistilleryfinder.com/search?q={search_term_string}'},'query-input':'required name=search_term_string'},
      }) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        '@context':'https://schema.org','@type':'Organization',
        name:'Craft Distillery Finder',
        url:'https://craftdistilleryfinder.com',
        description:'Directory of craft distilleries across the United States',
        dateModified:'2026-04-07',
      }) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        '@context':'https://schema.org','@type':'LocalBusiness',
        name:'Craft Distillery Finder Directory',
        url:'https://craftdistilleryfinder.com',
        description:'Find craft distilleries, tasting rooms, and spirits tours near you',
        areaServed:'United States',
        dateModified:'2026-04-07',
      }) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        '@context':'https://schema.org','@type':'FAQPage',
        dateModified:'2026-04-07',
        mainEntity:[
          {'@type':'Question',name:'How do I find a craft distillery near me?',acceptedAnswer:{'@type':'Answer',text:'Use the Craft Distillery Finder to search by state, city, or spirit type. Each listing includes the distillery address, tasting room hours, available spirits, tour information, and whether reservations are required.'}},
          {'@type':'Question',name:'Do craft distilleries offer tours and tastings?',acceptedAnswer:{'@type':'Answer',text:'Most craft distilleries offer tasting room experiences, and many provide behind-the-scenes distillery tours. Tour availability, duration, and cost vary by location — some are free with a tasting purchase while others charge $15 to $30 per person. Check individual listings for current tour schedules and reservation requirements.'}},
          {'@type':'Question',name:'What spirits do craft distilleries typically produce?',acceptedAnswer:{'@type':'Answer',text:'American craft distilleries produce a wide range of spirits including bourbon, rye whiskey, vodka, gin, rum, brandy, and specialty spirits using local grains and botanicals. Many focus on small-batch production with distinctive regional character not found in mass-market brands.'}},
          {'@type':'Question',name:'Are craft distillery tasting rooms open to the public?',acceptedAnswer:{'@type':'Answer',text:'Most craft distillery tasting rooms welcome walk-in visitors during posted hours, though some require advance reservations, especially on weekends. Hours vary seasonally — always check the distillery listing or contact them directly before visiting.'}},
          {'@type':'Question',name:'How many craft distilleries are there in the United States?',acceptedAnswer:{'@type':'Answer',text:'The United States has over 2,000 craft distilleries operating across all 50 states, with the highest concentrations in Kentucky, New York, Colorado, Washington, and Texas. The craft spirits industry has grown over 700% since 2010 according to the American Craft Spirits Association.'}},
        ],
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
          <div className="anim-fade-up anim-delay-3" style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', justifyContent: 'center', marginTop: '2rem' }}>
            <a href="/alabama" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.85rem 2rem', borderRadius: 'var(--radius-pill, 50px)', fontWeight: 700, fontSize: '0.95rem', background: 'var(--amber)', color: 'var(--charcoal)', textDecoration: 'none', transition: 'background 0.2s' }}>Browse Distilleries →</a>
            <a href="/kentucky" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.85rem 2rem', borderRadius: 'var(--radius-pill, 50px)', fontWeight: 700, fontSize: '0.95rem', background: 'transparent', color: 'white', border: '2px solid rgba(201,168,76,0.4)', textDecoration: 'none', transition: 'background 0.2s' }}>Kentucky Bourbon Trail</a>
          </div>
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
                  <img src={getMapboxImage(loc.lat, loc.lng)} alt={loc.name} className="card-img" loading="lazy" width={800} height={500} />
                  <div className="card-body">
                    <div className="card-meta"><span>📍</span><span>{loc.city ? `${loc.city}, ` : ''}{loc.state}</span></div>
                    <h3 className="card-title">{loc.name}</h3>
                    <p style={{ fontSize: '0.875rem', color: '#667', lineHeight: 1.65, flex: 1, marginBottom: '1rem' }}>{getDistilleryPreview(loc)}</p>
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

      {/* GEO Content */}
      <section style={{ background: 'var(--cream)', borderTop: '1px solid rgba(201,123,42,0.08)', padding: '5rem 1.5rem' }}>
        <div className="container" style={{ maxWidth: '860px' }}>

          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.8rem', color: 'var(--charcoal)', marginBottom: '1rem' }}>How to plan a craft distillery visit</h2>
          <p style={{ fontWeight: 700, lineHeight: 1.75, marginBottom: '0.75rem', color: 'var(--charcoal)' }}>Check tasting room hours and reservation requirements before visiting — most distilleries are open Thursday through Sunday and require advance booking for tours. Bring a designated driver or arrange transportation.</p>
          <p style={{ lineHeight: 1.85, marginBottom: '1rem', color: '#4b5563' }}>When you arrive at a tasting room, expect to receive a curated flight of three to six poured samples, often guided by a knowledgeable staff member who can walk you through production methods and ingredient sourcing. Distillery tours typically run 30 to 60 minutes and take you through the still house, fermentation area, and barrel storage. To get the most from your visit, ask about limited releases and single-barrel selections that are only available on-site. The United States has over 2,000 craft distilleries operating across all 50 states, so no matter where you are, a great tasting experience is within reach.</p>

          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.8rem', color: 'var(--charcoal)', marginBottom: '1rem', marginTop: '3rem' }}>What makes craft spirits different from mass-market brands?</h2>
          <p style={{ fontWeight: 700, lineHeight: 1.75, marginBottom: '0.75rem', color: 'var(--charcoal)' }}>Craft distilleries typically use locally sourced grains and botanicals, smaller batch sizes, and hands-on production methods that create distinctive regional flavors not found in national brands.</p>
          <p style={{ lineHeight: 1.85, marginBottom: '1rem', color: '#4b5563' }}>The craft spirits movement draws from the same ethos as craft beer and artisan wine — a belief that what goes into the bottle, and where it comes from, matters enormously to the final flavor. Small-batch distillation allows producers to experiment with heirloom grain varieties, local honey, seasonal botanicals, and unconventional aging vessels that large distilleries cannot afford to pursue at scale. Much like wine, terroir plays a meaningful role: the mineral content of local water, the humidity in a Kentucky warehouse, and the oak character of a Texas barrel all leave their mark. The craft spirits industry has grown over 700% since 2010 according to the American Craft Spirits Association, reflecting how dramatically consumer appetite for distinctive, place-driven spirits has accelerated.</p>

          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.8rem', color: 'var(--charcoal)', marginBottom: '1rem', marginTop: '3rem' }}>What should I know before visiting a distillery tasting room?</h2>
          <p style={{ fontWeight: 700, lineHeight: 1.75, marginBottom: '0.75rem', color: 'var(--charcoal)' }}>Bring a valid government-issued ID — distilleries are required to verify age for all tasting room visitors. Most tasting rooms charge $10 to $20 for a flight of samples, often credited toward a bottle purchase.</p>
          <p style={{ lineHeight: 1.85, marginBottom: '1rem', color: '#4b5563' }}>Tasting room etiquette is relaxed but respectful: sip slowly, engage with staff, and feel free to ask questions — distillers genuinely enjoy sharing their craft with interested visitors. If you plan to purchase bottles to take home, note that quantity limits and shipping rules vary significantly by state; some states allow direct-to-consumer shipping while others require all bottles to leave in your personal luggage. Craft spirits sales exceeded $6 billion in 2023, representing approximately 10% of the total U.S. spirits market by volume — a sign of just how mainstream the craft movement has become, even as each bottle retains a distinctly local character.</p>

          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.8rem', color: 'var(--charcoal)', marginBottom: '1rem', marginTop: '3rem' }}>Which states have the most craft distilleries?</h2>
          <p style={{ fontWeight: 700, lineHeight: 1.75, marginBottom: '0.75rem', color: 'var(--charcoal)' }}>Kentucky leads in bourbon production with over 90 distilleries, followed by New York, Colorado, Washington, and Texas. Each region produces spirits with distinctive local character influenced by climate, water, and available grains.</p>
          <p style={{ lineHeight: 1.85, marginBottom: '2rem', color: '#4b5563' }}>Regional specialties have become a major draw for spirits tourism: New York is known for apple brandy and Empire rye, Colorado for high-altitude gin and whiskey, Washington for grain-forward vodka and single malt, and Texas for robust bourbons aged in rapidly expanding barrels under the summer heat. State regulations directly affect distillery density — states with favorable direct-sales laws and lower licensing fees tend to see faster growth in the craft sector.</p>

          <div style={{ borderTop: '1px solid rgba(201,123,42,0.2)', paddingTop: '1.5rem' }}>
            <p style={{ fontSize: '0.875rem', color: '#6b7280', marginBottom: '0.5rem', fontWeight: 600 }}>Further Reading</p>
            <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
              <li><a href="https://americancraftspirits.com" target="_blank" rel="noopener noreferrer nofollow" style={{ color: '#2563eb', fontSize: '0.875rem' }}>American Craft Spirits Association</a></li>
              <li><a href="https://distilledspirits.org" target="_blank" rel="noopener noreferrer nofollow" style={{ color: '#2563eb', fontSize: '0.875rem' }}>Distilled Spirits Council of the United States</a></li>
              <li><a href="https://ttb.gov" target="_blank" rel="noopener noreferrer nofollow" style={{ color: '#2563eb', fontSize: '0.875rem' }}>TTB — Craft Beverage Modernization Resources</a></li>
            </ul>
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
