'use client'

import { motion } from 'framer-motion'
import { BarChart3, Music2, Sparkles, Mic2, Zap, Disc } from 'lucide-react'

export default function FloatingFigures() {
  return (
    <div className="hidden lg:block fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Left Column */}
      <div className="absolute left-[max(1rem,calc(50%-28rem))] top-0 bottom-0 flex flex-col items-center justify-center gap-16 opacity-30">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{
            opacity: 1,
            x: 0,
            y: [0, -10, 0]
          }}
          transition={{
            duration: 1,
            delay: 0.2,
            y: {
              duration: 3,
              repeat: Infinity,
              ease: 'easeInOut'
            }
          }}
          className="flex flex-col items-center gap-2"
        >
          <div className="w-px h-16 bg-gradient-to-b from-transparent to-black/10" />
          <div className="p-2.5 rounded-xl border border-black/5 bg-white/40 backdrop-blur-sm shadow-sm">
            <Sparkles className="w-12 h-12 text-orange/60" strokeWidth={1.5} />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{
            opacity: 1,
            x: 0,
            y: [0, -15, 0]
          }}
          transition={{
            duration: 1,
            delay: 0.5,
            y: {
              duration: 4,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: 0.5
            }
          }}
          className="flex flex-col items-center gap-2"
        >
          <div className="w-px h-12 bg-black/10" />
          <div className="p-3 rounded-2xl border border-black/5 bg-white/40 backdrop-blur-sm shadow-sm">
            <Music2 className="w-12 h-12 text-gray-400" strokeWidth={1.5} />
          </div>
          <div className="w-px h-12 bg-black/10" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{
            opacity: 1,
            x: 0,
            y: [0, -10, 0]
          }}
          transition={{
            duration: 1,
            delay: 0.8,
            y: {
              duration: 3.5,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: 1
            }
          }}
          className="flex flex-col items-center gap-2"
        >
          <div className="p-2 rounded-lg border border-black/5 bg-white/40 backdrop-blur-sm shadow-sm">
            <Mic2 className="w-12 h-12 text-gray-400" strokeWidth={1.5} />
          </div>
          <div className="w-px h-20 bg-gradient-to-t from-transparent to-black/10" />
        </motion.div>
      </div>

      {/* Right Column */}
      <div className="absolute right-[max(1rem,calc(50%-28rem))] top-0 bottom-0 flex flex-col items-center justify-center gap-24 opacity-30">
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{
            opacity: 1,
            x: 0,
            y: [0, -12, 0]
          }}
          transition={{
            duration: 1,
            delay: 0.3,
            y: {
              duration: 4.5,
              repeat: Infinity,
              ease: 'easeInOut'
            }
          }}
          className="flex flex-col items-center gap-2"
        >
          <div className="w-px h-12 bg-gradient-to-b from-transparent to-black/10" />
          <div className="p-2 rounded-xl border border-black/5 bg-white/40 backdrop-blur-sm shadow-sm">
            <Zap className="w-12 h-12 text-orange/60" strokeWidth={1.5} />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{
            opacity: 1,
            x: 0,
            y: [0, -18, 0]
          }}
          transition={{
            duration: 1,
            delay: 0.7,
            y: {
              duration: 5,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: 0.7
            }
          }}
          className="flex flex-col items-center gap-2"
        >
          <div className="w-px h-8 bg-black/10" />
          <div className="p-3 rounded-2xl border border-black/5 bg-white/40 backdrop-blur-sm shadow-sm">
            <BarChart3 className="w-12 h-12 text-gray-400" strokeWidth={1.5} />
          </div>
          <div className="w-px h-16 bg-black/10" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{
            opacity: 1,
            x: 0,
            y: [0, -10, 0]
          }}
          transition={{
            duration: 1,
            delay: 1,
            y: {
              duration: 3.8,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: 1.5
            }
          }}
          className="flex flex-col items-center gap-2"
        >
          <div className="p-2.5 rounded-full border border-black/5 bg-white/40 backdrop-blur-sm shadow-sm">
            <Disc className="w-12 h-12 text-gray-400" strokeWidth={1.5} />
          </div>
          <div className="w-px h-12 bg-gradient-to-t from-transparent to-black/10" />
        </motion.div>
      </div>
    </div>
  )
}
