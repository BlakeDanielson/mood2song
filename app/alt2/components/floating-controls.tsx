"use client"

import { motion, AnimatePresence } from "framer-motion"
import { Home, Palette, Sparkles, Music, RotateCcw, Settings } from "lucide-react"

interface FloatingControlsProps {
  currentView: 'discover' | 'personas' | 'results'
  onViewChange: (view: 'discover' | 'personas' | 'results') => void
  selectedMood: string
  selectedPersona: string | null
  onClear: () => void
}

export function FloatingControls({ 
  currentView, 
  onViewChange, 
  selectedMood, 
  selectedPersona, 
  onClear 
}: FloatingControlsProps) {
  const hasSelections = selectedMood || selectedPersona

  return (
    <motion.div
      className="fixed bottom-8 right-8 z-50"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 1, duration: 0.5 }}
    >
      {/* Main Controls */}
      <div className="flex flex-col items-end space-y-4">
        {/* Clear Button */}
        <AnimatePresence>
          {hasSelections && (
            <motion.button
              onClick={onClear}
              className="w-14 h-14 bg-red-500/20 hover:bg-red-500/30 border border-red-500/30 rounded-full flex items-center justify-center text-red-400 hover:text-red-300 transition-all duration-300 backdrop-blur-sm"
              initial={{ opacity: 0, scale: 0, x: 20 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              exit={{ opacity: 0, scale: 0, x: 20 }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              title="Clear selections"
            >
              <RotateCcw className="w-6 h-6" />
            </motion.button>
          )}
        </AnimatePresence>

        {/* Navigation Pills */}
        <motion.div
          className="flex flex-col space-y-2 bg-black/30 backdrop-blur-xl rounded-2xl p-2 border border-white/10"
          whileHover={{ scale: 1.02 }}
        >
          {[
            { id: 'discover', icon: Palette, label: 'Discover' },
            { id: 'personas', icon: Sparkles, label: 'Personas' },
            { id: 'results', icon: Music, label: 'Results' },
          ].map((item) => {
            const Icon = item.icon
            const isActive = currentView === item.id
            
            return (
              <motion.button
                key={item.id}
                onClick={() => onViewChange(item.id as any)}
                className={`relative w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 ${
                  isActive 
                    ? 'bg-gradient-to-r from-purple-500/30 to-cyan-500/30 border border-purple-500/50 text-white' 
                    : 'text-slate-400 hover:text-white hover:bg-white/10'
                }`}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                title={item.label}
              >
                {isActive && (
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-cyan-500/20 rounded-xl"
                    layoutId="activeControl"
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  />
                )}
                <Icon className="w-5 h-5 relative z-10" />
              </motion.button>
            )
          })}
        </motion.div>

        {/* Settings Button */}
        <motion.button
          className="w-14 h-14 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full flex items-center justify-center text-slate-400 hover:text-white transition-all duration-300 backdrop-blur-sm"
          whileHover={{ scale: 1.1, rotate: 90 }}
          whileTap={{ scale: 0.9 }}
          title="Settings"
        >
          <Settings className="w-6 h-6" />
        </motion.button>
      </div>

      {/* Status Indicator */}
      <AnimatePresence>
        {hasSelections && (
          <motion.div
            className="absolute -left-48 top-1/2 transform -translate-y-1/2"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ delay: 0.2 }}
          >
            <div className="bg-black/50 backdrop-blur-sm rounded-lg px-4 py-2 border border-white/10">
              <div className="text-xs text-slate-300 space-y-1">
                {selectedMood && (
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-purple-400 rounded-full" />
                    <span>Mood set</span>
                  </div>
                )}
                {selectedPersona && (
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-cyan-400 rounded-full" />
                    <span>Persona selected</span>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
} 