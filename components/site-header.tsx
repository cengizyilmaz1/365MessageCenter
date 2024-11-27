"use client"

import Link from "next/link"
import { buttonVariants } from "@/components/ui/button"
import { Icons } from "@/components/icons"
import { MainNav } from "@/components/main-nav"
import { ThemeToggle } from "@/components/theme-toggle"
import { siteConfig } from "@/config/site"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Separator } from "@/components/ui/separator"

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/80 backdrop-blur-lg">
      <div className="container flex h-16 items-center space-x-4 sm:justify-between sm:space-x-0">
        <MainNav items={[]} />
        
        <div className="flex flex-1 items-center justify-end space-x-4">
          <nav className="flex items-center space-x-2">
            <div className="hidden md:flex items-center space-x-4 mr-4">
              <Separator orientation="vertical" className="h-6" />
              
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Link
                      href="https://yilmazcengiz.tr"
                      target="_blank"
                      rel="noopener noreferrer"
                      className={buttonVariants({
                        variant: "ghost",
                        className: "text-sm font-medium transition-colors hover:text-primary"
                      })}
                    >
                      <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                        Cengiz YILMAZ
                      </span>
                    </Link>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Visit Cengiz YILMAZ's website</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>

              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Link
                      href="https://tenant.365gurusu.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className={buttonVariants({
                        variant: "ghost",
                        className: "text-sm font-medium transition-colors hover:text-primary"
                      })}
                    >
                      <span className="bg-gradient-to-r from-cyan-500 to-blue-500 bg-clip-text text-transparent">
                        Azure & M365 Tenant Find
                      </span>
                    </Link>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Find Azure and Microsoft 365 tenant information</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>

            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Link
                    href={siteConfig.links.github}
                    target="_blank"
                    rel="noreferrer"
                    className={buttonVariants({
                      size: "icon",
                      variant: "ghost",
                      className: "hover:bg-primary hover:text-primary-foreground"
                    })}
                  >
                    <Icons.gitHub className="h-5 w-5" />
                    <span className="sr-only">GitHub repository</span>
                  </Link>
                </TooltipTrigger>
                <TooltipContent>
                  <p>View source on GitHub</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Link
                    href={siteConfig.links.twitter}
                    target="_blank"
                    rel="noreferrer"
                    className={buttonVariants({
                      size: "icon",
                      variant: "ghost",
                      className: "hover:bg-[#1DA1F2] hover:text-white"
                    })}
                  >
                    <Icons.twitter className="h-5 w-5" />
                    <span className="sr-only">Twitter profile</span>
                  </Link>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Follow on Twitter</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Link
                    href={siteConfig.links.linkedin}
                    target="_blank"
                    rel="noreferrer"
                    className={buttonVariants({
                      size: "icon",
                      variant: "ghost",
                      className: "hover:bg-[#0A66C2] hover:text-white"
                    })}
                  >
                    <Icons.linkedin className="h-5 w-5" />
                    <span className="sr-only">LinkedIn profile</span>
                  </Link>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Connect on LinkedIn</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <ThemeToggle />
          </nav>
        </div>
      </div>
    </header>
  )
}