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

export const revalidate = 86400;

const stateList = [
  { name: 'Alabama', slug: 'alabama' }, { name: 'Alaska', slug: 'alaska' },
  { name: 'Arizona', slug: 'arizona' }, { name: 'Arkansas', slug: 'arkansas' },
  { name: 'California', slug: 'california' }, { name: 'Colorado', slug: 'colorado' },
  { name: 'Connecticut', slug: 'connecticut' }, { name: 'Delaware', slug: 'delaware' },
  { name: 'Florida', slug: 'florida' }, { name: 'Georgia', slug: 'georgia' },
  { name: 'Hawaii', slug: 'hawaii' }, { name: 'Idaho', slug: 'idaho' },
  { name: 'Illinois', slug: 'illinois' }, { name: 'Indiana', slug: 'indiana' },
  { name: 'Iowa', slug: 'iowa' }, { name: 'Kansas', slug: 'kansas' },
  { name: 'Kentucky', slug: 'kentucky' }, { name: 'Louisiana', slug: 'louisiana' },
  { name: 'Maine', slug: 'maine' }, { name: 'Maryland', slug: 'maryland' },
  { name: 'Massachusetts', slug: 'massachusetts' }, { name: 'Michigan', slug: 'michigan' },
  { name: 'Minnesota', slug: 'minnesota' }, { name: 'Mississippi', slug: 'mississippi' },
  { name: 'Missouri', slug: 'missouri' }, { name: 'Montana', slug: 'montana' },
  { name: 'Nebraska', slug: 'nebraska' }, { name: 'Nevada', slug: 'nevada' },
  { name: 'New Hampshire', slug: 'new-hampshire' }, { name: 'New Jersey', slug: 'new-jersey' },
  { name: 'New Mexico', slug: 'new-mexico' }, { name: 'New York', slug: 'new-york' },
  { name: 'North Carolina', slug: 'north-carolina' }, { name: 'North Dakota', slug: 'north-dakota' },
  { name: 'Ohio', slug: 'ohio' }, { name: 'Oklahoma', slug: 'oklahoma' },
  { name: 'Oregon', slug: 'oregon' }, { name: 'Pennsylvania', slug: 'pennsylvania' },
  { name: 'Rhode Island', slug: 'rhode-island' }, { name: 'South Carolina', slug: 'south-carolina' },
  { name: 'South Dakota', slug: 'south-dakota' }, { name: 'Tennessee', slug: 'tennessee' },
  { name: 'Texas', slug: 'texas' }, { name: 'Utah', slug: 'utah' },
  { name: 'Vermont', slug: 'vermont' }, { name: 'Virginia', slug: 'virginia' },
  { name: 'Washington', slug: 'washington' }, { name: 'West Virginia', slug: 'west-virginia' },
  { name: 'Wisconsin', slug: 'wisconsin' }, { name: 'Wyoming', slug: 'wyoming' },
];

function getStateName(slug: string) {
  return stateList.find((s) => s.slug === slug)?.name ?? slug.split('-').map((w) => w[0].toUpperCase() + w.slice(1)).join(' ');
}

export async function generateStaticParams() {
  return locations.map((l) => ({ state: l.stateSlug, slug: l.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ state: string; slug: string }> }): Promise<Metadata> {
  const { state, slug } = await params;
  const location = locations.find((l) => l.slug === slug);
  const stateName = getStateName(state);
  return {
    title: `${location?.name ?? 'Craft Distillery'} — Distillery in ${stateName}`,
    description: location?.description ?? `Craft distillery in ${stateName}. Tours, tastings, and artisan spirits.`,
    alternates: { canonical: `https://craftdistilleryfinder.com/${state}/${slug}` },
    openGraph: { title: `${location?.name} | Craft Distillery Finder`, description: location?.description, url: `https://craftdistilleryfinder.com/${state}/${slug}` },
  };
}

const AMENITY_ICONS: Record<string, string> = {
  'Tasting room': '🥃', 'Tours available': '🗺️', 'Retail shop': '🛍️', 'Parking': '🅿️',
  'Events space': '🎉', 'Dog friendly': '🐕', 'Wheelchair accessible': '♿',
  'Outdoor seating': '🌿', 'Food available': '🍽️', 'Reservations required': '📅',
  'Gift shop': '🎁', 'Bar': '🍸',
};

export default async function DistilleryPage({ params }: { params: Promise<{ state: string; slug: string }> }) {
  const { state, slug } = await params;
  const location = locations.find((l) => l.slug === slug);
  const stateName = getStateName(state);

  if (!location) {
    return (
      <div style={{ textAlign: 'center', padding: '5rem 2rem' }}>
        <p style={{ fontSize: '3rem', marginBottom: '1rem' }}>🥃</p>
        <h1 style={{ fontFamily: 'var(--font-display)', color: 'var(--charcoal)' }}>Distillery Not Found</h1>
        <Link href="/" className="btn btn-amber" style={{ display: 'inline-flex', marginTop: '1.5rem' }}>← Back to Home</Link>
      </div>
    );
  }

  const related = locations.filter((l) => l.stateSlug === state && l.slug !== slug).slice(0, 3);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        '@context': 'https://schema.org', '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://craftdistilleryfinder.com' },
          { '@type': 'ListItem', position: 2, name: stateName, item: `https://craftdistilleryfinder.com/${state}` },
          { '@type': 'ListItem', position: 3, name: location.name, item: `https://craftdistilleryfinder.com/${state}/${slug}` },
        ],
      }) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        '@context': 'https://schema.org', '@type': 'Winery',
        name: location.name, description: location.description,
        geo: { '@type': 'GeoCoordinates', latitude: location.lat, longitude: location.lng },
        address: { '@type': 'PostalAddress', addressLocality: location.city, addressRegion: location.state, addressCountry: 'US' },
        amenityFeature: location.amenities.map((a) => ({ '@type': 'LocationFeatureSpecification', name: a, value: true })),
      }) }} />

      {/* Hero */}
      <div style={{ position: 'relative', height: '440px', overflow: 'hidden', background: 'linear-gradient(160deg, var(--charcoal) 0%, var(--char-mid) 100%)' }}>
        <img
          src={getMapboxImage(location.lat, location.lng, 1400, 600)}
          alt={`${location.name} craft distillery`}
          style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', opacity: 0.85 }}
          width={1600}
          height={800}
        />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(28,24,20,0.92) 0%, rgba(28,24,20,0.3) 55%, transparent 100%)' }} />
        <div className="container" style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '2rem 1.5rem' }}>
          <Link href={`/${state}`} style={{ color: 'var(--amber-lt)', fontSize: '0.875rem', display: 'inline-flex', alignItems: 'center', gap: '0.4rem', marginBottom: '1rem', fontWeight: 700, fontFamily: 'var(--font-display)' }}>
            ← {stateName} Distilleries
          </Link>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.6rem, 3.5vw, 2.6rem)', color: 'white', marginBottom: '0.6rem', fontWeight: 800 }}>{location.name}</h1>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
            <span style={{ color: 'var(--amber-pale)', fontSize: '0.9rem', fontFamily: 'var(--font-display)' }}>📍 {location.city ? `${location.city}, ` : ''}{location.state}</span>
            <span className="chip chip-white">🥃 Craft Distillery</span>
          </div>
        </div>
        <svg aria-hidden viewBox="0 0 1440 40" xmlns="http://www.w3.org/2000/svg" style={{ position: 'absolute', bottom: 0, left: 0, width: '100%', display: 'block' }} preserveAspectRatio="none">
          <path d="M0,20 C360,40 1080,0 1440,20 L1440,40 L0,40 Z" fill="var(--ivory)" />
        </svg>
      </div>

      {/* Main content */}
      <section style={{ padding: '4rem 1.5rem' }}>
        <div className="container" style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: '3rem', alignItems: 'start' }}>

          {/* Left */}
          <div>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', color: 'var(--charcoal)', marginBottom: '1rem' }}>About This Distillery</h2>
            <p style={{ lineHeight: 1.9, marginBottom: '2.5rem', color: 'var(--text)', fontSize: '1.025rem' }}>
              {location.name} is a craft distillery located in {location.city ? `${location.city}, ` : ''}{location.state}.{' '}
              {location.amenities.length > 0 ? `Visitors can enjoy ${location.amenities.slice(0, 2).join(' and ').toLowerCase()}.` : 'Open for tastings and tours.'}{' '}
              Find directions using the GPS coordinates below.
            </p>

            {location.amenities.length > 0 && (
              <>
                <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', color: 'var(--charcoal)', marginBottom: '1.25rem' }}>What&apos;s Available</h2>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '0.75rem', marginBottom: '2.5rem' }}>
                  {location.amenities.map((amenity) => (
                    <div key={amenity} style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', background: 'var(--white)', padding: '0.75rem 1rem', borderRadius: 'var(--radius-sm)', boxShadow: '0 1px 6px rgba(28,24,20,0.07)', border: '1px solid rgba(201,123,42,0.15)' }}>
                      <span>{AMENITY_ICONS[amenity] ?? '✓'}</span>
                      <span style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--charcoal)', fontFamily: 'var(--font-display)' }}>{amenity}</span>
                    </div>
                  ))}
                </div>
              </>
            )}

            {/* Map */}
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', color: 'var(--charcoal)', marginBottom: '1rem' }}>Location</h2>
            <div style={{ background: 'linear-gradient(135deg, var(--charcoal) 0%, #1a1008 100%)', borderRadius: 'var(--radius)', height: '280px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '0.75rem', marginBottom: '2rem' }}>
              <span style={{ fontSize: '2.5rem' }}>🗺️</span>
              <p style={{ color: 'var(--amber-lt)', fontFamily: 'var(--font-display)', fontWeight: 700 }}>GPS: {location.lat.toFixed(5)}, {location.lng.toFixed(5)}</p>
              <p style={{ color: '#8a7a6a', fontSize: '0.875rem' }}>Open in your mapping app for directions</p>
              <a
                href={`https://maps.google.com/?q=${location.lat},${location.lng}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-amber"
                style={{ marginTop: '0.5rem', padding: '0.65rem 1.5rem', fontSize: '0.875rem' }}
              >
                Get Directions →
              </a>
            </div>

            <div style={{ background: 'rgba(201,123,42,0.06)', border: '1px solid rgba(201,123,42,0.2)', borderRadius: 'var(--radius-sm)', padding: '1rem 1.25rem' }}>
              <p style={{ fontSize: '0.82rem', color: '#667', lineHeight: 1.7 }}>
                <strong style={{ color: 'var(--charcoal)' }}>Disclaimer:</strong> Information is provided for reference only. Always verify hours, tour availability, and any reservation requirements directly with the distillery before visiting.
              </p>
            </div>
          </div>

          {/* Right — sticky panel */}
          <aside>
            <div style={{ background: 'var(--white)', borderRadius: 'var(--radius)', boxShadow: 'var(--shadow-card)', overflow: 'hidden', border: '1px solid rgba(201,123,42,0.18)', position: 'sticky', top: '90px' }}>
              <div style={{ background: 'var(--charcoal)', padding: '1.25rem 1.5rem', borderBottom: '2px solid var(--amber)' }}>
                <h3 style={{ fontFamily: 'var(--font-display)', color: 'var(--amber-lt)', fontSize: '1.1rem', margin: 0 }}>Distillery Details</h3>
              </div>
              <div style={{ padding: '1.25rem 1.5rem' }}>
                {[
                  ['📍 Location', `${location.city ? `${location.city}, ` : ''}${location.state}`],
                  ['🌐 State', location.state],
                  ['🗺️ Latitude', location.lat.toFixed(5)],
                  ['🗺️ Longitude', location.lng.toFixed(5)],
                  ['🥃 Offerings', `${location.amenities.length} listed`],
                  ['🎟️ Entry', 'Varies by experience'],
                  ['🏷️ Type', 'Craft Distillery'],
                ].map(([label, value]) => (
                  <div key={String(label)} style={{ paddingBottom: '0.85rem', marginBottom: '0.85rem', borderBottom: '1px solid rgba(28,24,20,0.07)' }}>
                    <div style={{ fontSize: '0.75rem', color: 'var(--gray)', textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: '0.2rem', fontFamily: 'var(--font-display)' }}>{label}</div>
                    <div style={{ fontWeight: 600, color: 'var(--charcoal)', fontSize: '0.9rem', fontFamily: 'var(--font-display)' }}>{value}</div>
                  </div>
                ))}
                <Link href={`/${state}`} className="btn btn-amber" style={{ width: '100%', marginTop: '0.5rem', justifyContent: 'center' }}>
                  More in {stateName} →
                </Link>
              </div>
            </div>
          </aside>
        </div>
      </section>

      {/* Related */}
      {related.length > 0 && (
        <section style={{ background: 'var(--cream)', borderTop: '1px solid rgba(201,123,42,0.08)', padding: '4rem 1.5rem' }}>
          <div className="container">
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.6rem', color: 'var(--charcoal)', marginBottom: '2rem' }}>More Distilleries in {stateName}</h2>
            <div className="grid-3">
              {related.map((loc, i) => (
                <Link key={loc.slug} href={`/${state}/${loc.slug}`} style={{ textDecoration: 'none' }}>
                  <article className="card">
                    <img src={getMapboxImage(loc.lat, loc.lng)} alt={loc.name} className="card-img" loading="lazy" width={800} height={400} />
                    <div className="card-body">
                      <div className="card-meta"><span>📍</span><span>{loc.city ? `${loc.city}, ` : ''}{loc.state}</span></div>
                      <h3 className="card-title">{loc.name}</h3>
                      <p style={{ fontSize: '0.85rem', color: '#667', lineHeight: 1.6 }}>{getDistilleryPreview(loc)}</p>
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
