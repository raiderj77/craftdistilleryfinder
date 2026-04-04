import type { Metadata } from "next";
import Script from "next/script";

export const metadata: Metadata = {
  title: {
    template: "%s | Craft Distillery Finder",
    default: "Craft Distillery Finder",
  },
  description:
    "Discover the best craft distilleries across the United States. Tours, tastings, and spirits from local distillers.",
  keywords: [
    "craft distillery",
    "distillery near me",
    "whiskey distillery",
    "craft spirits",
    "distillery tours",
    "local distillery",
  ],
  metadataBase: new URL("https://craftdistilleryfinder.com"),
  alternates: { canonical: "https://craftdistilleryfinder.com" },
  robots: "index, follow, max-snippet:-1",
  verification: { google: "mX6FcyH9VqP8ZGkIPPlPKS4vhvkWOMcz4ebryDGvZjM" },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const toolSites = [
    { name: "Fiber Tools", href: "https://fibertools.app" },
    { name: "Mind Check Tools", href: "https://mindchecktools.com" },
    { name: "Flip My Case", href: "https://flipmycase.com" },
    { name: "Creator Revenue Calculator", href: "https://creatorrevenuecalculator.com" },
    { name: "Contract Extract", href: "https://contractextract.com" },
    { name: "Medical Bill Reader", href: "https://medicalbillreader.com" },
    { name: "Tax Break Tools", href: "https://taxbreaktools.com" },
    { name: "524 Tracker", href: "https://524tracker.com" },
  ];

  const directorySites = [
    { name: "Public Boat Ramps", href: "https://publicboatramps.com" },
    { name: "Find Swim Spots", href: "https://findswimspots.com" },
    { name: "Drive Into Night", href: "https://driveintonight.com" },
    { name: "All Skate Parks", href: "https://allskateparks.com" },
    { name: "Rockhounding Finder", href: "https://rockhoundingfinder.com" },
    { name: "Nearby Escape Rooms", href: "https://nearbyescaperooms.com" },
    { name: "All Skating Rinks", href: "https://allskatingrinks.com" },
    { name: "Soak USA", href: "https://soakusa.net" },
  ];

  return (
    <html lang="en">
      <head>
        <meta name="msvalidate.01" content="C4C9B6256BDEDED169E4DE01CA953390" />
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7171402107622932"
          strategy="afterInteractive"
        />
      </head>
      <body style={{ margin: 0, padding: 0, fontFamily: "sans-serif" }}>
        <header
          style={{
            borderBottom: "1px solid #e5e7eb",
            padding: "1rem 2rem",
            backgroundColor: "#fff",
          }}
        >
          <div
            style={{
              maxWidth: "1200px",
              margin: "0 auto",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <h2
              style={{
                margin: 0,
                fontSize: "1.5rem",
                fontWeight: "bold",
              }}
            >
              <a
                href="/"
                style={{
                  textDecoration: "none",
                  color: "#1f2937",
                }}
              >
                Craft Distillery Finder
              </a>
            </h2>
            <nav style={{ display: "flex", gap: "2rem" }}>
              <a
                href="/"
                style={{
                  textDecoration: "none",
                  color: "#1f2937",
                  fontWeight: "500",
                }}
              >
                Home
              </a>
              <a
                href="/browse"
                style={{
                  textDecoration: "none",
                  color: "#1f2937",
                  fontWeight: "500",
                }}
              >
                Browse States
              </a>
              <a
                href="/about"
                style={{
                  textDecoration: "none",
                  color: "#1f2937",
                  fontWeight: "500",
                }}
              >
                About
              </a>
            </nav>
          </div>
        </header>

        <main style={{ minHeight: "calc(100vh - 200px)" }}>{children}</main>

        <footer
          style={{
            borderTop: "1px solid #e5e7eb",
            padding: "2rem",
            backgroundColor: "#f9fafb",
          }}
        >
          <div
            style={{
              maxWidth: "1200px",
              margin: "0 auto",
            }}
          >
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(2, 1fr)",
                gap: "2rem",
                marginBottom: "2rem",
              }}
            >
              <div>
                <h3 style={{ margin: "0 0 1rem 0", fontSize: "1rem", fontWeight: "bold" }}>
                  Tools
                </h3>
                <ul style={{ margin: 0, padding: 0, listStyle: "none" }}>
                  {toolSites.map((site) => (
                    <li key={site.href} style={{ marginBottom: "0.5rem" }}>
                      <a
                        href={site.href}
                        style={{
                          color: "#2563eb",
                          textDecoration: "none",
                        }}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {site.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 style={{ margin: "0 0 1rem 0", fontSize: "1rem", fontWeight: "bold" }}>
                  Directory Sites
                </h3>
                <ul style={{ margin: 0, padding: 0, listStyle: "none" }}>
                  {directorySites.map((site) => (
                    <li key={site.href} style={{ marginBottom: "0.5rem" }}>
                      <a
                        href={site.href}
                        style={{
                          color: "#2563eb",
                          textDecoration: "none",
                        }}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {site.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div
              style={{
                paddingTop: "2rem",
                borderTop: "1px solid #e5e7eb",
                display: "flex",
                justifyContent: "space-between",
                fontSize: "0.875rem",
                color: "#6b7280",
              }}
            >
              <div style={{ display: "flex", gap: "2rem" }}>
                <a
                  href="/about"
                  style={{
                    color: "#6b7280",
                    textDecoration: "none",
                  }}
                >
                  About
                </a>
                <a
                  href="/privacy"
                  style={{
                    color: "#6b7280",
                    textDecoration: "none",
                  }}
                >
                  Privacy
                </a>
                <a
                  href="/terms"
                  style={{
                    color: "#6b7280",
                    textDecoration: "none",
                  }}
                >
                  Terms
                </a>
                <a
                  href="/contact"
                  style={{
                    color: "#6b7280",
                    textDecoration: "none",
                  }}
                >
                  Contact
                </a>
              </div>
              <div>
                &copy; 2026 Craft Distillery Finder. All rights reserved.
              </div>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
