
import React from "react";
import { CheckCircle } from "lucide-react";
import { useSimulation } from "@/context/SimulationContext";
import { cn } from "@/lib/utils";
import { Algorithm } from "@/lib/algorithms";

interface AlgorithmCardProps {
  title: string;
  description: string;
  algorithm: Algorithm;
  delay?: number;
}

const AlgorithmCard: React.FC<AlgorithmCardProps> = ({ 
  title, 
  description, 
  algorithm, 
  delay = 0 
}) => {
  const { 
    selectedAlgorithm, 
    setSelectedAlgorithm, 
    simulationResults 
  } = useSimulation();
  
  const isSelected = selectedAlgorithm === algorithm;
  const hasResults = simulationResults[algorithm] !== null;
  
  return (
    <div 
      className={cn(
        "rounded-2xl p-6 border cursor-pointer transition-all duration-300 relative overflow-hidden animate-fade-in",
        isSelected 
          ? "border-primary/30 shadow-md shadow-primary/5 bg-white" 
          : "border-border bg-white/60 hover:bg-white hover:shadow-sm",
      )}
      style={{ animationDelay: `${delay}ms` }}
      onClick={() => setSelectedAlgorithm(algorithm)}
    >
      {isSelected && (
        <div className="absolute top-4 right-4">
          <CheckCircle className="h-5 w-5 text-primary" />
        </div>
      )}
      
      <div className="mb-2 w-12 h-12 rounded-xl flex items-center justify-center bg-secondary text-primary">
        {algorithm === "FIFO" && (
          <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6">
            <path d="M3 12h18M3 6h18M3 18h18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        )}
        {algorithm === "LRU" && (
          <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6">
            <path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        )}
        {algorithm === "Optimal" && (
          <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6">
            <path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-9.618 5.04m-.023 3.016A11.955 11.955 0 0112 21.056a11.955 11.955 0 019.618-5.04m-9.618 5.04a11.955 11.955 0 01-9.618-5.04" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        )}
      </div>
      
      <h3 className="text-lg font-medium mb-1">{title}</h3>
      <p className="text-sm text-muted-foreground mb-3">{description}</p>
      
      {hasResults && (
        <div className="text-xs font-medium border border-border rounded-full px-3 py-1 inline-block">
          {simulationResults[algorithm]?.pageFaults} page faults
        </div>
      )}
    </div>
  );
};

export default AlgorithmCard;
