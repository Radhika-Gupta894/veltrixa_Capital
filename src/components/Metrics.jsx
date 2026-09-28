import { motion } from 'framer-motion'
import { useInView, useCounter } from '../hooks/useAnimations'
import { Users, LineChart, Clock, Award } from 'lucide-react'

const metrics = [
  { value: 5, suffix: 'K+', label: 'Investors Supported', icon: Users },
  { value: 12, suffix: '+', label: 'Market Strategies', icon: LineChart },
  { value: 24, suffix: '/7', label: 'Market Intelligence', icon: Clock },
  { value: 10, suffix: '+', label: 'Years of Combined Experience', icon: Award },
]

function MetricCard({ metric, isInView, index }) {
  const count = useCounter(metric.value, 2000, isInView)
  const Icon = metric.icon

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.15, ease: [0.23, 1, 0.32, 1] }}
      className="flex flex-col items-center text-center px-6 py-8 relative group"
    >
      {/* Icon */}
      <div className="w-10 h-10 rounded-xl bg-cyan-electric/[0.07] border border-cyan-electric/10 flex items-center justify-center mb-4 group-hover:border-cyan-electric/25 transition-colors">
        <Icon size={18} className="text-cyan-electric/60" />
      </div>

      {/* Number */}
      <div className="text-4xl lg:text-5xl font-extrabold text-surface mb-2 tracking-tight">
        {count}
        <span className="text-cyan-electric">{metric.suffix}</span>
      </div>

      {/* Label */}
      <p className="text-sm text-surface/40 font-medium tracking-wide">{metric.label}</p>
    </motion.div>
  )
}

export default function Metrics() {
  const [ref, isInView] = useInView({ threshold: 0.3 })

  return (
    <section className="relative z-10 -mt-8">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div
          ref={ref}
          className="glass-card border border-cyan-electric/[0.06] rounded-3xl overflow-hidden"
        >
          {/* Top glow line */}
          <div className="h-px bg-gradient-to-r from-transparent via-cyan-electric/20 to-transparent" />

          <div className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-y lg:divide-y-0 divide-cyan-electric/[0.06]">
            {metrics.map((metric, i) => (
              <MetricCard key={i} metric={metric} isInView={isInView} index={i} />
            ))}
          </div>

          {/* Bottom glow line */}
          <div className="h-px bg-gradient-to-r from-transparent via-cyan-electric/10 to-transparent" />
        </div>
      </div>
    </section>
  )
}
