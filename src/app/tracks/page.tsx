import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { TopTracks } from '@/components/ui/TopTracks'

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
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-[#F4F1EC] text-[#1A1A1A]">
        <h1 className="text-xl font-bold text-[#FF6F3C] mb-2">Login Incomplete</h1>
        <p className="text-[#6E6E6E] mb-6 text-center max-w-sm">
          You are logged in to Supabase, but the Spotify token is missing.
        </p>
        <form
          action={async () => {
            'use server'
            const sb = await createClient()
            await sb.auth.signOut()
            redirect('/')
          }}
        >
          <button className="bg-primary text-white px-8 py-3 rounded-full font-medium hover:opacity-90 transition shadow-sm">
            Retry Login
          </button>
        </form>
      </div>
    )
  }

  const res = await fetch(
    'https://api.spotify.com/v1/me/top/tracks?time_range=short_term&limit=10',
    {
      headers: { Authorization: `Bearer ${providerToken}` },
      cache: 'no-store'
    }
  )

  if (!res.ok) {
    return <div className="p-10 text-[#1A1A1A]">Error connecting to Spotify API.</div>
  }

  const data = await res.json()
  const tracks = data.items || []
  const userName = user.user_metadata.full_name?.split(' ')[0] || 'User'

  return (
    <div className="flex my-16 flex-col items-center min-h-screen p-4 sm:p-8 bg-[#F4F1EC] text-[#1A1A1A] pt-24">
      <div className="w-full max-w-md mb-8 flex justify-between items-end">
        <div>
          <h1 className="text-4xl font-bold tracking-tight text-primary">Hey, {userName} !</h1>
          <p className="text-[#6E6E6E] text-sm mt-2 font-medium">Your top rotation this month</p>
        </div>
      </div>

      <div className="bg-[#EAE6E1] p-2 sm:p-4 rounded-[2rem] border border-[#D4CFC8]/50 max-w-md w-full shadow-sm">
        <TopTracks tracks={tracks} />

        <div className="mt-6 px-4 pb-4 pt-6 border-t border-[#D4CFC8] text-center">
          <p className="text-xs text-[#6E6E6E] mb-4 font-medium">
            Ready to see what AI says about this?
          </p>
          <button
            disabled
            className="w-full bg-primary text-white font-semibold py-3.5 rounded-2xl opacity-50 cursor-not-allowed shadow-sm"
          >
            Generate AI Analysis (Coming Soon)
          </button>
        </div>
      </div>
    </div>
  )
}
