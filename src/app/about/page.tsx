export const metadata = {
  title: "About Craft Distillery Finder",
  description: "Learn about our mission to help people discover local craft distilleries.",
};

export default function AboutPage() {
  return (
    <div style={{ maxWidth: "900px", margin: "0 auto", padding: "2rem" }}>
      <h1
        style={{
          fontSize: "2.25rem",
          fontWeight: "bold",
          margin: "0 0 2rem 0",
          color: "#1f2937",
        }}
      >
        About Craft Distillery Finder
      </h1>

      <div style={{ lineHeight: "1.8", color: "#4b5563", fontSize: "1rem" }}>
        <h2
          style={{
            fontSize: "1.5rem",
            fontWeight: "bold",
            margin: "2rem 0 1rem 0",
            color: "#1f2937",
          }}
        >
          Our Mission
        </h2>
        <p>
          Craft Distillery Finder is dedicated to helping people discover and connect with craft
          distilleries across the United States. We believe in supporting local spirits producers and
          sharing the stories and craftsmanship behind America's growing craft spirits movement.
        </p>

        <h2
          style={{
            fontSize: "1.5rem",
            fontWeight: "bold",
            margin: "2rem 0 1rem 0",
            color: "#1f2937",
          }}
        >
          What We Do
        </h2>
        <p>
          We maintain a comprehensive directory of craft distilleries across all 50 states. Our goal
          is to provide accurate, up-to-date information about distillery locations, tours, tastings,
          and the unique spirits each producer creates. Whether you're a spirits enthusiast, a casual
          visitor, or someone looking for a unique local experience, our directory helps you find the
          perfect craft distillery.
        </p>

        <h2
          style={{
            fontSize: "1.5rem",
            fontWeight: "bold",
            margin: "2rem 0 1rem 0",
            color: "#1f2937",
          }}
        >
          Why Craft Distilleries Matter
        </h2>
        <p>
          Craft distilleries are vital to local economies and cultural heritage. They represent
          entrepreneurship, innovation, and a commitment to quality that often gets lost in large-scale
          production. By visiting craft distilleries and supporting local producers, you help sustain
          these businesses and preserve important traditions.
        </p>

        <h2
          style={{
            fontSize: "1.5rem",
            fontWeight: "bold",
            margin: "2rem 0 1rem 0",
            color: "#1f2937",
          }}
        >
          Contact Us
        </h2>
        <p>
          Have a distillery you'd like us to feature? Found outdated information? We'd love to hear
          from you. Please use our{" "}
          <a
            href="/contact"
            style={{
              color: "#2563eb",
              textDecoration: "none",
            }}
          >
            contact form
          </a>{" "}
          to get in touch.
        </p>

        <div
          style={{
            marginTop: "3rem",
            paddingTop: "2rem",
            borderTop: "1px solid #e5e7eb",
            fontSize: "0.875rem",
            color: "#6b7280",
          }}
        >
          <p style={{ margin: "0" }}>
            Craft Distillery Finder is an independent directory service. We are not affiliated with
            any distillery, distributor, or spirits brand. Information is provided for informational
            purposes only.
          </p>
        </div>
      </div>
    </div>
  );
}
