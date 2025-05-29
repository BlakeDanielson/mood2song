'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChatInterface } from './components/chat-interface'
import { ChatHeader } from './components/chat-header'
import { ChatInput } from './components/chat-input'

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

export default function Alt6Page() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'assistant',
      content: "Hey there! 🎵 I'm MoodTune AI, your personal music companion! I'm here to help you discover amazing songs that perfectly match your mood, vibe, or any specific moment you're experiencing.\n\nWhether you're feeling happy, sad, energetic, or just need something to vibe to - I've got you covered with personalized recommendations from over 10 million tracks! ✨\n\nWhat kind of musical journey shall we embark on today?",
      timestamp: new Date()
    }
  ])
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSendMessage = async (content: string) => {
    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content,
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setIsTyping(true)

    // Simulate AI response delay with more realistic timing
    setTimeout(() => {
      const aiResponse = generateAIResponse(content)
      setMessages(prev => [...prev, aiResponse])
      setIsTyping(false)
    }, 1200 + Math.random() * 800)
  }

  const generateAIResponse = (userInput: string): Message => {
    const input = userInput.toLowerCase()
    
    // Enhanced mock song recommendations with more variety
    const songDatabase = {
      happy: [
        { id: '1', title: 'Blinding Lights', artist: 'The Weeknd', album: 'After Hours', duration: '3:20', genre: 'Pop', mood: 'Energetic' },
        { id: '2', title: 'Watermelon Sugar', artist: 'Harry Styles', album: 'Fine Line', duration: '2:54', genre: 'Pop', mood: 'Happy' },
        { id: '3', title: 'Levitating', artist: 'Dua Lipa', album: 'Future Nostalgia', duration: '3:23', genre: 'Pop', mood: 'Energetic' },
        { id: '4', title: 'Good 4 U', artist: 'Olivia Rodrigo', album: 'SOUR', duration: '2:58', genre: 'Pop Rock', mood: 'Confident' },
        { id: '5', title: 'Can\'t Stop the Feeling!', artist: 'Justin Timberlake', album: 'Trolls Soundtrack', duration: '3:56', genre: 'Pop', mood: 'Happy' }
      ],
      sad: [
        { id: '6', title: 'Someone Like You', artist: 'Adele', album: '21', duration: '4:45', genre: 'Pop Ballad', mood: 'Melancholic' },
        { id: '7', title: 'Hurt', artist: 'Johnny Cash', album: 'American IV', duration: '3:38', genre: 'Country', mood: 'Melancholic' },
        { id: '8', title: 'Mad World', artist: 'Gary Jules', album: 'Trading Snakeoil for Wolftickets', duration: '3:07', genre: 'Alternative', mood: 'Melancholic' },
        { id: '9', title: 'The Night We Met', artist: 'Lord Huron', album: 'Strange Trails', duration: '3:28', genre: 'Indie Folk', mood: 'Melancholic' },
        { id: '10', title: 'Skinny Love', artist: 'Bon Iver', album: 'For Emma, Forever Ago', duration: '3:58', genre: 'Indie Folk', mood: 'Melancholic' }
      ],
      rock: [
        { id: '11', title: 'Bohemian Rhapsody', artist: 'Queen', album: 'A Night at the Opera', duration: '5:55', genre: 'Rock', mood: 'Epic' },
        { id: '12', title: 'Stairway to Heaven', artist: 'Led Zeppelin', album: 'Led Zeppelin IV', duration: '8:02', genre: 'Rock', mood: 'Epic' },
        { id: '13', title: 'Sweet Child O\' Mine', artist: 'Guns N\' Roses', album: 'Appetite for Destruction', duration: '5:03', genre: 'Rock', mood: 'Energetic' },
        { id: '14', title: 'Don\'t Stop Believin\'', artist: 'Journey', album: 'Escape', duration: '4:10', genre: 'Rock', mood: 'Motivational' },
        { id: '15', title: 'We Will Rock You', artist: 'Queen', album: 'News of the World', duration: '2:02', genre: 'Rock', mood: 'Confident' }
      ],
      chill: [
        { id: '16', title: 'Weightless', artist: 'Marconi Union', album: 'Weightless', duration: '8:08', genre: 'Ambient', mood: 'Chill' },
        { id: '17', title: 'River', artist: 'Leon Bridges', album: 'Coming Home', duration: '3:42', genre: 'Soul', mood: 'Chill' },
        { id: '18', title: 'Holocene', artist: 'Bon Iver', album: 'Bon Iver, Bon Iver', duration: '5:36', genre: 'Indie Folk', mood: 'Chill' },
        { id: '19', title: 'Breathe Me', artist: 'Sia', album: 'Colour the Small One', duration: '4:31', genre: 'Alternative', mood: 'Chill' },
        { id: '20', title: 'Teardrop', artist: 'Massive Attack', album: 'Mezzanine', duration: '5:29', genre: 'Trip Hop', mood: 'Chill' }
      ],
      workout: [
        { id: '21', title: 'Till I Collapse', artist: 'Eminem', album: 'The Eminem Show', duration: '4:57', genre: 'Hip Hop', mood: 'Energetic' },
        { id: '22', title: 'Eye of the Tiger', artist: 'Survivor', album: 'Eye of the Tiger', duration: '4:04', genre: 'Rock', mood: 'Motivational' },
        { id: '23', title: 'Stronger', artist: 'Kanye West', album: 'Graduation', duration: '5:11', genre: 'Hip Hop', mood: 'Confident' },
        { id: '24', title: 'Thunder', artist: 'Imagine Dragons', album: 'Evolve', duration: '3:07', genre: 'Pop Rock', mood: 'Energetic' },
        { id: '25', title: 'Pump It', artist: 'The Black Eyed Peas', album: 'Monkey Business', duration: '3:33', genre: 'Hip Hop', mood: 'Energetic' }
      ],
      jazz: [
        { id: '26', title: 'Take Five', artist: 'Dave Brubeck Quartet', album: 'Time Out', duration: '5:24', genre: 'Jazz', mood: 'Chill' },
        { id: '27', title: 'Fly Me to the Moon', artist: 'Frank Sinatra', album: 'It Might as Well Be Swing', duration: '2:29', genre: 'Jazz', mood: 'Romantic' },
        { id: '28', title: 'What a Wonderful World', artist: 'Louis Armstrong', album: 'What a Wonderful World', duration: '2:21', genre: 'Jazz', mood: 'Happy' },
        { id: '29', title: 'Summertime', artist: 'Ella Fitzgerald', album: 'Porgy and Bess', duration: '4:18', genre: 'Jazz', mood: 'Chill' },
        { id: '30', title: 'Blue in Green', artist: 'Miles Davis', album: 'Kind of Blue', duration: '5:37', genre: 'Jazz', mood: 'Chill' }
      ]
    }

    let response = ""
    let songs: Song[] = []
    let emoji = "🎵"

    if (input.includes('happy') || input.includes('upbeat') || input.includes('energetic') || input.includes('joy')) {
      emoji = "😊"
      response = `${emoji} Awesome! I can feel those positive vibes! Here are some absolutely fantastic upbeat tracks that'll keep your energy soaring and put the biggest smile on your face. These songs are scientifically proven mood boosters! ✨`
      songs = songDatabase.happy.slice(0, 4)
    } else if (input.includes('sad') || input.includes('melancholy') || input.includes('emotional') || input.includes('cry') || input.includes('down')) {
      emoji = "💙"
      response = `${emoji} I hear you, and it's completely okay to feel this way. Music can be incredibly healing during tough times. Here are some beautiful, soul-touching tracks that might resonate with your current emotions. Sometimes we need to feel our feelings, and these songs will be there with you. 🤗`
      songs = songDatabase.sad.slice(0, 4)
    } else if (input.includes('rock') || input.includes('guitar') || input.includes('metal') || input.includes('headbang')) {
      emoji = "🤘"
      response = `${emoji} ROCK ON! I love your energy! Here are some absolutely legendary rock anthems with mind-blowing guitar work that'll make you want to air guitar like nobody's watching. Get ready to feel the power! ⚡`
      songs = songDatabase.rock.slice(0, 4)
    } else if (input.includes('chill') || input.includes('relax') || input.includes('calm') || input.includes('study') || input.includes('focus')) {
      emoji = "🧘‍♀️"
      response = `${emoji} Perfect choice for some zen time! Here are some incredibly soothing, atmospheric tracks that'll help you unwind and find your inner peace. These are perfect for creating that perfect chill ambiance. 🌙`
      songs = songDatabase.chill.slice(0, 4)
    } else if (input.includes('workout') || input.includes('gym') || input.includes('exercise') || input.includes('run') || input.includes('fitness')) {
      emoji = "💪"
      response = `${emoji} TIME TO GET PUMPED! Here's your ultimate high-energy workout playlist that'll push you to crush those fitness goals! These tracks are guaranteed to get your adrenaline pumping and keep you motivated! 🔥`
      songs = songDatabase.workout.slice(0, 4)
    } else if (input.includes('jazz') || input.includes('smooth') || input.includes('sophisticated') || input.includes('classy')) {
      emoji = "🎷"
      response = `${emoji} Ah, a person of refined taste! Here are some absolutely timeless jazz classics that'll transport you to a smoky jazz club. These sophisticated melodies are pure musical poetry. So smooth! ✨`
      songs = songDatabase.jazz.slice(0, 4)
    } else if (input.includes('love') || input.includes('romantic') || input.includes('date') || input.includes('valentine')) {
      emoji = "💕"
      response = `${emoji} Aww, love is in the air! Here are some absolutely swoon-worthy romantic tracks perfect for setting the mood. Whether it's a special date night or just celebrating love, these songs will make hearts flutter! 🌹`
      songs = [
        { id: '31', title: 'Perfect', artist: 'Ed Sheeran', album: '÷ (Divide)', duration: '4:23', genre: 'Pop', mood: 'Romantic' },
        { id: '32', title: 'All of Me', artist: 'John Legend', album: 'Love in the Future', duration: '4:29', genre: 'R&B', mood: 'Romantic' },
        { id: '33', title: 'Thinking Out Loud', artist: 'Ed Sheeran', album: 'x (Multiply)', duration: '4:41', genre: 'Pop', mood: 'Romantic' },
        { id: '34', title: 'Make You Feel My Love', artist: 'Adele', album: '19', duration: '3:32', genre: 'Pop Ballad', mood: 'Romantic' }
      ]
    } else {
      emoji = "🎶"
      response = `${emoji} Great question! I'd love to help you discover some amazing music! Based on your message, here are some popular tracks across different genres that I think you'll absolutely love. Each one has its own unique vibe and story to tell! ✨`
      songs = [...songDatabase.happy.slice(0, 2), ...songDatabase.rock.slice(0, 2)]
    }

    return {
      id: Date.now().toString(),
      type: 'assistant',
      content: response,
      timestamp: new Date(),
      songs: songs.length > 0 ? songs : undefined
    }
  }

  return (
    <div className="h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex flex-col">
      <ChatHeader />
      
      <div className="flex-1 overflow-hidden">
        <ChatInterface 
          messages={messages} 
          isTyping={isTyping}
          messagesEndRef={messagesEndRef}
        />
      </div>
      
      <ChatInput onSendMessage={handleSendMessage} />
    </div>
  )
} 