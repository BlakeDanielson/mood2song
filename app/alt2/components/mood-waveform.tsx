"use client"

import { useEffect, useRef } from "react"
import { motion } from "framer-motion"

interface MoodWaveformProps {
  mood: string
  isActive: boolean
}

export function MoodWaveform({ mood, isActive }: MoodWaveformProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationRef = useRef<number>()

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    canvas.width = 500
    canvas.height = 400

    let time = 0
    const waves = []

    // Generate wave parameters based on mood
    const moodLower = mood.toLowerCase()
    let waveCount = 3
    let amplitude = 50
    let frequency = 0.02
    let speed = 0.05
    let colors = ['#8B5CF6', '#06B6D4', '#EC4899']

    if (moodLower.includes('energetic') || moodLower.includes('intense') || moodLower.includes('passionate')) {
      waveCount = 6
      amplitude = 80
      frequency = 0.04
      speed = 0.1
      colors = ['#EF4444', '#F97316', '#F59E0B']
    } else if (moodLower.includes('calm') || moodLower.includes('peaceful') || moodLower.includes('balanced')) {
      waveCount = 2
      amplitude = 30
      frequency = 0.015
      speed = 0.03
      colors = ['#10B981', '#06B6D4', '#3B82F6']
    } else if (moodLower.includes('happy') || moodLower.includes('optimistic') || moodLower.includes('bright')) {
      waveCount = 4
      amplitude = 60
      frequency = 0.03
      speed = 0.07
      colors = ['#F59E0B', '#10B981', '#EC4899']
    }

    // Initialize waves
    for (let i = 0; i < waveCount; i++) {
      waves.push({
        amplitude: amplitude * (0.5 + Math.random() * 0.5),
        frequency: frequency * (0.8 + Math.random() * 0.4),
        phase: Math.random() * Math.PI * 2,
        speed: speed * (0.7 + Math.random() * 0.6),
        color: colors[i % colors.length],
        opacity: 0.3 + Math.random() * 0.4
      })
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      if (isActive) {
        waves.forEach((wave, index) => {
          ctx.beginPath()
          ctx.strokeStyle = wave.color + Math.floor(wave.opacity * 255).toString(16).padStart(2, '0')
          ctx.lineWidth = 2 + index * 0.5
          ctx.lineCap = 'round'

          for (let x = 0; x < canvas.width; x += 2) {
            const y = canvas.height / 2 + 
              Math.sin(x * wave.frequency + time * wave.speed + wave.phase) * wave.amplitude +
              Math.sin(x * wave.frequency * 2 + time * wave.speed * 1.5) * wave.amplitude * 0.3

            if (x === 0) {
              ctx.moveTo(x, y)
            } else {
              ctx.lineTo(x, y)
            }
          }

          ctx.stroke()

          // Add glow effect
          ctx.shadowColor = wave.color
          ctx.shadowBlur = 10
          ctx.stroke()
          ctx.shadowBlur = 0
        })

        // Add particles
        for (let i = 0; i < 20; i++) {
          const x = Math.random() * canvas.width
          const baseY = canvas.height / 2
          const waveY = waves.reduce((sum, wave) => {
            return sum + Math.sin(x * wave.frequency + time * wave.speed + wave.phase) * wave.amplitude * 0.5
          }, 0)
          const y = baseY + waveY + (Math.random() - 0.5) * 50

          ctx.beginPath()
          ctx.arc(x, y, Math.random() * 2 + 0.5, 0, Math.PI * 2)
          ctx.fillStyle = colors[Math.floor(Math.random() * colors.length)] + '60'
          ctx.fill()
        }
      } else {
        // Idle state - gentle pulse
        const centerY = canvas.height / 2
        const pulseAmplitude = 20
        const pulse = Math.sin(time * 0.02) * pulseAmplitude

        ctx.beginPath()
        ctx.strokeStyle = '#8B5CF640'
        ctx.lineWidth = 2
        ctx.moveTo(0, centerY + pulse)
        ctx.lineTo(canvas.width, centerY + pulse)
        ctx.stroke()

        // Add subtle glow
        ctx.shadowColor = '#8B5CF6'
        ctx.shadowBlur = 15
        ctx.stroke()
        ctx.shadowBlur = 0
      }

      time += 1
      animationRef.current = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [mood, isActive])

  return (
    <motion.div
      className="relative"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.6, duration: 0.8 }}
    >
      {/* Outer glow ring */}
      <motion.div
        className="absolute inset-0 rounded-full"
        style={{
          background: isActive 
            ? 'radial-gradient(circle, rgba(139, 92, 246, 0.3) 0%, transparent 70%)'
            : 'radial-gradient(circle, rgba(139, 92, 246, 0.1) 0%, transparent 70%)'
        }}
        animate={{
          scale: isActive ? [1, 1.1, 1] : [1, 1.05, 1],
        }}
        transition={{
          duration: isActive ? 2 : 4,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      {/* Canvas container */}
      <motion.div
        className="relative bg-black/30 rounded-full p-8 backdrop-blur-sm border border-white/10"
        animate={{
          borderColor: isActive ? 'rgba(139, 92, 246, 0.5)' : 'rgba(255, 255, 255, 0.1)'
        }}
        transition={{ duration: 0.5 }}
      >
        <canvas
          ref={canvasRef}
          className="rounded-full"
          style={{ 
            filter: isActive ? 'brightness(1.2) contrast(1.1)' : 'brightness(0.8)',
            transition: 'filter 0.5s ease'
          }}
        />

        {/* Center indicator */}
        <motion.div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full"
          style={{
            background: isActive 
              ? 'radial-gradient(circle, #8B5CF6, #06B6D4)'
              : 'radial-gradient(circle, #64748B, #475569)'
          }}
          animate={{
            scale: isActive ? [1, 1.3, 1] : [1, 1.1, 1],
          }}
          transition={{
            duration: isActive ? 1 : 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </motion.div>

      {/* Status text */}
      <motion.div
        className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-center"
        animate={{ opacity: isActive ? 1 : 0.5 }}
        transition={{ duration: 0.3 }}
      >
        <p className="text-sm text-slate-300">
          {isActive ? 'Visualizing your mood...' : 'Waiting for input...'}
        </p>
      </motion.div>
    </motion.div>
  )
} 