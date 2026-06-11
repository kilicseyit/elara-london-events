import { useTranslations } from 'next-intl'
import Image from 'next/image'
import { Link } from '@/navigation'
import { MessageSquare, Layout, CheckCircle2, Quote } from 'lucide-react'
import DiamondDivider from '@/components/DiamondDivider'
import MotionSection from '@/components/MotionSection'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Elara London Events — Luxury Event Management & DMC',
}

const serviceImages = [
  'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&h=600&fit=crop&auto=format&q=80',
  'https://images.unsplash.com/photo-1511578314322-25a7d42af2a3?w=800&h=600&fit=crop&auto=format&q=80',
  'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=800&h=600&fit=crop&auto=format&q=80',
]

const stepIcons = [MessageSquare, Layout, CheckCircle2]

export default function HomePage() {
  const t = useTranslations('home')

  const steps = t.raw('how_we_work.steps') as Array<{ title: string; description: string }>
  const servicesPreview = t.raw('services_preview') as Array<{ title: string; description: string }>
  const testimonials = t.raw('testimonials.items') as Array<{
    quote: string; name: string; role: string; company: string
  }>

  return (
    <>
      {/* Hero */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=1920&h=1080&fit=crop&auto=format&q=80"
          alt="Luxury London event venue"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-ink/60 via-ink/50 to-ink/70" />
        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
          <MotionSection delay={0.1}>
            <p className="font-inter text-xs uppercase tracking-[0.3em] text-gold-light mb-6">
              {t('hero.eyebrow')}
            </p>
          </MotionSection>
          <MotionSection delay={0.25}>
            <h1
              className="font-cormorant font-light text-white leading-tight mb-6"
              style={{ fontSize: 'clamp(2.8rem, 6vw, 5.5rem)' }}
            >
              {t('hero.title')}
            </h1>
          </MotionSection>
          <MotionSection delay={0.4}>
            <p className="font-inter text-white/80 text-lg leading-relaxed mb-10 max-w-2xl mx-auto">
              {t('hero.subtitle')}
            </p>
          </MotionSection>
          <MotionSection delay={0.55}>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/services" className="btn-outline">
                {t('hero.cta_services')}
              </Link>
              <Link href="/reservation" className="btn-gold">
                {t('hero.cta_reservation')}
              </Link>
            </div>
          </MotionSection>
        </div>
      </section>

      {/* Stats Strip */}
      <section className="bg-white border-b border-border">
        <div className="container-pad py-14 md:py-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-0 md:divide-x divide-border">
            {(['years', 'events', 'countries'] as const).map((key, i) => (
              <MotionSection key={key} delay={i * 0.12} className="text-center px-8">
                <span className="font-cormorant text-6xl font-light text-gold block leading-none mb-2">
                  {t(`stats.${key}_value`)}
                </span>
                <span className="font-inter text-xs uppercase tracking-[0.2em] text-muted">
                  {t(`stats.${key}_label`)}
                </span>
              </MotionSection>
            ))}
          </div>
        </div>
      </section>

      <DiamondDivider className="py-8" />

      {/* Services Preview */}
      <section className="py-section">
        <div className="container-pad">
          <MotionSection className="text-center mb-14">
            <p className="eyebrow mb-3">{t('services_section.eyebrow')}</p>
            <h2 className="section-title">{t('services_section.title')}</h2>
          </MotionSection>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {servicesPreview.map((service, i) => (
              <MotionSection key={i} delay={i * 0.12}>
                <div className="group bg-white border border-border hover:border-gold transition-colors duration-300 cursor-pointer h-full flex flex-col">
                  <div className="relative h-52 overflow-hidden">
                    <Image
                      src={serviceImages[i]}
                      alt={service.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                  </div>
                  <div className="p-7 flex flex-col flex-1">
                    <h3 className="font-cormorant text-2xl font-light text-ink mb-3">
                      {service.title}
                    </h3>
                    <p className="font-inter text-sm text-muted leading-relaxed flex-1 mb-5">
                      {service.description}
                    </p>
                    <Link
                      href="/services"
                      className="font-inter text-xs uppercase tracking-[0.2em] text-gold hover:text-gold-light transition-colors duration-200 flex items-center gap-2"
                    >
                      {t('services_section.learn_more')}
                      <span aria-hidden="true">→</span>
                    </Link>
                  </div>
                </div>
              </MotionSection>
            ))}
          </div>
        </div>
      </section>

      <DiamondDivider />

      {/* How We Work */}
      <section className="py-section bg-white">
        <div className="container-pad">
          <MotionSection className="text-center mb-14">
            <p className="eyebrow mb-3">{t('how_we_work.eyebrow')}</p>
            <h2 className="section-title">{t('how_we_work.title')}</h2>
          </MotionSection>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-16">
            {steps.map((step, i) => {
              const Icon = stepIcons[i]
              return (
                <MotionSection key={i} delay={i * 0.15} className="text-center">
                  <div className="inline-flex items-center justify-center w-14 h-14 border border-gold text-gold mb-5">
                    <Icon size={22} />
                  </div>
                  <h3 className="font-cormorant text-2xl font-light text-ink mb-3">
                    {step.title}
                  </h3>
                  <p className="font-inter text-sm text-muted leading-relaxed">
                    {step.description}
                  </p>
                </MotionSection>
              )
            })}
          </div>
        </div>
      </section>

      <DiamondDivider />

      {/* Testimonials */}
      <section className="py-section">
        <div className="container-pad">
          <MotionSection className="text-center mb-14">
            <p className="eyebrow mb-3">{t('testimonials.eyebrow')}</p>
            <h2 className="section-title">{t('testimonials.title')}</h2>
          </MotionSection>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((item, i) => (
              <MotionSection key={i} delay={i * 0.12}>
                <div className="bg-white border border-border p-8 h-full flex flex-col">
                  <Quote size={24} className="text-gold mb-5 flex-shrink-0" />
                  <p className="font-cormorant text-xl font-light italic text-ink leading-relaxed flex-1 mb-6">
                    &ldquo;{item.quote}&rdquo;
                  </p>
                  <div className="border-t border-border pt-5">
                    <p className="font-inter text-sm font-medium text-ink">{item.name}</p>
                    <p className="font-inter text-xs text-muted mt-0.5">{item.role}</p>
                    <p className="font-inter text-xs text-gold mt-0.5">{item.company}</p>
                  </div>
                </div>
              </MotionSection>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="bg-forest py-20 md:py-24">
        <div className="container-pad text-center">
          <MotionSection>
            <p className="eyebrow text-gold-light mb-4">{''}</p>
            <h2
              className="font-cormorant font-light text-white leading-tight mb-6"
              style={{ fontSize: 'clamp(2rem, 4vw, 3.2rem)' }}
            >
              {t('cta_banner.title')}
            </h2>
            <p className="font-inter text-white/70 text-base mb-10 max-w-xl mx-auto">
              {t('cta_banner.subtitle')}
            </p>
            <Link href="/reservation" className="btn-outline">
              {t('cta_banner.button')}
            </Link>
          </MotionSection>
        </div>
      </section>
    </>
  )
}
