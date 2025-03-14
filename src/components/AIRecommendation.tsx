
import React from "react";
import { useSimulation } from "@/context/SimulationContext";
import { Sparkles } from "lucide-react";

const AIRecommendation: React.FC = () => {
  const { aiRecommendation, isLoadingAI } = useSimulation();
  
  const hasRecommendation = aiRecommendation !== null;
  
  return (
    <div className="glassmorphism rounded-2xl p-6 animate-slide-in" style={{ animationDelay: "300ms" }}>
      <div className="flex items-center gap-2 mb-2">
        <h3 className="text-lg font-medium" id="ai-insights">AI Insights</h3>
        <div className="bg-secondary rounded-full p-1">
          <Sparkles className="h-4 w-4 text-primary" />
        </div>
      </div>
      
      <p className="text-sm text-muted-foreground mb-6">
        Powered by Google Gemini 2.0 - Smart analysis of algorithm performance
      </p>
      
      {isLoadingAI ? (
        <div className="border rounded-xl p-6 animate-pulse-slow">
          <div className="h-4 w-3/4 bg-secondary rounded-full mb-3"></div>
          <div className="h-4 w-5/6 bg-secondary rounded-full mb-3"></div>
          <div className="h-4 w-2/3 bg-secondary rounded-full mb-3"></div>
          <div className="h-4 w-4/5 bg-secondary rounded-full mb-3"></div>
          <div className="h-4 w-1/2 bg-secondary rounded-full"></div>
        </div>
      ) : hasRecommendation ? (
        <div className="border rounded-xl p-6 relative overflow-hidden">
          <div className="subtle-shine"></div>
          <div className="prose prose-sm max-w-none">
            <p className="text-balance">{aiRecommendation}</p>
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center h-40 text-center p-8 border border-dashed rounded-xl border-border">
          <p className="text-muted-foreground">Run a simulation to see AI recommendations</p>
        </div>
      )}
    </div>
  );
};

export default AIRecommendation;
