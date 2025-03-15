import React, { useState } from "react";
import { useSimulation } from "@/context/SimulationContext";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { RefreshCw, Plus, Minus, Play, Info } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const ReferenceStringInput: React.FC = () => {
  const {
    referenceString,
    setReferenceString,
    frameCount,
    setFrameCount,
    runSimulation,
    isSimulating,
    resetSimulation,
  } = useSimulation();

  const [inputString, setInputString] = useState<string>(referenceString.join(", "));

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputString(e.target.value);
  };

  const applyReferenceString = () => {
    const newRefString = inputString
      .split(/[,\s]+/)
      .map((item) => parseInt(item.trim()))
      .filter((num) => !isNaN(num));

    if (newRefString.length > 0) {
      setReferenceString(newRefString);
    } else {
      setInputString(referenceString.join(", "));
    }
  };

  const handleRandomize = () => {
    const length = Math.floor(Math.random() * 10) + 10; 
    const maxPage = 9;
    const newRefString = Array.from({ length }, () => Math.floor(Math.random() * maxPage) + 1);
    setReferenceString(newRefString);
    setInputString(newRefString.join(", "));
  };

  const incrementFrames = () => {
    if (frameCount < 10) {
      setFrameCount(frameCount + 1);
    }
  };

  const decrementFrames = () => {
    if (frameCount > 1) {
      setFrameCount(frameCount - 1);
    }
  };

  return (
    <div className="mb-8 bg-white/10 backdrop-blur-lg rounded-xl border border-white/10 p-6 shadow-lg animate-fade-in">
      <div className="mb-6">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Reference String</h3>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <button className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors">
                    <Info className="h-4 w-4" />
                  </button>
                </TooltipTrigger>
                <TooltipContent className="bg-gray-900 text-white border-none">
                  <p className="text-sm max-w-xs">
                    Enter comma-separated page numbers to simulate page replacement algorithms.
                    Each number represents a page reference request from the CPU.
                  </p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={handleRandomize}
            className="h-8 text-xs gap-1 hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            <RefreshCw className="h-3 w-3" />
            Randomize
          </Button>
        </div>

        <div className="flex gap-2">
          <Input
            value={inputString}
            onChange={handleInputChange}
            onBlur={applyReferenceString}
            onKeyDown={(e) => e.key === "Enter" && applyReferenceString()}
            placeholder="Enter reference string (e.g., 1, 2, 3, 4, 1, 2, 5)"
            className="font-mono text-sm bg-white/50 dark:bg-gray-800/50 border-gray-300 dark:border-gray-600"
          />
          <Button
            variant="secondary"
            size="sm"
            onClick={applyReferenceString}
            className="whitespace-nowrap hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            Apply
          </Button>
        </div>
      </div>

      {/* Frame Count Section */}
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-3">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Frame Count</h3>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <button className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors">
                  <Info className="h-4 w-4" />
                </button>
              </TooltipTrigger>
              <TooltipContent className="bg-gray-900 text-white border-none">
                <p className="text-sm max-w-xs">
                  Number of physical memory frames available for page allocation.
                  Fewer frames typically result in more page faults.
                </p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>

        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            size="icon"
            className="h-8 w-8 hover:bg-gray-100 dark:hover:bg-gray-700"
            onClick={decrementFrames}
            disabled={frameCount <= 1}
          >
            <Minus className="h-3 w-3" />
          </Button>

          <div className="flex-1">
            <Slider
              value={[frameCount]}
              min={1}
              max={10}
              step={1}
              onValueChange={(value) => setFrameCount(value[0])}
              className="cursor-pointer"
            />
          </div>

          <div className="w-8 h-8 flex items-center justify-center border rounded-md text-sm font-medium bg-white/50 dark:bg-gray-800/50">
            {frameCount}
          </div>

          <Button
            variant="outline"
            size="icon"
            className="h-8 w-8 hover:bg-gray-100 dark:hover:bg-gray-700"
            onClick={incrementFrames}
            disabled={frameCount >= 10}
          >
            <Plus className="h-3 w-3" />
          </Button>
        </div>
      </div>

      <Button
        className="w-full gap-2 "
        onClick={runSimulation}
        disabled={isSimulating}
      >
        <Play className="h-4 w-4" />
        Run Simulation
      </Button>
    </div>
  );
};

export default ReferenceStringInput;