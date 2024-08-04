import "./globals.css"

import type { Metadata } from "next"
import type React from "react"
import { GeistSans } from "geist/font/sans"
import { StoreProvider } from "@/store/provider"

export const metadata: Metadata = {
  title: {
    template: "%s - Shmoodle Meet",
    default: "Shmoodle Meet",
  },
  description: "",
}

export default async function RootLayout({ children }: React.PropsWithChildren) {
  return (
    <StoreProvider>
      <html
        lang="en"
        className={`${GeistSans.className} text-zinc-950 antialiased  dark:bg-zinc-900 dark:text-white dark:lg:bg-zinc-950 h-full`}
      >
        <body className="h-full">{children}</body>
      </html>
    </StoreProvider>
  )
}
