import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import Navigation from "@/components/navigation"
import Footer from "@/components/footer"
import { Toaster } from "@/components/ui/toaster"
import { SupabaseProvider } from "@/lib/supabase/client"
import { Analytics } from "@vercel/analytics/react"

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
})

export const metadata: Metadata = {
  title: "FC26 Premier League - EA Sports FC 26",
  description: "The premier EA Sports FC 26 competitive football league with advanced statistics, team management, and professional tournaments.",
  keywords: "EA Sports FC 26, Football, Soccer, Competitive Gaming, League, Tournament, Statistics",
  authors: [{ name: "FC26 Premier League" }],
  creator: "FC26 Premier League",
  publisher: "FC26 Premier League",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://fc26-clubs.vercel.app"),
  openGraph: {
    title: "FC26 Premier League - EA Sports FC 26",
    description: "The premier EA Sports FC 26 competitive football league",
    url: "https://fc26-clubs.vercel.app",
    siteName: "FC26 Premier League",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "FC26 Premier League - EA Sports FC 26",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "FC26 Premier League - EA Sports FC 26",
    description: "The premier EA Sports FC 26 competitive football league",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="shortcut icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <SupabaseProvider>
            <div className="flex min-h-screen flex-col bg-gradient-to-br from-background via-background to-pitch/5">
              <Navigation />
              <main className="flex-1 relative">
                {/* Stadium atmosphere background */}
                <div className="absolute inset-0 stadium-lights pointer-events-none" />
                {children}
              </main>
              <Footer />
            </div>
            <Toaster />
            <Analytics />
          </SupabaseProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
