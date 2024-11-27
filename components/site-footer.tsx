export function SiteFooter() {
  return (
    <footer className="border-t bg-slate-50 dark:bg-slate-900">
      <div className="container flex flex-col items-center justify-between gap-4 py-10 md:h-24 md:flex-row md:py-0">
        <div className="flex flex-col items-center gap-4 px-8 md:flex-row md:gap-2 md:px-0">
          <p className="text-center text-sm leading-loose md:text-left">
            © 2024 Microsoft Message Center Archive | 
            <a 
              href="https://yilmazcengiz.tr" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="mx-1 font-semibold text-primary hover:underline"
            >
              Cengiz YILMAZ
            </a>
            |
            <a 
              href="https://mvp.microsoft.com/en-US/MVP/profile/a785a6f2-f116-ee11-8f6e-000d3a1ad36b" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="mx-1 font-semibold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent hover:opacity-80"
            >
              Microsoft MVP
            </a>
            | 
            <span className="mx-1 text-red-500">❤</span> 
            Graph API
          </p>
        </div>
      </div>
    </footer>
  )
}
