import SpaceBackground from "@/components/ui/SpaceBackground";
import Navbar from "@/components/layout/Navbar";
import OrionaScrollView from "@/components/ui/OrionaScrollView";
import Portfolio from "@/components/sections/Portfolio";
import Process from "@/components/sections/Process";
import Testimonials from "@/components/sections/Testimonials";
import CTA from "@/components/sections/CTA";
import Footer from "@/components/layout/Footer";
import SmoothScroller from "@/components/layout/SmoothScroller";

export default function Home() {
  return (
    <SmoothScroller>
      <Navbar />
      <SpaceBackground />
      
      <main>
        {/* El nuevo scroll interactivo que reemplaza a Hero, About y Services convencionales */}
        <OrionaScrollView heroImage=""/>
        
        {/* El resto de la web */}
        <Portfolio />
        <Process />
        <Testimonials />
        <CTA />
      </main>

      <Footer />
    </SmoothScroller>
  );
}
