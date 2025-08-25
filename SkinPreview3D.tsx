import React, { useEffect, useRef } from "react";
import * as THREE from "three";

function canvasDataToImage(canvasData: string[][]): string {
  const gridSize = 64;
  const canvas = document.createElement("canvas");
  canvas.width = gridSize;
  canvas.height = gridSize;
  const ctx = canvas.getContext("2d");
  if (!ctx) return "";
  for (let y = 0; y < gridSize; y++) {
    for (let x = 0; x < gridSize; x++) {
      ctx.fillStyle = canvasData[y][x];
      ctx.fillRect(x, y, 1, 1);
    }
  }
  return canvas.toDataURL("image/png");
}

interface Props {
  canvasData: string[][];
  visibleParts: Record<string, boolean>;
}

const SkinPreview3D: React.FC<Props> = ({ canvasData }) => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const width = 320;
    const height = 400;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(70, width / height, 0.1, 1000);
    camera.position.z = 2;

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(width, height);

    // Simple box to represent the skin.
    const geometry = new THREE.BoxGeometry(1, 2, 0.5);
    const texture = new THREE.TextureLoader().load(canvasDataToImage(canvasData));
    const material = new THREE.MeshBasicMaterial({ map: texture });
    const cube = new THREE.Mesh(geometry, material);
    scene.add(cube);

    if (mountRef.current) {
      mountRef.current.innerHTML = "";
      mountRef.current.appendChild(renderer.domElement);
    }

    let frameId: number;
    const animate = () => {
      cube.rotation.y += 0.01;
      renderer.render(scene, camera);
      frameId = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      cancelAnimationFrame(frameId);
      renderer.dispose();
      geometry.dispose();
      texture.dispose();
      material.dispose();
    };
  }, [canvasData]);

  return (
    <div ref={mountRef} style={{
      width: 320,
      height: 400,
      background: "#191929",
      borderRadius: 16,
      boxShadow: "0 8px 32px rgba(0,0,0,0.5)",
      margin: "auto"
    }} />
  );
};

export default SkinPreview3D;