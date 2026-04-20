"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function SpaceBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;

    const stars: { x: number; y: number; z: number; size: number; speed: number }[] = [];
    const numStars = window.innerWidth < 768 ? 150 : 350;

    for (let i = 0; i < numStars; i++) {
      stars.push({
        x: Math.random() * width - width / 2,
        y: Math.random() * height - height / 2,
        z: Math.random() * width,
        size: Math.random() * 1.5 + 0.5,
        speed: Math.random() * 0.5 + 0.2,
      });
    }

    let animationId: number;
    let warpSpeed = 3;
    let currentWarpSpeed = 3;

    // Conectar la velocidad del hiperespacio al scroll global de toda la web
    const st = ScrollTrigger.create({
      trigger: document.body,
      start: "top top",
      end: "bottom bottom",
      onUpdate: (self) => {
        // Añadir fallback a 0 por si GSAP devuelve NaN en el primer ciclo
        const velocity = Math.abs(self.getVelocity() || 0);
        warpSpeed = 0.5 + (velocity / 150); // Mínimo 0.5 de velocidad cuando no haces scroll
      }
    });

    const draw = () => {
      currentWarpSpeed += (warpSpeed - currentWarpSpeed) * 0.1;
      
      // Fondo negro espacial con atenuación dinámica
      const alpha = 0.3 + (currentWarpSpeed / 100);
      ctx.fillStyle = `rgba(5, 7, 13, ${Math.min(alpha, 0.8)})`;
      ctx.fillRect(0, 0, width, height);

      const cx = width / 2;
      const cy = height / 2;

      for (let i = 0; i < numStars; i++) {
        const star = stars[i];
        
        star.z -= currentWarpSpeed * (star.speed * 10);
        
        if (star.z <= 0) {
          star.x = Math.random() * width - width / 2;
          star.y = Math.random() * height - height / 2;
          star.z = width;
          star.speed = Math.random() * 0.5 + 0.2;
        }

        const x = cx + star.x * (width / star.z);
        const y = cy + star.y * (width / star.z);
        const size = Math.max(0.1, star.size * (width - star.z) / width);

        if (x > 0 && x < width && y > 0 && y < height) {
          ctx.beginPath();
          ctx.arc(x, y, size, 0, Math.PI * 2);
          ctx.fillStyle = i % 5 === 0 ? '#00f5ff' : '#ffffff';
          ctx.fill();

          if (currentWarpSpeed > 5) {
            ctx.beginPath();
            ctx.moveTo(x, y);
            const tailZ = star.z + currentWarpSpeed * 5; 
            const tailX = cx + star.x * (width / tailZ);
            const tailY = cy + star.y * (width / tailZ);
            ctx.lineTo(tailX, tailY);
            ctx.strokeStyle = i % 5 === 0 ? 'rgba(0, 245, 255, 0.4)' : 'rgba(255, 255, 255, 0.4)';
            ctx.lineWidth = size * 0.8;
            ctx.stroke();
          }
        }
      }
      animationId = requestAnimationFrame(draw);
    };

    draw();

    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };

    window.addEventListener("resize", handleResize);

    return () => {
      st.kill();
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        zIndex: -1,
        pointerEvents: "none",
        background: "#05070D" // Añadimos como seguro en CSS por si el JS tarda
      }}
    />
  );
}
