'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Play, 
  Pause, 
  Heart, 
  Share2, 
  Download, 
  Filter, 
  Search,
  Clock,
  Music,
  ExternalLink,
  MoreHorizontal,
  Shuffle,
  Repeat
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent } from '@/components/ui/card'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

interface Song {
  id: string
  title: string
  artist: string
  album: string
  duration: string
  genre: string
  mood: string
  energy: number
  popularity: number
  albumArt: string
  previewUrl?: string
}

interface PlaylistResultsProps {
  songs: Song[]
  mood: string
  persona: string
  isLoading?: boolean
}

const demoSongs: Song[] = [
  {
    id: '1',
    title: 'Midnight City',
    artist: 'M83',
    album: 'Hurry Up, We\'re Dreaming',
    duration: '4:03',
    genre: 'Electronic',
    mood: 'Nostalgic',
    energy: 75,
    popularity: 89,
    albumArt: '/images/album1.jpg'
  },
  {
    id: '2',
    title: 'Blinding Lights',
    artist: 'The Weeknd',
    album: 'After Hours',
    duration: '3:20',
    genre: 'Pop',
    mood: 'Energetic',
    energy: 92,
    popularity: 95,
    albumArt: '/images/album2.jpg'
  },
  {
    id: '3',
    title: 'Weightless',
    artist: 'Marconi Union',
    album: 'Distance',
    duration: '8:08',
    genre: 'Ambient',
    mood: 'Calm',
    energy: 15,
    popularity: 67,
    albumArt: '/images/album3.jpg'
  }
]

export function PlaylistResults({ 
  songs = demoSongs, 
  mood, 
  persona, 
  isLoading = false 
}: PlaylistResultsProps) {
  const [currentlyPlaying, setCurrentlyPlaying] = useState<string | null>(null)
  const [likedSongs, setLikedSongs] = useState<Set<string>>(new Set())
  const [searchQuery, setSearchQuery] = useState('')

  const filteredSongs = songs.filter(song =>
    song.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    song.artist.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const togglePlay = (songId: string) => {
    setCurrentlyPlaying(currentlyPlaying === songId ? null : songId)
  }

  const toggleLike = (songId: string) => {
    const newLikedSongs = new Set(likedSongs)
    if (newLikedSongs.has(songId)) {
      newLikedSongs.delete(songId)
    } else {
      newLikedSongs.add(songId)
    }
    setLikedSongs(newLikedSongs)
  }

  if (isLoading) {
    return (
      <div className="w-full max-w-4xl mx-auto space-y-6">
        <div className="text-center space-y-4">
          <div className="w-16 h-16 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <h2 className="text-2xl font-bold text-slate-800">Creating Your Perfect Playlist</h2>
          <p className="text-slate-600">Analyzing your mood and persona preferences...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <motion.div 
        className="text-center space-y-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-4xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
          Your Personalized Playlist
        </h2>
        <div className="flex items-center justify-center space-x-4 text-sm text-slate-600">
          <span className="flex items-center space-x-1">
            <Music className="h-4 w-4" />
            <span>{songs.length} songs</span>
          </span>
          <span className="px-2 py-1 bg-indigo-100 text-indigo-700 rounded-full text-xs font-medium">
            {mood} • {persona}
          </span>
        </div>
      </motion.div>

      {/* Controls */}
      <motion.div
        className="flex flex-col sm:flex-row gap-4 items-center justify-between"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
      >
        <div className="flex items-center space-x-3">
          <Button className="bg-gradient-to-r from-indigo-500 to-violet-500 hover:from-indigo-600 hover:to-violet-600 text-white">
            <Play className="h-4 w-4 mr-2" />
            Play All
          </Button>
          <Button variant="outline" size="sm">
            <Shuffle className="h-4 w-4 mr-2" />
            Shuffle
          </Button>
        </div>

        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
          <Input
            placeholder="Search songs..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9 w-64"
          />
        </div>
      </motion.div>

      {/* Playlist */}
      <motion.div
        className="space-y-2"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        {filteredSongs.map((song, index) => (
          <Card key={song.id} className="group hover:shadow-md transition-all duration-200 border-slate-200">
            <CardContent className="p-4">
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <div className="w-12 h-12 bg-gradient-to-br from-slate-200 to-slate-300 rounded-lg flex items-center justify-center">
                    <Music className="h-5 w-5 text-slate-500" />
                  </div>
                  <button
                    onClick={() => togglePlay(song.id)}
                    className="absolute inset-0 bg-black/50 rounded-lg flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    {currentlyPlaying === song.id ? (
                      <Pause className="h-4 w-4 text-white" />
                    ) : (
                      <Play className="h-4 w-4 text-white" />
                    )}
                  </button>
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <div className="min-w-0 flex-1">
                      <h3 className="font-semibold text-slate-900 truncate">
                        {song.title}
                      </h3>
                      <p className="text-sm text-slate-600 truncate">
                        {song.artist} • {song.album}
                      </p>
                    </div>
                    <div className="flex items-center space-x-4 ml-4">
                      <span className="text-sm text-slate-500 w-12 text-right">
                        {song.duration}
                      </span>
                      <button
                        onClick={() => toggleLike(song.id)}
                        className={`p-1 rounded-full transition-colors ${
                          likedSongs.has(song.id)
                            ? 'text-red-500 hover:text-red-600'
                            : 'text-slate-400 hover:text-slate-600'
                        }`}
                      >
                        <Heart className={`h-4 w-4 ${likedSongs.has(song.id) ? 'fill-current' : ''}`} />
                      </button>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2 mt-2">
                    <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-slate-100 text-slate-700">
                      {song.genre}
                    </span>
                    <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-700">
                      {song.mood}
                    </span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </motion.div>

      {/* Export Options */}
      <motion.div
        className="flex flex-col sm:flex-row gap-4 items-center justify-center pt-8 border-t border-slate-200"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        <Button variant="outline" className="w-full sm:w-auto">
          <Download className="h-4 w-4 mr-2" />
          Export to Spotify
        </Button>
        <Button variant="outline" className="w-full sm:w-auto">
          <Share2 className="h-4 w-4 mr-2" />
          Share Playlist
        </Button>
      </motion.div>
    </div>
  )
} 