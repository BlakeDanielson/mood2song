'use client'

import { motion } from 'framer-motion'
import { Bot } from 'lucide-react'

export function TypingIndicator() {
  return (
    <div className="flex justify-start mb-4">
      <div className="flex max-w-[80%] flex-row items-start space-x-2">
        {/* Avatar */}
        <div className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center bg-gray-200 text-gray-600">
          <Bot className="w-4 h-4" />
        </div>
        
        {/* Typing animation */}
        <div className="ml-2">
          <div className="bg-white text-gray-900 border border-gray-200 rounded-lg px-4 py-2">
            <div className="flex items-center space-x-1">
              <span className="text-sm text-gray-500">Music Assistant is typing</span>
              <div className="flex space-x-1">
                {[0, 1, 2].map((i) => (
                  <motion.div
                    key={i}
                    animate={{
                      scale: [1, 1.2, 1],
                      opacity: [0.5, 1, 0.5]
                    }}
                    transition={{
                      duration: 1,
                      repeat: Infinity,
                      delay: i * 0.2
                    }}
                    className="w-1 h-1 bg-gray-400 rounded-full"
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 