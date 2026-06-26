import { useState } from "react";
import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { VideoSection } from "./components/VideoSection";
import { StatsSection } from "./components/StatsSection";
import { FounderSection } from "./components/FounderSection";
import { Process } from "./components/Process";
import { AppPresentationSection } from "./components/AppPresentationSection";
import { Features } from "./components/Features";
import { Services } from "./components/Services";
import { Pricing } from "./components/Pricing";
import { TestimonialsSection } from "./components/TestimonialsSection";
import { FAQ } from "./components/FAQ";
import { FinalCtaSection } from "./components/FinalCtaSection";
import { Footer } from "./components/Footer";
import { ScrollProgress } from "./components/ScrollProgress";
import { LaunchBanner } from "./components/LaunchBanner";
import { LoadingScreen } from "./components/LoadingScreen";

export default function App() {
  const [introReady, setIntroReady] = useState(false);

  return (
    <>
      <LoadingScreen onComplete={() => setIntroReady(true)} />
      <div className="relative min-h-dvh overflow-x-clip bg-bg">
      <div className="sticky top-0 z-[100]">
        <LaunchBanner />
        <Header />
      </div>
      <main className="relative">
        <Hero introReady={introReady} />
        <div className="relative z-10 -mt-2 bg-bg sm:-mt-4">
          <VideoSection />
          <StatsSection />
          <FounderSection />
          <Process />
          <AppPresentationSection />
          <Features />
          <Services />
          <Pricing />
          <TestimonialsSection />
          <FAQ />
          <FinalCtaSection />
        </div>
      </main>
      <Footer />
      <ScrollProgress />
      </div>
    </>
  );
}
