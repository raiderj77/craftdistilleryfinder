import Link from "next/link";
import locations from "@/data/locations.json";

export const revalidate = 86400;

function formatStateName(slug: string): string {
  return slug
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

export function generateStaticParams() {
  const states = [
    "alabama",
    "alaska",
    "arizona",
    "arkansas",
    "california",
    "colorado",
    "connecticut",
    "delaware",
    "florida",
    "georgia",
    "hawaii",
    "idaho",
    "illinois",
    "indiana",
    "iowa",
    "kansas",
    "kentucky",
    "louisiana",
    "maine",
    "maryland",
    "massachusetts",
    "michigan",
    "minnesota",
    "mississippi",
    "missouri",
    "montana",
    "nebraska",
    "nevada",
    "new-hampshire",
    "new-jersey",
    "new-mexico",
    "new-york",
    "north-carolina",
    "north-dakota",
    "ohio",
    "oklahoma",
    "oregon",
    "pennsylvania",
    "rhode-island",
    "south-carolina",
    "south-dakota",
    "tennessee",
    "texas",
    "utah",
    "vermont",
    "virginia",
    "washington",
    "west-virginia",
    "wisconsin",
    "wyoming",
  ];

  return states.map((state) => ({
    state,
  }));
}

type Props = {
  params: Promise<{
    state: string;
  }>;
};

export async function generateMetadata({ params }: Props) {
  const { state } = await params;
  const stateName = formatStateName(state);
  return {
    title: `Craft Distilleries in ${stateName}`,
    description: `Discover craft distilleries in ${stateName}. Find local distillery tours, tastings, and craft spirits.`,
  };
}

export default async function StatePage({ params }: Props) {
  const { state } = await params;
  const stateName = formatStateName(state);
  const stateDistilleries = locations.filter((loc) => loc.stateSlug === state);

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://craftdistilleryfinder.com",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: stateName,
        item: `https://craftdistilleryfinder.com/${state}`,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "2rem" }}>
        <div style={{ marginBottom: "2rem" }}>
          <Link
            href="/"
            style={{
              color: "#2563eb",
              textDecoration: "none",
              marginBottom: "1rem",
              display: "inline-block",
            }}
          >
            ← Back to Home
          </Link>
        </div>

        <h1
          style={{
            fontSize: "2.25rem",
            fontWeight: "bold",
            margin: "0 0 0.5rem 0",
            color: "#1f2937",
          }}
        >
          Craft Distilleries in {stateName}
        </h1>
        <p style={{ color: "#6b7280", margin: "0 0 2rem 0" }}>
          Discover craft distilleries, tours, and tastings in {stateName}
        </p>

        {stateDistilleries.length > 0 ? (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
              gap: "2rem",
            }}
          >
            {stateDistilleries.map((distillery) => (
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
                  <h2
                    style={{
                      fontSize: "1.25rem",
                      fontWeight: "bold",
                      margin: "0 0 0.5rem 0",
                      color: "#1f2937",
                    }}
                  >
                    {distillery.name}
                  </h2>
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
                      margin: "0 0 1rem 0",
                      lineHeight: "1.5",
                    }}
                  >
                    {distillery.description}
                  </p>
                  <div
                    style={{
                      display: "flex",
                      flexWrap: "wrap",
                      gap: "0.5rem",
                    }}
                  >
                    {distillery.amenities.map((amenity) => (
                      <span
                        key={amenity}
                        style={{
                          backgroundColor: "#f3f4f6",
                          padding: "0.25rem 0.75rem",
                          borderRadius: "0.25rem",
                          fontSize: "0.75rem",
                          fontWeight: "500",
                          color: "#374151",
                        }}
                      >
                        {amenity}
                      </span>
                    ))}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div
            style={{
              padding: "2rem",
              backgroundColor: "#f9fafb",
              borderRadius: "0.5rem",
              textAlign: "center",
              color: "#6b7280",
            }}
          >
            <p>No distilleries found in {stateName}. Check back soon!</p>
          </div>
        )}
      </div>
    </>
  );
}
