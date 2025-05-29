'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { PremiumNavigation } from './components/premium-navigation'
import { PremiumMoodInput } from './components/premium-mood-input'
import { PersonaSelector } from './components/persona-selector'
import { PlaylistResults } from './components/playlist-results'
import { toast, Toaster } from 'sonner'

type Step = 'mood' | 'persona' | 'results'

interface ApiSong {
  id: string
  title: string
  artist: string
  album: string
  duration: string
  genre: string
  mood: string
  image: string
  energy: number
  danceability: number
  valence: number
  spotifyUrl?: string
}

interface Song {
  id: string
  title: string
  artist: string
  album: string
  duration: string
  genre: string
  mood: string
  energy: number
  popularity: number
  albumArt: string
  previewUrl?: string
}

interface AppState {
  currentStep: Step
  mood: string
  moodIntensity: number
  selectedPersona: string
  isLoading: boolean
  songs: Song[]
  error: string | null
  apiResponse: string
}

const stepNumbers = {
  mood: 1,
  persona: 2,
  results: 3
}

// Transform API song data to component format
const transformApiSong = (apiSong: ApiSong): Song => ({
  id: apiSong.id,
  title: apiSong.title,
  artist: apiSong.artist,
  album: apiSong.album,
  duration: apiSong.duration,
  genre: apiSong.genre,
  mood: apiSong.mood,
  energy: Math.round(apiSong.energy * 100),
  popularity: Math.round((apiSong.energy + apiSong.danceability + apiSong.valence) / 3 * 100),
  albumArt: apiSong.image,
  previewUrl: apiSong.spotifyUrl
})

export default function Alt4Page() {
  const [state, setState] = useState<AppState>({
    currentStep: 'mood',
    mood: '',
    moodIntensity: 70,
    selectedPersona: '',
    isLoading: false,
    songs: [],
    error: null,
    apiResponse: ''
  })

  const handleMoodSubmit = async (mood: string, intensity: number) => {
    setState(prev => ({
      ...prev,
      mood,
      moodIntensity: intensity,
      isLoading: true,
      error: null
    }))

    try {
      // Simulate mood analysis
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      setState(prev => ({
        ...prev,
        currentStep: 'persona',
        isLoading: false
      }))
      
      toast.success('Mood analyzed successfully! Choose your persona.')
    } catch (error) {
      setState(prev => ({
        ...prev,
        isLoading: false,
        error: 'Failed to analyze mood. Please try again.'
      }))
      toast.error('Failed to analyze mood')
    }
  }

  const handlePersonaSelect = async (persona: string) => {
    setState(prev => ({
      ...prev,
      selectedPersona: persona,
      isLoading: true,
      error: null
    }))

    try {
      // Call the music API
      const response = await fetch('/api/music', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          mood: state.mood,
          persona: persona,
          preferences: []
        }),
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data = await response.json()

      if (data.success) {
        // Transform API songs to component format
        const transformedSongs = (data.songs || []).map(transformApiSong)
        
        setState(prev => ({
          ...prev,
          currentStep: 'results',
          isLoading: false,
          songs: transformedSongs,
          apiResponse: data.message || ''
        }))
        toast.success('Playlist generated successfully!')
      } else {
        throw new Error(data.error || 'Failed to generate playlist')
      }
    } catch (error) {
      console.error('API Error:', error)
      setState(prev => ({
        ...prev,
        isLoading: false,
        error: error instanceof Error ? error.message : 'Failed to generate playlist. Please try again.'
      }))
      toast.error('Failed to generate playlist')
    }
  }

  const handleStepChange = (step: number) => {
    const stepMap: Record<number, Step> = {
      1: 'mood',
      2: 'persona',
      3: 'results'
    }
    
    const newStep = stepMap[step]
    if (newStep && !state.isLoading) {
      // Only allow going back to previous steps or current step
      if (stepNumbers[newStep] <= stepNumbers[state.currentStep]) {
        setState(prev => ({ 
          ...prev, 
          currentStep: newStep,
          error: null 
        }))
      }
    }
  }

  const handleRetry = () => {
    if (state.currentStep === 'persona' && state.selectedPersona) {
      handlePersonaSelect(state.selectedPersona)
    } else if (state.currentStep === 'mood' && state.mood) {
      handleMoodSubmit(state.mood, state.moodIntensity)
    }
  }

  const canGoBack = stepNumbers[state.currentStep] > 1 && !state.isLoading
  const canGoForward = stepNumbers[state.currentStep] < 3 && 
    Boolean(state.currentStep === 'mood' ? state.mood : state.selectedPersona) && 
    !state.isLoading

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-pink-500/30 to-violet-500/30 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-r from-emerald-500/15 to-teal-500/15 rounded-full blur-3xl animate-pulse delay-2000"></div>
      </div>

      {/* Subtle Grid Pattern */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.15) 1px, transparent 0)`,
          backgroundSize: '20px 20px'
        }}></div>
      </div>

      <PremiumNavigation
        currentStep={stepNumbers[state.currentStep]}
        totalSteps={3}
        onStepChange={handleStepChange}
        canGoBack={canGoBack}
        canGoForward={canGoForward}
      />

      <main className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Error Display */}
          {state.error && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6 p-4 bg-red-500/20 border border-red-500/30 rounded-2xl backdrop-blur-sm"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-red-400 rounded-full"></div>
                  <p className="text-red-100 text-sm">{state.error}</p>
                </div>
                <button
                  onClick={handleRetry}
                  className="text-red-200 hover:text-white text-sm underline"
                >
                  Retry
                </button>
              </div>
            </motion.div>
          )}

          <AnimatePresence mode="wait">
            {state.currentStep === 'mood' && (
              <motion.div
                key="mood"
                initial={{ opacity: 0, y: 50, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -50, scale: 0.95 }}
                transition={{ duration: 0.6, ease: "easeInOut" }}
                className="backdrop-blur-sm bg-white/10 rounded-3xl border border-white/20 shadow-2xl p-8 md:p-12"
              >
                <PremiumMoodInput
                  onMoodSubmit={handleMoodSubmit}
                  isLoading={state.isLoading}
                />
              </motion.div>
            )}

            {state.currentStep === 'persona' && (
              <motion.div
                key="persona"
                initial={{ opacity: 0, y: 50, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -50, scale: 0.95 }}
                transition={{ duration: 0.6, ease: "easeInOut" }}
                className="backdrop-blur-sm bg-white/10 rounded-3xl border border-white/20 shadow-2xl p-8 md:p-12"
              >
                <PersonaSelector
                  onPersonaSelect={handlePersonaSelect}
                  selectedPersona={state.selectedPersona}
                  isLoading={state.isLoading}
                />
              </motion.div>
            )}

            {state.currentStep === 'results' && (
              <motion.div
                key="results"
                initial={{ opacity: 0, y: 50, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -50, scale: 0.95 }}
                transition={{ duration: 0.6, ease: "easeInOut" }}
                className="backdrop-blur-sm bg-white/10 rounded-3xl border border-white/20 shadow-2xl p-8 md:p-12"
              >
                {state.apiResponse && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-6 p-4 bg-green-500/20 border border-green-500/30 rounded-2xl backdrop-blur-sm"
                  >
                    <p className="text-green-100 text-sm">{state.apiResponse}</p>
                  </motion.div>
                )}
                <PlaylistResults
                  songs={state.songs}
                  mood={state.mood}
                  persona={state.selectedPersona}
                  isLoading={state.isLoading}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>

      {/* Loading Overlay */}
      <AnimatePresence>
        {state.isLoading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-md z-50 flex items-center justify-center"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="bg-white/20 backdrop-blur-lg rounded-2xl border border-white/30 p-8 text-center space-y-6 max-w-md mx-4"
            >
              <div className="relative">
                <div className="w-16 h-16 border-4 border-white/30 border-t-white rounded-full animate-spin mx-auto"></div>
                <div 
                  className="absolute inset-0 w-16 h-16 border-4 border-transparent border-r-purple-400 rounded-full animate-spin mx-auto" 
                  style={{ 
                    animationDirection: 'reverse' as const, 
                    animationDuration: '1.5s' 
                  }}
                ></div>
              </div>
              <div className="space-y-3">
                <h3 className="text-xl font-bold text-white">
                  {state.currentStep === 'mood' && 'Analyzing your mood...'}
                  {state.currentStep === 'persona' && 'Creating your playlist...'}
                  {state.currentStep === 'results' && 'Finalizing recommendations...'}
                </h3>
                <p className="text-white/80 text-sm leading-relaxed">
                  {state.currentStep === 'mood' && 'Understanding your emotional state and musical preferences'}
                  {state.currentStep === 'persona' && 'Matching songs to your selected persona and vibe'}
                  {state.currentStep === 'results' && 'Preparing your personalized music experience'}
                </p>
              </div>
              <div className="flex justify-center space-x-1">
                <div className="w-2 h-2 bg-white/60 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-white/60 rounded-full animate-bounce delay-100"></div>
                <div className="w-2 h-2 bg-white/60 rounded-full animate-bounce delay-200"></div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toast Notifications */}
      <Toaster 
        position="top-right"
        toastOptions={{
          style: {
            background: 'rgba(255, 255, 255, 0.1)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            color: 'white',
          },
        }}
      />
    </div>
  )
} 