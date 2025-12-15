'use client'

import { useState, useRef } from 'react'
import { toPng } from 'html-to-image'
import { Download, X, Code, Receipt, LayoutGrid, Loader2 } from 'lucide-react'
import { Artist, Track } from '@/types'
import Button from '@/components/ui/Button'
import DevCard from './cards/DevCard'
import ReceiptCard from './cards/ReceiptCard'
import BentoCard from './cards/BentoCard'

interface CardModalProps {
  isOpen: boolean
  onClose: () => void
  data: (Artist | Track)[]
  type: 'artists' | 'tracks'
  userName: string
}

type CardStyle = 'dev' | 'receipt' | 'bento'

export default function CardModal({ isOpen, onClose, data, type, userName }: CardModalProps) {
  const [selectedStyle, setSelectedStyle] = useState<CardStyle>('dev')
  const [isGenerating, setIsGenerating] = useState(false)
  const cardRef = useRef<HTMLDivElement>(null)

  if (!isOpen) return null

  const handleDownload = async () => {
    if (cardRef.current === null) return

    setIsGenerating(true)
    try {
      const dataUrl = await toPng(cardRef.current, { cacheBust: true, pixelRatio: 2 })
      const link = document.createElement('a')
      link.download = `tobi-${type}-card.png`
      link.href = dataUrl
      link.click()
    } catch (err) {
      console.error('Error generating image', err)
    } finally {
      setIsGenerating(false)
    }
  }

  const renderCard = () => {
    switch (selectedStyle) {
      case 'dev':
        return <DevCard data={data} type={type} userName={userName} />
      case 'receipt':
        return <ReceiptCard data={data} type={type} userName={userName} />
      case 'bento':
        return <BentoCard data={data} type={type} userName={userName} />
      default:
        return null
    }
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-md transition-opacity"
        onClick={onClose}
      />

      <div
        className="
         relative w-full max-w-4xl h-[85vh] md:h-[600px]
         bg-white/10 backdrop-blur-xl border border-white/20 
         rounded-3xl shadow-2xl overflow-hidden
         flex flex-col md:flex-row
      "
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-50 p-2 rounded-full bg-black/20 text-white hover:bg-black/40 transition-colors"
        >
          <X size={20} />
        </button>

        <div className="flex-1 relative bg-black/5 overflow-y-auto scrollbar-hide">
          <div className="min-h-full w-full flex items-center justify-center p-8">
            <div className="relative group scale-[0.8] md:scale-100 transition-transform duration-300 shadow-2xl rounded-2xl">
              <div ref={cardRef}>{renderCard()}</div>
              {isGenerating && (
                <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/20 backdrop-blur-sm rounded-lg">
                  <Loader2 className="w-10 h-10 text-white animate-spin" />
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="w-full md:w-[320px] bg-white/80 backdrop-blur-xl p-6 flex flex-col gap-6 border-l border-white/20">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">Make your card</h2>
            <p className="text-sm text-gray-500">Choose a style and share your vibe.</p>
          </div>

          <div className="flex flex-col gap-3 flex-1 overflow-y-auto">
            <label
              className={`
                    flex items-center gap-4 p-3 rounded-xl border-2 cursor-pointer transition-all
                    ${
                      selectedStyle === 'dev'
                        ? 'border-orange bg-orange/5'
                        : 'border-transparent hover:bg-gray-50'
                    }
                `}
            >
              <input
                type="radio"
                name="style"
                value="dev"
                checked={selectedStyle === 'dev'}
                onChange={() => setSelectedStyle('dev')}
                className="hidden"
              />
              <div
                className={`p-2 rounded-lg ${
                  selectedStyle === 'dev' ? 'bg-orange text-white' : 'bg-gray-100 text-gray-500'
                }`}
              >
                <Code size={20} />
              </div>
              <div className="flex-1">
                <div className="font-bold text-gray-800">Dev Mode</div>
                <div className="text-xs text-gray-500">For the code wizards</div>
              </div>
            </label>

            <label
              className={`
                    flex items-center gap-4 p-3 rounded-xl border-2 cursor-pointer transition-all
                    ${
                      selectedStyle === 'receipt'
                        ? 'border-orange bg-orange/5'
                        : 'border-transparent hover:bg-gray-50'
                    }
                `}
            >
              <input
                type="radio"
                name="style"
                value="receipt"
                checked={selectedStyle === 'receipt'}
                onChange={() => setSelectedStyle('receipt')}
                className="hidden"
              />
              <div
                className={`p-2 rounded-lg ${
                  selectedStyle === 'receipt' ? 'bg-orange text-white' : 'bg-gray-100 text-gray-500'
                }`}
              >
                <Receipt size={20} />
              </div>
              <div className="flex-1">
                <div className="font-bold text-gray-800">Receiptify</div>
                <div className="text-xs text-gray-500">The classic receipt look</div>
              </div>
            </label>

            <label
              className={`
                    flex items-center gap-4 p-3 rounded-xl border-2 cursor-pointer transition-all
                    ${
                      selectedStyle === 'bento'
                        ? 'border-orange bg-orange/5'
                        : 'border-transparent hover:bg-gray-50'
                    }
                `}
            >
              <input
                type="radio"
                name="style"
                value="bento"
                checked={selectedStyle === 'bento'}
                onChange={() => setSelectedStyle('bento')}
                className="hidden"
              />
              <div
                className={`p-2 rounded-lg ${
                  selectedStyle === 'bento' ? 'bg-orange text-white' : 'bg-gray-100 text-gray-500'
                }`}
              >
                <LayoutGrid size={20} />
              </div>
              <div className="flex-1">
                <div className="font-bold text-gray-800">Portfolio</div>
                <div className="text-xs text-gray-500">Your top items in a grid</div>
              </div>
            </label>
          </div>

          <div className="pt-4 border-t border-gray-50 space-y-3">
            <Button
              onClick={handleDownload}
              className="w-full justify-center gap-2"
              disabled={isGenerating}
            >
              {isGenerating ? (
                <Loader2 className="animate-spin" size={18} />
              ) : (
                <Download size={18} />
              )}
              Download Image
            </Button>

            {/* <div className="flex items-center justify-center gap-4 pt-2">
              <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">
                Share on
              </span>
              <div className="flex gap-2">
                <button className="p-2 rounded-full bg-gray-100 text-gray-600 hover:bg-pink-50 hover:text-pink-600 transition-colors">
                  <Instagram size={18} />
                </button>
                <button className="p-2 rounded-full bg-gray-100 text-gray-600 hover:bg-blue-50 hover:text-blue-600 transition-colors">
                  <Facebook size={18} />
                </button>
                <button className="p-2 rounded-full bg-gray-100 text-gray-600 hover:bg-green-50 hover:text-green-600 transition-colors">
                  <Smartphone size={18} />
                </button>
              </div>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  )
}
