'use client'

import { useState, useEffect } from 'react'
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

    // Simulate processing time
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

    // Simulate playlist generation
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
    (state.currentStep === 'mood' ? state.mood : state.selectedPersona)

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
      <PremiumNavigation
        currentStep={stepNumbers[state.currentStep]}
        totalSteps={3}
        onStepChange={handleStepChange}
        canGoBack={canGoBack}
        canGoForward={canGoForward}
      />

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <AnimatePresence mode="wait">
          {state.currentStep === 'mood' && (
            <motion.div
              key="mood"
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
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
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
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
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
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
      </main>

      {/* Background Elements */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-indigo-400/20 to-violet-400/20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-emerald-400/20 to-teal-400/20 rounded-full blur-3xl"></div>
      </div>

      {/* Loading Overlay */}
      <AnimatePresence>
        {state.isLoading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-white/80 backdrop-blur-sm z-50 flex items-center justify-center"
          >
            <div className="text-center space-y-4">
              <div className="w-12 h-12 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
              <div className="space-y-2">
                <h3 className="text-lg font-semibold text-slate-800">
                  {state.currentStep === 'mood' && 'Analyzing your mood...'}
                  {state.currentStep === 'persona' && 'Creating your playlist...'}
                  {state.currentStep === 'results' && 'Finalizing recommendations...'}
                </h3>
                <p className="text-sm text-slate-600">
                  {state.currentStep === 'mood' && 'Understanding your emotional state and preferences'}
                  {state.currentStep === 'persona' && 'Matching songs to your selected persona'}
                  {state.currentStep === 'results' && 'Preparing your personalized music experience'}
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
} 