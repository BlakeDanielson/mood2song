"use client"

import { useState } from "react"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface MoodFiltersProps {
  onFilterChange: (filters: {
    genre?: string
    era?: string
    popularity?: string
    language?: string
  }) => void
}

export function MoodFilters({
  onFilterChange
}: MoodFiltersProps) {
  const [filters, setFilters] = useState({
    genre: "",
    era: "",
    popularity: "",
    language: "",
  })

  const handleFilterChange = (key: keyof typeof filters, value: string) => {
    const newFilters = { ...filters, [key]: value }
    setFilters(newFilters)
    onFilterChange(newFilters)
  }

  return (
    <div className="mt-4 p-4 bg-[#282828] rounded-md">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <div className="space-y-2">
          <Label htmlFor="genre" className="text-sm text-muted-foreground">
            Genre
          </Label>
          <Select value={filters.genre} onValueChange={(value) => handleFilterChange("genre", value)}>
            <SelectTrigger 
              id="genre" 
              className="bg-[#333333] border border-[#444444] text-white hover:bg-[#3a3a3a] focus:ring-1 focus:ring-offset-0 focus:ring-[#505050]"
            >
              <SelectValue placeholder="Any genre" />
            </SelectTrigger>
            <SelectContent className="bg-[#333333] text-white border-[#444444]">
              <SelectItem value="any">Any genre</SelectItem>
              <SelectItem value="rock">Rock</SelectItem>
              <SelectItem value="pop">Pop</SelectItem>
              <SelectItem value="hip-hop">Hip-Hop</SelectItem>
              <SelectItem value="r&b">R&B</SelectItem>
              <SelectItem value="jazz">Jazz</SelectItem>
              <SelectItem value="electronic">Electronic</SelectItem>
              <SelectItem value="classical">Classical</SelectItem>
              <SelectItem value="folk">Folk</SelectItem>
              <SelectItem value="indie">Indie</SelectItem>
              <SelectItem value="metal">Metal</SelectItem>
              <SelectItem value="country">Country</SelectItem>
              <SelectItem value="ambient">Ambient</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="era" className="text-sm text-muted-foreground">
            Era
          </Label>
          <Select value={filters.era} onValueChange={(value) => handleFilterChange("era", value)}>
            <SelectTrigger 
              id="era" 
              className="bg-[#333333] border border-[#444444] text-white hover:bg-[#3a3a3a] focus:ring-1 focus:ring-offset-0 focus:ring-[#505050]"
            >
              <SelectValue placeholder="Any era" />
            </SelectTrigger>
            <SelectContent className="bg-[#333333] text-white border-[#444444]">
              <SelectItem value="any">Any era</SelectItem>
              <SelectItem value="2020s">2020s</SelectItem>
              <SelectItem value="2010s">2010s</SelectItem>
              <SelectItem value="2000s">2000s</SelectItem>
              <SelectItem value="1990s">1990s</SelectItem>
              <SelectItem value="1980s">1980s</SelectItem>
              <SelectItem value="1970s">1970s</SelectItem>
              <SelectItem value="1960s">1960s</SelectItem>
              <SelectItem value="classic">Classic (pre-1960s)</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="popularity" className="text-sm text-muted-foreground">
            Discovery Level
          </Label>
          <Select value={filters.popularity} onValueChange={(value) => handleFilterChange("popularity", value)}>
            <SelectTrigger 
              id="popularity" 
              className="bg-[#333333] border border-[#444444] text-white hover:bg-[#3a3a3a] focus:ring-1 focus:ring-offset-0 focus:ring-[#505050]"
            >
              <SelectValue placeholder="Any popularity" />
            </SelectTrigger>
            <SelectContent className="bg-[#333333] text-white border-[#444444]">
              <SelectItem value="any">Any popularity</SelectItem>
              <SelectItem value="obscure">Hidden Gems</SelectItem>
              <SelectItem value="indie">Independent Artists</SelectItem>
              <SelectItem value="classic">Timeless Classics</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="language" className="text-sm text-muted-foreground">
            Language
          </Label>
          <Select value={filters.language} onValueChange={(value) => handleFilterChange("language", value)}>
            <SelectTrigger 
              id="language" 
              className="bg-[#333333] border border-[#444444] text-white hover:bg-[#3a3a3a] focus:ring-1 focus:ring-offset-0 focus:ring-[#505050]"
            >
              <SelectValue placeholder="Any language" />
            </SelectTrigger>
            <SelectContent className="bg-[#333333] text-white border-[#444444]">
              <SelectItem value="any">Any language</SelectItem>
              <SelectItem value="English">English</SelectItem>
              <SelectItem value="Spanish">Spanish</SelectItem>
              <SelectItem value="French">French</SelectItem>
              <SelectItem value="Korean">Korean</SelectItem>
              <SelectItem value="Japanese">Japanese</SelectItem>
              <SelectItem value="Instrumental">Instrumental</SelectItem>
              <SelectItem value="non-English">Non-English</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  )
}
