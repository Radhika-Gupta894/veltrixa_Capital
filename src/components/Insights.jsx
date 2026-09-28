import { motion } from 'framer-motion'
import { useInView } from '../hooks/useAnimations'
import { ArrowRight, Clock, Tag } from 'lucide-react'

const articles = [
  {
    category: 'Market Analysis',
    title: 'Understanding Market Cycles',
    desc: 'A comprehensive look at how economic and market cycles influence asset prices and investment decisions.',
    date: 'Sep 2026',
    readTime: '8 min read',
  },
  {
    category: 'Risk Management',
    title: 'Risk Management Principles',
    desc: 'Key principles of risk management that every investor should understand before entering the markets.',
    date: 'Sep 2026',
    readTime: '6 min read',
  },
  {
    category: 'Options',
    title: 'Options Strategy Fundamentals',
    desc: 'An introduction to structured options strategies and how they can be used for risk-defined market exposure.',
    date: 'Aug 2026',
    readTime: '10 min read',
  },
  {
    category: 'Commodities',
    title: 'Commodity Market Drivers',
    desc: 'Understanding the macroeconomic and geopolitical factors that drive commodity price movements.',
    date: 'Aug 2026',
    readTime: '7 min read',
  },
  {
    category: 'Education',
    title: 'Building a Disciplined Investment Process',
    desc: 'How to develop a systematic, emotion-free approach to market participation and capital allocation.',
    date: 'Jul 2026',
    readTime: '9 min read',
  },
  {
    category: 'Volatility',
    title: 'Reading Market Volatility',
    desc: 'Interpreting volatility indicators and understanding what they signal about market sentiment and risk.',
    date: 'Jul 2026',
    readTime: '5 min read',
  },
]

export default function Insights() {
  const [ref, isInView] = useInView()

  return (
    <section id="insights" className="section-padding relative overflow-hidden">
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-cyan-electric/[0.015] rounded-full blur-[120px]" />

      <div ref={ref} className="max-w-7xl mx-auto px-6 lg:px-8 relative">
        {/* Header */}
        <motion.div
          className="flex flex-col md:flex-row md:items-end md:justify-between mb-14 gap-4"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <div>
            <span className="text-cyan-electric/60 text-xs tracking-[0.2em] uppercase font-semibold mb-4 block">
              Knowledge Base
            </span>
            <h2 className="text-4xl lg:text-5xl font-extrabold tracking-tight text-surface">
              Market Intelligence <br className="hidden lg:block" />
              <span className="gradient-text">& Insights</span>
            </h2>
          </div>
          <button className="magnetic-btn inline-flex items-center gap-2 px-6 py-2.5 text-sm font-medium rounded-full border border-cyan-electric/15 text-cyan-electric/70 hover:border-cyan-electric/30 hover:text-cyan-electric transition-all self-start md:self-auto">
            View All Articles
            <ArrowRight size={14} />
          </button>
        </motion.div>

        {/* Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {articles.map((article, i) => (
            <motion.article
              key={article.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 + i * 0.08 }}
              className="glass-card group cursor-pointer overflow-hidden hover:border-cyan-electric/15 hover:-translate-y-1 transition-all duration-400"
            >
              {/* Thumbnail area */}
              <div className="h-40 bg-gradient-to-br from-navy-light/50 to-navy-deep relative overflow-hidden">
                {/* Abstract pattern */}
                <div className="absolute inset-0 opacity-20 group-hover:opacity-30 transition-opacity">
                  <div className="absolute top-4 left-4 w-20 h-20 border border-cyan-electric/10 rounded-full" />
                  <div className="absolute bottom-4 right-4 w-32 h-32 border border-cyan-electric/[0.06] rounded-full" />
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-px bg-gradient-to-r from-transparent via-cyan-electric/30 to-transparent" />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-navy-deep to-transparent" />
                {/* Category badge */}
                <div className="absolute bottom-3 left-4">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-cyan-electric/80 bg-cyan-electric/10 border border-cyan-electric/10 rounded-full">
                    <Tag size={10} />
                    {article.category}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-lg font-bold text-surface mb-2 group-hover:text-cyan-electric/90 transition-colors leading-snug">
                  {article.title}
                </h3>
                <p className="text-sm text-surface/35 leading-relaxed mb-4">
                  {article.desc}
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3 text-[11px] text-surface/25">
                    <span>{article.date}</span>
                    <span className="flex items-center gap-1">
                      <Clock size={10} />
                      {article.readTime}
                    </span>
                  </div>
                  <span className="text-xs text-cyan-electric/50 group-hover:text-cyan-electric transition-colors flex items-center gap-1">
                    Read Article <ArrowRight size={12} />
                  </span>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
