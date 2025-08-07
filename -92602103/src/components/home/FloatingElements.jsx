import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function FloatingElements() {
  const containerRef = useRef(null);
  const sceneRef = useRef(null);
  const rendererRef = useRef(null);
  const cameraRef = useRef(null);
  const objectsRef = useRef([]);
  const frameIdRef = useRef(null);

  useEffect(() => {
    // Initialize scene
    const initScene = () => {
      // Set up the scene
      const scene = new THREE.Scene();
      sceneRef.current = scene;

      // Set up the camera
      const camera = new THREE.PerspectiveCamera(
        75, // Field of view
        window.innerWidth / window.innerHeight, // Aspect ratio
        0.1, // Near clipping plane
        1000 // Far clipping plane
      );
      camera.position.z = 20;
      cameraRef.current = camera;

      // Set up the renderer
      const renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true
      });
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.setPixelRatio(window.devicePixelRatio);
      renderer.setClearColor(0x000000, 0);
      rendererRef.current = renderer;

      // Append renderer to the DOM
      containerRef.current.appendChild(renderer.domElement);

      // Create floating objects
      createFloatingObjects();

      // Handle window resize
      window.addEventListener('resize', handleResize);

      // Start animation
      animate();
    };

    // Create various floating objects
    const createFloatingObjects = () => {
      const scene = sceneRef.current;
      const objects = [];

      // AI-themed objects/shapes
      const geometries = [
        new THREE.IcosahedronGeometry(1, 0), // Icosahedron (like a complex polyhedron)
        new THREE.OctahedronGeometry(1, 0),  // Octahedron (diamond-like)
        new THREE.TetrahedronGeometry(1, 0), // Tetrahedron (pyramid)
        new THREE.TorusGeometry(0.7, 0.3, 16, 100), // Torus (donut)
        new THREE.SphereGeometry(0.8, 32, 32), // Sphere
      ];

      // Materials with various colors that match our theme
      const materials = [
        new THREE.MeshBasicMaterial({ color: 0x8b5cf6, wireframe: true }), // Purple
        new THREE.MeshBasicMaterial({ color: 0x6d28d9, wireframe: true }), // Dark purple
        new THREE.MeshBasicMaterial({ color: 0xc4b5fd, wireframe: true }), // Light purple
        new THREE.MeshBasicMaterial({ color: 0x4c1d95, wireframe: true })  // Very dark purple
      ];

      // Create 15 random objects
      for (let i = 0; i < 15; i++) {
        const geometry = geometries[Math.floor(Math.random() * geometries.length)];
        const material = materials[Math.floor(Math.random() * materials.length)];
        
        const mesh = new THREE.Mesh(geometry, material);
        
        // Position randomly but within reasonable bounds
        mesh.position.x = (Math.random() - 0.5) * 30;
        mesh.position.y = (Math.random() - 0.5) * 30;
        mesh.position.z = (Math.random() - 0.5) * 10 - 5;
        
        // Set random rotation
        mesh.rotation.x = Math.random() * Math.PI;
        mesh.rotation.y = Math.random() * Math.PI;
        
        // Set random scale (but keep it small)
        const scale = 0.5 + Math.random() * 1;
        mesh.scale.set(scale, scale, scale);
        
        // Add random rotation speed
        mesh.userData = {
          rotationSpeed: {
            x: (Math.random() - 0.5) * 0.01,
            y: (Math.random() - 0.5) * 0.01,
            z: (Math.random() - 0.5) * 0.01
          },
          floatSpeed: {
            x: (Math.random() - 0.5) * 0.01,
            y: (Math.random() - 0.5) * 0.01
          }
        };
        
        scene.add(mesh);
        objects.push(mesh);
      }
      
      objectsRef.current = objects;
    };

    // Handle window resize
    const handleResize = () => {
      const camera = cameraRef.current;
      const renderer = rendererRef.current;
      
      if (!camera || !renderer) return;
      
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    // Animation loop
    const animate = () => {
      frameIdRef.current = requestAnimationFrame(animate);
      
      const objects = objectsRef.current;
      const scene = sceneRef.current;
      const camera = cameraRef.current;
      const renderer = rendererRef.current;
      
      if (!objects.length || !scene || !camera || !renderer) return;
      
      // Update object rotations and positions
      objects.forEach(obj => {
        // Rotate each object
        obj.rotation.x += obj.userData.rotationSpeed.x;
        obj.rotation.y += obj.userData.rotationSpeed.y;
        obj.rotation.z += obj.userData.rotationSpeed.z;
        
        // Add a subtle floating motion
        obj.position.x += obj.userData.floatSpeed.x;
        obj.position.y += obj.userData.floatSpeed.y;
        
        // If objects move too far, reset their position
        if (Math.abs(obj.position.x) > 20) obj.userData.floatSpeed.x *= -1;
        if (Math.abs(obj.position.y) > 20) obj.userData.floatSpeed.y *= -1;
      });
      
      // Render the scene
      renderer.render(scene, camera);
    };

    // Initialize and clean up
    initScene();
    
    return () => {
      cancelAnimationFrame(frameIdRef.current);
      window.removeEventListener('resize', handleResize);
      
      if (containerRef.current && rendererRef.current) {
        containerRef.current.removeChild(rendererRef.current.domElement);
      }
      
      // Dispose of geometries and materials
      objectsRef.current.forEach(obj => {
        obj.geometry.dispose();
        obj.material.dispose();
      });
    };
  }, []);

  return (
    <div 
      ref={containerRef} 
      className="absolute inset-0 pointer-events-none z-0 overflow-hidden"
      aria-hidden="true"
    ></div>
  );
}