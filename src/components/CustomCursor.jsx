import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { useMousePosition, useIsMobile } from '../hooks/useAnimations'

export default function CustomCursor() {
  const mouse = useMousePosition()
  const isMobile = useIsMobile()
  const [isHovered, setIsHovered] = useState(false)
  const [isClicked, setIsClicked] = useState(false)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    if (isMobile) return

    const handleMouseMove = () => {
      if (!isVisible) setIsVisible(true)
    }

    const handleMouseDown = () => setIsClicked(true)
    const handleMouseUp = () => setIsClicked(false)

    const handleMouseLeave = () => setIsVisible(false)
    const handleMouseEnter = () => setIsVisible(true)

    // Detect clickable elements for hover expansion
    const handleElementHover = (e) => {
      const target = e.target.closest('a, button, input, textarea, select, [role="button"], .group, .glass-card, .cursor-pointer')
      setIsHovered(!!target)
    }

    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mousemove', handleElementHover)
    window.addEventListener('mousedown', handleMouseDown)
    window.addEventListener('mouseup', handleMouseUp)
    document.addEventListener('mouseleave', handleMouseLeave)
    document.addEventListener('mouseenter', handleMouseEnter)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mousemove', handleElementHover)
      window.removeEventListener('mousedown', handleMouseDown)
      window.removeEventListener('mouseup', handleMouseUp)
      document.removeEventListener('mouseleave', handleMouseLeave)
      document.removeEventListener('mouseenter', handleMouseEnter)
    }
  }, [isMobile, isVisible])

  // Don't render custom cursor on mobile touch devices
  if (isMobile || !isVisible) return null

  // Convert normalized mouse coordinates [-1, 1] back to pixel position
  const x = ((mouse.x + 1) / 2) * window.innerWidth
  const y = ((-mouse.y + 1) / 2) * window.innerHeight

  return (
    <div className="pointer-events-none fixed inset-0 z-[9999] overflow-hidden">
      {/* Outer Spring Follower Ring */}
      <motion.div
        className={`absolute rounded-full border border-cyan-electric/40 transition-colors duration-300 ${
          isHovered ? 'bg-cyan-electric/10 border-cyan-electric/80 scale-150' : 'bg-transparent'
        }`}
        animate={{
          x: x - (isHovered ? 24 : 16),
          y: y - (isHovered ? 24 : 16),
          width: isHovered ? 48 : 32,
          height: isHovered ? 48 : 32,
          scale: isClicked ? 0.75 : 1,
        }}
        transition={{
          type: 'spring',
          damping: 28,
          stiffness: 350,
          mass: 0.5,
        }}
      />

      {/* Inner Glowing Precision Dot */}
      <motion.div
        className="absolute w-2 h-2 rounded-full bg-cyan-electric shadow-[0_0_10px_#19D3FF]"
        animate={{
          x: x - 4,
          y: y - 4,
          scale: isClicked ? 0.5 : isHovered ? 1.5 : 1,
        }}
        transition={{
          type: 'spring',
          damping: 40,
          stiffness: 800,
          mass: 0.1,
        }}
      />
    </div>
  )
}
