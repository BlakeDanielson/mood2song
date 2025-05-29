"use client"

import { usePathname } from "next/navigation"
import { Sidebar as AppSidebar } from "@/components/sidebar"

interface LayoutWrapperProps {
  children: React.ReactNode
}

export function LayoutWrapper({ children }: LayoutWrapperProps) {
  const pathname = usePathname()
  const isFullScreenRoute = pathname === "/alt7" || pathname === "/alt"

  if (isFullScreenRoute) {
    // Full-screen layout for alt and alt7 routes
    return (
      <main className="min-h-screen w-full">
        {children}
      </main>
    )
  }

  // Default layout with sidebar for other routes
  return (
    <div className="flex min-h-screen">
      <div className="fixed h-screen w-64 border-r dark:border-neutral-800 p-4 flex-shrink-0 hidden md:block">
        <AppSidebar />
      </div>
      <main className="flex-1 overflow-y-auto pl-4 pr-4 md:pl-72 md:pr-10">
        {children}
      </main>
    </div>
  )
} 