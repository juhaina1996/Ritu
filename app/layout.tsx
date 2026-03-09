import "./globals.css";
import "./style.css";
import "./aos-custom.css";
import "aos/dist/aos.css";

export const metadata = {
  title: "Ritu - A Luxury Farm Resort in Wayanad",
  description:
    "Experience the farms of Kerala at Ritu, a luxury farm resort in Wayanad. Co-own the crown jewel of Wayanad with exclusive lifetime benefits.",
  icons: {
    icon: "/linkPreviewRitu.png",
    shortcut: "/linkPreviewRitu.png",
    apple: "/linkPreviewRitu.png",
  },
  openGraph: {
    title: "Ritu - A Luxury Farm Resort in Wayanad",
    description:
      "Experience the farms of Kerala at Ritu, a luxury farm resort in Wayanad. Co-own the crown jewel of Wayanad with exclusive lifetime benefits.",
    url: "https://www.rituresort.com/",
    siteName: "Ritu - Luxury Farm Resort",
    images: [
      {
        url: "/linkPreviewRitu.png",
        width: 1200,
        height: 630,
        alt: "Ritu - A Luxury Farm Resort in Wayanad",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ritu - A Luxury Farm Resort in Wayanad",
    description:
      "Experience the farms of Kerala at Ritu, a luxury farm resort in Wayanad. Co-own the crown jewel of Wayanad with exclusive lifetime benefits.",
    images: ["/linkPreviewRitu.png"],
  },
  metadataBase: new URL("https://www.rituresort.com/"),
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Arsenal:ital,wght@0,400;0,700;1,400;1,700&display=swap"
          rel="stylesheet"
        />
        {/* Favicon */}
        <link rel="icon" href="/linkPreviewRitu.png" />
        <link rel="shortcut icon" href="/linkPreviewRitu.png" />
        <link rel="apple-touch-icon" href="/linkPreviewRitu.png" />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.rituresort.com/" />
        <meta property="og:title" content="Ritu - A Luxury Farm Resort in Wayanad" />
        <meta property="og:description" content="Experience the farms of Kerala at Ritu, a luxury farm resort in Wayanad. Co-own the crown jewel of Wayanad with exclusive lifetime benefits." />
        <meta property="og:image" content="https://www.rituresort.com/linkPreviewRitu.png" />
        
        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://www.rituresort.com/" />
        <meta property="twitter:title" content="Ritu - A Luxury Farm Resort in Wayanad" />
        <meta property="twitter:description" content="Experience the farms of Kerala at Ritu, a luxury farm resort in Wayanad. Co-own the crown jewel of Wayanad with exclusive lifetime benefits." />
        <meta property="twitter:image" content="https://www.rituresort.com/linkPreviewRitu.png" />
      </head>
      <body>{children}</body>
    </html>
  );
}
