import { useState, useEffect } from "react";
import { Brain, Zap, Shield } from "lucide-react";

interface HeroSectionProps {
  onGetStarted: () => void;
}

export const HeroSection = ({ onGetStarted }: HeroSectionProps) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="min-h-screen flex items-center justify-center px-4">
      <div className={`text-center max-w-4xl transition-all duration-1000 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      }`}>
        {/* Main Title */}
        <div className="mb-8">
          <h1 className="text-6xl md:text-8xl font-bold mb-4 bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">
            ChestAI
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground font-medium">
            Advanced Chest X-Ray Diagnostic Assistant
          </p>
        </div>

        {/* Feature Cards */}
        <div className={`grid md:grid-cols-3 gap-6 mb-12 transition-all duration-1000 delay-300 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}>
          <div className="glass-card p-6 rounded-2xl hover-lift">
            <Brain className="h-12 w-12 text-primary mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">AI-Powered Analysis</h3>
            <p className="text-muted-foreground text-sm">
              Advanced machine learning algorithms for precise diagnostics
            </p>
          </div>
          
          <div className="glass-card p-6 rounded-2xl hover-lift">
            <Zap className="h-12 w-12 text-primary mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">Instant Results</h3>
            <p className="text-muted-foreground text-sm">
              Get comprehensive analysis in seconds, not hours
            </p>
          </div>
          
          <div className="glass-card p-6 rounded-2xl hover-lift">
            <Shield className="h-12 w-12 text-primary mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">Medical Grade</h3>
            <p className="text-muted-foreground text-sm">
              HIPAA compliant with hospital-grade security standards
            </p>
          </div>
        </div>

        {/* CTA Button */}
        <div className={`transition-all duration-1000 delay-500 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}>
          <button
            onClick={onGetStarted}
            className="
              px-8 py-4 bg-primary text-primary-foreground rounded-2xl font-semibold text-lg
              transition-all duration-300 ease-out
              hover:scale-105 hover:shadow-[0_0_30px_hsl(211_100%_50%_/_0.4)]
              active:scale-95
            "
          >
            Start Analysis
          </button>
          
          <p className="text-sm text-muted-foreground mt-4">
            Upload your chest X-ray for instant AI-powered analysis
          </p>
        </div>
      </div>
    </section>
  );
};