import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { motion } from 'framer-motion'
import { useInView, useIsMobile, useReducedMotion } from '../hooks/useAnimations'

const stages = [
  'RAW MARKET DATA',
  'RESEARCH',
  'ANALYSIS',
  'RISK FILTER',
  'STRATEGY',
  'INSIGHT',
]

/* ── 3D Particle Stream ── */
function ParticleStream() {
  const ref = useRef()
  const count = 80

  const { positions, speeds } = useMemo(() => {
    const pos = new Float32Array(count * 3)
    const spd = new Float32Array(count)
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 1.5
      pos[i * 3 + 1] = Math.random() * 10 - 5
      pos[i * 3 + 2] = (Math.random() - 0.5) * 1.5
      spd[i] = 0.5 + Math.random() * 1.5
    }
    return { positions: pos, speeds: spd }
  }, [])

  useFrame(() => {
    if (!ref.current) return
    const posArr = ref.current.geometry.attributes.position.array
    for (let i = 0; i < count; i++) {
      posArr[i * 3 + 1] -= speeds[i] * 0.02
      if (posArr[i * 3 + 1] < -5) posArr[i * 3 + 1] = 5
    }
    ref.current.geometry.attributes.position.needsUpdate = true
  })

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={count} array={positions} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial color="#19D3FF" size={0.06} transparent opacity={0.5} sizeAttenuation />
    </points>
  )
}

function PipelineScene() {
  return (
    <>
      <ambientLight intensity={0.15} />
      <pointLight position={[0, 3, 2]} color="#19D3FF" intensity={0.4} />
      <ParticleStream />
      {/* Pipe wireframe */}
      <mesh>
        <cylinderGeometry args={[0.6, 0.6, 10, 16, 1, true]} />
        <meshBasicMaterial color="#19D3FF" transparent opacity={0.03} wireframe side={THREE.DoubleSide} />
      </mesh>
    </>
  )
}

export default function DataPipeline() {
  const [ref, isInView] = useInView()
  const isMobile = useIsMobile()
  const reducedMotion = useReducedMotion()

  return (
    <section className="section-padding relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyan-electric/[0.02] rounded-full blur-[150px]" />

      <div ref={ref} className="max-w-7xl mx-auto px-6 lg:px-8 relative">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="text-cyan-electric/60 text-xs tracking-[0.2em] uppercase font-semibold mb-4 block">
            Data Transformation
          </span>
          <h2 className="text-4xl lg:text-5xl font-extrabold tracking-tight">
            <span className="text-surface">From Market Noise to</span>{' '}
            <span className="gradient-text">Meaning.</span>
          </h2>
        </motion.div>

        {/* Pipeline Visualization */}
        <div className="flex flex-col lg:flex-row items-center gap-6 lg:gap-4">
          {/* 3D Pipeline (desktop only) */}
          {!isMobile && !reducedMotion && (
            <div className="hidden lg:block absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/4 w-32 h-[500px] opacity-30 pointer-events-none">
              <Canvas
                camera={{ position: [0, 0, 4], fov: 50 }}
                dpr={1}
                gl={{ antialias: false, alpha: true }}
              >
                <PipelineScene />
              </Canvas>
            </div>
          )}

          {/* Stage Cards */}
          <div className="w-full flex flex-col items-center gap-3">
            {stages.map((stage, i) => (
              <motion.div
                key={stage}
                initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.2 + i * 0.12 }}
                className="w-full max-w-md"
              >
                <div className={`glass-card px-6 py-4 flex items-center gap-4 group hover:border-cyan-electric/20 transition-all duration-300 ${
                  i === 0 ? 'border-cyan-electric/15' : ''
                } ${i === stages.length - 1 ? 'border-cyan-electric/20 bg-gradient-to-r from-cyan-electric/[0.04] to-transparent' : ''}`}>
                  {/* Stage indicator */}
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-xs font-mono transition-colors ${
                    i === stages.length - 1
                      ? 'bg-cyan-electric/15 text-cyan-electric border border-cyan-electric/25'
                      : 'bg-cyan-electric/[0.06] text-cyan-electric/50 border border-cyan-electric/[0.08]'
                  }`}>
                    {String(i + 1).padStart(2, '0')}
                  </div>

                  <span className={`text-sm font-semibold tracking-wider transition-colors ${
                    i === stages.length - 1 ? 'text-cyan-electric' : 'text-surface/60 group-hover:text-surface/80'
                  }`}>
                    {stage}
                  </span>

                  {/* Arrow indicator */}
                  <div className="ml-auto">
                    <div className={`w-1.5 h-1.5 rounded-full ${
                      i === stages.length - 1 ? 'bg-cyan-electric' : 'bg-cyan-electric/20'
                    }`} />
                  </div>
                </div>

                {/* Connector */}
                {i < stages.length - 1 && (
                  <div className="flex justify-center py-1">
                    <motion.div
                      initial={{ scaleY: 0 }}
                      animate={isInView ? { scaleY: 1 } : {}}
                      transition={{ duration: 0.3, delay: 0.5 + i * 0.12 }}
                      className="w-px h-3 bg-gradient-to-b from-cyan-electric/20 to-cyan-electric/5 origin-top"
                    />
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
