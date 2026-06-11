'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

interface MotionSectionProps {
  children: React.ReactNode
  className?: string
  delay?: number
  direction?: 'up' | 'left' | 'right' | 'none'
}

export default function MotionSection({
  children,
  className = '',
  delay = 0,
  direction = 'up',
}: MotionSectionProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  const initial =
    direction === 'up'
      ? { opacity: 0, y: 32 }
      : direction === 'left'
      ? { opacity: 0, x: -32 }
      : direction === 'right'
      ? { opacity: 0, x: 32 }
      : { opacity: 0 }

  const animate = isInView
    ? { opacity: 1, y: 0, x: 0 }
    : initial

  return (
    <motion.div
      ref={ref}
      initial={initial}
      animate={animate}
      transition={{ duration: 0.7, ease: 'easeOut', delay }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
