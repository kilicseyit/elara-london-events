'use client'

import { useState } from 'react'
import { useTranslations } from 'next-intl'
import Image from 'next/image'
import { X, ChevronLeft, ChevronRight } from 'lucide-react'
import MotionSection from '@/components/MotionSection'
import DiamondDivider from '@/components/DiamondDivider'

const galleryImages = [
  {
    src: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=1200&h=900&fit=crop&auto=format&q=80',
    alt: 'Luxury ballroom event',
  },
  {
    src: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&h=1100&fit=crop&auto=format&q=80',
    alt: 'Corporate conference',
  },
  {
    src: 'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c0?w=1200&h=800&fit=crop&auto=format&q=80',
    alt: 'Private celebration',
  },
  {
    src: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=800&h=1000&fit=crop&auto=format&q=80',
    alt: 'London skyline at night',
  },
  {
    src: 'https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?w=1200&h=800&fit=crop&auto=format&q=80',
    alt: 'Luxury venue interior',
  },
  {
    src: 'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=800&h=1100&fit=crop&auto=format&q=80',
    alt: 'London Tower Bridge',
  },
  {
    src: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1200&h=800&fit=crop&auto=format&q=80',
    alt: 'Fine dining experience',
  },
  {
    src: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=800&h=1000&fit=crop&auto=format&q=80',
    alt: 'Luxury transfer vehicle',
  },
  {
    src: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=1200&h=900&fit=crop&auto=format&q=80',
    alt: 'Cultural tour experience',
  },
  {
    src: 'https://images.unsplash.com/photo-1511578314322-25a7d42af2a3?w=800&h=1100&fit=crop&auto=format&q=80',
    alt: 'Gala dinner setup',
  },
  {
    src: 'https://images.unsplash.com/photo-1527529482837-4651ffebfd8e?w=1200&h=800&fit=crop&auto=format&q=80',
    alt: 'Cocktail reception',
  },
  {
    src: 'https://images.unsplash.com/photo-1556761175-4b46a572b786?w=800&h=1000&fit=crop&auto=format&q=80',
    alt: 'Event team coordination',
  },
]

export default function GalleryPage() {
  const t = useTranslations('gallery')
  const [lightbox, setLightbox] = useState<number | null>(null)

  const openLightbox = (i: number) => setLightbox(i)
  const closeLightbox = () => setLightbox(null)
  const prev = () =>
    setLightbox((cur) => (cur !== null ? (cur - 1 + galleryImages.length) % galleryImages.length : null))
  const next = () =>
    setLightbox((cur) => (cur !== null ? (cur + 1) % galleryImages.length : null))

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowLeft') prev()
    if (e.key === 'ArrowRight') next()
    if (e.key === 'Escape') closeLightbox()
  }

  return (
    <>
      {/* Hero */}
      <section className="bg-forest py-28 md:py-36">
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16 text-center">
          <MotionSection>
            <p className="eyebrow text-gold-light mb-4">{t('hero.eyebrow')}</p>
            <h1
              className="font-cormorant font-light text-white leading-tight mb-5"
              style={{ fontSize: 'clamp(2.5rem, 5vw, 4.5rem)' }}
            >
              {t('hero.title')}
            </h1>
            <p className="font-inter text-white/70 text-base max-w-xl mx-auto">
              {t('hero.subtitle')}
            </p>
          </MotionSection>
        </div>
      </section>

      <DiamondDivider className="py-10" />

      {/* Masonry Grid */}
      <section className="py-section">
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16">
          <div
            className="columns-1 sm:columns-2 lg:columns-3 gap-5"
            style={{ columnFill: 'balance' }}
          >
            {galleryImages.map((img, i) => (
              <div
                key={i}
                className="break-inside-avoid mb-5 overflow-hidden cursor-pointer group relative"
                onClick={() => openLightbox(i)}
                role="button"
                tabIndex={0}
                aria-label={img.alt}
                onKeyDown={(e) => e.key === 'Enter' && openLightbox(i)}
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  width={600}
                  height={400}
                  className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-ink/0 group-hover:bg-ink/20 transition-colors duration-300" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox */}
      {lightbox !== null && (
        <div
          className="fixed inset-0 z-50 bg-ink/95 flex items-center justify-center"
          role="dialog"
          aria-modal="true"
          aria-label="Image lightbox"
          onKeyDown={handleKeyDown}
          tabIndex={-1}
          onClick={closeLightbox}
        >
          <button
            className="absolute top-5 right-5 text-white hover:text-gold transition-colors cursor-pointer z-10"
            onClick={closeLightbox}
            aria-label={t('close')}
          >
            <X size={28} />
          </button>

          <button
            className="absolute left-4 md:left-8 text-white hover:text-gold transition-colors cursor-pointer z-10"
            onClick={(e) => { e.stopPropagation(); prev() }}
            aria-label={t('prev')}
          >
            <ChevronLeft size={36} />
          </button>

          <div
            className="relative max-w-5xl w-full mx-16 md:mx-24"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={galleryImages[lightbox].src}
              alt={galleryImages[lightbox].alt}
              width={1200}
              height={900}
              className="w-full h-auto max-h-[85vh] object-contain"
              priority
            />
            <p className="font-inter text-xs text-white/50 text-center mt-3 uppercase tracking-widest">
              {lightbox + 1} / {galleryImages.length}
            </p>
          </div>

          <button
            className="absolute right-4 md:right-8 text-white hover:text-gold transition-colors cursor-pointer z-10"
            onClick={(e) => { e.stopPropagation(); next() }}
            aria-label={t('next')}
          >
            <ChevronRight size={36} />
          </button>
        </div>
      )}
    </>
  )
}
