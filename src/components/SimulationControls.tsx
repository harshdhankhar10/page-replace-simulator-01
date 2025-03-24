
import React from "react";
import { useSimulation } from "@/context/SimulationContext";
import AlgorithmCard from "./AlgorithmCard";

const SimulationControls: React.FC = () => {
  return (
    <div id="algorithms" className="w-full">
      <h2 className="text-xl font-medium mb-2">Algorithms</h2>
      <p className="text-muted-foreground mb-6">Select a page replacement algorithm to visualize</p>
      
      <div className="grid gap-4 md:grid-cols-3">
        <AlgorithmCard
          title="FIFO"
          description="First-In, First-Out replaces the oldest page in memory."
          algorithm="FIFO"
          delay={0}
        />
        <AlgorithmCard
          title="LRU"
          description="Least Recently Used replaces the page unused for the longest time."
          algorithm="LRU"
          delay={100}
        />
        <AlgorithmCard
          title="Optimal"
          description="Replaces the page that won't be used for the longest time in future."
          algorithm="Optimal"
          delay={200}
        />
      </div>
    </div>
  );
};

export default SimulationControls;
