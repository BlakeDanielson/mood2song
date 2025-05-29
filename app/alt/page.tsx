"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  ArrowLeft, 
  Play, 
  Pause, 
  Heart, 
  ExternalLink, 
  Loader2, 
  Music, 
  Sparkles,
  Volume2
} from "lucide-react";
import Link from "next/link";
import { PersonaModal } from "@/components/persona-modal";
import { type Persona, personas } from "@/lib/personas";
import { toast } from "sonner";
import { findSongs } from "@/app/actions";
import type { SongData, FindSongsSuccessResponse } from "@/app/actions";

const SongCard = ({ song, index }: { song: SongData; index: number }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLiked, setIsLiked] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group"
    >
      <Card className="bg-white/10 backdrop-blur-md border-white/20 hover:bg-white/20 transition-all duration-300">
        <CardContent className="p-6">
          <div className="flex items-start gap-4">
            {/* Album Art */}
            <div className="relative w-20 h-20 rounded-lg overflow-hidden bg-gradient-to-br from-purple-500/20 to-pink-500/20 flex-shrink-0">
              {song.albumArt ? (
                <img 
                  src={song.albumArt} 
                  alt={song.album || song.title}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <Music className="w-8 h-8 text-white/60" />
                </div>
              )}
              
              {/* Play Button Overlay */}
              <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <Button
                  size="sm"
                  className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm border-white/20 hover:bg-white/30"
                  onClick={() => setIsPlaying(!isPlaying)}
                >
                  {isPlaying ? (
                    <Pause className="w-4 h-4" />
                  ) : (
                    <Play className="w-4 h-4 ml-0.5" />
                  )}
                </Button>
              </div>
            </div>

            {/* Song Info */}
            <div className="flex-1 min-w-0">
              <h3 className="text-xl font-bold text-white mb-1">{song.title}</h3>
              <p className="text-lg text-white/80 mb-2">{song.artist}</p>
              {song.album && (
                <p className="text-sm text-white/60 mb-3">{song.album}</p>
              )}
              
              {/* Tags */}
              <div className="flex flex-wrap gap-2">
                {song.genre && (
                  <Badge variant="secondary" className="bg-blue-500/20 text-blue-300 border-blue-500/30">
                    {song.genre}
                  </Badge>
                )}
                {song.year && (
                  <Badge variant="secondary" className="bg-green-500/20 text-green-300 border-green-500/30">
                    {song.year}
                  </Badge>
                )}
                {song.popularity && (
                  <Badge variant="secondary" className="bg-purple-500/20 text-purple-300 border-purple-500/30">
                    {song.popularity}% popular
                  </Badge>
                )}
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col gap-2">
              <Button
                size="sm"
                variant="ghost"
                className="w-10 h-10 text-white/60 hover:text-white hover:bg-white/10"
                onClick={() => setIsLiked(!isLiked)}
              >
                <Heart className={`w-5 h-5 ${isLiked ? 'fill-red-500 text-red-500' : ''}`} />
              </Button>
              
              {song.spotifyUrl && (
                <Button
                  size="sm"
                  variant="ghost"
                  className="w-10 h-10 text-white/60 hover:text-white hover:bg-white/10"
                  onClick={() => window.open(song.spotifyUrl, '_blank')}
                >
                  <ExternalLink className="w-5 h-5" />
                </Button>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default function AltMusicDiscovery() {
  const [songs, setSongs] = useState<SongData[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [mood, setMood] = useState("");
  const [selectedPersonaId, setSelectedPersonaId] = useState("");
  const [selectedPersonaForModal, setSelectedPersonaForModal] = useState<Persona | null>(null);

  const handlePersonaSelect = (personaId: string) => {
    setSelectedPersonaId(personaId);
    setSelectedPersonaForModal(null);
  };

  const handleClosePersonaModal = () => {
    setSelectedPersonaForModal(null);
  };

  const generateMusic = async () => {
    const currentMood = mood.trim() || undefined;
    const currentPersonaId = selectedPersonaId || undefined;

    if (!currentMood && !currentPersonaId) {
      toast.info("Input needed", {
        description: "Please enter a mood or select a persona.",
      });
      return;
    }

    setIsLoading(true);
    setSongs([]);

    try {
      const result = await findSongs({
        mood: currentMood,
        personaId: currentPersonaId,
        options: {}
      });

      if (!result) {
        throw new Error("Failed to get response from server.");
      } else if ('error' in result && result.error) {
        console.error("Error from findSongs:", result.error);
        throw new Error(`Couldn't get recommendations. ${result.error.includes("AI returned malformed JSON") || result.error.includes("expected JSON format") ? "There was an issue with the AI response." : "Please try again."}`);
      } else if ('songs' in result && result.songs) {
        const successResult = result as FindSongsSuccessResponse;
        setSongs(successResult.songs || []);
        toast.success("Success!", {
          description: `Found ${successResult.songs?.length || 0} songs.`
        });
      } else {
        console.warn("Received unexpected data structure from findSongs:", result);
        throw new Error("Received unexpected data structure.");
      }
    } catch (error: any) {
      console.error("Error calling findSongs:", error);
      const errorMessage = error instanceof Error ? error.message : "An unknown error occurred.";
      toast.error("Error", {
        description: errorMessage,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const selectedPersona = selectedPersonaId ? personas.find(p => p.id === selectedPersonaId) : null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <Link href="/">
            <Button variant="ghost" size="sm" className="text-white/60 hover:text-white hover:bg-white/10">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Button>
          </Link>
          <div className="text-center">
            <h1 className="text-4xl font-bold text-white mb-2">
              Music Discovery
            </h1>
            <p className="text-white/60">
              Find your perfect soundtrack powered by AI and Spotify
            </p>
          </div>
          <div className="w-24" /> {/* Spacer for centering */}
        </div>

        {/* Main Content */}
        <div className="max-w-4xl mx-auto">
          {/* Input Section */}
          <Card className="bg-white/10 backdrop-blur-md border-white/20 mb-8">
            <CardContent className="p-8">
              <div className="space-y-6">
                {/* Mood Input */}
                <div className="space-y-3">
                  <label className="text-lg font-medium text-white">
                    What's your mood?
                  </label>
                  <Input
                    placeholder="e.g., 'Happy and energetic', 'Sad and contemplative', 'Chill and relaxed'"
                    value={mood}
                    onChange={(e) => setMood(e.target.value)}
                    className="bg-white/5 border-white/20 text-white placeholder:text-white/50 focus:border-purple-500/50 focus:ring-purple-500/20 text-lg py-3"
                    disabled={isLoading}
                  />
                </div>

                {/* Persona Selection */}
                <div className="space-y-3">
                  <label className="text-lg font-medium text-white">
                    Choose a music persona (optional)
                  </label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {personas.slice(0, 6).map((persona) => (
                      <Button
                        key={persona.id}
                        variant={selectedPersonaId === persona.id ? "default" : "outline"}
                        size="sm"
                        onClick={() => setSelectedPersonaId(selectedPersonaId === persona.id ? "" : persona.id)}
                        className={`h-auto py-3 px-4 ${
                          selectedPersonaId === persona.id
                            ? "bg-purple-600 hover:bg-purple-700 text-white border-purple-500"
                            : "bg-white/5 hover:bg-white/10 text-white/80 border-white/20"
                        }`}
                        disabled={isLoading}
                      >
                        <div className="text-center">
                          <div className="font-medium">{persona.name}</div>
                          <div className="text-xs opacity-70 mt-1">{persona.description}</div>
                        </div>
                      </Button>
                    ))}
                  </div>
                </div>

                {/* Generate Button */}
                <Button
                  onClick={generateMusic}
                  disabled={isLoading || (!mood.trim() && !selectedPersonaId)}
                  className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-medium py-4 text-lg rounded-lg transition-all duration-300 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                      Finding your perfect songs...
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-5 h-5 mr-2" />
                      Discover Music
                    </>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Results Section */}
          <AnimatePresence mode="wait">
            {isLoading ? (
              <motion.div
                key="loading"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex items-center justify-center py-20"
              >
                <div className="text-center">
                  <Loader2 className="w-12 h-12 animate-spin text-purple-400 mx-auto mb-4" />
                  <p className="text-xl text-white/80 mb-2">Discovering your perfect songs...</p>
                  <p className="text-white/60">This may take a moment</p>
                </div>
              </motion.div>
            ) : songs.length > 0 ? (
              <motion.div
                key="results"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="space-y-6"
              >
                <div className="text-center mb-8">
                  <h2 className="text-2xl font-bold text-white mb-2">
                    Your Music Recommendations
                  </h2>
                  <p className="text-white/60">
                    {songs.length} songs found {selectedPersona && `by ${selectedPersona.name}`}
                  </p>
                </div>
                
                <div className="space-y-4">
                  {songs.map((song, index) => (
                    <SongCard key={`${song.title}-${song.artist}-${index}`} song={song} index={index} />
                  ))}
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex items-center justify-center py-20"
              >
                <div className="text-center">
                  <Volume2 className="w-16 h-16 text-white/40 mx-auto mb-4" />
                  <p className="text-xl text-white/60 mb-2">Ready to discover amazing music?</p>
                  <p className="text-white/40">
                    Enter your mood or select a persona to get started
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Persona Modal */}
      {selectedPersonaForModal && (
        <PersonaModal
          persona={selectedPersonaForModal}
          isOpen={!!selectedPersonaForModal}
          onClose={handleClosePersonaModal}
          onSelectPersona={handlePersonaSelect}
          selectedPersonaId={selectedPersonaId}
        />
      )}
    </div>
  );
} 