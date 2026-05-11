import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });

export const metadata: Metadata = {
  title: { default: "HireInbox", template: "%s — HireInbox" },
  description: "Upload your CV, paste HR emails — AI writes a personalised job application email for each company. Free to start.",
  openGraph: {
    title: "HireInbox — Send 50 job emails in 5 minutes",
    description: "Upload your CV, paste HR emails — AI writes personalised job application emails. Free to start.",
    url: "https://hireinbox.app",
    siteName: "HireInbox",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "HireInbox — AI Job Application Emails" }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "HireInbox — Send 50 job emails in 5 minutes",
    description: "Upload your CV, paste HR emails — AI writes personalised job application emails.",
    images: ["/og-image.png"],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} h-full`}>
      <body className="h-full" suppressHydrationWarning>{children}</body>
    </html>
  );
}
