import React, { useState, useEffect } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Sparkles, Play, Brain, Zap, Shield, Layers, Rocket, ArrowRight, Twitter, Github, Linkedin, Send, Users, Server, Code, Check, MessageSquare, Mail, Star, TrendingUp, Award, Globe } from 'lucide-react'

const customStyles = `
  @keyframes float {
    0%, 100% { transform: translateY(0px); }
    50% { transform: translateY(-20px); }
  }
  
  @keyframes glow {
    0%, 100% { opacity: 0.5; }
    50% { opacity: 1; }
  }
  
  .animate-float {
    animation: float 6s ease-in-out infinite;
  }
  
  .animate-glow {
    animation: glow 2s ease-in-out infinite;
  }
  
  .glass-effect {
    background: rgba(15, 23, 42, 0.6);
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
  }
  
  .gradient-border {
    position: relative;
  }
  
  .gradient-border::before {
    content: '';
    position: absolute;
    inset: -2px;
    border-radius: inherit;
    padding: 2px;
    background: linear-gradient(45deg, #3b82f6, #8b5cf6, #ec4899);
    -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
    -webkit-mask-composite: xor;
    mask-composite: exclude;
    opacity: 0;
    transition: opacity 0.3s;
  }
  
  .gradient-border:hover::before {
    opacity: 1;
  }
`

const statsData = [
  { id: 1, label: 'Active Teams', value: 12_400 },
  { id: 2, label: 'Requests / day', value: 1_200_000 },
  { id: 3, label: 'Integrations', value: 72 },
]

const testimonials = [
  { id: 1, name: 'Aisha Khan', role: 'Head of Product, TechCorp', text: 'Nexus AI reduced our time-to-insight by 8x. The neural engine is deceptively powerful and easy to integrate.' },
  { id: 2, name: 'Liam Chen', role: 'CTO, InnovateLab', text: 'The multi-modal capabilities let us process images and text in one unified pipeline — game changer.' },
  { id: 3, name: 'Sofia Rossi', role: 'Data Lead, CloudNine', text: 'Scale and security are exceptional. We onboarded thousands of users with zero downtime.' },
]

const pricingPlans = [
  { id: 'starter', name: 'Starter', price: 0, perks: ['Basic AI Assist', '500 requests / month', 'Email support'] },
  { id: 'growth', name: 'Growth', price: 49, perks: ['Realtime insights', '50k requests / month', 'Priority email & chat'] },
  { id: 'enterprise', name: 'Enterprise', price: 499, perks: ['Custom SLAs', 'Unlimited requests', 'Dedicated engineering'] },
]

const FAQ_ITEMS = [
  { q: 'How long does integration take?', a: 'Most teams go from zero to production in under two weeks with our SDKs and guides.' },
  { q: 'Is my data secure?', a: 'Yes — we support encryption at rest and in transit, and SOC2-ready controls.' },
  { q: 'Can I bring my own models?', a: 'Nexus AI supports custom models and on-prem connectors for private deployments.' },
]

export default function LandingPage() {
  const [counts, setCounts] = useState(statsData.map(() => 0))
  const [testiIndex, setTestiIndex] = useState(0)
  const [billingAnnual, setBillingAnnual] = useState(false)
  const [openFAQ, setOpenFAQ] = useState(null)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const [typedText, setTypedText] = useState('')
  const [currentWordIndex, setCurrentWordIndex] = useState(0)

  const words = ['Innovate', 'Automate', 'Accelerate', 'Transform']
  const { scrollY } = useScroll()
  const heroY = useTransform(scrollY, [0, 500], [0, 150])
  const heroOpacity = useTransform(scrollY, [0, 300], [1, 0])

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY })
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  useEffect(() => {
    const intervals = statsData.map((stat, i) => {
      const duration = 1200 + i * 300
      const increment = Math.ceil(stat.value / (duration / 50))
      let current = 0
      const id = setInterval(() => {
        current += increment
        if (current >= stat.value) {
          current = stat.value
          clearInterval(id)
        }
        setCounts(prev => {
          const next = [...prev]
          next[i] = current
          return next
        })
      }, 50)
      return id
    })
    return () => intervals.forEach(id => clearInterval(id))
  }, [])

  useEffect(() => {
    const id = setInterval(() => {
      setTestiIndex(i => (i + 1) % testimonials.length)
    }, 5000)
    return () => clearInterval(id)
  }, [])

  useEffect(() => {
    const currentWord = words[currentWordIndex]
    let charIndex = 0
    const typingInterval = setInterval(() => {
      if (charIndex <= currentWord.length) {
        setTypedText(currentWord.slice(0, charIndex))
        charIndex++
      } else {
        clearInterval(typingInterval)
        setTimeout(() => {
          setCurrentWordIndex((prev) => (prev + 1) % words.length)
        }, 2000)
      }
    }, 100)
    return () => clearInterval(typingInterval)
  }, [currentWordIndex])

  return (
    <div className="min-h-screen bg-slate-950 text-white overflow-x-hidden relative">
      <style>{customStyles}</style>

      <div className="fixed inset-0 z-0">
        <div className="absolute top-20 left-10 w-96 h-96 bg-blue-600/20 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute top-40 right-20 w-80 h-80 bg-purple-600/20 rounded-full blur-[100px] animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute bottom-20 left-1/4 w-72 h-72 bg-pink-600/10 rounded-full blur-[100px] animate-pulse" style={{ animationDelay: '2s' }} />
      </div>

      <div 
        className="fixed inset-0 z-0 opacity-30 pointer-events-none"
        style={{
          background: `radial-gradient(circle at ${mousePos.x}px ${mousePos.y}px, rgba(59, 130, 246, 0.15) 0%, transparent 50%)`
        }}
      />

      <nav className="fixed top-0 left-0 right-0 z-50 px-6 py-4 backdrop-blur-xl bg-slate-950/80 border-b border-white/10 shadow-lg">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Sparkles className="w-6 h-6 text-blue-400" />
            <div>
              <div className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">Nexus AI</div>
              <div className="text-xs text-slate-400 -mt-1">AI for the future of work</div>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <a className="text-slate-400 hover:text-white transition">Docs</a>
            <a className="text-slate-400 hover:text-white transition">Partners</a>
            <motion.button 
              whileHover={{ scale: 1.05 }} 
              whileTap={{ scale: 0.95 }}
              className="px-4 py-2 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 hover:shadow-xl hover:shadow-blue-500/50 text-sm font-semibold transition-all duration-300"
            >
              Get Access
            </motion.button>
          </div>
        </div>
      </nav>

      <header className="relative min-h-screen flex items-center justify-center px-6 pt-28">
        <motion.div 
          style={{ y: heroY, opacity: heroOpacity }}
          className="absolute inset-0 z-0"
        >
          <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-blue-400 rounded-full animate-ping" />
          <div className="absolute top-1/3 right-1/3 w-2 h-2 bg-purple-400 rounded-full animate-ping" style={{ animationDelay: '1s' }} />
          <div className="absolute bottom-1/3 left-1/2 w-2 h-2 bg-pink-400 rounded-full animate-ping" style={{ animationDelay: '2s' }} />
        </motion.div>
        <div className="max-w-6xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <motion.div 
              initial={{ opacity: 0, y: 24 }} 
              animate={{ opacity: 1, y: 0 }} 
              transition={{ duration: .8 }}
              className="mb-4"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 backdrop-blur-sm">
                <div className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
                <span className="text-sm text-blue-300 font-medium">AI-Powered Platform</span>
              </div>
            </motion.div>

            <motion.h1 
              initial={{ opacity: 0, y: 24 }} 
              animate={{ opacity: 1, y: 0 }} 
              transition={{ duration: .8 }} 
              className="text-5xl md:text-6xl lg:text-7xl font-extrabold leading-tight mb-6"
            >
              <span className="text-white block mb-2">
                {typedText}
                <motion.span
                  animate={{ opacity: [1, 0] }}
                  transition={{ duration: 0.8, repeat: Infinity, repeatType: 'reverse' }}
                  className="inline-block w-1 h-12 md:h-16 bg-gradient-to-b from-blue-400 to-purple-500 ml-1 align-middle"
                />
              </span>
              <span className="bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                with Nexus AI
              </span>
            </motion.h1>
            
            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .15 }} className="mt-6 text-lg text-slate-300 max-w-xl">
              One platform for intelligent automation, multi-modal processing, and enterprise-grade security. Build faster, ship safer.
            </motion.p>
            <div className="mt-8 flex flex-wrap gap-4">
              <motion.button whileHover={{ scale: 1.03 }} className="px-6 py-3 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 font-semibold shadow-xl flex items-center gap-2">
                Get Started <Sparkles className="w-4 h-4" />
              </motion.button>
              <motion.button whileHover={{ scale: 1.03 }} className="px-6 py-3 rounded-full bg-white/5 border border-white/10 text-sm flex items-center gap-2">
                <Play className="w-4 h-4" /> View Demo
              </motion.button>
            </div>

            <div className="mt-12 grid grid-cols-3 gap-4">
              {statsData.map((s, i) => (
                <div key={s.id} className="text-left">
                  <div className="text-2xl font-bold text-white">{counts[i].toLocaleString()}</div>
                  <div className="text-sm text-slate-400">{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="absolute -right-16 -top-10 w-72 h-72 rounded-2xl bg-gradient-to-br from-purple-600/20 to-pink-600/20 blur-3xl" />
            <div className="absolute left-8 top-24 w-56 h-56 rounded-2xl bg-gradient-to-br from-blue-600/15 to-cyan-600/10 blur-2xl" />
            <motion.div initial={{ opacity: 0, scale: .98 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: .8 }} className="relative rounded-2xl bg-gradient-to-br from-slate-900 to-slate-800 border border-slate-700/50 p-6 shadow-2xl">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center">
                    <Brain className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <div className="text-sm text-slate-400">Neural Processing</div>
                    <div className="text-white font-bold">Contextual & adaptive</div>
                  </div>
                </div>
                <div className="text-sm text-slate-400">Realtime · Secure</div>
              </div>
              <div className="bg-slate-900/40 p-4 rounded-lg border border-slate-700/40">
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-3 rounded-lg bg-gradient-to-br from-slate-900 to-slate-800 border border-slate-700/40">
                    <div className="text-xs text-slate-400">Latency</div>
                    <div className="text-white font-semibold">26ms</div>
                  </div>
                  <div className="p-3 rounded-lg bg-gradient-to-br from-slate-900 to-slate-800 border border-slate-700/40">
                    <div className="text-xs text-slate-400">Throughput</div>
                    <div className="text-white font-semibold">1200 req/s</div>
                  </div>
                </div>
              </div>

              {/* Add code preview animation */}
              <div className="mt-4 rounded-lg bg-slate-950/50 p-4 border border-slate-800">
                <div className="flex items-center gap-2 mb-3">
                  <Code className="w-4 h-4 text-emerald-400" />
                  <span className="text-xs text-slate-400 font-mono">Live Processing</span>
                </div>
                <div className="space-y-2 font-mono text-xs">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: '100%' }}
                    transition={{ duration: 1, delay: 0.5 }}
                    className="overflow-hidden"
                  >
                    <span className="text-purple-400">const</span>{' '}
                    <span className="text-blue-400">response</span>{' '}
                    <span className="text-slate-400">=</span>{' '}
                    <span className="text-emerald-400">await</span>{' '}
                    <span className="text-yellow-400">nexus.ai()</span>
                  </motion.div>
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: '100%' }}
                    transition={{ duration: 1, delay: 1 }}
                    className="overflow-hidden pl-4"
                  >
                    <span className="text-slate-400">.</span>
                    <span className="text-cyan-400">process</span>
                    <span className="text-slate-400">(</span>
                    <span className="text-orange-400">'analyze'</span>
                    <span className="text-slate-400">)</span>
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 2 }}
                    className="flex items-center gap-2 pl-4 text-emerald-400"
                  >
                    <Check className="w-3 h-3" />
                    <span>✓ Complete in 26ms</span>
                  </motion.div>
                </div>
              </div>
            </motion.div>

            <motion.div
              animate={{ 
                y: [0, -20, 0],
                rotate: [0, 5, 0]
              }}
              transition={{ 
                duration: 4, 
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="absolute -top-8 -right-8 w-20 h-20 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 opacity-20 blur-xl"
            />
            <motion.div
              animate={{ 
                y: [0, 20, 0],
                rotate: [0, -5, 0]
              }}
              transition={{ 
                duration: 5, 
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1
              }}
              className="absolute -bottom-8 -left-8 w-24 h-24 rounded-2xl bg-gradient-to-br from-pink-500 to-purple-600 opacity-20 blur-xl"
            />
          </div>
        </div>
      </header>

      <section className="relative px-6 py-20 z-10">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <motion.h2 
              className="text-4xl md:text-5xl font-bold mb-4"
              initial={{ backgroundPosition: '0% 50%' }}
              animate={{ backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'] }}
              transition={{ duration: 5, repeat: Infinity }}
              style={{
                backgroundImage: 'linear-gradient(90deg, #60A5FA, #A78BFA, #EC4899, #60A5FA)',
                backgroundSize: '200% 100%',
                WebkitBackgroundClip: 'text',
                backgroundClip: 'text',
                color: 'transparent'
              }}
            >
              Innovation in Every Pixel
            </motion.h2>
            <p className="text-slate-400 text-lg">Experience the future of AI-powered automation</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="rounded-3xl p-8 bg-gradient-to-br from-slate-900 to-slate-800 border border-slate-700/50 relative overflow-hidden group"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 to-purple-600/10 opacity-0 group-hover:opacity-100 transition-all duration-500" />
              <div className="relative z-10">
                <TrendingUp className="w-12 h-12 text-blue-400 mb-4" />
                <h3 className="text-2xl font-bold text-white mb-4">Real-Time Analytics</h3>
                <div className="space-y-4">
                  {statsData.map((stat, idx) => (
                    <div key={stat.id} className="flex items-center justify-between">
                      <span className="text-slate-400">{stat.label}</span>
                      <motion.span 
                        className="text-2xl font-bold text-white"
                        initial={{ scale: 0 }}
                        whileInView={{ scale: 1 }}
                        transition={{ duration: 0.5, delay: idx * 0.1 }}
                        viewport={{ once: true }}
                      >
                        {counts[idx].toLocaleString()}
                      </motion.span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="rounded-3xl p-8 bg-gradient-to-br from-slate-900 to-slate-800 border border-slate-700/50 relative overflow-hidden"
            >
              <div className="relative z-10">
                <Rocket className="w-12 h-12 text-purple-400 mb-4" />
                <h3 className="text-2xl font-bold text-white mb-4">Deploy Instantly</h3>
                <p className="text-slate-400 mb-6">From code to production in seconds</p>
                
                <div className="space-y-3">
                  {['Initialize', 'Configure', 'Deploy', 'Monitor'].map((step, idx) => (
                    <motion.div
                      key={step}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.4, delay: idx * 0.2 }}
                      viewport={{ once: true }}
                      className="flex items-center gap-3 p-3 rounded-lg bg-slate-800/50 border border-slate-700/50"
                    >
                      <motion.div
                        initial={{ scale: 0 }}
                        whileInView={{ scale: 1 }}
                        transition={{ duration: 0.3, delay: idx * 0.2 + 0.2 }}
                        viewport={{ once: true }}
                        className="w-8 h-8 rounded-full bg-gradient-to-br from-emerald-500 to-green-600 flex items-center justify-center"
                      >
                        <Check className="w-4 h-4 text-white" />
                      </motion.div>
                      <span className="text-white font-medium">{step}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
              
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute -bottom-12 -right-12 w-32 h-32 bg-gradient-to-br from-purple-600/20 to-pink-600/20 rounded-full blur-2xl"
              />
            </motion.div>
          </div>
        </div>
      </section>

      <section className="relative px-6 py-12 bg-gradient-to-b from-slate-950/60 to-transparent z-10">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h3 className="text-4xl font-bold mb-3 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">Loved by thousands of teams</h3>
            <p className="text-slate-400">Don't just take our word for it</p>
          </motion.div>
          <div className="relative max-w-4xl mx-auto">
            <div className="overflow-hidden">
              <motion.div 
                key={testimonials[testiIndex].id} 
                initial={{ opacity: 0, x: 40 }} 
                animate={{ opacity: 1, x: 0 }} 
                transition={{ duration: 0.6 }} 
                className="rounded-3xl bg-gradient-to-br from-slate-900 to-slate-800 p-8 border border-slate-700/50 shadow-2xl relative overflow-hidden group"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-blue-600/5 to-purple-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-600/20 to-purple-600/20 rounded-full blur-3xl" />
                <div className="relative z-10">
                  <div className="flex items-start gap-4 mb-6">
                    <div className="w-14 h-14 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-xl shadow-lg">
                      {testimonials[testiIndex].name.charAt(0)}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-1 mb-2 text-amber-400">
                        {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-current" />)}
                      </div>
                      <p className="text-slate-300 text-lg leading-relaxed italic">"{testimonials[testiIndex].text}"</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between pt-4 border-t border-slate-700/50">
                    <div>
                      <div className="font-semibold text-white">{testimonials[testiIndex].name}</div>
                      <div className="text-sm text-slate-400">{testimonials[testiIndex].role}</div>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-slate-500">
                      <Award className="w-4 h-4" />
                      Verified Customer
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
            <div className="mt-8 flex items-center justify-center gap-3">
              {testimonials.map((t, i) => (
                <motion.button 
                  key={t.id} 
                  onClick={() => setTestiIndex(i)} 
                  whileHover={{ scale: 1.2 }}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${i === testiIndex ? 'bg-gradient-to-r from-blue-500 to-purple-500 w-8' : 'bg-slate-700 hover:bg-slate-600'}`} 
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="relative px-6 py-20 z-10">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h3 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
              Simple, transparent pricing
            </h3>
            <p className="text-slate-400 text-lg mb-8">Choose the perfect plan for your team</p>
            <div className="inline-flex items-center gap-3 p-1.5 rounded-full bg-slate-900 border border-slate-700">
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setBillingAnnual(false)} 
                className={`px-6 py-2 rounded-full font-medium transition-all duration-300 ${!billingAnnual ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg' : 'text-slate-400 hover:text-white'}`}
              >
                Monthly
              </motion.button>
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setBillingAnnual(true)} 
                className={`px-6 py-2 rounded-full font-medium transition-all duration-300 ${billingAnnual ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg' : 'text-slate-400 hover:text-white'}`}
              >
                Annual
                <span className="ml-2 text-xs px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300">-20%</span>
              </motion.button>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {pricingPlans.map((plan, idx) => (
              <motion.div 
                key={plan.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -8 }}
                className={`rounded-3xl p-8 bg-gradient-to-br from-slate-900 to-slate-800 border transition-all duration-300 relative overflow-hidden group ${
                  idx === 1 
                    ? 'border-blue-500/50 shadow-2xl shadow-blue-500/20 scale-105' 
                    : 'border-slate-700/50 hover:border-slate-600'
                }`}
              >
                {idx === 1 && (
                  <div className="absolute top-4 right-4">
                    <div className="px-3 py-1 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 text-xs font-semibold text-white shadow-lg">
                      POPULAR
                    </div>
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-600/5 to-purple-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                <div className="relative z-10">
                  <div className="mb-6">
                    <h4 className="text-2xl font-bold text-white mb-2">{plan.name}</h4>
                    <div className="flex items-baseline gap-2">
                      <span className="text-5xl font-extrabold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                        ${billingAnnual ? Math.round(plan.price * 0.8) : plan.price}
                      </span>
                      <span className="text-slate-400">/month</span>
                    </div>
                    {billingAnnual && plan.price > 0 && (
                      <p className="text-sm text-emerald-400 mt-1">Save ${Math.round(plan.price * 0.2 * 12)}/year</p>
                    )}
                  </div>

                  <ul className="mb-8 space-y-4">
                    {plan.perks.map((perk, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <div className="w-5 h-5 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <Check className="w-3 h-3 text-white" />
                        </div>
                        <span className="text-slate-300">{perk}</span>
                      </li>
                    ))}
                  </ul>

                  <motion.button 
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`w-full py-3 rounded-xl font-semibold transition-all duration-300 ${
                      idx === 1
                        ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg shadow-blue-500/50 hover:shadow-blue-500/70'
                        : 'bg-white/5 text-white border border-slate-700 hover:bg-white/10 hover:border-slate-600'
                    }`}
                  >
                    Get Started
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            className="mt-12 rounded-2xl p-8 bg-gradient-to-br from-slate-900 to-slate-800 border border-slate-700/50 text-center"
          >
            <Globe className="w-12 h-12 mx-auto mb-4 text-blue-400" />
            <h4 className="text-2xl font-bold mb-2">Enterprise Solutions</h4>
            <p className="text-slate-400 mb-6 max-w-2xl mx-auto">
              Need custom pricing, dedicated support, or on-premise deployment? We've got you covered.
            </p>
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-3 rounded-xl bg-white/5 border border-slate-700 hover:bg-white/10 hover:border-slate-600 font-semibold transition-all duration-300"
            >
              Contact Sales
            </motion.button>
          </motion.div>
        </div>
      </section>

      <section className="relative px-6 py-20 bg-gradient-to-b from-slate-950/50 to-transparent z-10">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h3 className="text-4xl font-bold mb-3 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
              Frequently Asked Questions
            </h3>
            <p className="text-slate-400">Everything you need to know about Nexus AI</p>
          </motion.div>
          <div className="space-y-4">
            {FAQ_ITEMS.map((f, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                viewport={{ once: true }}
                className="rounded-2xl bg-gradient-to-br from-slate-900 to-slate-800 border border-slate-700/50 overflow-hidden hover:border-slate-600 transition-all duration-300"
              >
                <motion.button 
                  onClick={() => setOpenFAQ(openFAQ === idx ? null : idx)} 
                  className="w-full text-left p-6 flex items-start justify-between gap-4"
                  whileHover={{ backgroundColor: 'rgba(255, 255, 255, 0.02)' }}
                >
                  <div className="flex-1">
                    <div className="font-semibold text-lg text-white mb-2">{f.q}</div>
                    <motion.div
                      initial={false}
                      animate={{ 
                        height: openFAQ === idx ? 'auto' : 0,
                        opacity: openFAQ === idx ? 1 : 0
                      }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <p className="text-slate-400 text-sm leading-relaxed pr-8">{f.a}</p>
                    </motion.div>
                  </div>
                  <motion.div 
                    animate={{ rotate: openFAQ === idx ? 45 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center flex-shrink-0 text-slate-400 hover:text-white"
                  >
                    +
                  </motion.div>
                </motion.button>
              </motion.div>
            ))}
          </div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            className="mt-12 text-center p-8 rounded-2xl bg-gradient-to-br from-blue-600/10 to-purple-600/10 border border-blue-500/20"
          >
            <MessageSquare className="w-10 h-10 mx-auto mb-4 text-blue-400" />
            <h4 className="text-xl font-bold mb-2">Still have questions?</h4>
            <p className="text-slate-400 mb-4">Our support team is here to help you 24/7</p>
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold shadow-lg hover:shadow-blue-500/50 transition-all duration-300"
            >
              Contact Support
            </motion.button>
          </motion.div>
        </div>
      </section>

      <section className="relative px-6 py-20 z-10">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="relative rounded-3xl overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 via-purple-600/20 to-pink-600/20" />
            <div className="absolute inset-0 backdrop-blur-3xl" />
            <div className="absolute -top-24 -right-24 w-96 h-96 bg-blue-600/30 rounded-full blur-3xl" />
            <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-purple-600/30 rounded-full blur-3xl" />
            
            <div className="relative z-10 p-12 md:p-16">
              <div className="max-w-4xl mx-auto text-center">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  viewport={{ once: true }}
                >
                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/20 border border-blue-500/30 text-blue-300 text-sm font-semibold mb-6">
                    <Sparkles className="w-4 h-4" />
                    Limited Time Offer
                  </div>
                  <h2 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
                    <span className="bg-gradient-to-r from-white via-blue-100 to-purple-100 bg-clip-text text-transparent">
                      Ready to transform your workflow?
                    </span>
                  </h2>
                  <p className="text-xl text-slate-300 mb-10 max-w-2xl mx-auto">
                    Join 12,000+ teams building the future with Nexus AI. Get started in minutes with our free tier.
                  </p>
                  <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    <motion.button 
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-8 py-4 rounded-xl bg-white text-slate-900 font-bold text-lg shadow-2xl hover:shadow-white/50 transition-all duration-300 flex items-center gap-2"
                    >
                      Start Free Trial
                      <ArrowRight className="w-5 h-5" />
                    </motion.button>
                    <motion.button 
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-8 py-4 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 text-white font-semibold text-lg hover:bg-white/20 transition-all duration-300"
                    >
                      Schedule Demo
                    </motion.button>
                  </div>
                  <p className="text-slate-400 text-sm mt-6">
                    No credit card required • 14-day free trial • Cancel anytime
                  </p>
                </motion.div>
              </div>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
              className="rounded-2xl p-6 bg-gradient-to-br from-slate-900 to-slate-800 border border-slate-700/50 text-center"
            >
              <TrendingUp className="w-10 h-10 mx-auto mb-3 text-emerald-400" />
              <h4 className="font-semibold text-white mb-2">98% Uptime</h4>
              <p className="text-slate-400 text-sm">Industry-leading reliability</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="rounded-2xl p-6 bg-gradient-to-br from-slate-900 to-slate-800 border border-slate-700/50 text-center"
            >
              <Users className="w-10 h-10 mx-auto mb-3 text-blue-400" />
              <h4 className="font-semibold text-white mb-2">12K+ Users</h4>
              <p className="text-slate-400 text-sm">Trusted by teams worldwide</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              viewport={{ once: true }}
              className="rounded-2xl p-6 bg-gradient-to-br from-slate-900 to-slate-800 border border-slate-700/50 text-center"
            >
              <Award className="w-10 h-10 mx-auto mb-3 text-amber-400" />
              <h4 className="font-semibold text-white mb-2">SOC2 Compliant</h4>
              <p className="text-slate-400 text-sm">Enterprise-grade security</p>
            </motion.div>
          </div>
        </div>
      </section>

      <footer className="relative border-t border-slate-800 bg-slate-900/50">
        <div className="max-w-7xl mx-auto px-6 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
            <div className="space-y-6">
              <div className="flex items-center gap-2">
                <Sparkles className="w-6 h-6 text-blue-500" />
                <span className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                  Nexus AI
                </span>
              </div>
              <p className="text-slate-400 text-sm leading-relaxed">
                Building the future of digital organization with intelligent automation and seamless workflows.
              </p>
              <div className="flex items-center gap-4">
                <a href="#" className="w-10 h-10 rounded-full bg-slate-800 hover:bg-slate-700 flex items-center justify-center transition-all duration-300 hover:scale-110 group" aria-label="Twitter"><Twitter className="w-4 h-4 text-slate-400 group-hover:text-blue-400 transition-colors" /></a>
                <a href="#" className="w-10 h-10 rounded-full bg-slate-800 hover:bg-slate-700 flex items-center justify-center transition-all duration-300 hover:scale-110 group" aria-label="GitHub"><Github className="w-4 h-4 text-slate-400 group-hover:text-white transition-colors" /></a>
                <a href="#" className="w-10 h-10 rounded-full bg-slate-800 hover:bg-slate-700 flex items-center justify-center transition-all duration-300 hover:scale-110 group" aria-label="LinkedIn"><Linkedin className="w-4 h-4 text-slate-400 group-hover:text-blue-500 transition-colors" /></a>
              </div>
            </div>

            <div>
              <h3 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Product</h3>
              <ul className="space-y-3">
                <li><a href="#" className="text-slate-400 hover:text-white transition-colors duration-200 text-sm">Features</a></li>
                <li><a href="#" className="text-slate-400 hover:text-white transition-colors duration-200 text-sm">Pricing</a></li>
                <li><a href="#" className="text-slate-400 hover:text-white transition-colors duration-200 text-sm">Integration</a></li>
                <li><a href="#" className="text-slate-400 hover:text-white transition-colors duration-200 text-sm">Changelog</a></li>
              </ul>
            </div>

            <div>
              <h3 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Company</h3>
              <ul className="space-y-3">
                <li><a href="#" className="text-slate-400 hover:text-white transition-colors duration-200 text-sm">About Us</a></li>
                <li><a href="#" className="text-slate-400 hover:text-white transition-colors duration-200 text-sm">Careers</a></li>
                <li><a href="#" className="text-slate-400 hover:text-white transition-colors duration-200 text-sm">Blog</a></li>
                <li><a href="#" className="text-slate-400 hover:text-white transition-colors duration-200 text-sm">Contact</a></li>
              </ul>
            </div>

            <div>
              <h3 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Newsletter</h3>
              <p className="text-slate-400 text-sm mb-4">Subscribe to our newsletter for updates and exclusive insights.</p>
              <div className="flex gap-2">
                <input type="email" placeholder="Enter your email" className="flex-1 px-4 py-2 rounded-lg bg-slate-800 border border-slate-700 text-white placeholder:text-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all text-sm" />
                <button className="px-4 py-2 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 transition-all duration-300 flex items-center justify-center group"><Send className="w-4 h-4 text-white group-hover:translate-x-0.5 transition-transform" /></button>
              </div>
            </div>
          </div>

          <div className="pt-8 border-t border-slate-800">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <p className="text-slate-500 text-sm">
                © 2025 Nexus AI. All rights reserved.
              </p>
              <div className="flex items-center gap-6">
                <a href="#" className="text-slate-500 hover:text-white transition-colors duration-200 text-sm">
                  Privacy Policy
                </a>
                <a href="#" className="text-slate-500 hover:text-white transition-colors duration-200 text-sm">
                  Terms of Service
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
