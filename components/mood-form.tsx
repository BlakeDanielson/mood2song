"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Loader2, Sparkles, Search } from "lucide-react"
import { useRouter } from "next/navigation"
import { MoodFilters } from "./mood-filters"
import { MoodPresets } from "./mood-presets"
import { toast } from "sonner"
import type { Persona } from "@/lib/personas"
import { cn } from "@/lib/utils"
import Image from "next/image"

interface MoodFormProps {
  personas: Persona[]
  selectedPersonaId: string | null
  onPersonaChange: (value: string | null) => void
  onSubmitRequest: (params: { mood?: string; filters: any }) => Promise<void>
  isLoading: boolean
}

export function MoodForm({
  personas,
  selectedPersonaId,
  onPersonaChange,
  onSubmitRequest,
  isLoading,
}: MoodFormProps) {
  const [mood, setMood] = useState("")
  const [filters, setFilters] = useState({
    genre: "",
    era: "",
    popularity: "",
    language: "",
    excludeMainstream: false,
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!mood.trim() && !selectedPersonaId) {
      toast.error("Input required", {
        description: "Please enter a mood or select a persona.",
      })
      return
    }

    try {
      await onSubmitRequest({
        mood: !selectedPersonaId ? mood : undefined,
        filters,
      })
    } catch (error) {
      console.error("Error during submit request:", error)
      // Consider adding user-facing error feedback here
    }
  }

  const handleFilterChange = (newFilters: any) => {
    setFilters(newFilters)
  }

  const handleSelectMood = (selectedMood: string) => {
    setMood(selectedMood)
    // Deselect persona if mood is manually selected
    if (selectedPersonaId) {
      onPersonaChange(null);
    }
  }

  const handlePersonaSelect = (personaId: string) => {
    const newSelectedId = selectedPersonaId === personaId ? null : personaId;
    onPersonaChange(newSelectedId)
    // Clear mood input if a persona is selected
    if (newSelectedId) {
      setMood("")
    }
  }

  return (
    <div className="space-y-4 mb-4">
      <div className="relative">
        <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-muted-foreground" />
        </div>
        <Input
          id="mood"
          placeholder="How are you feeling right now? (optional if persona selected)"
          value={mood}
          onChange={(e) => {
            setMood(e.target.value)
            // Deselect persona if user starts typing a mood
            if (e.target.value && selectedPersonaId) {
              onPersonaChange(null)
            }
          }}
          className="spotify-input pl-10 h-12 rounded-full text-sm"
          disabled={isLoading}
        />
      </div>

      <div className="flex items-center justify-between gap-4">
        <MoodPresets onSelectMood={handleSelectMood} />
        <Button
          type="button"
          onClick={handleSubmit}
          disabled={isLoading || (!mood.trim() && !selectedPersonaId)}
          className="spotify-button rounded-full px-8 py-3 h-auto flex-shrink-0"
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Finding songs...
            </>
          ) : (
            <>
              <Sparkles className="mr-2 h-4 w-4" />
              Find My Songs
            </>
          )}
        </Button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <MoodFilters onFilterChange={handleFilterChange} />

        <div className="space-y-2">
          <label className="block text-sm font-medium text-muted-foreground mb-2">
            Or Choose a Persona (optional if mood entered)
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {personas.map((persona) => {
              const displayedArtists = persona.artists.slice(0, 3);
              const remainingArtists = persona.artists.length - displayedArtists.length;

              return (
                <Button
                  key={persona.id}
                  variant="outline"
                  type="button"
                  onClick={() => handlePersonaSelect(persona.id)}
                  disabled={isLoading}
                  className={cn(
                    "h-auto min-h-[110px] text-left justify-start p-4 border rounded-lg transition-all duration-150 flex flex-row items-start gap-4",
                    "bg-[#181818] border-[#282828] hover:bg-[#282828]",
                    selectedPersonaId === persona.id
                      ? "border-[#505050] ring-2 ring-offset-2 ring-offset-[#121212] ring-white"
                      : "border-[#282828] hover:border-[#404040]"
                  )}
                >
                  <Image 
                    src={persona.imageUrl}
                    alt={`${persona.name} persona image`}
                    width={64}
                    height={64}
                    className="rounded-full flex-shrink-0 mt-1"
                  />
                  <div className="flex flex-col flex-grow min-w-0">
                    <span className="font-bold text-base mb-1 text-white truncate">
                      {persona.name}
                    </span>
                    <span className={cn(
                        "text-xs leading-normal text-gray-400 mb-2",
                        "line-clamp-2"
                     )}>
                      {persona.description}
                    </span>
                    <div className="flex flex-wrap gap-1 items-center">
                      {displayedArtists.map((artist) => (
                        <span key={artist} className="text-xs bg-[#303030] text-gray-300 px-2 py-0.5 rounded-full whitespace-nowrap">
                          {artist}
                        </span>
                      ))}
                      {remainingArtists > 0 && (
                        <span className="text-xs text-gray-500 ml-1 whitespace-nowrap">
                          +{remainingArtists} more
                        </span>
                      )}
                    </div>
                  </div>
                </Button>
              )
            })}
          </div>
        </div>
      </form>
    </div>
  )
}
