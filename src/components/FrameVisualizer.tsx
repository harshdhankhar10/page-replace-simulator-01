
import React from "react";
import { useSimulation } from "@/context/SimulationContext";
import { cn } from "@/lib/utils";

const FrameVisualizer: React.FC = () => {
  const { 
    simulationResults, 
    selectedAlgorithm, 
    currentStep, 
    referenceString 
  } = useSimulation();
  
  // Get current simulation result for the selected algorithm
  const result = simulationResults[selectedAlgorithm];
  
  if (!result) {
    return (
      <div className="flex flex-col items-center justify-center h-64 text-center p-8 border border-dashed rounded-xl border-border">
        <p className="text-muted-foreground">Run a simulation to see the visualization</p>
      </div>
    );
  }
  
  const currentStepState = result.steps[Math.min(currentStep, result.steps.length - 1)];
  
  return (
    <div className="animate-fade-in">
      {/* Current Page Reference */}
      <div className="mb-6 text-center">
        <div className="text-xs uppercase tracking-wide text-muted-foreground mb-1">Current Reference</div>
        <div className="text-4xl font-medium animate-pulse-slow">
          {currentStepState.referencePage}
        </div>
        <div className={cn(
          "text-xs font-medium mt-1 rounded-full px-2 py-0.5 inline-block",
          currentStepState.pageFault 
            ? "bg-destructive/10 text-destructive" 
            : "bg-green-100 text-green-700"
        )}>
          {currentStepState.pageFault ? "Page Fault" : "Page Hit"}
        </div>
      </div>
      
      {/* Frames Visualization */}
      <div className="mb-8">
        <div className="text-xs uppercase tracking-wide text-muted-foreground mb-3 text-center">Memory Frames</div>
        <div className="grid gap-3">
          {currentStepState.frames.map((frame, index) => (
            <div 
              key={index}
              className={cn(
                "border rounded-xl h-16 flex items-center justify-center transition-all duration-300",
                frame.value === null
                  ? "border-dashed border-border bg-secondary/30"
                  : frame.isNewPageFault
                    ? "border-destructive bg-destructive/5 shadow-[0_0_0_1px_rgba(220,38,38,0.1)]"
                    : "border-border bg-white"
              )}
            >
              {frame.value === null ? (
                <span className="text-muted-foreground text-sm">Empty</span>
              ) : (
                <div className="text-2xl font-medium">
                  {frame.value}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
      
      {/* Reference String Timeline */}
      <div>
        <div className="text-xs uppercase tracking-wide text-muted-foreground mb-3 text-center">Reference String Timeline</div>
        <div className="flex overflow-x-auto pb-2 gap-1">
          {referenceString.map((page, index) => (
            <div 
              key={index}
              className={cn(
                "flex-shrink-0 w-10 h-10 flex items-center justify-center rounded-lg border transition-all",
                index === currentStep
                  ? "border-primary bg-primary text-white"
                  : index < currentStep
                    ? "border-muted bg-muted text-muted-foreground"
                    : "border-border bg-white"
              )}
            >
              {page}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FrameVisualizer;
