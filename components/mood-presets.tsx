"use client"

import { Button } from "@/components/ui/button"
import { motion } from "motion/react"

interface MoodPresetsProps {
  onSelectMood: (mood: string) => void
  currentMood: string
  disabled?: boolean
}

export function MoodPresets({ onSelectMood, currentMood, disabled }: MoodPresetsProps) {
  const moodPresets = [
    { name: "Melancholic", gradient: "from-blue-500 to-indigo-600" },
    { name: "Energetic", gradient: "from-orange-500 to-red-600" },
    { name: "Relaxed", gradient: "from-teal-500 to-cyan-600" },
    { name: "Nostalgic", gradient: "from-amber-500 to-orange-600" },
    { name: "Focused", gradient: "from-indigo-500 to-purple-600" },
    { name: "Romantic", gradient: "from-pink-500 to-rose-600" },
    { name: "Introspective", gradient: "from-purple-500 to-violet-600" },
    { name: "Euphoric", gradient: "from-red-500 to-pink-600" },
    { name: "Anxious", gradient: "from-gray-500 to-slate-600" },
    { name: "Frustrated", gradient: "from-red-600 to-red-800" },
    { name: "Gloomy", gradient: "from-slate-600 to-gray-700" },
    { name: "Lonely", gradient: "from-stone-500 to-neutral-600" },
    { name: "Depressed", gradient: "from-zinc-600 to-gray-800" },
    { name: "Angry", gradient: "from-rose-600 to-red-800" },
  ]

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
      className="mb-8"
    >
      <h3 className="text-xl font-bold text-white mb-6 text-center">Quick Mood Selection</h3>
      <div className="flex flex-wrap gap-3 justify-center">
        {moodPresets.map((preset, index) => (
          <motion.div
            key={preset.name}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button
              size="sm"
              onClick={() => onSelectMood(preset.name)}
              className={`
                bg-gradient-to-r ${preset.gradient} 
                hover:shadow-lg hover:shadow-purple-500/25 
                text-white rounded-full px-6 py-2 h-10
                transition-all duration-200 
                border border-white/20 backdrop-blur-sm
                ${currentMood === preset.name 
                  ? 'ring-2 ring-white ring-offset-2 ring-offset-transparent shadow-lg shadow-purple-500/50' 
                  : 'hover:ring-1 hover:ring-white/50'
                }
              `}
              variant="ghost"
              disabled={disabled}
            >
              {preset.name}
            </Button>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}
