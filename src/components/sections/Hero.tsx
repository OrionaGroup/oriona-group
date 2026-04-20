"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import styles from "./Hero.module.css";
import Link from "next/link";

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subheadRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline();

    tl.fromTo(
      headlineRef.current,
      { y: 80, opacity: 0, rotationX: 20 },
      { y: 0, opacity: 1, rotationX: 0, duration: 1.2, ease: "power4.out", delay: 0.3 }
    )
    .fromTo(
      subheadRef.current,
      { y: 40, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: "power3.out" },
      "-=0.8"
    )
    .fromTo(
      ctaRef.current?.children || [],
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, stagger: 0.2, ease: "power3.out" },
      "-=0.6"
    );
  }, []);

  return (
    <section className={styles.heroSection} ref={containerRef}>
      <div className={`container ${styles.heroContainer}`}>
        <h1 ref={headlineRef} className={styles.headline} style={{ perspective: "1000px" }}>
          Explora el universo digital con <br className={styles.desktopBreak} />
          <span className="text-gradient">ORIONA</span>.
        </h1>
        <p ref={subheadRef} className={styles.subheadline}>
          Agencia de marketing digital y desarrollo web que impulsa marcas hacia nuevas galaxias. Diseñamos experiencias que orbitan alrededor del éxito.
        </p>
        <div ref={ctaRef} className={styles.ctaGroup}>
          <Link href="#contact" className="glow-button">
            Iniciar proyecto
          </Link>
          <Link href="#services" className={styles.secondaryButton}>
            Ver servicios
          </Link>
        </div>
      </div>
      
      {/* Scroll indicator */}
      <div className={styles.scrollIndicator}>
         <div className={styles.mouse}>
           <div className={styles.wheel}></div>
         </div>
      </div>
    </section>
  );
}
