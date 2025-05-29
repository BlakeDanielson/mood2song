"use client"

import { useState } from "react"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { motion } from "motion/react"

interface MoodFiltersProps {
  filters: {
    genre: string
    era: string
    popularity: string
    language: string
  }
  onFilterChange: (filters: {
    genre?: string
    era?: string
    popularity?: string
    language?: string
  }) => void
  disabled?: boolean
}

export function MoodFilters({
  filters,
  onFilterChange,
  disabled
}: MoodFiltersProps) {
  const handleFilterChange = (key: keyof typeof filters, value: string) => {
    const newFilters = { ...filters, [key]: value }
    onFilterChange(newFilters)
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="p-6 bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl"
    >
      <h3 className="text-xl font-bold text-white mb-6 text-center">Fine-tune Your Discovery</h3>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <div className="space-y-3">
          <Label htmlFor="genre" className="text-sm font-medium text-gray-300">
            Genre
          </Label>
          <Select 
            value={filters.genre || "any"}
            onValueChange={(value) => handleFilterChange("genre", value)}
            disabled={disabled}
          >
            <SelectTrigger 
              id="genre" 
              className="bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white/20 focus:ring-2 focus:ring-purple-500 focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed rounded-xl h-12"
            >
              <SelectValue placeholder="Any genre" />
            </SelectTrigger>
            <SelectContent className="bg-black/90 backdrop-blur-md text-white border border-white/20 rounded-xl">
              <SelectItem value="any" className="hover:bg-white/10 focus:bg-white/10">Any genre</SelectItem>
              <SelectItem value="rock" className="hover:bg-white/10 focus:bg-white/10">Rock</SelectItem>
              <SelectItem value="pop" className="hover:bg-white/10 focus:bg-white/10">Pop</SelectItem>
              <SelectItem value="hip-hop" className="hover:bg-white/10 focus:bg-white/10">Hip-Hop</SelectItem>
              <SelectItem value="r&b" className="hover:bg-white/10 focus:bg-white/10">R&B</SelectItem>
              <SelectItem value="jazz" className="hover:bg-white/10 focus:bg-white/10">Jazz</SelectItem>
              <SelectItem value="electronic" className="hover:bg-white/10 focus:bg-white/10">Electronic</SelectItem>
              <SelectItem value="classical" className="hover:bg-white/10 focus:bg-white/10">Classical</SelectItem>
              <SelectItem value="folk" className="hover:bg-white/10 focus:bg-white/10">Folk</SelectItem>
              <SelectItem value="indie" className="hover:bg-white/10 focus:bg-white/10">Indie</SelectItem>
              <SelectItem value="metal" className="hover:bg-white/10 focus:bg-white/10">Metal</SelectItem>
              <SelectItem value="country" className="hover:bg-white/10 focus:bg-white/10">Country</SelectItem>
              <SelectItem value="ambient" className="hover:bg-white/10 focus:bg-white/10">Ambient</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-3">
          <Label htmlFor="era" className="text-sm font-medium text-gray-300">
            Era
          </Label>
          <Select 
            value={filters.era || "any"}
            onValueChange={(value) => handleFilterChange("era", value)}
            disabled={disabled}
          >
            <SelectTrigger 
              id="era" 
              className="bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white/20 focus:ring-2 focus:ring-purple-500 focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed rounded-xl h-12"
            >
              <SelectValue placeholder="Any era" />
            </SelectTrigger>
            <SelectContent className="bg-black/90 backdrop-blur-md text-white border border-white/20 rounded-xl">
              <SelectItem value="any" className="hover:bg-white/10 focus:bg-white/10">Any era</SelectItem>
              <SelectItem value="2020s" className="hover:bg-white/10 focus:bg-white/10">2020s</SelectItem>
              <SelectItem value="2010s" className="hover:bg-white/10 focus:bg-white/10">2010s</SelectItem>
              <SelectItem value="2000s" className="hover:bg-white/10 focus:bg-white/10">2000s</SelectItem>
              <SelectItem value="1990s" className="hover:bg-white/10 focus:bg-white/10">1990s</SelectItem>
              <SelectItem value="1980s" className="hover:bg-white/10 focus:bg-white/10">1980s</SelectItem>
              <SelectItem value="1970s" className="hover:bg-white/10 focus:bg-white/10">1970s</SelectItem>
              <SelectItem value="1960s" className="hover:bg-white/10 focus:bg-white/10">1960s</SelectItem>
              <SelectItem value="classic" className="hover:bg-white/10 focus:bg-white/10">Classic (pre-1960s)</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-3">
          <Label htmlFor="popularity" className="text-sm font-medium text-gray-300">
            Discovery Level
          </Label>
          <Select 
            value={filters.popularity || "any"}
            onValueChange={(value) => handleFilterChange("popularity", value)}
            disabled={disabled}
          >
            <SelectTrigger 
              id="popularity" 
              className="bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white/20 focus:ring-2 focus:ring-purple-500 focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed rounded-xl h-12"
            >
              <SelectValue placeholder="Any popularity" />
            </SelectTrigger>
            <SelectContent className="bg-black/90 backdrop-blur-md text-white border border-white/20 rounded-xl">
              <SelectItem value="any" className="hover:bg-white/10 focus:bg-white/10">Any popularity</SelectItem>
              <SelectItem value="obscure" className="hover:bg-white/10 focus:bg-white/10">Hidden Gems</SelectItem>
              <SelectItem value="indie" className="hover:bg-white/10 focus:bg-white/10">Independent Artists</SelectItem>
              <SelectItem value="classic" className="hover:bg-white/10 focus:bg-white/10">Timeless Classics</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-3">
          <Label htmlFor="language" className="text-sm font-medium text-gray-300">
            Language
          </Label>
          <Select 
            value={filters.language || "any"}
            onValueChange={(value) => handleFilterChange("language", value)}
            disabled={disabled}
          >
            <SelectTrigger 
              id="language" 
              className="bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white/20 focus:ring-2 focus:ring-purple-500 focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed rounded-xl h-12"
            >
              <SelectValue placeholder="Any language" />
            </SelectTrigger>
            <SelectContent className="bg-black/90 backdrop-blur-md text-white border border-white/20 rounded-xl">
              <SelectItem value="any" className="hover:bg-white/10 focus:bg-white/10">Any language</SelectItem>
              <SelectItem value="English" className="hover:bg-white/10 focus:bg-white/10">English</SelectItem>
              <SelectItem value="Spanish" className="hover:bg-white/10 focus:bg-white/10">Spanish</SelectItem>
              <SelectItem value="French" className="hover:bg-white/10 focus:bg-white/10">French</SelectItem>
              <SelectItem value="Korean" className="hover:bg-white/10 focus:bg-white/10">Korean</SelectItem>
              <SelectItem value="Japanese" className="hover:bg-white/10 focus:bg-white/10">Japanese</SelectItem>
              <SelectItem value="Instrumental" className="hover:bg-white/10 focus:bg-white/10">Instrumental</SelectItem>
              <SelectItem value="non-English" className="hover:bg-white/10 focus:bg-white/10">Non-English</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </motion.div>
  )
}
