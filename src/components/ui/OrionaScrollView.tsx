"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./OrionaScrollView.module.css";
import { FaCompass, FaBolt, FaCrosshairs } from "react-icons/fa";

gsap.registerPlugin(ScrollTrigger);

export default function OrionaScrollView({ heroImage }: { heroImage: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const overlayDarkRef = useRef<HTMLDivElement>(null);
  
  const textHeroRef = useRef<HTMLDivElement>(null);
  const introSectionRef = useRef<HTMLDivElement>(null);
  const servicesWrapRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<HTMLDivElement>(null);



  useEffect(() => {
    // Master timeline vinculada a todo el contenedor scrollable (altura = 400vh aprox)
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "bottom bottom",
        scrub: 1.2, // Smooth interpolation
      }
    });

    // --- Fase 1: Hero Zoom Out & Blur ---
    if (imageRef.current) {
      tl.to(imageRef.current, {
        scale: 1, // Original es 1.25 para hacer zoom-out
        yPercent: 15, // Parallax suave interno
        filter: "blur(16px)",
        duration: 1
      }, 0);
    }

    tl.to(overlayDarkRef.current, {
      opacity: 0.75, // Se oscurece al bajar
      duration: 1
    }, 0);

    tl.to(textHeroRef.current, {
      y: -150,
      opacity: 0,
      duration: 0.5
    }, 0);

    // --- Fase 2: Introducción Prismática ---
    tl.fromTo(introSectionRef.current, 
      { y: 200, opacity: 0, scale: 0.9 },
      { y: 0, opacity: 1, scale: 1, duration: 0.6 },
      0.4
    );

    tl.to(introSectionRef.current, {
      y: -150,
      opacity: 0,
      duration: 0.5
    }, 1.2);

    // --- Fase 3: Servicios (Tarjetas de Cristal) ---
    const serviceCards = gsap.utils.toArray(`.${styles.serviceCard}`);
    tl.fromTo(serviceCards, 
      { y: 150, opacity: 0, rotateX: 15 },
      { y: 0, opacity: 1, rotateX: 0, stagger: 0.2, duration: 0.8 },
      1.4 // Empieza justo después de que la intro va desapareciendo
    );

    tl.to(servicesWrapRef.current, {
      y: -200,
      opacity: 0,
      scale: 0.95,
      duration: 0.6
    }, 2.5);

    // --- Fase 4: Clímax Inmersivo ---
    tl.fromTo(particlesRef.current, 
      { opacity: 0, scale: 0.8, y: 100 },
      { opacity: 1, scale: 1, y: 0, duration: 1 },
      2.8
    );
    
    // El fondo revive ligeramente
    if (imageRef.current) {
      tl.to(imageRef.current, {
        scale: 1.1,
        yPercent: 20,
        filter: "blur(6px)",
        duration: 1.2
      }, 2.6);
    }
    
    tl.to(overlayDarkRef.current, {
      opacity: 0.5,
      duration: 1
    }, 2.6);

  }, []);

  return (
    <div className={styles.scrollContainer} ref={containerRef}>
      
      {/* 1. BACKGROUND STICKY LAYER (El cristal es el protagonista global) */}
      <div className={`${styles.stickyBackgroundWrapper} relative`}>
        {heroImage && (
          <img 
            src={heroImage} 
            alt="Oriona Dynamic Hero" 
            className={`${styles.dynamicImage} absolute inset-0 object-cover z-10 mix-blend-screen opacity-50`}
            ref={imageRef} 
          />
        )}
        <div className={`${styles.overlay} z-20`} ref={overlayDarkRef}></div>
      </div>

      {/* 2. FOREGROUND CONTENT LAYER (Ocupa 400vh para permitir el scrub prolongado) */}
      <div className={styles.scrollContent}>
        
        {/* A. HERO INITIAL (100vh) */}
        <section className={styles.vHSection}>
          <div className={styles.heroTextCenter} ref={textHeroRef}>
            <h1 className={styles.massiveTitle}>Oriona</h1>
            <p className={styles.massiveSubtitle}>Una nueva dimensión digital</p>
          </div>
          {/* Scroll Indicator interno */}
          <div className={styles.localScrollIndicator}>
            <div className={styles.scrollLine}></div>
          </div>
        </section>

        {/* B. SECTION: INTRO (100vh spacer) */}
        <section className={styles.vHSection}>
          <div className={`glass-panel ${styles.introPanel}`} ref={introSectionRef}>
            <h2 className={styles.sectionTitle}>Refracción <span className="text-gradient">Innovadora</span></h2>
            <p className={styles.introDesc}>
              A través de un enfoque prismático, fragmentamos modelos tradicionales para emitir soluciones luminosas. Un ecosistema dinámico donde tu visión de negocio se convoca y proyecta hacia nuevos usuarios en todo el espectro web.
            </p>
          </div>
        </section>

        {/* C. SECTION: SERVICES (100vh spacer) */}
        <section className={`${styles.vHSection} ${styles.servicesSection}`} ref={servicesWrapRef}>
           <div className={`container ${styles.servicesGrid}`}>
             <div className={`glass-panel ${styles.serviceCard}`}>
               <div className={styles.cardGlow}></div>
               <FaCompass size={40} className={styles.cardIcon} />
               <h3 className={styles.cardHeader}>Exploración</h3>
               <p className={styles.cardBody}>Mapeo de ecosistemas digitales y trazado de rutas estratégicas a años luz de lo convencional.</p>
             </div>
             
             <div className={`glass-panel ${styles.serviceCard}`}>
               <div className={styles.cardGlow}></div>
               <FaBolt size={40} className={styles.cardIcon} />
               <h3 className={styles.cardHeader}>Arquitectura</h3>
               <p className={styles.cardBody}>Ecosistemas hiper-reactivos con la potencia del stack tecnológico moderno. Performance sin fricción.</p>
             </div>
             
             <div className={`glass-panel ${styles.serviceCard}`}>
               <div className={styles.cardGlow}></div>
               <FaCrosshairs size={40} className={styles.cardIcon} />
               <h3 className={styles.cardHeader}>Proyección</h3>
               <p className={styles.cardBody}>Estética cristalina, UX de alta refracción e interfaces inmersivas listas para capturar todas las miradas.</p>
             </div>
           </div>
        </section>

        {/* D. SECTION: CLIMAX / CTA (100vh spacer) */}
        <section className={`${styles.vHSection} ${styles.climaxSection}`}>
           <div className={styles.particlesContainer} ref={particlesRef}>
              <div className={styles.lightRays}></div>
              <div className={styles.climaxContent}>
                <h2 className={styles.climaxTitle}>Sincronización <br/> <span className="text-gradient">Aprobada</span></h2>
                <button className="glow-button">Entrar a la Órbita</button>
              </div>
           </div>
        </section>

      </div>
    </div>
  );
}
