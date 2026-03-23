import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import TrustBar from "@/components/TrustBar";
import CategoryPills from "@/components/CategoryPills";
import CollectionSection from "@/components/CollectionSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <HeroSection />
        <TrustBar />
        <CategoryPills />
        <CollectionSection />
      </main>
      <Footer />
    </div>
  );
}
