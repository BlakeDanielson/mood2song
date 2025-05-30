import type React from "react"
import "./globals.css"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import { SonnerProvider } from "@/components/sonner-provider"
import { Analytics } from "@vercel/analytics/react"
import Script from "next/script"
import { LayoutWrapper } from "@/components/layout-wrapper"
import { BuyMeCoffee } from "@/components/ui/buy-me-coffee"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Mood2Song - AI-Powered Music Discovery | Find Perfect Songs for Your Mood",
  description: "Discover your next favorite song with AI! Tell us your mood and get personalized music recommendations instantly. Free AI-powered music discovery that understands your emotions.",
  keywords: "AI music, mood music, music discovery, personalized playlists, song recommendations, AI music curator, mood-based music, music for emotions, discover new music, AI playlist generator",
  authors: [{ name: "Mood2Song" }],
  creator: "Mood2Song",
  publisher: "Mood2Song",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://mood2song.vercel.app'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: "Mood2Song - AI Music Discovery That Reads Your Emotions",
    description: "Tell us your mood, get perfect song recommendations! Free AI-powered music discovery that finds your next favorite track in seconds.",
    url: '/',
    siteName: 'Mood2Song',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Mood2Song - AI-Powered Music Discovery',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Mood2Song - AI Music Discovery",
    description: "Tell us your mood, get perfect song recommendations! Free AI-powered music discovery.",
    images: ['/og-image.png'],
    creator: '@mood2song',
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
  verification: {
    google: process.env.GOOGLE_SITE_VERIFICATION,
  },
  generator: 'Next.js',
  applicationName: 'Mood2Song',
  referrer: 'origin-when-cross-origin',
  category: 'music',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Additional SEO meta tags */}
        <meta name="theme-color" content="#1e40af" />
        <meta name="color-scheme" content="dark light" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
        
        {/* Preconnect to external domains for performance */}
        <link rel="preconnect" href="https://api.openai.com" />
        <link rel="preconnect" href="https://api.spotify.com" />
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
        
        {/* Schema.org structured data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebApplication",
              "name": "Mood2Song",
              "description": "AI-powered music discovery that finds perfect songs for your mood",
              "url": process.env.NEXT_PUBLIC_SITE_URL || "https://mood2song.vercel.app",
              "applicationCategory": "MusicApplication",
              "operatingSystem": "Web Browser",
              "offers": {
                "@type": "Offer",
                "price": "0",
                "priceCurrency": "USD"
              },
              "creator": {
                "@type": "Organization",
                "name": "Mood2Song"
              },
              "featureList": [
                "AI-powered music recommendations",
                "Mood-based song discovery",
                "Personalized music curation",
                "Free music discovery tool"
              ]
            })
          }}
        />
      </head>
      <body className={inter.className}>
        {/* Google Analytics */}
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}');
          `}
        </Script>

        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5415010136926818"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
        <ThemeProvider attribute="class" defaultTheme="dark">
          <LayoutWrapper>
            {children}
          </LayoutWrapper>
          <SonnerProvider />
        </ThemeProvider>
        <Analytics />
        
        {/* Global floating Buy Me a Coffee widget */}
        <BuyMeCoffee 
          username={process.env.NEXT_PUBLIC_BUYMEACOFFEE_USERNAME || "blvke"}
          message="Thank you for using Mood2Song! If you enjoyed it, consider buying me a coffee! ☕"
          description="Support the developer!"
          color="#FFDD00"
          position="right"
          xMargin={18}
          yMargin={18}
        />
      </body>
    </html>
  )
}
