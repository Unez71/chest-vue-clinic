import { useState, useEffect } from "react";
import { CheckCircle, AlertTriangle, Info, TrendingUp } from "lucide-react";

interface Finding {
  condition: string;
  confidence: number;
  severity: "normal" | "mild" | "moderate" | "severe";
  description: string;
}

interface ResultsSectionProps {
  isVisible: boolean;
}

export const ResultsSection = ({ isVisible }: ResultsSectionProps) => {
  const [showResults, setShowResults] = useState(false);
  
  // Mock results data
  const findings: Finding[] = [
    {
      condition: "Lung Fields",
      confidence: 94,
      severity: "normal",
      description: "Clear lung fields with no evidence of infiltrates or consolidation"
    },
    {
      condition: "Heart Size",
      confidence: 89,
      severity: "normal", 
      description: "Normal cardiac silhouette within expected parameters"
    },
    {
      condition: "Pleural Spaces",
      confidence: 96,
      severity: "normal",
      description: "No pleural effusion or pneumothorax detected"
    },
    {
      condition: "Bone Structure",
      confidence: 92,
      severity: "mild",
      description: "Mild age-related changes in thoracic spine"
    }
  ];

  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => setShowResults(true), 500);
      return () => clearTimeout(timer);
    }
  }, [isVisible]);

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "normal": return "text-success";
      case "mild": return "text-warning";
      case "moderate": return "text-warning";
      case "severe": return "text-destructive";
      default: return "text-muted-foreground";
    }
  };

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case "normal": return CheckCircle;
      case "mild": return Info;
      case "moderate": return AlertTriangle;
      case "severe": return AlertTriangle;
      default: return Info;
    }
  };

  const getSeverityBg = (severity: string) => {
    switch (severity) {
      case "normal": return "bg-success/10";
      case "mild": return "bg-warning/10";
      case "moderate": return "bg-warning/15";
      case "severe": return "bg-destructive/10";
      default: return "bg-muted/10";
    }
  };

  if (!isVisible) return null;

  return (
    <section className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-4xl">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold mb-4">Analysis Results</h2>
          <p className="text-muted-foreground">
            AI-powered diagnostic analysis completed
          </p>
        </div>

        {showResults && (
          <div className="space-y-6">
            {/* Overall Summary */}
            <div className="glass-card p-6 rounded-3xl fade-in-up">
              <div className="flex items-center mb-4">
                <CheckCircle className="h-8 w-8 text-success mr-3" />
                <div>
                  <h3 className="text-xl font-semibold">Overall Assessment</h3>
                  <p className="text-muted-foreground">No acute findings detected</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-4">
                <div className="flex-1">
                  <div className="flex justify-between text-sm mb-2">
                    <span>Confidence Score</span>
                    <span className="font-semibold">93%</span>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-primary to-primary-glow progress-glow transition-all duration-1000 ease-out"
                      style={{ width: "93%" }}
                    />
                  </div>
                </div>
                <TrendingUp className="h-5 w-5 text-primary" />
              </div>
            </div>

            {/* Detailed Findings */}
            <div className="grid gap-4">
              {findings.map((finding, index) => {
                const SeverityIcon = getSeverityIcon(finding.severity);
                
                return (
                  <div 
                    key={finding.condition}
                    className={`glass-card p-6 rounded-2xl transition-all duration-500 delay-${index * 100} fade-in-up hover-lift`}
                  >
                    <div className="flex items-start space-x-4">
                      <div className={`p-3 rounded-xl ${getSeverityBg(finding.severity)}`}>
                        <SeverityIcon className={`h-6 w-6 ${getSeverityColor(finding.severity)}`} />
                      </div>
                      
                      <div className="flex-1">
                        <div className="flex justify-between items-start mb-2">
                          <h4 className="text-lg font-semibold">{finding.condition}</h4>
                          <span className={`text-sm font-medium ${getSeverityColor(finding.severity)} capitalize`}>
                            {finding.severity}
                          </span>
                        </div>
                        
                        <p className="text-muted-foreground text-sm mb-3">
                          {finding.description}
                        </p>
                        
                        <div className="flex items-center space-x-4">
                          <div className="flex-1">
                            <div className="flex justify-between text-xs mb-1">
                              <span>Confidence</span>
                              <span className="font-medium">{finding.confidence}%</span>
                            </div>
                            <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                              <div 
                                className="h-full bg-primary transition-all duration-1000 ease-out"
                                style={{ width: `${finding.confidence}%` }}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Action Buttons */}
            <div className="flex justify-center space-x-4 pt-6">
              <button className="px-6 py-3 bg-primary text-primary-foreground rounded-xl font-medium hover:scale-105 transition-all duration-300">
                Download Report
              </button>
              <button className="px-6 py-3 bg-secondary text-secondary-foreground rounded-xl font-medium hover:scale-105 transition-all duration-300">
                Share Results
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};