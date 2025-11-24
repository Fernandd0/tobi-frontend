import Image from 'next/image'

export function TopTracks({ tracks }: { tracks: any[] }) {
  if (!tracks?.length) {
    return <div className="text-[#6E6E6E] py-8 text-center">No tracks found.</div>
  }

  return (
    <div className="space-y-1 w-full">
      {tracks.map((track, i) => (
        <a
          key={track.id}
          href={track.external_urls.spotify}
          target="_blank"
          rel="noopener noreferrer"
          className="
            group flex items-center gap-4 p-3 rounded-2xl 
            hover:bg-[#F4F1EC] transition-all duration-300 
            border border-transparent hover:border-[#D4CFC8]
            hover:shadow-sm
          "
        >
          <span className="font-mono text-[#6E6E6E] text-sm w-6 text-center group-hover:text-primary transition-colors font-medium">
            {i + 1}
          </span>

          <div className="relative w-12 h-12 rounded-xl overflow-hidden bg-[#D4CFC8] shadow-sm group-hover:scale-105 transition-transform duration-300">
            {track.album.images[0] && (
              <Image
                src={track.album.images[0].url}
                alt={track.name}
                fill
                className="object-cover"
              />
            )}
          </div>

          <div className="flex-1 min-w-0 text-left">
            <h3 className="font-bold text-primary truncate text-[15px]">{track.name}</h3>
            <p className="text-xs text-[#6E6E6E] truncate mt-0.5">
              {track.artists.map((a: any) => a.name).join(', ')}
            </p>
          </div>

          <div className="opacity-0 -translate-x-2 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-300 text-[#6E6E6E]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M7 17L17 7" />
              <path d="M7 7h10v10" />
            </svg>
          </div>
        </a>
      ))}
    </div>
  )
}
