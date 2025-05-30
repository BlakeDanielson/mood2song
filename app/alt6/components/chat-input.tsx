'use client'

import { useState, KeyboardEvent } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Send, Paperclip, Mic, Sparkles, Music, Heart, Zap } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'

interface ChatInputProps {
  onSendMessage: (message: string) => void
  disabled?: boolean
}

export function ChatInput({ onSendMessage, disabled = false }: ChatInputProps) {
  const [message, setMessage] = useState('')
  const [showSuggestions, setShowSuggestions] = useState(true)

  const suggestions = [
    { text: "I need happy music", icon: "😊", color: "from-yellow-400 to-orange-500" },
    { text: "Recommend some rock songs", icon: "🎸", color: "from-red-500 to-pink-500" },
    { text: "What's good for working out?", icon: "💪", color: "from-green-500 to-emerald-500" },
    { text: "I'm feeling sad today", icon: "😢", color: "from-blue-500 to-indigo-500" },
    { text: "Play some jazz", icon: "🎷", color: "from-purple-500 to-violet-500" },
    { text: "Chill music for studying", icon: "📚", color: "from-teal-500 to-cyan-500" }
  ]

  const handleSend = () => {
    if (message.trim() && !disabled) {
      onSendMessage(message.trim())
      setMessage('')
      setShowSuggestions(false)
    }
  }

  const handleSuggestionClick = (suggestion: string) => {
    if (!disabled) {
      onSendMessage(suggestion)
      setShowSuggestions(false)
    }
  }

  const handleKeyPress = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey && !disabled) {
      e.preventDefault()
      handleSend()
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (!disabled) {
      setMessage(e.target.value)
      if (e.target.value.length === 0) {
        setShowSuggestions(true)
      } else {
        setShowSuggestions(false)
      }
    }
  }

  return (
    <div className={`border-t border-gray-200 bg-gradient-to-r from-gray-50 to-white p-4 ${disabled ? 'opacity-60' : ''}`}>
      <div className="max-w-4xl mx-auto space-y-4">
        {/* Suggestions */}
        <AnimatePresence>
          {showSuggestions && message.length === 0 && !disabled && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-3"
            >
              <div className="text-center">
                <h3 className="text-sm font-medium text-gray-700 mb-2">Try asking me about:</h3>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                {suggestions.map((suggestion, index) => (
                  <motion.button
                    key={index}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleSuggestionClick(suggestion.text)}
                    disabled={disabled}
                    className={`p-3 rounded-xl bg-gradient-to-r ${suggestion.color} text-white text-sm font-medium shadow-md hover:shadow-lg transition-all duration-200 flex items-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed`}
                  >
                    <span className="text-lg">{suggestion.icon}</span>
                    <span className="truncate">{suggestion.text}</span>
                  </motion.button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Input area */}
        <div className="flex items-end space-x-3">
          {/* Attachment button */}
          <motion.div whileHover={{ scale: disabled ? 1 : 1.1 }} whileTap={{ scale: disabled ? 1 : 0.9 }}>
            <Button
              variant="ghost"
              size="sm"
              disabled={disabled}
              className="p-3 text-gray-500 hover:text-purple-600 hover:bg-purple-50 mb-2 rounded-full disabled:opacity-50"
            >
              <Paperclip className="w-5 h-5" />
            </Button>
          </motion.div>
          
          {/* Message input */}
          <div className="flex-1 relative">
            <div className="relative">
              <Textarea
                value={message}
                onChange={handleInputChange}
                onKeyPress={handleKeyPress}
                disabled={disabled}
                placeholder={disabled ? "Reconnecting to music services..." : "Ask me about music recommendations, genres, moods, or anything music-related..."}
                className="min-h-[52px] max-h-32 resize-none border-2 border-gray-200 focus:border-purple-400 focus:ring-purple-400 pr-16 rounded-2xl bg-white shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
                rows={1}
              />
              
              {/* Voice input button */}
              <motion.div 
                className="absolute right-3 bottom-3"
                whileHover={{ scale: disabled ? 1 : 1.1 }} 
                whileTap={{ scale: disabled ? 1 : 0.9 }}
              >
                <Button
                  variant="ghost"
                  size="sm"
                  disabled={disabled}
                  className="p-2 text-gray-500 hover:text-red-500 hover:bg-red-50 rounded-full disabled:opacity-50"
                >
                  <Mic className="w-4 h-4" />
                </Button>
              </motion.div>
            </div>
            
            {/* Character count */}
            {message.length > 0 && !disabled && (
              <div className="text-xs text-gray-400 mt-1 text-right">
                {message.length}/500
              </div>
            )}
          </div>
          
          {/* Send button */}
          <motion.div 
            whileHover={{ scale: disabled ? 1 : 1.05 }} 
            whileTap={{ scale: disabled ? 1 : 0.95 }}
          >
            <Button
              onClick={handleSend}
              disabled={!message.trim() || disabled}
              className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white p-3 mb-2 rounded-full disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
            >
              <Send className="w-5 h-5" />
            </Button>
          </motion.div>
        </div>
        
        {/* Enhanced helper text with features */}
        <div className="text-center space-y-2">
          <div className="flex items-center justify-center space-x-4 text-xs text-gray-500">
            <div className="flex items-center space-x-1">
              <Sparkles className="w-3 h-3 text-purple-400" />
              <span>AI-Powered</span>
            </div>
            <div className="flex items-center space-x-1">
              <Music className="w-3 h-3 text-blue-400" />
              <span>10M+ Songs</span>
            </div>
            <div className="flex items-center space-x-1">
              <Heart className="w-3 h-3 text-red-400" />
              <span>Personalized</span>
            </div>
            <div className="flex items-center space-x-1">
              <Zap className="w-3 h-3 text-yellow-400" />
              <span>Instant Results</span>
            </div>
          </div>
          <p className="text-xs text-gray-400">
            {disabled ? "Reconnecting to provide you with the best music recommendations..." : "Mood2Song AI understands your emotions and musical preferences to create the perfect soundtrack for any moment."}
          </p>
        </div>
      </div>
    </div>
  )
} 