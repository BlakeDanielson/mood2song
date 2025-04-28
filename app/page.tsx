"use client"

import { useState, useCallback } from "react"
import { MoodForm } from "@/components/mood-form"
import { SongRecommendations } from "@/components/song-recommendations"
import { personas, Persona } from "@/lib/personas"
import { findSongs } from "@/app/actions"
import type { SongData, FindSongsSuccessResponse } from "@/app/actions"
import { toast } from "sonner"

export default function Home() {
  const [selectedPersonaId, setSelectedPersonaId] = useState<string | null>(null)
  const [songs, setSongs] = useState<SongData[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [apiMood, setApiMood] = useState<string>("")
  const [apiFilters, setApiFilters] = useState<any>({})
  const [lastFetchParams, setLastFetchParams] = useState<{ mood?: string, filters: any, personaId?: string | null } | null>(null)
  const [searchPerformed, setSearchPerformed] = useState(false)

  const handleFindSongs = useCallback(async (params?: { mood?: string, filters: any }) => {
    const fetchParams = params || lastFetchParams
    if (!fetchParams) {
      console.log("handleFindSongs called without params or previous params, aborting.")
      return
    }
    
    const { mood: formMood, filters: formFilters } = fetchParams
    const currentPersonaId = selectedPersonaId

    console.log("handleFindSongs fetching with:", { formMood, currentPersonaId, formFilters })
    setLoading(true)
    setError(null)
    setSongs([])
    setApiMood("")
    setApiFilters({})
    setSearchPerformed(true)

    setLastFetchParams({ mood: formMood, filters: formFilters, personaId: currentPersonaId })

    try {
      let moodOrPersonaArg: string | { personaId: string }
      let optionsArg = formFilters

      if (currentPersonaId) {
        moodOrPersonaArg = { personaId: currentPersonaId }
      } else if (formMood?.trim()) {
        moodOrPersonaArg = formMood.trim()
      } else {
        throw new Error("Please provide a mood or select a persona.")
      }
      
      const result = await findSongs(moodOrPersonaArg, optionsArg)

      if (!result) {
        throw new Error("Failed to get response from server.")
      } else if ('error' in result && result.error) {
        console.error("Error from findSongs:", result.error)
        throw new Error(`Couldn't get recommendations. ${result.error.includes("AI returned malformed JSON") || result.error.includes("expected JSON format") ? "There was an issue with the AI response." : "Please try again."}`)
      } else if ('songs' in result && result.songs) {
        const successResult = result as FindSongsSuccessResponse
        setSongs(successResult.songs || [])
        setApiMood(successResult.mood || "")
        setApiFilters(successResult.filters || {})
        setError(null)
        if (params) {
          toast.success("Success!", {
            description: `Found ${successResult.songs?.length || 0} songs.`
          })
        }
      } else {
        console.warn("Received unexpected data structure from findSongs:", result)
        throw new Error("Received unexpected data structure.")
      }
    } catch (err: any) {
      console.error("Error calling findSongs:", err)
      const errorMessage = err instanceof Error ? err.message : "An unknown error occurred."
      setError(errorMessage)
      setSongs([])
      setApiMood("")
      setApiFilters({})
      if (params) {
        toast.error("Error", {
          description: errorMessage,
        })
      }
    } finally {
      setLoading(false)
    }
  }, [selectedPersonaId, lastFetchParams])

  const handlePersonaChange = (id: string | null) => {
    setSelectedPersonaId(id)
    setLastFetchParams(null)
    setSongs([])
    setError(null)
    setApiMood("")
    setApiFilters({})
    setSearchPerformed(false)
  }

  const selectedPersona = personas.find(p => p.id === selectedPersonaId) || null

  const showRecommendationsFirst = searchPerformed && !loading && !error && songs.length > 0;

  return (
    <div className="mx-auto px-8 py-4">
      <header className="mb-8 flex items-center justify-between">
        <h1 className="text-3xl font-bold text-center flex-grow">Tell us how you're feeling or pick a persona</h1>
      </header>

      {showRecommendationsFirst && (
        <SongRecommendations
          songs={songs}
          loading={loading}
          error={error}
          mood={apiMood}
          filters={apiFilters}
          selectedPersona={selectedPersona}
          onRefresh={() => handleFindSongs()}
          searchPerformed={searchPerformed}
        />
      )}

      <MoodForm
        personas={personas}
        selectedPersonaId={selectedPersonaId}
        onPersonaChange={handlePersonaChange}
        onSubmitRequest={handleFindSongs}
        isLoading={loading}
      />

      {!showRecommendationsFirst && (
        <SongRecommendations
          songs={songs}
          loading={loading}
          error={error}
          mood={apiMood}
          filters={apiFilters}
          selectedPersona={selectedPersona}
          onRefresh={() => handleFindSongs()}
          searchPerformed={searchPerformed}
        />
      )}
    </div>
  )
}
