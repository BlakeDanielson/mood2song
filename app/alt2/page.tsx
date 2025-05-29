"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { MoodCanvas } from "./components/mood-canvas"
import { PersonaGallery } from "./components/persona-gallery"
import { SongVisualization } from "./components/song-visualization"
import { FloatingControls } from "./components/floating-controls"
import { ImmersiveHeader } from "./components/immersive-header"
import { MoodWaveform } from "./components/mood-waveform"
import { AmbientBackground } from "./components/ambient-background"

// Demo song data
const demoSongs = [
  {
    id: '1',
    title: 'Midnight Reverie',
    artist: 'Luna Echo',
    album: 'Dreamscapes',
    genre: 'Ambient',
    year: 2023,
    duration: '4:32',
    energy: 0.3,
    mood: 'dreamy, contemplative'
  },
  {
    id: '2',
    title: 'Electric Pulse',
    artist: 'Neon Riders',
    album: 'Cybernetic',
    genre: 'Electronic',
    year: 2024,
    duration: '3:45',
    energy: 0.9,
    mood: 'energetic, futuristic'
  },
  {
    id: '3',
    title: 'Sunset Boulevard',
    artist: 'Golden Hour',
    album: 'City Lights',
    genre: 'Indie Pop',
    year: 2023,
    duration: '3:28',
    energy: 0.6,
    mood: 'nostalgic, warm'
  },
  {
    id: '4',
    title: 'Ocean Waves',
    artist: 'Coastal Drift',
    album: 'Tidal',
    genre: 'Chillwave',
    year: 2024,
    duration: '5:12',
    energy: 0.4,
    mood: 'peaceful, flowing'
  },
  {
    id: '5',
    title: 'Neon Dreams',
    artist: 'Synthwave Collective',
    album: 'Retro Future',
    genre: 'Synthwave',
    year: 2023,
    duration: '4:18',
    energy: 0.8,
    mood: 'nostalgic, energetic'
  },
  {
    id: '6',
    title: 'Forest Whispers',
    artist: 'Nature\'s Symphony',
    album: 'Organic',
    genre: 'Ambient Folk',
    year: 2024,
    duration: '6:05',
    energy: 0.2,
    mood: 'serene, natural'
  }
]

export default function Alt2Home() {
  const [currentView, setCurrentView] = useState<'discover' | 'personas' | 'results'>('discover')
  const [selectedMood, setSelectedMood] = useState("")
  const [selectedPersona, setSelectedPersona] = useState<string | null>(null)
  const [songs, setSongs] = useState<typeof demoSongs>([])
  const [isLoading, setIsLoading] = useState(false)
  const [audioContext, setAudioContext] = useState<'ambient' | 'energetic' | 'calm'>('ambient')

  const handleMoodChange = (mood: string) => {
    setSelectedMood(mood)
    // Auto-transition to results view when mood is selected
    if (mood.length > 10) {
      simulateSearch()
    }
  }

  const handlePersonaSelect = (personaId: string) => {
    setSelectedPersona(personaId)
    simulateSearch()
  }

  const simulateSearch = () => {
    setCurrentView('results')
    setIsLoading(true)
    
    // Simulate API call
    setTimeout(() => {
      setSongs(demoSongs)
      setIsLoading(false)
    }, 2000)
  }

  const handleViewChange = (view: 'discover' | 'personas' | 'results') => {
    setCurrentView(view)
  }

  // Update audio context based on mood
  useEffect(() => {
    if (selectedMood.toLowerCase().includes('energetic') || selectedMood.toLowerCase().includes('intense')) {
      setAudioContext('energetic')
    } else if (selectedMood.toLowerCase().includes('calm') || selectedMood.toLowerCase().includes('peaceful')) {
      setAudioContext('calm')
    } else {
      setAudioContext('ambient')
    }
  }, [selectedMood])

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Ambient Background Effects */}
      <AmbientBackground audioContext={audioContext} />
      
      {/* Immersive Header */}
      <ImmersiveHeader 
        currentView={currentView}
        onViewChange={handleViewChange}
      />

      {/* Main Content Area */}
      <main className="relative z-10 pt-20">
        <AnimatePresence mode="wait">
          {currentView === 'discover' && (
            <motion.div
              key="discover"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              transition={{ duration: 0.6, ease: "easeInOut" }}
              className="container mx-auto px-4"
            >
              <div className="grid lg:grid-cols-2 gap-8 items-center min-h-[80vh]">
                {/* Left Side - Mood Canvas */}
                <div className="space-y-6">
                  <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2, duration: 0.6 }}
                  >
                    <h1 className="text-5xl lg:text-7xl font-bold bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent leading-tight">
                      Feel the
                      <br />
                      <span className="text-white">Music</span>
                    </h1>
                    <p className="text-xl text-slate-300 mt-4 max-w-lg">
                      Express your emotions through an interactive canvas and discover music that resonates with your soul.
                    </p>
                  </motion.div>
                  
                  <MoodCanvas 
                    onMoodChange={handleMoodChange}
                    selectedMood={selectedMood}
                  />
                </div>

                {/* Right Side - Mood Waveform */}
                <div className="flex items-center justify-center">
                  <MoodWaveform 
                    mood={selectedMood}
                    isActive={selectedMood.length > 0}
                  />
                </div>
              </div>
            </motion.div>
          )}

          {currentView === 'personas' && (
            <motion.div
              key="personas"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.6, ease: "easeInOut" }}
              className="container mx-auto px-4"
            >
              <PersonaGallery 
                onPersonaSelect={handlePersonaSelect}
                selectedPersona={selectedPersona}
              />
            </motion.div>
          )}

          {currentView === 'results' && (
            <motion.div
              key="results"
              initial={{ opacity: 0, rotateX: 90 }}
              animate={{ opacity: 1, rotateX: 0 }}
              exit={{ opacity: 0, rotateX: -90 }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
              className="container mx-auto px-4"
            >
              <SongVisualization 
                songs={songs}
                mood={selectedMood}
                persona={selectedPersona}
                isLoading={isLoading}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Floating Controls */}
      <FloatingControls 
        currentView={currentView}
        onViewChange={handleViewChange}
        selectedMood={selectedMood}
        selectedPersona={selectedPersona}
        onClear={() => {
          setSelectedMood("")
          setSelectedPersona(null)
          setSongs([])
          setCurrentView('discover')
        }}
      />
    </div>
  )
} 