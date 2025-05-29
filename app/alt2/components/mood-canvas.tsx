"use client"

import { useRef, useEffect, useState, useCallback } from "react"
import { motion } from "framer-motion"
import { Palette, RotateCcw, Sparkles } from "lucide-react"

interface MoodCanvasProps {
  onMoodChange: (mood: string) => void
  selectedMood: string
}

export function MoodCanvas({ onMoodChange, selectedMood }: MoodCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [isDrawing, setIsDrawing] = useState(false)
  const [currentColor, setCurrentColor] = useState('#8B5CF6')
  const [brushSize, setBrushSize] = useState(10)
  const [moodIntensity, setMoodIntensity] = useState(0)

  const colors = [
    { color: '#EF4444', mood: 'passionate, energetic, intense' },
    { color: '#F97316', mood: 'warm, creative, enthusiastic' },
    { color: '#F59E0B', mood: 'happy, optimistic, bright' },
    { color: '#10B981', mood: 'calm, peaceful, balanced' },
    { color: '#06B6D4', mood: 'cool, refreshing, clear' },
    { color: '#3B82F6', mood: 'focused, deep, contemplative' },
    { color: '#8B5CF6', mood: 'dreamy, mystical, creative' },
    { color: '#EC4899', mood: 'playful, romantic, vibrant' },
  ]

  const generateMoodDescription = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
    const data = imageData.data
    
    let totalPixels = 0
    let colorCounts: { [key: string]: number } = {}
    
    // Analyze the canvas for color distribution
    for (let i = 0; i < data.length; i += 4) {
      const r = data[i]
      const g = data[i + 1]
      const b = data[i + 2]
      const a = data[i + 3]
      
      if (a > 0) { // Only count non-transparent pixels
        totalPixels++
        const hex = `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`
        
        // Find closest color match
        let closestColor = colors[0].color
        let minDistance = Infinity
        
        colors.forEach(colorObj => {
          const colorR = parseInt(colorObj.color.slice(1, 3), 16)
          const colorG = parseInt(colorObj.color.slice(3, 5), 16)
          const colorB = parseInt(colorObj.color.slice(5, 7), 16)
          
          const distance = Math.sqrt(
            Math.pow(r - colorR, 2) + 
            Math.pow(g - colorG, 2) + 
            Math.pow(b - colorB, 2)
          )
          
          if (distance < minDistance) {
            minDistance = distance
            closestColor = colorObj.color
          }
        })
        
        colorCounts[closestColor] = (colorCounts[closestColor] || 0) + 1
      }
    }

    if (totalPixels === 0) {
      onMoodChange("")
      return
    }

    // Find dominant colors and generate mood description
    const sortedColors = Object.entries(colorCounts)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 3)

    const dominantMoods = sortedColors.map(([color]) => {
      const colorObj = colors.find(c => c.color === color)
      return colorObj?.mood || 'neutral'
    })

    const intensity = Math.min(totalPixels / 1000, 1) // Normalize intensity
    setMoodIntensity(intensity)

    const intensityWords = intensity > 0.7 ? 'very' : intensity > 0.4 ? 'moderately' : 'slightly'
    const moodDescription = `I'm feeling ${intensityWords} ${dominantMoods.join(', ')}`
    
    onMoodChange(moodDescription)
  }, [onMoodChange, colors])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    canvas.width = 400
    canvas.height = 300

    // Set up canvas
    ctx.lineCap = 'round'
    ctx.lineJoin = 'round'
    ctx.fillStyle = 'rgba(15, 23, 42, 0.8)'
    ctx.fillRect(0, 0, canvas.width, canvas.height)
  }, [])

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement>) => {
    setIsDrawing(true)
    draw(e)
  }

  const draw = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return

    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const rect = canvas.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    ctx.globalCompositeOperation = 'source-over'
    ctx.strokeStyle = currentColor
    ctx.lineWidth = brushSize
    ctx.lineTo(x, y)
    ctx.stroke()
    ctx.beginPath()
    ctx.moveTo(x, y)

    // Add some sparkle effects
    if (Math.random() > 0.8) {
      ctx.save()
      ctx.fillStyle = currentColor + '40'
      ctx.beginPath()
      ctx.arc(x + (Math.random() - 0.5) * 20, y + (Math.random() - 0.5) * 20, Math.random() * 3 + 1, 0, Math.PI * 2)
      ctx.fill()
      ctx.restore()
    }

    generateMoodDescription()
  }

  const stopDrawing = () => {
    setIsDrawing(false)
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    ctx.beginPath()
  }

  const clearCanvas = () => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    
    ctx.fillStyle = 'rgba(15, 23, 42, 0.8)'
    ctx.fillRect(0, 0, canvas.width, canvas.height)
    onMoodChange("")
    setMoodIntensity(0)
  }

  return (
    <motion.div
      className="space-y-6"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.4, duration: 0.6 }}
    >
      {/* Canvas */}
      <div className="relative">
        <motion.canvas
          ref={canvasRef}
          className="border-2 border-white/20 rounded-2xl cursor-crosshair bg-slate-800/50 backdrop-blur-sm"
          onMouseDown={startDrawing}
          onMouseMove={draw}
          onMouseUp={stopDrawing}
          onMouseLeave={stopDrawing}
          whileHover={{ scale: 1.02 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        />
        
        {/* Mood intensity indicator */}
        <motion.div
          className="absolute top-4 right-4 flex items-center space-x-2 bg-black/50 rounded-full px-3 py-2 backdrop-blur-sm"
          animate={{ opacity: moodIntensity > 0 ? 1 : 0.5 }}
        >
          <Sparkles className="w-4 h-4 text-yellow-400" />
          <div className="w-16 h-2 bg-white/20 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${moodIntensity * 100}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </motion.div>

        {/* Instructions overlay */}
        {!selectedMood && (
          <motion.div
            className="absolute inset-0 flex items-center justify-center bg-black/30 rounded-2xl backdrop-blur-sm"
            initial={{ opacity: 1 }}
            animate={{ opacity: selectedMood ? 0 : 1 }}
            transition={{ duration: 0.3 }}
          >
            <div className="text-center text-white">
              <Palette className="w-12 h-12 mx-auto mb-4 text-purple-400" />
              <p className="text-lg font-medium mb-2">Express Your Mood</p>
              <p className="text-sm text-slate-300">Draw, scribble, or paint how you feel</p>
            </div>
          </motion.div>
        )}
      </div>

      {/* Color Palette */}
      <div className="flex flex-wrap gap-3 justify-center">
        {colors.map((colorObj, index) => (
          <motion.button
            key={colorObj.color}
            className={`w-12 h-12 rounded-full border-2 transition-all duration-300 ${
              currentColor === colorObj.color 
                ? 'border-white scale-110 shadow-lg' 
                : 'border-white/30 hover:border-white/60 hover:scale-105'
            }`}
            style={{ backgroundColor: colorObj.color }}
            onClick={() => setCurrentColor(colorObj.color)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 + index * 0.1, duration: 0.4 }}
            title={colorObj.mood}
          />
        ))}
      </div>

      {/* Controls */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <span className="text-sm text-slate-300">Brush Size:</span>
            <input
              type="range"
              min="2"
              max="30"
              value={brushSize}
              onChange={(e) => setBrushSize(Number(e.target.value))}
              className="w-20 accent-purple-500"
            />
            <span className="text-sm text-slate-300 w-8">{brushSize}</span>
          </div>
        </div>

        <motion.button
          onClick={clearCanvas}
          className="flex items-center space-x-2 px-4 py-2 bg-white/10 hover:bg-white/20 rounded-full text-white transition-all duration-300"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <RotateCcw className="w-4 h-4" />
          <span className="text-sm">Clear</span>
        </motion.button>
      </div>

      {/* Mood Display */}
      {selectedMood && (
        <motion.div
          className="p-4 bg-gradient-to-r from-purple-500/20 to-cyan-500/20 rounded-xl border border-purple-500/30 backdrop-blur-sm"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <p className="text-white text-center font-medium">{selectedMood}</p>
        </motion.div>
      )}
    </motion.div>
  )
} 