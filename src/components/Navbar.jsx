import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, ArrowUpRight, Sun, Moon } from 'lucide-react'
import { useTheme } from '../context/ThemeContext'

const navLinks = [
  { name: 'Home', href: '#home' },
  { name: 'About', href: '#about' },
  { name: 'Services', href: '#services' },
  { name: 'Process', href: '#process' },
  { name: 'Insights', href: '#insights' },
  { name: 'Contact', href: '#contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const { theme, toggleTheme } = useTheme()

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [mobileOpen])

  const scrollTo = (href) => {
    setMobileOpen(false)
    const el = document.querySelector(href)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'bg-navy-deep/80 backdrop-blur-xl border-b border-cyan-electric/[0.06] shadow-lg shadow-black/20'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <a
              href="#home"
              onClick={(e) => { e.preventDefault(); scrollTo('#home') }}
              className="flex items-center gap-3 group"
            >
              <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-cyan-electric/20 to-cyan-electric/5 border border-cyan-electric/20 flex items-center justify-center group-hover:border-cyan-electric/40 transition-colors">
                <span className="text-cyan-electric font-bold text-sm">N</span>
              </div>
              <div className="flex flex-col">
                <span className="text-surface font-bold text-sm tracking-wider leading-none">NEXORA</span>
                <span className="text-cyan-electric/60 text-[10px] tracking-[0.2em] leading-none mt-0.5">CAPITAL</span>
              </div>
            </a>

            {/* Desktop Nav */}
            <div className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => { e.preventDefault(); scrollTo(link.href) }}
                  className="px-4 py-2 text-sm text-surface/60 hover:text-surface transition-colors duration-300 relative group"
                >
                  {link.name}
                  <span className="absolute bottom-1 left-4 right-4 h-px bg-cyan-electric scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                </a>
              ))}
            </div>

            {/* Theme Toggle + CTA */}
            <div className="hidden lg:flex items-center gap-3">
              <button
                onClick={toggleTheme}
                className="w-9 h-9 rounded-full border border-cyan-electric/15 flex items-center justify-center text-surface/50 hover:text-cyan-electric hover:border-cyan-electric/30 transition-all duration-300 bg-cyan-electric/[0.04] hover:bg-cyan-electric/[0.08]"
                aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
              >
                <AnimatePresence mode="wait" initial={false}>
                  <motion.span
                    key={theme}
                    initial={{ rotate: -90, opacity: 0, scale: 0.5 }}
                    animate={{ rotate: 0, opacity: 1, scale: 1 }}
                    exit={{ rotate: 90, opacity: 0, scale: 0.5 }}
                    transition={{ duration: 0.2 }}
                    className="flex items-center justify-center"
                  >
                    {theme === 'dark' ? <Sun size={15} /> : <Moon size={15} />}
                  </motion.span>
                </AnimatePresence>
              </button>
              <a
                href="#contact"
                onClick={(e) => { e.preventDefault(); scrollTo('#contact') }}
                className="magnetic-btn inline-flex items-center gap-2 px-6 py-2.5 text-sm font-bold rounded-full bg-cyan-electric text-white dark:text-navy-deep shadow-md shadow-cyan-electric/20 hover:brightness-110 transition-all duration-300"
              >
                Get Started
                <ArrowUpRight size={14} />
              </a>
            </div>

            {/* Mobile: Theme + Menu Toggle */}
            <div className="lg:hidden flex items-center gap-2">
              <button
                onClick={toggleTheme}
                className="w-9 h-9 rounded-full border border-cyan-electric/15 flex items-center justify-center text-surface/50 hover:text-cyan-electric transition-colors bg-cyan-electric/[0.04]"
                aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
              >
                {theme === 'dark' ? <Sun size={15} /> : <Moon size={15} />}
              </button>
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="w-10 h-10 flex items-center justify-center text-surface/80 hover:text-surface"
                aria-label="Toggle menu"
              >
                {mobileOpen ? <X size={22} /> : <Menu size={22} />}
              </button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-navy-deep/95 backdrop-blur-2xl lg:hidden"
          >
            <div className="flex flex-col items-center justify-center h-full gap-2">
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => { e.preventDefault(); scrollTo(link.href) }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ delay: i * 0.06, duration: 0.4 }}
                  className="text-2xl font-semibold text-surface/70 hover:text-cyan-electric transition-colors py-3"
                >
                  {link.name}
                </motion.a>
              ))}
              <motion.a
                href="#contact"
                onClick={(e) => { e.preventDefault(); scrollTo(link.href) }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ delay: 0.4, duration: 0.4 }}
                className="mt-6 px-8 py-3 rounded-full bg-cyan-electric text-white dark:text-navy-deep text-lg font-bold shadow-md shadow-cyan-electric/20"
              >
                Get Started
              </motion.a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
