import React, { createContext, useContext, useReducer, useCallback, useEffect } from "react";
import { getAIRecommendation } from "@/lib/api";
import { runFIFO, runLRU, runOptimal, SimulationResult } from "@/lib/algorithms";

type AlgorithmType = "FIFO" | "LRU" | "Optimal";

interface SimulationState {
  referenceString: number[];
  frameCount: number;
  selectedAlgorithm: AlgorithmType;
  simulationResults: Record<AlgorithmType, SimulationResult | null>;
  isSimulating: boolean;
  currentStep: number;
  maxStep: number;
  aiRecommendation: string | null;
  isLoadingAI: boolean;
}

type SimulationAction =
  | { type: "SET_REFERENCE_STRING"; payload: number[] }
  | { type: "SET_FRAME_COUNT"; payload: number }
  | { type: "SET_ALGORITHM"; payload: AlgorithmType }
  | { type: "SET_SIMULATION_RESULTS"; payload: Record<AlgorithmType, SimulationResult | null> }
  | { type: "SET_SIMULATING"; payload: boolean }
  | { type: "SET_CURRENT_STEP"; payload: number }
  | { type: "SET_MAX_STEP"; payload: number }
  | { type: "SET_AI_RECOMMENDATION"; payload: string | null }
  | { type: "SET_LOADING_AI"; payload: boolean }
  | { type: "RESET_SIMULATION" };

const initialState: SimulationState = {
  referenceString: [1, 2, 3, 4, 1, 2, 5, 1, 2, 3, 4, 5],
  frameCount: 3,
  selectedAlgorithm: "FIFO",
  simulationResults: { FIFO: null, LRU: null, Optimal: null },
  isSimulating: false,
  currentStep: 0,
  maxStep: 0,
  aiRecommendation: null,
  isLoadingAI: false,
};

const simulationReducer = (state: SimulationState, action: SimulationAction): SimulationState => {
  switch (action.type) {
    case "SET_REFERENCE_STRING":
      return { ...state, referenceString: action.payload };
    case "SET_FRAME_COUNT":
      return { ...state, frameCount: action.payload };
    case "SET_ALGORITHM":
      return { ...state, selectedAlgorithm: action.payload };
    case "SET_SIMULATION_RESULTS":
      return { ...state, simulationResults: action.payload };
    case "SET_SIMULATING":
      return { ...state, isSimulating: action.payload };
    case "SET_CURRENT_STEP":
      return { ...state, currentStep: action.payload };
    case "SET_MAX_STEP":
      return { ...state, maxStep: action.payload };
    case "SET_AI_RECOMMENDATION":
      return { ...state, aiRecommendation: action.payload };
    case "SET_LOADING_AI":
      return { ...state, isLoadingAI: action.payload };
    case "RESET_SIMULATION":
      return {
        ...state,
        simulationResults: { FIFO: null, LRU: null, Optimal: null },
        currentStep: 0,
        maxStep: 0,
        aiRecommendation: null,
      };
    default:
      return state;
  }
};

interface SimulationContextType extends SimulationState {
  setReferenceString: (refs: number[]) => void;
  setFrameCount: (count: number) => void;
  setSelectedAlgorithm: (algo: AlgorithmType) => void;
  runSimulation: () => void;
  setCurrentStep: (step: number) => void;
  resetSimulation: () => void;
}

const SimulationContext = createContext<SimulationContextType | undefined>(undefined);

export const SimulationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(simulationReducer, initialState);

  const setReferenceString = (refs: number[]) => dispatch({ type: "SET_REFERENCE_STRING", payload: refs });
  const setFrameCount = (count: number) => dispatch({ type: "SET_FRAME_COUNT", payload: count });
  const setSelectedAlgorithm = (algo: AlgorithmType) => dispatch({ type: "SET_ALGORITHM", payload: algo });
  const setCurrentStep = (step: number) => dispatch({ type: "SET_CURRENT_STEP", payload: step });

  const resetSimulation = useCallback(() => {
    dispatch({ type: "RESET_SIMULATION" });
  }, []);

  const runSimulation = useCallback(async () => {
    dispatch({ type: "SET_SIMULATING", payload: true });

    try {
      const fifoResult = runFIFO(state.referenceString, state.frameCount);
      const lruResult = runLRU(state.referenceString, state.frameCount);
      const optimalResult = runOptimal(state.referenceString, state.frameCount);

      dispatch({
        type: "SET_SIMULATION_RESULTS",
        payload: { FIFO: fifoResult, LRU: lruResult, Optimal: optimalResult },
      });

      dispatch({ type: "SET_MAX_STEP", payload: state.referenceString.length });
      dispatch({ type: "SET_CURRENT_STEP", payload: 0 });

      dispatch({ type: "SET_LOADING_AI", payload: true });

      try {
        const recommendation = await getAIRecommendation(
          state.referenceString,
          state.frameCount,
          fifoResult.pageFaults,
          lruResult.pageFaults,
          optimalResult.pageFaults
        );
        dispatch({ type: "SET_AI_RECOMMENDATION", payload: recommendation });
      } catch (error) {
        console.error("Error getting AI recommendation:", error);
        dispatch({ type: "SET_AI_RECOMMENDATION", payload: "Unable to load AI recommendation at this time." });
      } finally {
        dispatch({ type: "SET_LOADING_AI", payload: false });
      }
    } catch (error) {
      console.error("Error running simulation:", error);
    } finally {
      dispatch({ type: "SET_SIMULATING", payload: false });
    }
  }, [state.referenceString, state.frameCount]);

  useEffect(() => {
    resetSimulation();
  }, [state.referenceString, state.frameCount, resetSimulation]);

  return (
    <SimulationContext.Provider
      value={{
        ...state,
        setReferenceString,
        setFrameCount,
        setSelectedAlgorithm,
        runSimulation,
        setCurrentStep,
        resetSimulation,
      }}
    >
      {children}
    </SimulationContext.Provider>
  );
};

export const useSimulation = () => {
  const context = useContext(SimulationContext);
  if (!context) {
    throw new Error("useSimulation must be used within a SimulationProvider");
  }
  return context;
};
