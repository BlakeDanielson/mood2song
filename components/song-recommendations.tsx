"use client"

import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import type {
  SongData
} from "@/app/actions"
import { ExternalLink, Info, Music2, Play, RefreshCw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { personas, Persona } from "@/lib/personas"

interface SongRecommendationsProps {
  songs: SongData[] | undefined
  loading: boolean
  error: string | null
  mood: string
  filters: any
  selectedPersona: Persona | null
  onRefresh: () => void
  searchPerformed: boolean
}

export function SongRecommendations({ 
  songs,
  loading,
  error,
  mood,
  filters,
  selectedPersona,
  onRefresh,
  searchPerformed
}: SongRecommendationsProps) {
  const [expandedSong, setExpandedSong] = useState<string | null>(null)

  const handleManualRefresh = () => {
    console.log("Manual refresh/retry requested.");
    onRefresh();
  }

  const toggleExpandSong = (songId: string) => {
    if (expandedSong === songId) {
      setExpandedSong(null)
    } else {
      setExpandedSong(songId)
    }
  }

  if (loading) {
    return (
      <div className="mt-8 text-center text-muted-foreground">
        <p>Loading recommendations...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="mt-8 text-center text-red-400">
        <p>{error}</p>
        <Button
          variant="outline"
          onClick={handleManualRefresh}
          className="mt-4 bg-[#333333] text-white hover:bg-[#444444]"
        >
          <RefreshCw className="mr-2 h-4 w-4" />
          Try Again
        </Button>
      </div>
    )
  }

  if (!searchPerformed) {
     return (
        <div className="mt-4 text-center text-muted-foreground">
            <p>Enter a mood or select a persona to get recommendations.</p>
        </div>
     )
  }

  if (searchPerformed && (!songs || songs.length === 0)) {
      return (
        <div className="mt-4 text-center text-muted-foreground">
            <p>No songs found matching your criteria.</p>
             <Button
              variant="outline"
              onClick={handleManualRefresh}
              className="mt-4 bg-[#333333] text-white hover:bg-[#444444]"
            >
              <RefreshCw className="mr-2 h-4 w-4" />
              Try Finding Songs Again
            </Button>
        </div>
      )
  }

  if (!songs) {
      return null; 
  }

  const activeFilters = []
  if (filters?.genre) activeFilters.push(`Genre: ${filters.genre}`)
  if (filters?.era) activeFilters.push(`Era: ${filters.era}`)
  if (filters?.popularity) activeFilters.push(`Discovery: ${filters.popularity}`)
  if (filters?.language) activeFilters.push(`Language: ${filters.language}`)
  if (filters?.excludeMainstream) activeFilters.push("Excluding mainstream")

  return (
    <div className="mt-4">
      {loading && (
        <div className="mt-4 text-center text-muted-foreground">
          <p>Loading recommendations...</p>
        </div>
      )}

      {!loading && error && (
        <div className="mt-4 text-center text-red-400">
          <p>{error}</p>
          <Button
            variant="outline"
            onClick={handleManualRefresh}
            className="mt-4 bg-[#333333] text-white hover:bg-[#444444]"
          >
            <RefreshCw className="mr-2 h-4 w-4" />
            Try Again
          </Button>
        </div>
      )}

      {!loading && !error && songs.length > 0 && (
        <>
          <div className="flex justify-between items-center my-4">
            <div>
              <h2 className="text-2xl font-bold text-white">
                {mood && <span>"{mood}" Playlist</span>}
                {!mood && selectedPersona && <span>Recommendations for {selectedPersona.name}</span>}
                {!mood && !selectedPersona && <span>Recommendations</span>}
              </h2>

              {activeFilters.length > 0 && (
                <div className="mt-2 flex flex-wrap gap-2">
                  {activeFilters.map((filter, index) => (
                    <Badge key={index} variant="outline" className="bg-[#333333] text-white border-[#444444]">
                      {filter}
                    </Badge>
                  ))}
                </div>
              )}
            </div>

            <Button
              variant="ghost"
              size="sm"
              onClick={handleManualRefresh}
              className="text-muted-foreground hover:text-white hover:bg-[#333333]"
              title="Refresh Recommendations"
            >
              <RefreshCw className="h-4 w-4" />
            </Button>
          </div>

          <div className="grid grid-cols-[auto_4fr_3fr_1fr] gap-4 px-2 py-2 border-b border-[#333333] text-sm text-muted-foreground mb-2">
            <div className="text-center">#</div>
            <div>TITLE</div>
            <div>REASON</div>
            <div className="text-right">YEAR</div>
          </div>

          <div className="space-y-1">
            {songs.map((song, index) => (
              <div key={`${song.title}-${song.artist}-${index}`} className="group">
                <div
                  className="grid grid-cols-[auto_4fr_3fr_1fr] gap-4 items-center px-2 py-2 group-hover:bg-[#282828] rounded-md cursor-pointer"
                  onClick={() => toggleExpandSong(song.spotifyId || `${song.title}-${index}`)}
                >
                  <div className="flex items-center justify-center text-muted-foreground">
                    <span className="group-hover:hidden w-4 text-center">{index + 1}</span>
                    <Play className="h-4 w-4 hidden group-hover:block text-white" />
                  </div>

                  <div className="flex items-center gap-3 overflow-hidden">
                    {song.albumArt ? (
                      <img
                        src={song.albumArt || "/placeholder.svg"}
                        alt={`${song.title} album art`}
                        className="w-10 h-10 object-cover rounded-sm flex-shrink-0"
                      />
                    ) : (
                      <div className="w-10 h-10 bg-[#333333] flex items-center justify-center rounded-sm flex-shrink-0">
                        <Music2 className="h-5 w-5 text-muted-foreground" />
                      </div>
                    )}
                    <div className="min-w-0">
                      <div className="text-white font-medium truncate hover:underline">{song.title}</div>
                      <div className="text-muted-foreground text-sm truncate hover:underline">{song.artist}</div>
                    </div>
                  </div>

                  <div className="text-muted-foreground text-sm truncate">
                    {song.reason || "-"}
                  </div>

                  <div className="text-muted-foreground text-sm text-right">
                    {song.year || "-"}
                  </div>
                </div>

                {expandedSong === (song.spotifyId || `${song.title}-${index}`) && (
                  <div className="bg-[#282828] p-2 rounded-b-md -mt-1">
                    {song.reason && (
                      <div className="flex items-start mb-3 text-sm text-muted-foreground">
                        <Info className="h-4 w-4 mr-2 mt-0.5 text-[#1DB954] flex-shrink-0" />
                        <p>{song.reason}</p>
                      </div>
                    )}

                    {song.embedUrl && (
                      <div className="mt-2">
                        <iframe
                          src={song.embedUrl}
                          width="100%"
                          height="80"
                          frameBorder="0"
                          allow="encrypted-media"
                          title={`${song.title} by ${song.artist}`}
                          className="rounded"
                        ></iframe>
                      </div>
                    )}

                    {!song.embedUrl && song.spotifyUrl && (
                      <a
                        href={song.spotifyUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs flex items-center text-[#1DB954] hover:text-[#1ed760] mt-2"
                      >
                        <ExternalLink className="h-4 w-4 mr-1" /> Open in Spotify
                      </a>
                    )}

                    <div className="flex flex-wrap gap-2 mt-4">
                      {song.genre && (
                        <Badge variant="outline" className="bg-[#333333] text-white border-[#444444] text-xs">
                          {song.genre}
                        </Badge>
                      )}
                      {getPopularityLabel(song.popularity)?.label && (
                        <Badge className={`bg-[#333333] text-white border-[#444444] text-xs`}>
                          {getPopularityLabel(song.popularity)?.label}
                        </Badge>
                      )}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  )
}

function getPopularityLabel(popularity?: number) {
  if (!popularity && popularity !== 0) return null

  if (popularity < 30) return { label: "Hidden Gem", color: "bg-emerald-500" }
  if (popularity < 50) return { label: "Rising", color: "bg-blue-500" }
  if (popularity < 70) return { label: "Popular", color: "bg-yellow-500" }
  return { label: "Hit", color: "bg-red-500" }
}
