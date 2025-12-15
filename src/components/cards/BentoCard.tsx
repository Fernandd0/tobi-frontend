import { Artist, Track } from '@/types'
import Image from 'next/image'

interface BentoCardProps {
  data: (Artist | Track)[]
  type: 'artists' | 'tracks'
  userName: string
}

export default function BentoCard({ data, type, userName }: BentoCardProps) {
  return (
    <div className="w-[340px] h-[550px] bg-white p-4 rounded-3xl shadow-2xl relative overflow-hidden flex flex-col gap-3">
      <div className="flex justify-between items-end px-1">
        <div>
          <h3 className="text-2xl font-bold text-black leading-none">{userName}&apos;s</h3>
          <p className="text-sm font-medium text-gray-500 uppercase tracking-wide">Top {type}</p>
        </div>
        <div className="bg-orange/10 text-orange px-2 py-1 rounded-lg text-xs font-bold">
          #1 FAN
        </div>
      </div>

      {/* Mini Bento Grid - 4x4 */}
      <div className="grid grid-cols-4 grid-rows-4 gap-2 flex-1 min-h-0">
        {data.slice(0, 9).map((item, i) => {
          let spanClass = 'col-span-1 row-span-1'
          if (i === 0) spanClass = 'col-span-2 row-span-2' // #1
          else if (i === 1 || i === 2) spanClass = 'col-span-2 row-span-1' // #2, #3
          else if (i === 3 || i === 4) spanClass = 'col-span-1 row-span-2' // #4, #5

          const isMain = i === 0

          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const itemAny = item as any
          const imageUrl = itemAny?.images?.[0]?.url || itemAny?.album?.images?.[0]?.url

          return (
            <div
              key={item.id}
              className={`relative rounded-xl overflow-hidden group bg-gray-100 ${spanClass}`}
            >
              {imageUrl ? (
                <Image src={imageUrl} alt={item.name} fill className="object-cover" />
              ) : (
                <div className="w-full h-full bg-gray-200" />
              )}

              <div
                className={`absolute inset-0 bg-gradient-to-t ${
                  isMain ? 'from-black/70' : 'from-black/60'
                } to-transparent flex items-end ${isMain ? 'p-4' : 'p-1.5'}`}
              >
                <span
                  className={`text-white font-bold ${
                    isMain ? 'text-xl line-clamp-2' : 'text-[10px] truncate'
                  }`}
                >
                  {item.name}
                </span>
              </div>

              <div
                className={`absolute ${
                  isMain ? 'top-3 right-3 px-2 py-1 text-xs' : 'top-1 left-1 w-5 h-5 text-[10px]'
                } flex items-center justify-center bg-white/30 backdrop-blur-md rounded-${
                  isMain ? 'lg' : 'full'
                } font-bold text-white`}
              >
                #{i + 1}
              </div>
            </div>
          )
        })}
      </div>

      <div className="flex items-center justify-between mt-2 pt-2 border-t border-gray-100">
        <div className="flex items-center gap-1.5">
          <span className="text-[10px] font-bold text-gray-400">TOBI STATS</span>
        </div>
        <span className="text-[10px] text-gray-300 font-medium">{new Date().getFullYear()}</span>
      </div>
    </div>
  )
}
