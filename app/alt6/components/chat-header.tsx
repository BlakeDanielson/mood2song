'use client'

import { motion } from 'framer-motion'
import { Music, MessageCircle, Settings, MoreHorizontal, Sparkles, Zap, Heart } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

export function ChatHeader() {
  return (
    <header className="border-b border-gray-200 bg-gradient-to-r from-blue-50 to-purple-50 px-4 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="relative">
            <motion.div
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
              className="w-12 h-12 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full flex items-center justify-center shadow-lg"
            >
              <Music className="w-6 h-6 text-white" />
            </motion.div>
            <motion.div
              animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="absolute -top-1 -right-1 w-4 h-4 bg-yellow-400 rounded-full flex items-center justify-center"
            >
              <Sparkles className="w-2 h-2 text-white" />
            </motion.div>
          </div>
          
          <div className="space-y-1">
            <div className="flex items-center space-x-2">
              <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                MoodTune AI
              </h1>
              <Badge className="bg-green-100 text-green-700 text-xs px-2 py-1">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-1 animate-pulse"></div>
                Online
              </Badge>
            </div>
            <p className="text-sm text-gray-600 flex items-center space-x-1">
              <Zap className="w-3 h-3 text-yellow-500" />
              <span>Your AI music companion • Powered by advanced mood detection</span>
            </p>
          </div>
        </div>
        
        <div className="hidden md:flex items-center space-x-3">
          <div className="flex items-center space-x-2 bg-white/70 rounded-full px-3 py-1 border border-gray-200">
            <Heart className="w-4 h-4 text-red-500" />
            <span className="text-xs font-medium text-gray-700">10M+ songs</span>
          </div>
          <div className="flex items-center space-x-2 bg-white/70 rounded-full px-3 py-1 border border-gray-200">
            <Sparkles className="w-4 h-4 text-purple-500" />
            <span className="text-xs font-medium text-gray-700">AI-powered</span>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <Button variant="ghost" size="sm" className="text-gray-500 hover:text-blue-600 hover:bg-blue-50">
            <MessageCircle className="w-4 h-4" />
          </Button>
          <Button variant="ghost" size="sm" className="text-gray-500 hover:text-purple-600 hover:bg-purple-50">
            <Settings className="w-4 h-4" />
          </Button>
          <Button variant="ghost" size="sm" className="text-gray-500 hover:text-gray-700">
            <MoreHorizontal className="w-4 h-4" />
          </Button>
        </div>
      </div>
      
      <div className="mt-3 flex items-center justify-center space-x-6 text-xs text-gray-600">
        <div className="flex items-center space-x-1">
          <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
          <span>Mood Analysis</span>
        </div>
        <div className="flex items-center space-x-1">
          <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
          <span>Smart Recommendations</span>
        </div>
        <div className="flex items-center space-x-1">
          <div className="w-2 h-2 bg-pink-400 rounded-full"></div>
          <span>Instant Playlists</span>
        </div>
        <div className="flex items-center space-x-1">
          <div className="w-2 h-2 bg-green-400 rounded-full"></div>
          <span>Multi-Platform</span>
        </div>
      </div>
    </header>
  )
} 