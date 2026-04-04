import Link from "next/link";
import locations from "@/data/locations.json";

export const dynamic = "force-static";

const states = [
  "Alabama",
  "Alaska",
  "Arizona",
  "Arkansas",
  "California",
  "Colorado",
  "Connecticut",
  "Delaware",
  "Florida",
  "Georgia",
  "Hawaii",
  "Idaho",
  "Illinois",
  "Indiana",
  "Iowa",
  "Kansas",
  "Kentucky",
  "Louisiana",
  "Maine",
  "Maryland",
  "Massachusetts",
  "Michigan",
  "Minnesota",
  "Mississippi",
  "Missouri",
  "Montana",
  "Nebraska",
  "Nevada",
  "New Hampshire",
  "New Jersey",
  "New Mexico",
  "New York",
  "North Carolina",
  "North Dakota",
  "Ohio",
  "Oklahoma",
  "Oregon",
  "Pennsylvania",
  "Rhode Island",
  "South Carolina",
  "South Dakota",
  "Tennessee",
  "Texas",
  "Utah",
  "Vermont",
  "Virginia",
  "Washington",
  "West Virginia",
  "Wisconsin",
  "Wyoming",
];

function stateSlug(state: string): string {
  return state.toLowerCase().replace(/\s+/g, "-");
}

function getFeaturedLocations() {
  return locations.slice(0, 6);
}

export const metadata = {
  title: "Find Craft Distilleries Near You",
  description:
    "Discover the best craft distilleries across the United States. Tours, tastings, and spirits from local distillers.",
};

export default function Home() {
  const featured = getFeaturedLocations();

  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Craft Distillery Finder",
    url: "https://craftdistilleryfinder.com",
    logo: "https://craftdistilleryfinder.com/logo.png",
    description:
      "A directory of craft distilleries across the United States with information about tours, tastings, and local spirits.",
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    url: "https://craftdistilleryfinder.com",
    name: "Craft Distillery Finder",
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate:
          "https://craftdistilleryfinder.com/search?q={search_term_string}",
      },
      query_input: "required name=search_term_string",
    },
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "What is a craft distillery?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "A craft distillery is a small-scale spirits producer that typically focuses on quality, innovation, and traditional techniques. Craft distilleries often use locally-sourced ingredients and produce limited quantities of unique spirits.",
        },
      },
      {
        "@type": "Question",
        name: "Do I need a reservation to visit a craft distillery?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Reservations policies vary by distillery. Many craft distilleries accept walk-ins for tastings, but some require advance reservations for tours or group visits. Always contact the distillery before your visit to confirm their policy.",
        },
      },
      {
        "@type": "Question",
        name: "What types of spirits are made at craft distilleries?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Craft distilleries produce a wide variety of spirits including bourbon, rye whiskey, gin, vodka, rum, brandy, and other specialty liqueurs. Each distillery has its own unique approach and flavor profiles.",
        },
      },
      {
        "@type": "Question",
        name: "Can I buy bottles on-site at craft distilleries?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes, most craft distilleries have tasting rooms or gift shops where you can purchase their spirits directly. Many also offer exclusive bottles that are only available at the distillery.",
        },
      },
      {
        "@type": "Question",
        name: "What states have the most craft distilleries?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "States like Kentucky, California, Colorado, and Texas have the most craft distilleries. However, the craft spirits movement has grown across all regions of the United States, with new distilleries opening regularly.",
        },
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "2rem" }}>
        <section
          style={{
            textAlign: "center",
            marginBottom: "3rem",
            paddingTop: "2rem",
          }}
        >
          <h1
            style={{
              fontSize: "3rem",
              fontWeight: "bold",
              margin: "0 0 1rem 0",
              color: "#1f2937",
            }}
          >
            Find Craft Distilleries Near You
          </h1>
          <p
            style={{
              fontSize: "1.25rem",
              color: "#6b7280",
              margin: "0",
            }}
          >
            Discover tours, tastings, and spirits from local craft distillers across America
          </p>
        </section>

        <section style={{ marginBottom: "3rem" }}>
          <h2
            style={{
              fontSize: "1.875rem",
              fontWeight: "bold",
              margin: "2rem 0 1.5rem 0",
              color: "#1f2937",
            }}
          >
            Featured Distilleries
          </h2>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
              gap: "2rem",
            }}
          >
            {featured.map((distillery) => (
              <Link
                key={distillery.slug}
                href={`/${distillery.stateSlug}/${distillery.slug}`}
                style={{ textDecoration: "none" }}
              >
                <div
                  style={{
                    border: "1px solid #e5e7eb",
                    borderRadius: "0.5rem",
                    padding: "1.5rem",
                    backgroundColor: "#fff",
                    cursor: "pointer",
                    transition: "box-shadow 0.3s",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.boxShadow =
                      "0 4px 6px rgba(0, 0, 0, 0.1)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.boxShadow = "none";
                  }}
                >
                  <h3
                    style={{
                      fontSize: "1.25rem",
                      fontWeight: "bold",
                      margin: "0 0 0.5rem 0",
                      color: "#1f2937",
                    }}
                  >
                    {distillery.name}
                  </h3>
                  <p
                    style={{
                      color: "#6b7280",
                      margin: "0 0 1rem 0",
                      fontSize: "0.875rem",
                    }}
                  >
                    {distillery.city}, {distillery.state}
                  </p>
                  <p
                    style={{
                      color: "#4b5563",
                      margin: "0",
                      lineHeight: "1.5",
                    }}
                  >
                    {distillery.description}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </section>

        <section style={{ marginBottom: "3rem" }}>
          <h2
            style={{
              fontSize: "1.875rem",
              fontWeight: "bold",
              margin: "2rem 0 1.5rem 0",
              color: "#1f2937",
            }}
          >
            Browse by State
          </h2>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
              gap: "1rem",
            }}
          >
            {states.map((state) => (
              <Link
                key={state}
                href={`/${stateSlug(state)}`}
                style={{
                  display: "block",
                  padding: "1rem",
                  border: "1px solid #e5e7eb",
                  borderRadius: "0.375rem",
                  textAlign: "center",
                  textDecoration: "none",
                  color: "#2563eb",
                  fontWeight: "500",
                  backgroundColor: "#fff",
                  transition: "background-color 0.2s",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.backgroundColor =
                    "#f3f4f6";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.backgroundColor =
                    "#fff";
                }}
              >
                {state}
              </Link>
            ))}
          </div>
        </section>

        <section
          style={{
            backgroundColor: "#f9fafb",
            padding: "3rem 2rem",
            borderRadius: "0.5rem",
            marginBottom: "3rem",
          }}
        >
          <h2
            style={{
              fontSize: "1.875rem",
              fontWeight: "bold",
              margin: "0 0 2rem 0",
              color: "#1f2937",
            }}
          >
            About Craft Distilleries
          </h2>

          <div style={{ lineHeight: "1.8", color: "#4b5563" }}>
            <h3
              style={{
                fontSize: "1.25rem",
                fontWeight: "bold",
                margin: "0 0 1rem 0",
                color: "#1f2937",
              }}
            >
              What Are Craft Distilleries?
            </h3>
            <p>
              Craft distilleries are small-scale spirits producers that focus on quality, innovation,
              and traditional distillation techniques. Unlike large commercial distilleries, craft
              distilleries typically produce limited quantities of spirits and often emphasize
              locally-sourced ingredients, unique flavor profiles, and hands-on production methods.
            </p>

            <h3
              style={{
                fontSize: "1.25rem",
                fontWeight: "bold",
                margin: "1.5rem 0 1rem 0",
                color: "#1f2937",
              }}
            >
              The Craft Spirits Movement
            </h3>
            <p>
              The craft spirits movement has grown significantly over the past two decades. What began
              as a niche market has evolved into a thriving industry with thousands of distilleries
              operating across every state. This revival of craft spirits production has reinvigorated
              traditional distilling communities and created exciting new opportunities for innovation
              and experimentation.
            </p>

            <h3
              style={{
                fontSize: "1.25rem",
                fontWeight: "bold",
                margin: "1.5rem 0 1rem 0",
                color: "#1f2937",
              }}
            >
              What to Expect on a Distillery Tour
            </h3>
            <p>
              Most craft distilleries offer educational tours where visitors can learn about the
              spirits production process, from grain selection through fermentation and distillation.
              Guides typically explain the unique characteristics of their products and the story
              behind their brand. Tours usually conclude with a tasting session where you can sample
              different spirits and discover your favorites.
            </p>

            <h3
              style={{
                fontSize: "1.25rem",
                fontWeight: "bold",
                margin: "1.5rem 0 1rem 0",
                color: "#1f2937",
              }}
            >
              Types of Spirits
            </h3>
            <p>
              Craft distilleries produce a wide variety of spirits. Bourbon and whiskey are among the
              most popular, with specific characteristics determined by ingredients, barrel aging, and
              production methods. Gin is known for botanical infusions that create distinctive flavors.
              Vodka, rum, brandy, and other specialty liqueurs round out the typical product lineup at
              many distilleries.
            </p>

            <h3
              style={{
                fontSize: "1.25rem",
                fontWeight: "bold",
                margin: "1.5rem 0 1rem 0",
                color: "#1f2937",
              }}
            >
              Tips for Visiting Craft Distilleries
            </h3>
            <p>
              Before visiting a distillery, always call ahead to confirm hours and reservation
              requirements. Many distilleries recommend arriving with a clear palate and drinking water
              between tastings. Remember that you must be 21 years old to enter most distilleries and
              participate in tastings. Consider visiting during off-peak times for a more personalized
              experience with staff. Don't hesitate to ask questions—distillery staff love sharing their
              passion for craft spirits.
            </p>

            <h3
              style={{
                fontSize: "1.25rem",
                fontWeight: "bold",
                margin: "1.5rem 0 1rem 0",
                color: "#1f2937",
              }}
            >
              Frequently Asked Questions
            </h3>
            <p>
              <strong>Do I need to make a reservation?</strong> Most craft distilleries accept walk-ins,
              but some require reservations for tours. Always check ahead.
            </p>
            <p>
              <strong>Can I buy bottles to take home?</strong> Yes! Most distilleries have gift shops or
              tasting rooms where you can purchase their spirits directly.
            </p>
            <p>
              <strong>Are tastings included in the tour?</strong> Many tours include tastings, though
              some charge a separate tasting fee. Check the distillery's website for details.
            </p>
          </div>
        </section>
      </div>
    </>
  );
}
