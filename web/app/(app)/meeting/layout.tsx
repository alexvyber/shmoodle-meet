export const metadata = {
  title: "Next.js",
  description: "Generated by Next.js",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <main className="bg-zinc-800 h-screen  text-white relative">{children}</main>
}
