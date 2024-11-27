"use client"

import { Icons } from "@/components/icons"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { siteConfig } from "@/config/site"
import Link from "next/link"

export function SiteFooter() {
  return (
    <footer className="border-t bg-slate-50/50 backdrop-blur-sm supports-[backdrop-filter]:bg-slate-50/50 dark:bg-slate-900/50">
      <div className="container flex flex-col gap-8 py-8">
        <div className="flex flex-col gap-6 lg:flex-row lg:justify-between">
          {/* Branding & Description */}
          <div className="flex flex-col gap-2">
            <Link href="/" className="flex items-center gap-2">
              <Icons.logo className="h-6 w-6" />
              <span className="font-bold">{siteConfig.name}</span>
            </Link>
            <p className="max-w-md text-sm text-muted-foreground">
              {siteConfig.description}
            </p>
          </div>

          {/* Social Links */}
          <div className="flex flex-col gap-2">
            <h3 className="text-sm font-medium">Connect with me</h3>
            <div className="flex gap-2">
              <Link href={siteConfig.links.github} target="_blank" rel="noopener noreferrer">
                <Button variant="ghost" size="icon" className="hover:bg-primary hover:text-primary-foreground">
                  <Icons.gitHub className="h-4 w-4" />
                  <span className="sr-only">GitHub</span>
                </Button>
              </Link>
              <Link href={siteConfig.links.twitter} target="_blank" rel="noopener noreferrer">
                <Button variant="ghost" size="icon" className="hover:bg-[#1DA1F2] hover:text-white">
                  <Icons.twitter className="h-4 w-4" />
                  <span className="sr-only">Twitter</span>
                </Button>
              </Link>
              <Link href={siteConfig.links.linkedin} target="_blank" rel="noopener noreferrer">
                <Button variant="ghost" size="icon" className="hover:bg-[#0A66C2] hover:text-white">
                  <Icons.linkedin className="h-4 w-4" />
                  <span className="sr-only">LinkedIn</span>
                </Button>
              </Link>
            </div>
          </div>
        </div>

        <Separator />

        {/* Bottom Section */}
        <div className="flex flex-col items-center justify-between gap-4 text-sm text-muted-foreground md:flex-row">
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
            <span>
              © {new Date().getFullYear()} {siteConfig.name}
            </span>
            <span className="hidden md:inline">•</span>
            <Link 
              href="https://yilmazcengiz.tr" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="hover:text-primary hover:underline"
            >
              Cengiz YILMAZ
            </Link>
            <span className="hidden md:inline">•</span>
            <Link 
              href="https://mvp.microsoft.com/en-US/MVP/profile/a785a6f2-f116-ee11-8f6e-000d3a1ad36b" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent hover:opacity-80"
            >
              Microsoft MVP
            </Link>
          </div>

          <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
            <Link 
              href="https://tenant.365gurusu.com" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="hover:text-primary hover:underline"
            >
              Azure & M365 Tenant Find
            </Link>
            <span className="hidden md:inline">•</span>
            <Link 
              href="/feed.xml" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="hover:text-primary hover:underline"
            >
              RSS Feed
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
