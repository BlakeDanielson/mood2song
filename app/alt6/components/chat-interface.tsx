'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { MessageBubble } from './message-bubble'
import { TypingIndicator } from './typing-indicator'
import { SongCard } from './song-card'

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

interface ChatInterfaceProps {
  messages: Message[]
  isTyping: boolean
  messagesEndRef: React.RefObject<HTMLDivElement>
}

export function ChatInterface({ messages, isTyping, messagesEndRef }: ChatInterfaceProps) {
  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
      <AnimatePresence>
        {messages.map((message, index) => (
          <motion.div
            key={message.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <MessageBubble message={message} />
            
            {/* Song recommendations */}
            {message.songs && message.songs.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="mt-3 space-y-2"
              >
                {message.songs.map((song, songIndex) => (
                  <motion.div
                    key={song.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.7 + songIndex * 0.1 }}
                  >
                    <SongCard song={song} />
                  </motion.div>
                ))}
              </motion.div>
            )}
          </motion.div>
        ))}
      </AnimatePresence>
      
      {isTyping && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
        >
          <TypingIndicator />
        </motion.div>
      )}
      
      <div ref={messagesEndRef} />
    </div>
  )
} 