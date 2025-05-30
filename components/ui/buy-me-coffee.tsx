"use client"

import { useEffect } from "react"

interface BuyMeCoffeeProps {
  username: string
  message?: string
  description?: string
  color?: string
  position?: "left" | "right"
  xMargin?: number
  yMargin?: number
  className?: string
}

interface BuyMeCoffeeButtonProps {
  username: string
  text?: string
  className?: string
}

// Floating Widget Component
export function BuyMeCoffee({
  username,
  message = "Thank you for using Mood2Song! If you enjoyed it, consider buying me a coffee! ☕",
  description = "Support the developer!",
  color = "#FFDD00",
  position = "right",
  xMargin = 18,
  yMargin = 18,
  className = ""
}: BuyMeCoffeeProps) {
  useEffect(() => {
    const script = document.createElement("script")
    const div = document.getElementById("supportByBMC")
    
    if (!div) return

    // Configure the official BMC widget
    script.setAttribute("data-name", "BMC-Widget")
    script.src = "https://cdnjs.buymeacoffee.com/1.0.0/widget.prod.min.js"
    script.setAttribute("data-id", username)
    script.setAttribute("data-description", description)
    script.setAttribute("data-message", message)
    script.setAttribute("data-color", color)
    script.setAttribute("data-position", position)
    script.setAttribute("data-x_margin", xMargin.toString())
    script.setAttribute("data-y_margin", yMargin.toString())
    script.async = true

    // Trigger DOMContentLoaded event for the widget
    script.onload = function () {
      const evt = document.createEvent("Event")
      evt.initEvent("DOMContentLoaded", false, false)
      window.dispatchEvent(evt)
    }

    document.head.appendChild(script)
    div.appendChild(script)

    // Critical cleanup to prevent memory leaks
    return () => {
      if (document.head.contains(script)) {
        document.head.removeChild(script)
      }
      if (div.contains(script)) {
        div.removeChild(script)
      }
    }
  }, [username, message, description, color, position, xMargin, yMargin])

  return <div id="supportByBMC" className={className}></div>
}

// Inline Button Component
export function BuyMeCoffeeButton({
  username,
  text = "Buy me a coffee ☕",
  className = ""
}: BuyMeCoffeeButtonProps) {
  const handleClick = () => {
    window.open(`https://www.buymeacoffee.com/${username}`, '_blank', 'noopener,noreferrer')
  }

  return (
    <button
      onClick={handleClick}
      className={`
        inline-flex items-center justify-center gap-2 
        px-6 py-3 
        bg-gradient-to-r from-yellow-400 to-orange-500 
        hover:from-yellow-500 hover:to-orange-600 
        text-black font-semibold 
        rounded-full 
        shadow-lg hover:shadow-xl 
        transition-all duration-200 
        transform hover:scale-105
        focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-offset-2
        ${className}
      `}
      aria-label={`Support the developer by buying them a coffee`}
    >
      <span className="text-lg">☕</span>
      <span>{text}</span>
    </button>
  )
} 