import { betterAuth } from 'better-auth'

export const auth = betterAuth({
  socialProviders: {
    spotify: {
      clientId: process.env.SPOTIFY_CLIENT_ID!,
      clientSecret: process.env.SPOTIFY_CLIENT_SECRET!,
      scopes: [
        'user-read-email',
        'user-read-private',
        'user-top-read',
        'user-read-recently-played',
        'playlist-read-private'
      ]
    }
  },

  baseURL: process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
  secret: process.env.BETTER_AUTH_SECRET!
})

export type Session = typeof auth.$Infer.Session
