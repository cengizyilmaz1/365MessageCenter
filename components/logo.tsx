import { LucideProps } from "lucide-react"

export function Logo(props: LucideProps) {
  return (
    <svg
      {...props}
      viewBox="0 0 512 512"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="h-6 w-6"
    >
      {/* Main circle */}
      <circle cx="256" cy="256" r="200" className="fill-primary/10" />
      
      {/* Message icon */}
      <path 
        d="M356 192H156C145 192 136 201 136 212V332C136 343 145 352 156 352H196V400L244 352H356C367 352 376 343 376 332V212C376 201 367 192 356 192Z"
        className="fill-primary"
      />
      
      {/* Notification dots */}
      <circle cx="196" cy="272" r="12" className="fill-background" />
      <circle cx="256" cy="272" r="12" className="fill-background" />
      <circle cx="316" cy="272" r="12" className="fill-background" />
      
      {/* Decorative rings */}
      <circle 
        cx="256" 
        cy="256" 
        r="180" 
        className="stroke-primary/20" 
        strokeWidth="4"
        fill="none"
      />
      <circle 
        cx="256" 
        cy="256" 
        r="140" 
        className="stroke-primary/30" 
        strokeWidth="4"
        fill="none"
      />
    </svg>
  )
}
