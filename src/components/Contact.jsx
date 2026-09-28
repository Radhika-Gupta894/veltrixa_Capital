import { useState } from 'react'
import { motion } from 'framer-motion'
import { useInView } from '../hooks/useAnimations'
import { Send, Mail, Phone, MapPin, CheckCircle } from 'lucide-react'

const interests = [
  'Equity & Futures',
  'Options Intelligence',
  'Index Strategies',
  'Commodity Intelligence',
  'Portfolio Intelligence',
  'Market Education',
]

export default function Contact() {
  const [ref, isInView] = useInView()
  const [formData, setFormData] = useState({
    name: '', email: '', phone: '', interest: '', message: '',
  })
  const [errors, setErrors] = useState({})
  const [submitted, setSubmitted] = useState(false)

  const validate = () => {
    const errs = {}
    if (!formData.name.trim()) errs.name = 'Name is required'
    if (!formData.email.trim()) errs.email = 'Email is required'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) errs.email = 'Invalid email address'
    if (!formData.message.trim()) errs.message = 'Message is required'
    return errs
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const errs = validate()
    setErrors(errs)
    if (Object.keys(errs).length === 0) {
      setSubmitted(true)
      // In production, this would send to a backend
    }
  }

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }))
  }

  return (
    <section id="contact" className="section-padding relative overflow-hidden">
      <div className="absolute top-0 left-1/3 w-[500px] h-[500px] bg-cyan-electric/[0.015] rounded-full blur-[120px]" />

      <div ref={ref} className="max-w-7xl mx-auto px-6 lg:px-8 relative">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24">
          {/* Left */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <span className="text-cyan-electric/60 text-xs tracking-[0.2em] uppercase font-semibold mb-4 block">
              Get In Touch
            </span>
            <h2 className="text-4xl lg:text-5xl font-extrabold tracking-tight text-surface mb-6 leading-tight">
              Let's Talk About Your <span className="gradient-text">Market Goals.</span>
            </h2>
            <p className="text-surface/40 leading-relaxed mb-12 max-w-md">
              Whether you're exploring structured market strategies or looking for research-driven
              insights, we'd love to hear from you.
            </p>

            {/* Contact Info */}
            <div className="space-y-5">
              <div className="flex items-center gap-4 group">
                <div className="w-11 h-11 rounded-xl bg-cyan-electric/[0.06] border border-cyan-electric/[0.08] flex items-center justify-center group-hover:border-cyan-electric/20 transition-colors">
                  <Mail size={18} className="text-cyan-electric/50" />
                </div>
                <div>
                  <p className="text-xs text-surface/30">Email</p>
                  <p className="text-sm text-surface/70">contact@nexoracapital.com</p>
                </div>
              </div>

              <div className="flex items-center gap-4 group">
                <div className="w-11 h-11 rounded-xl bg-cyan-electric/[0.06] border border-cyan-electric/[0.08] flex items-center justify-center group-hover:border-cyan-electric/20 transition-colors">
                  <Phone size={18} className="text-cyan-electric/50" />
                </div>
                <div>
                  <p className="text-xs text-surface/30">Phone</p>
                  <p className="text-sm text-surface/70">+91 XXXXX XXXXX</p>
                </div>
              </div>

              <div className="flex items-center gap-4 group">
                <div className="w-11 h-11 rounded-xl bg-cyan-electric/[0.06] border border-cyan-electric/[0.08] flex items-center justify-center group-hover:border-cyan-electric/20 transition-colors">
                  <MapPin size={18} className="text-cyan-electric/50" />
                </div>
                <div>
                  <p className="text-xs text-surface/30">Office</p>
                  <p className="text-sm text-surface/70">[Your Office Location]</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right – Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            {submitted ? (
              <div className="glass-card p-12 text-center">
                <CheckCircle size={48} className="text-cyan-electric mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-surface mb-2">Thank You</h3>
                <p className="text-surface/40">
                  We've received your inquiry and will be in touch soon.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="glass-card p-8 space-y-5">
                {/* Name */}
                <div>
                  <label htmlFor="contact-name" className="text-xs text-surface/40 mb-1.5 block font-medium">
                    Full Name <span className="text-red-400">*</span>
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    value={formData.name}
                    onChange={(e) => handleChange('name', e.target.value)}
                    className={`w-full bg-navy-deep/60 border ${errors.name ? 'border-red-400/40' : 'border-cyan-electric/[0.08]'} rounded-xl px-4 py-3 text-sm text-surface placeholder-surface/20 focus:outline-none focus:border-cyan-electric/30 transition-colors`}
                    placeholder="Your name"
                  />
                  {errors.name && <p className="text-[11px] text-red-400 mt-1">{errors.name}</p>}
                </div>

                {/* Email */}
                <div>
                  <label htmlFor="contact-email" className="text-xs text-surface/40 mb-1.5 block font-medium">
                    Email <span className="text-red-400">*</span>
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleChange('email', e.target.value)}
                    className={`w-full bg-navy-deep/60 border ${errors.email ? 'border-red-400/40' : 'border-cyan-electric/[0.08]'} rounded-xl px-4 py-3 text-sm text-surface placeholder-surface/20 focus:outline-none focus:border-cyan-electric/30 transition-colors`}
                    placeholder="your@email.com"
                  />
                  {errors.email && <p className="text-[11px] text-red-400 mt-1">{errors.email}</p>}
                </div>

                {/* Phone */}
                <div>
                  <label htmlFor="contact-phone" className="text-xs text-surface/40 mb-1.5 block font-medium">
                    Phone
                  </label>
                  <input
                    id="contact-phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => handleChange('phone', e.target.value)}
                    className="w-full bg-navy-deep/60 border border-cyan-electric/[0.08] rounded-xl px-4 py-3 text-sm text-surface placeholder-surface/20 focus:outline-none focus:border-cyan-electric/30 transition-colors"
                    placeholder="+91 XXXXX XXXXX"
                  />
                </div>

                {/* Interest */}
                <div>
                  <label htmlFor="contact-interest" className="text-xs text-surface/40 mb-1.5 block font-medium">
                    Area of Interest
                  </label>
                  <select
                    id="contact-interest"
                    value={formData.interest}
                    onChange={(e) => handleChange('interest', e.target.value)}
                    className="w-full bg-navy-deep/60 border border-cyan-electric/[0.08] rounded-xl px-4 py-3 text-sm text-surface/60 focus:outline-none focus:border-cyan-electric/30 transition-colors appearance-none"
                  >
                    <option value="">Select an area</option>
                    {interests.map((i) => (
                      <option key={i} value={i}>{i}</option>
                    ))}
                  </select>
                </div>

                {/* Message */}
                <div>
                  <label htmlFor="contact-message" className="text-xs text-surface/40 mb-1.5 block font-medium">
                    Message <span className="text-red-400">*</span>
                  </label>
                  <textarea
                    id="contact-message"
                    rows={4}
                    value={formData.message}
                    onChange={(e) => handleChange('message', e.target.value)}
                    className={`w-full bg-navy-deep/60 border ${errors.message ? 'border-red-400/40' : 'border-cyan-electric/[0.08]'} rounded-xl px-4 py-3 text-sm text-surface placeholder-surface/20 focus:outline-none focus:border-cyan-electric/30 transition-colors resize-none`}
                    placeholder="Tell us about your investment goals..."
                  />
                  {errors.message && <p className="text-[11px] text-red-400 mt-1">{errors.message}</p>}
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  className="magnetic-btn w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-semibold rounded-xl bg-cyan-electric text-navy-deep hover:bg-cyan-electric/90 transition-all duration-300"
                >
                  <Send size={16} />
                  Send Inquiry
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
