import { motion } from 'framer-motion'
import { useInView } from '../hooks/useAnimations'
import { Search, ShieldCheck, Cpu } from 'lucide-react'

const features = [
  {
    num: '01',
    title: 'Research Driven',
    desc: 'Data-backed market analysis and structured insights.',
    icon: Search,
  },
  {
    num: '02',
    title: 'Risk Conscious',
    desc: 'Clear risk frameworks and disciplined decision-making.',
    icon: ShieldCheck,
  },
  {
    num: '03',
    title: 'Technology Enabled',
    desc: 'Modern tools and intelligent market monitoring.',
    icon: Cpu,
  },
]

export default function About() {
  const [ref, isInView] = useInView()

  return (
    <section id="about" className="section-padding relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-cyan-electric/[0.015] rounded-full blur-[150px]" />

      <div ref={ref} className="max-w-7xl mx-auto px-6 lg:px-8 relative">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-start">
          {/* Left – Heading */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, ease: [0.23, 1, 0.32, 1] }}
          >
            <span className="text-cyan-electric/60 text-xs tracking-[0.2em] uppercase font-semibold mb-4 block">
              Our Philosophy
            </span>
            <h2 className="text-4xl lg:text-5xl xl:text-6xl font-extrabold leading-[1.1] tracking-tight">
              <span className="text-surface">Markets Move Fast.</span>
              <br />
              <span className="gradient-text">Intelligence Should Move Faster.</span>
            </h2>
          </motion.div>

          {/* Right – Description + Features */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.23, 1, 0.32, 1] }}
          >
            <p className="text-lg text-surface/50 leading-relaxed mb-12">
              Nexora Capital combines market research, technical analysis, structured strategies
              and disciplined risk management to help investors understand changing market conditions.
            </p>

            <div className="space-y-6">
              {features.map((feat, i) => {
                const Icon = feat.icon
                return (
                  <motion.div
                    key={feat.num}
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5, delay: 0.3 + i * 0.12 }}
                    className="glass-card glass-card-hover p-6 flex items-start gap-5 cursor-default group transition-all duration-400"
                  >
                    <div className="flex-shrink-0 w-12 h-12 rounded-2xl bg-cyan-electric/[0.07] border border-cyan-electric/10 flex items-center justify-center group-hover:border-cyan-electric/25 transition-colors">
                      <Icon size={20} className="text-cyan-electric/70" />
                    </div>
                    <div>
                      <div className="flex items-center gap-3 mb-1.5">
                        <span className="text-xs text-cyan-electric/40 font-mono">{feat.num}</span>
                        <h3 className="text-base font-bold text-surface">{feat.title}</h3>
                      </div>
                      <p className="text-sm text-surface/40 leading-relaxed">{feat.desc}</p>
                    </div>
                  </motion.div>
                )
              })}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
