import { NavItem } from "@/types/nav"

interface SiteConfig {
  name: string
  description: string
  url: string
  mainNav: NavItem[]
  links: {
    twitter: string
    github: string
    linkedin: string
  }
}

export const siteConfig: SiteConfig = {
  name: "Microsoft 365 Message Center Archive",
  description: "Archive of messages posted in the Message Center of the Microsoft 365 Admin Portal.",
  url: "https://messages.yilmazcengiz.tr",
  mainNav: [
    {
      title: "Cengiz YILMAZ",
      href: "https://yilmazcengiz.tr",
    },
    {
      title: "Azure and M365 Tenant Find",
      href: "https://tenant.365gurusu.com",
    },
  ],
  links: {
    twitter: "https://twitter.com/cengizyilmaz_",
    github: "https://github.com/cengizyilmaz1",
    linkedin: "https://www.linkedin.com/in/cengizyilmaz/",
  },
}