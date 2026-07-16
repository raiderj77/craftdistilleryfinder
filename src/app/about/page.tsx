import Link from 'next/link';

export const metadata = {
  title: 'About the Craft Distillery Finder Rebuild',
  description: 'How Craft Distillery Finder handles imported records, source verification, age-sensitive content, and publication decisions.',
};

export default function AboutPage() {
  return (
    <div>
      <section className="home-hero" style={{ padding: '4.5rem 1.5rem' }}>
        <div className="container" style={{ maxWidth: '840px', position: 'relative', zIndex: 1 }}>
          <p className="section-label">About the directory</p>
          <h1 style={{ color: 'var(--white)', fontSize: 'clamp(2rem,5vw,3.5rem)', marginBottom: '1rem' }}>IMPORTED RECORDS UNDER REVIEW</h1>
          <p className="hero-copy" style={{ margin: 0 }}>Craft Distillery Finder is being rebuilt as a source-transparent visitor-planning directory. Current entries are discovery leads, not live-verified venue profiles.</p>
        </div>
      </section>

      <section style={{ padding: '4rem 1.5rem' }}>
        <div className="container" style={{ maxWidth: '840px' }}>
          <h2 className="section-title">What the current data contains</h2>
          <p style={{ lineHeight: 1.85, marginBottom: '1rem' }}>The repository contains 596 records with a name, state, latitude, and longitude. Of those, 354 contain a city and 242 do not. The data represents all 50 states.</p>
          <p style={{ lineHeight: 1.85, marginBottom: '2.5rem' }}>Every record carries exactly the same two generic labels: `Tastings` and `Tours`. The dataset contains no source, website, phone, hours, products, reservation, accessibility, age-policy, price, or review-date fields. Its origin and collection date are not recorded.</p>

          <h2 className="section-title">Publication standard</h2>
          <p style={{ lineHeight: 1.85, marginBottom: '1rem' }}>A future indexable profile must cite a current official distillery or operator source, state what was reviewed and when, and distinguish operator-published facts from editorial guidance.</p>
          <p style={{ lineHeight: 1.85, marginBottom: '1rem' }}>Tour, tasting, visitor-access, product, price, hours, reservation, award, quality, scarcity, and health claims remain absent unless the cited source supports them. State and record pages remain excluded from search indexing during this rebuild.</p>
          <p style={{ lineHeight: 1.85, marginBottom: '2.5rem' }}>Age and ID rules vary by venue and activity. Visitors must check the current policy and applicable law directly. If alcohol is part of a visit, arrange a safe ride.</p>

          <h2 className="section-title">Corrections</h2>
          <p style={{ lineHeight: 1.85 }}>To report a closed business, incorrect coordinate, or other problem, use the <Link href="/contact">contact page</Link>. Include the record URL and a current official source when possible. Submissions are reviewed before publication.</p>
        </div>
      </section>
    </div>
  );
}
