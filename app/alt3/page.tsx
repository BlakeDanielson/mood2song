"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { MoodInputTerminal } from "./components/mood-input-terminal"
import { PersonaWheel } from "./components/persona-wheel"
import { PlaylistMatrix } from "./components/playlist-matrix"
import { CyberNavigation } from "./components/cyber-navigation"

// Demo song data with cyberpunk theme
const demoSongs = [
  {
    id: '1',
    title: 'Neon Dreams',
    artist: 'Cyber Collective',
    album: 'Digital Dystopia',
    duration: '4:32',
    energy: 0.8,
    mood: 'energetic, futuristic'
  },
  {
    id: '2',
    title: 'Matrix Rain',
    artist: 'Code Runner',
    album: 'System Override',
    duration: '3:45',
    energy: 0.6,
    mood: 'mysterious, digital'
  },
  {
    id: '3',
    title: 'Electric Pulse',
    artist: 'Neural Network',
    album: 'Synthetic Emotions',
    duration: '5:12',
    energy: 0.9,
    mood: 'intense, electronic'
  },
  {
    id: '4',
    title: 'Ghost in the Shell',
    artist: 'Quantum Echo',
    album: 'Virtual Reality',
    duration: '4:18',
    energy: 0.4,
    mood: 'contemplative, ambient'
  },
  {
    id: '5',
    title: 'Data Stream',
    artist: 'Binary Beats',
    album: 'Information Age',
    duration: '3:28',
    energy: 0.7,
    mood: 'flowing, rhythmic'
  },
  {
    id: '6',
    title: 'Cybernetic Love',
    artist: 'Android Hearts',
    album: 'Emotional Algorithms',
    duration: '4:55',
    energy: 0.5,
    mood: 'romantic, synthetic'
  },
  {
    id: '7',
    title: 'Terminal Velocity',
    artist: 'Speed Daemon',
    album: 'High Frequency',
    duration: '3:33',
    energy: 0.95,
    mood: 'fast, aggressive'
  },
  {
    id: '8',
    title: 'Digital Zen',
    artist: 'Meditation.exe',
    album: 'Peaceful Protocols',
    duration: '6:00',
    energy: 0.2,
    mood: 'calm, meditative'
  }
]

export default function Alt3Home() {
  const [currentStep, setCurrentStep] = useState<'input' | 'persona' | 'results'>('input')
  const [mood, setMood] = useState("")
  const [selectedPersona, setSelectedPersona] = useState<string | null>(null)
  const [songs, setSongs] = useState<typeof demoSongs>([])
  const [isLoading, setIsLoading] = useState(false)

  const hasData = mood.length > 0 || selectedPersona !== null

  const handleMoodSubmit = (newMood: string) => {
    setMood(newMood)
    // Auto-advance to persona selection if we have a mood
    if (newMood.length > 5) {
      setTimeout(() => {
        setCurrentStep('persona')
      }, 1500)
    }
  }

  const handlePersonaSelect = (personaId: string) => {
    setSelectedPersona(personaId)
    // Auto-advance to results
    setTimeout(() => {
      generatePlaylist()
    }, 1000)
  }

  const generatePlaylist = () => {
    setCurrentStep('results')
    setIsLoading(true)
    
    // Simulate API call with loading
    setTimeout(() => {
      // Filter songs based on mood and persona
      let filteredSongs = [...demoSongs]
      
      if (mood.toLowerCase().includes('energetic') || mood.toLowerCase().includes('intense')) {
        filteredSongs = filteredSongs.filter(song => song.energy > 0.6)
      } else if (mood.toLowerCase().includes('calm') || mood.toLowerCase().includes('peaceful')) {
        filteredSongs = filteredSongs.filter(song => song.energy < 0.5)
      }
      
      // Shuffle and limit results
      filteredSongs = filteredSongs.sort(() => Math.random() - 0.5).slice(0, 6)
      
      setSongs(filteredSongs)
      setIsLoading(false)
    }, 3000)
  }

  const handleStepChange = (step: 'input' | 'persona' | 'results') => {
    setCurrentStep(step)
  }

  const resetAll = () => {
    setMood("")
    setSelectedPersona(null)
    setSongs([])
    setCurrentStep('input')
    setIsLoading(false)
  }

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Cyberpunk Grid Background */}
      <div className="absolute inset-0 opacity-10">
        <div 
          className="w-full h-full"
          style={{
            backgroundImage: `
              linear-gradient(rgba(0, 255, 65, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0, 255, 65, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px'
          }}
        />
      </div>

      {/* Navigation */}
      <CyberNavigation 
        currentStep={currentStep}
        onStepChange={handleStepChange}
        hasData={hasData}
        selectedPersona={selectedPersona}
        songs={songs}
      />

      {/* Main Content */}
      <main className="pt-24 pb-8">
        <AnimatePresence mode="wait">
          {currentStep === 'input' && (
            <motion.div
              key="input"
              className="container mx-auto px-6"
              initial={{ opacity: 0, x: -100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 100 }}
              transition={{ duration: 0.6, ease: "easeInOut" }}
            >
              <div className="max-w-4xl mx-auto">
                {/* Header */}
                <motion.div
                  className="text-center mb-12"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.6 }}
                >
                  <h1 className="text-6xl font-bold font-mono mb-4">
                    <span className="text-green-400">[</span>
                    <span className="text-white">MOOD</span>
                    <span className="text-cyan-400">2</span>
                    <span className="text-white">SONG</span>
                    <span className="text-green-400">]</span>
                  </h1>
                  <p className="text-slate-400 font-mono text-lg">
                    Initialize emotional parameters for musical matrix generation
                  </p>
                </motion.div>

                {/* Terminal Input */}
                <MoodInputTerminal 
                  onMoodSubmit={handleMoodSubmit}
                  currentMood={mood}
                />

                {/* System Info */}
                <motion.div
                  className="mt-12 text-center font-mono text-sm text-slate-500"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1, duration: 0.6 }}
                >
                  <div className="border border-slate-800 rounded-lg p-4 bg-black/40">
                    <div className="grid grid-cols-3 gap-4">
                      <div>
                        <div className="text-green-400">SYSTEM_STATUS</div>
                        <div className="text-white">ONLINE</div>
                      </div>
                      <div>
                        <div className="text-cyan-400">NEURAL_NETWORK</div>
                        <div className="text-white">ACTIVE</div>
                      </div>
                      <div>
                        <div className="text-purple-400">MUSIC_DATABASE</div>
                        <div className="text-white">CONNECTED</div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          )}

          {currentStep === 'persona' && (
            <motion.div
              key="persona"
              className="container mx-auto px-6"
              initial={{ opacity: 0, x: -100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 100 }}
              transition={{ duration: 0.6, ease: "easeInOut" }}
            >
              <div className="max-w-6xl mx-auto">
                {/* Header */}
                <motion.div
                  className="text-center mb-12"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.6 }}
                >
                  <h2 className="text-4xl font-bold font-mono mb-4">
                    <span className="text-green-400">&gt;</span>
                    <span className="text-white"> PERSONA_SELECTION_PROTOCOL</span>
                  </h2>
                  <p className="text-slate-400 font-mono">
                    Select your musical personality matrix for optimal song matching
                  </p>
                  {mood && (
                    <div className="mt-4 inline-block bg-green-400/20 border border-green-400/30 rounded px-4 py-2 font-mono text-sm">
                      <span className="text-green-400">MOOD_DETECTED:</span>
                      <span className="text-white ml-2">"{mood}"</span>
                    </div>
                  )}
                </motion.div>

                {/* Persona Wheel */}
                <PersonaWheel 
                  onPersonaSelect={handlePersonaSelect}
                  selectedPersona={selectedPersona}
                />
              </div>
            </motion.div>
          )}

          {currentStep === 'results' && (
            <motion.div
              key="results"
              initial={{ opacity: 0, x: -100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 100 }}
              transition={{ duration: 0.6, ease: "easeInOut" }}
            >
              <PlaylistMatrix 
                songs={songs}
                mood={mood}
                persona={selectedPersona}
                isLoading={isLoading}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Reset Button */}
      {hasData && (
        <motion.button
          onClick={resetAll}
          className="fixed bottom-8 right-8 bg-red-500/20 hover:bg-red-500/30 border border-red-500/50 text-red-400 px-4 py-2 rounded font-mono text-sm transition-all duration-300"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          RESET_SYSTEM
        </motion.button>
      )}

      {/* Ambient Scan Lines */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <motion.div
          className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-green-400/50 to-transparent"
          animate={{ y: ['0vh', '100vh'] }}
          transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
        />
        <motion.div
          className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-400/30 to-transparent"
          animate={{ y: ['0vh', '100vh'] }}
          transition={{ duration: 12, repeat: Infinity, ease: "linear", delay: 2 }}
        />
      </div>
    </div>
  )
} 