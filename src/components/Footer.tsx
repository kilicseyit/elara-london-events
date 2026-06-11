import { useTranslations } from 'next-intl'
import { Link } from '@/navigation'
import { Instagram, Linkedin, Facebook, MapPin, Phone, Mail } from 'lucide-react'

const navLinks = [
  { href: '/', key: 'home' },
  { href: '/services', key: 'services' },
  { href: '/about', key: 'about' },
  { href: '/gallery', key: 'gallery' },
  { href: '/reservation', key: 'reservation' },
] as const

export default function Footer() {
  const t = useTranslations('footer')
  const nav = useTranslations('nav')

  return (
    <footer className="bg-ink text-muted">
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16 py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-16">
          <div>
            <div className="mb-4">
              <span className="font-cormorant text-2xl text-white font-light tracking-wide block">
                Elara
              </span>
              <span className="font-inter text-[9px] uppercase tracking-[0.3em] text-muted">
                London Events
              </span>
            </div>
            <p className="font-inter text-sm leading-relaxed text-muted max-w-xs">
              {t('tagline')}
            </p>
            <div className="flex gap-4 mt-6">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted hover:text-gold transition-colors duration-200 cursor-pointer"
                aria-label="Instagram"
              >
                <Instagram size={18} />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted hover:text-gold transition-colors duration-200 cursor-pointer"
                aria-label="LinkedIn"
              >
                <Linkedin size={18} />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted hover:text-gold transition-colors duration-200 cursor-pointer"
                aria-label="Facebook"
              >
                <Facebook size={18} />
              </a>
            </div>
          </div>

          <div>
            <h3 className="font-inter text-xs uppercase tracking-[0.25em] text-gold mb-6">
              {t('quick_links')}
            </h3>
            <ul className="flex flex-col gap-3">
              {navLinks.map(({ href, key }) => (
                <li key={key}>
                  <Link
                    href={href}
                    className="font-inter text-sm text-muted hover:text-white transition-colors duration-200 cursor-pointer"
                  >
                    {nav(key)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-inter text-xs uppercase tracking-[0.25em] text-gold mb-6">
              {t('contact')}
            </h3>
            <ul className="flex flex-col gap-4">
              <li className="flex items-start gap-3">
                <Mail size={15} className="text-gold mt-0.5 flex-shrink-0" />
                <a
                  href={`mailto:${t('email')}`}
                  className="font-inter text-sm text-muted hover:text-white transition-colors duration-200"
                >
                  {t('email')}
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Phone size={15} className="text-gold mt-0.5 flex-shrink-0" />
                <a
                  href={`tel:${t('phone')}`}
                  className="font-inter text-sm text-muted hover:text-white transition-colors duration-200"
                >
                  {t('phone')}
                </a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin size={15} className="text-gold mt-0.5 flex-shrink-0" />
                <span className="font-inter text-sm text-muted">{t('address')}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16 py-5 flex flex-col md:flex-row items-center justify-between gap-2">
          <p className="font-inter text-xs text-muted/70">{t('copyright')}</p>
          <p className="font-inter text-xs text-muted/70">{t('location')}</p>
        </div>
      </div>
    </footer>
  )
}
