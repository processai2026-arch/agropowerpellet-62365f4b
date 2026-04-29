import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import FrameAnimationSection from "@/components/FrameAnimationSection";
import AboutSection from "@/components/AboutSection";
import ProductsSection from "@/components/ProductsSection";
import SolutionsSection from "@/components/SolutionsSection";
import IndustriesSection from "@/components/IndustriesSection";
import WhyChooseUsSection from "@/components/WhyChooseUsSection";
import ImpactSection from "@/components/ImpactSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen relative">
      <Navbar />
      <HeroSection />
      <FrameAnimationSection />
      <AboutSection />
      <ProductsSection />
      <SolutionsSection />
      <IndustriesSection />
      <WhyChooseUsSection />
      <ImpactSection />
      <TestimonialsSection />
      <ContactSection />
      <Footer />
    </div>
  );
};

export default Index;
