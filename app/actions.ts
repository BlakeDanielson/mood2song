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
  link?: string;
  reason?: string;
  year?: string;
  genre?: string;
  spotifyId?: string;
  spotifyUri?: string;
  previewUrl?: string | null;
  spotifyUrl?: string;
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


// Store the current recommendations in cookies
export async function findSongs(
  moodOrPersona: string | { personaId: string },
  options: {
    genre?: string
    era?: string
    popularity?: string
    language?: string
    excludeMainstream?: boolean
  } = {},
): Promise<FindSongsResponse> {
  let prompt = "";
  let selectedPersona: Persona | null = null;
  let currentMood = "";
  let finalFilters = { ...options };

  let personaId: string | undefined = undefined;

  if (typeof moodOrPersona === 'object' && moodOrPersona !== null && 'personaId' in moodOrPersona) {
    personaId = moodOrPersona.personaId;
  }

  if (personaId) {
    selectedPersona = personas.find(p => p.id === personaId) ?? null;

    if (selectedPersona) {
      currentMood = `Based on the ${selectedPersona.name} persona`;
      prompt = `You are the ${selectedPersona.name}, ${selectedPersona.description}. `;
      prompt += 'Your favorite artists are: ' + selectedPersona.artists.join(', ');
      prompt += 'Do not recommend more than 2 songs by your favorite artists. And do not recommend more than 1 song by the same artist.';
      prompt += `Generate a list of 4 song recommendations that fit your persona. `;
      prompt += `Focus on songs and artists that ${selectedPersona.traits.join(', ')} `;
      prompt += `Explain briefly why each song fits the ${selectedPersona.name} vibe. `;

      // Apply filters from options to the prompt if provided
      const { genre, era, popularity, language, excludeMainstream } = options
      if (genre) prompt += ` Focus on the ${genre} genre.`
      if (era) prompt += ` Prefer songs from the ${era} era.`
      if (popularity === "obscure") prompt += ` Recommend lesser-known, obscure tracks.`
      else if (popularity === "indie") prompt += ` Focus on independent artists.`
      else if (popularity === "classic") prompt += ` Recommend timeless classics.`
      if (language) prompt += ` Include songs in ${language}.`
      if (excludeMainstream) prompt += ` Avoid extremely popular songs.`
      prompt += ` Aim for diversity. Include at least one lesser-known artist.`
      prompt += `
        For each song, provide: title, artist, reason (why it matches mood), year, genre.
        Format your response as a JSON object containing ONLY a 'songs' array (with title, artist, reason, year, genre properties).
      `;
      console.log("Using Persona Prompt for:", selectedPersona.name);

    } else {
      console.warn(`Persona with ID "${personaId}" not found. Falling back to default recommendations.`);
      personaId = undefined;
    }
  }

  if (!selectedPersona) {
    if (typeof moodOrPersona !== 'string') {
      console.error("Invalid arguments: Expected mood string when no valid personaId provided.");
      throw new Error("Invalid arguments for song generation.");
    }
    currentMood = moodOrPersona;
    const { genre, era, popularity, language, excludeMainstream } = options

    prompt = `Based on the mood "${currentMood}", recommend 4 songs that would match this feeling.`
    if (genre) prompt += ` Focus on the ${genre} genre.`
    if (era) prompt += ` Prefer songs from the ${era} era.`
    if (popularity === "obscure") prompt += ` Recommend lesser-known, obscure tracks.`
    else if (popularity === "indie") prompt += ` Focus on independent artists.`
    else if (popularity === "classic") prompt += ` Recommend timeless classics.`
    if (language) prompt += ` Include songs in ${language}.`
    if (excludeMainstream) prompt += ` Avoid extremely popular songs.`
    prompt += ` Aim for diversity. Include at least one lesser-known artist.`
    prompt += `
      For each song, provide: title, artist, reason (why it matches mood), year, genre.
      Format your response as a JSON object containing ONLY a 'songs' array (with title, artist, reason, year, genre properties).
    `;
    console.log("Using Filter/Mood Prompt for:", currentMood);
    finalFilters = options;
  }

  try {
    console.log(personaId)
    console.log("--- Sending Prompt to AI ---");
    console.log(prompt);
    console.log("-----------------------------");

    const { text } = await generateText({
      model: openai("gpt-4.1"),
      prompt,
    })


    const jsonMatch =
      text.match(/```json\n([\s\S]*?)\n```/) ||
      text.match(/```\n([\s\S]*?)\n```/) ||
      text.match(/{[\s\S]*}/) ||
      text.match(/\[[\s\S]*\]/)

    let parsedData;
    if (jsonMatch) {
      const jsonString = jsonMatch[1] || jsonMatch[0];
      try {
        parsedData = JSON.parse(jsonString);
      } catch (parseError) {
        console.error("Failed to parse extracted JSON:", parseError);
        console.error("JSON String attempted:", jsonString);
        throw new Error("AI returned malformed JSON.");
      }
    } else {
        console.error("Could not extract JSON from AI response:", text);
        throw new Error("AI response did not contain expected JSON format.");
    }

    const validatedData = songSchema.parse(parsedData);
    const songsArray = validatedData.songs;

    const spotifyTracks = await Promise.all(
      songsArray.map(async (song) => {
        const query = `track:${song.title} artist:${song.artist}${song.year ? ` year:${song.year}` : ""}`;
        const result = await searchTracks(query);
        if (result?.tracks?.items.length > 0) {
          const track = result.tracks.items[0];
          return {
            ...song,
            spotifyId: track.id,
            spotifyUri: track.uri,
            previewUrl: track.preview_url,
            spotifyUrl: track.external_urls.spotify,
            albumArt: track.album.images[0]?.url,
            embedUrl: `https://open.spotify.com/embed/track/${track.id}`,
            popularity: track.popularity,
            releaseDate: track.album.release_date,
          };
        }
        const broadQuery = `${song.title} ${song.artist}`;
        const broadResult = await searchTracks(broadQuery);
        if (broadResult?.tracks?.items.length > 0) {
           const track = broadResult.tracks.items[0];
           return {
             ...song,
             spotifyId: track.id,
             spotifyUri: track.uri,
             previewUrl: track.preview_url,
             spotifyUrl: track.external_urls.spotify,
             albumArt: track.album.images[0]?.url,
             embedUrl: `https://open.spotify.com/embed/track/${track.id}`,
             popularity: track.popularity,
             releaseDate: track.album.release_date,
           };
        }
        return song;
      }),
    );

    const timestamp = new Date().toISOString();
    const cookieStore = await cookies();

    const resultData: FindSongsSuccessResponse = {
      songs: spotifyTracks,
      mood: currentMood,
      filters: finalFilters,
      persona: selectedPersona ? { id: selectedPersona.id, name: selectedPersona.name } : null,
      timestamp,
    };

    cookieStore.set(
      "songRecommendations",
      JSON.stringify(resultData),
      {
        maxAge: 60 * 60 * 24,
        path: "/",
      },
    );

    revalidatePath("/", "layout");

    return resultData;

  } catch (error) {
    console.error("Error in findSongs:", error);
    const errorResponse: FindSongsErrorResponse = {
       error: error instanceof Error ? error.message : "Failed to generate recommendations.",
       persona: selectedPersona ? { id: selectedPersona.id, name: selectedPersona.name } : null,
     };
     return errorResponse;
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
