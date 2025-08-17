'use client'

import { useEffect, useRef } from 'react'

type Particle = {
  x: number
  y: number
  vx: number
  vy: number
  radius: number
  type: 'particle' | 'star'
  twinkle: number
  twinkleSpeed: number
}

export default function BackgroundFX(): JSX.Element {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const animationRef = useRef<number | null>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const dpr = Math.min(window.devicePixelRatio || 1, 2)

    let width = 0
    let height = 0
    let particles: Particle[] = []
    let mouseX = -9999
    let mouseY = -9999

    const config = {
      baseCount: 85,
      maxVelocity: 0.85,
      linkDistance: 140,
      linkAlpha: 0.12,
      particleAlpha: 0.9,
      hueA: 232, // primary-purple/blue
      hueB: 300, // magenta
    }

    const isMobile = () => window.matchMedia('(max-width: 768px)').matches

    function resizeCanvas(): void {
      if (!canvas || !ctx) return
      width = canvas.clientWidth
      height = canvas.clientHeight
      canvas.width = Math.floor(width * dpr)
      canvas.height = Math.floor(height * dpr)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      initParticles()
    }

    function initParticles(): void {
      const count = Math.floor(config.baseCount * (isMobile() ? 0.6 : 1))
      particles = Array.from({ length: count }, () => {
        const speed = Math.random() * config.maxVelocity + 0.15
        const angle = Math.random() * Math.PI * 2
        const isStar = Math.random() < 0.15 // 15% chance of being a star
        return {
          x: Math.random() * width,
          y: Math.random() * height,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          radius: isStar ? Math.random() * 2.5 + 1.5 : Math.random() * 1.8 + 0.8,
          type: isStar ? 'star' : 'particle',
          twinkle: Math.random() * Math.PI * 2,
          twinkleSpeed: 0.02 + Math.random() * 0.03,
        }
      })
    }

    function step(): void {
      if (!canvas || !ctx) return
      ctx.clearRect(0, 0, width, height)

      // Gradient background veil (very subtle)
      const g = ctx.createLinearGradient(0, 0, width, height)
      g.addColorStop(0, 'rgba(102, 126, 234, 0.08)')
      g.addColorStop(1, 'rgba(240, 147, 251, 0.06)')
      ctx.fillStyle = g
      ctx.fillRect(0, 0, width, height)

      // Update & draw particles
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i]

        // Moderate mouse attraction
        const dx = p.x - mouseX
        const dy = p.y - mouseY
        const dist2 = dx * dx + dy * dy
        if (dist2 < 20000) {
          p.vx += (dx / 20000) * -0.8
          p.vy += (dy / 20000) * -0.8
        }

        p.x += p.vx
        p.y += p.vy

        // Wrap around edges for continuous motion
        if (p.x < -20) p.x = width + 20
        if (p.x > width + 20) p.x = -20
        if (p.y < -20) p.y = height + 20
        if (p.y > height + 20) p.y = -20

        // Minimal velocity damping
        p.vx *= 0.998
        p.vy *= 0.998

        // Update twinkle for stars
        if (p.type === 'star') {
          p.twinkle += p.twinkleSpeed
        }

        // Glow circle
        ctx.beginPath()
        const hue = config.hueA + ((config.hueB - config.hueA) * (p.x / Math.max(width, 1)))
        
        if (p.type === 'star') {
          // Stars have twinkling effect
          const twinkleAlpha = 0.7 + 0.3 * Math.sin(p.twinkle)
          ctx.fillStyle = `hsla(${hue}, 85%, 75%, ${twinkleAlpha})`
          ctx.shadowColor = `hsla(${hue}, 85%, 75%, 0.5)`
          ctx.shadowBlur = 20
        } else {
          // Regular particles
          ctx.fillStyle = `hsla(${hue}, 85%, 65%, ${config.particleAlpha})`
          ctx.shadowColor = `hsla(${hue}, 85%, 65%, 0.4)`
          ctx.shadowBlur = 14
        }
        
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2)
        ctx.fill()
        ctx.shadowBlur = 0
      }

      // Draw links (only between regular particles, not stars)
      for (let i = 0; i < particles.length; i++) {
        const a = particles[i]
        if (a.type === 'star') continue // Skip stars for links
        
        for (let j = i + 1; j < particles.length; j++) {
          const b = particles[j]
          if (b.type === 'star') continue // Skip stars for links
          
          const dx = a.x - b.x
          const dy = a.y - b.y
          const dist = Math.hypot(dx, dy)
          if (dist < config.linkDistance) {
            const t = (a.x + b.x) / (2 * Math.max(width, 1))
            const hue = config.hueA + (config.hueB - config.hueA) * t
            ctx.strokeStyle = `hsla(${hue}, 85%, 65%, ${config.linkAlpha * (1 - dist / config.linkDistance)})`
            ctx.lineWidth = 1.1
            ctx.beginPath()
            ctx.moveTo(a.x, a.y)
            ctx.lineTo(b.x, b.y)
            ctx.stroke()
          }
        }
      }

      animationRef.current = requestAnimationFrame(step)
    }

    function onMouseMove(e: MouseEvent): void {
      if (!canvas) return
      const rect = canvas.getBoundingClientRect()
      mouseX = e.clientX - rect.left
      mouseY = e.clientY - rect.top
    }

    function onMouseLeave(): void {
      mouseX = -9999
      mouseY = -9999
    }

    window.addEventListener('resize', resizeCanvas)
    window.addEventListener('mousemove', onMouseMove)
    window.addEventListener('mouseleave', onMouseLeave)
    resizeCanvas()
    animationRef.current = requestAnimationFrame(step)

    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current)
      window.removeEventListener('resize', resizeCanvas)
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('mouseleave', onMouseLeave)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none absolute inset-0 h-full w-full opacity-85 mix-blend-screen"
      aria-hidden="true"
    />
  )
}


