import "./globals.css";
import "./style.css";
import "./aos-custom.css";
import "aos/dist/aos.css";
import Script from "next/script";

export const metadata = {
  title: "Ritu - A Luxury Farm Resort in Wayanad",
  description:
    "Experience the farms of Kerala at Ritu, a luxury farm resort in Wayanad. Co-own the crown jewel of Wayanad with exclusive lifetime benefits.",
  icons: {
    icon: "/favicon.png",
    shortcut: "/favicon.png",
    apple: "/favicon.png",
  },
  openGraph: {
    title: "Ritu - A Luxury Farm Resort in Wayanad",
    description:
      "Experience the farms of Kerala at Ritu, a luxury farm resort in Wayanad. Co-own the crown jewel of Wayanad with exclusive lifetime benefits.",
    url: "https://www.rituresort.com/",
    siteName: "Ritu - Luxury Farm Resort",
    images: [
      {
        url: "/favicon.png",
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
    images: ["/favicon.png"],
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
      </head>
      <body>{children}</body>
    </html>
  );
}
