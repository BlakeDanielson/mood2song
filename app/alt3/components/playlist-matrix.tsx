"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Play, Pause, Download, Share2, Heart, MoreHorizontal } from "lucide-react"

interface Song {
  id: string
  title: string
  artist: string
  album?: string
  duration?: string
  energy?: number
  mood?: string
}

interface PlaylistMatrixProps {
  songs: Song[]
  mood: string
  persona: string | null
  isLoading: boolean
}

export function PlaylistMatrix({ songs, mood, persona, isLoading }: PlaylistMatrixProps) {
  const [playingId, setPlayingId] = useState<string | null>(null)
  const [likedSongs, setLikedSongs] = useState<Set<string>>(new Set())
  const [matrixRain, setMatrixRain] = useState<Array<{ id: number; x: number; speed: number; chars: string[] }>>([])

  // Matrix rain effect
  useEffect(() => {
    const chars = ['♪', '♫', '♬', '♭', '♯', '𝄞', '𝄢', '𝄡', '𝄠', '𝄟']
    const columns = 20
    const rain = Array.from({ length: columns }, (_, i) => ({
      id: i,
      x: (i / columns) * 100,
      speed: Math.random() * 2 + 1,
      chars: Array.from({ length: 10 }, () => chars[Math.floor(Math.random() * chars.length)])
    }))
    setMatrixRain(rain)
  }, [])

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
      <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
        {/* Matrix Rain Background */}
        <div className="absolute inset-0 opacity-20">
          {matrixRain.map((column) => (
            <motion.div
              key={column.id}
              className="absolute top-0 text-green-400 font-mono text-sm"
              style={{ left: `${column.x}%` }}
              animate={{ y: ['0vh', '100vh'] }}
              transition={{
                duration: 10 / column.speed,
                repeat: Infinity,
                ease: "linear"
              }}
            >
              {column.chars.map((char, index) => (
                <div key={index} className="opacity-80">
                  {char}
                </div>
              ))}
            </motion.div>
          ))}
        </div>

        <motion.div
          className="text-center z-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <motion.div
            className="text-6xl font-mono text-green-400 mb-8"
            animate={{ opacity: [0.3, 1, 0.3] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            LOADING...
          </motion.div>
          <div className="space-y-2 font-mono text-green-300">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
            >
              &gt; Analyzing mood patterns...
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1 }}
            >
              &gt; Matching persona preferences...
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.5 }}
            >
              &gt; Compiling playlist matrix...
            </motion.div>
          </div>
        </motion.div>
      </div>
    )
  }

  if (songs.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <motion.div
          className="text-center font-mono"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <div className="text-4xl text-red-400 mb-4">ERROR 404</div>
          <div className="text-green-400">No songs found in the matrix</div>
          <div className="text-slate-400 mt-2">Try adjusting your parameters</div>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="min-h-screen p-8 relative overflow-hidden">
      {/* Background Matrix Rain */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        {matrixRain.map((column) => (
          <motion.div
            key={column.id}
            className="absolute top-0 text-green-400 font-mono text-xs"
            style={{ left: `${column.x}%` }}
            animate={{ y: ['0vh', '100vh'] }}
            transition={{
              duration: 15 / column.speed,
              repeat: Infinity,
              ease: "linear"
            }}
          >
            {column.chars.map((char, index) => (
              <div key={index} className="opacity-60">
                {char}
              </div>
            ))}
          </motion.div>
        ))}
      </div>

      {/* Header */}
      <motion.div
        className="text-center mb-12 relative z-10"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="font-mono text-green-400 text-sm mb-2">PLAYLIST_MATRIX.EXE</div>
        <h1 className="text-4xl font-bold text-white mb-4">
          <span className="text-green-400">[</span>
          MUSICAL MATRIX
          <span className="text-green-400">]</span>
        </h1>
        <div className="flex justify-center space-x-6 text-sm font-mono">
          {mood && (
            <div className="text-cyan-400">
              MOOD: <span className="text-white">"{mood}"</span>
            </div>
          )}
          {persona && (
            <div className="text-purple-400">
              PERSONA: <span className="text-white">{persona}</span>
            </div>
          )}
          <div className="text-green-400">
            TRACKS: <span className="text-white">{songs.length}</span>
          </div>
        </div>
      </motion.div>

      {/* Playlist Grid */}
      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          className="grid gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          {songs.map((song, index) => {
            const isPlaying = playingId === song.id
            const isLiked = likedSongs.has(song.id)

            return (
              <motion.div
                key={song.id}
                className="group relative"
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05, duration: 0.4 }}
              >
                {/* Matrix Row */}
                <div className={`
                  bg-black/60 backdrop-blur-sm border border-green-400/30 rounded-lg p-4 
                  font-mono text-sm transition-all duration-300 hover:border-green-400/60
                  ${isPlaying ? 'border-cyan-400 bg-cyan-400/10' : ''}
                `}>
                  <div className="grid grid-cols-12 gap-4 items-center">
                    {/* Index */}
                    <div className="col-span-1 text-green-400 text-xs">
                      {String(index + 1).padStart(2, '0')}
                    </div>

                    {/* Play Button */}
                    <div className="col-span-1">
                      <motion.button
                        onClick={() => togglePlay(song.id)}
                        className={`
                          w-8 h-8 rounded border flex items-center justify-center transition-all duration-200
                          ${isPlaying 
                            ? 'border-cyan-400 bg-cyan-400/20 text-cyan-400' 
                            : 'border-green-400/50 text-green-400 hover:border-green-400 hover:bg-green-400/10'
                          }
                        `}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        {isPlaying ? (
                          <Pause className="w-4 h-4" />
                        ) : (
                          <Play className="w-4 h-4" />
                        )}
                      </motion.button>
                    </div>

                    {/* Song Info */}
                    <div className="col-span-6">
                      <div className="text-white font-medium truncate">{song.title}</div>
                      <div className="text-slate-400 text-xs truncate">{song.artist}</div>
                    </div>

                    {/* Album */}
                    <div className="col-span-2 text-slate-300 text-xs truncate">
                      {song.album || 'Unknown'}
                    </div>

                    {/* Duration */}
                    <div className="col-span-1 text-green-400 text-xs">
                      {song.duration || '--:--'}
                    </div>

                    {/* Actions */}
                    <div className="col-span-1 flex items-center justify-end space-x-1">
                      <motion.button
                        onClick={() => toggleLike(song.id)}
                        className={`
                          p-1 rounded transition-colors
                          ${isLiked ? 'text-red-400' : 'text-slate-400 hover:text-red-400'}
                        `}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <Heart className={`w-4 h-4 ${isLiked ? 'fill-current' : ''}`} />
                      </motion.button>
                    </div>
                  </div>

                  {/* Energy Bar */}
                  {song.energy !== undefined && (
                    <motion.div
                      className="mt-2 h-1 bg-slate-800 rounded overflow-hidden"
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{ delay: index * 0.05 + 0.5, duration: 0.8 }}
                    >
                      <motion.div
                        className="h-full bg-gradient-to-r from-green-400 to-cyan-400"
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: song.energy }}
                        transition={{ delay: index * 0.05 + 0.7, duration: 1 }}
                        style={{ transformOrigin: 'left' }}
                      />
                    </motion.div>
                  )}

                  {/* Playing Indicator */}
                  {isPlaying && (
                    <motion.div
                      className="absolute left-0 top-0 bottom-0 w-1 bg-cyan-400"
                      initial={{ scaleY: 0 }}
                      animate={{ scaleY: 1 }}
                      transition={{ duration: 0.3 }}
                    />
                  )}
                </div>

                {/* Hover Glow */}
                <motion.div
                  className="absolute inset-0 bg-green-400/5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                  style={{ filter: 'blur(10px)' }}
                />
              </motion.div>
            )
          })}
        </motion.div>

        {/* Matrix Footer */}
        <motion.div
          className="mt-12 text-center font-mono text-green-400 text-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.6 }}
        >
          <div className="border border-green-400/30 rounded-lg p-4 bg-black/40 backdrop-blur-sm">
            <div className="grid grid-cols-3 gap-8">
              <div>
                <div className="text-white text-lg">{songs.length}</div>
                <div className="text-xs">TOTAL_TRACKS</div>
              </div>
              <div>
                <div className="text-red-400 text-lg">{likedSongs.size}</div>
                <div className="text-xs">LIKED_TRACKS</div>
              </div>
              <div>
                <div className="text-cyan-400 text-lg">{playingId ? '1' : '0'}</div>
                <div className="text-xs">NOW_PLAYING</div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
} 