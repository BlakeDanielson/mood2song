'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, Mic, Sparkles, TrendingUp, Clock, Heart, Zap, Coffee, Sun, Moon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Slider } from '@/components/ui/slider'
import { Card, CardContent } from '@/components/ui/card'

interface PremiumMoodInputProps {
  onMoodSubmit: (mood: string, intensity: number) => void
  isLoading?: boolean
}

const moodSuggestions = [
  { icon: Heart, label: 'Happy', color: 'from-pink-500 to-rose-500' },
  { icon: Zap, label: 'Energetic', color: 'from-yellow-500 to-orange-500' },
  { icon: Coffee, label: 'Focused', color: 'from-blue-500 to-indigo-500' },
  { icon: Sun, label: 'Optimistic', color: 'from-amber-500 to-yellow-500' },
  { icon: Moon, label: 'Calm', color: 'from-indigo-500 to-purple-500' },
  { icon: TrendingUp, label: 'Motivated', color: 'from-green-500 to-emerald-500' }
]

const recentMoods = ['Nostalgic', 'Adventurous', 'Contemplative', 'Uplifting']

export function PremiumMoodInput({ onMoodSubmit, isLoading = false }: PremiumMoodInputProps) {
  const [mood, setMood] = useState('')
  const [intensity, setIntensity] = useState([70])
  const [isListening, setIsListening] = useState(false)
  const [suggestions, setSuggestions] = useState<string[]>([])

  useEffect(() => {
    if (mood.length > 2) {
      const filtered = moodSuggestions
        .filter(suggestion => 
          suggestion.label.toLowerCase().includes(mood.toLowerCase())
        )
        .map(s => s.label)
      setSuggestions(filtered.slice(0, 3))
    } else {
      setSuggestions([])
    }
  }, [mood])

  const handleSubmit = (selectedMood?: string) => {
    const finalMood = selectedMood || mood
    if (finalMood.trim()) {
      onMoodSubmit(finalMood, intensity[0])
    }
  }

  const handleVoiceInput = () => {
    setIsListening(true)
    // Simulate voice input
    setTimeout(() => {
      setIsListening(false)
      setMood('Feeling creative and inspired')
    }, 2000)
  }

  return (
    <div className="w-full max-w-2xl mx-auto space-y-8">
      {/* Header */}
      <motion.div 
        className="text-center space-y-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="relative inline-block">
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-violet-500 rounded-full blur-lg opacity-20"></div>
          <h2 className="relative text-4xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
            How are you feeling?
          </h2>
        </div>
        <p className="text-lg text-slate-600 max-w-md mx-auto">
          Tell us your current mood and we'll create the perfect playlist to match your vibe.
        </p>
      </motion.div>

      {/* Main Input */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
      >
        <Card className="border-slate-200 shadow-lg shadow-slate-200/50">
          <CardContent className="p-6 space-y-6">
            {/* Text Input */}
            <div className="space-y-3">
              <Label htmlFor="mood-input" className="text-sm font-medium text-slate-700">
                Describe your mood
              </Label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400" />
                <Input
                  id="mood-input"
                  type="text"
                  placeholder="I'm feeling..."
                  value={mood}
                  onChange={(e) => setMood(e.target.value)}
                  className="pl-10 pr-12 h-12 text-lg border-slate-200 focus:border-indigo-500 focus:ring-indigo-500"
                  onKeyPress={(e) => e.key === 'Enter' && handleSubmit()}
                />
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleVoiceInput}
                  disabled={isListening}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 h-8 w-8 p-0"
                >
                  <Mic className={`h-4 w-4 ${isListening ? 'text-red-500' : 'text-slate-400'}`} />
                </Button>
              </div>

              {/* Suggestions Dropdown */}
              <AnimatePresence>
                {suggestions.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="bg-white border border-slate-200 rounded-lg shadow-lg p-2 space-y-1"
                  >
                    {suggestions.map((suggestion, index) => (
                      <button
                        key={suggestion}
                        onClick={() => handleSubmit(suggestion)}
                        className="w-full text-left px-3 py-2 text-sm hover:bg-slate-50 rounded-md transition-colors"
                      >
                        {suggestion}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Intensity Slider */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Label className="text-sm font-medium text-slate-700">
                  Mood Intensity
                </Label>
                <span className="text-sm text-slate-500 font-medium">
                  {intensity[0]}%
                </span>
              </div>
              <div className="px-2">
                <Slider
                  value={intensity}
                  onValueChange={setIntensity}
                  max={100}
                  step={5}
                  className="w-full"
                />
              </div>
              <div className="flex justify-between text-xs text-slate-500">
                <span>Subtle</span>
                <span>Moderate</span>
                <span>Intense</span>
              </div>
            </div>

            {/* Submit Button */}
            <Button
              onClick={() => handleSubmit()}
              disabled={!mood.trim() || isLoading}
              className="w-full h-12 bg-gradient-to-r from-indigo-500 to-violet-500 hover:from-indigo-600 hover:to-violet-600 text-white font-medium text-lg shadow-lg shadow-indigo-500/25"
            >
              {isLoading ? (
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Analyzing...</span>
                </div>
              ) : (
                <div className="flex items-center space-x-2">
                  <Sparkles className="h-5 w-5" />
                  <span>Find My Music</span>
                </div>
              )}
            </Button>
          </CardContent>
        </Card>
      </motion.div>

      {/* Quick Mood Pills */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="space-y-4"
      >
        <h3 className="text-lg font-semibold text-slate-800 text-center">
          Quick Moods
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {moodSuggestions.map((suggestion, index) => {
            const Icon = suggestion.icon
            return (
              <motion.button
                key={suggestion.label}
                onClick={() => handleSubmit(suggestion.label)}
                className="group relative p-4 rounded-xl border border-slate-200 hover:border-slate-300 bg-white hover:bg-slate-50 transition-all duration-200"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
              >
                <div className="flex items-center space-x-3">
                  <div className={`p-2 rounded-lg bg-gradient-to-r ${suggestion.color}`}>
                    <Icon className="h-4 w-4 text-white" />
                  </div>
                  <span className="font-medium text-slate-700 group-hover:text-slate-900">
                    {suggestion.label}
                  </span>
                </div>
              </motion.button>
            )
          })}
        </div>
      </motion.div>

      {/* Recent Moods */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="space-y-3"
      >
        <div className="flex items-center space-x-2 text-sm text-slate-600">
          <Clock className="h-4 w-4" />
          <span>Recent moods</span>
        </div>
        <div className="flex flex-wrap gap-2">
          {recentMoods.map((recentMood) => (
            <button
              key={recentMood}
              onClick={() => handleSubmit(recentMood)}
              className="px-3 py-1.5 text-sm bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-full transition-colors"
            >
              {recentMood}
            </button>
          ))}
        </div>
      </motion.div>
    </div>
  )
} 