'use client'

import { motion } from 'framer-motion'
import { User, Bot, Sparkles, Music } from 'lucide-react'

interface Message {
  id: string
  type: 'user' | 'assistant'
  content: string
  timestamp: Date
  isTyping?: boolean
  songs?: Song[]
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
}

interface MessageBubbleProps {
  message: Message
}

export function MessageBubble({ message }: MessageBubbleProps) {
  const isUser = message.type === 'user'
  
  // Add personality to AI responses
  const getAIPersonality = () => {
    const personalities = [
      { emoji: '🎵', name: 'Melody' },
      { emoji: '🎸', name: 'Rocco' },
      { emoji: '🎤', name: 'Aria' },
      { emoji: '🎹', name: 'Harmony' }
    ]
    return personalities[Math.floor(Math.random() * personalities.length)]
  }

  const aiPersonality = !isUser ? getAIPersonality() : null
  
  return (
    <motion.div 
      className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-6`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className={`flex max-w-[85%] ${isUser ? 'flex-row-reverse' : 'flex-row'} items-start space-x-3`}>
        {/* Enhanced Avatar */}
        <motion.div 
          className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center relative ${
            isUser 
              ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg' 
              : 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg'
          }`}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          {isUser ? (
            <User className="w-5 h-5" />
          ) : (
            <div className="relative">
              <Bot className="w-5 h-5" />
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute -top-1 -right-1 w-3 h-3 bg-yellow-400 rounded-full flex items-center justify-center"
              >
                <Sparkles className="w-1.5 h-1.5 text-white" />
              </motion.div>
            </div>
          )}
        </motion.div>
        
        {/* Message content */}
        <div className={`${isUser ? 'mr-3' : 'ml-3'} space-y-1`}>
          {/* AI Personality indicator */}
          {!isUser && aiPersonality && (
            <div className="flex items-center space-x-2 text-xs text-gray-500">
              <span>{aiPersonality.emoji}</span>
              <span className="font-medium">{aiPersonality.name}</span>
              <span>•</span>
              <span>AI Music Expert</span>
            </div>
          )}
          
          <motion.div 
            className={`rounded-2xl px-4 py-3 relative ${
              isUser 
                ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg' 
                : 'bg-white text-gray-900 border border-gray-200 shadow-sm'
            }`}
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.2 }}
          >
            {/* Message tail */}
            <div className={`absolute top-3 ${
              isUser 
                ? 'right-0 translate-x-1/2 border-l-8 border-l-blue-500 border-t-8 border-t-transparent border-b-8 border-b-transparent' 
                : 'left-0 -translate-x-1/2 border-r-8 border-r-white border-t-8 border-t-transparent border-b-8 border-b-transparent'
            } w-0 h-0`}></div>
            
            <p className="text-sm leading-relaxed whitespace-pre-wrap">
              {message.content}
            </p>
            
            {/* Add music note animation for AI messages */}
            {!isUser && (
              <motion.div
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full flex items-center justify-center"
              >
                <Music className="w-3 h-3 text-white" />
              </motion.div>
            )}
          </motion.div>
          
          {/* Enhanced Timestamp */}
          <div className={`text-xs text-gray-500 flex items-center space-x-1 ${isUser ? 'justify-end' : 'justify-start'}`}>
            <span>{message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
            {!isUser && (
              <>
                <span>•</span>
                <span className="text-green-500">✓ Delivered</span>
              </>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  )
} 