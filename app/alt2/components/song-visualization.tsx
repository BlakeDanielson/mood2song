"use client"

import { motion, AnimatePresence } from "framer-motion"
import { Play, Pause, Heart, Share, ExternalLink, Loader2 } from "lucide-react"
import { useState } from "react"

interface Song {
  id: string
  title: string
  artist: string
  album?: string
  genre?: string
  year?: number
  duration?: string
  energy?: number
  mood?: string
  preview_url?: string
}

interface SongVisualizationProps {
  songs: Song[]
  mood: string
  persona: string | null
  isLoading: boolean
}

export function SongVisualization({ songs, mood, persona, isLoading }: SongVisualizationProps) {
  const [playingId, setPlayingId] = useState<string | null>(null)
  const [likedSongs, setLikedSongs] = useState<Set<string>>(new Set())

  const togglePlay = (songId: string) => {
    setPlayingId(playingId === songId ? null : songId)
  }

  const toggleLike = (songId: string) => {
    const newLiked = new Set(likedSongs)
    if (newLiked.has(songId)) {
      newLiked.delete(songId)
    } else {
      newLiked.add(songId)
    }
    setLikedSongs(newLiked)
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <motion.div
          className="text-center"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
        >
          <motion.div
            className="w-20 h-20 mx-auto mb-8 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-full flex items-center justify-center"
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          >
            <Loader2 className="w-10 h-10 text-white" />
          </motion.div>
          <h3 className="text-2xl font-bold text-white mb-4">Discovering Your Perfect Soundtrack</h3>
          <p className="text-slate-300">Analyzing your mood and finding the perfect musical match...</p>
        </motion.div>
      </div>
    )
  }

  if (songs.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <motion.div
          className="text-center max-w-md"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="w-24 h-24 mx-auto mb-8 bg-gradient-to-r from-slate-600 to-slate-700 rounded-full flex items-center justify-center">
            <Play className="w-12 h-12 text-slate-400" />
          </div>
          <h3 className="text-2xl font-bold text-white mb-4">No Songs Found</h3>
          <p className="text-slate-300">Try adjusting your mood or selecting a different persona to discover new music.</p>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="min-h-screen py-20">
      {/* Header */}
      <motion.div
        className="text-center mb-16"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-4xl lg:text-6xl font-bold bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-6">
          Your Musical Journey
        </h2>
        <div className="flex flex-wrap items-center justify-center gap-4 text-slate-300">
          {mood && (
            <div className="px-4 py-2 bg-purple-500/20 rounded-full border border-purple-500/30">
              <span className="text-sm">Mood: {mood}</span>
            </div>
          )}
          {persona && (
            <div className="px-4 py-2 bg-cyan-500/20 rounded-full border border-cyan-500/30">
              <span className="text-sm">Persona: {persona}</span>
            </div>
          )}
          <div className="px-4 py-2 bg-green-500/20 rounded-full border border-green-500/30">
            <span className="text-sm">{songs.length} songs found</span>
          </div>
        </div>
      </motion.div>

      {/* Songs Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 max-w-7xl mx-auto">
        <AnimatePresence>
          {songs.map((song, index) => {
            const isPlaying = playingId === song.id
            const isLiked = likedSongs.has(song.id)
            const energy = song.energy || Math.random()

            return (
              <motion.div
                key={song.id}
                className="relative group"
                initial={{ opacity: 0, y: 50, rotateX: 45 }}
                animate={{ opacity: 1, y: 0, rotateX: 0 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ 
                  delay: index * 0.05, 
                  duration: 0.6,
                  type: "spring",
                  stiffness: 100
                }}
                whileHover={{ 
                  scale: 1.05, 
                  rotateY: 5,
                  z: 50
                }}
                style={{ perspective: 1000 }}
              >
                {/* Card */}
                <motion.div
                  className="relative h-80 bg-gradient-to-br from-slate-800/80 to-slate-900/80 rounded-2xl overflow-hidden border border-white/10 backdrop-blur-sm"
                  style={{ transformStyle: 'preserve-3d' }}
                  animate={{
                    borderColor: isPlaying ? 'rgba(139, 92, 246, 0.5)' : 'rgba(255, 255, 255, 0.1)'
                  }}
                  transition={{ duration: 0.3 }}
                >
                  {/* Energy Visualization */}
                  <motion.div
                    className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-500 to-cyan-500"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: energy }}
                    transition={{ delay: index * 0.1, duration: 1 }}
                  />

                  {/* Background Pattern */}
                  <div className="absolute inset-0 opacity-10">
                    <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent" />
                    <motion.div
                      className="absolute top-4 right-4 w-16 h-16 bg-purple-500/30 rounded-full"
                      animate={{ 
                        scale: isPlaying ? [1, 1.2, 1] : 1,
                        opacity: isPlaying ? [0.3, 0.6, 0.3] : 0.3
                      }}
                      transition={{ 
                        duration: 2, 
                        repeat: isPlaying ? Infinity : 0,
                        ease: "easeInOut"
                      }}
                    />
                  </div>

                  {/* Content */}
                  <div className="relative z-10 p-6 h-full flex flex-col justify-between">
                    {/* Song Info */}
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-white mb-2 line-clamp-2">
                        {song.title}
                      </h3>
                      <p className="text-slate-300 text-sm mb-1">{song.artist}</p>
                      {song.album && (
                        <p className="text-slate-400 text-xs mb-3">{song.album}</p>
                      )}
                      
                      {/* Metadata */}
                      <div className="space-y-2">
                        {song.genre && (
                          <span className="inline-block px-2 py-1 bg-white/10 rounded-full text-xs text-slate-300">
                            {song.genre}
                          </span>
                        )}
                        {song.year && (
                          <span className="inline-block px-2 py-1 bg-white/10 rounded-full text-xs text-slate-300 ml-2">
                            {song.year}
                          </span>
                        )}
                        {song.mood && (
                          <div className="mt-2">
                            <span className="text-xs text-slate-400">Mood: {song.mood}</span>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Controls */}
                    <div className="flex items-center justify-between pt-4 border-t border-white/10">
                      <div className="flex items-center space-x-2">
                        <motion.button
                          onClick={() => togglePlay(song.id)}
                          className="w-10 h-10 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-full flex items-center justify-center text-white"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          animate={{
                            boxShadow: isPlaying 
                              ? '0 0 20px rgba(139, 92, 246, 0.5)' 
                              : '0 0 0px rgba(139, 92, 246, 0)'
                          }}
                        >
                          {isPlaying ? (
                            <Pause className="w-5 h-5" />
                          ) : (
                            <Play className="w-5 h-5 ml-0.5" />
                          )}
                        </motion.button>

                        {song.duration && (
                          <span className="text-xs text-slate-400">{song.duration}</span>
                        )}
                      </div>

                      <div className="flex items-center space-x-2">
                        <motion.button
                          onClick={() => toggleLike(song.id)}
                          className={`p-2 rounded-full transition-colors ${
                            isLiked ? 'text-red-400' : 'text-slate-400 hover:text-red-400'
                          }`}
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          <Heart className={`w-4 h-4 ${isLiked ? 'fill-current' : ''}`} />
                        </motion.button>

                        <motion.button
                          className="p-2 rounded-full text-slate-400 hover:text-white transition-colors"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          <Share className="w-4 h-4" />
                        </motion.button>

                        <motion.button
                          className="p-2 rounded-full text-slate-400 hover:text-white transition-colors"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          <ExternalLink className="w-4 h-4" />
                        </motion.button>
                      </div>
                    </div>
                  </div>

                  {/* Playing Indicator */}
                  {isPlaying && (
                    <motion.div
                      className="absolute inset-0 border-2 border-purple-500 rounded-2xl"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.3 }}
                    />
                  )}
                </motion.div>

                {/* 3D Shadow */}
                <motion.div
                  className="absolute inset-0 bg-slate-800/50 rounded-2xl opacity-30 -z-10"
                  style={{
                    filter: 'blur(20px)',
                    transform: 'translateY(10px) translateZ(-50px)'
                  }}
                  animate={{
                    opacity: isPlaying ? 0.6 : 0.3,
                    scale: isPlaying ? 1.1 : 1
                  }}
                  transition={{ duration: 0.3 }}
                />
              </motion.div>
            )
          })}
        </AnimatePresence>
      </div>

      {/* Stats */}
      <motion.div
        className="mt-16 text-center"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.6 }}
      >
        <div className="inline-flex items-center space-x-6 px-8 py-4 bg-black/30 rounded-full border border-white/10 backdrop-blur-sm">
          <div className="text-center">
            <div className="text-2xl font-bold text-white">{songs.length}</div>
            <div className="text-xs text-slate-400">Songs</div>
          </div>
          <div className="w-px h-8 bg-white/20" />
          <div className="text-center">
            <div className="text-2xl font-bold text-red-400">{likedSongs.size}</div>
            <div className="text-xs text-slate-400">Liked</div>
          </div>
          <div className="w-px h-8 bg-white/20" />
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-400">{playingId ? '1' : '0'}</div>
            <div className="text-xs text-slate-400">Playing</div>
          </div>
        </div>
      </motion.div>
    </div>
  )
} 