'use client'

import { useEffect, useRef } from 'react'

type Particle = {
  x: number
  y: number
  vx: number
  vy: number
  baseRadius: number
  phase: number
  pulseSpeed: number
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
      baseCount: 120,
      maxVelocity: 0.65,
      linkDistance: 180,
      linkAlpha: 0.18,
      particleAlpha: 0.95,
      hueA: 232, // primary-purple/blue
      hueB: 300, // magenta
    }

    const isMobile = () => window.matchMedia('(max-width: 768px)').matches

    function resizeCanvas(): void {
      width = canvas.clientWidth
      height = canvas.clientHeight
      canvas.width = Math.floor(width * dpr)
      canvas.height = Math.floor(height * dpr)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      initParticles()
    }

    function initParticles(): void {
      const count = Math.floor(config.baseCount * (isMobile() ? 0.75 : 1))
      particles = Array.from({ length: count }, () => {
        const speed = Math.random() * config.maxVelocity + 0.1
        const angle = Math.random() * Math.PI * 2
        return {
          x: Math.random() * width,
          y: Math.random() * height,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          baseRadius: Math.random() * 1.2 + 1.2,
          phase: Math.random() * Math.PI * 2,
          pulseSpeed: 0.002 + Math.random() * 0.004,
        }
      })
    }

    function step(): void {
      ctx.clearRect(0, 0, width, height)

      // Gradient background veil (very subtle)
      const g = ctx.createLinearGradient(0, 0, width, height)
      g.addColorStop(0, 'rgba(102, 126, 234, 0.10)')
      g.addColorStop(1, 'rgba(240, 147, 251, 0.08)')
      ctx.fillStyle = g
      ctx.fillRect(0, 0, width, height)

      ctx.globalCompositeOperation = 'lighter'

      // Update & draw particles
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i]

        // Stronger mouse attraction
        const dx = mouseX - p.x
        const dy = mouseY - p.y
        const dist2 = dx * dx + dy * dy
        const attractRadius2 = 80000
        if (dist2 < attractRadius2) {
          const m = 1 - dist2 / attractRadius2
          p.vx += dx * 0.00035 * m
          p.vy += dy * 0.00035 * m
        }

        p.x += p.vx
        p.y += p.vy

        // Wrap around edges for continuous motion
        if (p.x < -20) p.x = width + 20
        if (p.x > width + 20) p.x = -20
        if (p.y < -20) p.y = height + 20
        if (p.y > height + 20) p.y = -20

        // Slight velocity damping
        p.vx *= 0.995
        p.vy *= 0.995

        // Pulse
        p.phase += p.pulseSpeed
        const r = p.baseRadius * (1 + 0.25 * Math.sin(p.phase))

        // Glow circle
        ctx.beginPath()
        const hue = config.hueA + ((config.hueB - config.hueA) * (p.x / Math.max(width, 1)))
        ctx.fillStyle = `hsla(${hue}, 85%, 65%, ${config.particleAlpha})`
        ctx.shadowColor = `hsla(${hue}, 85%, 65%, 0.45)`
        ctx.shadowBlur = 16
        ctx.arc(p.x, p.y, r, 0, Math.PI * 2)
        ctx.fill()
        ctx.shadowBlur = 0
      }

      // Draw links
      for (let i = 0; i < particles.length; i++) {
        const a = particles[i]
        for (let j = i + 1; j < particles.length; j++) {
          const b = particles[j]
          const dx = a.x - b.x
          const dy = a.y - b.y
          const dist = Math.hypot(dx, dy)
          if (dist < config.linkDistance) {
            const t = (a.x + b.x) / (2 * Math.max(width, 1))
            const hue = config.hueA + (config.hueB - config.hueA) * t
            ctx.strokeStyle = `hsla(${hue}, 85%, 65%, ${config.linkAlpha * (1 - dist / config.linkDistance)})`
            ctx.lineWidth = 1.2
            ctx.beginPath()
            ctx.moveTo(a.x, a.y)
            ctx.lineTo(b.x, b.y)
            ctx.stroke()
          }
        }
      }

      ctx.globalCompositeOperation = 'source-over'

      animationRef.current = requestAnimationFrame(step)
    }

    function onMouseMove(e: MouseEvent): void {
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
      className="pointer-events-none absolute inset-0 h-full w-full opacity-90 mix-blend-screen"
      aria-hidden="true"
    />
  )
}


