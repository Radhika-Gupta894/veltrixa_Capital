import { motion } from 'framer-motion'
import { useInView, useTilt } from '../hooks/useAnimations'
import { TrendingUp, Layers, BarChart3, Gem, PieChart, GraduationCap } from 'lucide-react'

const services = [
  {
    num: '01',
    title: 'Equity & Futures',
    desc: 'Structured short-term and positional market strategies.',
    detail: 'Our equity research covers fundamental and technical perspectives to identify opportunities across market cycles.',
    icon: TrendingUp,
  },
  {
    num: '02',
    title: 'Options Intelligence',
    desc: 'Strategy frameworks for options markets with defined risk parameters.',
    detail: 'Structured options strategies with clearly defined risk-reward profiles and systematic execution frameworks.',
    icon: Layers,
  },
  {
    num: '03',
    title: 'Index Strategies',
    desc: 'Research-driven insights across major market indices.',
    detail: 'Comprehensive index-level analysis covering trend identification, sector rotation, and market breadth indicators.',
    icon: BarChart3,
  },
  {
    num: '04',
    title: 'Commodity Intelligence',
    desc: 'Market analysis across gold, silver, crude oil and other commodities.',
    detail: 'Macro-driven commodity research integrating global supply-demand dynamics with technical analysis.',
    icon: Gem,
  },
  {
    num: '05',
    title: 'Portfolio Intelligence',
    desc: 'Structured portfolio planning, diversification and risk assessment.',
    detail: 'Disciplined portfolio construction with emphasis on asset allocation, correlation management, and drawdown control.',
    icon: PieChart,
  },
  {
    num: '06',
    title: 'Market Education',
    desc: 'Learning resources and mentorship for developing disciplined market understanding.',
    detail: 'Comprehensive educational programs covering market mechanics, risk management, and systematic trading approaches.',
    icon: GraduationCap,
  },
]

function ServiceCard({ service, index, isInView }) {
  const { ref, style, handleMouseMove, handleMouseLeave } = useTilt(6)
  const Icon = service.icon

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1, ease: [0.23, 1, 0.32, 1] }}
    >
      <div
        ref={ref}
        style={style}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="glass-card animated-border group p-7 h-full cursor-default transition-all duration-400 hover:border-cyan-electric/15 hover:shadow-xl hover:shadow-cyan-electric/[0.04] hover:-translate-y-1"
      >
        {/* Number + Icon Row */}
        <div className="flex items-start justify-between mb-6">
          <span className="text-xs text-cyan-electric/30 font-mono tracking-wider">{service.num}</span>
          <div className="w-12 h-12 rounded-2xl bg-cyan-electric/[0.06] border border-cyan-electric/[0.08] flex items-center justify-center group-hover:bg-cyan-electric/[0.1] group-hover:border-cyan-electric/20 transition-all duration-300">
            <Icon size={22} className="text-cyan-electric/60 group-hover:text-cyan-electric transition-colors" />
          </div>
        </div>

        {/* Title */}
        <h3 className="text-xl font-bold text-surface mb-3 group-hover:text-cyan-electric/90 transition-colors">
          {service.title}
        </h3>

        {/* Description */}
        <p className="text-sm text-surface/40 leading-relaxed mb-4">{service.desc}</p>

        {/* Expanded detail on hover */}
        <div className="overflow-hidden max-h-0 group-hover:max-h-24 transition-all duration-500 ease-out">
          <div className="pt-4 border-t border-cyan-electric/[0.06]">
            <p className="text-xs text-surface/30 leading-relaxed">{service.detail}</p>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default function Services() {
  const [ref, isInView] = useInView()

  return (
    <section id="services" className="section-padding relative overflow-hidden">
      <div className="absolute bottom-0 left-1/4 w-[600px] h-[600px] bg-cyan-electric/[0.015] rounded-full blur-[150px]" />

      <div ref={ref} className="max-w-7xl mx-auto px-6 lg:px-8 relative">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="text-cyan-electric/60 text-xs tracking-[0.2em] uppercase font-semibold mb-4 block">
            What We Offer
          </span>
          <h2 className="text-4xl lg:text-5xl font-extrabold tracking-tight text-surface mb-4">
            Our <span className="gradient-text">Services</span>
          </h2>
          <p className="text-surface/40 max-w-lg mx-auto">
            Comprehensive market intelligence across asset classes, delivered with discipline and clarity.
          </p>
        </motion.div>

        {/* Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, i) => (
            <ServiceCard key={service.num} service={service} index={i} isInView={isInView} />
          ))}
        </div>
      </div>
    </section>
  )
}
