import { Artist, Track } from '@/types'

interface ReceiptCardProps {
  data: (Artist | Track)[]
  type: 'artists' | 'tracks'
  userName: string
}

export default function ReceiptCard({ data, type, userName }: ReceiptCardProps) {
  const date = new Date()
    .toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
    .toUpperCase()

  return (
    <div className="w-[340px] bg-[#f5f5f5] p-6 font-mono text-black shadow-2xl relative">
      <div className="text-center mb-6">
        <h2 className="text-3xl font-bold tracking-widest mb-2">TOP {type}</h2>
        <p className="text-sm tracking-widest text-gray-500">LAST MONTH</p>
      </div>

      <div className="text-xs mb-4 uppercase space-y-1">
        <div>ORDER #0001 FOR {userName}</div>
        <div>{date}</div>
      </div>

      <div className="border-b border-dashed border-black/30 mb-2" />

      <div className="flex justify-between text-xs font-bold mb-2">
        <span>#</span>
        <span>ITEM</span>
        <span>MIN</span>
      </div>

      <div className="border-b border-dashed border-black/30 mb-4" />

      <div className="space-y-3 text-xs uppercase mb-6">
        {data.slice(0, 10).map((item, i) => (
          <div key={item.id} className="flex justify-between">
            <span className="w-8">{(i + 1).toString().padStart(2, '0')}</span>
            <span className="flex-1 truncate pr-4">{item.name}</span>
            <span>{(Math.random() * 5 + 2).toFixed(2)}</span>
          </div>
        ))}
      </div>

      <div className="border-b border-dashed border-black/30 mb-2" />

      <div className="flex justify-between font-bold text-sm mb-1">
        <span>ITEM COUNT:</span>
        <span>{data.slice(0, 10).length}</span>
      </div>
      <div className="flex justify-between font-bold text-sm mb-4">
        <span>TOTAL:</span>
        <span>
          {data
            .slice(0, 10)
            .reduce((acc) => acc + (Math.random() * 5 + 2), 0)
            .toFixed(2)}
        </span>
      </div>

      <div className="border-b border-dashed border-black/30 mb-6" />

      <div className="text-xs space-y-1 mb-8">
        <div>CARD #: **** **** **** 2021</div>
        <div>AUTH CODE: 123456</div>
        <div className="uppercase">CARDHOLDER: {userName}</div>
      </div>

      <div className="text-center mb-8">
        <div className="font-bold text-sm mb-4">THANK YOU FOR VISITING!</div>
        <div className="h-12 bg-black w-3/4 mx-auto flex items-end justify-between px-1 gap-px">
          {Array.from({ length: 40 }).map((_, i) => (
            <div
              key={i}
              className={`bg-white h-[${Math.random() > 0.5 ? '80%' : '100%'}] w-full`}
            />
          ))}
        </div>
        <div className="text-[10px] mt-2 tracking-widest">tobi.fernan-do.dev</div>
      </div>

      <div className="flex items-center justify-center gap-2 opacity-80">
        <svg viewBox="0 0 24 24" className="w-6 h-6" fill="currentColor">
          <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 14.521.961.6.3.78 1.02.48 1.62-.3.602-1.02.78-1.561.48z" />
        </svg>
        <span className="font-bold text-sm tracking-tight">Spotify</span>
      </div>
    </div>
  )
}
