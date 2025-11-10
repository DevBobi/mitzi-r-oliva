'use client'

import { useEffect, useState } from 'react'
import Particles, { initParticlesEngine } from '@tsparticles/react'
import { loadSlim } from '@tsparticles/slim'
import type { Engine } from '@tsparticles/engine'

export default function ParticleBackground() {
  const [init, setInit] = useState(false)

  useEffect(() => {
    initParticlesEngine(async (engine: Engine) => {
      await loadSlim(engine)
    }).then(() => {
      setInit(true)
    })
  }, [])

  if (!init) return null

  return (
    <Particles
      id="tsparticles"
      options={{
        background: {
          color: {
            value: 'transparent',
          },
        },
        fpsLimit: 120,
        particles: {
          color: {
            value: ['#ffd700', '#ffed4e', '#ffa500', '#5d3fd3', '#ffffff'],
          },
          links: {
            color: '#ffd700',
            distance: 150,
            enable: true,
            opacity: 0.4,
            width: 1.5,
          },
          move: {
            direction: 'none',
            enable: true,
            outModes: {
              default: 'bounce',
            },
            random: true,
            speed: 2,
            straight: false,
          },
          number: {
            density: {
              enable: true,
            },
            value: 80,
          },
          opacity: {
            value: 0.5,
            animation: {
              enable: true,
              speed: 1,
              sync: false,
            },
          },
          shape: {
            type: ['circle', 'triangle', 'polygon'],
          },
          size: {
            value: { min: 1, max: 5 },
            animation: {
              enable: true,
              speed: 3,
              sync: false,
            },
          },
        },
        detectRetina: true,
        style: {
          position: 'fixed',
          top: '0',
          left: '0',
          width: '100%',
          height: '100%',
          zIndex: '1',
          pointerEvents: 'none',
        },
      }}
    />
  )
}

