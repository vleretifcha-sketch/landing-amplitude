import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { VideoSection } from "./components/VideoSection";
import { Process } from "./components/Process";
import { Services } from "./components/Services";
import { FAQ } from "./components/FAQ";
import { Footer } from "./components/Footer";
import { ScrollProgress } from "./components/ScrollProgress";

export default function App() {
  return (
    <div className="relative min-h-dvh overflow-x-hidden bg-bg">
      <Header />
      <main className="relative">
        <Hero />
        <div className="relative z-10 -mt-2 bg-bg sm:-mt-4">
          <VideoSection />
          <Process />
          <Services />
          <FAQ />
        </div>
      </main>
      <Footer />
      <ScrollProgress />
    </div>
  );
}
