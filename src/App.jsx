import { lazy, Suspense } from 'react'
import Navbar from './components/Navbar'
import Hero3D from './components/Hero3D'
import Metrics from './components/Metrics'
import Footer from './components/Footer'
import CustomCursor from './components/CustomCursor'

/* Lazy-load heavy sections for performance */
const About = lazy(() => import('./components/About'))
const MarketGlobe = lazy(() => import('./components/MarketGlobe'))
const Services = lazy(() => import('./components/Services'))
const MarketDashboard = lazy(() => import('./components/MarketDashboard'))
const ProcessTimeline = lazy(() => import('./components/ProcessTimeline'))
const DataPipeline = lazy(() => import('./components/DataPipeline'))
const Testimonials = lazy(() => import('./components/Testimonials'))
const Insights = lazy(() => import('./components/Insights'))
const CTA = lazy(() => import('./components/CTA'))
const Contact = lazy(() => import('./components/Contact'))

/* Minimal fallback loader */
function SectionLoader() {
  return (
    <div className="flex items-center justify-center py-32">
      <div className="w-6 h-6 border-2 border-cyan-electric/20 border-t-cyan-electric rounded-full animate-spin" />
    </div>
  )
}

/* Section divider */
function Divider() {
  return <div className="section-divider max-w-7xl mx-auto" />
}

export default function App() {
  return (
    <div className="relative min-h-screen bg-navy-deep text-surface overflow-x-hidden">
      <CustomCursor />
      <Navbar />
      <Hero3D />
      <Metrics />

      <Suspense fallback={<SectionLoader />}>
        <About />
        <Divider />
        <MarketGlobe />
        <Divider />
        <Services />
        <Divider />
        <MarketDashboard />
        <Divider />
        <ProcessTimeline />
        <Divider />
        <DataPipeline />
        <Divider />
        <Testimonials />
        <Divider />
        <Insights />
        <Divider />
        <CTA />
        <Divider />
        <Contact />
      </Suspense>

      <Footer />
    </div>
  )
}
