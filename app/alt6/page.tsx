'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChatInterface } from './components/chat-interface'
import { ChatHeader } from './components/chat-header'
import { ChatInput } from './components/chat-input'
import { toast, Toaster } from 'sonner'

interface ApiSong {
  id: string
  title: string
  artist: string
  album: string
  duration: string
  genre: string
  mood: string
  image: string
  energy: number
  danceability: number
  valence: number
  spotifyUrl?: string
}

interface Song {
  id: string
  title: string
  artist: string
  album: string
  duration: string
  genre: string
  mood: string
  spotifyUrl?: string
  image?: string
  energy?: number
}

interface Message {
  id: string
  type: 'user' | 'assistant'
  content: string
  timestamp: Date
  isTyping?: boolean
  songs?: Song[]
  error?: boolean
}

// Transform API song data to component format
const transformApiSong = (apiSong: ApiSong): Song => ({
  id: apiSong.id,
  title: apiSong.title,
  artist: apiSong.artist,
  album: apiSong.album,
  duration: apiSong.duration,
  genre: apiSong.genre,
  mood: apiSong.mood,
  spotifyUrl: apiSong.spotifyUrl,
  image: apiSong.image,
  energy: Math.round(apiSong.energy * 100)
})

export default function Alt6Page() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'assistant',
      content: "Hey there! 🎵 I'm Mood2Song AI, your personal music companion! I'm here to help you discover amazing songs that perfectly match your mood, vibe, or any specific moment you're experiencing.\n\nWhether you're feeling happy, sad, energetic, or just need something to vibe to - I've got you covered with personalized recommendations from over 10 million tracks! ✨\n\nWhat kind of musical journey shall we embark on today?",
      timestamp: new Date()
    }
  ])
  const [isTyping, setIsTyping] = useState(false)
  const [isConnected, setIsConnected] = useState(true)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const detectMoodFromInput = (input: string): string => {
    const lowerInput = input.toLowerCase()
    
    if (lowerInput.includes('happy') || lowerInput.includes('upbeat') || lowerInput.includes('energetic') || lowerInput.includes('joy') || lowerInput.includes('excited')) {
      return 'happy'
    } else if (lowerInput.includes('sad') || lowerInput.includes('melancholy') || lowerInput.includes('emotional') || lowerInput.includes('cry') || lowerInput.includes('down') || lowerInput.includes('depressed')) {
      return 'sad'
    } else if (lowerInput.includes('chill') || lowerInput.includes('relax') || lowerInput.includes('calm') || lowerInput.includes('peaceful') || lowerInput.includes('study') || lowerInput.includes('focus')) {
      return 'chill'
    } else if (lowerInput.includes('workout') || lowerInput.includes('gym') || lowerInput.includes('exercise') || lowerInput.includes('run') || lowerInput.includes('fitness') || lowerInput.includes('pump')) {
      return 'energetic'
    } else if (lowerInput.includes('rock') || lowerInput.includes('metal') || lowerInput.includes('guitar') || lowerInput.includes('headbang')) {
      return 'rock'
    } else if (lowerInput.includes('jazz') || lowerInput.includes('smooth') || lowerInput.includes('sophisticated') || lowerInput.includes('classy')) {
      return 'jazz'
    } else if (lowerInput.includes('love') || lowerInput.includes('romantic') || lowerInput.includes('date') || lowerInput.includes('valentine')) {
      return 'romantic'
    }
    
    return 'mixed' // Default for general requests
  }

  const generatePersonaFromMood = (mood: string): string => {
    const personas = {
      happy: 'energy-booster',
      sad: 'soul-healer',
      chill: 'vibe-curator',
      energetic: 'energy-booster',
      rock: 'explorer',
      jazz: 'vibe-curator',
      romantic: 'soul-healer',
      mixed: 'explorer'
    }
    return personas[mood as keyof typeof personas] || 'explorer'
  }

  const handleSendMessage = async (content: string) => {
    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content,
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setIsTyping(true)

    try {
      // Detect mood and generate persona from user input
      const detectedMood = detectMoodFromInput(content)
      const persona = generatePersonaFromMood(detectedMood)

      // Call the music API
      const response = await fetch('/api/music', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          mood: content, // Send the full user input as mood
          persona: persona,
          preferences: []
        }),
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data = await response.json()

      if (data.success) {
        // Transform API songs to component format
        const transformedSongs = (data.songs || []).map(transformApiSong)
        
        const aiResponse: Message = {
          id: (Date.now() + 1).toString(),
          type: 'assistant',
          content: data.message || generateContextualResponse(detectedMood),
          timestamp: new Date(),
          songs: transformedSongs
        }

        setMessages(prev => [...prev, aiResponse])
        toast.success('Found some great music for you!')
      } else {
        throw new Error(data.error || 'Failed to get music recommendations')
      }
    } catch (error) {
      console.error('API Error:', error)
      
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'assistant',
        content: "I'm having trouble connecting to my music database right now. 😅 But don't worry! Let me try again in a moment, or you can rephrase your request and I'll do my best to help you discover some amazing music! 🎵",
        timestamp: new Date(),
        error: true
      }

      setMessages(prev => [...prev, errorMessage])
      toast.error('Failed to get recommendations. Please try again!')
      setIsConnected(false)
      
      // Retry connection after 3 seconds
      setTimeout(() => setIsConnected(true), 3000)
    } finally {
      setIsTyping(false)
    }
  }

  const generateContextualResponse = (mood: string): string => {
    const responses = {
      happy: "🌟 I can feel those amazing positive vibes! Here are some absolutely fantastic upbeat tracks that'll keep your energy soaring and put the biggest smile on your face. These songs are scientifically proven mood boosters! ✨",
      sad: "💙 I hear you, and it's completely okay to feel this way. Music can be incredibly healing during tough times. Here are some beautiful, soul-touching tracks that might resonate with your current emotions. Sometimes we need to feel our feelings, and these songs will be there with you. 🤗",
      chill: "🧘‍♀️ Perfect choice for some zen time! Here are some incredibly soothing, atmospheric tracks that'll help you unwind and find your inner peace. These are perfect for creating that perfect chill ambiance. 🌙",
      energetic: "💪 TIME TO GET PUMPED! Here's your ultimate high-energy playlist that'll push you to crush those goals! These tracks are guaranteed to get your adrenaline pumping and keep you motivated! 🔥",
      rock: "🤘 ROCK ON! I love your energy! Here are some absolutely legendary rock anthems with mind-blowing guitar work that'll make you want to air guitar like nobody's watching. Get ready to feel the power! ⚡",
      jazz: "🎷 Ah, a person of refined taste! Here are some absolutely timeless jazz classics that'll transport you to a smoky jazz club. These sophisticated melodies are pure musical poetry. So smooth! ✨",
      romantic: "💕 Aww, love is in the air! Here are some absolutely swoon-worthy romantic tracks perfect for setting the mood. Whether it's a special date night or just celebrating love, these songs will make hearts flutter! 🌹",
      mixed: "🎶 Great question! I'd love to help you discover some amazing music! Based on your message, here are some fantastic tracks across different genres that I think you'll absolutely love. Each one has its own unique vibe and story to tell! ✨"
    }
    
    return responses[mood as keyof typeof responses] || responses.mixed
  }

  return (
    <div className="h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 flex flex-col relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 left-1/4 w-80 h-80 bg-gradient-to-r from-indigo-400/15 to-pink-400/15 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      {/* Connection Status */}
      {!isConnected && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-yellow-500/20 border-b border-yellow-500/30 p-2 text-center"
        >
          <p className="text-yellow-800 text-sm">
            🔄 Reconnecting to music services...
          </p>
        </motion.div>
      )}

      <div className="relative z-10 flex flex-col h-full">
        <ChatHeader />
        
        <div className="flex-1 overflow-hidden">
          <ChatInterface 
            messages={messages} 
            isTyping={isTyping}
            messagesEndRef={messagesEndRef}
          />
        </div>
        
        <ChatInput 
          onSendMessage={handleSendMessage} 
          disabled={!isConnected}
        />
      </div>

      {/* Toast Notifications */}
      <Toaster 
        position="top-right"
        toastOptions={{
          style: {
            background: 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            color: '#1f2937',
          },
        }}
      />
    </div>
  )
} 