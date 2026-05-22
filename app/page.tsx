import { Contacts } from "@/components/Contacts";
import { Faq } from "@/components/Faq";
import { FinalCta } from "@/components/FinalCta";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { LeadForm } from "@/components/LeadForm";
import { Pricing } from "@/components/Pricing";
import { Process } from "@/components/Process";
import { Reviews } from "@/components/Reviews";
import { Services } from "@/components/Services";
import { StickyMobileCta } from "@/components/StickyMobileCta";
import { TrustChecklist } from "@/components/TrustChecklist";
import { UrgentCases } from "@/components/UrgentCases";

export default function Home() {
  return (
    <>
      <Header />
      <main className="pb-24 md:pb-0">
        <Hero />
        <UrgentCases />
        <Services />
        <Pricing />
        <Process />
        <TrustChecklist />
        <Reviews />
        <Faq />
        <Contacts />
        <LeadForm />
        <FinalCta />
      </main>
      <Footer />
      <StickyMobileCta />
    </>
  );
}
