"use client";

import Link from "next/link";
import styles from "./Footer.module.css";
import { FaTwitter, FaInstagram, FaLinkedin, FaGithub } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.footerContainer}`}>
        <div className={styles.brandCol}>
          <Link href="/" className={styles.logo}>
            Oriona<span className={styles.dot}>.</span>
          </Link>
          <p className={styles.brandDesc}>
            Agencia de marketing digital y desarrollo web. Explorando nuevas fronteras creativas y tecnológicas.
          </p>
        </div>
        
        <div className={styles.linksCol}>
          <h4 className={styles.linksTitle}>Navegación</h4>
          <ul className={styles.linkList}>
            <li><Link href="/">Inicio</Link></li>
            <li><Link href="#about">Agencia</Link></li>
            <li><Link href="#services">Constelaciones</Link></li>
            <li><Link href="#portfolio">Misiones</Link></li>
          </ul>
        </div>
        
        <div className={styles.socialCol}>
          <h4 className={styles.linksTitle}>Comunicaciones</h4>
          <div className={styles.socialIcons}>
            <a href="#" className={styles.socialIcon} aria-label="Twitter"><FaTwitter size={20} /></a>
            <a href="#" className={styles.socialIcon} aria-label="Instagram"><FaInstagram size={20} /></a>
            <a href="#" className={styles.socialIcon} aria-label="LinkedIn"><FaLinkedin size={20} /></a>
            <a href="#" className={styles.socialIcon} aria-label="GitHub"><FaGithub size={20} /></a>
          </div>
        </div>
      </div>
      
      <div className={styles.bottomBar}>
        <div className="container">
          <p>&copy; {new Date().getFullYear()} Oriona Digital Agency. Todos los derechos reservados en este sector galáctico.</p>
        </div>
      </div>
    </footer>
  );
}
