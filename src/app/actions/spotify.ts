'use server'

import { auth } from '@/lib/auth'
import { headers } from 'next/headers'
import { supabaseAdmin } from '@/lib/supabase/server'

async function getSpotifyAccessToken() {
  const session = await auth.api.getSession({
    headers: await headers()
  })

  if (!session?.user) throw new Error('Not authenticated')
}

async function spotifyFetch(endpoint: string) {
  const token = await getSpotifyAccessToken()
  const response = await fetch(`https://api.spotify.com/v1${endpoint}`, {
    headers: { Authorization: `Bearer ${token}` },
    cache: 'no-store'
  })

  if (!response.ok) {
    throw new Error(`Spotify API error: ${response.status}`)
  }

  return response.json()
}

export async function getTopTracks(
  timeRange: 'short_term' | 'medium_term' | 'long_term' = 'short_term',
  limit: number = 10
) {
  const data = await spotifyFetch(`/me/top/tracks?time_range=${timeRange}&limit=${limit}`)
  return data.items
}

export async function getTopArtists(
  timeRange: 'short_term' | 'medium_term' | 'long_term' = 'short_term',
  limit: number = 10
) {
  const data = await spotifyFetch(`/me/top/artists?time_range=${timeRange}&limit=${limit}`)
  return data.items
}

export async function getRecentlyPlayed(limit: number = 50) {
  const data = await spotifyFetch(`/me/player/recently-played?limit=${limit}`)
  return data.items
}

export async function getAudioFeatures(trackIds: string[]) {
  const ids = trackIds.join(',')
  const data = await spotifyFetch(`/audio-features?ids=${ids}`)
  return data.audio_features
}

export async function getMyProfile() {
  return spotifyFetch('/me')
}

export async function getMyPlaylists(limit: number = 20) {
  const data = await spotifyFetch(`/me/playlists?limit=${limit}`)
  return data.items
}
