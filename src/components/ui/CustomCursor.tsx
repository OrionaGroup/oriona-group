"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import styles from "./CustomCursor.module.css";

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    const dot = dotRef.current;
    
    if (!cursor || !dot) return;

    // Set initial position
    let mouseX = 0;
    let mouseY = 0;

    // Detect mouse hover over clickable elements
    const onHoverEnter = () => {
      gsap.to(cursor, { scale: 1.5, borderColor: "var(--color-primary)", duration: 0.3 });
      gsap.to(dot, { backgroundColor: "var(--color-primary)", duration: 0.3 });
    };

    const onHoverLeave = () => {
      gsap.to(cursor, { scale: 1, borderColor: "rgba(234, 246, 255, 0.5)", duration: 0.3 });
      gsap.to(dot, { backgroundColor: "var(--color-text)", duration: 0.3 });
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      gsap.to(cursor, {
        x: mouseX - 16, // center offset (32px width)
        y: mouseY - 16,
        duration: 0.6,
        ease: "power3.out"
      });

      gsap.to(dot, {
        x: mouseX - 3, // center offset (6px width)
        y: mouseY - 3,
        duration: 0.1,
        ease: "power2.out"
      });
    };

    window.addEventListener("mousemove", handleMouseMove);

    const interactiveElements = document.querySelectorAll("a, button, input, textarea, .interactive");
    interactiveElements.forEach((el) => {
      el.addEventListener("mouseenter", onHoverEnter);
      el.addEventListener("mouseleave", onHoverLeave);
    });

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      interactiveElements.forEach((el) => {
        el.removeEventListener("mouseenter", onHoverEnter);
        el.removeEventListener("mouseleave", onHoverLeave);
      });
    };
  }, []);

  return (
    <>
      <div ref={cursorRef} className={styles.cursorOutline}></div>
      <div ref={dotRef} className={styles.cursorDot}></div>
    </>
  );
}
