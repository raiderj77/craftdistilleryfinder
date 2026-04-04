export const metadata = {
  title: "Contact Us",
  description: "Get in touch with Craft Distillery Finder. Submit your distillery listing or feedback.",
};

export default function ContactPage() {
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
        Contact Us
      </h1>

      <div style={{ lineHeight: "1.8", color: "#4b5563" }}>
        <div
          style={{
            backgroundColor: "#f0f9ff",
            border: "1px solid #bfdbfe",
            padding: "1.5rem",
            borderRadius: "0.5rem",
            marginBottom: "2rem",
          }}
        >
          <h2
            style={{
              fontSize: "1.25rem",
              fontWeight: "bold",
              margin: "0 0 1rem 0",
              color: "#1e40af",
            }}
          >
            Get in Touch
          </h2>
          <p style={{ margin: "0" }}>
            Have a question about a distillery? Found information that needs updating? Want to submit
            your distillery listing? We'd love to hear from you!
          </p>
        </div>

        <h2
          style={{
            fontSize: "1.5rem",
            fontWeight: "bold",
            margin: "2rem 0 1rem 0",
            color: "#1f2937",
          }}
        >
          Email Us
        </h2>
        <p>
          The best way to reach us is by email. We typically respond to inquiries within 2-3 business
          days.
        </p>
        <p style={{ marginBottom: "2rem" }}>
          <strong>General Inquiries:</strong>{" "}
          <a
            href="mailto:contact@craftdistilleryfinder.com"
            style={{ color: "#2563eb", textDecoration: "none", wordBreak: "break-all" }}
          >
            contact@craftdistilleryfinder.com
          </a>
        </p>

        <h2
          style={{
            fontSize: "1.5rem",
            fontWeight: "bold",
            margin: "2rem 0 1rem 0",
            color: "#1f2937",
          }}
        >
          Submit Your Distillery
        </h2>
        <p>
          Are you a craft distillery owner or manager? We'd like to feature your business in our
          directory. When you contact us, please include:
        </p>
        <ul style={{ paddingLeft: "1.5rem", marginBottom: "2rem" }}>
          <li style={{ marginBottom: "0.5rem" }}>Distillery name and location</li>
          <li style={{ marginBottom: "0.5rem" }}>Brief description of your spirits and brand</li>
          <li style={{ marginBottom: "0.5rem" }}>Tour and tasting availability</li>
          <li style={{ marginBottom: "0.5rem" }}>Website and contact information</li>
          <li>Special amenities or features (event space, dog-friendly patio, etc.)</li>
        </ul>

        <h2
          style={{
            fontSize: "1.5rem",
            fontWeight: "bold",
            margin: "2rem 0 1rem 0",
            color: "#1f2937",
          }}
        >
          Report Issues
        </h2>
        <p>
          Found outdated information? Spotted an error on our site? Please let us know. Your feedback
          helps us maintain accurate listings and provide the best experience for our visitors.
        </p>

        <div
          style={{
            backgroundColor: "#f9fafb",
            border: "1px solid #e5e7eb",
            padding: "2rem",
            borderRadius: "0.5rem",
            marginTop: "3rem",
          }}
        >
          <h3
            style={{
              fontSize: "1.125rem",
              fontWeight: "bold",
              margin: "0 0 1rem 0",
              color: "#1f2937",
            }}
          >
            Privacy & Confidentiality
          </h3>
          <p style={{ margin: "0" }}>
            We take your privacy seriously. Any information you provide to us will be used only for the
            purpose you intended and will not be shared with third parties. For more information, please
            see our{" "}
            <a
              href="/privacy"
              style={{ color: "#2563eb", textDecoration: "none" }}
            >
              Privacy Policy
            </a>
            .
          </p>
        </div>
      </div>
    </div>
  );
}
