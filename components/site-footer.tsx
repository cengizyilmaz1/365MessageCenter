"use client"

import { Icons } from "@/components/icons"
import { Button } from "@/components/ui/button"
import { siteConfig } from "@/config/site"
import Link from "next/link"

export function SiteFooter() {
  return (
    <footer className="border-t bg-gradient-to-b from-background to-muted/20">
      <div className="container py-12">
        <div className="grid gap-8 lg:grid-cols-3">
          {/* Branding & Description */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2 text-lg font-semibold">
              <Icons.logo className="h-6 w-6" />
              Microsoft 365 Message Center
            </div>
            <p className="text-sm text-muted-foreground">
              Powered by Microsoft Graph API
            </p>
            <div className="flex gap-2">
              <Link href={siteConfig.links.github} target="_blank" rel="noopener noreferrer">
                <Button variant="ghost" size="icon" className="h-8 w-8 rounded-lg hover:bg-primary hover:text-primary-foreground">
                  <Icons.gitHub className="h-4 w-4" />
                  <span className="sr-only">GitHub</span>
                </Button>
              </Link>
              <Link href={siteConfig.links.twitter} target="_blank" rel="noopener noreferrer">
                <Button variant="ghost" size="icon" className="h-8 w-8 rounded-lg hover:bg-[#1DA1F2] hover:text-white">
                  <Icons.twitter className="h-4 w-4" />
                  <span className="sr-only">Twitter</span>
                </Button>
              </Link>
              <Link href={siteConfig.links.linkedin} target="_blank" rel="noopener noreferrer">
                <Button variant="ghost" size="icon" className="h-8 w-8 rounded-lg hover:bg-[#0A66C2] hover:text-white">
                  <Icons.linkedin className="h-4 w-4" />
                  <span className="sr-only">LinkedIn</span>
                </Button>
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col gap-4">
            <h3 className="text-sm font-semibold">Quick Links</h3>
            <div className="grid gap-2">
              <Link 
                href="https://yilmazcengiz.tr" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-sm text-muted-foreground hover:text-primary"
              >
                About Me
              </Link>
              <Link 
                href="https://tenant.365gurusu.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-sm text-muted-foreground hover:text-primary"
              >
                Azure & M365 Tenant Find
              </Link>
              <Link 
                href="/feed.xml" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-sm text-muted-foreground hover:text-primary"
              >
                RSS Feed
              </Link>
            </div>
          </div>

          {/* MVP Profile */}
          <div className="flex flex-col gap-4">
            <h3 className="text-sm font-semibold">Microsoft MVP</h3>
            <Link 
              href="https://mvp.microsoft.com/en-US/MVP/profile/a785a6f2-f116-ee11-8f6e-000d3a1ad36b" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg border bg-card p-4 text-card-foreground shadow-sm transition-colors hover:bg-muted/50"
            >
              <div className="flex flex-col gap-1">
                <span className="text-sm font-medium">Cengiz YILMAZ</span>
                <span className="text-xs text-muted-foreground">Microsoft 365 Apps & Services MVP</span>
              </div>
            </Link>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 border-t pt-8">
          <div className="flex flex-col items-center justify-between gap-4 text-center text-sm text-muted-foreground md:flex-row md:text-left">
            <p>
              © {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
            </p>
            <p className="flex items-center gap-1">
              Made with <span className="text-red-500">❤</span> by{" "}
              <Link 
                href="https://yilmazcengiz.tr"
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-foreground hover:text-primary"
              >
                Cengiz YILMAZ
              </Link>
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
