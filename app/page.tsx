"use client"

import { useState, useCallback, useEffect } from "react"
import { MoodForm } from "@/components/mood-form"
import { SongRecommendations } from "@/components/song-recommendations"
import { personas, Persona } from "@/lib/personas"
import { findSongs } from "@/app/actions"
import type { SongData, FindSongsSuccessResponse } from "@/app/actions"
import { toast } from "sonner"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Laptop, Truck, Guitar, Music } from 'lucide-react'
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Loader2, Sparkles, Search } from "lucide-react"

// Helper to get an icon based on persona name (replace with better logic if needed)
const getPersonaIcon = (personaName: string): JSX.Element => {
  if (personaName.includes("Online")) return <Laptop className="h-6 w-6 text-green-500" />;
  if (personaName.includes("Country")) return <Truck className="h-6 w-6 text-green-500" />;
  if (personaName.includes("Rock")) return <Guitar className="h-6 w-6 text-green-500" />;
  // Add more specific icons as needed
  return <Music className="h-6 w-6 text-green-500" />; // Default icon
};

export default function Home() {
  const [selectedPersonaId, setSelectedPersonaId] = useState<string | null>(null)
  const [songs, setSongs] = useState<SongData[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [lastFetchParams, setLastFetchParams] = useState<{ mood?: string, filters: any, personaId?: string | null } | null>(null)
  const [searchPerformed, setSearchPerformed] = useState(false)
  const [activeTab, setActiveTab] = useState<string>("persona")

  const [mood, setMood] = useState("")
  const [excludeMainstream, setExcludeMainstream] = useState(false)
  const [filters, setFilters] = useState({
    genre: "",
    era: "",
    popularity: "",
    language: "",
  })

  const handleFindSongs = useCallback(async (personaIdToFetch?: string | null) => {
    const currentMood = mood.trim() || undefined;
    const currentFilters = { ...filters, excludeMainstream };
    const currentPersonaId = personaIdToFetch !== undefined ? personaIdToFetch : selectedPersonaId;

    if (personaIdToFetch === undefined && !currentMood && Object.values(filters).every(f => !f) && !currentPersonaId) {
      toast.info("Input needed", {
        description: "Please enter a mood, select filters, or choose a persona.",
      })
      return;
    }

    if (personaIdToFetch !== undefined && !currentPersonaId) {
      console.warn("handleFindSongs called via persona selection, but personaId is null/undefined.");
      return;
    }

    console.log("handleFindSongs fetching with:", { currentMood, currentPersonaId, currentFilters })
    setLoading(true)
    setError(null)
    setSongs([])
    setSearchPerformed(true)

    setLastFetchParams({ mood: currentMood, filters: currentFilters, personaId: currentPersonaId })

    try {
      const result = await findSongs({
        mood: currentMood,
        personaId: currentPersonaId ?? undefined,
        options: currentFilters
      })

      if (!result) {
        throw new Error("Failed to get response from server.")
      } else if ('error' in result && result.error) {
        console.error("Error from findSongs:", result.error)
        throw new Error(`Couldn't get recommendations. ${result.error.includes("AI returned malformed JSON") || result.error.includes("expected JSON format") ? "There was an issue with the AI response." : "Please try again."}`)
      } else if ('songs' in result && result.songs) {
        const successResult = result as FindSongsSuccessResponse
        setSongs(successResult.songs || [])
        setError(null)
        toast.success("Success!", {
          description: `Found ${successResult.songs?.length || 0} songs.`
        })
      } else {
        console.warn("Received unexpected data structure from findSongs:", result)
        throw new Error("Received unexpected data structure.")
      }
    } catch (err: any) {
      console.error("Error calling findSongs:", err)
      const errorMessage = err instanceof Error ? err.message : "An unknown error occurred."
      setError(errorMessage)
      setSongs([])
      toast.error("Error", {
        description: errorMessage,
      })
    } finally {
      setLoading(false)
    }
  }, [mood, filters, excludeMainstream, selectedPersonaId])

  // New wrapper function for the button click
  const handleButtonClick = () => {
    handleFindSongs(); // Call without arguments, it will use the state `selectedPersonaId`
  };

  const handlePersonaSelect = (id: string | null) => {
    const isDeselecting = selectedPersonaId === id;
    
    if (isDeselecting) {
      // If clicking the already selected persona, deselect it
      setSelectedPersonaId(null);
      setSongs([]); // Clear results when deselecting
      setError(null);
      setSearchPerformed(false); 
      console.log("Persona deselected.");
    } else {
       // If selecting a new or different persona
      setSelectedPersonaId(id);
      // Don't fetch songs automatically anymore
      // We might still want to clear previous results if the user *changes* persona
      // Let's clear results unless the user is just selecting the first persona
      if (selectedPersonaId !== null) { // Clear if *changing* from one persona to another
          setSongs([]);
          setError(null);
          setSearchPerformed(false); 
      }
      console.log("Persona selected:", id);
    }
    
    // Note: No call to handleFindSongs(id) here anymore
  };

  const handleFilterChange = (newFilters: {
    genre?: string
    era?: string
    popularity?: string
    language?: string
  }) => {
    setFilters({
      genre: newFilters.genre || "",
      era: newFilters.era || "",
      popularity: newFilters.popularity || "",
      language: newFilters.language || "",
    });
  }

  const handleSelectMood = (selectedMood: string) => {
    setMood(selectedMood);
  }

  const handleRefresh = () => {
      if (lastFetchParams) {
          console.log("Refreshing with last params:", lastFetchParams);
          handleFindSongs();
      } else {
          console.log("No previous search to refresh.");
          toast.info("No previous search to refresh.")
      }
  }

  const selectedPersona = personas.find(p => p.id === selectedPersonaId) || null

  const showRecommendationsFirst = searchPerformed && !loading && !error && songs.length > 0;

  return (
    <div className="mx-auto px-4 md:px-8 py-4">
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 mb-6">
        <div className="relative flex-grow">
          <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-muted-foreground" />
          </div>
          <Input
            id="mood-input"
            placeholder="How are you feeling right now?"
            value={mood}
            onChange={(e) => setMood(e.target.value)}
            className="spotify-input pl-10 h-12 rounded-full text-sm w-full"
            disabled={loading}
            onKeyDown={(e) => { if (e.key === 'Enter') handleFindSongs(); }}
          />
        </div>
        <div className="flex items-center space-x-2 flex-shrink-0 self-center sm:self-auto">
          <Switch
            id="exclude-mainstream-toggle"
            checked={excludeMainstream}
            onCheckedChange={setExcludeMainstream}
            className="data-[state=checked]:bg-[#1DB954]"
            disabled={loading}
          />
          <Label htmlFor="exclude-mainstream-toggle" className="text-sm text-white whitespace-nowrap">
            Avoid Hits
          </Label>
        </div>
        <Button
          type="button"
          onClick={handleButtonClick}
          disabled={loading}
          className="spotify-button rounded-full px-16 py-3 h-12 flex-shrink-0 w-full sm:w-auto"
        >
          {loading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Finding...
            </>
          ) : (
            <>
              <Sparkles className="mr-2 h-4 w-4" />
              Find Songs
            </>
          )}
        </Button>
      </div>

      {/* Moved SongRecommendations to be above Tabs, but below input */}
      {searchPerformed && (
        <div className="mb-6"> { /* Add margin below recommendations */}
          <SongRecommendations
            songs={songs}
            loading={loading}
            error={error}
            mood={mood}
            filters={{...filters, excludeMainstream}}
            selectedPersona={selectedPersona}
            onRefresh={handleRefresh}
            searchPerformed={searchPerformed} // Pass searchPerformed to handle internal messages correctly
          />
        </div>
      )}

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-4 bg-[#121212] p-0 h-12">
          <TabsTrigger 
            value="mood" 
            className={`py-3 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-[#282828] data-[state=active]:text-white data-[state=inactive]:text-muted-foreground data-[state=active]:shadow-none rounded-tl-md rounded-bl-md rounded-tr-none rounded-br-none border-b-4 ${activeTab === 'mood' ? 'border-green-500' : 'border-transparent'}`}
          >
            Select Mood
          </TabsTrigger>
          <TabsTrigger 
            value="persona" 
            className={`py-3 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-[#282828] data-[state=active]:text-white data-[state=inactive]:text-muted-foreground data-[state=active]:shadow-none rounded-tr-md rounded-br-md rounded-tl-none rounded-bl-none border-b-4 ${activeTab === 'persona' ? 'border-green-500' : 'border-transparent'}`}
          >
            {selectedPersona ? selectedPersona.name : 'Choose Persona'}
          </TabsTrigger>
        </TabsList>
        <TabsContent value="mood">
          <MoodForm
            filters={filters}
            onFilterChange={handleFilterChange}
            onSelectMood={handleSelectMood}
            isLoading={loading}
            currentMood={mood}
          />
        </TabsContent>
        <TabsContent value="persona">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {personas.map((persona) => (
              <Card 
                key={persona.id} 
                className={`cursor-pointer transition-all duration-200 ease-in-out bg-[#181818] border-[#282828] text-white hover:bg-[#282828] ${selectedPersonaId === persona.id ? 'ring-2 ring-green-500' : ''}`}
                onClick={() => handlePersonaSelect(persona.id)}
              >
                <CardHeader className="flex flex-row items-start gap-4 p-4">
                  {getPersonaIcon(persona.name)}
                  <div className="space-y-1">
                    <CardTitle className="text-base font-bold">{persona.name}</CardTitle>
                    <CardDescription className="text-xs text-muted-foreground leading-tight">{persona.description}</CardDescription>
                  </div>
                </CardHeader>
                <CardContent className="p-4 pt-0">
                  <div className="flex flex-wrap gap-1">
                    {persona.artists.slice(0, 3).map(artist => (
                      <Badge key={artist} variant="secondary" className="text-[10px] font-normal px-2 py-0.5 bg-[#333] text-gray-300 rounded-full">{artist}</Badge>
                    ))}
                    {persona.artists.length > 3 && <Badge variant="secondary" className="text-[10px] font-normal px-2 py-0.5 bg-[#333] text-gray-300 rounded-full">+more</Badge>}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
