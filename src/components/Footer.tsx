export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="mt-24 max-w-screen-sm w-full mx-auto">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="flex justify-between items-center gap-2 py-6 text-[13px] leading-relaxed">
          <p className="text-subtext ">© {year} TOBI. All rights reserved.</p>

          <p className="text-subtext">
            Built by{' '}
            <a
              href="https://fernan-do.dev/"
              target="_blank"
              rel="noreferrer"
              className="font-medium underline hover:text-primary transition-colors duration-300"
            >
              PixelChill.com
            </a>
          </p>
        </div>
      </div>
    </footer>
  )
}
