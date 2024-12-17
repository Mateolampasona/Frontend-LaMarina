import CategoriesSection from "@/Components/CategoriesSection";
import SectionOne from "@/Components/SectionOne";

export default function Homee() {
  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex-grow bgPrincipal">
        <section className="relative h-[50vh] sm:h-[60vh] md:h-[70vh] lg:h-[80vh] xl:h-[90vh]">
          <SectionOne />
          <CategoriesSection />
        </section>
      </div>
    </div>
  );
}
