"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./About.module.css";
import { Compass, Target, Zap } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Scroll reveal animation for text
    gsap.fromTo(
      textRef.current?.children || [],
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: textRef.current,
          start: "top 80%",
        },
      }
    );

    // Scroll reveal for value cards
    gsap.fromTo(
      cardsRef.current?.children || [],
      { y: 50, opacity: 0, scale: 0.9 },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 0.8,
        stagger: 0.2,
        ease: "back.out(1.7)",
        scrollTrigger: {
          trigger: cardsRef.current,
          start: "top 85%",
        },
      }
    );
  }, []);

  const values = [
    {
      icon: <Compass size={32} color="var(--color-primary)" />,
      title: "Exploración",
      desc: "Investigamos cada rincón de tu mercado para encontrar la ruta óptima hacia el éxito.",
    },
    {
      icon: <Target size={32} color="var(--color-accent)" />, // Nebula purple
      title: "Precisión",
      desc: "Estrategias milimétricas basadas en datos para maximizar el ROI, sin dejar nada al azar.",
    },
    {
      icon: <Zap size={32} color="var(--color-text)" />,
      title: "Tecnología",
      desc: "Implementamos herramientas de vanguardia para impulsar tu marca a velocidad luz.",
    },
  ];

  return (
    <section id="about" className={styles.aboutSection} ref={sectionRef}>
      <div className={`container ${styles.aboutContainer}`}>
        <div className={styles.textWrapper} ref={textRef}>
          <h2 className={styles.title}>Nuestra Misión</h2>
          <p className={styles.description}>
            En Oriona, no nos conformamos con la órbita terrestre. Somos exploradores digitales apasionados por descubrir nuevos horizontes para nuestros clientes. Combinamos diseño premium con desarrollo de alto rendimiento para crear ecosistemas digitales que destaquen en un universo saturado.
          </p>
        </div>

        <div className={styles.valuesGrid} ref={cardsRef}>
          {values.map((val, idx) => (
            <div key={idx} className={`glass-panel ${styles.valueCard}`}>
              <div className={styles.iconWrapper}>{val.icon}</div>
              <h3 className={styles.cardTitle}>{val.title}</h3>
              <p className={styles.cardDesc}>{val.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
