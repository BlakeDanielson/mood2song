"use client";
import { useState } from "react";
import { Music, Headphones, Heart, Clock, User, Plus } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar } from "@/components/ui/avatar";
import type { Persona } from "@/lib/personas";

interface PersonaCardProps {
  persona: Persona;
  onSelect?: (persona: Persona) => void;
  isSelected?: boolean;
  accentColor?: string;
}

function PersonaCard({
  persona,
  onSelect,
  isSelected = false,
  accentColor = "#3b82f6",
}: PersonaCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isLiked, setIsLiked] = useState(false);

  const cardStyle = {
    "--accent-color": accentColor,
  } as React.CSSProperties;

  return (
    <Card
      className={`overflow-hidden transition-all duration-300 border cursor-pointer ${
        isSelected 
          ? 'border-[var(--accent-color)] shadow-lg shadow-[var(--accent-color)]/25' 
          : 'border-border bg-background hover:shadow-lg'
      }`}
      style={cardStyle}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => onSelect?.(persona)}
    >
      <div className="relative">
        <div
          className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"
          style={{ zIndex: 1 }}
        />
        <img
          src={persona.imageUrl}
          alt={persona.name}
          className="object-cover w-full h-48 transition-transform duration-500"
          style={{
            transform: isHovered ? "scale(1.05)" : "scale(1)",
          }}
        />
        <div
          className="absolute top-3 right-3 z-10 flex items-center gap-2"
          style={{ zIndex: 2 }}
        >
          <button
            onClick={(e) => {
              e.stopPropagation();
              setIsLiked(!isLiked);
            }}
            className="flex items-center justify-center w-8 h-8 rounded-full bg-background/20 backdrop-blur-sm transition-colors hover:bg-background/40"
          >
            <Heart
              size={16}
              className={`transition-colors ${
                isLiked ? "fill-[var(--accent-color)] text-[var(--accent-color)]" : "text-white"
              }`}
            />
          </button>
          <button 
            onClick={(e) => e.stopPropagation()}
            className="flex items-center justify-center w-8 h-8 rounded-full bg-background/20 backdrop-blur-sm transition-colors hover:bg-background/40"
          >
            <Plus size={16} className="text-white" />
          </button>
        </div>
        <div
          className="absolute bottom-0 left-0 w-full p-4 text-white"
          style={{ zIndex: 2 }}
        >
          <h2 className="text-xl font-bold tracking-tight">{persona.name}</h2>
        </div>
      </div>

      <CardContent className="p-4">
        <p className="text-sm text-muted-foreground mb-4 italic">"{persona.description}"</p>

        <div className="space-y-4">
          <div>
            <div className="flex items-center gap-2 mb-2 text-sm font-medium">
              <Music size={16} className="text-[var(--accent-color)]" />
              <span>Traits</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {persona.traits.slice(0, 4).map((trait, i) => (
                <Badge
                  key={i}
                  variant="outline"
                  className="bg-background hover:bg-background/80"
                  style={{
                    borderColor: "var(--accent-color)",
                    color: "var(--accent-color)",
                  }}
                >
                  {trait}
                </Badge>
              ))}
              {persona.traits.length > 4 && (
                <Badge variant="outline" className="text-muted-foreground">
                  +{persona.traits.length - 4} more
                </Badge>
              )}
            </div>
          </div>

          <div>
            <div className="flex items-center gap-2 mb-2 text-sm font-medium">
              <Headphones size={16} className="text-[var(--accent-color)]" />
              <span>Moods</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {persona.moods.slice(0, 3).map((mood, i) => (
                <Badge
                  key={i}
                  className="bg-[var(--accent-color)] hover:bg-[var(--accent-color)]/90 text-white"
                >
                  {mood}
                </Badge>
              ))}
              {persona.moods.length > 3 && (
                <Badge className="bg-muted text-muted-foreground">
                  +{persona.moods.length - 3}
                </Badge>
              )}
            </div>
          </div>

          <div>
            <div className="flex items-center gap-2 mb-2 text-sm font-medium">
              <User size={16} className="text-[var(--accent-color)]" />
              <span>Artists</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {persona.artists.slice(0, 3).map((artist, i) => (
                <div
                  key={i}
                  className="flex items-center gap-2 p-2 rounded-md bg-muted/50 hover:bg-muted transition-colors"
                >
                  <Avatar className="w-6 h-6">
                    <img
                      src={`https://api.dicebear.com/6.x/initials/svg?seed=${artist}`}
                      alt={artist}
                    />
                  </Avatar>
                  <span className="text-sm">{artist}</span>
                </div>
              ))}
              {persona.artists.length > 3 && (
                <div className="flex items-center gap-2 p-2 rounded-md bg-muted/50 text-muted-foreground">
                  <span className="text-sm">+{persona.artists.length - 3} more</span>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="mt-4 pt-4 border-t border-border flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Clock size={14} />
            <span>Popular choice</span>
          </div>
          <button
            className="text-xs font-medium px-3 py-1 rounded-md bg-[var(--accent-color)]/10 text-[var(--accent-color)] hover:bg-[var(--accent-color)]/20 transition-colors"
            onClick={(e) => {
              e.stopPropagation();
              onSelect?.(persona);
            }}
          >
            Select
          </button>
        </div>
      </CardContent>
    </Card>
  );
}

interface PersonaCardsGridProps {
  personas: Persona[];
  onPersonaSelect?: (persona: Persona) => void;
  selectedPersonaId?: string | null;
  className?: string;
}

export function PersonaCardsGrid({ 
  personas, 
  onPersonaSelect, 
  selectedPersonaId,
  className = ""
}: PersonaCardsGridProps) {
  // Define accent colors for different personas
  const getAccentColor = (personaId: string) => {
    const colors = [
      "#8b5cf6", // purple
      "#ef4444", // red
      "#0ea5e9", // blue
      "#10b981", // green
      "#f59e0b", // amber
      "#ec4899", // pink
      "#6366f1", // indigo
      "#14b8a6", // teal
    ];
    
    const index = personas.findIndex(p => p.id === personaId);
    return colors[index % colors.length];
  };

  return (
    <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ${className}`}>
      {personas.map((persona) => (
        <PersonaCard
          key={persona.id}
          persona={persona}
          onSelect={onPersonaSelect}
          isSelected={selectedPersonaId === persona.id}
          accentColor={getAccentColor(persona.id)}
        />
      ))}
    </div>
  );
}

export default PersonaCardsGrid; 