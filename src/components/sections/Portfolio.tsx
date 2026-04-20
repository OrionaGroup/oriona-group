"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./Portfolio.module.css";
import { ExternalLink } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    title: "EcoTech Innovators",
    category: "Desarrollo & Branding",
    image: "linear-gradient(135deg, #0B1F3A 0%, #00F5FF 100%)",
    year: "2026",
  },
  {
    title: "Nova Global Trade",
    category: "Plataforma B2B",
    image: "linear-gradient(135deg, #6A0DAD 0%, #0B1F3A 100%)",
    year: "2025",
  },
  {
    title: "Orbit Fitness Apps",
    category: "App UX/UI",
    image: "linear-gradient(135deg, #05070D 0%, #6A0DAD 100%)",
    year: "2025",
  },
];

export default function Portfolio() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Parallax effect for project items
    const projectCards = gsap.utils.toArray(`.${styles.projectCard}`);

    projectCards.forEach((card: any, i) => {
      const imgTarget = card.querySelector(`.${styles.imageWrapper}`);
      
      gsap.to(imgTarget, {
        yPercent: 15,
        ease: "none",
        scrollTrigger: {
          trigger: card,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });
      
      // Reveal pattern
      gsap.fromTo(
        card,
        { opacity: 0, y: 100 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: card,
            start: "top 85%",
          },
        }
      );
    });
  }, []);

  return (
    <section id="portfolio" className={styles.portfolioSection} ref={containerRef}>
      <div className="container">
        <div className={styles.header}>
          <h2 className={styles.title}>Misiones <span className="text-gradient">Completadas</span></h2>
          <p className={styles.subtitle}>
            Una muestra de las experiencias digitales que hemos lanzado a órbita.
          </p>
        </div>

        <div className={styles.projectsList}>
          {projects.map((project, idx) => (
            <div key={idx} className={styles.projectCard}>
              <div className={styles.imageContainer}>
                <div 
                  className={styles.imageWrapper}
                  style={{ background: project.image }}
                >
                  <div className={styles.projectOverlay}>
                    <button className={styles.exploreBtn}>
                      Explorar <ExternalLink size={16} />
                    </button>
                  </div>
                </div>
              </div>
              <div className={styles.projectInfo}>
                <div className={styles.projectMeta}>
                  <span className={styles.category}>{project.category}</span>
                  <span className={styles.year}>{project.year}</span>
                </div>
                <h3 className={styles.projectTitle}>{project.title}</h3>
              </div>
            </div>
          ))}
        </div>
        
        <div className={styles.viewAll}>
           <button className="glow-button">Ver Todas las Misiones</button>
        </div>
      </div>
    </section>
  );
}
