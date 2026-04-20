"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import gsap from "gsap";
import styles from "./Navbar.module.css";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    // Initial entrance animation
    if (navRef.current) {
      gsap.fromTo(
        navRef.current,
        { y: -100, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: "power3.out", delay: 0.2 }
      );
    }
  }, []);

  const navLinks = [
    { name: "Inicio", href: "/" },
    { name: "Agencia", href: "#about" },
    { name: "Constelaciones", href: "#services" },
    { name: "Misiones", href: "#portfolio" },
  ];

  return (
    <header 
      ref={navRef}
      className={`${styles.header} ${isScrolled ? styles.scrolled : ""}`}
    >
      <div className={`container ${styles.navContainer}`}>
        <Link href="/" className={styles.logo}>
          ORIONA<span className={styles.dot}>.</span>
        </Link>

        {/* Desktop Nav */}
        <nav className={styles.desktopNav}>
          <ul className={styles.navList}>
            {navLinks.map((link) => (
              <li key={link.name}>
                <Link href={link.href} className={styles.navLink}>
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
          <Link href="#contact" className="glow-button" style={{ padding: "0.5rem 1.5rem", fontSize: "0.9rem" }}>
            Iniciar Proyecto
          </Link>
        </nav>

        {/* Mobile Toggle */}
        <button 
          className={styles.mobileToggle}
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={24} color="var(--color-primary)" /> : <Menu size={24} color="var(--color-primary)" />}
        </button>

        {/* Mobile Nav */}
        <div className={`${styles.mobileNav} ${isMobileMenuOpen ? styles.mobileNavOpen : ""}`}>
          <ul className={styles.mobileNavList}>
            {navLinks.map((link) => (
              <li key={link.name} style={{ width: '100%' }}>
                <Link 
                  href={link.href} 
                  className={styles.mobileNavLink}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.name}
                </Link>
              </li>
            ))}
            <li style={{ marginTop: '1rem', display: 'flex', justifyContent: 'center' }}>
                <Link 
                  href="#contact" 
                  className="glow-button"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Iniciar Proyecto
                </Link>
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
}
