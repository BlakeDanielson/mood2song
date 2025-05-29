'use client'

import { motion } from 'framer-motion'
import { Play, Heart, ExternalLink, Clock, Star, TrendingUp } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { useState } from 'react'

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

interface SongCardProps {
  song: Song
}

export function SongCard({ song }: SongCardProps) {
  const [isLiked, setIsLiked] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)

  const getMoodColor = (mood: string) => {
    const moodColors = {
      'Energetic': 'from-orange-400 to-red-500',
      'Happy': 'from-yellow-400 to-orange-500',
      'Chill': 'from-blue-400 to-cyan-500',
      'Romantic': 'from-pink-400 to-rose-500',
      'Melancholic': 'from-gray-400 to-blue-600',
      'Confident': 'from-purple-400 to-indigo-500',
      'Epic': 'from-indigo-500 to-purple-600',
      'Motivational': 'from-green-400 to-emerald-500'
    }
    return moodColors[mood as keyof typeof moodColors] || 'from-gray-400 to-gray-500'
  }

  const getRandomRating = () => (4.1 + Math.random() * 0.8).toFixed(1)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.02, y: -2 }}
      transition={{ duration: 0.2 }}
    >
      <Card className="p-4 bg-gradient-to-br from-white to-gray-50 border border-gray-200 hover:shadow-xl hover:border-purple-200 transition-all duration-300 relative overflow-hidden">
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-500 to-pink-500"></div>
        </div>
        
        <div className="relative flex items-center space-x-4">
          {/* Enhanced Album Art */}
          <motion.div 
            className={`w-16 h-16 bg-gradient-to-br ${getMoodColor(song.mood)} rounded-xl flex items-center justify-center flex-shrink-0 relative shadow-lg`}
            whileHover={{ rotate: 5 }}
            whileTap={{ scale: 0.95 }}
          >
            <Play className="w-6 h-6 text-white" />
            {isPlaying && (
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
                className="absolute inset-0 border-2 border-white rounded-xl"
              />
            )}
            {/* Trending indicator */}
            <div className="absolute -top-1 -right-1 w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
              <TrendingUp className="w-2.5 h-2.5 text-white" />
            </div>
          </motion.div>
          
          {/* Song Info */}
          <div className="flex-1 min-w-0 space-y-1">
            <h4 className="font-semibold text-gray-900 truncate text-base">{song.title}</h4>
            <p className="text-sm text-gray-600 truncate font-medium">{song.artist}</p>
            <p className="text-xs text-gray-500 truncate">{song.album}</p>
            
            {/* Rating */}
            <div className="flex items-center space-x-1">
              <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
              <span className="text-xs text-gray-600 font-medium">{getRandomRating()}</span>
              <span className="text-xs text-gray-400">• {Math.floor(Math.random() * 1000 + 100)}K plays</span>
            </div>
          </div>
          
          {/* Metadata */}
          <div className="flex flex-col items-end space-y-2">
            <div className="flex items-center space-x-2">
              <Badge className={`text-xs px-2 py-1 bg-gradient-to-r ${getMoodColor(song.mood)} text-white border-0`}>
                {song.genre}
              </Badge>
              <Badge variant="outline" className="text-xs px-2 py-1 border-gray-300">
                {song.mood}
              </Badge>
            </div>
            <div className="flex items-center text-xs text-gray-500">
              <Clock className="w-3 h-3 mr-1" />
              {song.duration}
            </div>
          </div>
          
          {/* Actions */}
          <div className="flex items-center space-x-2">
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
              <Button
                variant="ghost"
                size="sm"
                className={`p-2 h-8 w-8 transition-colors ${
                  isLiked ? 'text-red-500 hover:text-red-600' : 'text-gray-400 hover:text-red-500'
                }`}
                onClick={() => setIsLiked(!isLiked)}
              >
                <Heart className={`w-4 h-4 ${isLiked ? 'fill-red-500' : ''}`} />
              </Button>
            </motion.div>
            
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
              <Button
                variant="ghost"
                size="sm"
                className="p-2 h-8 w-8 text-gray-400 hover:text-blue-500"
              >
                <ExternalLink className="w-4 h-4" />
              </Button>
            </motion.div>
            
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                size="sm"
                className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white px-4 py-2 h-9 shadow-lg"
                onClick={() => setIsPlaying(!isPlaying)}
              >
                <Play className="w-3 h-3 mr-1" />
                {isPlaying ? 'Playing' : 'Play'}
              </Button>
            </motion.div>
          </div>
        </div>
        
        {/* Progress bar when playing */}
        {isPlaying && (
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: "100%" }}
            transition={{ duration: 30, ease: "linear" }}
            className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-green-400 to-emerald-400"
          />
        )}
      </Card>
    </motion.div>
  )
} 