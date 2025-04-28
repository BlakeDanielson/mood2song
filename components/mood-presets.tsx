"use client"

import { Button } from "@/components/ui/button"

interface MoodPresetsProps {
  onSelectMood: (mood: string) => void
}

export function MoodPresets({ onSelectMood }: MoodPresetsProps) {
  const moodPresets = [
    { name: "Melancholic", color: "bg-blue-900" },
    { name: "Energetic", color: "bg-orange-900" },
    { name: "Relaxed", color: "bg-green-900" },
    { name: "Nostalgic", color: "bg-amber-900" },
    { name: "Focused", color: "bg-indigo-900" },
    { name: "Romantic", color: "bg-pink-900" },
    { name: "Introspective", color: "bg-purple-900" },
    { name: "Euphoric", color: "bg-red-900" },
  ]

  return (
    <div className="mb-6">
      <h3 className="text-lg font-bold mb-3">Quick mood selection</h3>
      <div className="flex flex-wrap gap-2">
        {moodPresets.map((mood) => (
          <Button
            key={mood.name}
            size="sm"
            onClick={() => onSelectMood(mood.name)}
            className={`${mood.color} hover:bg-opacity-80 text-white rounded-full px-4`}
            variant="ghost"
          >
            {mood.name}
          </Button>
        ))}
      </div>
    </div>
  )
}
