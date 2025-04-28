"use client"

import { Toaster as SonnerToaster } from "sonner"

export function SonnerProvider() {
  return (
    <SonnerToaster
      position="bottom-right"
      toastOptions={{
        style: {
          background: "#333333",
          color: "#ffffff",
          border: "1px solid #444444",
        },
        className: "font-sans",
        success: {
          style: {
            background: "#1DB954",
            color: "#ffffff",
            border: "none",
          },
        },
        error: {
          style: {
            background: "#E91429",
            color: "#ffffff",
            border: "none",
          },
        },
      }}
      theme="dark"
      richColors
    />
  )
}
