/* eslint-disable @next/next/no-img-element */
import type { Metadata } from 'next';
import Link from 'next/link';
import locations from '@/data/locations.json';

const MAPBOX_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_TOKEN ?? '';

function getMapboxImage(lat: number, lng: number, width = 800, height = 500): string {
  return `https://api.mapbox.com/styles/v1/mapbox/satellite-streets-v12/static/${lng},${lat},14,0/${width}x${height}?access_token=${MAPBOX_TOKEN}`;
}

export const dynamic = 'force-static';

export const metadata: Metadata = {
  title: 'Craft Distillery Finder - Imported Record Rebuild',
  description: 'Browse imported distillery location records and learn what to verify directly before planning a visit.',
};

export default function Home() {
  const recordsWithCity = locations.filter((location) => location.city).length;
  const regions = Array.from(new Map(locations.map((location) => [location.stateSlug, location.state])).entries()).sort((a, b) => a[1].localeCompare(b[1]));
  const samples = locations.filter((location) => location.city).slice(0, 6);

  return (
    <>
      <div className="notice-bar"><strong>Editorial rebuild:</strong> these are imported location records, not live-verified distillery profiles.</div>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        '@context':'https://schema.org', '@type':'WebSite', url:'https://craftdistilleryfinder.com', name:'Craft Distillery Finder',
      }) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        '@context':'https://schema.org', '@type':'Organization', name:'Craft Distillery Finder', url:'https://craftdistilleryfinder.com',
        description:'A distillery location directory undergoing source and editorial review',
      }) }} />

      <section className="home-hero">
        <div className="container" style={{ textAlign: 'center', position: 'relative', zIndex: 1 }}>
          <p className="section-label">Distillery location records</p>
          <h1 className="hero-title"><span>FIND A RECORD.</span><br />VERIFY THE VISIT.</h1>
          <p className="hero-copy">Browse {locations.length.toLocaleString()} imported names and map coordinates. Confirm that the business is operating and check current tours, tastings, hours, reservations, prices, accessibility, products, and age/ID rules directly with the venue.</p>
          <a href="#browse-regions" className="btn btn-amber">Browse by state</a>
        </div>
      </section>

      <section aria-label="Directory inventory" style={{ background: 'var(--white)', borderBottom: '1px solid rgba(201,123,42,0.12)' }}>
        <div className="container stats-grid">
          <div className="stat-item"><div className="stat-number">{locations.length}</div><div className="stat-label">Imported records</div></div>
          <div className="stat-item"><div className="stat-number">{recordsWithCity}</div><div className="stat-label">With a city field</div></div>
          <div className="stat-item"><div className="stat-number">{locations.length - recordsWithCity}</div><div className="stat-label">Missing a city field</div></div>
          <div className="stat-item"><div className="stat-number">0</div><div className="stat-label">Live-verified profiles</div></div>
        </div>
      </section>

      <section style={{ padding: '5rem 1.5rem 4rem' }}>
        <div className="container">
          <p className="section-label">Sample records</p>
          <h2 className="section-title">What the imported directory contains</h2>
          <p className="section-sub" style={{ marginBottom: '3rem' }}>These examples contain a name, city, state, and coordinates. The dataset has no source, website, phone, hours, product, reservation, or review-date fields.</p>
          <div className="grid-3">
            {samples.map((location) => (
              <Link key={`${location.stateSlug}-${location.slug}`} href={`/${location.stateSlug}/${location.slug}`} style={{ textDecoration: 'none' }}>
                <article className="card">
                  <img src={getMapboxImage(location.lat, location.lng)} alt={`Map imagery near the recorded coordinates for ${location.name}`} className="card-img" loading="lazy" width={800} height={500} />
                  <div className="card-body">
                    <div className="card-meta"><span aria-hidden>Map</span><span>{location.city}, {location.state}</span></div>
                    <h3 className="card-title">{location.name}</h3>
                    <p style={{ fontSize: '0.875rem', color: '#667', lineHeight: 1.65 }}>Imported location record. Verify the business and all visitor details directly.</p>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="dark-section">
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}><p className="section-label">Before visiting</p><h2 className="section-title" style={{ color: 'var(--white)' }}>CHECK CURRENT VENUE DETAILS</h2></div>
          <div className="grid-3">
            {[
              ['Confirm the business', 'Use the recorded name and coordinates as a starting point. Find a current official venue or operator page before traveling.'],
              ['Check the experience', 'Confirm hours, tour or tasting availability, reservations, prices, accessibility, and whether the advertised location admits visitors.'],
              ['Plan responsibly', 'Check the venue’s current age and ID policy. If alcohol is part of the visit, arrange a safe ride and follow all applicable laws and venue rules.'],
            ].map(([title, description]) => <article key={title} className="check-card"><h3>{title}</h3><p>{description}</p></article>)}
          </div>
        </div>
      </section>

      <section id="browse-regions" style={{ padding: '5rem 1.5rem', scrollMarginTop: '6rem' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
            <p className="section-label">Imported directory</p><h2 className="section-title">Browse the 50 represented states</h2>
            <p className="section-sub" style={{ margin: '0 auto' }}>State and record routes remain out of search indexing while the directory is rebuilt with traceable current sources.</p>
          </div>
          <div className="grid-states">{regions.map(([slug, name]) => <Link key={slug} href={`/${slug}`} className="state-link">{name}</Link>)}</div>
        </div>
      </section>

      <section style={{ padding: '4rem 1.5rem', background: 'var(--cream)', borderTop: '1px solid rgba(201,123,42,0.1)' }}>
        <div className="container" style={{ maxWidth: '840px' }}>
          <h2 className="section-title">Source and publication standard</h2>
          <p style={{ lineHeight: 1.85, marginBottom: '1rem' }}>The current repository does not record the origin or collection date of its location data. Every record carries the same generic `Tastings` and `Tours` labels even though no venue source or website is stored. Those labels are not presented as current facts.</p>
          <p style={{ lineHeight: 1.85, marginBottom: '1rem' }}>A future indexable profile must cite a current official distillery or operator source, state what was reviewed and when, and separate operator-published facts from editorial guidance. No health, quality, award, scarcity, or investment claim will be inferred.</p>
          <p style={{ lineHeight: 1.85 }}>To report a record problem, use the <Link href="/contact">contact page</Link> and include the record URL plus a current source when possible.</p>
        </div>
      </section>
    </>
  );
}
