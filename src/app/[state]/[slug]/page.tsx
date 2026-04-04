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
  return locations.map((location) => ({
    state: location.stateSlug,
    slug: location.slug,
  }));
}

type Props = {
  params: Promise<{
    state: string;
    slug: string;
  }>;
};

export async function generateMetadata({ params }: Props) {
  const { state, slug } = await params;
  const distillery = locations.find(
    (loc) => loc.stateSlug === state && loc.slug === slug
  );

  if (!distillery) {
    return {
      title: "Distillery Not Found",
      description: "This distillery could not be found.",
    };
  }

  return {
    title: `${distillery.name} — Craft Distillery in ${distillery.city}, ${distillery.state}`,
    description: distillery.description,
  };
}

export default async function DistilleryPage({ params }: Props) {
  const { state, slug } = await params;
  const stateName = formatStateName(state);
  const distillery = locations.find(
    (loc) => loc.stateSlug === state && loc.slug === slug
  );

  if (!distillery) {
    return (
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "2rem" }}>
        <h1 style={{ color: "#1f2937" }}>Distillery Not Found</h1>
        <Link href="/" style={{ color: "#2563eb", textDecoration: "none" }}>
          Return to Home
        </Link>
      </div>
    );
  }

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
      {
        "@type": "ListItem",
        position: 3,
        name: distillery.name,
        item: `https://craftdistilleryfinder.com/${state}/${slug}`,
      },
    ],
  };

  const placeSchema = {
    "@context": "https://schema.org",
    "@type": "FoodEstablishment",
    name: distillery.name,
    description: distillery.description,
    servesCuisine: "Craft Spirits",
    address: {
      "@type": "PostalAddress",
      addressLocality: distillery.city,
      addressRegion: distillery.state,
      addressCountry: "US",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: distillery.lat,
      longitude: distillery.lng,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(placeSchema) }}
      />

      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "2rem" }}>
        <div style={{ marginBottom: "2rem" }}>
          <Link
            href={`/${state}`}
            style={{
              color: "#2563eb",
              textDecoration: "none",
              marginBottom: "1rem",
              display: "inline-block",
            }}
          >
            ← Back to {stateName}
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
          {distillery.name}
        </h1>
        <p
          style={{
            fontSize: "1.125rem",
            color: "#6b7280",
            margin: "0 0 2rem 0",
          }}
        >
          {distillery.city}, {distillery.state}
        </p>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "2fr 1fr",
            gap: "2rem",
            marginBottom: "3rem",
          }}
        >
          <div>
            <div
              style={{
                backgroundColor: "#f9fafb",
                padding: "2rem",
                borderRadius: "0.5rem",
                marginBottom: "2rem",
              }}
            >
              <h2
                style={{
                  fontSize: "1.25rem",
                  fontWeight: "bold",
                  margin: "0 0 1rem 0",
                  color: "#1f2937",
                }}
              >
                About
              </h2>
              <p
                style={{
                  color: "#4b5563",
                  lineHeight: "1.8",
                  margin: "0",
                }}
              >
                {distillery.description}
              </p>
            </div>

            <div
              style={{
                backgroundColor: "#f9fafb",
                padding: "2rem",
                borderRadius: "0.5rem",
              }}
            >
              <h2
                style={{
                  fontSize: "1.25rem",
                  fontWeight: "bold",
                  margin: "0 0 1rem 0",
                  color: "#1f2937",
                }}
              >
                Amenities & Features
              </h2>
              <ul
                style={{
                  margin: "0",
                  padding: "0 0 0 1.5rem",
                  color: "#4b5563",
                }}
              >
                {distillery.amenities.map((amenity) => (
                  <li key={amenity} style={{ marginBottom: "0.5rem" }}>
                    {amenity}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div>
            <div
              style={{
                backgroundColor: "#f9fafb",
                padding: "2rem",
                borderRadius: "0.5rem",
              }}
            >
              <h2
                style={{
                  fontSize: "1.25rem",
                  fontWeight: "bold",
                  margin: "0 0 1.5rem 0",
                  color: "#1f2937",
                }}
              >
                Location Details
              </h2>
              <div
                style={{
                  color: "#4b5563",
                  lineHeight: "1.8",
                }}
              >
                <p style={{ margin: "0 0 1rem 0" }}>
                  <strong>City:</strong> {distillery.city}
                </p>
                <p style={{ margin: "0 0 1rem 0" }}>
                  <strong>State:</strong> {distillery.state}
                </p>
                <p style={{ margin: "0 0 1rem 0" }}>
                  <strong>Coordinates:</strong>
                  <br />
                  {distillery.lat.toFixed(4)}, {distillery.lng.toFixed(4)}
                </p>
                <p style={{ margin: "0" }}>
                  <strong>Type:</strong> Craft Distillery
                </p>
              </div>
            </div>
          </div>
        </div>

        <div
          style={{
            backgroundColor: "#fff3cd",
            border: "1px solid #ffeaa7",
            padding: "1.5rem",
            borderRadius: "0.5rem",
            marginBottom: "2rem",
            color: "#856404",
          }}
        >
          <p style={{ margin: "0", lineHeight: "1.6" }}>
            <strong>Important:</strong> Distillery hours, tour availability, and tasting policies
            may vary. Always contact the distillery directly to confirm hours and whether
            reservations are required. Visitors must be 21 years of age or older.
          </p>
        </div>

        <div
          style={{
            padding: "2rem",
            backgroundColor: "#f9fafb",
            borderRadius: "0.5rem",
          }}
        >
          <h2
            style={{
              fontSize: "1.25rem",
              fontWeight: "bold",
              margin: "0 0 1rem 0",
              color: "#1f2937",
            }}
          >
            Plan Your Visit
          </h2>
          <p style={{ color: "#4b5563", lineHeight: "1.8", margin: "0 0 1rem 0" }}>
            Ready to visit {distillery.name}? Here are some tips for a great experience:
          </p>
          <ul
            style={{
              color: "#4b5563",
              lineHeight: "1.8",
              margin: "0",
              paddingLeft: "1.5rem",
            }}
          >
            <li style={{ marginBottom: "0.5rem" }}>
              Call ahead or check their website for current hours and tour schedules
            </li>
            <li style={{ marginBottom: "0.5rem" }}>
              Make a reservation if required—many distilleries have limited tour slots
            </li>
            <li style={{ marginBottom: "0.5rem" }}>
              Arrive with a clear palate and drink water between tastings
            </li>
            <li style={{ marginBottom: "0.5rem" }}>
              Ask staff questions about their production process and spirits
            </li>
            <li>
              Plan to purchase bottles of your favorite spirits to take home
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}
