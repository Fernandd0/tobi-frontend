'use client'
import Image from 'next/image'
import Button from '@/components/ui/Button'

export default function Home() {
  return (
    <div className="font-sans items-center justify-items-center max-w-screen-sm mx-auto pt-4">
      <section
        id="hero"
        className="relative flex flex-col items-center justify-center text-center py-24"
      >
        <div className="mx-auto">
          <h1 className="text-5xl font-bold mb-6 leading-tight tracking-tight">
            Your playlists. Your vibe.{' '}
            <span className="text-orange transition-colors duration-300">Your story.</span>
          </h1>
          <p className="text-lg text-subtext mb-10">
            Tobi turns your listening data into shareable cards and brutally honest AI takes mouthly
            recaps and mood shifts that feel <i>personal again</i>.
          </p>
        </div>

        <div className="relative w-full max-w-[600px] h-[300px] sm:h-[450px] mx-auto group perspective-1000">
          <div className="absolute left-1/2 top-4 w-[160px] sm:w-[250px] -translate-x-[85%] rotate-[-12deg] transition-all duration-500 ease-out group-hover:rotate-[-25deg] group-hover:-translate-x-[90%] group-hover:-translate-y-4 hover:z-30 hover:!scale-110 z-10">
            <Image
              src="/img/card2.webp"
              alt="Spotify Recap Card 2"
              width={250}
              height={370}
              className="rounded-2xl shadow-2xl border border-white/5 object-cover h-[240px] sm:h-[370px] w-full"
            />
          </div>

          <div className="absolute left-1/2 top-4 w-[160px] sm:w-[250px] -translate-x-[15%] rotate-[12deg] transition-all duration-500 ease-out group-hover:rotate-[25deg] group-hover:-translate-x-[10%] group-hover:-translate-y-4 hover:z-30 hover:!scale-110 z-10">
            <Image
              src="/img/card3.webp"
              alt="Spotify Recap Card 3"
              width={250}
              height={370}
              className="rounded-2xl shadow-2xl border border-white/5 object-cover h-[240px] sm:h-[370px] w-full"
            />
          </div>

          <div className="absolute left-1/2 top-0 w-[160px] sm:w-[250px] -translate-x-1/2 z-20 transition-all duration-500 ease-out group-hover:-translate-y-6 hover:!scale-110 hover:z-30">
            <Image
              src="/img/card1.webp"
              alt="Spotify Recap Card 1"
              width={250}
              height={370}
              className="rounded-2xl shadow-2xl drop-shadow-2xl border border-white/10 object-cover h-[240px] sm:h-[370px] w-full"
              priority
            />
          </div>
        </div>

        <div className="mt-10 flex justify-center">
          <div className="group flex items-center gap-2 text-sm font-medium text-subtext transition-colors duration-300">
            Sign in to check your stats
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="group-hover:translate-x-1 transition-transform duration-300 group-hover:text-orange"
            >
              <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" />
              <polyline points="10 17 15 12 10 7" />
              <line x1="15" x2="3" y1="12" y2="12" />
            </svg>
          </div>
        </div>
      </section>

      <section id="ai-cards" className="py-24 px-4">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-4xl font-semibold tracking-tight mb-4">Cards with AI</h2>
          <p className="text-lg text-subtext">
            Connect your Spotify and generate <b className="text-primary">weekly or monthly</b>{' '}
            recaps: top artists/tracks, listening time ready to share.
          </p>
        </div>

        <div className="mt-10">
          <Image
            src="/img/cardVibe.webp"
            alt="Secondary Card Mock"
            width={350}
            height={350}
            className="drop-shadow-xl mx-auto rounded-xl"
          />
        </div>

        <div className="max-w-2xl mx-auto text-center mt-10">
          <Button type="button" size="lg" className="w-full sm:w-auto">
            Generate my AI card
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-4 h-4 ml-2"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
            </svg>
          </Button>
        </div>
      </section>

      <section id="community-design" className="py-24 px-4 border-t border-border">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-4xl font-semibold tracking-tight mb-4">
            Design our{' '}
            <span className="text-orange duration-300 transition-colors">Monthly Top Cards</span>
          </h2>
          <p className="text-lg text-subtext mb-8">
            Got a vision for monthly top cards? Colors, layout, typography we want your take. Drop a
            quick idea and we’ll consider it for Tobi.
          </p>

          <div className="my-10">
            <Image
              src="/img/buildCards.webp"
              alt="Secondary Card Mock"
              width={350}
              height={350}
              className="drop-shadow-xl mx-auto rounded-xl"
            />
          </div>

          <form
            className="max-w-md mx-auto flex items-center gap-3"
            onSubmit={(e) => {
              e.preventDefault()
              alert('Thanks! Your idea was sent. 💡')
            }}
          >
            <input
              type="text"
              name="idea"
              placeholder="Describe your card idea…"
              className="w-full px-4 py-3 rounded-xl border border-border bg-transparent outline-none"
              required
            />
            <Button type="submit">Send</Button>
          </form>

          <p className="mt-6 text-sm text-subtext">
            Prefer socials? DM us your mock on{' '}
            <a
              href="https://x.com/Fernandddd0"
              target="_blank"
              className="underline underline-offset-4"
            >
              Twitter (X)
            </a>
            .
          </p>
        </div>
      </section>

      <section
        id="integrations"
        className="flex flex-col items-center justify-center text-center py-32 px-6  border-t border-border w-full"
      >
        <h2 className="text-4xl font-bold mb-6">Coming soon</h2>
        <p className="text-lg text-subtext mb-8">
          Connect Tobi with your favorite platforms. <br /> Soon available for{' '}
          <span className="font-semibold">Apple Music</span> and{' '}
          <span className="font-semibold">YouTube Music</span>.
        </p>

        <div className="flex items-center justify-center gap-16">
          <Image src="/ico/apple-music.svg" alt="Apple Music Icon" width={98} height={98} />
          <Image src="/ico/youtube-music.svg" alt="YouTube Music Icon" width={98} height={98} />
        </div>

        <p className="mt-10 text-sm text-subtext">Stay tuned, Tobi keeps evolving.</p>
      </section>
    </div>
  )
}
