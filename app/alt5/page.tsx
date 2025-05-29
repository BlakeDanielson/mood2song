'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MusicalNavigation } from './components/musical-navigation'
import { VibeMixer } from './components/vibe-mixer'
import { GenreStudio } from './components/genre-studio'
import { PlaylistStage } from './components/playlist-stage'
import { AudioVisualizer } from './components/audio-visualizer'

type Step = 'vibe' | 'genre' | 'playlist'

interface AppState {
  currentStep: Step
  mood: string
  moodIntensity: number
  selectedGenres: string[]
  tempo: number
  energy: number
  isLoading: boolean
  isPlaying: boolean
}

const stepNumbers = {
  vibe: 1,
  genre: 2,
  playlist: 3
}

export default function Alt5Page() {
  const [state, setState] = useState<AppState>({
    currentStep: 'vibe',
    mood: '',
    moodIntensity: 70,
    selectedGenres: [],
    tempo: 120,
    energy: 75,
    isLoading: false,
    isPlaying: false
  })

  const [dimensions, setDimensions] = useState({ width: 1200, height: 800 })

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setDimensions({ width: window.innerWidth, height: window.innerHeight })
      
      const handleResize = () => {
        setDimensions({ width: window.innerWidth, height: window.innerHeight })
      }
      
      window.addEventListener('resize', handleResize)
      return () => window.removeEventListener('resize', handleResize)
    }
  }, [])

  const handleVibeSubmit = (mood: string, intensity: number, tempo: number, energy: number) => {
    setState(prev => ({
      ...prev,
      mood,
      moodIntensity: intensity,
      tempo,
      energy,
      isLoading: true
    }))

    setTimeout(() => {
      setState(prev => ({
        ...prev,
        currentStep: 'genre',
        isLoading: false
      }))
    }, 1500)
  }

  const handleGenreSelect = (genres: string[]) => {
    setState(prev => ({
      ...prev,
      selectedGenres: genres,
      isLoading: true
    }))

    setTimeout(() => {
      setState(prev => ({
        ...prev,
        currentStep: 'playlist',
        isLoading: false
      }))
    }, 2000)
  }

  const handleStepChange = (step: number) => {
    const stepMap: Record<number, Step> = {
      1: 'vibe',
      2: 'genre',
      3: 'playlist'
    }
    
    const newStep = stepMap[step]
    if (newStep) {
      setState(prev => ({ ...prev, currentStep: newStep }))
    }
  }

  const togglePlayback = () => {
    setState(prev => ({ ...prev, isPlaying: !prev.isPlaying }))
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-indigo-900 to-black relative overflow-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(147,51,234,0.1),transparent_50%)]"></div>
        <div className="absolute inset-0 bg-[conic-gradient(from_0deg_at_50%_50%,rgba(236,72,153,0.1),rgba(59,130,246,0.1),rgba(147,51,234,0.1),rgba(236,72,153,0.1))] animate-spin" style={{ animationDuration: '20s' }}></div>
        
        {/* Floating Musical Notes */}
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-white/10 text-2xl"
            initial={{ 
              x: Math.random() * dimensions.width,
              y: dimensions.height + 50,
              rotate: 0
            }}
            animate={{ 
              y: -50,
              rotate: 360,
              x: Math.random() * dimensions.width
            }}
            transition={{
              duration: 15 + Math.random() * 10,
              repeat: Infinity,
              delay: Math.random() * 5
            }}
          >
            {['♪', '♫', '♬', '♩', '♭', '♯'][Math.floor(Math.random() * 6)]}
          </motion.div>
        ))}
      </div>

      <MusicalNavigation
        currentStep={stepNumbers[state.currentStep]}
        totalSteps={3}
        onStepChange={handleStepChange}
        isPlaying={state.isPlaying}
        onTogglePlayback={togglePlayback}
      />

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <AnimatePresence mode="wait">
          {state.currentStep === 'vibe' && (
            <motion.div
              key="vibe"
              initial={{ opacity: 0, scale: 0.9, rotateY: 90 }}
              animate={{ opacity: 1, scale: 1, rotateY: 0 }}
              exit={{ opacity: 0, scale: 0.9, rotateY: -90 }}
              transition={{ duration: 0.6, ease: "easeInOut" }}
            >
              <VibeMixer
                onVibeSubmit={handleVibeSubmit}
                isLoading={state.isLoading}
              />
            </motion.div>
          )}

          {state.currentStep === 'genre' && (
            <motion.div
              key="genre"
              initial={{ opacity: 0, scale: 0.9, rotateY: 90 }}
              animate={{ opacity: 1, scale: 1, rotateY: 0 }}
              exit={{ opacity: 0, scale: 0.9, rotateY: -90 }}
              transition={{ duration: 0.6, ease: "easeInOut" }}
            >
              <GenreStudio
                onGenreSelect={handleGenreSelect}
                selectedGenres={state.selectedGenres}
                isLoading={state.isLoading}
                mood={state.mood}
                tempo={state.tempo}
                energy={state.energy}
              />
            </motion.div>
          )}

          {state.currentStep === 'playlist' && (
            <motion.div
              key="playlist"
              initial={{ opacity: 0, scale: 0.9, rotateY: 90 }}
              animate={{ opacity: 1, scale: 1, rotateY: 0 }}
              exit={{ opacity: 0, scale: 0.9, rotateY: -90 }}
              transition={{ duration: 0.6, ease: "easeInOut" }}
            >
              <PlaylistStage
                songs={[]}
                mood={state.mood}
                genres={state.selectedGenres}
                tempo={state.tempo}
                energy={state.energy}
                isLoading={state.isLoading}
                isPlaying={state.isPlaying}
                onTogglePlayback={togglePlayback}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Audio Visualizer */}
      <AudioVisualizer isPlaying={state.isPlaying} />

      {/* Loading Overlay with Musical Theme */}
      <AnimatePresence>
        {state.isLoading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center"
          >
            <div className="text-center space-y-6">
              {/* Vinyl Record Loading Animation */}
              <div className="relative">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  className="w-24 h-24 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mx-auto relative"
                >
                  <div className="absolute inset-2 bg-black rounded-full"></div>
                  <div className="absolute inset-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"></div>
                  <div className="absolute top-1/2 left-1/2 w-2 h-2 bg-white rounded-full transform -translate-x-1/2 -translate-y-1/2"></div>
                </motion.div>
                <motion.div
                  animate={{ x: [0, 10, 0] }}
                  transition={{ duration: 1, repeat: Infinity }}
                  className="absolute -right-2 top-1/2 w-1 h-8 bg-gradient-to-b from-silver-400 to-silver-600 transform -translate-y-1/2"
                ></motion.div>
              </div>
              
              <div className="space-y-3">
                <motion.h3 
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="text-xl font-bold text-white"
                >
                  {state.currentStep === 'vibe' && '🎵 Mixing your vibe...'}
                  {state.currentStep === 'genre' && '🎸 Crafting your sound...'}
                  {state.currentStep === 'playlist' && '🎤 Dropping the beat...'}
                </motion.h3>
                <p className="text-sm text-purple-200">
                  {state.currentStep === 'vibe' && 'Tuning into your emotional frequency'}
                  {state.currentStep === 'genre' && 'Blending genres to match your style'}
                  {state.currentStep === 'playlist' && 'Curating your perfect soundtrack'}
                </p>
              </div>

              {/* Sound Wave Animation */}
              <div className="flex items-center justify-center space-x-1">
                {[...Array(5)].map((_, i) => (
                  <motion.div
                    key={i}
                    animate={{ 
                      scaleY: [1, 2, 1],
                      backgroundColor: ['#8b5cf6', '#ec4899', '#06b6d4', '#8b5cf6']
                    }}
                    transition={{ 
                      duration: 1,
                      repeat: Infinity,
                      delay: i * 0.1
                    }}
                    className="w-1 h-4 bg-purple-500 rounded-full"
                  ></motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
} 