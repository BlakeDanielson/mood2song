import type React from "react"
import "./globals.css"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import { SonnerProvider } from "@/components/sonner-provider"
import { Sidebar as AppSidebar } from "@/components/sidebar"
import { Analytics } from "@vercel/analytics/react"


const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Mood Music Finder",
  description: "Find the perfect song for your current mood using AI",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="dark">
          <div className="flex min-h-screen">
            <div className="fixed h-screen w-64 border-r dark:border-neutral-800 p-4 flex-shrink-0 hidden md:block">
              <AppSidebar />
            </div>
            <main className="flex-1 overflow-y-auto pl-4 pr-4 md:pl-72 md:pr-10">
              {children}
            </main>
          </div>
          <SonnerProvider />
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  )
}
