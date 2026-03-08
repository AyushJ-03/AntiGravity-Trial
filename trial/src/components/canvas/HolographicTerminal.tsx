"use client";

import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Float, MeshDistortMaterial, Stars } from '@react-three/drei';
import * as THREE from 'three';

function HolographicTerminalGroup() {
  const terminalRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (terminalRef.current) {
      terminalRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
      terminalRef.current.position.y = Math.sin(state.clock.elapsedTime) * 0.1;
    }
  });

  return (
    <group ref={terminalRef}>
      {/* Central Terminal Panel (Conceptual) */}
      <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
        <mesh position={[0, 0, 0]}>
          <boxGeometry args={[4, 2.5, 0.1]} />
          <MeshDistortMaterial
            color="#00f3ff"
            speed={2}
            distort={0.1}
            radius={1}
            transparent
            opacity={0.3}
            wireframe
          />
        </mesh>
      </Float>

      {/* Glowy particles representing 'code flows' */}
      <Particles count={150} />
    </group>
  );
}

function Particles({ count }: { count: number }) {
  const mesh = useRef<THREE.Points>(null);

  const particles = useMemo(() => {
    const temp = [];
    for (let i = 0; i < count; i++) {
      const x = (Math.random() - 0.5) * 10;
      const y = (Math.random() - 0.5) * 10;
      const z = (Math.random() - 0.5) * 10;
      temp.push(x, y, z);
    }
    return new Float32Array(temp);
  }, [count]);

  useFrame((state) => {
    if (mesh.current) {
      mesh.current.rotation.y -= 0.002;
      mesh.current.rotation.x += 0.001;
    }
  });

  return (
    <points ref={mesh}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[particles, 3]}
          count={particles.length / 3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.03}
        color="#00f3ff"
        transparent
        opacity={0.6}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

export default function HolographicTerminalView() {
  return (
    <div className="fixed inset-0 w-full h-full pointer-events-none">
      <Canvas camera={{ position: [0, 0, 6], fov: 45 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} color="#00f3ff" />
        <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
        <HolographicTerminalGroup />
        <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.5} />
      </Canvas>
    </div>
  );
}
