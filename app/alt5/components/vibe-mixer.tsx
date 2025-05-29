'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Slider } from '@/components/ui/slider'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Zap, Heart, Music, Headphones } from 'lucide-react'

interface VibeMixerProps {
  onVibeSubmit: (mood: string, intensity: number, tempo: number, energy: number) => void
  isLoading: boolean
}

export function VibeMixer({ onVibeSubmit, isLoading }: VibeMixerProps) {
  const [mood, setMood] = useState('')
  const [intensity, setIntensity] = useState([70])
  const [tempo, setTempo] = useState([120])
  const [energy, setEnergy] = useState([75])

  const moods = [
    { name: 'Happy', emoji: '😊', color: 'from-yellow-400 to-orange-500', description: 'Uplifting and joyful' },
    { name: 'Chill', emoji: '😌', color: 'from-blue-400 to-cyan-500', description: 'Relaxed and peaceful' },
    { name: 'Energetic', emoji: '⚡', color: 'from-red-400 to-pink-500', description: 'High energy and pumped' },
    { name: 'Romantic', emoji: '💕', color: 'from-pink-400 to-rose-500', description: 'Love and intimacy' },
    { name: 'Melancholic', emoji: '🌧️', color: 'from-gray-400 to-blue-600', description: 'Thoughtful and introspective' },
    { name: 'Confident', emoji: '🔥', color: 'from-orange-400 to-red-600', description: 'Bold and powerful' },
    { name: 'Nostalgic', emoji: '🌅', color: 'from-amber-400 to-yellow-600', description: 'Memories and reflection' },
    { name: 'Adventurous', emoji: '🚀', color: 'from-purple-400 to-indigo-600', description: 'Exploration and discovery' }
  ]

  const handleSubmit = () => {
    if (mood) {
      onVibeSubmit(mood, intensity[0], tempo[0], energy[0])
    }
  }

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center space-y-4"
      >
        <div className="flex items-center justify-center space-x-3">
          <motion.div
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <Headphones className="w-12 h-12 text-purple-400" />
          </motion.div>
          <h1 className="text-4xl md:text-6xl font-bold text-white">
            Vibe <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">Mixer</span>
          </h1>
        </div>
        <p className="text-xl text-purple-200 max-w-2xl mx-auto">
          Set the mood and dial in your perfect sound. Adjust the knobs to craft your musical experience.
        </p>
      </motion.div>

      {/* Mood Selection */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="space-y-6"
      >
        <h2 className="text-2xl font-bold text-white text-center flex items-center justify-center space-x-2">
          <Heart className="w-6 h-6 text-pink-400" />
          <span>Choose Your Vibe</span>
        </h2>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {moods.map((moodOption, index) => (
            <motion.div
              key={moodOption.name}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1 * index }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Card
                className={`p-6 cursor-pointer transition-all duration-300 border-2 ${
                  mood === moodOption.name
                    ? `bg-gradient-to-br ${moodOption.color} border-white shadow-lg shadow-purple-500/25`
                    : 'bg-white/10 border-white/20 hover:bg-white/20 hover:border-white/40'
                }`}
                onClick={() => setMood(moodOption.name)}
              >
                <div className="text-center space-y-3">
                  <div className="text-4xl">{moodOption.emoji}</div>
                  <div className="space-y-1">
                    <h3 className="font-bold text-white">{moodOption.name}</h3>
                    <p className="text-xs text-white/80">{moodOption.description}</p>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Mixing Board */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="space-y-6"
      >
        <h2 className="text-2xl font-bold text-white text-center flex items-center justify-center space-x-2">
          <Music className="w-6 h-6 text-cyan-400" />
          <span>Mix Your Sound</span>
        </h2>

        <Card className="p-8 bg-gradient-to-br from-gray-900/50 to-black/50 border border-purple-500/20 backdrop-blur-xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Intensity Slider */}
            <div className="space-y-4">
              <div className="text-center">
                <div className="flex items-center justify-center space-x-2 mb-2">
                  <Zap className="w-5 h-5 text-yellow-400" />
                  <h3 className="text-lg font-semibold text-white">Intensity</h3>
                </div>
                <div className="text-3xl font-bold text-yellow-400">{intensity[0]}%</div>
              </div>
              
              <div className="relative">
                <Slider
                  value={intensity}
                  onValueChange={setIntensity}
                  max={100}
                  step={1}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-white/60 mt-2">
                  <span>Subtle</span>
                  <span>Intense</span>
                </div>
              </div>
            </div>

            {/* Tempo Slider */}
            <div className="space-y-4">
              <div className="text-center">
                <div className="flex items-center justify-center space-x-2 mb-2">
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 60 / tempo[0], repeat: Infinity }}
                  >
                    <Heart className="w-5 h-5 text-red-400" />
                  </motion.div>
                  <h3 className="text-lg font-semibold text-white">Tempo</h3>
                </div>
                <div className="text-3xl font-bold text-red-400">{tempo[0]} BPM</div>
              </div>
              
              <div className="relative">
                <Slider
                  value={tempo}
                  onValueChange={setTempo}
                  min={60}
                  max={180}
                  step={1}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-white/60 mt-2">
                  <span>Slow</span>
                  <span>Fast</span>
                </div>
              </div>
            </div>

            {/* Energy Slider */}
            <div className="space-y-4">
              <div className="text-center">
                <div className="flex items-center justify-center space-x-2 mb-2">
                  <Zap className="w-5 h-5 text-green-400" />
                  <h3 className="text-lg font-semibold text-white">Energy</h3>
                </div>
                <div className="text-3xl font-bold text-green-400">{energy[0]}%</div>
              </div>
              
              <div className="relative">
                <Slider
                  value={energy}
                  onValueChange={setEnergy}
                  max={100}
                  step={1}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-white/60 mt-2">
                  <span>Calm</span>
                  <span>Energetic</span>
                </div>
              </div>
            </div>
          </div>

          {/* Visual Feedback */}
          <div className="mt-8 flex justify-center">
            <div className="flex space-x-2">
              {[...Array(10)].map((_, i) => (
                <motion.div
                  key={i}
                  animate={{
                    scaleY: [1, (intensity[0] + energy[0]) / 100 + Math.random() * 0.5, 1],
                    backgroundColor: [
                      '#8b5cf6',
                      '#ec4899',
                      '#06b6d4',
                      '#10b981',
                      '#f59e0b'
                    ][i % 5]
                  }}
                  transition={{
                    duration: 60 / tempo[0],
                    repeat: Infinity,
                    delay: i * 0.1
                  }}
                  className="w-2 h-8 bg-purple-500 rounded-full"
                />
              ))}
            </div>
          </div>
        </Card>
      </motion.div>

      {/* Submit Button */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="text-center"
      >
        <Button
          onClick={handleSubmit}
          disabled={!mood || isLoading}
          className="px-12 py-6 text-lg font-semibold bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white rounded-full shadow-lg shadow-purple-500/25 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? (
            <div className="flex items-center space-x-2">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
              />
              <span>Mixing Your Vibe...</span>
            </div>
          ) : (
            <div className="flex items-center space-x-2">
              <Music className="w-5 h-5" />
              <span>Mix My Vibe</span>
            </div>
          )}
        </Button>
      </motion.div>
    </div>
  )
} 