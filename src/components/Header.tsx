
import React from "react";
import { ChevronDown } from "lucide-react";

const Header: React.FC = () => {
  return (
    <header className="w-full py-6 px-8 flex justify-between items-center glassmorphism sticky top-0 z-50 mb-8 animate-fade-in">
      <div className="flex items-center gap-2">
        <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-primary to-primary/70 flex items-center justify-center shadow-sm">
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            className="w-5 h-5 text-white"
          >
            <rect x="2" y="2" width="20" height="8" rx="2" ry="2" />
            <rect x="2" y="14" width="20" height="8" rx="2" ry="2" />
            <line x1="6" y1="6" x2="6" y2="6" />
            <line x1="6" y1="18" x2="6" y2="18" />
          </svg>
        </div>
        <div>
          <h1 className="text-xl font-medium leading-tight tracking-tight">Page Replacement Simulator</h1>
          <p className="text-xs text-muted-foreground">Visualize and compare algorithm efficiency</p>
        </div>
      </div>
      
      <div className="hidden md:flex items-center gap-6">
        <NavLink href="#algorithms">Algorithms</NavLink>
        <NavLink href="#visualization">Visualization</NavLink>
        <NavLink href="#metrics">Performance</NavLink>
        <NavLink href="#ai-insights">AI Insights</NavLink>
      </div>

      <div className="md:hidden">
        <button className="p-2 rounded-lg hover:bg-secondary flex items-center gap-1 text-sm">
          Menu <ChevronDown className="w-4 h-4" />
        </button>
      </div>
    </header>
  );
};

const NavLink: React.FC<{ href: string; children: React.ReactNode }> = ({ href, children }) => {
  return (
    <a 
      href={href} 
      className="text-sm text-muted-foreground hover:text-foreground transition-colors relative after:absolute after:bottom-[-2px] after:left-0 after:w-0 after:h-[2px] after:bg-primary after:transition-all hover:after:w-full"
    >
      {children}
    </a>
  );
};

export default Header;
