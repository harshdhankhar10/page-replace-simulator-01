
export interface FrameState {
  value: number | null;
  isNewPageFault: boolean; 
}

export interface StepState {
  referencePage: number;
  frames: FrameState[];
  pageFault: boolean;
}

export interface SimulationResult {
  pageFaults: number;
  steps: StepState[];
}

export type Algorithm = "FIFO" | "LRU" | "Optimal";

// First-In-First-Out (FIFO) algorithm
export function runFIFO(referenceString: number[], frameCount: number): SimulationResult {
  const frames: (number | null)[] = Array(frameCount).fill(null);
  let pageFaults = 0;
  let pointer = 0;
  const steps: StepState[] = [];

  for (let i = 0; i < referenceString.length; i++) {
    const page = referenceString[i];
    const pageFault = !frames.includes(page);
    
    const framesCopy = [...frames];
    
    if (pageFault) {
      pageFaults++;
      frames[pointer] = page;
      pointer = (pointer + 1) % frameCount;
    }
    
    // Create step state
    const frameState: FrameState[] = frames.map((value, index) => ({
      value,
      isNewPageFault: pageFault && frames[index] === page
    }));
    
    steps.push({
      referencePage: page,
      frames: frameState,
      pageFault
    });
  }

  return { pageFaults, steps };
}

// Least Recently Used (LRU) algorithm
export function runLRU(referenceString: number[], frameCount: number): SimulationResult {
  const frames: (number | null)[] = Array(frameCount).fill(null);
  let pageFaults = 0;
  const steps: StepState[] = [];
  const lastUsed: Map<number, number> = new Map(); // page -> time last used

  for (let i = 0; i < referenceString.length; i++) {
    const page = referenceString[i];
    const pageFault = !frames.includes(page);
    
    if (pageFault) {
      pageFaults++;
      
      // Find a free frame or the least recently used one
      const nullIndex = frames.findIndex(frame => frame === null);
      
      if (nullIndex !== -1) {
        frames[nullIndex] = page;
      } else {
        // Find LRU page
        let lruPage = frames[0]!;
        let lruTime = lastUsed.get(lruPage) || 0;
        
        for (const frame of frames) {
          if (frame !== null) {
            const time = lastUsed.get(frame) || 0;
            if (time < lruTime) {
              lruTime = time;
              lruPage = frame;
            }
          }
        }
        
        // Replace LRU page
        const lruIndex = frames.findIndex(frame => frame === lruPage);
        frames[lruIndex] = page;
      }
    }
    
    // Update last used time
    lastUsed.set(page, i);
    
    // Create step state
    const frameState: FrameState[] = frames.map((value, index) => ({
      value,
      isNewPageFault: pageFault && frames[index] === page
    }));
    
    steps.push({
      referencePage: page,
      frames: frameState,
      pageFault
    });
  }

  return { pageFaults, steps };
}

// Optimal algorithm
export function runOptimal(referenceString: number[], frameCount: number): SimulationResult {
  const frames: (number | null)[] = Array(frameCount).fill(null);
  let pageFaults = 0;
  const steps: StepState[] = [];

  for (let i = 0; i < referenceString.length; i++) {
    const page = referenceString[i];
    const pageFault = !frames.includes(page);
    
    if (pageFault) {
      pageFaults++;
      
      // Find a free frame
      const nullIndex = frames.findIndex(frame => frame === null);
      
      if (nullIndex !== -1) {
        frames[nullIndex] = page;
      } else {
        // Find the page that will not be used for the longest period
        const nextUse: Map<number, number> = new Map();
        
        // Initialize with infinity (meaning not used in future)
        for (const frame of frames) {
          if (frame !== null) {
            nextUse.set(frame, Infinity);
          }
        }
        
        // Check future references
        for (let j = i + 1; j < referenceString.length; j++) {
          const futurePage = referenceString[j];
          if (frames.includes(futurePage) && !nextUse.has(futurePage)) {
            nextUse.set(futurePage, j);
          }
        }
        
        // Find page with furthest next use
        let furthestPage = frames[0]!;
        let furthestDistance = nextUse.get(furthestPage) || 0;
        
        for (const frame of frames) {
          if (frame !== null) {
            const distance = nextUse.get(frame) || 0;
            if (distance > furthestDistance) {
              furthestDistance = distance;
              furthestPage = frame;
            }
          }
        }
        
        // Replace the page
        const replaceIndex = frames.findIndex(frame => frame === furthestPage);
        frames[replaceIndex] = page;
      }
    }
    
    // Create step state
    const frameState: FrameState[] = frames.map((value, index) => ({
      value,
      isNewPageFault: pageFault && frames[index] === page
    }));
    
    steps.push({
      referencePage: page,
      frames: frameState,
      pageFault
    });
  }

  return { pageFaults, steps };
}

// Helper function to calculate page fault rate
export function calculatePageFaultRate(pageFaults: number, totalReferences: number): number {
  return (pageFaults / totalReferences) * 100;
}
