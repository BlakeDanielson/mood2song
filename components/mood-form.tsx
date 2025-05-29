"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Loader2, Sparkles, Search, Laptop, Truck, Guitar, Music } from "lucide-react"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { useRouter } from "next/navigation"
import { MoodFilters } from "./mood-filters"
import { MoodPresets } from "./mood-presets"
import { toast } from "sonner"
import { type Persona, personas } from "@/lib/personas"
import { cn } from "@/lib/utils"
import Image from "next/image"
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"

const getPersonaIcon = (personaName: string): JSX.Element => {
  if (personaName.includes("Online")) return <Laptop className="h-6 w-6 text-green-500" />;
  if (personaName.includes("Country")) return <Truck className="h-6 w-6 text-green-500" />;
  if (personaName.includes("Rock")) return <Guitar className="h-6 w-6 text-green-500" />;
  return <Music className="h-6 w-6 text-green-500" />;
};

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
  currentMood
}: MoodFormProps) {

  return (
    <div className="space-y-8">
      {/* Hide MoodPresets on small screens (mobile) */}
      <div className="hidden sm:block">
        <MoodPresets onSelectMood={onSelectMood} currentMood={currentMood} disabled={isLoading} />
      </div>
      <MoodFilters filters={filters} onFilterChange={onFilterChange} disabled={isLoading} />
    </div>
  )
}
