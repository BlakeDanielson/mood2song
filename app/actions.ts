"use server"

import { cookies } from "next/headers"
import { generateText } from "ai"
import { openai } from "@ai-sdk/openai"
import { z } from "zod"
import { searchTracks } from "@/lib/spotify"
import { revalidatePath } from "next/cache"
import { personas, Persona } from "@/lib/personas"

// Define the schema for a single song
const songItemSchema = z.object({
  title: z.string(),
  artist: z.string(),
  link: z.string().optional(),
  reason: z.string().optional(),
  year: z.coerce.string().optional(),
  genre: z.string().optional(),
})

// Define the schema for song recommendations - ONLY expect object with songs array
const songSchema = z.object({
    songs: z.array(songItemSchema),
  })

export interface SongData {
  title: string;
  artist: string;
  album?: string;
  link?: string;
  reason?: string;
  year?: string;
  genre?: string;
  spotifyId?: string;
  spotifyUri?: string;
  previewUrl?: string | null;
  spotifyUrl?: string;
  artistSpotifyUrl?: string;
  albumArt?: string;
  embedUrl?: string;
  popularity?: number;
  releaseDate?: string;
}

// Type for the successful response from findSongs
export interface FindSongsSuccessResponse {
  songs: SongData[];
  mood: string;
  filters: Record<string, any>; // Or be more specific if possible
  persona: { id: string; name: string } | null;
  timestamp: string;
  error?: undefined; // Explicitly undefined on success
}

// Type for the error response from findSongs
export interface FindSongsErrorResponse {
  error: string;
  persona: { id: string; name: string } | null;
  songs?: undefined; // Explicitly undefined on error
  mood?: undefined;
  filters?: undefined;
  timestamp?: undefined;
}

// Combined type for the return value of findSongs
export type FindSongsResponse = FindSongsSuccessResponse | FindSongsErrorResponse;

// Updated parameters for findSongs
interface FindSongsParams {
  mood?: string;
  personaId?: string;
  options?: {
    genre?: string;
    era?: string;
    popularity?: string;
    language?: string;
    excludeMainstream?: boolean;
  };
}

// Store the current recommendations in cookies
export async function findSongs({
  mood,
  personaId,
  options = {}
}: FindSongsParams): Promise<FindSongsResponse> {
  let prompt = "";
  let selectedPersona: Persona | null = null;
  let currentMood = mood || ""; // Use provided mood or empty string
  let finalFilters = { ...options }; // Use provided options

  // Find persona if ID is provided
  if (personaId) {
    selectedPersona = personas.find(p => p.id === personaId) ?? null;
    if (!selectedPersona) {
      console.warn(`Persona with ID "${personaId}" not found. Proceeding without persona.`);
      personaId = undefined; // Clear invalid personaId
    }
  }

  // --- Prompt Generation Logic ---
  const baseInstruction = `Recommend 10 *new* and *different* song recommendations.`;
  const constraints = `Do not recommend more than 1 song by the same artist. Aim for diversity and include at least one lesser-known artist.`;
  const outputFormat = `
    For each song, provide: title, artist, reason (explaining the connection), year, genre.
    Format your response as a JSON object containing ONLY a 'songs' array (with title, artist, album, reason, year, genre properties). Ensure the JSON is valid.
  `;
  const filterInstructions = (() => {
      let filterText = "";
      const { genre, era, popularity, language, excludeMainstream } = options;
      if (genre && genre !== 'any') filterText += ` Focus on the ${genre} genre.`;
      if (era && era !== 'any') filterText += ` Prefer songs from the ${era} era.`;
      if (popularity === "obscure") filterText += ` Recommend lesser-known, obscure tracks.`;
      else if (popularity === "indie") filterText += ` Focus on independent artists.`;
      else if (popularity === "classic") filterText += ` Recommend timeless classics.`;
      if (language && language !== 'any') filterText += ` Include songs in ${language}.`;
      if (excludeMainstream) filterText += ` Avoid extremely popular songs.`;
      return filterText;
  })();

  if (selectedPersona && currentMood) {
    // Case 1: Both Persona and Mood provided
    prompt = `You are the ${selectedPersona.name}, ${selectedPersona.description}. `;
    prompt += `Your favorite artists are: ${selectedPersona.artists.join(', ')}. `;
    prompt += `Generate recommendations that fit your persona *and* match the mood "${currentMood}". `;
    prompt += `Focus on songs and artists that ${selectedPersona.traits.join(', ')}. `;
    prompt += `Explain briefly why each song fits both the ${selectedPersona.name} vibe *and* the "${currentMood}" mood. `;
    prompt += baseInstruction;
    prompt += filterInstructions;
    prompt += constraints;
    prompt += `Do not recommend more than 2 songs by your favorite artists.`;
    prompt += outputFormat;
    console.log("Using Combined Persona & Mood Prompt for:", selectedPersona.name, "and Mood:", currentMood);

  } else if (selectedPersona) {
    // Case 2: Only Persona provided
    prompt = `You are the ${selectedPersona.name}, ${selectedPersona.description}. `;
    prompt += `Your favorite artists are: ${selectedPersona.artists.join(', ')}. `;
    prompt += `Generate recommendations that fit your persona. `;
    prompt += `Focus on songs and artists that ${selectedPersona.traits.join(', ')}. `;
    prompt += `Explain briefly why each song fits the ${selectedPersona.name} vibe. `;
    prompt += baseInstruction;
    prompt += filterInstructions;
    prompt += constraints;
    prompt += `Do not recommend more than 2 songs by your favorite artists.`;
    prompt += outputFormat;
    console.log("Using Persona Prompt for:", selectedPersona.name);

  } else if (currentMood) {
    // Case 3: Only Mood provided
    prompt = `Based on the mood "${currentMood}", ${baseInstruction}`;
    prompt += filterInstructions;
    prompt += constraints;
    prompt += `Explain briefly why each song matches the "${currentMood}" mood.`;
    prompt += outputFormat;
    console.log("Using Mood Prompt for:", currentMood);

  } else {
    // Case 4: Neither Mood nor Persona provided (Error case)
    console.error("Invalid arguments: Mood or Persona required for song generation.");
    return {
      error: "Invalid arguments for song generation. Please provide a mood or select a persona.",
      persona: null,
    };
  }

  try {
    // Ensure personaId being logged matches the potentially cleared one if invalid
    console.log("Selected Persona ID for request:", personaId);
    console.log("Current Mood:", currentMood);
    console.log("Applied Filters:", finalFilters);
    console.log("--- Sending Prompt to AI ---");
    console.log(prompt);
    console.log("-----------------------------");

    const { text } = await generateText({
      // model: openai("gpt-4.1"), // Consider gpt-4o or a newer model if available/preferred
      model: openai("gpt-4o"),
      prompt,
      temperature: 0.9,
    })

    console.log("--- Received Response from AI ---");
    console.log(text);
    console.log("--------------------------------");

    let jsonString = "";
    const jsonBlockMatch = text.match(/```json\\s*([\\s\\S]*?)\\s*```/);
    if (jsonBlockMatch && jsonBlockMatch[1]) {
        jsonString = jsonBlockMatch[1].trim();
    } else {
        const genericBlockMatch = text.match(/```\\s*([\\s\\S]*?)\\s*```/);
        if (genericBlockMatch && genericBlockMatch[1]) {
            jsonString = genericBlockMatch[1].trim();
            if (!jsonString.startsWith("{") && !jsonString.startsWith("[")) {
                jsonString = "";
            }
        } else {
            const firstBrace = text.indexOf('{');
            const firstBracket = text.indexOf('[');
            let startIndex = -1;

            if (firstBrace !== -1 && (firstBracket === -1 || firstBrace < firstBracket)) {
                startIndex = firstBrace;
            } else if (firstBracket !== -1) {
                startIndex = firstBracket;
            }

            if (startIndex !== -1) {
                const lastBrace = text.lastIndexOf('}');
                const lastBracket = text.lastIndexOf(']');
                let endIndex = -1;

                if (startIndex === firstBrace && lastBrace !== -1) {
                    endIndex = lastBrace;
                } else if (startIndex === firstBracket && lastBracket !== -1) {
                     let openCount = 0;
                     let potentialEndIndex = -1;
                     for(let i = startIndex; i < text.length; i++) {
                         if (text[i] === '[') openCount++;
                         else if (text[i] === ']') openCount--;
                         if (openCount === 0 && startIndex === i) continue;
                         if (openCount === 0 && text[i] === ']') {
                            potentialEndIndex = i;
                            break;
                         }
                     }
                     endIndex = potentialEndIndex !== -1 ? potentialEndIndex : lastBracket;
                } else if (lastBrace > lastBracket) {
                    endIndex = lastBrace;
                } else {
                    endIndex = lastBracket;
                }


                if (endIndex > startIndex) {
                    jsonString = text.substring(startIndex, endIndex + 1).trim();
                }
            }
        }
    }

    if (!jsonString) {
      console.error("Could not extract JSON from AI response:", text);
      throw new Error("AI response did not contain expected JSON format.");
    }

    let parsedData: { songs: any[] };
    try {
      parsedData = songSchema.parse(JSON.parse(jsonString));
    } catch (parseError) {
      console.error("Failed to parse JSON from AI:", parseError);
      console.error("Invalid JSON string received:", jsonString);
      throw new Error("AI returned malformed JSON structure.");
    }

    if (!parsedData || !Array.isArray(parsedData.songs)) {
      console.error("Parsed data is not in the expected format (object with songs array):", parsedData);
      throw new Error("AI response did not contain a valid 'songs' array.");
    }

    // Enrich with Spotify data
    const enrichedSongs: SongData[] = await Promise.all(
      parsedData.songs.map(async (song) => {
        const query = `${song.title} artist:${song.artist}`;
        const spotifyData = await searchTracks(query, 1); // Fetch only the top track match
        const track = spotifyData?.tracks?.items?.[0];

        let spotifyUrl = track?.external_urls?.spotify;
        let artistSpotifyUrl = track?.artists?.[0]?.external_urls?.spotify; // <-- Get artist URL
        let albumArt = track?.album?.images?.[0]?.url; // Use largest image
        let embedUrl = spotifyUrl ? `https://open.spotify.com/embed/track/${track.id}` : undefined;
        let previewUrl = track?.preview_url;
        let popularity = track?.popularity;
        let releaseDate = track?.album?.release_date;
        let album = track?.album?.name;

        return {
          ...song,
          title: track?.name || song.title, // Prefer Spotify's title if available
          artist: track?.artists?.map((a: any) => a.name).join(", ") || song.artist, // Prefer Spotify's artist(s)
          album: album || song.album,
          spotifyId: track?.id,
          spotifyUri: track?.uri,
          spotifyUrl: spotifyUrl,
          artistSpotifyUrl: artistSpotifyUrl, // <-- Add artist URL to returned object
          albumArt: albumArt,
          embedUrl: embedUrl,
          previewUrl: previewUrl,
          popularity: popularity,
          releaseDate: releaseDate,
          year: song.year || (releaseDate ? new Date(releaseDate).getFullYear().toString() : undefined),
          genre: song.genre || track?.album?.genres?.[0] || undefined, // Add fallback genre from track if needed
        };
      })
    );

    console.log("--- Enriched Songs ---");
    console.log(JSON.stringify(enrichedSongs, null, 2));
    console.log("--------------------");

    const successResponse: FindSongsSuccessResponse = {
      songs: enrichedSongs,
      mood: currentMood,
      filters: finalFilters,
      persona: selectedPersona ? { id: selectedPersona.id, name: selectedPersona.name } : null,
      timestamp: new Date().toISOString(),
    }

    // Save to cookies (optional, implement if needed)
    // cookies().set("latestRecommendations", JSON.stringify(successResponse))
    // revalidatePath("/")

    return successResponse;

  } catch (error: any) {
    console.error("Error in findSongs processing:", error);
    const errorMessage = error instanceof Error ? error.message : "An unknown error occurred during song processing.";
    return {
      error: errorMessage,
      persona: selectedPersona ? { id: selectedPersona.id, name: selectedPersona.name } : null,
    };
  }
}

export async function getSongRecommendations() {
  const cookieStore = await cookies();
  const recommendationsCookie = cookieStore.get("songRecommendations");

  if (!recommendationsCookie?.value) {
    console.log("No recommendations cookie found.");
    return null;
  }

  try {
    const parsedData = JSON.parse(recommendationsCookie.value);
    return parsedData;
  } catch (error) {
    console.error("Error parsing song recommendations cookie:", error);
    return null;
  }
}
