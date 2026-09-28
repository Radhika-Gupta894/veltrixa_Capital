import { motion } from 'framer-motion'
import { useInView } from '../hooks/useAnimations'
import { Search, Wrench, FlaskConical, Eye } from 'lucide-react'

const steps = [
  {
    num: '01',
    title: 'Market Research',
    desc: 'Analyze trends, sectors, global cues and price behaviour.',
    icon: Search,
  },
  {
    num: '02',
    title: 'Strategy Development',
    desc: 'Build structured strategies around market conditions and risk parameters.',
    icon: Wrench,
  },
  {
    num: '03',
    title: 'Validation',
    desc: 'Evaluate strategies using historical and simulated data.',
    icon: FlaskConical,
  },
  {
    num: '04',
    title: 'Continuous Monitoring',
    desc: 'Monitor changing market conditions and refine the approach.',
    icon: Eye,
  },
]

export default function ProcessTimeline() {
  const [ref, isInView] = useInView()

  return (
    <section id="process" className="section-padding relative overflow-hidden">
      <div className="absolute bottom-1/4 left-0 w-[500px] h-[500px] bg-cyan-electric/[0.015] rounded-full blur-[120px]" />

      <div ref={ref} className="max-w-7xl mx-auto px-6 lg:px-8 relative">
        {/* Header */}
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="text-cyan-electric/60 text-xs tracking-[0.2em] uppercase font-semibold mb-4 block">
            Our Process
          </span>
          <h2 className="text-4xl lg:text-5xl font-extrabold tracking-tight">
            <span className="text-surface">From Data to</span>{' '}
            <span className="gradient-text">Decision.</span>
          </h2>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Desktop connecting line */}
          <div className="hidden lg:block absolute top-[60px] left-0 right-0 h-px">
            <motion.div
              initial={{ scaleX: 0 }}
              animate={isInView ? { scaleX: 1 } : {}}
              transition={{ duration: 1.5, delay: 0.3, ease: [0.23, 1, 0.32, 1] }}
              className="h-full bg-gradient-to-r from-transparent via-cyan-electric/20 to-transparent origin-left"
            />
          </div>

          {/* Mobile connecting line */}
          <div className="lg:hidden absolute top-0 bottom-0 left-8 w-px">
            <motion.div
              initial={{ scaleY: 0 }}
              animate={isInView ? { scaleY: 1 } : {}}
              transition={{ duration: 1.5, delay: 0.3 }}
              className="h-full bg-gradient-to-b from-cyan-electric/20 via-cyan-electric/10 to-transparent origin-top"
            />
          </div>

          <div className="grid lg:grid-cols-4 gap-8 lg:gap-6">
            {steps.map((step, i) => {
              const Icon = step.icon
              return (
                <motion.div
                  key={step.num}
                  initial={{ opacity: 0, y: 30 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.4 + i * 0.2 }}
                  className="relative flex lg:flex-col items-start lg:items-center lg:text-center gap-6 lg:gap-0"
                >
                  {/* Node */}
                  <div className="relative z-10 flex-shrink-0">
                    <div className="w-16 h-16 rounded-2xl bg-navy border border-cyan-electric/15 flex items-center justify-center group hover:border-cyan-electric/30 transition-colors">
                      <Icon size={24} className="text-cyan-electric/60" />
                    </div>
                    {/* Glow dot */}
                    <div className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-cyan-electric/30 flex items-center justify-center">
                      <div className="w-1.5 h-1.5 rounded-full bg-cyan-electric" />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="lg:mt-6">
                    <span className="text-xs text-cyan-electric/40 font-mono mb-1 block">{step.num}</span>
                    <h3 className="text-lg font-bold text-surface mb-2">{step.title}</h3>
                    <p className="text-sm text-surface/40 leading-relaxed max-w-xs">{step.desc}</p>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
