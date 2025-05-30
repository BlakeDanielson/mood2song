"use client"

import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import { 
  IconBrandTwitter, 
  IconBrandFacebook, 
  IconBrandInstagram,
  IconBrandTiktok,
  IconLink,
  IconShare
} from '@tabler/icons-react'
import { toast } from "sonner"
import type { SongData } from "@/app/actions"

interface SocialShareProps {
  songs: SongData[]
  mood: string
  className?: string
}

export function SocialShare({ songs, mood, className = "" }: SocialShareProps) {
  const [isSharing, setIsSharing] = useState(false)

  const generateShareText = () => {
    if (songs.length === 0) return ""
    
    const topSong = songs[0]
    const shareTexts = [
      `🎵 Just discovered "${topSong.title}" by ${topSong.artist} through AI mood matching! Feeling ${mood} and this song is PERFECT. Try Mood2Song yourself!`,
      `This AI knows my music taste better than I do! Asked for ${mood} vibes and got "${topSong.title}" - exactly what I needed 🎶`,
      `POV: You tell an AI you're feeling ${mood} and it finds the perfect song "${topSong.title}" by ${topSong.artist}. Mind = blown 🤯`,
      `Mood: ${mood} ✨ Perfect match: "${topSong.title}" by ${topSong.artist} 🎵 This AI music discovery is incredible!`
    ]
    
    return shareTexts[Math.floor(Math.random() * shareTexts.length)]
  }

  const generateHashtags = () => {
    const baseTags = ["#Mood2Song", "#AIMusic", "#MusicDiscovery", "#PersonalizedMusic"]
    const moodTags = mood.toLowerCase().includes("happy") ? ["#GoodVibes", "#HappyMusic"] :
                    mood.toLowerCase().includes("sad") ? ["#EmotionalMusic", "#Healing"] :
                    mood.toLowerCase().includes("energetic") ? ["#WorkoutMusic", "#Energy"] :
                    mood.toLowerCase().includes("chill") ? ["#ChillVibes", "#Relaxing"] :
                    ["#MoodMusic", "#VibeCheck"]
    
    return [...baseTags, ...moodTags].join(" ")
  }

  const shareUrl = typeof window !== 'undefined' ? window.location.href : ''
  const shareText = generateShareText()
  const hashtags = generateHashtags()

  const handleTwitterShare = () => {
    const text = `${shareText}\n\n${hashtags}\n\nTry it free:`
    const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(shareUrl)}`
    window.open(url, '_blank', 'width=550,height=420')
  }

  const handleFacebookShare = () => {
    const url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}&quote=${encodeURIComponent(shareText)}`
    window.open(url, '_blank', 'width=550,height=420')
  }

  const handleInstagramShare = () => {
    // Instagram doesn't have direct sharing, so copy text for user to paste
    const fullText = `${shareText}\n\n${hashtags}\n\nLink in bio or try: ${shareUrl}`
    navigator.clipboard.writeText(fullText)
    toast.success("Instagram post copied!", {
      description: "Text copied to clipboard. Paste it in your Instagram post!"
    })
  }

  const handleTikTokShare = () => {
    // TikTok doesn't have direct sharing, so copy text for user to paste
    const fullText = `${shareText}\n\n${hashtags}\n\nTry it: ${shareUrl}`
    navigator.clipboard.writeText(fullText)
    toast.success("TikTok caption copied!", {
      description: "Caption copied to clipboard. Perfect for your TikTok video!"
    })
  }

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl)
      toast.success("Link copied!", {
        description: "Share it with your friends!"
      })
    } catch (err) {
      toast.error("Failed to copy link")
    }
  }

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        setIsSharing(true)
        await navigator.share({
          title: 'Mood2Song - AI Music Discovery',
          text: shareText,
          url: shareUrl,
        })
      } catch (err) {
        if ((err as Error).name !== 'AbortError') {
          toast.error("Sharing failed")
        }
      } finally {
        setIsSharing(false)
      }
    } else {
      handleCopyLink()
    }
  }

  if (songs.length === 0) return null

  return (
    <div className={`space-y-4 ${className}`}>
      <div className="text-center">
        <h3 className="text-lg font-semibold text-white mb-2">
          Love your recommendations? Share the vibe! 🎵
        </h3>
        <p className="text-gray-400 text-sm">
          Help others discover their perfect mood music
        </p>
      </div>

      <div className="flex flex-wrap gap-3 justify-center">
        <Button
          onClick={handleTwitterShare}
          variant="outline"
          size="sm"
          className="bg-blue-500/10 border-blue-500/20 hover:bg-blue-500/20 text-blue-400"
        >
          <IconBrandTwitter className="h-4 w-4 mr-2" />
          Twitter
        </Button>

        <Button
          onClick={handleFacebookShare}
          variant="outline"
          size="sm"
          className="bg-blue-600/10 border-blue-600/20 hover:bg-blue-600/20 text-blue-400"
        >
          <IconBrandFacebook className="h-4 w-4 mr-2" />
          Facebook
        </Button>

        <Button
          onClick={handleInstagramShare}
          variant="outline"
          size="sm"
          className="bg-pink-500/10 border-pink-500/20 hover:bg-pink-500/20 text-pink-400"
        >
          <IconBrandInstagram className="h-4 w-4 mr-2" />
          Instagram
        </Button>

        <Button
          onClick={handleTikTokShare}
          variant="outline"
          size="sm"
          className="bg-purple-500/10 border-purple-500/20 hover:bg-purple-500/20 text-purple-400"
        >
          <IconBrandTiktok className="h-4 w-4 mr-2" />
          TikTok
        </Button>

        <Button
          onClick={handleCopyLink}
          variant="outline"
          size="sm"
          className="bg-gray-500/10 border-gray-500/20 hover:bg-gray-500/20 text-gray-400"
        >
          <IconLink className="h-4 w-4 mr-2" />
          Copy Link
        </Button>

        {navigator.share && (
          <Button
            onClick={handleNativeShare}
            disabled={isSharing}
            variant="outline"
            size="sm"
            className="bg-green-500/10 border-green-500/20 hover:bg-green-500/20 text-green-400"
          >
            <IconShare className="h-4 w-4 mr-2" />
            {isSharing ? "Sharing..." : "Share"}
          </Button>
        )}
      </div>

      <div className="text-center">
        <p className="text-xs text-gray-500">
          Every share helps us reach more music lovers! 💜
        </p>
      </div>
    </div>
  )
} 