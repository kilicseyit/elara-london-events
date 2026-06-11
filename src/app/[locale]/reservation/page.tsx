'use client'

import { useState } from 'react'
import { useTranslations } from 'next-intl'
import { Clock, Mail, Phone, MapPin, CheckCircle2 } from 'lucide-react'
import MotionSection from '@/components/MotionSection'

type FormData = {
  fullName: string
  email: string
  phone: string
  eventType: string
  date: string
  guests: string
  budget: string
  specialRequests: string
}

type FormErrors = Partial<Record<keyof FormData, string>>

const initialForm: FormData = {
  fullName: '',
  email: '',
  phone: '',
  eventType: '',
  date: '',
  guests: '',
  budget: '',
  specialRequests: '',
}

export default function ReservationPage() {
  const t = useTranslations('reservation')
  const [form, setForm] = useState<FormData>(initialForm)
  const [errors, setErrors] = useState<FormErrors>({})
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  const steps = t.raw('info.steps') as Array<{ label: string; text: string }>
  const eventTypes = t.raw('form.event_types') as string[]
  const budgets = t.raw('form.budgets') as string[]

  const validate = (): boolean => {
    const next: FormErrors = {}
    const req = t('form.errors.required')
    const emailErr = t('form.errors.email_invalid')

    if (!form.fullName.trim()) next.fullName = req
    if (!form.email.trim()) next.email = req
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) next.email = emailErr
    if (!form.eventType) next.eventType = req
    if (!form.date) next.date = req

    setErrors(next)
    return Object.keys(next).length === 0
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
    if (errors[name as keyof FormData]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validate()) return
    setLoading(true)
    await new Promise((r) => setTimeout(r, 800))
    setLoading(false)
    setSubmitted(true)
  }

  const inputClass = (field: keyof FormData) =>
    `w-full font-inter text-sm text-ink placeholder-muted bg-white border px-4 py-3 focus:outline-none focus:border-gold transition-colors duration-200 ${
      errors[field] ? 'border-red-400' : 'border-border'
    }`

  return (
    <div className="pt-20">
      {/* Hero strip */}
      <section className="bg-cream border-b border-border py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16">
          <MotionSection>
            <p className="eyebrow mb-3">{t('hero.eyebrow')}</p>
            <h1
              className="font-cormorant font-light text-ink leading-tight mb-4"
              style={{ fontSize: 'clamp(2.2rem, 4vw, 3.5rem)' }}
            >
              {t('hero.title')}
            </h1>
            <p className="font-inter text-base text-muted max-w-xl">{t('hero.subtitle')}</p>
          </MotionSection>
        </div>
      </section>

      {/* Split layout */}
      <section className="py-section">
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-14 lg:gap-20">
            {/* Left info */}
            <MotionSection direction="left" className="lg:col-span-2">
              <h2 className="font-cormorant text-2xl font-light text-ink mb-7">
                {t('info.expect_title')}
              </h2>
              <div className="space-y-6 mb-12">
                {steps.map((step, i) => (
                  <div key={i} className="flex gap-4">
                    <div className="flex flex-col items-center">
                      <div className="w-8 h-8 border border-gold text-gold flex items-center justify-center flex-shrink-0">
                        <Clock size={14} />
                      </div>
                      {i < steps.length - 1 && (
                        <div className="w-px flex-1 bg-border mt-2 min-h-[24px]" />
                      )}
                    </div>
                    <div className="pb-2">
                      <p className="font-inter text-xs uppercase tracking-[0.2em] text-gold mb-1">
                        {step.label}
                      </p>
                      <p className="font-inter text-sm text-muted leading-relaxed">{step.text}</p>
                    </div>
                  </div>
                ))}
              </div>

              <h3 className="font-inter text-xs uppercase tracking-[0.25em] text-gold mb-5">
                {t('info.contact_title')}
              </h3>
              <ul className="space-y-4">
                <li className="flex items-center gap-3">
                  <Mail size={15} className="text-gold flex-shrink-0" />
                  <a href={`mailto:${t('info.email')}`} className="font-inter text-sm text-ink hover:text-gold transition-colors">
                    {t('info.email')}
                  </a>
                </li>
                <li className="flex items-center gap-3">
                  <Phone size={15} className="text-gold flex-shrink-0" />
                  <a href={`tel:${t('info.phone')}`} className="font-inter text-sm text-ink hover:text-gold transition-colors">
                    {t('info.phone')}
                  </a>
                </li>
                <li className="flex items-start gap-3">
                  <MapPin size={15} className="text-gold flex-shrink-0 mt-0.5" />
                  <span className="font-inter text-sm text-ink">{t('info.address')}</span>
                </li>
              </ul>
            </MotionSection>

            {/* Right form */}
            <MotionSection direction="right" delay={0.1} className="lg:col-span-3">
              <div className="bg-white border border-border p-8 md:p-10">
                <h2 className="font-cormorant text-2xl font-light text-ink mb-8">
                  {t('form.title')}
                </h2>

                {submitted ? (
                  <div className="text-center py-16">
                    <CheckCircle2 size={48} className="text-gold mx-auto mb-5" />
                    <h3 className="font-cormorant text-3xl font-light text-ink mb-3">
                      {t('form.success_title')}
                    </h3>
                    <p className="font-inter text-base text-muted">{t('form.success_message')}</p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} noValidate className="space-y-5">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label className="font-inter text-xs uppercase tracking-[0.15em] text-ink block mb-2">
                          {t('form.full_name')} *
                        </label>
                        <input
                          name="fullName"
                          type="text"
                          value={form.fullName}
                          onChange={handleChange}
                          placeholder={t('form.full_name_placeholder')}
                          className={inputClass('fullName')}
                          autoComplete="name"
                        />
                        {errors.fullName && (
                          <p className="font-inter text-xs text-red-500 mt-1">{errors.fullName}</p>
                        )}
                      </div>
                      <div>
                        <label className="font-inter text-xs uppercase tracking-[0.15em] text-ink block mb-2">
                          {t('form.email')} *
                        </label>
                        <input
                          name="email"
                          type="email"
                          value={form.email}
                          onChange={handleChange}
                          placeholder={t('form.email_placeholder')}
                          className={inputClass('email')}
                          autoComplete="email"
                        />
                        {errors.email && (
                          <p className="font-inter text-xs text-red-500 mt-1">{errors.email}</p>
                        )}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label className="font-inter text-xs uppercase tracking-[0.15em] text-ink block mb-2">
                          {t('form.phone')}
                        </label>
                        <input
                          name="phone"
                          type="tel"
                          value={form.phone}
                          onChange={handleChange}
                          placeholder={t('form.phone_placeholder')}
                          className={inputClass('phone')}
                          autoComplete="tel"
                        />
                      </div>
                      <div>
                        <label className="font-inter text-xs uppercase tracking-[0.15em] text-ink block mb-2">
                          {t('form.event_type')} *
                        </label>
                        <select
                          name="eventType"
                          value={form.eventType}
                          onChange={handleChange}
                          className={inputClass('eventType')}
                        >
                          <option value="">{t('form.event_type_placeholder')}</option>
                          {eventTypes.map((type) => (
                            <option key={type} value={type}>{type}</option>
                          ))}
                        </select>
                        {errors.eventType && (
                          <p className="font-inter text-xs text-red-500 mt-1">{errors.eventType}</p>
                        )}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                      <div>
                        <label className="font-inter text-xs uppercase tracking-[0.15em] text-ink block mb-2">
                          {t('form.date')} *
                        </label>
                        <input
                          name="date"
                          type="date"
                          value={form.date}
                          onChange={handleChange}
                          className={inputClass('date')}
                        />
                        {errors.date && (
                          <p className="font-inter text-xs text-red-500 mt-1">{errors.date}</p>
                        )}
                      </div>
                      <div>
                        <label className="font-inter text-xs uppercase tracking-[0.15em] text-ink block mb-2">
                          {t('form.guests')}
                        </label>
                        <input
                          name="guests"
                          type="number"
                          min="1"
                          value={form.guests}
                          onChange={handleChange}
                          placeholder={t('form.guests_placeholder')}
                          className={inputClass('guests')}
                        />
                      </div>
                      <div>
                        <label className="font-inter text-xs uppercase tracking-[0.15em] text-ink block mb-2">
                          {t('form.budget')}
                        </label>
                        <select
                          name="budget"
                          value={form.budget}
                          onChange={handleChange}
                          className={inputClass('budget')}
                        >
                          <option value="">{t('form.budget_placeholder')}</option>
                          {budgets.map((b) => (
                            <option key={b} value={b}>{b}</option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="font-inter text-xs uppercase tracking-[0.15em] text-ink block mb-2">
                        {t('form.special_requests')}
                      </label>
                      <textarea
                        name="specialRequests"
                        value={form.specialRequests}
                        onChange={handleChange}
                        placeholder={t('form.special_requests_placeholder')}
                        rows={4}
                        className={`${inputClass('specialRequests')} resize-none`}
                      />
                    </div>

                    <div className="pt-2">
                      <button
                        type="submit"
                        disabled={loading}
                        className="btn-gold w-full sm:w-auto disabled:opacity-60 disabled:cursor-not-allowed"
                      >
                        {loading ? t('form.submitting') : t('form.submit')}
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </MotionSection>
          </div>
        </div>
      </section>
    </div>
  )
}
