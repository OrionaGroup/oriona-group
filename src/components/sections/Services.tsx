"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./Services.module.css";
import { Code2, Megaphone, PenTool, Search, Cpu } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    icon: <Megaphone className={styles.icon} />,
    title: "Marketing Digital",
    desc: "Campañas multicanal que gravitan hacia tus objetivos de conversión y ventas.",
  },
  {
    icon: <Code2 className={styles.icon} />,
    title: "Desarrollo Web",
    desc: "Arquitecturas front-end de alto rendimiento, escalables y visualmente impactantes.",
  },
  {
    icon: <PenTool className={styles.icon} />,
    title: "Branding",
    desc: "Identidades visuales memorables que diferencian tu marca en el ecosistema digital.",
  },
  {
    icon: <Search className={styles.icon} />,
    title: "SEO / SEM",
    desc: "Posicionamiento estelar en motores de búsqueda para capturar la demanda existente.",
  },
  {
    icon: <Cpu className={styles.icon} />,
    title: "Automatización",
    desc: "Flujos de trabajo inteligentes para optimizar procesos y escalar sin fricción.",
  },
];

export default function Services() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.fromTo(
      headerRef.current,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
        },
      }
    );

    gsap.fromTo(
      gridRef.current?.children || [],
      { opacity: 0, y: 50, scale: 0.95 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.8,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: gridRef.current,
          start: "top 80%",
        },
      }
    );
  }, []);

  return (
    <section id="services" className={styles.servicesSection} ref={sectionRef}>
      <div className={`container`}>
        <div className={styles.header} ref={headerRef}>
          <h2 className={styles.title}>Nuestras <span className="text-gradient">Constelaciones</span></h2>
          <p className={styles.subtitle}>
            Un ecosistema de servicios interconectados diseñados para hacer brillar tu proyecto en todas las dimensiones digitales.
          </p>
        </div>

        <div className={styles.servicesGrid} ref={gridRef}>
          {services.map((service, idx) => (
            <div key={idx} className={`glass-panel ${styles.serviceCard}`}>
              <div className={styles.glowOverlay}></div>
              <div className={styles.content}>
                <div className={styles.iconWrapper}>{service.icon}</div>
                <h3 className={styles.cardTitle}>{service.title}</h3>
                <p className={styles.cardDesc}>{service.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
