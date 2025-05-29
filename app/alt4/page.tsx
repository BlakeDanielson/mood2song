'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { PremiumNavigation } from './components/premium-navigation'
import { PremiumMoodInput } from './components/premium-mood-input'
import { PersonaSelector } from './components/persona-selector'
import { PlaylistResults } from './components/playlist-results'

type Step = 'mood' | 'persona' | 'results'

interface AppState {
  currentStep: Step
  mood: string
  moodIntensity: number
  selectedPersona: string
  isLoading: boolean
}

const stepNumbers = {
  mood: 1,
  persona: 2,
  results: 3
}

export default function Alt4Page() {
  const [state, setState] = useState<AppState>({
    currentStep: 'mood',
    mood: '',
    moodIntensity: 70,
    selectedPersona: '',
    isLoading: false
  })

  const handleMoodSubmit = (mood: string, intensity: number) => {
    setState(prev => ({
      ...prev,
      mood,
      moodIntensity: intensity,
      isLoading: true
    }))

    setTimeout(() => {
      setState(prev => ({
        ...prev,
        currentStep: 'persona',
        isLoading: false
      }))
    }, 1500)
  }

  const handlePersonaSelect = (persona: string) => {
    setState(prev => ({
      ...prev,
      selectedPersona: persona,
      isLoading: true
    }))

    setTimeout(() => {
      setState(prev => ({
        ...prev,
        currentStep: 'results',
        isLoading: false
      }))
    }, 2000)
  }

  const handleStepChange = (step: number) => {
    const stepMap: Record<number, Step> = {
      1: 'mood',
      2: 'persona',
      3: 'results'
    }
    
    const newStep = stepMap[step]
    if (newStep) {
      setState(prev => ({ ...prev, currentStep: newStep }))
    }
  }

  const canGoBack = stepNumbers[state.currentStep] > 1
  const canGoForward = stepNumbers[state.currentStep] < 3 && 
    Boolean(state.currentStep === 'mood' ? state.mood : state.selectedPersona)

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
                <PlaylistResults
                  songs={[]}
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
    </div>
  )
} 