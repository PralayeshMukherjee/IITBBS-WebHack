'use client'

import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { OrbitControls, Stars, useTexture } from '@react-three/drei'
import { Suspense, useMemo, useRef, useState } from 'react'
import * as THREE from 'three'
import type { Asteroid } from '@/lib/nasa-api'

/* ================= CONFIG ================= */

const MAX_SIM_DAYS = 365 * 20
const AUTO_SPEED = 30

/* ================= TYPES ================= */

interface Props {
  asteroids: Asteroid[]
}

type Planet = {
  name: string
  radius: number
  orbitRadius: number
  period: number
  texture: string
  hasRings?: boolean
}

/* ================= PLANET DATA ================= */

const PLANETS: Planet[] = [
  { name: 'Mercury', radius: 0.25, orbitRadius: 2.2, period: 88, texture: '/textures/mercury.jpg' },
  { name: 'Venus', radius: 0.35, orbitRadius: 3.0, period: 225, texture: '/textures/venus.jpg' },
  { name: 'Earth', radius: 0.38, orbitRadius: 3.8, period: 365, texture: '/textures/earth.jpg' },
  { name: 'Mars', radius: 0.3, orbitRadius: 4.6, period: 687, texture: '/textures/mars.jpg' },
  { name: 'Jupiter', radius: 1.0, orbitRadius: 6.0, period: 4333, texture: '/textures/jupiter.jpg' },
  {
    name: 'Saturn',
    radius: 0.9,
    orbitRadius: 7.5,
    period: 10759,
    texture: '/textures/saturn.jpg',
    hasRings: true,
  },
  { name: 'Uranus', radius: 0.6, orbitRadius: 9.0, period: 30687, texture: '/textures/uranus.jpg' },
  { name: 'Neptune', radius: 0.6, orbitRadius: 10.5, period: 60190, texture: '/textures/neptune.jpg' },
]

/* ================= HELPERS ================= */

function createAsteroidGeometry(radius: number, seed: number) {
  const geometry = new THREE.IcosahedronGeometry(radius, 1)
  const pos = geometry.attributes.position
  const rand = Math.sin(seed) * 10000

  for (let i = 0; i < pos.count; i++) {
    const offset = 1 + 0.3 * Math.sin(i * 12.9898 + rand)
    pos.setXYZ(
      i,
      pos.getX(i) * offset,
      pos.getY(i) * offset,
      pos.getZ(i) * offset
    )
  }

  geometry.computeVertexNormals()
  return geometry
}

/* ================= TIME CONTROLLER ================= */

function TimeController({
  auto,
  setSimTime,
}: {
  auto: boolean
  setSimTime: React.Dispatch<React.SetStateAction<number>>
}) {
  useFrame((_, delta) => {
    if (auto) {
      setSimTime(t => Math.min(t + delta * AUTO_SPEED, MAX_SIM_DAYS))
    }
  })
  return null
}

/* ================= CAMERA RIG ================= */

function CameraRig({ active }: { active: boolean }) {
  const { camera } = useThree()
  const angle = useRef(0)

  useFrame((_, delta) => {
    if (!active) return
    angle.current += delta * 0.15
    camera.position.set(
      Math.cos(angle.current) * 10,
      4,
      Math.sin(angle.current) * 10
    )
    camera.lookAt(0, 0, 0)
  })

  return null
}

/* ================= SUN ================= */

function SunMesh() {
  const texture = useTexture('/textures/sun.jpg')

  return (
    <mesh>
      <sphereGeometry args={[1.6, 64, 64]} />
      <meshStandardMaterial
        map={texture}
        emissive="#ffaa00"
        emissiveIntensity={1.5}
      />
    </mesh>
  )
}

/* ================= ORBIT RING ================= */

function OrbitRing({ radius }: { radius: number }) {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]}>
      <ringGeometry args={[radius - 0.01, radius + 0.01, 128]} />
      <meshBasicMaterial color="#444" transparent opacity={0.4} />
    </mesh>
  )
}

/* ================= SATURN RINGS ================= */

function SaturnRings() {
  const ringTexture = useTexture('/textures/saturn_ring.png')

  return (
    <mesh rotation={[Math.PI / 2.2, 0, 0]}>
      <ringGeometry args={[1.1, 1.8, 64]} />
      <meshStandardMaterial
        map={ringTexture}
        transparent
        side={THREE.DoubleSide}
        opacity={0.9}
      />
    </mesh>
  )
}

/* ================= PLANET ================= */

function PlanetMesh({
  planet,
  simTime,
  onHover,
}: {
  planet: Planet
  simTime: number
  onHover: (label: string | null, e?: PointerEvent) => void
}) {
  const texture = useTexture(planet.texture)
  const angle = (2 * Math.PI * simTime) / planet.period

  return (
    <group
      position={[
        Math.cos(angle) * planet.orbitRadius,
        0,
        Math.sin(angle) * planet.orbitRadius,
      ]}
      onPointerOver={e => {
        e.stopPropagation()
        onHover(planet.name, e.nativeEvent)
      }}
      onPointerOut={() => onHover(null)}
    >
      <mesh>
        <sphereGeometry args={[planet.radius, 48, 48]} />
        <meshStandardMaterial
          map={texture}
          emissive={planet.name === 'Earth' ? '#0033ff' : undefined}
          emissiveIntensity={planet.name === 'Earth' ? 0.4 : 0}
        />
      </mesh>

      {planet.hasRings && <SaturnRings />}
    </group>
  )
}

/* ================= ASTEROID ================= */

function AsteroidMesh({
  asteroid,
  index,
  simTime,
  selected,
  onHover,
  onSelect,
}: {
  asteroid: Asteroid
  index: number
  simTime: number
  selected: boolean
  onHover: (label: string | null, e?: PointerEvent) => void
  onSelect: (a: Asteroid) => void
}) {
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

  const geometry = useMemo(
    () => createAsteroidGeometry(size, index),
    [size, index]
  )

  const angle = simTime * speed + index

  return (
    <mesh
      geometry={geometry}
      position={[
        Math.cos(angle) * orbitRadius,
        Math.sin(angle * 0.35) * 0.6,
        Math.sin(angle) * orbitRadius,
      ]}
      onPointerOver={e => {
        e.stopPropagation()
        onHover(`${asteroid.name} (${asteroid.id})`, e.nativeEvent)
      }}
      onPointerOut={() => onHover(null)}
      onClick={e => {
        e.stopPropagation()
        onSelect(asteroid)
      }}
    >
      <meshStandardMaterial
        color={selected ? '#00ffff' : '#b22222'}
        roughness={1}
        metalness={0.05}
        emissive={selected ? '#00ffff' : '#660000'}
        emissiveIntensity={selected ? 1.2 : 0.4}
      />
    </mesh>
  )
}

/* ================= TOOLTIP ================= */

function Tooltip({ text, pos }: { text: string; pos: { x: number; y: number } }) {
  return (
    <div
      className="fixed z-50 px-3 py-2 text-xs bg-black/80 text-white rounded pointer-events-none"
      style={{ left: pos.x + 12, top: pos.y + 12 }}
    >
      {text}
    </div>
  )
}

/* ================= MAIN ================= */

export default function Asteroid3DVisualizer({ asteroids }: Props) {
  const [simTime, setSimTime] = useState(0)
  const [auto, setAuto] = useState(false)
  const [hover, setHover] = useState<string | null>(null)
  const [mouse, setMouse] = useState({ x: 0, y: 0 })
  const [selected, setSelected] = useState<Asteroid | null>(null)

  return (
    <div className="relative w-full h-[50vh] bg-gray-900 rounded-lg overflow-hidden">
      {hover && <Tooltip text={hover} pos={mouse} />}

      <div className="absolute top-2 left-2 z-10">
        <button
          onClick={() => setAuto(a => !a)}
          className="px-3 py-1 text-xs bg-gray-800 text-white rounded"
        >
          {auto ? 'Pause' : 'Auto'}
        </button>
      </div>

      <Canvas camera={{ position: [8, 4, 9], fov: 50 }}>
        <Suspense fallback={null}>
          <TimeController auto={auto} setSimTime={setSimTime} />
          <CameraRig active={auto} />

          <ambientLight intensity={0.35} />
          <directionalLight position={[6, 6, 6]} intensity={1.2} />

          <SunMesh />

          <group scale={1.8}>
            {PLANETS.map(p => (
              <group key={p.name}>
                <OrbitRing radius={p.orbitRadius * 1.8} />
                <PlanetMesh
                  planet={p}
                  simTime={simTime}
                  onHover={(label, e) => {
                    if (e) setMouse({ x: e.clientX, y: e.clientY })
                    setHover(label)
                  }}
                />
              </group>
            ))}

            {asteroids.map((a, i) => (
              <AsteroidMesh
                key={a.id}
                asteroid={a}
                index={i}
                simTime={simTime}
                selected={selected?.id === a.id}
                onHover={(label, e) => {
                  if (e) setMouse({ x: e.clientX, y: e.clientY })
                  setHover(label)
                }}
                onSelect={setSelected}
              />
            ))}
          </group>

          <Stars radius={90} depth={50} count={2000} factor={3} fade />
          <OrbitControls enablePan={false} />
        </Suspense>
      </Canvas>
    </div>
  )
}