import React, { useCallback } from "react";
import { useSimulation } from "@/context/SimulationContext";
import FrameVisualizer from "./FrameVisualizer";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { 
  Play, 
  Pause, 
  SkipBack, 
  SkipForward, 
  ChevronLeft, 
  ChevronRight,
  Clock
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

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
    <Card className="glassmorphism shadow-lg border-none bg-opacity-70 backdrop-blur-md rounded-2xl animate-slide-in" style={{ animationDelay: "100ms" }}>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <CardTitle className="text-xl font-semibold" id="visualization">
            Visualization
          </CardTitle>
          {hasResults && (
            <Badge variant="outline" className="bg-primary/10 text-primary">
              {selectedAlgorithm} Algorithm
            </Badge>
          )}
        </div>
        <p className="text-sm text-muted-foreground">
          Step through the simulation to see how pages are loaded into frames
        </p>
      </CardHeader>
      
      <CardContent className="space-y-6">
        <div className="border rounded-lg p-4 bg-card/50">
          <FrameVisualizer />
        </div>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between gap-2">
            <Button 
              variant="outline" 
              size="icon" 
              onClick={handleReset}
              disabled={!hasResults}
              className="hover:bg-primary/10"
            >
              <SkipBack className="h-4 w-4" />
            </Button>
            
            <Button 
              variant="outline" 
              size="icon" 
              onClick={handleStepBack}
              disabled={!hasResults || currentStep === 0}
              className="hover:bg-primary/10"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            
            <Button 
              variant={isPlaying ? "secondary" : "default"} 
              className="flex-1 font-medium"
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
              className="hover:bg-primary/10"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
            
            <Button 
              variant="outline" 
              size="icon" 
              onClick={() => setCurrentStep(maxStep - 1)}
              disabled={!hasResults}
              className="hover:bg-primary/10"
            >
              <SkipForward className="h-4 w-4" />
            </Button>
          </div>
          
          <div className="pt-2">
            <div className="flex justify-between text-xs text-muted-foreground mb-1">
              <span>Step {currentStep + 1} of {maxStep}</span>
              <span className="text-primary font-medium">{Math.round((currentStep / (maxStep - 1)) * 100)}%</span>
            </div>
            <Slider
              value={[currentStep]}
              min={0}
              max={maxStep - 1}
              step={1}
              disabled={!hasResults}
              onValueChange={(value) => setCurrentStep(value[0])}
              className="my-1"
            />
            <div className="flex justify-between text-xs text-muted-foreground mt-1">
              <span>Start</span>
              <span>End</span>
            </div>
          </div>
          
          <div className="flex items-center gap-3 pt-2 border-t mt-2">
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <Clock className="h-3 w-3" />
              <span>Speed</span>
            </div>
            <Slider
              value={[playbackSpeed]}
              min={0.5}
              max={3}
              step={0.5}
              disabled={!hasResults}
              onValueChange={(value) => setPlaybackSpeed(value[0])}
              className="flex-1"
            />
            <div className="text-xs font-medium w-10 text-primary">{playbackSpeed}x</div>
          </div>
        </div>
        
        {!hasResults && (
          <div className="text-center p-4 border border-dashed rounded-lg bg-background/40">
            <p className="text-sm text-muted-foreground">
              Run a simulation to see visualization results
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default VisualizationPanel;