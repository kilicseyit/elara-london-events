'use client'

import { useState, useEffect } from 'react'
import { useTranslations, useLocale } from 'next-intl'
import { Link, usePathname, useRouter } from '@/navigation'
import { Menu, X } from 'lucide-react'

const navLinks = [
  { href: '/', key: 'home' },
  { href: '/services', key: 'services' },
  { href: '/about', key: 'about' },
  { href: '/gallery', key: 'gallery' },
  { href: '/reservation', key: 'reservation' },
] as const

export default function Navbar() {
  const t = useTranslations('nav')
  const locale = useLocale()
  const router = useRouter()
  const pathname = usePathname()
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (mobileOpen) document.body.style.overflow = 'hidden'
    else document.body.style.overflow = ''
    return () => { document.body.style.overflow = '' }
  }, [mobileOpen])

  const toggleLocale = () => {
    const next = locale === 'en' ? 'tr' : 'en'
    router.replace(pathname, { locale: next })
  }

  const navBg = scrolled
    ? 'bg-white/95 backdrop-blur-sm shadow-sm border-b border-border'
    : 'bg-transparent'

  const linkColor = scrolled ? 'text-ink hover:text-gold' : 'text-white hover:text-gold-light'
  const logoColor = scrolled ? 'text-ink' : 'text-white'
  const logoSubColor = scrolled ? 'text-muted' : 'text-white/70'

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${navBg}`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16 flex items-center justify-between h-20">
          <Link href="/" className="flex flex-col leading-none group">
            <span className={`font-cormorant text-2xl font-light tracking-wide transition-colors duration-300 ${logoColor}`}>
              Elara
            </span>
            <span className={`font-inter text-[9px] uppercase tracking-[0.3em] transition-colors duration-300 ${logoSubColor}`}>
              London Events
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-8" aria-label="Main navigation">
            {navLinks.map(({ href, key }) => (
              <Link
                key={key}
                href={href}
                className={`font-inter text-xs uppercase tracking-[0.15em] transition-colors duration-200 cursor-pointer ${linkColor}`}
              >
                {t(key)}
              </Link>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-4">
            <button
              onClick={toggleLocale}
              className={`font-inter text-xs tracking-widest uppercase transition-colors duration-200 cursor-pointer ${linkColor}`}
              aria-label={`Switch to ${locale === 'en' ? 'Turkish' : 'English'}`}
            >
              <span className={locale === 'en' ? 'font-semibold text-gold' : ''}>EN</span>
              <span className={`mx-1.5 ${scrolled ? 'text-border' : 'text-white/30'}`}>|</span>
              <span className={locale === 'tr' ? 'font-semibold text-gold' : ''}>TR</span>
            </button>
          </div>

          <button
            className={`md:hidden cursor-pointer transition-colors duration-200 ${linkColor}`}
            onClick={() => setMobileOpen(true)}
            aria-label="Open menu"
          >
            <Menu size={22} />
          </button>
        </div>
      </header>

      {mobileOpen && (
        <div
          className="fixed inset-0 z-50 bg-ink/60 backdrop-blur-sm md:hidden"
          onClick={() => setMobileOpen(false)}
          aria-hidden="true"
        />
      )}

      <aside
        className={`fixed top-0 right-0 h-full w-72 z-[60] bg-white shadow-2xl transform transition-transform duration-300 md:hidden ${
          mobileOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        aria-label="Mobile navigation"
      >
        <div className="flex items-center justify-between p-6 border-b border-border">
          <span className="font-cormorant text-xl text-ink">Menu</span>
          <button
            onClick={() => setMobileOpen(false)}
            className="text-ink hover:text-gold cursor-pointer transition-colors"
            aria-label="Close menu"
          >
            <X size={22} />
          </button>
        </div>

        <nav className="flex flex-col p-6 gap-6">
          {navLinks.map(({ href, key }) => (
            <Link
              key={key}
              href={href}
              onClick={() => setMobileOpen(false)}
              className="font-inter text-sm uppercase tracking-[0.2em] text-ink hover:text-gold transition-colors duration-200 cursor-pointer"
            >
              {t(key)}
            </Link>
          ))}
        </nav>

        <div className="px-6 pt-2 border-t border-border">
          <button
            onClick={() => { toggleLocale(); setMobileOpen(false) }}
            className="font-inter text-xs tracking-widest uppercase text-ink hover:text-gold transition-colors duration-200 cursor-pointer mt-4"
          >
            <span className={locale === 'en' ? 'text-gold font-semibold' : ''}>EN</span>
            <span className="mx-2 text-border">|</span>
            <span className={locale === 'tr' ? 'text-gold font-semibold' : ''}>TR</span>
          </button>
        </div>
      </aside>
    </>
  )
}
