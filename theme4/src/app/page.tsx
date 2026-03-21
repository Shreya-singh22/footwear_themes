import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import FeaturedProducts from "@/components/FeaturedProducts";
import BannerSection from "@/components/BannerSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar cartCount={2} />
      <HeroSection />
      <FeaturedProducts />
      <BannerSection />
      <Footer />
    </div>
  );
};

export default Index;
