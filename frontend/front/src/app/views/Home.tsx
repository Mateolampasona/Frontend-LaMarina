import CategoriesSection from "@/Components/CategoriesSection";
import SectionOne from "@/Components/SectionOne";
import {ProductSection} from "@/Components/CardsSection"
import { Footer } from "@/Components/Footer";
export default function Homee() {
  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex-grow bgPrincipal">
        <section className="relative h-[50vh] sm:h-[60vh] md:h-[70vh] lg:h-[80vh] xl:h-[90vh]">
          <SectionOne />
          <CategoriesSection />
          <ProductSection />
          <Footer />
        </section>
      </div>
    </div>
  );
}
