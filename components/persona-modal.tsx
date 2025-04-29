"use client"

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import type { Persona } from "@/lib/personas"
import { ScrollArea } from "@/components/ui/scroll-area" // Use ScrollArea for potentially long lists

interface PersonaModalProps {
  persona: Persona | null
  isOpen: boolean
  onClose: () => void
  onSelectPersona: (id: string) => void
  selectedPersonaId: string | null
}

export function PersonaModal({ persona, isOpen, onClose, onSelectPersona, selectedPersonaId }: PersonaModalProps) {
  if (!persona) {
    return null
  }

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[525px] bg-[#181818] border-[#282828] text-white">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-[#1DB954]">{persona.name}</DialogTitle>
          <DialogDescription className="text-muted-foreground pt-2">
            "{persona.description}"
          </DialogDescription>
        </DialogHeader>
        <ScrollArea className="max-h-[60vh] pr-4"> {/* Add ScrollArea */}
          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <h4 className="font-semibold text-white">Vibes & Traits:</h4>
              <div className="flex flex-wrap gap-2">
                {persona.traits.map((trait) => (
                  <Badge key={trait} variant="secondary" className="bg-[#333] text-gray-300">
                    {trait}
                  </Badge>
                ))}
              </div>
            </div>
            <div className="space-y-2">
              <h4 className="font-semibold text-white">Typical Moods:</h4>
              <div className="flex flex-wrap gap-2">
                {persona.moods.map((mood) => (
                  <Badge key={mood} variant="outline" className="border-green-500 text-green-400">
                    {mood}
                  </Badge>
                ))}
              </div>
            </div>
            <div className="space-y-2">
              <h4 className="font-semibold text-white">Key Artists:</h4>
              <div className="flex flex-wrap gap-2">
                {persona.artists.map((artist) => (
                  <Badge key={artist} variant="secondary" className="bg-[#555] text-gray-200">
                    {artist}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </ScrollArea>
        <DialogFooter className="flex justify-between sm:justify-between pt-4"> {/* Modify footer layout */}
           {/* Select Persona Button (Left) */}
           <Button 
             type="button" 
             className="spotify-button"
             onClick={() => {
               if (persona) {
                 if (persona.id !== selectedPersonaId) {
                   onSelectPersona(persona.id);
                 }
                 onClose();
               }
             }}
           >
             Select Persona
           </Button>
           {/* Close Button (Right) */}
           <DialogClose asChild>
            <Button type="button" variant="secondary" className="bg-[#333] hover:bg-[#444]">
              Close
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
} 