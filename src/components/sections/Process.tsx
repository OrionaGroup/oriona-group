"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./Process.module.css";

gsap.registerPlugin(ScrollTrigger);

const processSteps = [
  {
    phase: "01",
    title: "Exploración",
    desc: "Análisis del mercado, la competencia y descubrimiento de la voz de la marca.",
  },
  {
    phase: "02",
    title: "Estrategia",
    desc: "Trazamos la carta de navegación: arquitectura, UI/UX y plan de marketing.",
  },
  {
    phase: "03",
    title: "Lanzamiento",
    desc: "Desarrollo técnico impecable y despliegue en el mercado del producto digital.",
  },
  {
    phase: "04",
    title: "Expansión",
    desc: "Optimización continua, SEO, escalabilidad y crecimiento acelerado.",
  },
];

export default function Process() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const stepsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Reveal steps
    const steps = gsap.utils.toArray(`.${styles.step}`);
    
    steps.forEach((step: any, i) => {
      gsap.fromTo(
        step,
        { opacity: 0, x: i % 2 === 0 ? -50 : 50 },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: step,
            start: "top 80%",
          },
        }
      );
    });

    // Fill connecting line
    gsap.fromTo(
      lineRef.current,
      { height: "0%" },
      {
        height: "100%",
        ease: "none",
        scrollTrigger: {
          trigger: stepsRef.current,
          start: "top center",
          end: "bottom center",
          scrub: true,
        },
      }
    );
  }, []);

  return (
    <section className={styles.processSection} ref={sectionRef}>
      <div className={`container ${styles.processContainer}`}>
        <div className={styles.header}>
          <h2 className={styles.title}>Plan de <span className="text-gradient">Vuelo</span></h2>
          <p className={styles.subtitle}>
            Nuestro método científico para asegurar resultados astronómicos.
          </p>
        </div>

        <div className={styles.timelineWrapper} ref={stepsRef}>
          {/* Connector line background */}
          <div className={styles.lineBg}></div>
          {/* Active connector line */}
          <div className={styles.lineActive} ref={lineRef}></div>

          {processSteps.map((step, idx) => (
            <div key={idx} className={`${styles.step} ${idx % 2 === 0 ? styles.stepLeft : styles.stepRight}`}>
              <div className={styles.stepDot}></div>
              <div className={`glass-panel ${styles.stepContent}`}>
                <span className={styles.stepPhase}>{step.phase}</span>
                <h3 className={styles.stepTitle}>{step.title}</h3>
                <p className={styles.stepDesc}>{step.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
