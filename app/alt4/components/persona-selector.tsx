'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Check, Users, TrendingUp, Star, Music } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

interface PersonaSelectorProps {
  onPersonaSelect: (persona: string) => void
  selectedPersona?: string
  isLoading?: boolean
}

const personas = [
  {
    id: 'explorer',
    name: 'The Explorer',
    description: 'Adventurous and open to new musical experiences',
    traits: ['Diverse genres', 'World music', 'Experimental sounds'],
    color: 'from-emerald-500 to-teal-500',
    icon: '🌍',
    popularity: 85,
    matchRate: '92%'
  },
  {
    id: 'nostalgic',
    name: 'The Nostalgic',
    description: 'Loves classic hits and timeless melodies',
    traits: ['Classic rock', 'Vintage pop', 'Golden oldies'],
    color: 'from-amber-500 to-orange-500',
    icon: '📻',
    popularity: 78,
    matchRate: '88%'
  },
  {
    id: 'trendsetter',
    name: 'The Trendsetter',
    description: 'Always ahead of the curve with latest hits',
    traits: ['Chart toppers', 'Viral tracks', 'Fresh releases'],
    color: 'from-pink-500 to-rose-500',
    icon: '🔥',
    popularity: 92,
    matchRate: '95%'
  },
  {
    id: 'minimalist',
    name: 'The Minimalist',
    description: 'Appreciates subtle, refined musical compositions',
    traits: ['Ambient', 'Instrumental', 'Lo-fi'],
    color: 'from-slate-500 to-gray-500',
    icon: '🎭',
    popularity: 67,
    matchRate: '85%'
  },
  {
    id: 'energizer',
    name: 'The Energizer',
    description: 'High-energy beats that fuel motivation',
    traits: ['Electronic', 'Workout music', 'Upbeat tempo'],
    color: 'from-violet-500 to-purple-500',
    icon: '⚡',
    popularity: 89,
    matchRate: '91%'
  },
  {
    id: 'romantic',
    name: 'The Romantic',
    description: 'Emotional depth and heartfelt connections',
    traits: ['Love songs', 'Acoustic', 'Soulful vocals'],
    color: 'from-red-500 to-pink-500',
    icon: '💝',
    popularity: 74,
    matchRate: '87%'
  }
]

export function PersonaSelector({ onPersonaSelect, selectedPersona, isLoading = false }: PersonaSelectorProps) {
  const [hoveredPersona, setHoveredPersona] = useState<string | null>(null)

  const handlePersonaSelect = (personaId: string) => {
    onPersonaSelect(personaId)
  }

  return (
    <div className="w-full max-w-6xl mx-auto space-y-8">
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
            Choose Your Music Persona
          </h2>
        </div>
        <p className="text-lg text-slate-600 max-w-2xl mx-auto">
          Select the persona that best matches your musical taste and listening preferences. 
          Our AI will curate the perfect playlist based on your choice.
        </p>
      </motion.div>

      {/* Personas Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {personas.map((persona, index) => (
          <motion.div
            key={persona.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            onHoverStart={() => setHoveredPersona(persona.id)}
            onHoverEnd={() => setHoveredPersona(null)}
          >
            <Card 
              className={`relative overflow-hidden cursor-pointer transition-all duration-300 ${
                selectedPersona === persona.id 
                  ? 'ring-2 ring-indigo-500 shadow-lg shadow-indigo-500/25' 
                  : 'hover:shadow-lg hover:shadow-slate-200/50'
              }`}
              onClick={() => handlePersonaSelect(persona.id)}
            >
              <CardContent className="p-0">
                {/* Header with gradient */}
                <div className={`relative h-24 bg-gradient-to-r ${persona.color} p-6 text-white`}>
                  <div className="absolute inset-0 bg-black/10"></div>
                  <div className="relative flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <span className="text-2xl">{persona.icon}</span>
                      <div>
                        <h3 className="font-bold text-lg">{persona.name}</h3>
                        <div className="flex items-center space-x-2 text-sm opacity-90">
                          <Users className="h-3 w-3" />
                          <span>{persona.popularity}% popularity</span>
                        </div>
                      </div>
                    </div>
                    {selectedPersona === persona.id && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="bg-white/20 rounded-full p-1"
                      >
                        <Check className="h-4 w-4" />
                      </motion.div>
                    )}
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 space-y-4">
                  <p className="text-slate-600 text-sm leading-relaxed">
                    {persona.description}
                  </p>

                  {/* Traits */}
                  <div className="space-y-2">
                    <h4 className="text-sm font-semibold text-slate-800 flex items-center">
                      <Music className="h-3 w-3 mr-1" />
                      Musical Preferences
                    </h4>
                    <div className="flex flex-wrap gap-1">
                      {persona.traits.map((trait) => (
                        <span
                          key={trait}
                          className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-slate-100 text-slate-700"
                        >
                          {trait}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Match Rate */}
                  <div className="flex items-center justify-between pt-2 border-t border-slate-100">
                    <div className="flex items-center space-x-1 text-sm text-slate-600">
                      <Star className="h-3 w-3 text-amber-500" />
                      <span>Match Rate</span>
                    </div>
                    <span className="text-sm font-semibold text-slate-800">
                      {persona.matchRate}
                    </span>
                  </div>

                  {/* Popularity Bar */}
                  <div className="space-y-1">
                    <div className="flex items-center justify-between text-xs text-slate-500">
                      <span>Community Choice</span>
                      <span>{persona.popularity}%</span>
                    </div>
                    <div className="w-full bg-slate-100 rounded-full h-1.5">
                      <motion.div
                        className={`h-1.5 rounded-full bg-gradient-to-r ${persona.color}`}
                        initial={{ width: 0 }}
                        animate={{ width: `${persona.popularity}%` }}
                        transition={{ duration: 1, delay: index * 0.1 + 0.5 }}
                      />
                    </div>
                  </div>
                </div>

                {/* Hover Effect */}
                {hoveredPersona === persona.id && (
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-indigo-500/5 to-violet-500/5 pointer-events-none"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  />
                )}
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Continue Button */}
      {selectedPersona && (
        <motion.div
          className="flex justify-center pt-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Button
            onClick={() => onPersonaSelect(selectedPersona)}
            disabled={isLoading}
            className="h-12 px-8 bg-gradient-to-r from-indigo-500 to-violet-500 hover:from-indigo-600 hover:to-violet-600 text-white font-medium text-lg shadow-lg shadow-indigo-500/25"
          >
            {isLoading ? (
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span>Creating Playlist...</span>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <TrendingUp className="h-5 w-5" />
                <span>Continue to Playlist</span>
              </div>
            )}
          </Button>
        </motion.div>
      )}

      {/* Stats */}
      <motion.div
        className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-8 border-t border-slate-200"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.8 }}
      >
        <div className="text-center space-y-1">
          <div className="text-2xl font-bold text-slate-800">2.4M+</div>
          <div className="text-sm text-slate-600">Playlists Created</div>
        </div>
        <div className="text-center space-y-1">
          <div className="text-2xl font-bold text-slate-800">98.5%</div>
          <div className="text-sm text-slate-600">User Satisfaction</div>
        </div>
        <div className="text-center space-y-1">
          <div className="text-2xl font-bold text-slate-800">50M+</div>
          <div className="text-sm text-slate-600">Songs Analyzed</div>
        </div>
      </motion.div>
    </div>
  )
} 