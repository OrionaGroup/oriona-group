"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./CTA.module.css";
import { Rocket } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export default function CTA() {
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.fromTo(
      ctaRef.current,
      { opacity: 0, scale: 0.9, y: 50 },
      {
        opacity: 1,
        scale: 1,
        y: 0,
        duration: 1,
        ease: "back.out(1.5)",
        scrollTrigger: {
          trigger: ctaRef.current,
          start: "top 80%",
        },
      }
    );
  }, []);

  return (
    <section id="contact" className={styles.ctaSection}>
      <div className={`container`}>
        <div className={`glass-panel ${styles.ctaBox}`} ref={ctaRef}>
          <div className={styles.glowBg}></div>
          <Rocket className={styles.rocketIcon} size={64} />
          <h2 className={styles.title}>¿Listo para despegar?</h2>
          <p className={styles.subtitle}>
            Inicia tu proyecto y lleva tu presencia digital a la estratosfera.
          </p>
          <button className={`glow-button ${styles.launchBtn}`}>
            Lanzar mi proyecto
          </button>
        </div>
      </div>
    </section>
  );
}
