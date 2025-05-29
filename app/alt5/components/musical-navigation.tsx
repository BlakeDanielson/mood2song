'use client'

import { motion } from 'framer-motion'
import { Play, Pause, SkipBack, SkipForward, Volume2 } from 'lucide-react'

interface MusicalNavigationProps {
  currentStep: number
  totalSteps: number
  onStepChange: (step: number) => void
  isPlaying: boolean
  onTogglePlayback: () => void
}

export function MusicalNavigation({
  currentStep,
  totalSteps,
  onStepChange,
  isPlaying,
  onTogglePlayback
}: MusicalNavigationProps) {
  const steps = [
    { number: 1, name: 'Vibe Mixer', icon: '🎛️' },
    { number: 2, name: 'Genre Studio', icon: '🎸' },
    { number: 3, name: 'Playlist Stage', icon: '🎤' }
  ]

  return (
    <nav className="sticky top-0 z-40 bg-black/20 backdrop-blur-xl border-b border-purple-500/20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <motion.div 
            className="flex items-center space-x-3"
            whileHover={{ scale: 1.05 }}
          >
            <motion.div
              animate={{ rotate: isPlaying ? 360 : 0 }}
              transition={{ duration: 3, repeat: isPlaying ? Infinity : 0, ease: "linear" }}
              className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full relative flex items-center justify-center"
            >
              <div className="w-8 h-8 bg-black rounded-full flex items-center justify-center">
                <div className="w-2 h-2 bg-white rounded-full"></div>
              </div>
            </motion.div>
            <div>
              <h1 className="text-xl font-bold text-white">Mood2Song</h1>
              <p className="text-xs text-purple-300">Studio Edition</p>
            </div>
          </motion.div>

          {/* Step Progress */}
          <div className="hidden md:flex items-center space-x-8">
            {steps.map((step, index) => (
              <motion.button
                key={step.number}
                onClick={() => onStepChange(step.number)}
                className={`flex items-center space-x-3 px-4 py-2 rounded-full transition-all ${
                  currentStep === step.number
                    ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg shadow-purple-500/25'
                    : currentStep > step.number
                    ? 'bg-green-500/20 text-green-300 hover:bg-green-500/30'
                    : 'bg-white/10 text-white/60 hover:bg-white/20'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="text-lg">{step.icon}</span>
                <div className="text-left">
                  <div className="text-sm font-medium">{step.name}</div>
                  <div className="text-xs opacity-75">Step {step.number}</div>
                </div>
                {currentStep > step.number && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="w-5 h-5 bg-green-400 rounded-full flex items-center justify-center"
                  >
                    <span className="text-xs">✓</span>
                  </motion.div>
                )}
              </motion.button>
            ))}
          </div>

          {/* Music Controls */}
          <div className="flex items-center space-x-4">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="p-2 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
            >
              <SkipBack size={20} />
            </motion.button>
            
            <motion.button
              onClick={onTogglePlayback}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="p-3 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg shadow-purple-500/25"
            >
              {isPlaying ? <Pause size={24} /> : <Play size={24} />}
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="p-2 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
            >
              <SkipForward size={20} />
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="p-2 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
            >
              <Volume2 size={20} />
            </motion.button>
          </div>
        </div>

        {/* Mobile Step Indicator */}
        <div className="md:hidden pb-4">
          <div className="flex items-center justify-center space-x-2">
            {steps.map((step) => (
              <motion.button
                key={step.number}
                onClick={() => onStepChange(step.number)}
                className={`w-3 h-3 rounded-full transition-all ${
                  currentStep === step.number
                    ? 'bg-gradient-to-r from-purple-500 to-pink-500 scale-125'
                    : currentStep > step.number
                    ? 'bg-green-400'
                    : 'bg-white/20'
                }`}
                whileTap={{ scale: 0.8 }}
              />
            ))}
          </div>
          <div className="text-center mt-2">
            <span className="text-sm text-white font-medium">
              {steps[currentStep - 1]?.icon} {steps[currentStep - 1]?.name}
            </span>
          </div>
        </div>
      </div>
    </nav>
  )
} 