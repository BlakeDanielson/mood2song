import { NextRequest, NextResponse } from 'next/server'

interface MusicRequest {
  mood: string
  persona?: string
  preferences?: string[]
}

interface Song {
  id: string
  title: string
  artist: string
  album: string
  duration: string
  genre: string
  mood: string
  image: string
  energy: number
  danceability: number
  valence: number
  spotifyUrl?: string
}

const songDatabase: Record<string, Song[]> = {
  happy: [
    {
      id: '1',
      title: 'Blinding Lights',
      artist: 'The Weeknd',
      album: 'After Hours',
      duration: '3:20',
      genre: 'Pop',
      mood: 'Energetic',
      image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop',
      energy: 0.8,
      danceability: 0.9,
      valence: 0.7,
      spotifyUrl: 'https://open.spotify.com/track/0VjIjW4GlULA4LGoDOLVKN'
    },
    {
      id: '2',
      title: 'Watermelon Sugar',
      artist: 'Harry Styles',
      album: 'Fine Line',
      duration: '2:54',
      genre: 'Pop',
      mood: 'Happy',
      image: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=300&h=300&fit=crop',
      energy: 0.7,
      danceability: 0.8,
      valence: 0.9,
      spotifyUrl: 'https://open.spotify.com/track/6UelLqGlWMcVH1E5c4H7lY'
    },
    {
      id: '3',
      title: 'Levitating',
      artist: 'Dua Lipa',
      album: 'Future Nostalgia',
      duration: '3:23',
      genre: 'Pop',
      mood: 'Energetic',
      image: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=300&h=300&fit=crop',
      energy: 0.9,
      danceability: 0.9,
      valence: 0.8,
      spotifyUrl: 'https://open.spotify.com/track/463CkQjx2Zk1yXoBuierM9'
    }
  ],
  sad: [
    {
      id: '4',
      title: 'Someone Like You',
      artist: 'Adele',
      album: '21',
      duration: '4:45',
      genre: 'Pop Ballad',
      mood: 'Melancholic',
      image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop',
      energy: 0.3,
      danceability: 0.2,
      valence: 0.2,
      spotifyUrl: 'https://open.spotify.com/track/1zwMYTA5nlNjZxYrvBB2pV'
    },
    {
      id: '5',
      title: 'Mad World',
      artist: 'Gary Jules',
      album: 'Trading Snakeoil',
      duration: '3:07',
      genre: 'Alternative',
      mood: 'Melancholic',
      image: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=300&h=300&fit=crop',
      energy: 0.2,
      danceability: 0.1,
      valence: 0.1,
      spotifyUrl: 'https://open.spotify.com/track/3JOVTQ5h8HGFnDdp4VT3MP'
    }
  ],
  chill: [
    {
      id: '6',
      title: 'Weightless',
      artist: 'Marconi Union',
      album: 'Weightless',
      duration: '8:08',
      genre: 'Ambient',
      mood: 'Chill',
      image: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=300&h=300&fit=crop',
      energy: 0.1,
      danceability: 0.1,
      valence: 0.5,
      spotifyUrl: 'https://open.spotify.com/track/2WfaOiMkCvy7F5fcp2zZ8L'
    },
    {
      id: '7',
      title: 'River',
      artist: 'Leon Bridges',
      album: 'Coming Home',
      duration: '3:42',
      genre: 'Soul',
      mood: 'Chill',
      image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop',
      energy: 0.4,
      danceability: 0.3,
      valence: 0.6,
      spotifyUrl: 'https://open.spotify.com/track/4Gm7pZaHrMZlKxrY8OvBpG'
    }
  ],
  energetic: [
    {
      id: '8',
      title: 'Thunderstruck',
      artist: 'AC/DC',
      album: 'The Razors Edge',
      duration: '4:52',
      genre: 'Rock',
      mood: 'Energetic',
      image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop',
      energy: 0.95,
      danceability: 0.7,
      valence: 0.8,
      spotifyUrl: 'https://open.spotify.com/track/57bgtoPSgt236HzfBOd8kj'
    },
    {
      id: '9',
      title: 'Pump It',
      artist: 'The Black Eyed Peas',
      album: 'Monkey Business',
      duration: '3:33',
      genre: 'Hip Hop',
      mood: 'Energetic',
      image: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=300&h=300&fit=crop',
      energy: 0.9,
      danceability: 0.95,
      valence: 0.85,
      spotifyUrl: 'https://open.spotify.com/track/3ZOEytgrvLwQaqXreDs2Jx'
    }
  ]
}

export async function POST(request: NextRequest) {
  try {
    const body: MusicRequest = await request.json()
    const { mood, persona } = body

    let songs: Song[] = []
    let response = ""

    // Determine mood category
    const moodLower = mood.toLowerCase()
    if (moodLower.includes('happy') || moodLower.includes('upbeat') || moodLower.includes('joy')) {
      songs = songDatabase.happy
    } else if (moodLower.includes('sad') || moodLower.includes('melancholy') || moodLower.includes('emotional') || moodLower.includes('down')) {
      songs = songDatabase.sad
    } else if (moodLower.includes('chill') || moodLower.includes('relax') || moodLower.includes('calm') || moodLower.includes('peaceful')) {
      songs = songDatabase.chill
    } else if (moodLower.includes('energetic') || moodLower.includes('pump') || moodLower.includes('workout') || moodLower.includes('motivation')) {
      songs = songDatabase.energetic
    } else {
      // Default mix
      songs = [
        ...songDatabase.happy.slice(0, 2),
        ...songDatabase.chill.slice(0, 1),
        ...songDatabase.energetic.slice(0, 1)
      ]
    }

    // Persona-specific responses
    switch (persona) {
      case 'explorer':
        response = "🔍 As your Music Explorer, I've discovered some incredible tracks that match your vibe! These are carefully curated gems that will expand your musical horizons."
        break
      case 'vibe-curator':
        response = "✨ Perfect! I've crafted the ideal sonic atmosphere for your current mood. These tracks will create the perfect ambiance for your moment."
        break
      case 'energy-booster':
        response = "⚡ Time to turn up the energy! I've selected high-octane tracks that will get your blood pumping and motivation soaring!"
        break
      case 'soul-healer':
        response = "💙 I understand what you're feeling. Here are some soul-touching tracks that will provide comfort and emotional resonance."
        break
      default:
        response = "🎵 Here are some amazing tracks that match your mood!"
    }

    return NextResponse.json({
      success: true,
      message: response,
      songs: songs,
      persona: persona,
      mood: mood
    })

  } catch (error) {
    console.error('Music API Error:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to get music recommendations' },
      { status: 500 }
    )
  }
}

export async function GET() {
  return NextResponse.json({
    success: true,
    message: "Music API is running",
    endpoints: {
      POST: "/api/music - Get music recommendations based on mood and persona"
    }
  })
} 