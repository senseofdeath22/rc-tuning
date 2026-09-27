import { ContactShadows, OrbitControls, RoundedBox } from '@react-three/drei'
import { Canvas, type ThreeEvent } from '@react-three/fiber'
import { Suspense, useMemo } from 'react'
import * as THREE from 'three'
import type { SubsystemId } from '../types'

type SceneProps = {
  selected: SubsystemId
  bodyVisible: boolean
  partRemoved: boolean
  onSelect: (id: SubsystemId) => void
}

const palette = {
  steel: '#343a3d',
  steelLight: '#52595d',
  dark: '#111517',
  rubber: '#090b0c',
  orange: '#fb8436',
  silver: '#8d969a',
  battery: '#252b2d',
}

function PartGroup({
  id,
  selected,
  onSelect,
  children,
}: {
  id: SubsystemId
  selected: boolean
  onSelect: (id: SubsystemId) => void
  children: React.ReactNode
}) {
  const handleClick = (event: ThreeEvent<MouseEvent>) => {
    event.stopPropagation()
    onSelect(id)
  }

  return (
    <group onClick={handleClick}>
      {children}
      {selected && (
        <pointLight position={[0, 1.2, 0]} color={palette.orange} intensity={8} distance={3.2} decay={2} />
      )}
    </group>
  )
}

function Wheel({ position, active }: { position: [number, number, number]; active: boolean }) {
  const tread = useMemo(() => {
    return Array.from({ length: 14 }, (_, index) => {
      const angle = (index / 14) * Math.PI * 2
      return { angle, y: Math.cos(angle) * 0.86, x: Math.sin(angle) * 0.86 }
    })
  }, [])

  return (
    <group position={position}>
      <mesh rotation={[Math.PI / 2, 0, 0]} castShadow>
        <cylinderGeometry args={[1, 1, 0.52, 32]} />
        <meshStandardMaterial color={active ? '#332118' : palette.rubber} roughness={0.94} emissive={active ? palette.orange : '#000000'} emissiveIntensity={active ? 0.18 : 0} />
      </mesh>
      <mesh rotation={[Math.PI / 2, 0, 0]} castShadow>
        <cylinderGeometry args={[0.53, 0.53, 0.56, 20]} />
        <meshStandardMaterial color={active ? palette.orange : '#252a2d'} metalness={0.72} roughness={0.34} />
      </mesh>
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.32, 0.06, 10, 24]} />
        <meshStandardMaterial color={palette.silver} metalness={0.85} roughness={0.25} />
      </mesh>
      {tread.map((block, index) => (
        <mesh key={index} position={[block.x, block.y, 0]} rotation={[0, 0, -block.angle]} castShadow>
          <boxGeometry args={[0.28, 0.13, 0.6]} />
          <meshStandardMaterial color="#0d0f10" roughness={1} />
        </mesh>
      ))}
    </group>
  )
}

function Shock({ position, active, removed }: { position: [number, number, number]; active: boolean; removed?: boolean }) {
  if (removed) return null
  const color = active ? palette.orange : '#717a7f'
  return (
    <group position={position} rotation={[0, 0, position[0] > 0 ? -0.13 : 0.13]}>
      <mesh castShadow>
        <cylinderGeometry args={[0.14, 0.17, 1.3, 18]} />
        <meshStandardMaterial color={color} metalness={0.75} roughness={0.24} emissive={active ? palette.orange : '#000000'} emissiveIntensity={active ? 0.36 : 0} />
      </mesh>
      <mesh position={[0, 0.92, 0]} castShadow>
        <cylinderGeometry args={[0.08, 0.08, 0.62, 14]} />
        <meshStandardMaterial color={palette.silver} metalness={0.9} roughness={0.18} />
      </mesh>
      {Array.from({ length: 8 }, (_, index) => (
        <mesh key={index} position={[0, -0.42 + index * 0.13, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[0.22, 0.026, 7, 20]} />
          <meshStandardMaterial color={color} metalness={0.72} roughness={0.28} />
        </mesh>
      ))}
    </group>
  )
}

function Chassis({ selected, partRemoved, onSelect }: Omit<SceneProps, 'bodyVisible'>) {
  const active = selected === 'chassis'
  return (
    <PartGroup id="chassis" selected={active} onSelect={onSelect}>
      <group visible={!partRemoved || !active}>
        {[-0.72, 0.72].map((z) => (
          <RoundedBox key={z} args={[6.4, 0.2, 0.22]} radius={0.06} smoothness={3} position={[0, 0.66, z]} castShadow>
            <meshStandardMaterial color={active ? palette.orange : palette.steel} metalness={0.78} roughness={0.35} emissive={active ? palette.orange : '#000000'} emissiveIntensity={active ? 0.2 : 0} />
          </RoundedBox>
        ))}
        {[-2.65, -1.3, 0, 1.3, 2.65].map((x) => (
          <RoundedBox key={x} args={[0.22, 0.18, 1.62]} radius={0.04} smoothness={2} position={[x, 0.68, 0]} castShadow>
            <meshStandardMaterial color={palette.steelLight} metalness={0.75} roughness={0.35} />
          </RoundedBox>
        ))}
        <mesh position={[0, 0.54, 0]} castShadow>
          <boxGeometry args={[2.1, 0.12, 1.2]} />
          <meshStandardMaterial color="#202527" metalness={0.45} roughness={0.5} />
        </mesh>
      </group>
    </PartGroup>
  )
}

function Suspension({ selected, partRemoved, onSelect }: Omit<SceneProps, 'bodyVisible'>) {
  const active = selected === 'suspension'
  return (
    <PartGroup id="suspension" selected={active} onSelect={onSelect}>
      {[-2.34, 2.34].map((x) => (
        <group key={x}>
          <mesh position={[x, 0.48, 0]} rotation={[Math.PI / 2, 0, 0]} castShadow>
            <cylinderGeometry args={[0.17, 0.17, 3.05, 18]} />
            <meshStandardMaterial color={active ? '#8f542f' : palette.steelLight} metalness={0.8} roughness={0.28} />
          </mesh>
          <mesh position={[x, 0.48, 0]} rotation={[0, 0, Math.PI / 2]} castShadow>
            <cylinderGeometry args={[0.32, 0.32, 1.28, 20]} />
            <meshStandardMaterial color="#252a2d" metalness={0.82} roughness={0.3} />
          </mesh>
          <Shock position={[x, 1.22, 0.72]} active={active && x < 0} removed={active && partRemoved && x < 0} />
          <Shock position={[x, 1.22, -0.72]} active={active && x < 0} />
        </group>
      ))}
      {[[-2.25, 0.72], [-2.25, -0.72], [2.25, 0.72], [2.25, -0.72]].map(([x, z], index) => (
        <mesh key={index} position={[x * 0.56, 0.48, z * 0.7]} rotation={[0, 0, x > 0 ? 0.42 : -0.42]} castShadow>
          <boxGeometry args={[2.2, 0.09, 0.1]} />
          <meshStandardMaterial color="#4b5256" metalness={0.82} roughness={0.28} />
        </mesh>
      ))}
    </PartGroup>
  )
}

function Transmission({ selected, partRemoved, onSelect }: Omit<SceneProps, 'bodyVisible'>) {
  const active = selected === 'transmission'
  return (
    <PartGroup id="transmission" selected={active} onSelect={onSelect}>
      <group visible={!partRemoved || !active}>
        <mesh position={[-0.4, 0.98, 0]} rotation={[0, 0, Math.PI / 2]} castShadow>
          <cylinderGeometry args={[0.43, 0.43, 1.38, 28]} />
          <meshStandardMaterial color={active ? palette.orange : '#8d9293'} metalness={0.88} roughness={0.23} emissive={active ? palette.orange : '#000000'} emissiveIntensity={active ? 0.22 : 0} />
        </mesh>
        <RoundedBox args={[0.82, 0.68, 0.74]} radius={0.12} smoothness={3} position={[0.58, 0.9, 0]} castShadow>
          <meshStandardMaterial color="#4f5659" metalness={0.84} roughness={0.28} />
        </RoundedBox>
        {[-1.52, 1.63].map((x) => (
          <mesh key={x} position={[x, 0.72, 0]} rotation={[0, 0, Math.PI / 2]} castShadow>
            <cylinderGeometry args={[0.08, 0.08, 2.2, 12]} />
            <meshStandardMaterial color={palette.silver} metalness={0.92} roughness={0.18} />
          </mesh>
        ))}
      </group>
    </PartGroup>
  )
}

function Electronics({ selected, partRemoved, onSelect }: Omit<SceneProps, 'bodyVisible'>) {
  const active = selected === 'electronics'
  return (
    <PartGroup id="electronics" selected={active} onSelect={onSelect}>
      <group visible={!partRemoved || !active}>
        <RoundedBox args={[1.92, 0.55, 0.82]} radius={0.14} smoothness={3} position={[1.25, 1.18, 0]} castShadow>
          <meshStandardMaterial color={active ? '#5b321d' : palette.battery} roughness={0.63} emissive={active ? palette.orange : '#000000'} emissiveIntensity={active ? 0.22 : 0} />
        </RoundedBox>
        <RoundedBox args={[0.74, 0.42, 0.72]} radius={0.1} smoothness={3} position={[-1.7, 1.17, -0.05]} castShadow>
          <meshStandardMaterial color="#202628" roughness={0.5} />
        </RoundedBox>
        <mesh position={[-1.12, 1.37, 0]} rotation={[0, 0, -0.42]}>
          <torusGeometry args={[0.55, 0.025, 8, 28, Math.PI]} />
          <meshStandardMaterial color={palette.orange} emissive={palette.orange} emissiveIntensity={0.2} />
        </mesh>
      </group>
    </PartGroup>
  )
}

function Wheels({ selected, partRemoved, onSelect }: Omit<SceneProps, 'bodyVisible'>) {
  const active = selected === 'wheels'
  return (
    <PartGroup id="wheels" selected={active} onSelect={onSelect}>
      {[
        [-2.45, 0.52, 1.12],
        [-2.45, 0.52, -1.12],
        [2.45, 0.52, 1.12],
        [2.45, 0.52, -1.12],
      ].map((position, index) => (
        <group key={index} visible={!partRemoved || !active || index !== 0}>
          <Wheel position={position as [number, number, number]} active={active && index === 0} />
        </group>
      ))}
    </PartGroup>
  )
}

function Body({ selected, bodyVisible, partRemoved, onSelect }: SceneProps) {
  const active = selected === 'body'
  if (!bodyVisible || (active && partRemoved)) return null
  return (
    <PartGroup id="body" selected={active} onSelect={onSelect}>
      <group position={[0.18, 2.15, 0]}>
        <RoundedBox args={[5.62, 0.78, 1.88]} radius={0.18} smoothness={4} castShadow>
          <meshStandardMaterial color={active ? '#704024' : '#555d61'} metalness={0.66} roughness={0.32} emissive={active ? palette.orange : '#000000'} emissiveIntensity={active ? 0.16 : 0} />
        </RoundedBox>
        <RoundedBox args={[2.92, 1.45, 1.82]} radius={0.16} smoothness={4} position={[0.45, 0.98, 0]} castShadow>
          <meshStandardMaterial color={active ? '#704024' : '#4c5458'} metalness={0.62} roughness={0.31} />
        </RoundedBox>
        <RoundedBox args={[1.05, 1.02, 1.86]} radius={0.13} smoothness={4} position={[-1.72, 0.72, 0]} castShadow>
          <meshStandardMaterial color="#465054" metalness={0.56} roughness={0.38} />
        </RoundedBox>
        {[[-0.15, 1.04], [1.1, 1.04], [-0.15, -1.04], [1.1, -1.04]].map(([x, z], index) => (
          <mesh key={index} position={[x, 1.03, z]} rotation={[0, 0, 0]}>
            <planeGeometry args={[0.9, 0.62]} />
            <meshStandardMaterial color="#0a1013" metalness={0.26} roughness={0.18} transparent opacity={0.88} />
          </mesh>
        ))}
        <mesh position={[0.38, 1.82, 0]} castShadow>
          <boxGeometry args={[3.18, 0.09, 1.74]} />
          <meshStandardMaterial color="#202527" metalness={0.82} roughness={0.32} />
        </mesh>
      </group>
    </PartGroup>
  )
}

function Vehicle(props: SceneProps) {
  return (
    <group position={[0, -0.95, 0]} rotation={[0.02, -0.2, 0]}>
      <Chassis selected={props.selected} partRemoved={props.partRemoved} onSelect={props.onSelect} />
      <Suspension selected={props.selected} partRemoved={props.partRemoved} onSelect={props.onSelect} />
      <Transmission selected={props.selected} partRemoved={props.partRemoved} onSelect={props.onSelect} />
      <Electronics selected={props.selected} partRemoved={props.partRemoved} onSelect={props.onSelect} />
      <Wheels selected={props.selected} partRemoved={props.partRemoved} onSelect={props.onSelect} />
      <Body {...props} />
    </group>
  )
}

export function VehicleScene(props: SceneProps) {
  return (
    <Canvas
      shadows
      dpr={[1, 1.6]}
      camera={{ position: [8.4, 4.4, 8.7], fov: 38, near: 0.1, far: 100 }}
      aria-label="Интерактивная трёхмерная модель RC автомобиля MN 128"
      onPointerMissed={() => undefined}
    >
      <color attach="background" args={['#151a1c']} />
      <fog attach="fog" args={['#151a1c', 12, 25]} />
      <ambientLight intensity={1.65} />
      <directionalLight position={[5, 8, 6]} intensity={4.2} color="#f3f6f6" castShadow shadow-mapSize-width={1024} shadow-mapSize-height={1024} />
      <directionalLight position={[-6, 3, -5]} intensity={2.1} color="#86939a" />
      <Suspense fallback={null}>
        <Vehicle {...props} />
        <ContactShadows position={[0, -1.46, 0]} opacity={0.48} scale={13} blur={2.6} far={5} />
      </Suspense>
      <gridHelper args={[30, 60, new THREE.Color('#333a3d'), new THREE.Color('#242a2c')]} position={[0, -1.44, 0]} />
      <OrbitControls makeDefault target={[0, 0.45, 0]} minDistance={6} maxDistance={17} minPolarAngle={0.55} maxPolarAngle={Math.PI / 2.08} enablePan={false} />
    </Canvas>
  )
}
