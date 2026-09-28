import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from '../hooks/useAnimations'
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react'

const testimonials = [
  {
    name: 'Arjun Mehta',
    role: 'Independent Investor',
    text: 'Nexora Capital helped me develop a more disciplined approach to understanding market conditions. Their research-driven insights have been invaluable in building a structured investment process.',
    initials: 'AM',
  },
  {
    name: 'Priya Sharma',
    role: 'Portfolio Manager',
    text: 'What sets Nexora apart is their commitment to risk-aware strategies. They helped me appreciate the importance of risk frameworks and disciplined decision-making in volatile markets.',
    initials: 'PS',
  },
  {
    name: 'Rohan Kapoor',
    role: 'Market Analyst',
    text: 'The quality of market research and structured analysis provided by Nexora Capital has significantly improved my understanding of market cycles and sector dynamics.',
    initials: 'RK',
  },
]

export default function Testimonials() {
  const [ref, isInView] = useInView()
  const [active, setActive] = useState(0)

  const prev = () => setActive((a) => (a === 0 ? testimonials.length - 1 : a - 1))
  const next = () => setActive((a) => (a === testimonials.length - 1 ? 0 : a + 1))

  return (
    <section className="section-padding relative overflow-hidden">
      <div className="absolute top-1/3 right-1/4 w-[400px] h-[400px] bg-cyan-electric/[0.015] rounded-full blur-[120px]" />

      <div ref={ref} className="max-w-4xl mx-auto px-6 lg:px-8 relative">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="text-cyan-electric/60 text-xs tracking-[0.2em] uppercase font-semibold mb-4 block">
            What Investors Say
          </span>
          <h2 className="text-4xl lg:text-5xl font-extrabold tracking-tight text-surface">
            Trusted by <span className="gradient-text">Investors</span>
          </h2>
        </motion.div>

        {/* Carousel */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="relative"
        >
          <div className="glass-card p-8 lg:p-12 text-center relative overflow-hidden">
            {/* Quote icon */}
            <Quote size={40} className="text-cyan-electric/10 mx-auto mb-6" />

            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
              >
                {/* Text */}
                <p className="text-lg lg:text-xl text-surface/60 leading-relaxed max-w-2xl mx-auto mb-8 italic">
                  "{testimonials[active].text}"
                </p>

                {/* Avatar + Name */}
                <div className="flex flex-col items-center gap-3">
                  <div className="w-14 h-14 rounded-full bg-gradient-to-br from-cyan-electric/20 to-cyan-electric/5 border border-cyan-electric/15 flex items-center justify-center">
                    <span className="text-sm font-bold text-cyan-electric/80">
                      {testimonials[active].initials}
                    </span>
                  </div>
                  <div>
                    <p className="text-base font-bold text-surface">{testimonials[active].name}</p>
                    <p className="text-sm text-surface/40">{testimonials[active].role}</p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Nav Buttons */}
          <div className="flex justify-center gap-3 mt-8">
            <button
              onClick={prev}
              className="w-10 h-10 rounded-full border border-cyan-electric/10 flex items-center justify-center text-surface/40 hover:text-cyan-electric hover:border-cyan-electric/25 transition-colors"
              aria-label="Previous testimonial"
            >
              <ChevronLeft size={18} />
            </button>

            {/* Dots */}
            <div className="flex items-center gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActive(i)}
                  className={`rounded-full transition-all duration-300 ${
                    i === active
                      ? 'w-8 h-2 bg-cyan-electric'
                      : 'w-2 h-2 bg-surface/15 hover:bg-surface/25'
                  }`}
                  aria-label={`Go to testimonial ${i + 1}`}
                />
              ))}
            </div>

            <button
              onClick={next}
              className="w-10 h-10 rounded-full border border-cyan-electric/10 flex items-center justify-center text-surface/40 hover:text-cyan-electric hover:border-cyan-electric/25 transition-colors"
              aria-label="Next testimonial"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
