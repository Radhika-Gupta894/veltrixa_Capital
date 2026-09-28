import { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import { useInView } from '../hooks/useAnimations'
import {
  AreaChart, Area, BarChart, Bar, XAxis, YAxis, Tooltip,
  ResponsiveContainer, CartesianGrid, LineChart, Line, PieChart, Pie, Cell
} from 'recharts'

/* ── Sample data generators ── */
function generateCandleData(days = 30, base = 19500) {
  const data = []
  let price = base
  for (let i = 0; i < days; i++) {
    const change = (Math.random() - 0.48) * 200
    const open = price
    price += change
    const close = price
    const high = Math.max(open, close) + Math.random() * 80
    const low = Math.min(open, close) - Math.random() * 80
    const vol = Math.floor(80 + Math.random() * 120)
    data.push({
      day: i + 1,
      open: Math.round(open),
      close: Math.round(close),
      high: Math.round(high),
      low: Math.round(low),
      volume: vol,
    })
  }
  return data
}

const timeframes = ['1D', '1W', '1M', '1Y']

const marketCards = [
  { name: 'NIFTY 50', value: '19,847.25', change: '+0.82%', up: true },
  { name: 'GOLD', value: '₹62,340', change: '+0.34%', up: true },
  { name: 'USD/INR', value: '83.42', change: '-0.12%', up: false },
]

const sentimentData = { bullish: 62, bearish: 28, neutral: 10 }

const allocationData = [
  { name: 'Equities', value: 45, color: '#19D3FF' },
  { name: 'Options', value: 20, color: '#8FB8D8' },
  { name: 'Commodities', value: 15, color: '#22C55E' },
  { name: 'Indices', value: 12, color: '#6366f1' },
  { name: 'Cash', value: 8, color: '#475569' },
]

const CustomTooltip = ({ active, payload }) => {
  if (!active || !payload?.length) return null
  const d = payload[0].payload
  return (
    <div className="glass-card p-3 text-xs border border-cyan-electric/10">
      <p className="text-surface/60 mb-1">Day {d.day}</p>
      <p className="text-surface">Close: <span className="text-cyan-electric font-mono">{d.close?.toLocaleString()}</span></p>
      {d.volume && <p className="text-surface/40">Vol: {d.volume}M</p>}
    </div>
  )
}

export default function MarketDashboard() {
  const [ref, isInView] = useInView({ threshold: 0.1 })
  const [activeTimeframe, setActiveTimeframe] = useState('1M')

  const chartData = useMemo(() => {
    const counts = { '1D': 8, '1W': 14, '1M': 30, '1Y': 60 }
    return generateCandleData(counts[activeTimeframe])
  }, [activeTimeframe])

  const volumeData = chartData.map((d) => ({ day: d.day, volume: d.volume }))

  return (
    <section className="section-padding relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-cyan-electric/[0.015] rounded-full blur-[120px]" />

      <div ref={ref} className="max-w-7xl mx-auto px-6 lg:px-8 relative">
        {/* Header */}
        <motion.div
          className="text-center mb-14"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="text-cyan-electric/60 text-xs tracking-[0.2em] uppercase font-semibold mb-4 block">
            Dashboard Preview
          </span>
          <h2 className="text-4xl lg:text-5xl font-extrabold tracking-tight text-surface mb-3">
            Market Intelligence, <span className="gradient-text">Visualized.</span>
          </h2>
          <p className="text-surface/30 text-sm">Illustrative Market Data</p>
        </motion.div>

        {/* Dashboard Grid */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="glass-card rounded-3xl border border-cyan-electric/[0.06] overflow-hidden"
        >
          {/* Top bar */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-cyan-electric/[0.06]">
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-cyan-electric animate-glow-pulse" />
              <span className="text-sm text-surface/60 font-medium">Market Overview</span>
              <span className="text-[10px] text-surface/25 ml-2">Illustrative Data Only</span>
            </div>
            <div className="flex gap-1">
              {timeframes.map((tf) => (
                <button
                  key={tf}
                  onClick={() => setActiveTimeframe(tf)}
                  className={`px-3 py-1 text-xs font-medium rounded-lg transition-all duration-300 ${
                    activeTimeframe === tf
                      ? 'bg-cyan-electric/15 text-cyan-electric border border-cyan-electric/20'
                      : 'text-surface/30 hover:text-surface/50'
                  }`}
                >
                  {tf}
                </button>
              ))}
            </div>
          </div>

          <div className="p-6">
            <div className="grid lg:grid-cols-3 gap-6">
              {/* Main Chart Area */}
              <div className="lg:col-span-2 space-y-4">
                {/* Price Chart */}
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={chartData}>
                      <defs>
                        <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#19D3FF" stopOpacity={0.15} />
                          <stop offset="95%" stopColor="#19D3FF" stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="rgba(25,211,255,0.04)" />
                      <XAxis dataKey="day" stroke="rgba(248,250,252,0.15)" tick={{ fontSize: 10 }} />
                      <YAxis stroke="rgba(248,250,252,0.15)" tick={{ fontSize: 10 }} domain={['auto', 'auto']} />
                      <Tooltip content={<CustomTooltip />} />
                      <Area
                        type="monotone"
                        dataKey="close"
                        stroke="#19D3FF"
                        strokeWidth={2}
                        fill="url(#areaGrad)"
                        animationDuration={1000}
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>

                {/* Volume */}
                <div className="h-20">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={volumeData}>
                      <Bar dataKey="volume" fill="#19D3FF" fillOpacity={0.15} radius={[2, 2, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Right Panel */}
              <div className="space-y-4">
                {/* Market Cards */}
                {marketCards.map((card) => (
                  <div
                    key={card.name}
                    className="p-4 rounded-2xl bg-navy-deep/50 border border-cyan-electric/[0.06] hover:border-cyan-electric/15 transition-colors"
                  >
                    <div className="flex justify-between items-start mb-2">
                      <span className="text-xs text-surface/40">{card.name}</span>
                      <span className={`text-xs font-mono ${card.up ? 'text-emerald-market' : 'text-red-400'}`}>
                        {card.change}
                      </span>
                    </div>
                    <p className="text-lg font-bold text-surface font-mono">{card.value}</p>
                  </div>
                ))}

                {/* Sentiment */}
                <div className="p-4 rounded-2xl bg-navy-deep/50 border border-cyan-electric/[0.06]">
                  <span className="text-xs text-surface/40 mb-3 block">Market Sentiment</span>
                  <div className="flex gap-1 h-2 rounded-full overflow-hidden">
                    <div className="bg-cyan-electric/60 rounded-l-full" style={{ width: `${sentimentData.bullish}%` }} />
                    <div className="bg-surface/20" style={{ width: `${sentimentData.neutral}%` }} />
                    <div className="bg-red-400/50 rounded-r-full" style={{ width: `${sentimentData.bearish}%` }} />
                  </div>
                  <div className="flex justify-between mt-2 text-[10px] text-surface/30">
                    <span>Bullish {sentimentData.bullish}%</span>
                    <span>Bearish {sentimentData.bearish}%</span>
                  </div>
                </div>

                {/* Allocation */}
                <div className="p-4 rounded-2xl bg-navy-deep/50 border border-cyan-electric/[0.06]">
                  <span className="text-xs text-surface/40 mb-2 block">Portfolio Allocation</span>
                  <div className="h-32">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={allocationData}
                          innerRadius={30}
                          outerRadius={50}
                          paddingAngle={3}
                          dataKey="value"
                        >
                          {allocationData.map((entry, i) => (
                            <Cell key={i} fill={entry.color} fillOpacity={0.7} />
                          ))}
                        </Pie>
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="flex flex-wrap gap-x-3 gap-y-1 mt-1">
                    {allocationData.map((a) => (
                      <div key={a.name} className="flex items-center gap-1">
                        <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: a.color }} />
                        <span className="text-[10px] text-surface/30">{a.name}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Disclaimer */}
          <div className="px-6 pb-4">
            <p className="text-[10px] text-surface/20 text-center">
              All data shown is illustrative and for demonstration purposes only. It does not represent actual market data or trading signals.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
