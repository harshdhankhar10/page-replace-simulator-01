import React, { useCallback } from "react";
import { useSimulation } from "@/context/SimulationContext";
import FrameVisualizer from "./FrameVisualizer";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Play, Pause, SkipBack, SkipForward, ChevronLeft, ChevronRight } from "lucide-react";

const VisualizationPanel: React.FC = () => {
  const { 
    simulationResults, 
    selectedAlgorithm, 
    currentStep, 
    setCurrentStep, 
    maxStep 
  } = useSimulation();
  
  const [isPlaying, setIsPlaying] = React.useState(false);
  const [playbackSpeed, setPlaybackSpeed] = React.useState(1);
  
  const hasResults = simulationResults[selectedAlgorithm] !== null;
  
  // Play/Pause simulation
  React.useEffect(() => {
    if (!isPlaying || !hasResults) return;
    
    const interval = setInterval(() => {
      if (currentStep >= maxStep - 1) {
        setIsPlaying(false);
      } else {
        setCurrentStep(currentStep + 1);
      }
    }, 1000 / playbackSpeed);
    
    return () => clearInterval(interval);
  }, [isPlaying, maxStep, setCurrentStep, hasResults, playbackSpeed, currentStep]);
  
  const handlePlayPause = useCallback(() => {
    if (currentStep >= maxStep - 1) {
      setCurrentStep(0);
      setIsPlaying(true);
    } else {
      setIsPlaying(!isPlaying);
    }
  }, [currentStep, isPlaying, maxStep, setCurrentStep]);
  
  const handleReset = useCallback(() => {
    setIsPlaying(false);
    setCurrentStep(0);
  }, [setCurrentStep]);
  
  const handleStepForward = useCallback(() => {
    if (currentStep < maxStep - 1) {
      setCurrentStep(currentStep + 1);
    }
  }, [currentStep, maxStep, setCurrentStep]);
  
  const handleStepBack = useCallback(() => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  }, [currentStep, setCurrentStep]);
  
  return (
    <div className="glassmorphism rounded-2xl p-6 animate-slide-in" style={{ animationDelay: "100ms" }}>
      <div className="mb-6">
        <h3 className="text-lg font-medium mb-2" id="visualization">Visualization</h3>
        <p className="text-sm text-muted-foreground">
          Step through the simulation to see how pages are loaded into frames
        </p>
      </div>
      
      <div className="mb-6">
        <FrameVisualizer />
      </div>
      
      <div className="space-y-4">
        {/* Playback controls */}
        <div className="flex items-center justify-between gap-2">
          <Button 
            variant="outline" 
            size="icon" 
            onClick={handleReset}
            disabled={!hasResults}
          >
            <SkipBack className="h-4 w-4" />
          </Button>
          
          <Button 
            variant="outline" 
            size="icon" 
            onClick={handleStepBack}
            disabled={!hasResults || currentStep === 0}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          
          <Button 
            variant={isPlaying ? "secondary" : "default"} 
            className="flex-1"
            onClick={handlePlayPause}
            disabled={!hasResults}
          >
            {isPlaying ? (
              <>
                <Pause className="h-4 w-4 mr-2" />
                Pause
              </>
            ) : (
              <>
                <Play className="h-4 w-4 mr-2" />
                {currentStep >= maxStep - 1 ? "Restart" : "Play"}
              </>
            )}
          </Button>
          
          <Button 
            variant="outline" 
            size="icon" 
            onClick={handleStepForward}
            disabled={!hasResults || currentStep >= maxStep - 1}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
          
          <Button 
            variant="outline" 
            size="icon" 
            onClick={() => setCurrentStep(maxStep - 1)}
            disabled={!hasResults}
          >
            <SkipForward className="h-4 w-4" />
          </Button>
        </div>
        
        {/* Timeline scrubber */}
        <div className="pt-2">
          <Slider
            value={[currentStep]}
            min={0}
            max={maxStep - 1}
            step={1}
            disabled={!hasResults}
            onValueChange={(value) => setCurrentStep(value[0])}
          />
          <div className="flex justify-between text-xs text-muted-foreground mt-1">
            <span>Step 1</span>
            <span>Step {maxStep}</span>
          </div>
        </div>
        
        {/* Playback speed */}
        <div className="flex items-center gap-3 pt-2">
          <div className="text-xs text-muted-foreground w-24">Playback Speed</div>
          <Slider
            value={[playbackSpeed]}
            min={0.5}
            max={3}
            step={0.5}
            disabled={!hasResults}
            onValueChange={(value) => setPlaybackSpeed(value[0])}
            className="flex-1"
          />
          <div className="text-xs font-medium w-10">{playbackSpeed}x</div>
        </div>
      </div>
    </div>
  );
};

export default VisualizationPanel;
