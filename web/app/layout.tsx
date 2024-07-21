import "./globals.css"

import type { Metadata } from "next"

import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${GeistSans.variable} ${GeistMono.variable}`}
    >
      <body>{children}</body>
    </html>
  )
}
