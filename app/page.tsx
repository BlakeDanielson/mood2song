"use client"

import { useState, useCallback, useEffect } from "react"
import { MoodForm } from "@/components/mood-form"
import { SongRecommendations } from "@/components/song-recommendations"
import { personas, Persona } from "@/lib/personas"
import { findSongs } from "@/app/actions"
import type { SongData, FindSongsSuccessResponse } from "@/app/actions"
import { toast } from "sonner"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Laptop, Truck, Guitar, Music, Info } from 'lucide-react'
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Loader2, Sparkles, Search } from "lucide-react"
import { PersonaModal } from "@/components/persona-modal"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

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
  const [selectedPersonaForModal, setSelectedPersonaForModal] = useState<Persona | null>(null)
  const [songs, setSongs] = useState<SongData[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [lastFetchParams, setLastFetchParams] = useState<{ mood?: string, filters: any, personaId?: string | null } | null>(null)
  const [searchPerformed, setSearchPerformed] = useState(false)
  const [showAllPersonas, setShowAllPersonas] = useState(false); // State to control visibility

  const [mood, setMood] = useState("")
  const [displayedMood, setDisplayedMood] = useState("")
  const [excludeMainstream, setExcludeMainstream] = useState(false)
  const [filters, setFilters] = useState({
    genre: "",
    era: "",
    popularity: "",
    language: "",
  })

  const handleFindSongs = useCallback(async () => {
    const currentMood = mood.trim() || undefined;
    const currentFilters = { ...filters, excludeMainstream };
    const currentPersonaId = selectedPersonaId;

    if (!currentMood && !currentPersonaId) {
      toast.info("Input needed", {
        description: "Please enter a mood or select a persona.",
      })
      return;
    }

    console.log("handleFindSongs fetching with:", { currentMood, currentPersonaId, currentFilters })
    setDisplayedMood(currentMood || "")
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

  const handleButtonClick = () => {
    handleFindSongs();
  };

  const handlePersonaSelect = (id: string | null) => {
    const isDeselecting = selectedPersonaId === id;
    
    if (isDeselecting) {
      setSelectedPersonaId(null);
      setSongs([]);
      setError(null);
      setSearchPerformed(false); 
      console.log("Persona deselected.");
    } else {
      setSelectedPersonaId(id);
      if (selectedPersonaId !== null) { 
          setSongs([]);
          setError(null);
          setSearchPerformed(false); 
      }
      console.log("Persona selected:", id);
    }
  };

  const handleOpenPersonaModal = (persona: Persona) => {
    setSelectedPersonaForModal(persona);
  };

  const handleClosePersonaModal = () => {
    setSelectedPersonaForModal(null);
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

  // Define Top Persona IDs and filter lists
  const topPersonaIds = [
    'persona-1-alt-experimental',
    'persona-2-modern-country',
    'persona-3a-rock-purist'
  ];
  const featuredPersonas = personas.filter(p => topPersonaIds.includes(p.id));
  const otherPersonas = personas.filter(p => !topPersonaIds.includes(p.id));

  return (
    <div className="mx-auto py-4 space-y-10">
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-2 bg-gradient-to-r from-[#1ED760] to-[#1DB954] bg-clip-text text-transparent">
          Discover Music by Mood, Persona, or Both
        </h1>
        <p className="text-muted-foreground">Tell us how you're feeling, apply filters, or pick a persona vibe below.</p>
      </div>

      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
        <div className="relative flex-grow">
          <Textarea
            id="mood-input"
            placeholder={"Describe your mood, activity or anything else! (e.g., 'Chill beats for a rainy afternoon', 'Upbeat running mix', 'Cooking dinner soundtrack', 'Help me roast my friend Scott')\nSet filters, or select a persona below!\nPress Enter to find songs or Shift+Enter to add a new line"}
            value={mood}
            onChange={(e) => setMood(e.target.value)}
            maxLength={250}
            className="spotify-input pl-3 pr-3 py-3 h-24 rounded-lg text-sm w-full resize-none"
            disabled={loading}
            onKeyDown={(e) => { 
              if (e.key === 'Enter' && !e.shiftKey) { 
                e.preventDefault();
                handleFindSongs(); 
              }
            }}
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
          disabled={loading || (!mood && !selectedPersonaId)}
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
            mood={displayedMood}
            filters={{...filters, excludeMainstream}}
            selectedPersona={selectedPersona}
            onRefresh={handleRefresh}
            searchPerformed={searchPerformed} // Pass searchPerformed to handle internal messages correctly
          />
        </div>
      )}

      {/* Mood Form Content (Presets & Filters) - No longer in a Tab */}
      <MoodForm
        filters={filters}
        onFilterChange={handleFilterChange}
        onSelectMood={handleSelectMood}
        isLoading={loading}
        currentMood={mood}
        // Removed onSelectPersonaAndSwitchTab prop
      />
      
      {/* Featured Personas Section */}
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-center text-white">Featured Vibes</h2>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {featuredPersonas.map((persona) => (
            <Card
              key={persona.id}
              className={`cursor-pointer transition-all duration-200 ease-in-out bg-[#181818] border-[#282828] text-white hover:bg-[#282828] flex flex-col ${selectedPersonaId === persona.id ? 'ring-2 ring-green-500' : ''}`}
              onClick={() => handlePersonaSelect(persona.id)}
            >
              <CardHeader className="flex flex-row items-center gap-4 p-4">
                <Avatar className="h-16 w-16 border-2 border-green-500">
                  <AvatarImage src={persona.imageUrl} alt={`${persona.name} avatar`} />
                  <AvatarFallback className="bg-[#333]">{persona.name.substring(0, 2)}</AvatarFallback>
                </Avatar>
                <div className="space-y-1">
                  <CardTitle className="text-lg font-bold">{persona.name}</CardTitle>
                  <CardDescription className="text-sm text-muted-foreground leading-snug">
                    "{persona.description}"
                  </CardDescription>
                </div>
              </CardHeader>
              <CardContent className="p-4 pt-2 space-y-4">
                <div>
                  <h4 className="text-xs font-semibold uppercase text-muted-foreground mb-2">Traits</h4>
                  <div className="flex flex-wrap gap-1">
                    {persona.traits.map(trait => (
                       <Badge key={trait} variant="secondary" className="text-[10px] font-normal px-1.5 py-0.5 bg-[#333] text-gray-300 rounded-full whitespace-nowrap">{trait}</Badge>
                    ))}
                  </div>
                </div>
                 <div>
                  <h4 className="text-xs font-semibold uppercase text-muted-foreground mb-2">Moods</h4>
                  <div className="flex flex-wrap gap-1">
                    {persona.moods.map(mood => (
                       <Badge key={mood} variant="outline" className="text-[10px] font-normal px-1.5 py-0.5 border-green-500 text-green-400 rounded-full whitespace-nowrap">{mood}</Badge>
                    ))}
                  </div>
                </div>
                 <div>
                  <h4 className="text-xs font-semibold uppercase text-muted-foreground mb-2">Key Artists</h4>
                  <div className="flex flex-wrap gap-1">
                    {persona.artists.map(artist => (
                       <Badge key={artist} variant="secondary" className="text-[10px] font-normal px-1.5 py-0.5 bg-[#555] text-gray-200 rounded-full whitespace-nowrap">{artist}</Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        {/* Button to toggle all personas */}
        <div className="text-center mt-6">
          <Button
            variant="outline"
            onClick={() => setShowAllPersonas(!showAllPersonas)} // Toggle state
            className="spotify-outline-button"
          >
            {showAllPersonas ? "Hide Personas" : "See All Personas"} {/* Dynamic text */}
          </Button>
        </div>
      </div>
      
      {/* Persona Grid - Conditionally rendered */}
      {showAllPersonas && (
        <div className="pt-6 border-t border-[#282828]">
          <h2 className="text-2xl font-bold mb-4 text-center text-white">Choose a Persona Vibe</h2>
           <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {otherPersonas.map((persona) => (
                <Card
                  key={persona.id}
                  className={`cursor-pointer transition-all duration-200 ease-in-out bg-[#181818] border-[#282828] text-white hover:bg-[#282828] flex flex-col justify-between ${selectedPersonaId === persona.id ? 'ring-2 ring-green-500' : ''}`}
                  onClick={() => handlePersonaSelect(persona.id)}
                >
                  <CardHeader className="p-3 space-y-1.5">
                    <div className="flex flex-row items-center gap-3">
                      {getPersonaIcon(persona.name)}
                      <CardTitle className="text-sm font-bold">{persona.name}</CardTitle>
                    </div>
                    <CardDescription className="text-xs text-muted-foreground leading-tight line-clamp-2">
                      {persona.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="p-3 pt-1 flex items-center justify-between">
                    <div className="flex flex-wrap gap-1 flex-grow mr-2">
                      {persona.artists.slice(0, 3).map(artist => (
                        <Badge key={artist} variant="secondary" className="text-[10px] font-normal px-1.5 py-0.5 bg-[#333] text-gray-300 rounded-full whitespace-nowrap">{artist}</Badge>
                      ))}
                    </div>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="text-xs text-muted-foreground hover:text-white hover:bg-[#282828] px-1.5 py-0.5 h-auto flex-shrink-0"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleOpenPersonaModal(persona);
                      }}
                      title={`More info about ${persona.name}`}
                    >
                      <Info className="h-3 w-3 mr-1" /> Info
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
      )}

      <PersonaModal 
        persona={selectedPersonaForModal} 
        isOpen={!!selectedPersonaForModal} 
        onClose={handleClosePersonaModal} 
        onSelectPersona={handlePersonaSelect}
        selectedPersonaId={selectedPersonaId}
      />
    </div>
  )
}
