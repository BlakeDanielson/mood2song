'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Music2, Guitar, Mic, Piano, Drum, Radio } from 'lucide-react'

interface GenreStudioProps {
  onGenreSelect: (genres: string[]) => void
  selectedGenres: string[]
  isLoading: boolean
  mood: string
  tempo: number
  energy: number
}

export function GenreStudio({ 
  onGenreSelect, 
  selectedGenres, 
  isLoading, 
  mood, 
  tempo, 
  energy 
}: GenreStudioProps) {
  const [localSelectedGenres, setLocalSelectedGenres] = useState<string[]>(selectedGenres)

  const genres = [
    { name: 'Pop', icon: Radio, color: 'from-pink-400 to-rose-500', description: 'Catchy and mainstream' },
    { name: 'Rock', icon: Guitar, color: 'from-red-500 to-orange-600', description: 'Powerful and energetic' },
    { name: 'Hip Hop', icon: Mic, color: 'from-purple-500 to-indigo-600', description: 'Rhythmic and urban' },
    { name: 'Electronic', icon: Music2, color: 'from-cyan-400 to-blue-500', description: 'Synthetic and digital' },
    { name: 'Jazz', icon: Piano, color: 'from-amber-400 to-yellow-500', description: 'Smooth and sophisticated' },
    { name: 'Classical', icon: Piano, color: 'from-emerald-400 to-teal-500', description: 'Timeless and elegant' },
    { name: 'R&B', icon: Mic, color: 'from-violet-400 to-purple-500', description: 'Soulful and smooth' },
    { name: 'Country', icon: Guitar, color: 'from-orange-400 to-amber-500', description: 'Storytelling and rustic' },
    { name: 'Reggae', icon: Guitar, color: 'from-green-400 to-emerald-500', description: 'Laid-back and rhythmic' },
    { name: 'Blues', icon: Guitar, color: 'from-blue-500 to-indigo-600', description: 'Emotional and raw' },
    { name: 'Folk', icon: Guitar, color: 'from-brown-400 to-amber-600', description: 'Acoustic and traditional' },
    { name: 'Funk', icon: Drum, color: 'from-yellow-400 to-orange-500', description: 'Groovy and rhythmic' }
  ]

  const toggleGenre = (genreName: string) => {
    setLocalSelectedGenres(prev => {
      if (prev.includes(genreName)) {
        return prev.filter(g => g !== genreName)
      } else if (prev.length < 3) {
        return [...prev, genreName]
      }
      return prev
    })
  }

  const handleSubmit = () => {
    if (localSelectedGenres.length > 0) {
      onGenreSelect(localSelectedGenres)
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
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <Music2 className="w-12 h-12 text-cyan-400" />
          </motion.div>
          <h1 className="text-4xl md:text-6xl font-bold text-white">
            Genre <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">Studio</span>
          </h1>
        </div>
        <p className="text-xl text-cyan-200 max-w-2xl mx-auto">
          Blend genres to create your unique sound. Select up to 3 genres that match your vibe.
        </p>
      </motion.div>

      {/* Current Vibe Display */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2 }}
      >
        <Card className="p-6 bg-gradient-to-r from-purple-900/50 to-indigo-900/50 border border-cyan-500/20 backdrop-blur-xl">
          <div className="text-center space-y-4">
            <h3 className="text-lg font-semibold text-white">Your Current Vibe</h3>
            <div className="flex items-center justify-center space-x-8">
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-400">{mood}</div>
                <div className="text-sm text-white/60">Mood</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-red-400">{tempo} BPM</div>
                <div className="text-sm text-white/60">Tempo</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-400">{energy}%</div>
                <div className="text-sm text-white/60">Energy</div>
              </div>
            </div>
          </div>
        </Card>
      </motion.div>

      {/* Genre Selection */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="space-y-6"
      >
        <div className="text-center space-y-2">
          <h2 className="text-2xl font-bold text-white">Choose Your Genres</h2>
          <p className="text-cyan-200">
            Selected: {localSelectedGenres.length}/3
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {genres.map((genre, index) => {
            const isSelected = localSelectedGenres.includes(genre.name)
            const isDisabled = !isSelected && localSelectedGenres.length >= 3
            const IconComponent = genre.icon

            return (
              <motion.div
                key={genre.name}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.05 * index }}
                whileHover={{ scale: isDisabled ? 1 : 1.05 }}
                whileTap={{ scale: isDisabled ? 1 : 0.95 }}
              >
                <Card
                  className={`p-6 cursor-pointer transition-all duration-300 border-2 ${
                    isSelected
                      ? `bg-gradient-to-br ${genre.color} border-white shadow-lg shadow-cyan-500/25`
                      : isDisabled
                      ? 'bg-white/5 border-white/10 opacity-50 cursor-not-allowed'
                      : 'bg-white/10 border-white/20 hover:bg-white/20 hover:border-white/40'
                  }`}
                  onClick={() => !isDisabled && toggleGenre(genre.name)}
                >
                  <div className="text-center space-y-3">
                    <IconComponent className="w-8 h-8 mx-auto text-white" />
                    <div className="space-y-1">
                      <h3 className="font-bold text-white">{genre.name}</h3>
                      <p className="text-xs text-white/80">{genre.description}</p>
                    </div>
                    {isSelected && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="w-6 h-6 bg-white rounded-full flex items-center justify-center mx-auto"
                      >
                        <span className="text-xs text-black font-bold">✓</span>
                      </motion.div>
                    )}
                  </div>
                </Card>
              </motion.div>
            )
          })}
        </div>
      </motion.div>

      {/* Selected Genres Display */}
      {localSelectedGenres.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-4"
        >
          <h3 className="text-xl font-semibold text-white text-center">Your Genre Mix</h3>
          <div className="flex flex-wrap justify-center gap-3">
            {localSelectedGenres.map((genreName, index) => {
              const genre = genres.find(g => g.name === genreName)
              return (
                <motion.div
                  key={genreName}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.1 * index }}
                >
                  <Badge 
                    className={`px-4 py-2 text-sm font-semibold bg-gradient-to-r ${genre?.color} text-white border-0`}
                  >
                    {genreName}
                  </Badge>
                </motion.div>
              )
            })}
          </div>
        </motion.div>
      )}

      {/* Studio Equipment Visualization */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="space-y-4"
      >
        <h3 className="text-xl font-semibold text-white text-center">Studio Equipment</h3>
        <div className="flex justify-center space-x-8">
          {[
            { icon: Mic, active: localSelectedGenres.includes('Hip Hop') || localSelectedGenres.includes('R&B') },
            { icon: Guitar, active: localSelectedGenres.includes('Rock') || localSelectedGenres.includes('Country') },
            { icon: Piano, active: localSelectedGenres.includes('Jazz') || localSelectedGenres.includes('Classical') },
            { icon: Drum, active: localSelectedGenres.includes('Funk') || localSelectedGenres.includes('Rock') },
            { icon: Music2, active: localSelectedGenres.includes('Electronic') || localSelectedGenres.includes('Pop') }
          ].map((equipment, index) => {
            const IconComponent = equipment.icon
            return (
              <motion.div
                key={index}
                animate={{
                  scale: equipment.active ? [1, 1.2, 1] : 1,
                  opacity: equipment.active ? 1 : 0.3
                }}
                transition={{
                  duration: 2,
                  repeat: equipment.active ? Infinity : 0
                }}
                className={`p-4 rounded-full ${
                  equipment.active 
                    ? 'bg-gradient-to-r from-cyan-500 to-blue-500 shadow-lg shadow-cyan-500/25' 
                    : 'bg-white/10'
                }`}
              >
                <IconComponent className="w-8 h-8 text-white" />
              </motion.div>
            )
          })}
        </div>
      </motion.div>

      {/* Submit Button */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="text-center"
      >
        <Button
          onClick={handleSubmit}
          disabled={localSelectedGenres.length === 0 || isLoading}
          className="px-12 py-6 text-lg font-semibold bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white rounded-full shadow-lg shadow-cyan-500/25 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? (
            <div className="flex items-center space-x-2">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
              />
              <span>Crafting Your Sound...</span>
            </div>
          ) : (
            <div className="flex items-center space-x-2">
              <Music2 className="w-5 h-5" />
              <span>Create My Mix</span>
            </div>
          )}
        </Button>
      </motion.div>
    </div>
  )
} 