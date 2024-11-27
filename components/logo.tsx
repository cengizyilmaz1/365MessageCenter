import { LucideProps } from "lucide-react"

export function Logo(props: LucideProps) {
  return (
    <svg
      {...props}
      viewBox="0 0 500 500"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="h-6 w-6"
    >
      {/* Main body */}
      <path
        d="M250 150C200 150 180 200 180 250C180 300 220 350 250 350C280 350 320 300 320 250C320 200 300 150 250 150Z"
        fill="currentColor"
        className="text-pink-500 dark:text-pink-400"
      />
      
      {/* Wings */}
      <path
        d="M250 180C200 180 120 220 120 250C120 280 200 320 250 320"
        stroke="currentColor"
        strokeWidth="30"
        strokeLinecap="round"
        className="text-yellow-500 dark:text-yellow-400"
      />
      <path
        d="M250 180C300 180 380 220 380 250C380 280 300 320 250 320"
        stroke="currentColor"
        strokeWidth="30"
        strokeLinecap="round"
        className="text-yellow-500 dark:text-yellow-400"
      />
      
      {/* Feathers */}
      <path
        d="M180 220L140 180M220 180L180 140M280 180L320 140M320 220L360 180"
        stroke="currentColor"
        strokeWidth="15"
        strokeLinecap="round"
        className="text-pink-400 dark:text-pink-300"
      />
      
      {/* Tail feathers */}
      <path
        d="M220 320L180 360M280 320L320 360"
        stroke="currentColor"
        strokeWidth="15"
        strokeLinecap="round"
        className="text-pink-400 dark:text-pink-300"
      />
    </svg>
  )
}
