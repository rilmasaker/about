import Portfolio from "@/client/portfolio/Portfolio";
import Script from "next/script";

const structuredData = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Marcin Wydra",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  jobTitle: "Full-stack Developer",
};

export default function Page() {
  return (
    <>
      <Script
        id="structured-data"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <h1 className="sr-only">Marcin Wydra - Portfolio</h1>
      <Portfolio />
    </>
  );
}
