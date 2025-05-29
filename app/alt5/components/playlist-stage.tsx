'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Play, Pause, SkipForward, SkipBack, Heart, Share, Download, Volume2 } from 'lucide-react'

interface Song {
  id: string
  title: string
  artist: string
  album: string
  duration: string
  genre: string
  mood: string
}

interface PlaylistStageProps {
  songs: Song[]
  mood: string
  genres: string[]
  tempo: number
  energy: number
  isLoading: boolean
  isPlaying: boolean
  onTogglePlayback: () => void
}

export function PlaylistStage({
  songs,
  mood,
  genres,
  tempo,
  energy,
  isLoading,
  isPlaying,
  onTogglePlayback
}: PlaylistStageProps) {
  const [currentSongIndex, setCurrentSongIndex] = useState(0)
  const [likedSongs, setLikedSongs] = useState<Set<string>>(new Set())

  // Mock songs for demonstration
  const mockSongs: Song[] = [
    { id: '1', title: 'Electric Dreams', artist: 'Neon Pulse', album: 'Synthwave Nights', duration: '3:42', genre: 'Electronic', mood: 'Energetic' },
    { id: '2', title: 'Midnight Groove', artist: 'The Funk Masters', album: 'Soul Sessions', duration: '4:15', genre: 'Funk', mood: 'Chill' },
    { id: '3', title: 'Starlight Serenade', artist: 'Luna Jazz Quartet', album: 'Moonbeams', duration: '5:23', genre: 'Jazz', mood: 'Romantic' },
    { id: '4', title: 'Thunder Road', artist: 'Rock Legends', album: 'Highway Dreams', duration: '3:58', genre: 'Rock', mood: 'Confident' },
    { id: '5', title: 'Ocean Waves', artist: 'Ambient Collective', album: 'Nature Sounds', duration: '6:12', genre: 'Ambient', mood: 'Chill' },
    { id: '6', title: 'City Lights', artist: 'Urban Beats', album: 'Street Symphony', duration: '3:33', genre: 'Hip Hop', mood: 'Energetic' },
    { id: '7', title: 'Golden Hour', artist: 'Indie Folk', album: 'Sunset Stories', duration: '4:07', genre: 'Folk', mood: 'Nostalgic' },
    { id: '8', title: 'Neon Nights', artist: 'Synthwave Collective', album: 'Retro Future', duration: '4:44', genre: 'Electronic', mood: 'Adventurous' }
  ]

  const displaySongs = songs.length > 0 ? songs : mockSongs
  const currentSong = displaySongs[currentSongIndex]

  const toggleLike = (songId: string) => {
    setLikedSongs(prev => {
      const newSet = new Set(prev)
      if (newSet.has(songId)) {
        newSet.delete(songId)
      } else {
        newSet.add(songId)
      }
      return newSet
    })
  }

  const nextSong = () => {
    setCurrentSongIndex(prev => (prev + 1) % displaySongs.length)
  }

  const prevSong = () => {
    setCurrentSongIndex(prev => (prev - 1 + displaySongs.length) % displaySongs.length)
  }

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center space-y-4"
      >
        <div className="flex items-center justify-center space-x-3">
          <motion.div
            animate={{ 
              scale: isPlaying ? [1, 1.2, 1] : 1,
              rotate: isPlaying ? [0, 5, -5, 0] : 0
            }}
            transition={{ duration: 1, repeat: isPlaying ? Infinity : 0 }}
          >
            <span className="text-6xl">🎤</span>
          </motion.div>
          <h1 className="text-4xl md:text-6xl font-bold text-white">
            Playlist <span className="bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">Stage</span>
          </h1>
        </div>
        <p className="text-xl text-pink-200 max-w-2xl mx-auto">
          Your personalized soundtrack is ready! Enjoy your curated musical experience.
        </p>
      </motion.div>

      {/* Stage Lights */}
      <div className="relative">
        <div className="absolute inset-0 flex justify-center space-x-8 -top-4">
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              animate={{
                opacity: isPlaying ? [0.3, 1, 0.3] : 0.3,
                scale: isPlaying ? [1, 1.2, 1] : 1
              }}
              transition={{
                duration: 2,
                repeat: isPlaying ? Infinity : 0,
                delay: i * 0.2
              }}
              className="w-4 h-8 bg-gradient-to-b from-yellow-400 to-transparent rounded-full"
            />
          ))}
        </div>
      </div>

      {/* Current Song Display */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2 }}
      >
        <Card className="p-8 bg-gradient-to-br from-purple-900/50 to-pink-900/50 border border-pink-500/20 backdrop-blur-xl">
          <div className="text-center space-y-6">
            {/* Album Art Placeholder */}
            <motion.div
              animate={{ rotate: isPlaying ? 360 : 0 }}
              transition={{ duration: 10, repeat: isPlaying ? Infinity : 0, ease: "linear" }}
              className="w-48 h-48 mx-auto bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center relative"
            >
              <div className="w-40 h-40 bg-black rounded-full flex items-center justify-center">
                <div className="w-4 h-4 bg-white rounded-full"></div>
              </div>
              <motion.div
                animate={{ x: isPlaying ? [0, 10, 0] : 0 }}
                transition={{ duration: 1, repeat: isPlaying ? Infinity : 0 }}
                className="absolute -right-2 top-1/2 w-1 h-12 bg-gradient-to-b from-gray-400 to-gray-600 transform -translate-y-1/2"
              />
            </motion.div>

            {/* Song Info */}
            <div className="space-y-2">
              <h2 className="text-3xl font-bold text-white">{currentSong?.title}</h2>
              <p className="text-xl text-pink-300">{currentSong?.artist}</p>
              <p className="text-lg text-white/60">{currentSong?.album}</p>
            </div>

            {/* Controls */}
            <div className="flex items-center justify-center space-x-6">
              <Button
                onClick={prevSong}
                variant="ghost"
                size="lg"
                className="p-3 rounded-full bg-white/10 hover:bg-white/20 text-white"
              >
                <SkipBack size={24} />
              </Button>

              <Button
                onClick={onTogglePlayback}
                size="lg"
                className="p-4 rounded-full bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white shadow-lg shadow-pink-500/25"
              >
                {isPlaying ? <Pause size={32} /> : <Play size={32} />}
              </Button>

              <Button
                onClick={nextSong}
                variant="ghost"
                size="lg"
                className="p-3 rounded-full bg-white/10 hover:bg-white/20 text-white"
              >
                <SkipForward size={24} />
              </Button>
            </div>

            {/* Progress Bar */}
            <div className="space-y-2">
              <div className="w-full bg-white/20 rounded-full h-2">
                <motion.div
                  animate={{ width: isPlaying ? "100%" : "0%" }}
                  transition={{ duration: 30, ease: "linear" }}
                  className="bg-gradient-to-r from-pink-500 to-purple-500 h-2 rounded-full"
                />
              </div>
              <div className="flex justify-between text-sm text-white/60">
                <span>0:00</span>
                <span>{currentSong?.duration}</span>
              </div>
            </div>
          </div>
        </Card>
      </motion.div>

      {/* Playlist */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="space-y-4"
      >
        <h3 className="text-2xl font-bold text-white text-center">Your Playlist</h3>
        <div className="grid gap-3">
          {displaySongs.map((song, index) => (
            <motion.div
              key={song.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.05 * index }}
              whileHover={{ scale: 1.02 }}
            >
              <Card
                className={`p-4 cursor-pointer transition-all duration-300 ${
                  index === currentSongIndex
                    ? 'bg-gradient-to-r from-pink-500/20 to-purple-500/20 border-pink-500/40'
                    : 'bg-white/5 border-white/10 hover:bg-white/10'
                }`}
                onClick={() => setCurrentSongIndex(index)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                      <span className="text-white font-bold">{index + 1}</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-white">{song.title}</h4>
                      <p className="text-sm text-white/60">{song.artist}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4">
                    <div className="text-right hidden md:block">
                      <p className="text-sm text-white/80">{song.genre}</p>
                      <p className="text-xs text-white/60">{song.duration}</p>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Button
                        onClick={(e) => {
                          e.stopPropagation()
                          toggleLike(song.id)
                        }}
                        variant="ghost"
                        size="sm"
                        className="p-2 rounded-full hover:bg-white/10"
                      >
                        <Heart 
                          size={16} 
                          className={`${
                            likedSongs.has(song.id) 
                              ? 'text-red-500 fill-red-500' 
                              : 'text-white/60'
                          }`}
                        />
                      </Button>
                      
                      {index === currentSongIndex && isPlaying && (
                        <motion.div
                          animate={{ scale: [1, 1.2, 1] }}
                          transition={{ duration: 1, repeat: Infinity }}
                          className="text-pink-400"
                        >
                          <Volume2 size={16} />
                        </motion.div>
                      )}
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Action Buttons */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="flex justify-center space-x-4"
      >
        <Button
          variant="outline"
          className="px-6 py-3 bg-white/10 border-white/20 text-white hover:bg-white/20"
        >
          <Share className="w-4 h-4 mr-2" />
          Share Playlist
        </Button>
        
        <Button
          variant="outline"
          className="px-6 py-3 bg-white/10 border-white/20 text-white hover:bg-white/20"
        >
          <Download className="w-4 h-4 mr-2" />
          Export
        </Button>
        
        <Button
          className="px-6 py-3 bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white"
        >
          <Heart className="w-4 h-4 mr-2" />
          Save to Library
        </Button>
      </motion.div>

      {/* Vibe Summary */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
      >
        <Card className="p-6 bg-gradient-to-r from-indigo-900/50 to-purple-900/50 border border-purple-500/20 backdrop-blur-xl">
          <div className="text-center space-y-4">
            <h3 className="text-lg font-semibold text-white">Your Vibe Summary</h3>
            <div className="flex items-center justify-center space-x-8">
              <div className="text-center">
                <div className="text-xl font-bold text-purple-400">{mood}</div>
                <div className="text-sm text-white/60">Mood</div>
              </div>
              <div className="text-center">
                <div className="text-xl font-bold text-cyan-400">{genres.join(', ')}</div>
                <div className="text-sm text-white/60">Genres</div>
              </div>
              <div className="text-center">
                <div className="text-xl font-bold text-red-400">{tempo} BPM</div>
                <div className="text-sm text-white/60">Tempo</div>
              </div>
              <div className="text-center">
                <div className="text-xl font-bold text-green-400">{energy}%</div>
                <div className="text-sm text-white/60">Energy</div>
              </div>
            </div>
          </div>
        </Card>
      </motion.div>
    </div>
  )
} 