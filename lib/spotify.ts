"use server"

const CLIENT_ID = process.env.SPOTIFY_CLIENT_ID
const CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET
const TOKEN_ENDPOINT = "https://accounts.spotify.com/api/token"
const SPOTIFY_API_BASE = "https://api.spotify.com/v1"

// Cache for the access token to avoid making too many requests
let accessTokenCache: {
  token: string
  expires: number
} | null = null

// Get an access token using Client Credentials Flow
async function getClientCredentialsToken() {
  // Check if we have a valid cached token
  if (accessTokenCache && accessTokenCache.expires > Date.now()) {
    return accessTokenCache.token
  }

  const params = new URLSearchParams({
    grant_type: "client_credentials",
  })

  try {
    const response = await fetch(TOKEN_ENDPOINT, {
      method: "POST",
      headers: {
        Authorization: `Basic ${Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString("base64")}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: params,
      cache: "no-store",
    })

    if (!response.ok) {
      throw new Error(`Failed to get access token: ${response.status} ${response.statusText}`)
    }

    const data = await response.json()

    // Cache the token
    accessTokenCache = {
      token: data.access_token,
      expires: Date.now() + data.expires_in * 1000 - 60000, // Subtract 1 minute for safety
    }

    return data.access_token
  } catch (error) {
    console.error("Error getting client credentials token:", error)
    throw new Error("Failed to authenticate with Spotify")
  }
}

// Search for tracks on Spotify
export async function searchTracks(query: string, limit = 5) {
  try {
    const token = await getClientCredentialsToken()

    const response = await fetch(
      `${SPOTIFY_API_BASE}/search?q=${encodeURIComponent(query)}&type=track&limit=${limit}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        cache: "no-store",
      },
    )

    if (!response.ok) {
      throw new Error(`Failed to search tracks: ${response.status} ${response.statusText}`)
    }

    return await response.json()
  } catch (error) {
    console.error("Error searching tracks:", error)
    return null
  }
}

// Get track details
export async function getTrack(trackId: string) {
  try {
    const token = await getClientCredentialsToken()

    const response = await fetch(`${SPOTIFY_API_BASE}/tracks/${trackId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      cache: "no-store",
    })

    if (!response.ok) {
      throw new Error(`Failed to get track: ${response.status} ${response.statusText}`)
    }

    return await response.json()
  } catch (error) {
    console.error("Error getting track:", error)
    return null
  }
}
