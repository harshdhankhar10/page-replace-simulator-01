
import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import { getAIRecommendation } from "@/lib/api";
import { runFIFO, runLRU, runOptimal, Algorithm, SimulationResult } from "@/lib/algorithms";

type AlgorithmType = "FIFO" | "LRU" | "Optimal";

interface SimulationContextType {
  referenceString: number[];
  setReferenceString: (refs: number[]) => void;
  frameCount: number;
  setFrameCount: (count: number) => void;
  selectedAlgorithm: AlgorithmType;
  setSelectedAlgorithm: (algo: AlgorithmType) => void;
  simulationResults: Record<AlgorithmType, SimulationResult | null>;
  isSimulating: boolean;
  runSimulation: () => void;
  currentStep: number;
  setCurrentStep: (step: number) => void;
  maxStep: number;
  aiRecommendation: string | null;
  isLoadingAI: boolean;
  resetSimulation: () => void;
}

const SimulationContext = createContext<SimulationContextType | undefined>(undefined);

export const SimulationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [referenceString, setReferenceString] = useState<number[]>([1, 2, 3, 4, 1, 2, 5, 1, 2, 3, 4, 5]);
  const [frameCount, setFrameCount] = useState<number>(3);
  const [selectedAlgorithm, setSelectedAlgorithm] = useState<AlgorithmType>("FIFO");
  const [simulationResults, setSimulationResults] = useState<Record<AlgorithmType, SimulationResult | null>>({
    FIFO: null,
    LRU: null,
    Optimal: null
  });
  const [isSimulating, setIsSimulating] = useState<boolean>(false);
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [maxStep, setMaxStep] = useState<number>(0);
  const [aiRecommendation, setAIRecommendation] = useState<string | null>(null);
  const [isLoadingAI, setIsLoadingAI] = useState<boolean>(false);

  const runSimulation = useCallback(async () => {
    setIsSimulating(true);
    
    try {
      // Run all algorithms
      const fifoResult = runFIFO(referenceString, frameCount);
      const lruResult = runLRU(referenceString, frameCount);
      const optimalResult = runOptimal(referenceString, frameCount);
      
      setSimulationResults({
        FIFO: fifoResult,
        LRU: lruResult,
        Optimal: optimalResult
      });
      
      setMaxStep(referenceString.length);
      setCurrentStep(0);
      
      // Get AI recommendation
      setIsLoadingAI(true);
      try {
        const recommendation = await getAIRecommendation(
          referenceString, 
          frameCount,
          fifoResult.pageFaults, 
          lruResult.pageFaults, 
          optimalResult.pageFaults
        );
        setAIRecommendation(recommendation);
      } catch (error) {
        console.error("Error getting AI recommendation:", error);
        setAIRecommendation("Unable to load AI recommendation at this time.");
      } finally {
        setIsLoadingAI(false);
      }
    } catch (error) {
      console.error("Error running simulation:", error);
    } finally {
      setIsSimulating(false);
    }
  }, [referenceString, frameCount]);

  const resetSimulation = useCallback(() => {
    setSimulationResults({
      FIFO: null,
      LRU: null,
      Optimal: null
    });
    setCurrentStep(0);
    setMaxStep(0);
    setAIRecommendation(null);
  }, []);

  useEffect(() => {
    resetSimulation();
  }, [referenceString, frameCount, resetSimulation]);

  return (
    <SimulationContext.Provider 
      value={{
        referenceString,
        setReferenceString,
        frameCount,
        setFrameCount,
        selectedAlgorithm,
        setSelectedAlgorithm,
        simulationResults,
        isSimulating,
        runSimulation,
        currentStep,
        setCurrentStep,
        maxStep,
        aiRecommendation,
        isLoadingAI,
        resetSimulation
      }}
    >
      {children}
    </SimulationContext.Provider>
  );
};

export const useSimulation = () => {
  const context = useContext(SimulationContext);
  if (context === undefined) {
    throw new Error("useSimulation must be used within a SimulationProvider");
  }
  return context;
};
