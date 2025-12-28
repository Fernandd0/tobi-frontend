'use client'

import { useState } from 'react'
import Button from '@/components/ui/Button'
import CardModal from '@/components/CardModal'
import { Artist, Track } from '@/types'

interface CardGeneratorProps {
  data: (Artist | Track)[]
  type: 'artists' | 'tracks'
  userName: string
}

export default function CardGenerator({ data, type, userName }: CardGeneratorProps) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <Button size="lg" onClick={() => setIsOpen(true)}>
        Stats cards
      </Button>
      <CardModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        data={data}
        type={type}
        userName={userName}
      />
    </>
  )
}
