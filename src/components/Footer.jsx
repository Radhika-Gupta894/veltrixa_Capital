import { Linkedin, Twitter, Instagram, Youtube, ArrowUp } from 'lucide-react'

const footerLinks = {
  Company: ['About Us', 'Our Team', 'Careers', 'Contact'],
  Services: ['Equity & Futures', 'Options Intelligence', 'Index Strategies', 'Commodity Intelligence'],
  Insights: ['Market Analysis', 'Risk Management', 'Education', 'Blog'],
  Legal: ['Privacy Policy', 'Terms of Service', 'Disclaimer', 'Compliance'],
}

const socials = [
  { icon: Linkedin, label: 'LinkedIn', href: '#' },
  { icon: Twitter, label: 'Twitter', href: '#' },
  { icon: Instagram, label: 'Instagram', href: '#' },
  { icon: Youtube, label: 'YouTube', href: '#' },
]

export default function Footer() {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' })

  return (
    <footer className="relative border-t border-cyan-electric/[0.06]">
      {/* Top glow line */}
      <div className="h-px bg-gradient-to-r from-transparent via-cyan-electric/15 to-transparent" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 pt-16 pb-8">
        <div className="grid lg:grid-cols-5 gap-12 lg:gap-8 mb-16">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-electric/20 to-cyan-electric/5 border border-cyan-electric/20 flex items-center justify-center">
                <span className="text-cyan-electric font-bold text-xs">N</span>
              </div>
              <div className="flex flex-col">
                <span className="text-surface font-bold text-xs tracking-wider leading-none">NEXORA</span>
                <span className="text-cyan-electric/60 text-[9px] tracking-[0.2em] leading-none mt-0.5">CAPITAL</span>
              </div>
            </div>
            <p className="text-xs text-surface/30 leading-relaxed mb-6 max-w-[200px]">
              Intelligence Behind Every Market Decision
            </p>

            {/* Social */}
            <div className="flex gap-2">
              {socials.map(({ icon: Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-9 h-9 rounded-xl bg-cyan-electric/[0.04] border border-cyan-electric/[0.06] flex items-center justify-center text-surface/30 hover:text-cyan-electric hover:border-cyan-electric/20 transition-all duration-300"
                >
                  <Icon size={14} />
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 className="text-xs font-bold text-surface/60 tracking-wider uppercase mb-4">
                {category}
              </h4>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-sm text-surface/30 hover:text-cyan-electric/70 transition-colors duration-300"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Disclaimer */}
        <div className="border-t border-cyan-electric/[0.04] pt-8 mb-8">
          <p className="text-[11px] text-surface/20 leading-relaxed max-w-4xl">
            <strong className="text-surface/30">Disclaimer:</strong> Market investments are subject to market risks.
            Information presented on this website is for educational and informational purposes and should
            not be considered a guarantee of returns or a substitute for professional financial advice.
            Past performance is not indicative of future results. Please consult with a qualified
            financial advisor before making any investment decisions.
          </p>
        </div>

        {/* Bottom */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-surface/20">
            © 2026 Nexora Capital. All rights reserved.
          </p>
          <button
            onClick={scrollToTop}
            className="w-10 h-10 rounded-full border border-cyan-electric/10 flex items-center justify-center text-surface/30 hover:text-cyan-electric hover:border-cyan-electric/20 transition-colors"
            aria-label="Back to top"
          >
            <ArrowUp size={16} />
          </button>
        </div>
      </div>
    </footer>
  )
}
