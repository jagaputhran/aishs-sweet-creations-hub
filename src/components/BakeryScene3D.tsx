import { useRef, useEffect, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, Environment } from '@react-three/drei';
import * as THREE from 'three';
import { useMotionValue, useSpring } from 'framer-motion';
import { motion, AnimatePresence } from 'framer-motion';

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

// Cake 3D Model Component with Customization
const Cake = ({ 
  position, 
  scale = 1,
  bottomColor = "#F4A460",
  middleColor = "#FFE4E1",
  topColor = "#FFB6C1",
  berryColor = "#FF1493"
}: { 
  position: [number, number, number], 
  scale?: number,
  bottomColor?: string,
  middleColor?: string,
  topColor?: string,
  berryColor?: string
}) => {
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
          color={bottomColor}
          roughness={0.3}
          metalness={0.2}
          emissive={bottomColor}
          emissiveIntensity={hovered ? 0.3 : 0.1}
        />
      </mesh>
      
      {/* Middle layer */}
      <mesh position={[0, 0.5, 0]} castShadow>
        <cylinderGeometry args={[0.8, 0.8, 0.4, 32]} />
        <meshStandardMaterial 
          color={middleColor}
          roughness={0.2}
          metalness={0.3}
          emissive={middleColor}
          emissiveIntensity={hovered ? 0.3 : 0.1}
        />
      </mesh>
      
      {/* Top layer */}
      <mesh position={[0, 1, 0]} castShadow>
        <cylinderGeometry args={[0.6, 0.6, 0.4, 32]} />
        <meshStandardMaterial 
          color={topColor}
          roughness={0.2}
          metalness={0.3}
          emissive={topColor}
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
            color={berryColor}
            metalness={0.7}
            roughness={0.1}
            emissive={berryColor}
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

// Donut Component
const Donut = ({ position, scale = 1 }: { position: [number, number, number], scale?: number }) => {
  const meshRef = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState(false);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.01;
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 2) * 0.05;
    }
  });

  return (
    <group 
      ref={meshRef} 
      position={position}
      scale={hovered ? scale * 1.15 : scale}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      {/* Donut base */}
      <mesh castShadow>
        <torusGeometry args={[0.4, 0.2, 16, 32]} />
        <meshStandardMaterial 
          color="#F5DEB3"
          roughness={0.4}
          metalness={0.1}
        />
      </mesh>
      {/* Icing */}
      <mesh position={[0, 0.1, 0]} castShadow>
        <torusGeometry args={[0.4, 0.15, 16, 32, Math.PI]} />
        <meshStandardMaterial 
          color={hovered ? "#FF69B4" : "#FFB6C1"}
          roughness={0.1}
          metalness={0.4}
          emissive="#FF69B4"
          emissiveIntensity={hovered ? 0.3 : 0.1}
        />
      </mesh>
      {/* Sprinkles */}
      {[...Array(12)].map((_, i) => (
        <mesh 
          key={i}
          position={[
            Math.cos((i * Math.PI * 2) / 12) * 0.4,
            0.15,
            Math.sin((i * Math.PI * 2) / 12) * 0.4
          ]}
          rotation={[Math.random() * Math.PI, Math.random() * Math.PI, Math.random() * Math.PI]}
        >
          <cylinderGeometry args={[0.01, 0.01, 0.08, 8]} />
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

// Cookie Component
const Cookie = ({ position, scale = 1 }: { position: [number, number, number], scale?: number }) => {
  const meshRef = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState(false);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += hovered ? 0.02 : 0.005;
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 1.5) * 0.03;
    }
  });

  return (
    <group 
      ref={meshRef} 
      position={position}
      scale={hovered ? scale * 1.1 : scale}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      {/* Cookie base */}
      <mesh castShadow>
        <cylinderGeometry args={[0.3, 0.3, 0.1, 32]} />
        <meshStandardMaterial 
          color="#D2691E"
          roughness={0.7}
          metalness={0.1}
        />
      </mesh>
      {/* Chocolate chips */}
      {[...Array(8)].map((_, i) => (
        <mesh 
          key={i}
          position={[
            Math.cos((i * Math.PI * 2) / 8) * 0.15,
            0.06,
            Math.sin((i * Math.PI * 2) / 8) * 0.15
          ]}
          castShadow
        >
          <sphereGeometry args={[0.03, 8, 8]} />
          <meshStandardMaterial 
            color="#3E2723"
            roughness={0.3}
            metalness={0.2}
          />
        </mesh>
      ))}
    </group>
  );
};

// Whisk Component
const Whisk = ({ position }: { position: [number, number, number] }) => {
  const meshRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.015;
      meshRef.current.rotation.z = Math.sin(state.clock.elapsedTime) * 0.1;
    }
  });

  return (
    <group ref={meshRef} position={position}>
      {/* Handle */}
      <mesh position={[0, 0.5, 0]} castShadow>
        <cylinderGeometry args={[0.04, 0.04, 1, 8]} />
        <meshStandardMaterial color="#8B4513" roughness={0.6} />
      </mesh>
      {/* Wires */}
      {[...Array(8)].map((_, i) => {
        const angle = (i * Math.PI * 2) / 8;
        return (
          <mesh 
            key={i}
            position={[
              Math.cos(angle) * 0.15,
              -0.3,
              Math.sin(angle) * 0.15
            ]}
            rotation={[0, 0, Math.PI / 6]}
            castShadow
          >
            <cylinderGeometry args={[0.01, 0.01, 0.8, 8]} />
            <meshStandardMaterial color="#C0C0C0" roughness={0.3} metalness={0.8} />
          </mesh>
        );
      })}
    </group>
  );
};

// Particle System
const ParticleSystem = () => {
  const particlesRef = useRef<THREE.Points>(null);
  const particleCount = 100;

  const particles = new Float32Array(particleCount * 3);
  const velocities = new Float32Array(particleCount * 3);

  for (let i = 0; i < particleCount * 3; i += 3) {
    particles[i] = (Math.random() - 0.5) * 10;
    particles[i + 1] = Math.random() * 5;
    particles[i + 2] = (Math.random() - 0.5) * 10;
    
    velocities[i] = (Math.random() - 0.5) * 0.02;
    velocities[i + 1] = Math.random() * 0.02 + 0.01;
    velocities[i + 2] = (Math.random() - 0.5) * 0.02;
  }

  useFrame(() => {
    if (particlesRef.current) {
      const positions = particlesRef.current.geometry.attributes.position.array as Float32Array;
      
      for (let i = 0; i < particleCount * 3; i += 3) {
        positions[i] += velocities[i];
        positions[i + 1] += velocities[i + 1];
        positions[i + 2] += velocities[i + 2];

        if (positions[i + 1] > 5) {
          positions[i + 1] = 0;
          positions[i] = (Math.random() - 0.5) * 10;
          positions[i + 2] = (Math.random() - 0.5) * 10;
        }
      }
      
      particlesRef.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particleCount}
          array={particles}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.05}
        color="#FFFFFF"
        transparent
        opacity={0.6}
        sizeAttenuation
      />
    </points>
  );
};

// Main Scene Component
const Scene = ({ 
  mouseX, 
  mouseY,
  bottomColor,
  middleColor,
  topColor,
  berryColor
}: { 
  mouseX: any, 
  mouseY: any,
  bottomColor: string,
  middleColor: string,
  topColor: string,
  berryColor: string
}) => {
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
      {/* Particle effects */}
      <ParticleSystem />
      
      {/* Main centerpiece - Large Cake */}
      <Cake 
        position={[0, -0.5, 0]} 
        scale={1.5}
        bottomColor={bottomColor}
        middleColor={middleColor}
        topColor={topColor}
        berryColor={berryColor}
      />
      
      {/* Surrounding cupcakes */}
      <Cupcake position={[-3, -0.5, 1]} scale={0.8} />
      <Cupcake position={[3, -0.5, 1]} scale={0.8} />
      <Cupcake position={[-2, -0.5, -2]} scale={0.7} />
      <Cupcake position={[2.5, -0.5, -2]} scale={0.7} />
      
      {/* Donuts */}
      <Donut position={[-3.5, 0, -1]} scale={0.9} />
      <Donut position={[3.5, 0.5, -0.5]} scale={0.8} />
      
      {/* Cookies */}
      <Cookie position={[-2.5, -0.3, 2]} scale={1.1} />
      <Cookie position={[2, -0.2, 2.5]} scale={1} />
      
      {/* Rolling Pin */}
      <RollingPin position={[0, 1.5, -1]} />
      
      {/* Whisk */}
      <Whisk position={[-1.5, 1, -2]} />
      
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
  
  const [bottomColor, setBottomColor] = useState("#F4A460");
  const [middleColor, setMiddleColor] = useState("#FFE4E1");
  const [topColor, setTopColor] = useState("#FFB6C1");
  const [berryColor, setBerryColor] = useState("#FF1493");
  const [showCustomizer, setShowCustomizer] = useState(false);
  
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

  const presetColors = [
    { name: "Classic Pink", bottom: "#F4A460", middle: "#FFE4E1", top: "#FFB6C1", berry: "#FF1493" },
    { name: "Chocolate Dream", bottom: "#8B4513", middle: "#D2691E", top: "#A0522D", berry: "#FFFFFF" },
    { name: "Mint Fresh", bottom: "#98FB98", middle: "#E0FFE0", top: "#90EE90", berry: "#FF69B4" },
    { name: "Lavender Bliss", bottom: "#E6E6FA", middle: "#F0E6FF", top: "#DDA0DD", berry: "#9370DB" },
    { name: "Sunset Orange", bottom: "#FF8C00", middle: "#FFD700", top: "#FFA500", berry: "#FF4500" },
  ];

  return (
    <div className="w-full h-full relative">
      <Canvas shadows>
        <PerspectiveCamera makeDefault position={[0, 2, 8]} fov={50} />
        <Scene 
          mouseX={mouseXSpring} 
          mouseY={mouseYSpring}
          bottomColor={bottomColor}
          middleColor={middleColor}
          topColor={topColor}
          berryColor={berryColor}
        />
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
