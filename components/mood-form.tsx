"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Loader2, Sparkles, Search } from "lucide-react"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { useRouter } from "next/navigation"
import { MoodFilters } from "./mood-filters"
import { MoodPresets } from "./mood-presets"
import { toast } from "sonner"
import type { Persona } from "@/lib/personas"
import { cn } from "@/lib/utils"
import Image from "next/image"

interface MoodFormProps {
  filters: {
    genre: string
    era: string
    popularity: string
    language: string
  }
  onFilterChange: (newFilters: {
    genre?: string
    era?: string
    popularity?: string
    language?: string
  }) => void
  onSelectMood: (selectedMood: string) => void
  isLoading: boolean
  currentMood: string
}

export function MoodForm({
  filters,
  onFilterChange,
  onSelectMood,
  isLoading,
  currentMood,
}: MoodFormProps) {
  return (
    <div className="space-y-4 mb-4 mt-4">
      <MoodPresets onSelectMood={onSelectMood} currentMood={currentMood} />

      <div className="space-y-4">
        <MoodFilters onFilterChange={onFilterChange} />
      </div>
    </div>
  )
}
