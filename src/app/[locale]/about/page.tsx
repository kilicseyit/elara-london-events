import { useTranslations } from 'next-intl'
import Image from 'next/image'
import { Award, Lock, MapPin } from 'lucide-react'
import DiamondDivider from '@/components/DiamondDivider'
import MotionSection from '@/components/MotionSection'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'About',
}

const valueIcons = [Award, Lock, MapPin]

const teamImages = [
  'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=600&h=700&fit=crop&auto=format&q=80',
  'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=600&h=700&fit=crop&auto=format&q=80',
  'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=600&h=700&fit=crop&auto=format&q=80',
]

export default function AboutPage() {
  const t = useTranslations('about')
  const values = t.raw('values.items') as Array<{ title: string; description: string }>
  const team = t.raw('team.members') as Array<{ name: string; title: string; bio: string }>

  return (
    <>
      {/* Our Story */}
      <section className="pt-36 pb-section">
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-20 items-center">
            <MotionSection direction="left">
              <p className="eyebrow mb-4">{t('story.eyebrow')}</p>
              <h1
                className="font-cormorant font-light text-ink leading-tight mb-8"
                style={{ fontSize: 'clamp(2.2rem, 4vw, 3.5rem)' }}
              >
                {t('story.title')}
              </h1>
              <div className="space-y-5">
                <p className="font-inter text-base text-muted leading-relaxed">{t('story.p1')}</p>
                <p className="font-inter text-base text-muted leading-relaxed">{t('story.p2')}</p>
                <p className="font-inter text-base text-muted leading-relaxed">{t('story.p3')}</p>
              </div>
            </MotionSection>

            <MotionSection direction="right" delay={0.15}>
              <div className="relative h-[500px] lg:h-[600px] overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1486325212027-8081e485255e?w=900&h=1200&fit=crop&auto=format&q=80"
                  alt="London landmark"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
                <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-ink/30 to-transparent" />
              </div>
            </MotionSection>
          </div>
        </div>
      </section>

      <DiamondDivider />

      {/* Our Values */}
      <section className="py-section bg-white">
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16">
          <MotionSection className="text-center mb-14">
            <p className="eyebrow mb-3">{t('values.eyebrow')}</p>
            <h2 className="section-title">{t('values.title')}</h2>
          </MotionSection>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-14">
            {values.map((value, i) => {
              const Icon = valueIcons[i]
              return (
                <MotionSection key={i} delay={i * 0.15} className="text-center">
                  <div className="inline-flex items-center justify-center w-14 h-14 border border-gold text-gold mb-6">
                    <Icon size={22} />
                  </div>
                  <h3 className="font-cormorant text-2xl font-light text-ink mb-4">
                    {value.title}
                  </h3>
                  <p className="font-inter text-sm text-muted leading-relaxed">{value.description}</p>
                </MotionSection>
              )
            })}
          </div>
        </div>
      </section>

      <DiamondDivider />

      {/* Team */}
      <section className="py-section">
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16">
          <MotionSection className="text-center mb-14">
            <p className="eyebrow mb-3">{t('team.eyebrow')}</p>
            <h2 className="section-title">{t('team.title')}</h2>
          </MotionSection>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {team.map((member, i) => (
              <MotionSection key={i} delay={i * 0.12}>
                <div className="text-center">
                  <div className="relative h-80 mb-6 overflow-hidden">
                    <Image
                      src={teamImages[i]}
                      alt={member.name}
                      fill
                      className="object-cover object-top"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-ink/20 to-transparent" />
                  </div>
                  <h3 className="font-cormorant text-2xl font-light text-ink mb-1">
                    {member.name}
                  </h3>
                  <p className="font-inter text-xs uppercase tracking-[0.2em] text-gold mb-4">
                    {member.title}
                  </p>
                  <p className="font-inter text-sm text-muted leading-relaxed">{member.bio}</p>
                </div>
              </MotionSection>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
