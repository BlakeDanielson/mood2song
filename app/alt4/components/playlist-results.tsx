'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Play, 
  Pause, 
  Heart, 
  Share2, 
  Download, 
  Search,
  Music,
  ExternalLink,
  Shuffle,
  Volume2,
  SkipForward,
  SkipBack
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent } from '@/components/ui/card'
import { toast } from 'sonner'

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
    albumArt: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop'
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
    albumArt: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=300&h=300&fit=crop'
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
    albumArt: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=300&h=300&fit=crop'
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
    toast.success(currentlyPlaying === songId ? 'Paused' : 'Now playing')
  }

  const toggleLike = (songId: string) => {
    const newLikedSongs = new Set(likedSongs)
    if (newLikedSongs.has(songId)) {
      newLikedSongs.delete(songId)
      toast.success('Removed from favorites')
    } else {
      newLikedSongs.add(songId)
      toast.success('Added to favorites')
    }
    setLikedSongs(newLikedSongs)
  }

  const handleSpotifyExport = () => {
    toast.success('Redirecting to Spotify...')
    // In a real app, this would integrate with Spotify Web API
    window.open('https://open.spotify.com', '_blank')
  }

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `My ${mood} Playlist`,
        text: `Check out this amazing ${mood} playlist curated by ${persona}!`,
        url: window.location.href,
      })
    } else {
      navigator.clipboard.writeText(window.location.href)
      toast.success('Playlist link copied to clipboard!')
    }
  }

  const playAll = () => {
    if (filteredSongs.length > 0) {
      setCurrentlyPlaying(filteredSongs[0].id)
      toast.success('Playing all songs')
    }
  }

  if (isLoading) {
    return (
      <div className="w-full max-w-4xl mx-auto space-y-6">
        <div className="text-center space-y-4">
          <div className="w-16 h-16 border-4 border-purple-400 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <h2 className="text-2xl font-bold text-white">Creating Your Perfect Playlist</h2>
          <p className="text-white/70">Analyzing your mood and persona preferences...</p>
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
        <h2 className="text-4xl font-bold bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent">
          Your Personalized Playlist
        </h2>
        <div className="flex items-center justify-center space-x-4 text-sm text-white/70">
          <span className="flex items-center space-x-1">
            <Music className="h-4 w-4" />
            <span>{songs.length} songs</span>
          </span>
          <span className="px-3 py-1 bg-purple-500/30 text-purple-200 rounded-full text-xs font-medium border border-purple-400/30">
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
          <Button 
            onClick={playAll}
            className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white border-0"
          >
            <Play className="h-4 w-4 mr-2" />
            Play All
          </Button>
          <Button variant="outline" size="sm" className="border-white/20 text-white hover:bg-white/10">
            <Shuffle className="h-4 w-4 mr-2" />
            Shuffle
          </Button>
        </div>

        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-white/50" />
          <Input
            placeholder="Search songs..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9 w-64 bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-purple-400"
          />
        </div>
      </motion.div>

      {/* Playlist */}
      <motion.div
        className="space-y-3"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        {filteredSongs.map((song, index) => (
          <Card key={song.id} className="group hover:shadow-lg transition-all duration-300 bg-white/5 border-white/10 hover:bg-white/10 backdrop-blur-sm">
            <CardContent className="p-4">
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <div 
                    className="w-14 h-14 rounded-lg flex items-center justify-center bg-cover bg-center"
                    style={{
                      backgroundImage: song.albumArt ? `url(${song.albumArt})` : 'none',
                      backgroundColor: song.albumArt ? 'transparent' : 'rgba(255,255,255,0.1)'
                    }}
                  >
                    {!song.albumArt && <Music className="h-6 w-6 text-white/50" />}
                  </div>
                  <button
                    onClick={() => togglePlay(song.id)}
                    className="absolute inset-0 bg-black/60 rounded-lg flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    {currentlyPlaying === song.id ? (
                      <Pause className="h-5 w-5 text-white" />
                    ) : (
                      <Play className="h-5 w-5 text-white" />
                    )}
                  </button>
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <div className="min-w-0 flex-1">
                      <h3 className="font-semibold text-white truncate text-lg">
                        {song.title}
                      </h3>
                      <p className="text-sm text-white/70 truncate">
                        {song.artist} • {song.album}
                      </p>
                    </div>
                    <div className="flex items-center space-x-4 ml-4">
                      <span className="text-sm text-white/60 w-12 text-right">
                        {song.duration}
                      </span>
                      {song.previewUrl && (
                        <button
                          onClick={() => window.open(song.previewUrl, '_blank')}
                          className="p-1 rounded-full text-white/60 hover:text-white transition-colors"
                        >
                          <ExternalLink className="h-4 w-4" />
                        </button>
                      )}
                      <button
                        onClick={() => toggleLike(song.id)}
                        className={`p-1 rounded-full transition-colors ${
                          likedSongs.has(song.id)
                            ? 'text-red-400 hover:text-red-300'
                            : 'text-white/60 hover:text-white'
                        }`}
                      >
                        <Heart className={`h-4 w-4 ${likedSongs.has(song.id) ? 'fill-current' : ''}`} />
                      </button>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2 mt-3">
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-white/10 text-white/80 border border-white/20">
                      {song.genre}
                    </span>
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-purple-500/30 text-purple-200 border border-purple-400/30">
                      {song.mood}
                    </span>
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-500/30 text-green-200 border border-green-400/30">
                      {song.energy}% energy
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
        className="flex flex-col sm:flex-row gap-4 items-center justify-center pt-8 border-t border-white/20"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        <Button 
          onClick={handleSpotifyExport}
          className="w-full sm:w-auto bg-green-600 hover:bg-green-700 text-white border-0"
        >
          <Download className="h-4 w-4 mr-2" />
          Export to Spotify
        </Button>
        <Button 
          onClick={handleShare}
          variant="outline" 
          className="w-full sm:w-auto border-white/20 text-white hover:bg-white/10"
        >
          <Share2 className="h-4 w-4 mr-2" />
          Share Playlist
        </Button>
      </motion.div>
    </div>
  )
} 