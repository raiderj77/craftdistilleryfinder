import Link from "next/link";

export const metadata = {
  title: "Browse States",
  description: "Browse craft distilleries by state across the United States.",
};

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

export default function BrowsePage() {
  return (
    <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "2rem" }}>
      <h1
        style={{
          fontSize: "2.25rem",
          fontWeight: "bold",
          margin: "0 0 0.5rem 0",
          color: "#1f2937",
        }}
      >
        Browse States
      </h1>
      <p
        style={{
          fontSize: "1.125rem",
          color: "#6b7280",
          margin: "0 0 2rem 0",
        }}
      >
        Find craft distilleries in your state
      </p>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
          gap: "1rem",
        }}
      >
        {states.map((state) => (
          <Link
            key={state}
            href={`/${stateSlug(state)}`}
            style={{
              display: "block",
              padding: "1.5rem",
              border: "1px solid #e5e7eb",
              borderRadius: "0.5rem",
              textAlign: "center",
              textDecoration: "none",
              color: "#2563eb",
              fontWeight: "500",
              backgroundColor: "#fff",
              transition: "all 0.2s",
              fontSize: "1rem",
            }}
            onMouseEnter={(e) => {
              const el = e.currentTarget as HTMLElement;
              el.style.backgroundColor = "#f3f4f6";
              el.style.borderColor = "#2563eb";
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget as HTMLElement;
              el.style.backgroundColor = "#fff";
              el.style.borderColor = "#e5e7eb";
            }}
          >
            {state}
          </Link>
        ))}
      </div>
    </div>
  );
}
