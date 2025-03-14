
import React from "react";
import { useSimulation } from "@/context/SimulationContext";
import { cn } from "@/lib/utils";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts";
import { calculatePageFaultRate } from "@/lib/algorithms";

const MetricsPanel: React.FC = () => {
  const { simulationResults, referenceString } = useSimulation();
  
  const hasResults = Object.values(simulationResults).some(result => result !== null);
  
  if (!hasResults) {
    return (
      <div className="glassmorphism rounded-2xl p-6 animate-slide-in" style={{ animationDelay: "200ms" }}>
        <h3 className="text-lg font-medium mb-2" id="metrics">Performance Metrics</h3>
        <p className="text-sm text-muted-foreground mb-6">
          Run a simulation to see performance metrics
        </p>
        
        <div className="flex flex-col items-center justify-center h-40 text-center border border-dashed rounded-xl border-border">
          <p className="text-muted-foreground">No data available</p>
        </div>
      </div>
    );
  }
  
  // Prepare data for the bar chart
  const chartData = Object.entries(simulationResults)
    .filter(([_, result]) => result !== null)
    .map(([algorithm, result]) => ({
      name: algorithm,
      pageFaults: result!.pageFaults,
      rate: calculatePageFaultRate(result!.pageFaults, referenceString.length)
    }));
  
  // Find the best algorithm (lowest page faults)
  const bestAlgorithm = chartData.reduce(
    (best, current) => (current.pageFaults < best.pageFaults ? current : best),
    chartData[0]
  );
  
  return (
    <div className="glassmorphism rounded-2xl p-6 animate-slide-in" style={{ animationDelay: "200ms" }}>
      <h3 className="text-lg font-medium mb-2" id="metrics">Performance Metrics</h3>
      <p className="text-sm text-muted-foreground mb-6">
        Compare page fault counts and efficiency across algorithms
      </p>
      
      <div className="mb-8 h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={chartData}
            margin={{ top: 10, right: 10, left: 0, bottom: 20 }}
          >
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
            <XAxis dataKey="name" tick={{ fontSize: 12 }} />
            <YAxis 
              tick={{ fontSize: 12 }} 
              domain={[0, 'dataMax']} 
              allowDecimals={false}
              label={{ 
                value: 'Page Faults', 
                angle: -90, 
                position: 'insideLeft', 
                style: { fontSize: 12, textAnchor: 'middle' },
                offset: -5
              }}
            />
            <Tooltip 
              formatter={(value) => [`${value} page faults`, ""]}
              contentStyle={{ borderRadius: 8, border: "none", boxShadow: "0 4px 12px rgba(0,0,0,0.05)" }}
            />
            <Bar dataKey="pageFaults" radius={[4, 4, 0, 0]}>
              {chartData.map((entry, index) => (
                <Cell 
                  key={`cell-${index}`} 
                  fill={entry.name === bestAlgorithm.name ? "hsl(var(--primary))" : "hsl(var(--primary) / 0.5)"} 
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
      
      <div className="grid gap-4 md:grid-cols-3">
        {chartData.map((data) => (
          <div 
            key={data.name}
            className={cn(
              "border rounded-xl p-4",
              data.name === bestAlgorithm.name 
                ? "border-primary/30 bg-primary/5" 
                : "border-border"
            )}
          >
            <div className="text-xs text-muted-foreground mb-1">
              {data.name}
            </div>
            <div className="text-2xl font-medium mb-1">
              {data.pageFaults} <span className="text-sm font-normal text-muted-foreground">faults</span>
            </div>
            <div className="text-xs">
              {data.rate.toFixed(1)}% fault rate
            </div>
            {data.name === bestAlgorithm.name && (
              <div className="mt-2 text-xs font-medium text-primary">
                Best performance
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MetricsPanel;
