import React from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, FileText, Cpu, BarChart2, Lightbulb } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Documentation = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-blue-50">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center gap-2 mb-8">
          <Link to="/">
            <Button variant="ghost" size="sm" className="gap-1">
              <ArrowLeft className="h-4 w-4" />
              Back to Simulator
            </Button>
          </Link>
          <h1 className="text-3xl font-bold">Page Replacement Algorithm Simulator Documentation</h1>
        </div>

        <div className="bg-white rounded-xl shadow-sm border p-8 mb-8">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-semibold mb-4">Overview</h2>
            <p className="text-muted-foreground mb-6">
              This application simulates various page replacement algorithms used in operating systems 
              to manage memory. The simulator helps visualize how different algorithms handle page faults 
              and memory management, providing metrics to compare their efficiency.
            </p>

            <Tabs defaultValue="usage" className="mb-8">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="usage" className="flex items-center gap-2">
                  <FileText className="h-4 w-4" />
                  Basic Usage
                </TabsTrigger>
                <TabsTrigger value="algorithms" className="flex items-center gap-2">
                  <Cpu className="h-4 w-4" />
                  Algorithms
                </TabsTrigger>
                <TabsTrigger value="metrics" className="flex items-center gap-2">
                  <BarChart2 className="h-4 w-4" />
                  Performance Metrics
                </TabsTrigger>
                <TabsTrigger value="ai" className="flex items-center gap-2">
                  <Lightbulb className="h-4 w-4" />
                  AI Recommendations
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="usage" className="mt-6 space-y-6">
                <div>
                  <h3 className="text-xl font-medium mb-3">Getting Started</h3>
                  <ol className="list-decimal pl-6 space-y-3">
                    <li>
                      <strong>Enter a Reference String:</strong> Input a sequence of page references in the input field. 
                      You can enter numbers separated by spaces or commas, or use the "Generate Random" button.
                    </li>
                    <li>
                      <strong>Set Frame Count:</strong> Define how many memory frames are available using the slider.
                    </li>
                    <li>
                      <strong>Select Algorithm(s):</strong> Choose one or more page replacement algorithms to simulate.
                    </li>
                    <li>
                      <strong>Run Simulation:</strong> Click the "Run Simulation" button to start.
                    </li>
                    <li>
                      <strong>Step Through or Auto-Play:</strong> Use the step controls to move through the simulation 
                      manually or the auto-play feature to watch it progress automatically.
                    </li>
                  </ol>
                </div>
                
                <div>
                  <h3 className="text-xl font-medium mb-3">Interface Elements</h3>
                  <ul className="list-disc pl-6 space-y-3">
                    <li>
                      <strong>Reference String Input:</strong> Enter your page reference sequence here.
                    </li>
                    <li>
                      <strong>Frame Count Slider:</strong> Adjust the number of memory frames available.
                    </li>
                    <li>
                      <strong>Algorithm Selection:</strong> Toggle which algorithms to simulate.
                    </li>
                    <li>
                      <strong>Visualization Panel:</strong> Shows the state of memory frames at each step.
                    </li>
                    <li>
                      <strong>Metrics Panel:</strong> Displays performance statistics for each algorithm.
                    </li>
                    <li>
                      <strong>AI Recommendation:</strong> Provides insights about which algorithm performs best.
                    </li>
                  </ul>
                </div>
              </TabsContent>
              
              <TabsContent value="algorithms" className="mt-6 space-y-6">
                <div>
                  <h3 className="text-xl font-medium mb-3">FIFO (First-In-First-Out)</h3>
                  <p className="mb-3">
                    The FIFO algorithm replaces the page that has been in memory the longest. It works like a queue, 
                    where the first page loaded is the first page replaced when a new page needs to be loaded.
                  </p>
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h4 className="font-medium mb-2">Characteristics:</h4>
                    <ul className="list-disc pl-6">
                      <li>Simple to implement</li>
                      <li>Fair allocation of frames</li>
                      <li>May replace frequently used pages</li>
                      <li>Can suffer from Belady's Anomaly</li>
                    </ul>
                  </div>
                </div>
                
                <Separator />
                
                <div>
                  <h3 className="text-xl font-medium mb-3">LRU (Least Recently Used)</h3>
                  <p className="mb-3">
                    The LRU algorithm replaces the page that hasn't been used for the longest period of time. 
                    It assumes that pages used recently are likely to be used again soon.
                  </p>
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h4 className="font-medium mb-2">Characteristics:</h4>
                    <ul className="list-disc pl-6">
                      <li>Better performance than FIFO in most cases</li>
                      <li>Requires tracking when each page was last accessed</li>
                      <li>More complex to implement than FIFO</li>
                      <li>Immune to Belady's Anomaly</li>
                    </ul>
                  </div>
                </div>
                
                <Separator />
                
                <div>
                  <h3 className="text-xl font-medium mb-3">Optimal (Belady's Algorithm)</h3>
                  <p className="mb-3">
                    The Optimal algorithm replaces the page that will not be used for the longest period of time in the future. 
                    This provides the best possible performance but requires future knowledge of page references.
                  </p>
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h4 className="font-medium mb-2">Characteristics:</h4>
                    <ul className="list-disc pl-6">
                      <li>Theoretically optimal performance</li>
                      <li>Not implementable in real systems (requires future knowledge)</li>
                      <li>Serves as a benchmark for other algorithms</li>
                      <li>Immune to Belady's Anomaly</li>
                    </ul>
                  </div>
                </div>
                
                <div className="bg-amber-50 p-4 rounded-lg border border-amber-200">
                  <h4 className="font-medium flex items-center gap-2">
                    <Lightbulb className="h-4 w-4 text-amber-500" />
                    Belady's Anomaly:
                  </h4>
                  <p>
                    A phenomenon where increasing the number of page frames can sometimes lead to an increase in page faults.
                    This can occur with the FIFO algorithm but doesn't affect LRU or Optimal algorithms.
                  </p>
                </div>
              </TabsContent>
              
              <TabsContent value="metrics" className="mt-6 space-y-6">
                <div>
                  <h3 className="text-xl font-medium mb-3">Understanding Performance Metrics</h3>
                  <p className="mb-5">
                    The simulator calculates and displays several metrics to help you compare the efficiency of different algorithms:
                  </p>
                  
                  <div className="grid gap-6 md:grid-cols-2">
                    <div className="bg-white border rounded-lg p-4">
                      <h4 className="font-semibold text-lg mb-2">Page Faults</h4>
                      <p>
                        The total number of times a page was referenced but not found in memory, requiring a page to be loaded from secondary storage.
                        Lower page fault counts indicate better performance.
                      </p>
                    </div>
                    
                    <div className="bg-white border rounded-lg p-4">
                      <h4 className="font-semibold text-lg mb-2">Page Fault Rate</h4>
                      <p>
                        The percentage of page references that resulted in page faults. Calculated as (Page Faults / Total References) × 100%.
                        Lower rates indicate better performance.
                      </p>
                    </div>
                    
                    <div className="bg-white border rounded-lg p-4">
                      <h4 className="font-semibold text-lg mb-2">Hit Ratio</h4>
                      <p>
                        The percentage of page references that were found in memory. Calculated as (Hits / Total References) × 100%.
                        Higher hit ratios indicate better performance.
                      </p>
                    </div>
                    
                    <div className="bg-white border rounded-lg p-4">
                      <h4 className="font-semibold text-lg mb-2">Efficiency Index</h4>
                      <p>
                        A composite score that considers both page faults and memory utilization.
                        Higher efficiency indexes suggest better overall algorithm performance for the given scenario.
                      </p>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-xl font-medium mb-3">Comparing Algorithms</h3>
                  <p className="mb-3">
                    The metrics panel allows you to compare how different algorithms perform with the same reference string and frame count.
                    This helps you understand the strengths and weaknesses of each algorithm under various conditions.
                  </p>
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h4 className="font-medium mb-2">General Performance Patterns:</h4>
                    <ul className="list-disc pl-6">
                      <li>Optimal typically has the lowest page fault rate (theoretical best)</li>
                      <li>LRU often performs close to Optimal in real-world scenarios</li>
                      <li>FIFO is typically the least efficient but simplest to implement</li>
                      <li>Performance gaps between algorithms tend to widen with more complex reference patterns</li>
                    </ul>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="ai" className="mt-6 space-y-6">
                <div>
                  <h3 className="text-xl font-medium mb-3">AI Recommendation System</h3>
                  <p className="mb-5">
                    The simulator includes an AI-driven recommendation feature that analyzes the simulation results and provides insights:
                  </p>
                  
                  <div className="space-y-4">
                    <div className="bg-white border rounded-lg p-4">
                      <h4 className="font-semibold text-lg mb-2">Algorithm Recommendations</h4>
                      <p>
                        Based on the metrics, the AI suggests which algorithm would be most appropriate for the given reference pattern.
                        It considers factors like page fault rates, memory utilization, and access patterns.
                      </p>
                    </div>
                    
                    <div className="bg-white border rounded-lg p-4">
                      <h4 className="font-semibold text-lg mb-2">Pattern Analysis</h4>
                      <p>
                        The AI examines the reference string to identify patterns such as sequential access, random access, or locality of reference.
                        This helps explain why certain algorithms perform better or worse with the given input.
                      </p>
                    </div>
                    
                    <div className="bg-white border rounded-lg p-4">
                      <h4 className="font-semibold text-lg mb-2">Optimization Suggestions</h4>
                      <p>
                        The AI may provide suggestions for optimizing memory management, such as adjusting the frame count
                        or considering hybrid algorithms for certain types of access patterns.
                      </p>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-xl font-medium mb-3">Practical Applications</h3>
                  <p className="mb-3">
                    Understanding page replacement algorithms and their performance characteristics has practical applications in:
                  </p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>
                      <strong>Operating System Design:</strong> Choosing appropriate page replacement strategies for different workloads.
                    </li>
                    <li>
                      <strong>Database Management:</strong> Optimizing buffer cache replacement policies.
                    </li>
                    <li>
                      <strong>Web Caching:</strong> Improving performance of web servers and content delivery networks.
                    </li>
                    <li>
                      <strong>Mobile Applications:</strong> Managing limited memory resources on mobile devices.
                    </li>
                  </ul>
                </div>
              </TabsContent>
            </Tabs>

            <div>
              <h2 className="text-2xl font-semibold mb-4">Example Workflows</h2>
              
              <div className="space-y-6">
                <div className="bg-blue-50 p-6 rounded-lg">
                  <h3 className="text-xl font-medium mb-3">Example 1: Comparing FIFO vs LRU</h3>
                  <ol className="list-decimal pl-6 space-y-2">
                    <li>Enter reference string: 1, 2, 3, 4, 1, 2, 5, 1, 2, 3, 4, 5</li>
                    <li>Set frame count to 3</li>
                    <li>Select both FIFO and LRU algorithms</li>
                    <li>Run the simulation and observe the difference in page faults</li>
                    <li>Notice how LRU typically performs better by keeping recently used pages in memory</li>
                  </ol>
                </div>
                
                <div className="bg-blue-50 p-6 rounded-lg">
                  <h3 className="text-xl font-medium mb-3">Example 2: Demonstrating Belady's Anomaly</h3>
                  <ol className="list-decimal pl-6 space-y-2">
                    <li>Enter reference string: 1, 2, 3, 4, 1, 2, 5, 1, 2, 3, 4, 5</li>
                    <li>Run simulation with FIFO algorithm using 3 frames and note the page faults</li>
                    <li>Increase frame count to 4 and run again</li>
                    <li>Observe that page faults may increase despite having more frames (Belady's Anomaly)</li>
                    <li>Compare with LRU which doesn't exhibit this anomaly</li>
                  </ol>
                </div>
                
                <div className="bg-blue-50 p-6 rounded-lg">
                  <h3 className="text-xl font-medium mb-3">Example 3: Exploring Optimal Algorithm</h3>
                  <ol className="list-decimal pl-6 space-y-2">
                    <li>Enter a reference string with some repeating pattern</li>
                    <li>Select all three algorithms (FIFO, LRU, Optimal)</li>
                    <li>Run the simulation and step through manually</li>
                    <li>Observe how Optimal always makes the best choice by "looking ahead"</li>
                    <li>Note the performance gap between practical algorithms (FIFO, LRU) and the theoretical best (Optimal)</li>
                  </ol>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="text-center">
          <Link to="/">
            <Button className="gap-2">
              <ArrowLeft className="h-4 w-4" />
              Return to Simulator
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Documentation;
