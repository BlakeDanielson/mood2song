import type React from "react"

export default function AltLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen w-full">
      {children}
    </div>
  )
} 