import { useRef, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, Environment } from '@react-three/drei';
import * as THREE from 'three';
import { useMotionValue, useSpring } from 'framer-motion';

// Cupcake 3D Model Component
const Cupcake = ({ position, scale = 1 }: { position: [number, number, number], scale?: number }) => {
  const meshRef = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState(false);
  const [clicked, setClicked] = useState(false);

  useFrame((state) => {
    if (meshRef.current) {
      // Gentle rotation
      meshRef.current.rotation.y += 0.008;
      
      // Hover effect - bounce
      if (hovered) {
        meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 3) * 0.1;
        meshRef.current.rotation.y += 0.03;
      } else {
        meshRef.current.position.y = position[1];
      }
      
      // Click effect - spin
      if (clicked) {
        meshRef.current.rotation.y += 0.1;
      }
    }
  });

  const handleClick = () => {
    setClicked(true);
    setTimeout(() => setClicked(false), 1000);
  };

  return (
    <group 
      ref={meshRef} 
      position={position}
      scale={hovered ? scale * 1.2 : scale}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
      onClick={handleClick}
    >
      {/* Cupcake wrapper/base */}
      <mesh position={[0, 0, 0]} castShadow>
        <cylinderGeometry args={[0.5, 0.3, 0.6, 32]} />
        <meshStandardMaterial 
          color={hovered ? "#FF69B4" : "#FFB6C1"}
          roughness={0.2}
          metalness={0.3}
          emissive={hovered ? "#FF1493" : "#000000"}
          emissiveIntensity={hovered ? 0.3 : 0}
        />
      </mesh>
      
      {/* Frosting top */}
      <mesh position={[0, 0.5, 0]} castShadow>
        <sphereGeometry args={[0.45, 32, 32, 0, Math.PI * 2, 0, Math.PI / 2]} />
        <meshStandardMaterial 
          color={hovered ? "#FFE4E1" : "#FFF0F5"}
          roughness={0.1}
          metalness={0.4}
          emissive={hovered ? "#FFB6C1" : "#000000"}
          emissiveIntensity={hovered ? 0.2 : 0}
        />
      </mesh>
      
      {/* Cherry on top */}
      <mesh position={[0, 0.8, 0]} castShadow>
        <sphereGeometry args={[0.1, 16, 16]} />
        <meshStandardMaterial 
          color="#FF1493"
          roughness={0.05}
          metalness={0.6}
          emissive="#FF69B4"
          emissiveIntensity={0.5}
        />
      </mesh>
      
      {/* Sprinkles */}
      {[...Array(8)].map((_, i) => (
        <mesh 
          key={i}
          position={[
            Math.cos((i * Math.PI * 2) / 8) * 0.3,
            0.4 + Math.random() * 0.2,
            Math.sin((i * Math.PI * 2) / 8) * 0.3
          ]}
          rotation={[Math.random() * Math.PI, Math.random() * Math.PI, Math.random() * Math.PI]}
        >
          <cylinderGeometry args={[0.02, 0.02, 0.1, 8]} />
          <meshStandardMaterial 
            color={['#FF6B9D', '#FFD93D', '#6BCB77', '#4D96FF'][Math.floor(Math.random() * 4)]}
            metalness={0.8}
            roughness={0.2}
          />
        </mesh>
      ))}
    </group>
  );
};

// Cake 3D Model Component
const Cake = ({ position, scale = 1 }: { position: [number, number, number], scale?: number }) => {
  const meshRef = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState(false);
  const [clicked, setClicked] = useState(false);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += hovered ? 0.01 : 0.005;
      
      // Floating animation
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 0.5) * 0.08;
      
      // Click effect
      if (clicked) {
        meshRef.current.rotation.y += 0.05;
      }
    }
  });

  const handleClick = () => {
    setClicked(true);
    setTimeout(() => setClicked(false), 1500);
  };

  return (
    <group 
      ref={meshRef} 
      position={position} 
      scale={hovered ? scale * 1.1 : scale}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
      onClick={handleClick}
    >
      {/* Bottom layer */}
      <mesh position={[0, 0, 0]} castShadow>
        <cylinderGeometry args={[1, 1, 0.4, 32]} />
        <meshStandardMaterial 
          color="#F4A460"
          roughness={0.3}
          metalness={0.2}
          emissive="#D2691E"
          emissiveIntensity={hovered ? 0.3 : 0.1}
        />
      </mesh>
      
      {/* Middle layer */}
      <mesh position={[0, 0.5, 0]} castShadow>
        <cylinderGeometry args={[0.8, 0.8, 0.4, 32]} />
        <meshStandardMaterial 
          color="#FFE4E1"
          roughness={0.2}
          metalness={0.3}
          emissive="#FFB6C1"
          emissiveIntensity={hovered ? 0.3 : 0.1}
        />
      </mesh>
      
      {/* Top layer */}
      <mesh position={[0, 1, 0]} castShadow>
        <cylinderGeometry args={[0.6, 0.6, 0.4, 32]} />
        <meshStandardMaterial 
          color="#FFB6C1"
          roughness={0.2}
          metalness={0.3}
          emissive="#FF69B4"
          emissiveIntensity={hovered ? 0.4 : 0.1}
        />
      </mesh>
      
      {/* Decorative berries */}
      {[0, 72, 144, 216, 288].map((angle, i) => (
        <mesh 
          key={i}
          position={[
            Math.cos((angle * Math.PI) / 180) * 0.7,
            1.3,
            Math.sin((angle * Math.PI) / 180) * 0.7
          ]}
          castShadow
        >
          <sphereGeometry args={[0.08, 16, 16]} />
          <meshStandardMaterial 
            color="#FF1493"
            metalness={0.7}
            roughness={0.1}
            emissive="#FF69B4"
            emissiveIntensity={0.5}
          />
        </mesh>
      ))}
      
      {/* Candles */}
      {[0, 120, 240].map((angle, i) => (
        <group
          key={`candle-${i}`}
          position={[
            Math.cos((angle * Math.PI) / 180) * 0.4,
            1.3,
            Math.sin((angle * Math.PI) / 180) * 0.4
          ]}
        >
          <mesh castShadow>
            <cylinderGeometry args={[0.03, 0.03, 0.3, 16]} />
            <meshStandardMaterial color="#FFF8DC" roughness={0.4} />
          </mesh>
          <mesh position={[0, 0.18, 0]}>
            <sphereGeometry args={[0.04, 16, 16]} />
            <meshStandardMaterial 
              color="#FFD700"
              emissive="#FFA500"
              emissiveIntensity={1}
            />
          </mesh>
        </group>
      ))}
    </group>
  );
};

// Rolling Pin Component
const RollingPin = ({ position }: { position: [number, number, number] }) => {
  const meshRef = useRef<THREE.Group>(null);

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.z += 0.01;
    }
  });

  return (
    <group ref={meshRef} position={position} rotation={[0, 0, Math.PI / 4]}>
      <mesh castShadow>
        <cylinderGeometry args={[0.1, 0.1, 2, 16]} />
        <meshStandardMaterial color="#D2691E" roughness={0.6} />
      </mesh>
      <mesh position={[-1.1, 0, 0]} castShadow>
        <sphereGeometry args={[0.12, 16, 16]} />
        <meshStandardMaterial color="#8B4513" roughness={0.5} />
      </mesh>
      <mesh position={[1.1, 0, 0]} castShadow>
        <sphereGeometry args={[0.12, 16, 16]} />
        <meshStandardMaterial color="#8B4513" roughness={0.5} />
      </mesh>
    </group>
  );
};

// Main Scene Component
const Scene = ({ mouseX, mouseY }: { mouseX: any, mouseY: any }) => {
  const groupRef = useRef<THREE.Group>(null);

  useFrame(() => {
    if (groupRef.current) {
      // Mouse parallax effect
      groupRef.current.rotation.y = mouseX.get() * 0.3;
      groupRef.current.rotation.x = mouseY.get() * 0.2;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Main centerpiece - Large Cake */}
      <Cake position={[0, -0.5, 0]} scale={1.5} />
      
      {/* Surrounding cupcakes */}
      <Cupcake position={[-3, -0.5, 1]} scale={0.8} />
      <Cupcake position={[3, -0.5, 1]} scale={0.8} />
      <Cupcake position={[-2, -0.5, -2]} scale={0.7} />
      <Cupcake position={[2.5, -0.5, -2]} scale={0.7} />
      
      {/* Rolling Pin */}
      <RollingPin position={[0, 1.5, -1]} />
      
      {/* Enhanced Lighting */}
      <ambientLight intensity={0.8} />
      <directionalLight 
        position={[5, 5, 5]} 
        intensity={1.2} 
        castShadow 
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
      />
      <pointLight position={[-5, 5, 0]} intensity={0.8} color="#FFB6C1" />
      <pointLight position={[5, -5, 0]} intensity={0.6} color="#FFF0F5" />
      <pointLight position={[0, 3, 3]} intensity={0.5} color="#FFD700" />
      <spotLight 
        position={[0, 8, 0]} 
        intensity={0.7} 
        angle={0.6} 
        penumbra={1} 
        color="#FFFFFF"
        castShadow
      />
      
      {/* Ground plane for shadows */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.5, 0]} receiveShadow>
        <planeGeometry args={[20, 20]} />
        <shadowMaterial opacity={0.2} />
      </mesh>
    </group>
  );
};

// Main Export Component
const BakeryScene3D = () => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  const springConfig = { damping: 30, stiffness: 200 };
  const mouseXSpring = useSpring(mouseX, springConfig);
  const mouseYSpring = useSpring(mouseY, springConfig);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = -(e.clientY / window.innerHeight) * 2 + 1;
      mouseX.set(x);
      mouseY.set(y);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <div className="w-full h-full">
      <Canvas shadows>
        <PerspectiveCamera makeDefault position={[0, 2, 8]} fov={50} />
        <Scene mouseX={mouseXSpring} mouseY={mouseYSpring} />
        <Environment preset="sunset" />
        <OrbitControls 
          enableZoom={false} 
          enablePan={false}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 3}
        />
      </Canvas>
    </div>
  );
};

export default BakeryScene3D;

// Add missing import
import { useState } from 'react';
