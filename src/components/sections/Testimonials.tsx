"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./Testimonials.module.css";
import { Quote } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const testimonials = [
  {
    name: "Elena Rostova",
    role: "CEO, Nexa Ventures",
    quote: "Oriona no solo construyó nuestra plataforma, rediseñó nuestra órbita comercial. El nivel de detalle técnico y estético es algo de otro mundo.",
  },
  {
    name: "David Chen",
    role: "CMO, Stellar Tech",
    quote: "Desde el día uno entendieron nuestra visión. El crecimiento orgánico que experimentamos en 6 meses superó todas nuestras proyecciones.",
  },
  {
    name: "María Valdez",
    role: "Fundadora, Lumina Beauty",
    quote: "Buscábamos una agencia premium y encontramos verdaderos aliados estratégicos. Su capacidad de innovación es impresionante.",
  },
];

export default function Testimonials() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Stagger reveal for testimonial cards
    gsap.fromTo(
      cardsRef.current?.children || [],
      { opacity: 0, y: 50, rotateX: -10 },
      {
        opacity: 1,
        y: 0,
        rotateX: 0,
        duration: 1,
        stagger: 0.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
        },
      }
    );
  }, []);

  return (
    <section className={styles.testimonialsSection} ref={sectionRef}>
      <div className="container">
        <div className={styles.header}>
          <h2 className={styles.title}>Transmisiones de la <span className="text-gradient">Tripulación</span></h2>
        </div>

        <div className={styles.cardsGrid} ref={cardsRef}>
          {testimonials.map((test, idx) => (
            <div key={idx} className={`glass-panel ${styles.testimonialCard}`}>
              <Quote className={styles.quoteIcon} size={40} />
              <p className={styles.quoteText}>"{test.quote}"</p>
              <div className={styles.author}>
                <div className={styles.avatar}>
                   {test.name.charAt(0)}
                </div>
                <div>
                  <h4 className={styles.authorName}>{test.name}</h4>
                  <p className={styles.authorRole}>{test.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
