import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Float } from '@react-three/drei'
import * as THREE from 'three'
import { useMousePosition, useIsMobile, useReducedMotion } from '../hooks/useAnimations'

/* ── Floating Glass Panel ── */
function GlassPanel({ position, rotation, scale = [1, 1, 0.05], speed = 0.3 }) {
  const ref = useRef()
  useFrame((state) => {
    if (!ref.current) return
    ref.current.rotation.y = Math.sin(state.clock.elapsedTime * speed) * 0.1 + (rotation?.[1] || 0)
    ref.current.rotation.x = Math.cos(state.clock.elapsedTime * speed * 0.7) * 0.05 + (rotation?.[0] || 0)
  })
  return (
    <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.5}>
      <mesh ref={ref} position={position} scale={scale}>
        <boxGeometry args={[1, 1, 1]} />
        <meshPhysicalMaterial
          color="#19D3FF"
          transparent
          opacity={0.08}
          roughness={0.1}
          metalness={0.1}
          side={THREE.DoubleSide}
        />
      </mesh>
      {/* Border glow */}
      <mesh position={position} scale={scale.map((s, i) => s * (i < 2 ? 1.02 : 0.5))}>
        <boxGeometry args={[1, 1, 1]} />
        <meshBasicMaterial color="#19D3FF" transparent opacity={0.04} wireframe />
      </mesh>
    </Float>
  )
}

/* ── Glowing Financial Sphere ── */
function FinancialSphere({ mouse }) {
  const ref = useRef()
  const wireRef = useRef()
  const innerRef = useRef()

  useFrame((state) => {
    if (!ref.current) return
    const t = state.clock.elapsedTime
    ref.current.rotation.y = t * 0.15 + mouse.x * 0.3
    ref.current.rotation.x = Math.sin(t * 0.1) * 0.2 + mouse.y * 0.2
    if (wireRef.current) {
      wireRef.current.rotation.y = t * 0.1 + mouse.x * 0.2
      wireRef.current.rotation.z = t * 0.05
    }
    if (innerRef.current) {
      innerRef.current.rotation.y = -t * 0.2
    }
  })

  return (
    <group position={[1.5, 0, 0]}>
      <mesh ref={ref}>
        <icosahedronGeometry args={[1.25, 3]} />
        <meshPhysicalMaterial
          color="#0ea5e9"
          emissive="#0284c7"
          emissiveIntensity={0.2}
          transparent
          opacity={0.35}
          roughness={0.1}
          metalness={0.2}
          clearcoat={1}
        />
      </mesh>
      <mesh ref={wireRef}>
        <icosahedronGeometry args={[1.4, 2]} />
        <meshBasicMaterial color="#38bdf8" transparent opacity={0.4} wireframe />
      </mesh>
      <mesh ref={innerRef}>
        <octahedronGeometry args={[0.7, 2]} />
        <meshBasicMaterial color="#00f0ff" transparent opacity={0.5} wireframe />
      </mesh>
      <pointLight position={[0, 0, 0]} color="#00f0ff" intensity={2.5} distance={5} />
      <pointLight position={[2, 2, 2]} color="#38bdf8" intensity={1.5} distance={6} />
    </group>
  )
}

/* ── Floating Data Points ── */
function DataPoints({ count = 30, mouse }) {
  const ref = useRef()

  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 10
      pos[i * 3 + 1] = (Math.random() - 0.5) * 6
      pos[i * 3 + 2] = (Math.random() - 0.5) * 5
    }
    return pos
  }, [count])

  useFrame((state) => {
    if (!ref.current) return
    ref.current.rotation.y = state.clock.elapsedTime * 0.02 + mouse.x * 0.1
    ref.current.rotation.x = mouse.y * 0.05
  })

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        color="#19D3FF"
        size={0.04}
        transparent
        opacity={0.6}
        sizeAttenuation
      />
    </points>
  )
}

/* ── Candlestick 3D ── */
function Candlestick3D({ position, height = 1, isUp = true }) {
  return (
    <Float speed={1} floatIntensity={0.3}>
      <group position={position}>
        {/* Wick */}
        <mesh position={[0, height * 0.3, 0]}>
          <boxGeometry args={[0.02, height * 0.6, 0.02]} />
          <meshBasicMaterial color={isUp ? '#22C55E' : '#ef4444'} transparent opacity={0.5} />
        </mesh>
        {/* Body */}
        <mesh>
          <boxGeometry args={[0.08, height * 0.4, 0.08]} />
          <meshPhysicalMaterial
            color={isUp ? '#22C55E' : '#ef4444'}
            transparent
            opacity={0.2}
            roughness={0.3}
          />
        </mesh>
      </group>
    </Float>
  )
}

/* ── Connection Lines ── */
function ConnectionLines() {
  const ref = useRef()

  const points = useMemo(() => {
    const pts = []
    for (let i = 0; i < 20; i++) {
      pts.push(new THREE.Vector3(
        -4 + i * 0.4,
        Math.sin(i * 0.5) * 0.5 + Math.cos(i * 0.3) * 0.3,
        -1
      ))
    }
    return pts
  }, [])

  const geometry = useMemo(() => new THREE.BufferGeometry().setFromPoints(points), [points])

  useFrame((state) => {
    if (!ref.current) return
    const positions = ref.current.geometry.attributes.position.array
    for (let i = 0; i < 20; i++) {
      positions[i * 3 + 1] = Math.sin(i * 0.5 + state.clock.elapsedTime * 0.5) * 0.5
        + Math.cos(i * 0.3 + state.clock.elapsedTime * 0.3) * 0.3
    }
    ref.current.geometry.attributes.position.needsUpdate = true
  })

  return (
    <line ref={ref} geometry={geometry}>
      <lineBasicMaterial color="#19D3FF" transparent opacity={0.15} />
    </line>
  )
}

/* ── Main Scene ── */
function Scene({ mouse }) {
  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 5, 5]} intensity={1.2} color="#0EA5E9" />
      <pointLight position={[-3, 2, 2]} intensity={1.5} color="#38BDF8" />

      <FinancialSphere mouse={mouse} />
      <DataPoints count={40} mouse={mouse} />
      <ConnectionLines />

      {/* Glass panels */}
      <GlassPanel position={[-2.5, 1.2, -1]} rotation={[0.1, 0.3, 0]} scale={[1.2, 0.8, 0.03]} />
      <GlassPanel position={[-1.5, -0.8, -0.5]} rotation={[-0.1, -0.2, 0.05]} scale={[0.9, 0.6, 0.03]} />
      <GlassPanel position={[3, 1.5, -1.5]} rotation={[0, 0.4, -0.1]} scale={[0.7, 0.5, 0.03]} />

      {/* Candlesticks */}
      {[...Array(6)].map((_, i) => (
        <Candlestick3D
          key={i}
          position={[-3 + i * 0.4, -1.5, 0.5]}
          height={0.5 + Math.random() * 0.6}
          isUp={i % 3 !== 0}
        />
      ))}
    </>
  )
}

/* ── Simplified Scene for Mobile ── */
function MobileScene({ mouse }) {
  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 5, 5]} intensity={1} color="#0EA5E9" />
      <FinancialSphere mouse={mouse} />
      <DataPoints count={15} mouse={mouse} />
    </>
  )
}

export default function Hero3D() {
  const mouse = useMousePosition()
  const isMobile = useIsMobile()
  const reducedMotion = useReducedMotion()

  const scrollTo = (href) => {
    const el = document.querySelector(href)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section id="home" className="relative min-h-screen flex items-center overflow-hidden">
      {/* Gradient Overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-navy-deep via-navy-deep to-navy" />
      <div className="absolute inset-0 bg-gradient-to-r from-navy-deep via-transparent to-transparent z-[1]" />
      
      {/* Radial glow */}
      <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[600px] h-[600px] bg-cyan-electric/[0.04] rounded-full blur-[120px]" />

      {/* 3D Canvas */}
      <div className="absolute inset-0 canvas-container">
        {!reducedMotion && (
          <Canvas
            camera={{ position: [0, 0, 5], fov: 50 }}
            dpr={isMobile ? 1 : Math.min(window.devicePixelRatio, 2)}
            gl={{ antialias: !isMobile, alpha: true, powerPreference: 'high-performance' }}
            style={{ pointerEvents: 'none' }}
          >
            {isMobile ? <MobileScene mouse={mouse} /> : <Scene mouse={mouse} />}
          </Canvas>
        )}
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 w-full pt-32 pb-20 lg:pt-40">
        <div className="max-w-2xl">
          {/* Eyebrow */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-cyan-electric/30 bg-cyan-electric/10 mb-8 shadow-sm">
            <div className="w-2 h-2 rounded-full bg-cyan-electric animate-glow-pulse" />
            <span className="text-xs text-cyan-electric tracking-wider uppercase font-bold">
              Intelligence Behind Every Market Decision
            </span>
          </div>

          {/* Headline */}
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold leading-[1.05] tracking-tight mb-6">
            <span className="text-surface">See the Market</span>
            <br />
            <span className="gradient-text">Differently.</span>
          </h1>

          {/* Subheading */}
          <p className="text-lg lg:text-xl text-surface/70 font-normal max-w-lg leading-relaxed mb-10">
            Research-driven market intelligence, structured strategies, and disciplined investment insights designed for modern investors.
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap gap-4">
            <button
              onClick={() => scrollTo('#services')}
              className="magnetic-btn inline-flex items-center gap-2 px-8 py-3.5 text-sm font-bold rounded-full bg-cyan-electric text-white dark:text-navy-deep hover:brightness-110 shadow-lg shadow-cyan-electric/25 transition-all duration-300"
            >
              Explore Our Intelligence
              <ArrowUpRight size={16} />
            </button>
            <button
              onClick={() => scrollTo('#contact')}
              className="magnetic-btn inline-flex items-center gap-2 px-8 py-3.5 text-sm font-semibold rounded-full bg-white/80 dark:bg-transparent border border-slate-300 dark:border-surface/20 text-slate-800 dark:text-surface hover:bg-slate-100 dark:hover:bg-surface/10 shadow-sm transition-all duration-300"
            >
              Talk to an Expert
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Gradient Fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-navy-deep to-transparent z-10" />
    </section>
  )
}

function ArrowUpRight({ size = 16 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="7" y1="17" x2="17" y2="7" /><polyline points="7 7 17 7 17 17" />
    </svg>
  )
}
