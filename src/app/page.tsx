'use client'
import Image from 'next/image'

export default function Home() {
  return (
    <div className="font-sans items-center justify-items-center min-h-screen max-w-screen-sm mx-auto pt-4">
      <section
        id="hero"
        className="relative flex flex-col items-center justify-center text-center py-24 px-4"
      >
        <div className="mx-auto">
          <h1 className="text-5xl font-bold mb-6 leading-tight tracking-tight">
            Your playlists. Your vibe.{' '}
            <span className="text-primary hover:text-orange transition-colors duration-300">
              Your story.
            </span>
          </h1>
          <p className="text-lg text-subtext mb-10">
            Tobi turns your listening data into shareable cards and brutally honest AI takes mouthly
            recaps and mood shifts that feel <i>personal again</i>.
          </p>
        </div>

        <div className="relative w-full mx-auto">
          <a
            href="#ai-cards"
            className="absolute right-24 top-12 rotate-9 opacity-70 hover:opacity-90 hover:rotate-12 transition-all duration-300"
            aria-label="See AI shareable cards"
          >
            <Image
              src="/img/iphone.png"
              alt="Secondary Card Mock"
              width={250}
              height={350}
              className="drop-shadow-xl"
            />
          </a>

          <Image
            src="/img/iphone.png"
            alt="Tobi Landing Graphic"
            width={280}
            height={400}
            className="transition-transform duration-500 drop-shadow-xl mx-auto"
          />
        </div>

        <p className="mt-6 text-sm text-subtext">
          Weekly or monthly recap cards — tap the second card to see AI cards ↓
        </p>
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
            src="/img/iphone.png"
            alt="Secondary Card Mock"
            width={200}
            height={200}
            className="drop-shadow-xl mx-auto"
          />
        </div>

        <div className="max-w-2xl mx-auto text-center mt-10">
          <button
            type="button"
            className="cursor-pointer hover:bg-orange/80 inline-flex items-center gap-2 px-6 py-3 rounded-full border border-border text-sm font-medium bg-orange text-white transition"
            data-action="open-generate-modal"
          >
            Generate my AI card
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-4 h-4"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </section>

      <section id="community-design" className="py-24 px-4 border-t border-border">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-4xl font-semibold tracking-tight mb-4">
            Design our{' '}
            <span className="text-primary hover:text-orange duration-300 transition-colors">
              Monthly Top Cards
            </span>
          </h2>
          <p className="text-lg text-subtext mb-8">
            Got a vision for monthly top cards? Colors, layout, typography we want your take. Drop a
            quick idea and we’ll consider it for Tobi.
          </p>

          <div className="my-10">
            <Image
              src="/img/iphone.png"
              alt="Secondary Card Mock"
              width={200}
              height={200}
              className="drop-shadow-xl mx-auto"
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
            <button
              type="submit"
              className="px-5 py-3 rounded-xl border border-border bg-orange hover:bg-orange/80 cursor-pointer text-white transition text-sm font-medium"
            >
              Send
            </button>
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
