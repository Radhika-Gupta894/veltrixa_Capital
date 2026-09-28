import { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { motion } from 'framer-motion'
import { useInView, useIsMobile, useReducedMotion } from '../hooks/useAnimations'

function CTASphere() {
  const ref = useRef()
  const wireRef = useRef()

  useFrame((state) => {
    const t = state.clock.elapsedTime
    if (ref.current) {
      ref.current.rotation.y = t * 0.1
      ref.current.rotation.x = Math.sin(t * 0.07) * 0.2
    }
    if (wireRef.current) {
      wireRef.current.rotation.y = t * 0.08
      wireRef.current.rotation.z = t * 0.04
    }
  })

  return (
    <>
      <ambientLight intensity={0.1} />
      <pointLight position={[0, 0, 3]} color="#19D3FF" intensity={0.6} distance={8} />
      <mesh ref={ref}>
        <icosahedronGeometry args={[2, 3]} />
        <meshBasicMaterial color="#19D3FF" transparent opacity={0.04} wireframe />
      </mesh>
      <mesh ref={wireRef}>
        <icosahedronGeometry args={[2.2, 2]} />
        <meshBasicMaterial color="#8FB8D8" transparent opacity={0.025} wireframe />
      </mesh>
    </>
  )
}

export default function CTA() {
  const [ref, isInView] = useInView()
  const isMobile = useIsMobile()
  const reducedMotion = useReducedMotion()

  const scrollTo = (href) => {
    const el = document.querySelector(href)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section className="relative py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-navy to-navy-deep" />

      {/* 3D Sphere */}
      {!isMobile && !reducedMotion && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-40">
          <div style={{ width: 500, height: 500 }}>
            <Canvas
              camera={{ position: [0, 0, 5], fov: 50 }}
              dpr={1}
              gl={{ antialias: false, alpha: true }}
            >
              <CTASphere />
            </Canvas>
          </div>
        </div>
      )}

      {/* Animated beam */}
      <div className="absolute top-1/2 left-0 right-0 h-px overflow-hidden pointer-events-none">
        <div className="w-1/3 h-full bg-gradient-to-r from-transparent via-cyan-electric/30 to-transparent animate-beam" />
      </div>

      {/* Content */}
      <div ref={ref} className="relative z-10 max-w-3xl mx-auto px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <h2 className="text-4xl lg:text-5xl xl:text-6xl font-extrabold tracking-tight mb-6">
            <span className="text-surface">Turn Market Complexity</span>
            <br />
            <span className="gradient-text">Into Clarity.</span>
          </h2>
          <p className="text-lg text-surface/40 max-w-xl mx-auto mb-10 leading-relaxed">
            Explore a more structured approach to understanding financial markets.
          </p>
          <button
            onClick={() => scrollTo('#contact')}
            className="magnetic-btn inline-flex items-center gap-2 px-10 py-4 text-base font-semibold rounded-full bg-cyan-electric text-navy-deep hover:bg-cyan-electric/90 transition-all duration-300"
          >
            Start a Conversation
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="7" y1="17" x2="17" y2="7" /><polyline points="7 7 17 7 17 17" />
            </svg>
          </button>
        </motion.div>
      </div>
    </section>
  )
}
