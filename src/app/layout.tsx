import type { Metadata } from 'next';
import Script from 'next/script';
import { Playfair_Display, Source_Serif_4 } from 'next/font/google';
import './globals.css';

const playfair = Playfair_Display({ subsets: ['latin'], variable: '--font-display', display: 'swap', weight: ['400','600','700','800'] });
const sourceSerif = Source_Serif_4({ subsets: ['latin'], variable: '--font-body', display: 'swap', weight: ['300','400','600','700'] });

export const metadata: Metadata = {
  title: { template: '%s | Craft Distillery Finder', default: 'Craft Distillery Finder — Discover Local Distilleries Across America' },
  description: 'Discover the best craft distilleries across the United States. Tours, tastings, and artisan spirits from local distillers.',
  keywords: 'craft distillery, distillery near me, whiskey distillery, craft spirits, distillery tours, local distillery',
  metadataBase: new URL('https://craftdistilleryfinder.com'),
  alternates: { canonical: 'https://craftdistilleryfinder.com' },
  robots: 'index, follow, max-snippet:-1',
  verification: { google: 'mX6FcyH9VqP8ZGkIPPlPKS4vhvkWOMcz4ebryDGvZjM' },
};

const toolSites = [
  { name: 'Fiber Tools', href: 'https://fibertools.app' }, { name: 'Mind Check Tools', href: 'https://mindchecktools.com' },
  { name: 'Flip My Case', href: 'https://flipmycase.com' }, { name: 'Creator Revenue Calculator', href: 'https://creatorrevenuecalculator.com' },
  { name: 'Contract Extract', href: 'https://contractextract.com' }, { name: 'Medical Bill Reader', href: 'https://medicalbillreader.com' },
  { name: 'Tax Break Tools', href: 'https://taxbreaktools.com' }, { name: '524 Tracker', href: 'https://524tracker.com' },
];
const directorySites = [
  { name: 'Public Boat Ramps', href: 'https://publicboatramps.com' }, { name: 'Find Swim Spots', href: 'https://findswimspots.com' },
  { name: 'Drive-In Tonight', href: 'https://driveintonight.com' }, { name: 'All Skate Parks', href: 'https://allskateparks.com' },
  { name: 'Rockhounding Finder', href: 'https://rockhoundingfinder.com' }, { name: 'Nearby Escape Rooms', href: 'https://nearbyescaperooms.com' },
  { name: 'All Skating Rinks', href: 'https://allskatingrinks.com' }, { name: 'Soak USA', href: 'https://soakusa.net' },
];

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${playfair.variable} ${sourceSerif.variable}`}>
      <head>
        <meta name="msvalidate.01" content="C4C9B6256BDEDED169E4DE01CA953390" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <script dangerouslySetInnerHTML={{ __html: `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('consent','default',{ad_storage:'denied',ad_user_data:'denied',ad_personalization:'denied',analytics_storage:'denied',functionality_storage:'denied',personalization_storage:'denied',wait_for_update:500});` }} />
        <Script src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7171402107622932" strategy="afterInteractive" />
        <Script id="clarity-script" strategy="afterInteractive">{`(function(c,l,a,r,i,t,y){c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);})(window,document,"clarity","script","vsqobt7va0");`}</Script>
      </head>
      <body>
        <header style={{ background: 'var(--charcoal)', borderBottom: '3px solid var(--amber)', position: 'sticky', top: 0, zIndex: 1000, boxShadow: '0 2px 20px rgba(28,24,20,0.5)' }}>
          <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0.9rem 1.5rem' }}>
            <a href="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
              <span style={{ fontSize: '1.5rem', lineHeight: 1 }}>🥃</span>
              <span style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '1.15rem', color: 'var(--amber-lt)', letterSpacing: '0.01em' }}>Craft Distillery Finder</span>
            </a>
            <nav style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
              <a href="/" style={{ color: 'var(--amber-pale)', fontSize: '0.9rem', fontWeight: 600, textDecoration: 'none', fontFamily: 'var(--font-display)' }}>Home</a>
              <a href="/browse" style={{ color: 'var(--amber-pale)', fontSize: '0.9rem', fontWeight: 600, textDecoration: 'none', fontFamily: 'var(--font-display)' }}>Browse States</a>
              <a href="/about" style={{ color: 'var(--amber-pale)', fontSize: '0.9rem', fontWeight: 600, textDecoration: 'none', fontFamily: 'var(--font-display)' }}>About</a>
            </nav>
          </div>
        </header>

        <main style={{ minHeight: 'calc(100vh - 340px)' }}>{children}</main>

        <footer style={{ background: 'var(--charcoal)', borderTop: '3px solid var(--char-mid)', marginTop: '5rem', padding: '3rem 0 2rem' }}>
          <div className="container">
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '2rem', marginBottom: '2.5rem' }}>
              <div>
                <p style={{ fontFamily: 'var(--font-display)', color: 'var(--amber-lt)', fontWeight: 700, fontSize: '1.1rem', marginBottom: '0.75rem' }}>🥃 Craft Distillery Finder</p>
                <p style={{ color: '#8a7a6a', fontSize: '0.875rem', lineHeight: 1.7 }}>Discover artisan craft distilleries, tours, and tastings across the United States. Support local distillers crafting exceptional spirits.</p>
              </div>
              <div>
                <h4 style={{ color: 'var(--amber)', fontSize: '0.78rem', textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: '1rem', fontFamily: 'var(--font-display)' }}>Directory Sites</h4>
                <ul style={{ listStyle: 'none' }}>
                  {directorySites.map((s) => <li key={s.href} style={{ marginBottom: '0.4rem' }}><a href={s.href} target="_blank" rel="noopener noreferrer" style={{ color: '#8a7a6a', fontSize: '0.875rem', textDecoration: 'none' }}>{s.name}</a></li>)}
                </ul>
              </div>
              <div>
                <h4 style={{ color: 'var(--amber)', fontSize: '0.78rem', textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: '1rem', fontFamily: 'var(--font-display)' }}>Tools</h4>
                <ul style={{ listStyle: 'none' }}>
                  {toolSites.map((s) => <li key={s.href} style={{ marginBottom: '0.4rem' }}><a href={s.href} target="_blank" rel="noopener noreferrer" style={{ color: '#8a7a6a', fontSize: '0.875rem', textDecoration: 'none' }}>{s.name}</a></li>)}
                </ul>
              </div>
            </div>
            <div style={{ borderTop: '1px solid rgba(255,255,255,0.07)', paddingTop: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
              <p style={{ color: '#5a4a3a', fontSize: '0.85rem' }}>© 2026 Craft Distillery Finder. All rights reserved.</p>
              <div style={{ display: 'flex', gap: '1.5rem' }}>
                {[['Privacy', '/privacy'], ['Terms', '/terms'], ['Contact', '/contact'], ['About', '/about']].map(([l, h]) => (
                  <a key={h} href={h} style={{ color: '#5a4a3a', fontSize: '0.85rem', textDecoration: 'none', fontFamily: 'var(--font-display)' }}>{l}</a>
                ))}
              </div>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
