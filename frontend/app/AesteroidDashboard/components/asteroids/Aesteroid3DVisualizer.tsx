'use client'

import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Stars } from '@react-three/drei'
import { Suspense, useMemo, useRef, useState } from 'react'
import * as THREE from 'three'
import type { Asteroid } from '@/lib/nasa-api'

/* ================= TYPES ================= */

interface Props {
  asteroids: Asteroid[]
}

type Planet = {
  name: string
  radius: number
  orbitRadius: number
  color: string
  speed: number
}

/* ================= DATA ================= */

const PLANETS: Planet[] = [
  { name: 'Mercury', radius: 0.25, orbitRadius: 2.2, color: '#9e9e9e', speed: 4.15 },
  { name: 'Venus', radius: 0.35, orbitRadius: 3.0, color: '#e6c28b', speed: 1.62 },
  { name: 'Earth', radius: 0.38, orbitRadius: 3.8, color: '#2a6ebb', speed: 1.0 },
  { name: 'Mars', radius: 0.3, orbitRadius: 4.6, color: '#c1440e', speed: 0.53 },
  { name: 'Jupiter', radius: 1.0, orbitRadius: 6.0, color: '#d8ca9d', speed: 0.08 },
  { name: 'Saturn', radius: 0.9, orbitRadius: 7.5, color: '#e8d8a8', speed: 0.03 },
  { name: 'Uranus', radius: 0.6, orbitRadius: 9.0, color: '#7ad0d8', speed: 0.012 },
  { name: 'Neptune', radius: 0.6, orbitRadius: 10.5, color: '#3f54ba', speed: 0.006 },
]

/* ================= PLANET ================= */

function PlanetMesh({ planet }: { planet: Planet }) {
  const ref = useRef<THREE.Mesh>(null!)
  const angle = useRef(Math.random() * Math.PI * 2)

  useFrame((_, delta) => {
    angle.current += delta * planet.speed * 0.15
    ref.current.position.set(
      Math.cos(angle.current) * planet.orbitRadius,
      0,
      Math.sin(angle.current) * planet.orbitRadius
    )
  })

  return (
    <mesh ref={ref}>
      <sphereGeometry args={[planet.radius, 32, 32]} />
      <meshStandardMaterial color={planet.color} roughness={0.7} />
    </mesh>
  )
}

/* ================= ASTEROID ================= */

function AsteroidMesh({
  asteroid,
  index,
  onHover,
}: {
  asteroid: Asteroid
  index: number
  onHover: (a: Asteroid | null, e?: PointerEvent) => void
}) {
  const ref = useRef<THREE.Mesh>(null!)
  const angle = useRef((index / 30) * Math.PI * 2)
  const hovered = useRef(false)

  const orbitRadius = useMemo(() => {
    const miss = asteroid.close_approach_data?.[0]?.miss_distance?.kilometers
    if (!miss) return 5
    return Math.min(Math.max(parseFloat(miss) / 2e7, 3.5), 9)
  }, [asteroid])

  const speed = useMemo(() => {
    const v = asteroid.close_approach_data?.[0]?.relative_velocity?.kilometers_per_second
    if (!v) return 0.6
    return Math.min(Math.max(parseFloat(v) / 30, 0.3), 2.5)
  }, [asteroid])

  const size = useMemo(() => {
    const km =
      (asteroid.estimated_diameter.kilometers.estimated_diameter_min +
        asteroid.estimated_diameter.kilometers.estimated_diameter_max) / 2
    return Math.min(Math.max(km / 10, 0.18), 0.6)
  }, [asteroid])

  useFrame((_, delta) => {
    angle.current += delta * speed
    ref.current.position.set(
      Math.cos(angle.current) * orbitRadius,
      Math.sin(angle.current * 0.35) * 0.6,
      Math.sin(angle.current) * orbitRadius
    )

    ref.current.scale.lerp(
      new THREE.Vector3(
        hovered.current ? 1.4 : 1,
        hovered.current ? 1.4 : 1,
        hovered.current ? 1.4 : 1
      ),
      0.12
    )
  })

  return (
    <mesh
      ref={ref}
      onPointerOver={e => {
        e.stopPropagation()
        hovered.current = true
        onHover(asteroid, e.nativeEvent)
      }}
      onPointerOut={() => {
        hovered.current = false
        onHover(null)
      }}
    >
      <sphereGeometry args={[size, 20, 20]} />
      <meshStandardMaterial
        color={hovered.current ? '#ff7777' : '#ff3333'}
        emissive={hovered.current ? '#ff5555' : '#ff0000'}
        emissiveIntensity={hovered.current ? 1 : 0.6}
        roughness={0.85}
      />
    </mesh>
  )
}

/* ================= TOOLTIP ================= */

function AsteroidTooltip({
  asteroid,
  position,
}: {
  asteroid: Asteroid
  position: { x: number; y: number }
}) {
  return (
    <div
      className="fixed z-50 px-3 py-2 text-xs bg-black/80 text-white rounded-md pointer-events-none"
      style={{ left: position.x + 12, top: position.y + 12 }}
    >
      <div className="font-semibold">{asteroid.name}</div>
      <div className="opacity-70">ID: {asteroid.id}</div>
    </div>
  )
}

/* ================= MAIN ================= */

export default function Asteroid3DVisualizer({ asteroids }: Props) {
  const [hovered, setHovered] = useState<Asteroid | null>(null)
  const [mouse, setMouse] = useState({ x: 0, y: 0 })

  return (
    <div className="relative w-full h-[40vh] bg-gray-900 rounded-lg overflow-hidden">
      {hovered && <AsteroidTooltip asteroid={hovered} position={mouse} />}

      <Canvas camera={{ position: [8, 4, 9], fov: 50 }}>
        <Suspense fallback={null}>
          <ambientLight intensity={0.35} />
          <directionalLight position={[6, 6, 6]} intensity={1.2} />
          <pointLight position={[-6, -4, -6]} intensity={0.4} />

          {/* Sun */}
          <mesh>
            <sphereGeometry args={[1.4, 48, 48]} />
            <meshStandardMaterial
              color="#ffcc33"
              emissive="#ff9900"
              emissiveIntensity={0.6}
            />
          </mesh>

          <group scale={1.8}>
            {PLANETS.map(p => (
              <PlanetMesh key={p.name} planet={p} />
            ))}

            {asteroids.map((a, i) => (
              <AsteroidMesh
                key={a.id}
                asteroid={a}
                index={i}
                onHover={(ast, e) => {
                  if (e) setMouse({ x: e.clientX, y: e.clientY })
                  setHovered(ast)
                }}
              />
            ))}
          </group>

          <Stars radius={90} depth={50} count={2000} factor={3} fade />

          <OrbitControls
            enablePan={false}
            enableZoom
            minDistance={4}
            maxDistance={18}
          />
        </Suspense>
      </Canvas>
    </div>
  )
}