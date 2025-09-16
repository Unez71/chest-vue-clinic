import { useState } from "react";
import { Navigation } from "@/components/Navigation";
import { HeroSection } from "@/components/HeroSection";
import { UploadSection } from "@/components/UploadSection";
import { ResultsSection } from "@/components/ResultsSection";
import { HistorySection } from "@/components/HistorySection";

const Index = () => {
  const [activeSection, setActiveSection] = useState("home");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [showResults, setShowResults] = useState(false);

  const handleGetStarted = () => {
    setActiveSection("upload");
  };

  const handleImageUpload = (file: File) => {
    setIsAnalyzing(true);
    // Simulate AI analysis
    setTimeout(() => {
      setIsAnalyzing(false);
      setShowResults(true);
      setActiveSection("results");
    }, 3000);
  };

  const renderActiveSection = () => {
    switch (activeSection) {
      case "home":
        return <HeroSection onGetStarted={handleGetStarted} />;
      case "upload":
        return <UploadSection onImageUpload={handleImageUpload} isAnalyzing={isAnalyzing} />;
      case "results":
        return <ResultsSection isVisible={showResults} />;
      case "history":
        return <HistorySection />;
      case "activity":
        return (
          <section className="min-h-screen flex items-center justify-center px-4">
            <div className="text-center">
              <h2 className="text-3xl font-bold mb-4">Activity Dashboard</h2>
              <p className="text-muted-foreground">Coming soon...</p>
            </div>
          </section>
        );
      case "settings":
        return (
          <section className="min-h-screen flex items-center justify-center px-4">
            <div className="text-center">
              <h2 className="text-3xl font-bold mb-4">Settings</h2>
              <p className="text-muted-foreground">Coming soon...</p>
            </div>
          </section>
        );
      default:
        return <HeroSection onGetStarted={handleGetStarted} />;
    }
  };

  return (
    <div className="min-h-screen relative">
      <Navigation activeSection={activeSection} setActiveSection={setActiveSection} />
      <main className="pt-20">
        {renderActiveSection()}
      </main>
    </div>
  );
};

export default Index;
