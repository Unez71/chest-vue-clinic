import { useState } from "react";
import { ChevronDown, ChevronUp, Calendar, FileText, Download } from "lucide-react";

interface HistoryItem {
  id: string;
  date: string;
  patientId: string;
  findings: string;
  confidence: number;
  status: "normal" | "abnormal";
}

export const HistorySection = () => {
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set());
  
  // Mock history data
  const historyItems: HistoryItem[] = [
    {
      id: "1",
      date: "2024-01-15",
      patientId: "PAT-001",
      findings: "Clear lung fields, normal cardiac silhouette",
      confidence: 94,
      status: "normal"
    },
    {
      id: "2", 
      date: "2024-01-10",
      patientId: "PAT-002",
      findings: "Mild consolidation in right lower lobe",
      confidence: 87,
      status: "abnormal"
    },
    {
      id: "3",
      date: "2024-01-08",
      patientId: "PAT-003", 
      findings: "Normal chest X-ray findings",
      confidence: 96,
      status: "normal"
    }
  ];

  const toggleExpanded = (id: string) => {
    const newExpanded = new Set(expandedItems);
    if (newExpanded.has(id)) {
      newExpanded.delete(id);
    } else {
      newExpanded.add(id);
    }
    setExpandedItems(newExpanded);
  };

  const getStatusColor = (status: string) => {
    return status === "normal" ? "text-success" : "text-warning";
  };

  const getStatusBg = (status: string) => {
    return status === "normal" ? "bg-success/10" : "bg-warning/10";
  };

  return (
    <section className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-4xl">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold mb-4">Patient History</h2>
          <p className="text-muted-foreground">
            Previous X-ray analyses and diagnostic reports
          </p>
        </div>

        <div className="space-y-4">
          {historyItems.map((item, index) => {
            const isExpanded = expandedItems.has(item.id);
            
            return (
              <div 
                key={item.id}
                className={`glass-card rounded-2xl overflow-hidden transition-all duration-500 delay-${index * 100} fade-in-up hover-lift`}
              >
                {/* Header */}
                <div 
                  className="p-6 cursor-pointer"
                  onClick={() => toggleExpanded(item.id)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className={`p-3 rounded-xl ${getStatusBg(item.status)}`}>
                        <FileText className={`h-5 w-5 ${getStatusColor(item.status)}`} />
                      </div>
                      
                      <div>
                        <h3 className="font-semibold text-lg">
                          Patient {item.patientId}
                        </h3>
                        <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                          <div className="flex items-center">
                            <Calendar className="h-4 w-4 mr-1" />
                            {new Date(item.date).toLocaleDateString()}
                          </div>
                          <span className={`font-medium ${getStatusColor(item.status)} capitalize`}>
                            {item.status}
                          </span>
                          <span>
                            {item.confidence}% confidence
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <div className="text-right">
                        <div className="w-16 h-1.5 bg-muted rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-primary transition-all duration-300"
                            style={{ width: `${item.confidence}%` }}
                          />
                        </div>
                      </div>
                      
                      {isExpanded ? (
                        <ChevronUp className="h-5 w-5 text-muted-foreground" />
                      ) : (
                        <ChevronDown className="h-5 w-5 text-muted-foreground" />
                      )}
                    </div>
                  </div>
                </div>

                {/* Expanded Content */}
                {isExpanded && (
                  <div className="border-t border-border px-6 pb-6 slide-down">
                    <div className="pt-4 space-y-4">
                      <div>
                        <h4 className="font-medium mb-2">Findings Summary</h4>
                        <p className="text-muted-foreground text-sm">
                          {item.findings}
                        </p>
                      </div>
                      
                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <h5 className="font-medium text-sm">Analysis Details</h5>
                          <div className="text-xs text-muted-foreground space-y-1">
                            <div className="flex justify-between">
                              <span>Processing Time:</span>
                              <span>2.4 seconds</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Model Version:</span>
                              <span>ChestAI v2.1</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Image Quality:</span>
                              <span>Excellent</span>
                            </div>
                          </div>
                        </div>
                        
                        <div className="space-y-2">
                          <h5 className="font-medium text-sm">Actions</h5>
                          <div className="flex space-x-2">
                            <button className="px-3 py-1.5 bg-primary text-primary-foreground rounded-lg text-xs hover:scale-105 transition-all duration-300 flex items-center">
                              <Download className="h-3 w-3 mr-1" />
                              Report
                            </button>
                            <button className="px-3 py-1.5 bg-secondary text-secondary-foreground rounded-lg text-xs hover:scale-105 transition-all duration-300">
                              View Details
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Load More Button */}
        <div className="text-center mt-8">
          <button className="px-6 py-3 bg-secondary text-secondary-foreground rounded-xl font-medium hover:scale-105 transition-all duration-300">
            Load More Records
          </button>
        </div>
      </div>
    </section>
  );
};