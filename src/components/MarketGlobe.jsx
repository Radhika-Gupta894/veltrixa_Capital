import { useRef, useState, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { motion, AnimatePresence } from 'framer-motion'
import { useInView, useIsMobile, useReducedMotion } from '../hooks/useAnimations'
import { TrendingUp, BarChart3, Layers, Gem, Globe2, PieChart } from 'lucide-react'

const nodes = [
  { id: 'equities', label: 'Equities', angle: 0, icon: TrendingUp, color: '#19D3FF',
    desc: 'Research-driven equity analysis across sectors and market caps.' },
  { id: 'indices', label: 'Indices', angle: 60, icon: BarChart3, color: '#8FB8D8',
    desc: 'Track and analyze major market indices and benchmark performance.' },
  { id: 'options', label: 'Options', angle: 120, icon: Layers, color: '#19D3FF',
    desc: 'Strategy frameworks for options markets with defined risk parameters.' },
  { id: 'commodities', label: 'Commodities', angle: 180, icon: Gem, color: '#8FB8D8',
    desc: 'Market analysis across gold, silver, crude oil, and more.' },
  { id: 'global', label: 'Global Markets', angle: 240, icon: Globe2, color: '#19D3FF',
    desc: 'Monitor global economic indicators and cross-market correlations.' },
  { id: 'portfolio', label: 'Portfolio Intelligence', angle: 300, icon: PieChart, color: '#8FB8D8',
    desc: 'Structured portfolio planning, diversification, and risk assessment.' },
]

/* ── 3D Globe ── */
function GlobeWireframe() {
  const ref = useRef()
  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y = state.clock.elapsedTime * 0.08
      ref.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.05) * 0.1
    }
  })
  return (
    <group ref={ref}>
      <mesh>
        <sphereGeometry args={[2, 32, 32]} />
        <meshBasicMaterial color="#0284c7" transparent opacity={0.18} wireframe />
      </mesh>
      <mesh>
        <sphereGeometry args={[1.95, 16, 16]} />
        <meshBasicMaterial color="#38bdf8" transparent opacity={0.15} wireframe />
      </mesh>
      {/* Inner glowing core */}
      <mesh>
        <sphereGeometry args={[1.1, 16, 16]} />
        <meshBasicMaterial color="#00f0ff" transparent opacity={0.12} />
      </mesh>
      {/* Inner light */}
      <pointLight color="#00f0ff" intensity={2} distance={6} />
      {/* Equator ring */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[2.1, 0.008, 16, 100]} />
        <meshBasicMaterial color="#00f0ff" transparent opacity={0.5} />
      </mesh>
      <mesh rotation={[Math.PI / 3, 0.5, 0]}>
        <torusGeometry args={[2.05, 0.005, 16, 80]} />
        <meshBasicMaterial color="#38bdf8" transparent opacity={0.4} />
      </mesh>
    </group>
  )
}

function GlobeParticles() {
  const ref = useRef()
  const count = 200
  const positions = useMemo(() => {
    const p = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(2 * Math.random() - 1)
      const r = 2 + (Math.random() - 0.5) * 0.3
      p[i * 3] = r * Math.sin(phi) * Math.cos(theta)
      p[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta)
      p[i * 3 + 2] = r * Math.cos(phi)
    }
    return p
  }, [])

  useFrame((state) => {
    if (ref.current) ref.current.rotation.y = state.clock.elapsedTime * 0.05
  })

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={count} array={positions} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial color="#19D3FF" size={0.02} transparent opacity={0.4} sizeAttenuation />
    </points>
  )
}

/* ── 2D Node rendering ── */
function NodeCard({ node, index, activeNode, setActiveNode }) {
  const Icon = node.icon
  const isActive = activeNode === node.id
  const radius = 240 // pixels from center
  const angleRad = (node.angle * Math.PI) / 180
  const x = Math.cos(angleRad) * radius
  const y = Math.sin(angleRad) * radius

  return (
    <motion.div
      className="absolute"
      style={{
        left: `calc(50% + ${x}px)`,
        top: `calc(50% + ${y}px)`,
        transform: 'translate(-50%, -50%)',
        zIndex: isActive ? 20 : 10,
      }}
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.3 + index * 0.1, duration: 0.5 }}
    >
      <div
        className={`group cursor-pointer transition-all duration-400 ${isActive ? 'scale-110' : ''}`}
        onMouseEnter={() => setActiveNode(node.id)}
        onMouseLeave={() => setActiveNode(null)}
      >
        {/* Node */}
        <div
          className={`w-16 h-16 rounded-2xl flex items-center justify-center transition-all duration-300 ${
            isActive
              ? 'bg-cyan-electric/20 border-cyan-electric/40 shadow-lg shadow-cyan-electric/10'
              : 'bg-navy/60 border-cyan-electric/10 hover:border-cyan-electric/25'
          } border backdrop-blur-md`}
        >
          <Icon size={22} className={`transition-colors duration-300 ${isActive ? 'text-cyan-electric' : 'text-cyan-electric/50'}`} />
        </div>

        {/* Label */}
        <p className={`text-xs text-center mt-2 font-medium transition-colors whitespace-nowrap ${
          isActive ? 'text-cyan-electric' : 'text-surface/40'
        }`}>
          {node.label}
        </p>

        {/* Tooltip */}
        <AnimatePresence>
          {isActive && (
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.9 }}
              transition={{ duration: 0.2 }}
              className="absolute left-1/2 -translate-x-1/2 top-full mt-3 w-52 glass-card p-4 z-30"
            >
              <p className="text-xs text-surface/60 leading-relaxed">{node.desc}</p>
              <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-navy border-t border-l border-cyan-electric/20 rotate-45" />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Connection line to center (SVG) */}
      <svg
        className="absolute pointer-events-none"
        style={{
          left: '50%',
          top: '50%',
          width: Math.abs(x) + 40,
          height: Math.abs(y) + 40,
          transform: `translate(${x > 0 ? '-100%' : '0'}, ${y > 0 ? '-100%' : '0'})`,
          overflow: 'visible',
        }}
      >
        <line
          x1={x > 0 ? '100%' : '0'}
          y1={y > 0 ? '100%' : '0'}
          x2={x > 0 ? '0' : '100%'}
          y2={y > 0 ? '0' : '100%'}
          stroke={isActive ? '#19D3FF' : '#19D3FF'}
          strokeOpacity={isActive ? 0.3 : 0.08}
          strokeWidth="1"
          strokeDasharray={isActive ? '0' : '4 4'}
          style={{ transition: 'stroke-opacity 0.3s' }}
        />
      </svg>
    </motion.div>
  )
}

/* ── Mobile version – simple grid ── */
function MobileGlobe() {
  const [activeNode, setActiveNode] = useState(null)

  return (
    <div className="grid grid-cols-2 gap-4">
      {nodes.map((node) => {
        const Icon = node.icon
        const isActive = activeNode === node.id
        return (
          <motion.div
            key={node.id}
            className={`glass-card p-5 cursor-pointer transition-all duration-300 ${
              isActive ? 'border-cyan-electric/25 shadow-lg shadow-cyan-electric/5' : ''
            }`}
            onClick={() => setActiveNode(isActive ? null : node.id)}
            whileTap={{ scale: 0.97 }}
          >
            <Icon size={20} className="text-cyan-electric/60 mb-3" />
            <h4 className="text-sm font-bold text-surface mb-1">{node.label}</h4>
            <AnimatePresence>
              {isActive && (
                <motion.p
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="text-xs text-surface/40 leading-relaxed"
                >
                  {node.desc}
                </motion.p>
              )}
            </AnimatePresence>
          </motion.div>
        )
      })}
    </div>
  )
}

export default function MarketGlobe() {
  const [ref, isInView] = useInView()
  const [activeNode, setActiveNode] = useState(null)
  const isMobile = useIsMobile(1024)
  const reducedMotion = useReducedMotion()

  return (
    <section className="section-padding relative overflow-hidden">
      <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-cyan-electric/[0.02] rounded-full blur-[120px]" />

      <div ref={ref} className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="text-cyan-electric/60 text-xs tracking-[0.2em] uppercase font-semibold mb-4 block">
            Market Coverage
          </span>
          <h2 className="text-4xl lg:text-5xl xl:text-6xl font-extrabold tracking-tight">
            <span className="text-surface">A 360° View of</span>{' '}
            <span className="gradient-text">the Market</span>
          </h2>
        </motion.div>

        {isMobile ? (
          <MobileGlobe />
        ) : (
          /* Desktop: Globe + Nodes */
          <div className="relative" style={{ height: 620 }}>
            {/* 3D Globe */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div style={{ width: 400, height: 400 }}>
                {!reducedMotion && (
                  <Canvas
                    camera={{ position: [0, 0, 5], fov: 45 }}
                    dpr={Math.min(window.devicePixelRatio, 2)}
                    gl={{ antialias: true, alpha: true }}
                  >
                    <ambientLight intensity={0.1} />
                    <GlobeWireframe />
                    <GlobeParticles />
                  </Canvas>
                )}
              </div>
            </div>

            {/* Nodes */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="relative" style={{ width: 1, height: 1 }}>
                {nodes.map((node, i) => (
                  <NodeCard
                    key={node.id}
                    node={node}
                    index={i}
                    activeNode={activeNode}
                    setActiveNode={setActiveNode}
                  />
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
