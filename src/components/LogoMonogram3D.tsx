"use client";

import React, { useRef, useEffect, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Center } from "@react-three/drei";
import * as THREE from "three";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// Monogram Monolith Shapes Component
function MonogramModel() {
  const groupRef = useRef<THREE.Group | null>(null);

  // Define L shape
  const lShape = useMemo(() => {
    const shape = new THREE.Shape();
    // Top serif
    shape.moveTo(-0.35, 1.2);
    shape.lineTo(0.35, 1.2);
    shape.lineTo(0.35, 1.05);
    shape.lineTo(0.12, 1.05); // stem inset
    shape.lineTo(0.12, -0.85); // down stem
    shape.lineTo(0.8, -0.85); // out to L foot
    shape.lineTo(0.8, -0.55); // foot serif top
    shape.lineTo(0.95, -0.55);
    shape.lineTo(0.95, -1.2); // foot bottom
    shape.lineTo(-0.35, -1.2); // left bottom serif
    shape.lineTo(-0.35, -0.85);
    shape.lineTo(-0.12, -0.85);
    shape.lineTo(-0.12, 1.05);
    shape.lineTo(-0.35, 1.05);
    shape.closePath();
    return shape;
  }, []);

  // Define S shape (flowing ribbon)
  const sShape = useMemo(() => {
    const shape = new THREE.Shape();
    // Flowing S shapes overlapping the bottom L foot
    shape.moveTo(-0.9, -1.3);
    shape.quadraticCurveTo(-1.2, -1.9, 0.0, -1.9); // bottom curve
    shape.quadraticCurveTo(1.2, -1.9, 0.9, -1.3); // bottom right
    shape.quadraticCurveTo(0.75, -0.8, 0.0, -0.8); // middle
    shape.quadraticCurveTo(-0.75, -0.8, -0.9, -0.3); // upper left
    shape.quadraticCurveTo(-1.0, 0.3, 0.0, 0.3); // top loop
    shape.quadraticCurveTo(0.8, 0.3, 0.6, -0.1);
    shape.lineTo(0.8, -0.1);
    shape.quadraticCurveTo(1.0, 0.6, 0.0, 0.6);
    shape.quadraticCurveTo(-1.2, 0.6, -1.2, -0.3);
    shape.quadraticCurveTo(-1.2, -1.1, -0.1, -1.1);
    shape.quadraticCurveTo(0.6, -1.1, 0.7, -1.4);
    shape.quadraticCurveTo(0.8, -1.6, 0.0, -1.6);
    shape.quadraticCurveTo(-0.6, -1.6, -0.7, -1.3);
    shape.closePath();
    return shape;
  }, []);

  const extrudeSettings = useMemo(() => ({
    depth: 0.15,
    bevelEnabled: true,
    bevelSegments: 6,
    steps: 2,
    bevelSize: 0.02,
    bevelThickness: 0.02,
  }), []);

  // Sync scroll-dolly & rotation using GSAP ScrollTrigger
  useEffect(() => {
    const group = groupRef.current;
    if (!group) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: "#hero-section",
        start: "top top",
        end: () => `+=${window.innerHeight * 3.5}`,
        scrub: 0.1,
      },
    });

    // Dolly back and rotate as user scrolls down the page
    tl.to(group.position, {
      z: -12, // Recede deep into camera frustum
      y: -1.2,
      ease: "none",
    }, 0);

    tl.to(group.rotation, {
      y: Math.PI * 4, // Spin 720 degrees
      z: -0.4, // Slight tilt
      ease: "none",
    }, 0);

    return () => {
      tl.kill();
    };
  }, []);

  // Mouse Parallax for interactive tilt
  useFrame((state) => {
    const group = groupRef.current;
    if (!group) return;

    // Normalizing mouse position pointer coordinates (-1 to 1)
    const targetRotationY = (state.pointer.x * Math.PI) / 6; // max 30 deg yaw
    const targetRotationX = (-state.pointer.y * Math.PI) / 6; // max 30 deg pitch

    // Apply smooth interpolation (lerping)
    group.rotation.y = THREE.MathUtils.lerp(group.rotation.y, targetRotationY + (group.rotation.y % (Math.PI * 2)), 0.08);
    group.rotation.x = THREE.MathUtils.lerp(group.rotation.x, targetRotationX, 0.08);
  });

  return (
    <group ref={groupRef}>
      <Center>
        {/* L Column Mesh */}
        <mesh castShadow receiveShadow position={[-0.3, 0.2, 0]}>
          <extrudeGeometry args={[lShape, extrudeSettings]} />
          <meshPhysicalMaterial
            color="#D4AF37"
            metalness={0.98}
            roughness={0.16}
            clearcoat={1.0}
            clearcoatRoughness={0.05}
            reflectivity={1.0}
            emissive="#2A1E00"
          />
        </mesh>
        
        {/* S Swoosh Ribbon Mesh */}
        <mesh castShadow receiveShadow position={[0.2, -0.6, 0.1]}>
          <extrudeGeometry args={[sShape, extrudeSettings]} />
          <meshPhysicalMaterial
            color="#D4AF37"
            metalness={0.98}
            roughness={0.16}
            clearcoat={1.0}
            clearcoatRoughness={0.05}
            reflectivity={1.0}
            emissive="#2A1E00"
          />
        </mesh>
      </Center>
    </group>
  );
}

export default function LogoMonogram3D() {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Fade out the fixed Canvas container once scrolled past the hero
    const anim = gsap.to(container, {
      opacity: 0,
      ease: "none",
      scrollTrigger: {
        trigger: "html",
        start: () => `+=${window.innerHeight * 3.0}`, // start fading at 3.0 viewport height
        end: () => `+=${window.innerHeight * 3.5}`,   // fully faded out at 3.5 height
        scrub: true,
      },
    });

    return () => {
      anim.kill();
    };
  }, []);

  return (
    <div 
      ref={containerRef} 
      className="fixed inset-0 w-full h-full pointer-events-none transition-opacity duration-300"
      style={{ zIndex: 3 }}
    >
      <Canvas
        camera={{ position: [0, 0, 4.5], fov: 45 }}
        gl={{ alpha: true, antialias: true, powerPreference: "high-performance" }}
        style={{ pointerEvents: "none" }}
      >
        <ambientLight intensity={0.6} color="#ffffff" />
        
        {/* Cinematic Studio Lighting Rig */}
        <directionalLight
          position={[5, 5, 4]}
          intensity={6}
          color="#F4E5B2" // warm light from top-right
          castShadow
        />
        <pointLight
          position={[-5, -3, 2]}
          intensity={3}
          color="#E8C77E" // fill glow from bottom-left
        />
        <spotLight
          position={[0, 8, 2]}
          intensity={4}
          color="#ffffff"
          angle={0.5}
          penumbra={1}
        />
        
        <MonogramModel />
      </Canvas>
    </div>
  );
}
