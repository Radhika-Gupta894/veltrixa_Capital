import { useState, useEffect, useRef, useCallback } from 'react'

/* ── Intersection Observer for scroll animations ── */
export function useInView(options = {}) {
  const ref = useRef(null)
  const [isInView, setIsInView] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsInView(true)
        if (options.once !== false) observer.unobserve(el)
      }
    }, {
      threshold: options.threshold || 0.15,
      rootMargin: options.rootMargin || '0px',
    })

    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return [ref, isInView]
}

/* ── Animated counter ── */
export function useCounter(end, duration = 2000, startCounting = false) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!startCounting) return
    let start = 0
    const startTime = performance.now()

    const step = (timestamp) => {
      const progress = Math.min((timestamp - startTime) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3) // easeOutCubic
      setCount(Math.floor(eased * end))
      if (progress < 1) requestAnimationFrame(step)
    }

    requestAnimationFrame(step)
  }, [end, duration, startCounting])

  return count
}

/* ── Mouse position tracker ── */
export function useMousePosition() {
  const [position, setPosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) return

    const handler = (e) => {
      setPosition({
        x: (e.clientX / window.innerWidth - 0.5) * 2,
        y: (e.clientY / window.innerHeight - 0.5) * 2,
      })
    }

    window.addEventListener('mousemove', handler, { passive: true })
    return () => window.removeEventListener('mousemove', handler)
  }, [])

  return position
}

/* ── Window dimensions ── */
export function useWindowSize() {
  const [size, setSize] = useState({ width: 1200, height: 800 })

  useEffect(() => {
    const handler = () => setSize({ width: window.innerWidth, height: window.innerHeight })
    handler()
    window.addEventListener('resize', handler, { passive: true })
    return () => window.removeEventListener('resize', handler)
  }, [])

  return size
}

/* ── Detect mobile device ── */
export function useIsMobile(breakpoint = 768) {
  const { width } = useWindowSize()
  return width < breakpoint
}

/* ── Detect prefers-reduced-motion ── */
export function useReducedMotion() {
  const [prefersReduced, setPrefersReduced] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    setPrefersReduced(mq.matches)
    const handler = (e) => setPrefersReduced(e.matches)
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [])

  return prefersReduced
}

/* ── Tilt effect for cards ── */
export function useTilt(intensity = 10) {
  const ref = useRef(null)
  const [style, setStyle] = useState({})

  const handleMouseMove = useCallback((e) => {
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width - 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5
    setStyle({
      transform: `perspective(800px) rotateY(${x * intensity}deg) rotateX(${-y * intensity}deg) translateZ(10px)`,
      transition: 'transform 0.15s ease-out',
    })
  }, [intensity])

  const handleMouseLeave = useCallback(() => {
    setStyle({
      transform: 'perspective(800px) rotateY(0deg) rotateX(0deg) translateZ(0px)',
      transition: 'transform 0.4s ease-out',
    })
  }, [])

  return { ref, style, handleMouseMove, handleMouseLeave }
}
