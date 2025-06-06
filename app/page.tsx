"use client"

import React, { useState, useEffect, useCallback } from 'react'
import { motion } from 'framer-motion'
import { IconUser, IconSparkles, IconSearch } from '@tabler/icons-react'
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Loader2, Laptop, Truck, Guitar, Music } from 'lucide-react'
import { toast } from "sonner"
import { personas, Persona } from "@/lib/personas"
import { findSongs } from "@/app/actions"
import type { SongData, FindSongsSuccessResponse } from "@/app/actions"
import { SongRecommendations } from "@/components/song-recommendations"
import { PersonaModal } from "@/components/persona-modal"
import { MainSidebar, MainSidebarToggle } from "@/components/main-sidebar"
import { BuyMeCoffeeButton } from "@/components/ui/buy-me-coffee"
import { MoodFilters } from "@/components/mood-filters"
import { ActionTiles } from "@/components/action-tiles"

const moodWords = ["happy", "energetic", "chill", "romantic", "melancholic", "upbeat", "sad", "angry", "excited", "relaxed", "stressed", "anxious", "depressed", "lonely", "bored"]

// Helper to get an icon based on persona name
const getPersonaIcon = (personaName: string): JSX.Element => {
  if (personaName.includes("Online")) return <Laptop className="h-4 w-4 text-purple-400" />;
  if (personaName.includes("Country")) return <Truck className="h-4 w-4 text-purple-400" />;
  if (personaName.includes("Rock")) return <Guitar className="h-4 w-4 text-purple-400" />;
  return <Music className="h-4 w-4 text-purple-400" />;
};

export default function Home() {
  // Sidebar state
  const [sidebarOpen, setSidebarOpen] = useState(false)

  // Main page state - complete feature parity
  const [selectedPersonaId, setSelectedPersonaId] = useState<string | null>(null)
  const [selectedPersonaForModal, setSelectedPersonaForModal] = useState<Persona | null>(null)
  const [songs, setSongs] = useState<SongData[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [lastFetchParams, setLastFetchParams] = useState<{ mood?: string, filters: any, personaId?: string | null } | null>(null)
  const [searchPerformed, setSearchPerformed] = useState(false)

  const [mood, setMood] = useState("")
  const [excludeMainstream, setExcludeMainstream] = useState(false)
  const [filters, setFilters] = useState({
    genre: "",
    era: "",
    popularity: "",
    language: "",
  })

  // Main page specific state
  const [currentMoodIndex, setCurrentMoodIndex] = useState(0)
  const [showPersonas, setShowPersonas] = useState(false)

  // Animate mood words
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentMoodIndex((prev: number) => (prev + 1) % moodWords.length)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  // Filter change handler
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
    })
  }

  // Main page functionality - complete feature parity
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
    } catch (err: unknown) {
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

  const handleSendMessage = async (content: string) => {
    if (!content.trim()) return

    setMood(content)
    handleFindSongs()
  }

  const selectPersona = (persona: Persona) => {
    handlePersonaSelect(persona.id)
    setShowPersonas(false)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-blue-900/20 to-black relative overflow-hidden">
      {/* Sidebar */}
      <MainSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <MainSidebarToggle onClick={() => setSidebarOpen(true)} />

      {/* Custom CSS for floating animation */}
      <style dangerouslySetInnerHTML={{
        __html: `
          @keyframes float {
            0% { transform: translateX(0px) translateY(0px); }
            33% { transform: translateX(30px) translateY(-30px); }
            66% { transform: translateX(-20px) translateY(20px); }
            100% { transform: translateX(0px) translateY(0px); }
          }
          .animate-float {
            animation: float linear infinite;
          }
        `
      }} />
      
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-900/20 via-black to-black"></div>
        {/* Floating particles - using useMemo to prevent re-renders */}
        {Array.from({ length: 50 }, (_, i) => {
          // Generate static values that won't change on re-renders
          const randomX = (i * 7.3) % 100; // Deterministic but varied positioning
          const randomY = (i * 11.7) % 100;
          const animationDuration = 8 + (i % 12); // 8-20 seconds, deterministic
          const animationDelay = (i * 2.3) % 10; // 0-10 seconds delay, deterministic
          const opacity = 0.2 + ((i * 3.7) % 60) / 100; // 0.2-0.8 opacity, deterministic
          
          return (
            <div
              key={`star-${i}`}
              className="absolute animate-pulse"
              style={{
                left: `${randomX}%`,
                top: `${randomY}%`,
                animationDelay: `${animationDelay}s`,
                animationDuration: `${1 + (i % 2)}s`, // 1-2 seconds pulse
                willChange: 'transform, opacity',
              }}
            >
              <div
                className="w-1 h-1 rounded-full bg-white animate-float"
                style={{
                  opacity: opacity,
                  animationDuration: `${animationDuration}s`,
                  animationDelay: `${animationDelay}s`,
                  willChange: 'transform',
                }}
              />
            </div>
          );
        })}
      </div>

      {/* Persona Selection Modal */}
      {showPersonas && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setShowPersonas(false)}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-black/80 backdrop-blur-md border border-white/20 rounded-2xl p-8 max-w-6xl w-full max-h-[80vh] overflow-y-auto"
            onClick={(e: React.MouseEvent) => e.stopPropagation()}
          >
            <h2 className="text-3xl font-bold text-white mb-2 text-center">Choose Your AI Music Persona</h2>
            <p className="text-gray-300 text-center mb-8">Each persona has unique music knowledge and personality</p>
            
            {/* Featured Personas */}
            <div className="mb-8">
              <h3 className="text-xl font-bold text-white mb-4">Featured Personas</h3>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
                {featuredPersonas.map((persona) => (
                  <motion.button
                    key={persona.id}
                    onClick={() => selectPersona(persona)}
                    className={`text-left p-6 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl hover:bg-white/20 transition-all group ${selectedPersonaId === persona.id ? 'ring-2 ring-blue-500' : ''}`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="flex items-start gap-4">
                      <Avatar className="h-16 w-16 border-2 border-green-500">
                        <AvatarImage src={persona.imageUrl} alt={`${persona.name} avatar`} />
                        <AvatarFallback className="bg-[#333]">{persona.name.substring(0, 2)}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-white mb-2">{persona.name}</h3>
                        <p className="text-gray-300 mb-3">&quot;{persona.description}&quot;</p>
                        <div className="flex flex-wrap gap-2">
                          {persona.artists.slice(0, 3).map((artist) => (
                            <span key={artist} className="text-xs bg-white/10 text-gray-300 px-2 py-1 rounded-full">
                              {artist}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </motion.button>
                ))}
              </div>
            </div>

            {/* All Other Personas */}
            <div>
              <h3 className="text-xl font-bold text-white mb-4">All Personas</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {otherPersonas.map((persona) => (
                  <motion.button
                    key={persona.id}
                    onClick={() => selectPersona(persona)}
                    className={`text-left p-4 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl hover:bg-white/20 transition-all group ${selectedPersonaId === persona.id ? 'ring-2 ring-blue-500' : ''}`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="flex items-start gap-3">
                      {getPersonaIcon(persona.name)}
                      <div className="flex-1">
                        <h3 className="text-lg font-bold text-white mb-1">{persona.name}</h3>
                        <p className="text-gray-300 text-sm mb-2">&quot;{persona.description}&quot;</p>
                        <div className="flex flex-wrap gap-1 mb-2">
                          {persona.artists.slice(0, 2).map((artist) => (
                            <span key={artist} className="text-xs bg-white/10 text-gray-300 px-2 py-1 rounded-full">
                              {artist}
                            </span>
                          ))}
                        </div>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          onClick={(e) => {
                            e.stopPropagation()
                            handleOpenPersonaModal(persona)
                          }}
                          className="text-xs text-blue-400 hover:text-blue-300 p-0 h-auto"
                        >
                          Learn more →
                        </Button>
                      </div>
                    </div>
                  </motion.button>
                ))}
              </div>
            </div>
            
            <div className="flex justify-center mt-8">
              <button
                onClick={() => setShowPersonas(false)}
                className="px-6 py-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl text-white hover:bg-white/20 transition-all"
              >
                Close
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}

      {/* Main Content */}
      <div className="relative z-10 pt-16 pb-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Hero Section */}
          <div className="relative z-20 text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="mb-8"
            >
              <h1 className="text-6xl md:text-8xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-cyan-500 to-blue-600 mb-6 leading-tight pb-2">
                Mood2Song
              </h1>
              <div className="text-2xl md:text-4xl text-white font-light">
                Discover music when you&apos;re feeling {' '}
                <motion.span
                  key={currentMoodIndex}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="text-blue-400 font-medium"
                >
                  {moodWords[currentMoodIndex]}
                </motion.span>
              </div>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-lg md:text-xl text-gray-300 max-w-4xl mx-auto mb-12"
            >
              AI-powered music discovery to find the perfect playlist for your mood.
            </motion.p>

            {/* Control Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="flex flex-wrap justify-center gap-4 mb-8"
            >
              <button
                onClick={() => setShowPersonas(true)}
                className="flex items-center gap-2 px-6 py-3 rounded-full transition-all bg-white/10 backdrop-blur-md border border-white/20 text-gray-300 hover:bg-white/20"
              >
                <IconUser className="h-5 w-5" />
                Choose AI Persona
                {selectedPersona && <IconSparkles className="h-4 w-4" />}
              </button>
            </motion.div>

            {/* Selected Persona Display */}
            {selectedPersona && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-8"
              >
                <div className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 backdrop-blur-md border border-blue-500/30 rounded-2xl">
                  <Avatar className="h-8 w-8 border-2 border-blue-400">
                    <AvatarImage src={selectedPersona.imageUrl} alt={`${selectedPersona.name} avatar`} />
                    <AvatarFallback className="bg-blue-600 text-white text-sm">{selectedPersona.name.substring(0, 2)}</AvatarFallback>
                  </Avatar>
                  <span className="text-white font-medium">{selectedPersona.name}</span>
                  <IconSparkles className="h-5 w-5" />
                </div>
              </motion.div>
            )}

            {/* Search Input */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="max-w-2xl mx-auto mb-16"
            >
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                <div className="relative flex-grow">
                  <textarea
                    className="w-full px-6 py-4 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg h-24 resize-none"
                    placeholder="Tell me how you&apos;re feeling or what you&apos;re doing..."
                    value={mood}
                    onChange={(e) => setMood(e.target.value)}
                    maxLength={250}
                    disabled={loading}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault()
                        handleSendMessage(mood)
                      }
                    }}
                  />
                </div>
                <div className="flex items-center space-x-2 flex-shrink-0 self-center sm:self-auto">
                  <Switch
                    id="exclude-mainstream-toggle"
                    checked={excludeMainstream}
                    onCheckedChange={setExcludeMainstream}
                    className="data-[state=checked]:bg-blue-500"
                  />
                  <Label htmlFor="exclude-mainstream-toggle" className="text-sm text-white whitespace-nowrap">
                    Avoid Hits
                  </Label>
                </div>
                <Button
                  onClick={() => handleSendMessage(mood)}
                  disabled={loading || (!mood.trim() && !selectedPersonaId)}
                  className="px-6 py-4 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl text-white font-medium hover:from-blue-600 hover:to-cyan-600 transition-all duration-200 flex items-center gap-2 h-12 flex-shrink-0 w-full sm:w-auto"
                >
                  {loading ? (
                    <Loader2 className="h-5 w-5 animate-spin" />
                  ) : (
                    <IconSearch className="h-5 w-5" />
                  )}
                  Discover
                </Button>
              </div>
            </motion.div>
          </div>

          {/* Filter Options */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="max-w-6xl mx-auto mb-16"
          >
            <MoodFilters
              filters={filters}
              onFilterChange={handleFilterChange}
              disabled={loading}
            />
          </motion.div>

          {/* Song Recommendations using the main page component */}
          {searchPerformed && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="max-w-6xl mx-auto mb-16"
            >
              <SongRecommendations
                songs={songs}
                loading={loading}
                error={error}
                onRefresh={handleRefresh}
                mood={mood}
                filters={{...filters, excludeMainstream}}
                selectedPersona={selectedPersona}
                searchPerformed={searchPerformed}
              />
              
              {/* Contextual Buy Me a Coffee Button */}
              {songs.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="mt-12 text-center"
                >
                  <p className="text-gray-400 text-sm mb-4">
                    Enjoying the music discoveries? Support the developer!
                  </p>
                  <BuyMeCoffeeButton 
                    username={process.env.NEXT_PUBLIC_BUYMEACOFFEE_USERNAME || "blvke"} 
                    text="Buy me a coffee ☕"
                    className="mx-auto"
                  />
                </motion.div>
              )}
            </motion.div>
          )}

          {/* Sidebar Link Tiles */}
          <ActionTiles />
        </div>
      </div>

      {/* PersonaModal integration */}
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
