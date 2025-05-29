'use client'

import { motion } from 'framer-motion'

interface AudioVisualizerProps {
  isPlaying: boolean
}

export function AudioVisualizer({ isPlaying }: AudioVisualizerProps) {
  const bars = Array.from({ length: 20 }, (_, i) => i)

  return (
    <div className="fixed bottom-0 left-0 right-0 z-30 pointer-events-none">
      <div className="flex items-end justify-center space-x-1 h-32 px-4">
        {bars.map((_, index) => (
          <motion.div
            key={index}
            animate={{
              scaleY: isPlaying 
                ? [0.1, Math.random() * 2 + 0.5, 0.1]
                : 0.1,
              backgroundColor: isPlaying
                ? [
                    '#8b5cf6', // purple
                    '#ec4899', // pink
                    '#06b6d4', // cyan
                    '#10b981', // emerald
                    '#f59e0b', // amber
                    '#ef4444', // red
                  ][index % 6]
                : '#8b5cf6'
            }}
            transition={{
              duration: 0.5 + Math.random() * 0.5,
              repeat: isPlaying ? Infinity : 0,
              ease: "easeInOut",
              delay: index * 0.05
            }}
            className="w-2 bg-purple-500 rounded-t-full origin-bottom"
            style={{ height: '4px' }}
          />
        ))}
      </div>
      
      {/* Glow effect */}
      {isPlaying && (
        <motion.div
          animate={{
            opacity: [0.3, 0.8, 0.3],
            scale: [1, 1.1, 1]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-96 h-32 bg-gradient-to-t from-purple-500/20 via-pink-500/10 to-transparent rounded-full blur-xl"
        />
      )}
    </div>
  )
} 