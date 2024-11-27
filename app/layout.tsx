import "@/styles/globals.css"
import { Metadata } from "next"
import { Toaster } from "sonner"

import { siteMetadata } from "@/config/metadata"
import { fontSans } from "@/lib/fonts"
import { cn } from "@/lib/utils"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { ThemeProvider } from "@/components/theme-provider"
import { TailwindIndicator } from "@/components/tailwind-indicator"
import { ScrollToTop } from "@/components/scroll-to-top"

export const metadata: Metadata = {
  title: {
    default: siteMetadata.title,
    template: `%s | ${siteMetadata.title}`,
  },
  description: siteMetadata.description,
  keywords: siteMetadata.keywords,
  authors: siteMetadata.authors,
  creator: siteMetadata.creator,
  themeColor: siteMetadata.themeColor,
  icons: siteMetadata.icons,
  manifest: siteMetadata.manifest,
  openGraph: siteMetadata.openGraph,
  twitter: siteMetadata.twitter,
}

interface RootLayoutProps {
  children: React.ReactNode
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable
        )}
      >
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <div className="relative flex min-h-screen flex-col">
            <SiteHeader />
            <div className="flex-1">{children}</div>
            <SiteFooter />
            <ScrollToTop />
          </div>
          <TailwindIndicator />
          <Toaster position="top-right" />
        </ThemeProvider>
      </body>
    </html>
  )
}