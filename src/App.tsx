import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { VideoSection } from "./components/VideoSection";
import { Process } from "./components/Process";
import { Features } from "./components/Features";
import { Services } from "./components/Services";
import { Pricing } from "./components/Pricing";
import { FAQ } from "./components/FAQ";
import { Footer } from "./components/Footer";
import { ScrollProgress } from "./components/ScrollProgress";
import { LoadingScreen } from "./components/LoadingScreen";

export default function App() {
  return (
    <>
      <LoadingScreen />
      <div className="relative min-h-dvh overflow-x-clip bg-bg">
      <Header />
      <main className="relative">
        <Hero />
        <div className="relative z-10 -mt-2 bg-bg sm:-mt-4">
          <VideoSection />
          <Process />
          <Features />
          <Services />
          <Pricing />
          <FAQ />
        </div>
      </main>
      <Footer />
      <ScrollProgress />
      </div>
    </>
  );
}
