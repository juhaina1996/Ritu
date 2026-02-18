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
    icon: "/favicon.svg",
  },
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
