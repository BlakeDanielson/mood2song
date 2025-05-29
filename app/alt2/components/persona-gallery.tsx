"use client"

import { motion } from "framer-motion"
import { Sparkles, Music, Heart, Zap, Waves, Mountain } from "lucide-react"

interface PersonaGalleryProps {
  onPersonaSelect: (personaId: string) => void
  selectedPersona: string | null
}

const personas = [
  {
    id: 'energetic-explorer',
    name: 'Energetic Explorer',
    description: 'High-energy beats and motivational anthems',
    icon: Zap,
    color: 'from-orange-500 to-red-500',
    mood: 'Pumped up and ready to conquer the world',
    tags: ['Electronic', 'Rock', 'Hip-Hop']
  },
  {
    id: 'dreamy-wanderer',
    name: 'Dreamy Wanderer',
    description: 'Ethereal soundscapes and ambient journeys',
    icon: Sparkles,
    color: 'from-purple-500 to-pink-500',
    mood: 'Lost in thought and creative inspiration',
    tags: ['Ambient', 'Indie', 'Dream Pop']
  },
  {
    id: 'romantic-soul',
    name: 'Romantic Soul',
    description: 'Love songs and heartfelt ballads',
    icon: Heart,
    color: 'from-pink-500 to-rose-500',
    mood: 'Feeling love and emotional connection',
    tags: ['R&B', 'Soul', 'Acoustic']
  },
  {
    id: 'chill-vibes',
    name: 'Chill Vibes',
    description: 'Relaxed beats and mellow tunes',
    icon: Waves,
    color: 'from-blue-500 to-cyan-500',
    mood: 'Laid back and going with the flow',
    tags: ['Lo-Fi', 'Jazz', 'Chillhop']
  },
  {
    id: 'nature-lover',
    name: 'Nature Lover',
    description: 'Organic sounds and earthy melodies',
    icon: Mountain,
    color: 'from-green-500 to-emerald-500',
    mood: 'Connected to nature and grounded',
    tags: ['Folk', 'World', 'Acoustic']
  },
  {
    id: 'party-starter',
    name: 'Party Starter',
    description: 'Dance floor anthems and crowd pleasers',
    icon: Music,
    color: 'from-yellow-500 to-orange-500',
    mood: 'Ready to dance and celebrate',
    tags: ['Dance', 'Pop', 'House']
  }
]

export function PersonaGallery({ onPersonaSelect, selectedPersona }: PersonaGalleryProps) {
  return (
    <div className="min-h-screen py-20">
      <motion.div
        className="text-center mb-16"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-4xl lg:text-6xl font-bold bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-6">
          Choose Your Vibe
        </h2>
        <p className="text-xl text-slate-300 max-w-2xl mx-auto">
          Select a persona that matches your current energy and discover music that resonates with your soul.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
        {personas.map((persona, index) => {
          const Icon = persona.icon
          const isSelected = selectedPersona === persona.id

          return (
            <motion.div
              key={persona.id}
              className="relative group cursor-pointer"
              initial={{ opacity: 0, y: 50, rotateX: 45 }}
              animate={{ opacity: 1, y: 0, rotateX: 0 }}
              transition={{ 
                delay: index * 0.1, 
                duration: 0.6,
                type: "spring",
                stiffness: 100
              }}
              whileHover={{ 
                scale: 1.05, 
                rotateY: 5,
                z: 50
              }}
              whileTap={{ scale: 0.95 }}
              onClick={() => onPersonaSelect(persona.id)}
              style={{ perspective: 1000 }}
            >
              {/* Card */}
              <motion.div
                className={`relative h-80 rounded-3xl overflow-hidden border-2 transition-all duration-500 ${
                  isSelected 
                    ? 'border-white shadow-2xl shadow-purple-500/50' 
                    : 'border-white/20 hover:border-white/40'
                }`}
                style={{
                  background: `linear-gradient(135deg, ${persona.color.split(' ')[1]} 0%, ${persona.color.split(' ')[3]} 100%)`,
                  transformStyle: 'preserve-3d'
                }}
              >
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-20">
                  <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent" />
                  <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16" />
                  <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full translate-y-12 -translate-x-12" />
                </div>

                {/* Content */}
                <div className="relative z-10 p-8 h-full flex flex-col justify-between">
                  {/* Icon */}
                  <motion.div
                    className="self-start"
                    animate={{ 
                      rotate: isSelected ? [0, 360] : 0,
                      scale: isSelected ? [1, 1.2, 1] : 1
                    }}
                    transition={{ 
                      duration: isSelected ? 2 : 0.5,
                      repeat: isSelected ? Infinity : 0,
                      ease: "linear"
                    }}
                  >
                    <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm">
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                  </motion.div>

                  {/* Text Content */}
                  <div className="text-white">
                    <h3 className="text-2xl font-bold mb-2">{persona.name}</h3>
                    <p className="text-white/80 text-sm mb-4">{persona.description}</p>
                    <p className="text-white/60 text-xs italic mb-4">"{persona.mood}"</p>
                    
                    {/* Tags */}
                    <div className="flex flex-wrap gap-2">
                      {persona.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-1 bg-white/20 rounded-full text-xs backdrop-blur-sm"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Selection Indicator */}
                {isSelected && (
                  <motion.div
                    className="absolute inset-0 border-4 border-white rounded-3xl"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                )}

                {/* Hover Glow */}
                <motion.div
                  className="absolute inset-0 bg-white/10 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ backdropFilter: 'blur(10px)' }}
                />
              </motion.div>

              {/* 3D Shadow */}
              <motion.div
                className="absolute inset-0 rounded-3xl opacity-30 -z-10"
                style={{
                  background: `linear-gradient(135deg, ${persona.color.split(' ')[1]} 0%, ${persona.color.split(' ')[3]} 100%)`,
                  filter: 'blur(20px)',
                  transform: 'translateY(10px) translateZ(-50px)'
                }}
                animate={{
                  opacity: isSelected ? 0.6 : 0.3,
                  scale: isSelected ? 1.1 : 1
                }}
                transition={{ duration: 0.3 }}
              />
            </motion.div>
          )
        })}
      </div>

      {/* Selected Persona Info */}
      {selectedPersona && (
        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="inline-flex items-center space-x-3 px-6 py-3 bg-gradient-to-r from-purple-500/20 to-cyan-500/20 rounded-full border border-purple-500/30 backdrop-blur-sm">
            <Sparkles className="w-5 h-5 text-purple-400" />
            <span className="text-white font-medium">
              {personas.find(p => p.id === selectedPersona)?.name} selected
            </span>
          </div>
        </motion.div>
      )}
    </div>
  )
} 