"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Zap, Cloud, Heart, Waves, Mountain, Sparkles, Music } from "lucide-react"

interface PersonaWheelProps {
  onPersonaSelect: (personaId: string) => void
  selectedPersona: string | null
}

const personas = [
  {
    id: 'energetic',
    name: 'Energetic',
    icon: Zap,
    color: '#F59E0B',
    description: 'High-energy beats',
    angle: 0
  },
  {
    id: 'dreamy',
    name: 'Dreamy',
    icon: Cloud,
    color: '#8B5CF6',
    description: 'Ethereal soundscapes',
    angle: 60
  },
  {
    id: 'romantic',
    name: 'Romantic',
    icon: Heart,
    color: '#EC4899',
    description: 'Love ballads',
    angle: 120
  },
  {
    id: 'chill',
    name: 'Chill',
    icon: Waves,
    color: '#06B6D4',
    description: 'Relaxed vibes',
    angle: 180
  },
  {
    id: 'nature',
    name: 'Nature',
    icon: Mountain,
    color: '#10B981',
    description: 'Organic sounds',
    angle: 240
  },
  {
    id: 'party',
    name: 'Party',
    icon: Sparkles,
    color: '#F97316',
    description: 'Dance anthems',
    angle: 300
  }
]

export function PersonaWheel({ onPersonaSelect, selectedPersona }: PersonaWheelProps) {
  const [hoveredPersona, setHoveredPersona] = useState<string | null>(null)
  const [wheelRotation, setWheelRotation] = useState(0)

  const handlePersonaClick = (personaId: string) => {
    onPersonaSelect(personaId)
    
    // Rotate wheel to center the selected persona
    const persona = personas.find(p => p.id === personaId)
    if (persona) {
      setWheelRotation(-persona.angle)
    }
  }

  const radius = 200
  const centerX = 250
  const centerY = 250

  return (
    <div className="flex flex-col items-center space-y-8">
      {/* Wheel Container */}
      <motion.div
        className="relative w-[500px] h-[500px]"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        {/* Background Circle */}
        <motion.div
          className="absolute inset-0 rounded-full border-2 border-slate-700/50"
          style={{
            background: 'radial-gradient(circle, rgba(15, 23, 42, 0.8) 0%, rgba(15, 23, 42, 0.4) 70%, transparent 100%)'
          }}
          animate={{ rotate: wheelRotation }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
        />

        {/* Center Hub */}
        <motion.div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-20 h-20 bg-gradient-to-br from-slate-800 to-slate-900 rounded-full border-2 border-slate-600 flex items-center justify-center"
          whileHover={{ scale: 1.1 }}
        >
          <Music className="w-8 h-8 text-cyan-400" />
        </motion.div>

        {/* Personas */}
        {personas.map((persona, index) => {
          const Icon = persona.icon
          const isSelected = selectedPersona === persona.id
          const isHovered = hoveredPersona === persona.id
          
          // Calculate position
          const angleRad = (persona.angle + wheelRotation) * (Math.PI / 180)
          const x = centerX + radius * Math.cos(angleRad)
          const y = centerY + radius * Math.sin(angleRad)

          return (
            <motion.div
              key={persona.id}
              className="absolute"
              style={{
                left: x - 40,
                top: y - 40,
              }}
              animate={{
                rotate: -wheelRotation, // Counter-rotate to keep icons upright
              }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
            >
              {/* Connection Line */}
              <motion.div
                className="absolute top-10 left-10 w-px bg-gradient-to-r from-transparent via-slate-600 to-transparent origin-bottom"
                style={{
                  height: radius - 50,
                  transform: `rotate(${persona.angle + wheelRotation + 180}deg)`,
                  transformOrigin: 'bottom center'
                }}
                initial={{ scaleY: 0 }}
                animate={{ scaleY: isSelected || isHovered ? 1 : 0.3 }}
                transition={{ duration: 0.3 }}
              />

              {/* Persona Button */}
              <motion.button
                className="relative w-20 h-20 rounded-full border-2 transition-all duration-300 group"
                style={{
                  backgroundColor: persona.color + '20',
                  borderColor: isSelected ? persona.color : persona.color + '40',
                  boxShadow: isSelected ? `0 0 30px ${persona.color}40` : 'none'
                }}
                onClick={() => handlePersonaClick(persona.id)}
                onMouseEnter={() => setHoveredPersona(persona.id)}
                onMouseLeave={() => setHoveredPersona(null)}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
                animate={{
                  scale: isSelected ? 1.3 : 1,
                  borderWidth: isSelected ? 3 : 2
                }}
                transition={{ duration: 0.3 }}
              >
                {/* Icon */}
                <Icon 
                  className="w-8 h-8 mx-auto transition-colors duration-300"
                  style={{ color: isSelected || isHovered ? persona.color : persona.color + 'AA' }}
                />

                {/* Glow Effect */}
                {(isSelected || isHovered) && (
                  <motion.div
                    className="absolute inset-0 rounded-full"
                    style={{
                      background: `radial-gradient(circle, ${persona.color}30 0%, transparent 70%)`
                    }}
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1.5, opacity: 1 }}
                    exit={{ scale: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  />
                )}

                {/* Selection Ring */}
                {isSelected && (
                  <motion.div
                    className="absolute inset-0 rounded-full border-2"
                    style={{ borderColor: persona.color }}
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1.4, opacity: 1 }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                  />
                )}
              </motion.button>

              {/* Label */}
              <AnimatePresence>
                {(isHovered || isSelected) && (
                  <motion.div
                    className="absolute top-24 left-1/2 transform -translate-x-1/2 text-center"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="bg-black/80 backdrop-blur-sm rounded-lg px-3 py-2 border border-slate-600">
                      <div className="text-sm font-medium text-white">{persona.name}</div>
                      <div className="text-xs text-slate-400">{persona.description}</div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          )
        })}

        {/* Rotation Indicators */}
        <div className="absolute inset-0 pointer-events-none">
          {[0, 90, 180, 270].map((angle) => (
            <motion.div
              key={angle}
              className="absolute w-2 h-2 bg-slate-600 rounded-full"
              style={{
                left: centerX + (radius + 30) * Math.cos(angle * Math.PI / 180) - 4,
                top: centerY + (radius + 30) * Math.sin(angle * Math.PI / 180) - 4,
              }}
              animate={{ rotate: wheelRotation }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
            />
          ))}
        </div>
      </motion.div>

      {/* Selected Persona Info */}
      <AnimatePresence>
        {selectedPersona && (
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.3 }}
          >
            {(() => {
              const persona = personas.find(p => p.id === selectedPersona)
              return persona ? (
                <div className="bg-gradient-to-r from-slate-800/80 to-slate-900/80 backdrop-blur-sm rounded-xl px-6 py-4 border border-slate-600">
                  <div className="flex items-center justify-center space-x-3">
                    <div 
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: persona.color }}
                    />
                    <span className="text-white font-medium">{persona.name} Persona Selected</span>
                  </div>
                  <p className="text-slate-400 text-sm mt-1">{persona.description}</p>
                </div>
              ) : null
            })()}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Instructions */}
      <motion.div
        className="text-center text-slate-400 text-sm max-w-md"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.5 }}
      >
        Click on a persona to select your musical preference. The wheel will rotate to center your selection.
      </motion.div>
    </div>
  )
} 