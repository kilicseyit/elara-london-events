import { useTranslations } from 'next-intl'
import {
  Briefcase,
  Sparkles,
  MapPin,
  Car,
  Compass,
  Globe,
} from 'lucide-react'
import DiamondDivider from '@/components/DiamondDivider'
import MotionSection from '@/components/MotionSection'
import { Link } from '@/navigation'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Services',
}

const icons = [Briefcase, Sparkles, MapPin, Car, Compass, Globe]

export default function ServicesPage() {
  const t = useTranslations('services')
  const items = t.raw('items') as Array<{
    title: string
    description: string
    features: string[]
  }>

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
            <p className="font-inter text-white/70 text-base max-w-2xl mx-auto">
              {t('hero.subtitle')}
            </p>
          </MotionSection>
        </div>
      </section>

      <DiamondDivider className="py-10" />

      {/* Services Grid */}
      <section className="py-section">
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {items.map((item, i) => {
              const Icon = icons[i]
              return (
                <MotionSection key={i} delay={(i % 3) * 0.1}>
                  <div className="bg-white border border-border hover:border-gold transition-all duration-300 p-8 md:p-10 h-full flex flex-col group cursor-default">
                    <div className="inline-flex items-center justify-center w-12 h-12 border border-gold text-gold mb-6 group-hover:bg-gold group-hover:text-white transition-all duration-300">
                      <Icon size={20} />
                    </div>
                    <h2 className="font-cormorant text-2xl font-light text-ink mb-4">
                      {item.title}
                    </h2>
                    <p className="font-inter text-sm text-muted leading-relaxed mb-6 flex-1">
                      {item.description}
                    </p>
                    <ul className="space-y-2.5">
                      {item.features.map((feature, j) => (
                        <li key={j} className="flex items-start gap-3">
                          <span className="w-1 h-1 rounded-full bg-gold mt-2 flex-shrink-0" aria-hidden="true" />
                          <span className="font-inter text-sm text-ink/80">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </MotionSection>
              )
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-cream border-t border-border py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16 text-center">
          <MotionSection>
            <h2 className="font-cormorant text-3xl md:text-4xl font-light text-ink mb-5">
              Ready to Discuss Your Event?
            </h2>
            <Link href="/reservation" className="btn-gold">
              Make an Enquiry
            </Link>
          </MotionSection>
        </div>
      </section>
    </>
  )
}
