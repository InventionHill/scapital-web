import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { DialogProvider } from "./context/DialogContext";
import ApplicationDialog from "./components/ApplicationDialog";
import JobApplicationDialog from "./components/JobApplicationDialog";

const poppins = Poppins({
  weight: ['300', '400', '500', '600', '700'],
  subsets: ["latin"],
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: {
    default: "SCAPITAL Loan Services | Quick & Easy Financial Solutions",
    template: "%s | SCAPITAL Loan Services"
  },
  description: "Get instant personal, home, and business loans with minimal documentation. SCAPITAL connects you with 100+ trusted banking partners for quick disbursals.",
  keywords: ["loans", "personal loan", "home loan", "business loan", "quick loan", "finance", "SCAPITAL", "low interest rate"],
  authors: [{ name: "SCAPITAL" }],
  creator: "SCAPITAL",
  publisher: "SCAPITAL",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: "SCAPITAL Loan Services | Quick & Easy Financial Solutions",
    description: "Connect with 100+ banking partners for instant loans. Low interest rates, minimal documentation, and quick approval.",
    url: "https://scapital.com", // Replace with actual domain when live
    siteName: "SCAPITAL",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "SCAPITAL Loan Services",
    description: "Quick & Easy Loans with Minimum Documentation. Apply now for Personal, Home, or Business loans.",
    creator: "@scapital", // Replace with actual handle
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${poppins.variable} font-sans antialiased`}
        suppressHydrationWarning={true}
      >
        <DialogProvider>
          {children}
          <ApplicationDialog />
          <JobApplicationDialog />
        </DialogProvider>
      </body>
    </html>
  );
}
