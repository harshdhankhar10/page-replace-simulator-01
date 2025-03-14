
import React from "react";
import Header from "@/components/Header";
import ReferenceStringInput from "@/components/ReferenceStringInput";
import SimulationControls from "@/components/SimulationControls";
import VisualizationPanel from "@/components/VisualizationPanel";
import MetricsPanel from "@/components/MetricsPanel";
import AIRecommendation from "@/components/AIRecommendation";
import { SimulationProvider } from "@/context/SimulationContext";

const Index = () => {
  return (
    <SimulationProvider>
      <div className="min-h-screen bg-gradient-to-br from-white to-blue-50">
        <Header />
        
        <main className="container mx-auto px-4 pb-20">
          <div className="mb-10 text-center max-w-3xl mx-auto animate-fade-in">
            <div className="mb-2 inline-block bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-medium">
              Advanced Operating System Concepts
            </div>
            <h1 className="text-4xl font-medium tracking-tight mb-3">
              Page Replacement Algorithm Simulator
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Visualize and analyze how different page replacement algorithms handle memory management
            </p>
          </div>
          
          <div className="grid gap-8 lg:grid-cols-3">
            <div className="lg:col-span-1">
              <ReferenceStringInput />
              <SimulationControls />
            </div>
            
            <div className="lg:col-span-2 space-y-8">
              <VisualizationPanel />
              <MetricsPanel />
              <AIRecommendation />
            </div>
          </div>
        </main>
      </div>
    </SimulationProvider>
  );
};

export default Index;
