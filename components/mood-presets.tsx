"use client"

import { Button } from "@/components/ui/button"

interface MoodPresetsProps {
  onSelectMood: (mood: string) => void
  currentMood: string
}

export function MoodPresets({ onSelectMood, currentMood }: MoodPresetsProps) {
  const moodPresets = [
    { name: "Melancholic", color: "bg-blue-900" },
    { name: "Energetic", color: "bg-orange-900" },
    { name: "Relaxed", color: "bg-teal-800" },
    { name: "Nostalgic", color: "bg-amber-900" },
    { name: "Focused", color: "bg-indigo-900" },
    { name: "Romantic", color: "bg-pink-900" },
    { name: "Introspective", color: "bg-purple-900" },
    { name: "Euphoric", color: "bg-red-900" },
    { name: "Anxious", color: "bg-gray-700" },
    { name: "Frustrated", color: "bg-red-950" },
    { name: "Gloomy", color: "bg-slate-800" },
    { name: "Lonely", color: "bg-stone-700" },
    { name: "Depressed", color: "bg-zinc-800" },
    { name: "Angry", color: "bg-rose-950" },
  ]

  return (
    <div className="mb-6">
      <h3 className="text-lg font-bold mb-3">Quick mood selection</h3>
      <div className="flex flex-wrap gap-2">
        {moodPresets.map((preset) => (
          <Button
            key={preset.name}
            size="sm"
            onClick={() => onSelectMood(preset.name)}
            className={`${preset.color} hover:bg-opacity-80 text-white rounded-full px-4 transition-all ${
              currentMood === preset.name ? 'ring-2 ring-green-500 ring-offset-2 ring-offset-[#121212]' : ''
            }`}
            variant="ghost"
          >
            {preset.name}
          </Button>
        ))}
      </div>
    </div>
  )
}
