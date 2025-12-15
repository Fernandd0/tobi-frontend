import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import Image from 'next/image'
import Button from '@/components/ui/Button'
import { Track } from '@/types'
import CardGenerator from '@/components/CardGenerator'

export default async function TracksPage() {
  const supabase = await createClient()
  const {
    data: { user },
    error
  } = await supabase.auth.getUser()

  if (error || !user) {
    redirect('/')
  }

  const {
    data: { session }
  } = await supabase.auth.getSession()
  const providerToken = session?.provider_token

  if (!providerToken) {
    return <div className="p-8 text-center text-primary">Login incomplete. Please re-login.</div>
  }

  const res = await fetch(
    'https://api.spotify.com/v1/me/top/tracks?time_range=short_term&limit=20',
    {
      headers: { Authorization: `Bearer ${providerToken}` },
      cache: 'no-store'
    }
  )

  if (!res.ok) {
    return <div className="p-10 text-primary">Error connecting to Spotify API.</div>
  }
  const data = await res.json()
  const tracks: Track[] = data.items || []

  const userName = user?.user_metadata?.full_name || user?.email?.split('@')[0] || 'User'

  return (
    <div className="min-h-screen pb-24 pt-28">
      <div className="mb-6 px-2">
        <h1 className="text-3xl font-bold tracking-tight text-primary">Top Tracks</h1>
        <p className="text-[#6E6E6E] text-sm font-medium">Your most played songs.</p>
      </div>

      <div className="grid grid-cols-16 md:grid-rows-16 gap-1 aspect-square">
        {tracks.map((track, i: number) => {
          let spanClass = 'col-span-4 row-span-4 aspect-square'
          const mobileClass = 'col-span-4 row-span-4'

          if (i === 0) {
            spanClass = `${mobileClass} md:col-span-8 md:row-span-8 md:aspect-square`
          } else if (i === 1) {
            spanClass = `${mobileClass} md:col-span-4 md:row-span-6`
          } else if (i === 2 || i === 3 || i === 4) {
            spanClass = `${mobileClass} md:col-span-4 md:row-span-5`
          } else if (i === 5 || i === 6 || i === 7 || i === 8 || i === 9) {
            spanClass = `${mobileClass} md:col-span-4 md:row-span-3`
          } else if (i === 10 || i === 11 || i === 12 || i === 13) {
            spanClass = `${mobileClass} md:col-span-2 md:row-span-3`
          } else if (i === 14 || i === 15) {
            spanClass = `${mobileClass} md:col-span-3 md:row-span-2`
          } else if (i === 16 || i === 17) {
            spanClass = `${mobileClass} md:col-span-2 md:row-span-2`
          } else if (i === 18 || i === 19) {
            spanClass = `${mobileClass} md:col-span-1 md:row-span-2`
          }

          const titleSize =
            i === 0
              ? 'text-2xl md:text-4xl'
              : i < 3
              ? 'text-xl md:text-2xl'
              : 'text-base md:text-lg'
          const badgeSize =
            i === 0
              ? 'w-8 h-8 md:w-12 md:h-12 text-sm md:text-xl'
              : 'w-6 h-6 md:w-8 md:h-8 text-xs md:text-sm'

          return (
            <div
              key={track.id}
              className={`relative group rounded-xl overflow-hidden bg-white shadow-sm hover:shadow-md transition-all duration-300 ${spanClass}`}
            >
              {track.album.images[0] && (
                <Image
                  src={track.album.images[0].url}
                  alt={track.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
              )}

              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-90" />

              <div className="absolute bottom-0 left-0 p-1 w-full">
                <div className="flex items-end justify-between gap-2">
                  {i < 10 && (
                    <p
                      className={`text-white font-bold leading-tight drop-shadow-sm line-clamp-2 ${titleSize}`}
                    >
                      {track.name}
                    </p>
                  )}
                  <span
                    className={`flex-shrink-0 font-bold text-orange bg-white/20 backdrop-blur-md flex items-center justify-center rounded-lg ${badgeSize}`}
                  >
                    #{i + 1}
                  </span>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-12 pb-8">
        <CardGenerator data={tracks} type="tracks" userName={userName} />
        <Button variant="secondary" size="lg">
          Check your Vibe
        </Button>
      </div>
    </div>
  )
}
