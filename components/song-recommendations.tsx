"use client"

import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import type {
  SongData
} from "@/app/actions"
import { ExternalLink, Info, Music2, Play, RefreshCw, XCircle } from "lucide-react"
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
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 my-4">
            <div>
              <h2 className="text-2xl font-bold text-white">
                {selectedPersona && mood && <span>{selectedPersona.name} picks for a "{mood}" mood</span>}
                {selectedPersona && !mood && <span>{selectedPersona.name}'s Top Picks</span>}
                {!selectedPersona && mood && <span>Your "{mood}" Recommendations</span>}
                {!selectedPersona && !mood && <span>Recommendations</span>}
              </h2>
              <h3 className="text-sm text-muted-foreground">
                <span> Click a song to preview it. </span>
              </h3>

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

            <div className="flex items-center gap-2 self-end sm:self-auto">
              <Button
                variant="ghost"
                size="sm"
                onClick={handleManualRefresh}
                className="text-muted-foreground hover:text-white hover:bg-[#333333]"
                title="Refresh Recommendations"
              >
                <RefreshCw className="h-4 w-4 mr-2" /> Refresh Suggestions
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => window.location.href = '/'}
                className="text-muted-foreground hover:text-white hover:bg-[#333333]"
                title="Clear Playlist and Reset"
              >
                <XCircle className="h-4 w-4 mr-2" /> Clear Playlist
              </Button>
            </div>
          </div>

          {/* Add horizontal scroll wrapper for the table on small screens */}
          <div className="overflow-x-auto">
            <table className="w-full table-auto border-collapse text-sm mt-2 min-w-[600px] sm:min-w-full"> {/* Added min-width for scroll activation */}
              <thead>
                <tr className="border-b border-[#333333]">
                  <th className="px-2 py-2 text-center font-medium text-muted-foreground w-2">#</th>
                  <th className="px-2 py-2 text-center font-medium text-muted-foreground w-auto hidden sm:table-cell">YEAR</th>
                  <th className="px-2 py-2 text-left font-medium text-muted-foreground w-auto">TITLE</th>
                  <th className="px-2 py-2 text-left font-medium text-muted-foreground w-auto">ARTIST</th>
                  {/* Hide REASON column on small screens */}
                  <th className="px-2 py-2 text-left font-medium text-muted-foreground w-auto hidden sm:table-cell">REASON</th>
                  <th className="px-2 py-2 text-left font-medium text-muted-foreground w-auto hidden sm:table-cell">ALBUM</th>
                </tr>
              </thead>
              <tbody>
                {songs.map((song, index) => (
                  <>
                    <tr 
                      key={`${song.title}-${song.artist}-${index}`} 
                      className="group border-b border-[#282828] hover:bg-[#282828] cursor-pointer"
                      onClick={() => toggleExpandSong(song.spotifyId || `${song.title}-${index}`)}
                    >
                      <td className="px-2 py-2 text-center text-muted-foreground align-middle">
                        <span className="group-hover:hidden w-4 inline-block text-center">{index + 1}</span>
                        <Play className="h-4 w-4 hidden group-hover:inline-block text-white" />
                      </td>
                      <td className="px-2 py-2 text-muted-foreground text-sm text-center align-middle hidden sm:table-cell">
                        {song.year || "-"}
                      </td>
                      <td className="px-2 py-2 align-middle max-w-xs">
                        <div className="flex items-center gap-3">
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
                            {song.spotifyUrl ? (
                              <a 
                                href={song.spotifyUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-white font-medium truncate group-hover:underline hover:text-[#1DB954] inline-block"
                                title={`Listen to ${song.title} on Spotify`}
                                onClick={(e) => e.stopPropagation()}
                              >
                                {song.title}
                              </a>
                            ) : (
                              <div className="text-white font-medium truncate">{song.title}</div>
                            )}
                          </div>
                        </div>
                      </td>
                      <td className="px-2 py-2 align-middle text-sm truncate max-w-[12rem]">
                        {song.artistSpotifyUrl ? (
                          <a 
                            href={song.artistSpotifyUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-muted-foreground group-hover:text-white group-hover:underline hover:!text-[#1DB954]"
                            title={`View ${song.artist} on Spotify`}
                            onClick={(e) => e.stopPropagation()}
                          >
                            {song.artist}
                          </a>
                        ) : (
                           <div className="text-muted-foreground">{song.artist}</div>
                        )}
                      </td>
                      {/* Hide REASON column data on small screens */}
                      <td className="px-2 py-2 text-muted-foreground text-sm truncate align-middle hidden sm:table-cell">
                        {song.reason || "-"}
                      </td>
                      <td className="px-2 py-2 text-muted-foreground text-sm truncate align-middle hidden sm:table-cell max-w-[13rem]">
                        {song.album || "-"}
                      </td>
                    </tr>
                    {expandedSong === (song.spotifyId || `${song.title}-${index}`) && (
                      <tr className="bg-[#282828]">
                        <td colSpan={6} className="p-4">
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
                        </td>
                      </tr>
                    )}
                  </>
                ))}
              </tbody>
            </table>
          </div> { /* Close scroll wrapper */}
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
