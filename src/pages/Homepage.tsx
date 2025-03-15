import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Layers, BarChart2, Zap, GitBranch, Shield, Activity } from "lucide-react";

const HomePage = () => {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.1 }
    );

    const animatedElements = document.querySelectorAll(".animate-on-scroll");
    animatedElements.forEach((el) => observer.observe(el));

    return () => {
      animatedElements.forEach((el) => observer.unobserve(el));
    };
  }, []);

  const algorithms = [
    {
      title: "First In, First Out",
      acronym: "FIFO",
      description: "Replaces the page that has been in memory the longest time, disregarding usage frequency or patterns.",
      icon: <Layers className="h-5 w-5 text-primary" />
    },
    {
      title: "Least Recently Used",
      acronym: "LRU",
      description: "Replaces pages that haven't been accessed for the longest period of time, tracking usage history.",
      icon: <Activity className="h-5 w-5 text-primary" />
    },
    {
      title: "Optimal Page Replacement",
      acronym: "OPT",
      description: "Replaces the page that won't be used for the longest time in the future, providing theoretical best performance.",
      icon: <Zap className="h-5 w-5 text-primary" />
    },
    {
      title: "Clock Algorithm",
      acronym: "CLK",
      description: "An efficient approximation of LRU using a circular queue with a reference bit for each page frame.",
      icon: <GitBranch className="h-5 w-5 text-primary" />
    },
    {
      title: "Second Chance",
      acronym: "SC",
      description: "A modified FIFO that gives pages a second chance before replacement if they've been recently accessed.",
      icon: <Shield className="h-5 w-5 text-primary" />
    },
    {
      title: "Not Frequently Used",
      acronym: "NFU",
      description: "Tracks frequency of page usage with counters and replaces the least frequently used pages.",
      icon: <BarChart2 className="h-5 w-5 text-primary" />
    }
  ];

  const features = [
    {
      icon: <BarChart2 className="h-8 w-8 text-primary" />,
      title: "Real-time Performance Metrics",
      description: "Track page faults, hit ratios, and efficiency metrics as algorithms process reference strings in real-time."
    },
    {
      icon: <Layers className="h-8 w-8 text-primary" />,
      title: "Multi-Algorithm Comparison",
      description: "Run multiple page replacement algorithms simultaneously to directly compare their performance characteristics."
    },
    {
      icon: <GitBranch className="h-8 w-8 text-primary" />,
      title: "Customizable Parameters",
      description: "Adjust frame counts, reference strings, and algorithm-specific settings to test various memory scenarios."
    },
    {
      icon: <Shield className="h-8 w-8 text-primary" />,
      title: "Advanced Visualizations",
      description: "View detailed step-by-step animations that illustrate how each algorithm makes replacement decisions."
    },
    {
      icon: <Zap className="h-8 w-8 text-primary" />,
      title: "Performance Analysis",
      description: "Generate comprehensive reports with statistical analysis of algorithm behavior across different workloads."
    },
    {
      icon: <Activity className="h-8 w-8 text-primary" />,
      title: "Interactive Learning",
      description: "Engage with guided tutorials and challenges designed to deepen understanding of memory management concepts."
    }
  ];

  const referenceString = [1, 3, 0, 3, 5, 6, 3, 1, 4, 2, 5, 0, 3, 1, 5];
  const frames = [
    [-1, -1, -1, -1],
    [1, -1, -1, -1],
    [1, 3, -1, -1],
    [1, 3, 0, -1],
    [1, 3, 0, -1],
    [1, 3, 0, 5],
    [6, 3, 0, 5],
    [6, 3, 0, 5],
    [6, 3, 1, 5],
    [6, 4, 1, 5],
    [6, 4, 1, 2],
    [5, 4, 1, 2],
    [5, 0, 1, 2],
    [5, 0, 3, 2],
    [5, 0, 3, 1],
    [5, 0, 3, 1],
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* NavBar */}
      <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 py-4 px-6 md:px-10 bg-white/80 backdrop-blur-md shadow-sm">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link
            to="/"
            className="font-medium text-lg text-foreground tracking-tight flex items-center gap-2"
          >
            <div className="h-8 w-8 rounded-md bg-primary flex items-center justify-center">
              <div className="text-white font-semibold">PS</div>
            </div>
            <span className="font-medium">Page Simulator</span>
          </Link>

          <nav className="hidden md:flex items-center space-x-8">
            <Link
              to="/"
              className="text-sm text-foreground/70 hover:text-foreground transition-colors"
            >
              Home
            </Link>
            <Link
              to="/simulator"
              className="text-sm text-foreground/70 hover:text-foreground transition-colors"
            >
              Simulator
            </Link>
            <Link
              to="/documentation"
              className="text-sm text-foreground/70 hover:text-foreground transition-colors"
            >
              Documentation
            </Link>
          </nav>

          <div className="flex items-center space-x-4">
            <Link
              to="/simulator"
              className="hidden md:flex px-4 py-2 text-sm font-medium text-primary-foreground bg-primary rounded-md hover:bg-primary/90 transition-colors"
            >
              Launch Simulator
            </Link>
            <button className="inline-flex md:hidden items-center justify-center p-2 rounded-md text-foreground">
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative pt-36 pb-24 overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,hsl(var(--primary)/10),transparent)]"></div>
        
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="container px-4 mx-auto"
        >
          <div className="max-w-4xl mx-auto text-center">
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="inline-block px-4 py-1.5 mb-6 text-sm font-medium bg-primary/10 text-primary rounded-full"
            >
              Advanced Memory Management Simulation
            </motion.span>
            
            <motion.h1
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-5xl sm:text-6xl md:text-7xl font-bold leading-tight tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/70"
            >
              Master Page Replacement <span className="text-primary">Algorithms</span>
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="mt-6 text-xl text-muted-foreground max-w-3xl mx-auto text-balance"
            >
              Visualize, analyze, and understand memory management techniques with our interactive 
              simulation platform designed for students, educators, and OS enthusiasts.
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="mt-10 flex flex-wrap justify-center gap-4"
            >
              <Link
                to="/simulator"
                className="px-8 py-4 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors shadow-lg shadow-primary/10 flex items-center gap-2 font-medium"
              >
                Start Simulation <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                to="/simulator"
                className="px-8 py-4 bg-secondary text-foreground rounded-lg hover:bg-secondary/80 transition-colors flex items-center gap-2 font-medium"
              >
                Explore Algorithms
              </Link>
            </motion.div>
          </div>
        </motion.div>

        <div className="absolute top-1/3 -left-20 w-80 h-80 bg-primary/5 rounded-full blur-3xl -z-10"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -z-10"></div>
      </section>

      {/* Features overview */}
      <section className="py-20 bg-secondary/30">
        <div className="container px-4 mx-auto">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="text-3xl md:text-4xl font-bold tracking-tight"
              >
                Why Use Our Simulator?
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto"
              >
                Designed with both beginners and experts in mind, our simulator offers
                unmatched visualization and analytical capabilities
              </motion.p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="p-8 rounded-2xl bg-background border border-border/50 shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="bg-primary/10 rounded-full w-16 h-16 flex items-center justify-center mb-5">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Demo */}
      <section className="py-24">
        <div className="container px-4 mx-auto">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="text-3xl md:text-4xl font-bold tracking-tight"
              >
                Interactive Visualization
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto"
              >
                Watch algorithms in action with step-by-step visualization
              </motion.p>
            </div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-white/80 backdrop-blur-sm border border-border rounded-2xl shadow-lg overflow-hidden"
            >
              <div className="bg-secondary/50 p-6 border-b border-border flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <span className="text-primary font-semibold">FIFO</span>
                  </div>
                  <div>
                    <h3 className="font-medium">First In, First Out Algorithm</h3>
                    <p className="text-sm text-muted-foreground">Simulating with 4 frames</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="px-4 py-2 bg-primary/10 rounded-md text-primary font-medium">
                    Page Faults: 12
                  </div>
                  <div className="px-4 py-2 bg-secondary rounded-md font-medium">
                    Hit Ratio: 20%
                  </div>
                </div>
              </div>

              <div className="p-8">
                <div className="mb-8">
                  <h4 className="text-sm font-medium text-muted-foreground mb-3">Reference String:</h4>
                  <div className="flex flex-wrap gap-2">
                    {referenceString.map((page, index) => (
                      <div 
                        key={index} 
                        className={`flex-shrink-0 h-10 w-10 rounded-md flex items-center justify-center font-medium ${
                          index === 5 ? "bg-primary text-white" : "bg-secondary text-foreground"
                        }`}
                      >
                        {page}
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-medium text-muted-foreground mb-3">Memory Frames:</h4>
                  <div className="grid grid-cols-1 gap-4">
                    {[0, 1, 2, 3].map((frameIndex) => (
                      <div 
                        key={frameIndex} 
                        className="h-16 bg-background border border-border rounded-md flex items-center relative overflow-hidden"
                      >
                        <div className="absolute top-2 left-3 text-xs text-muted-foreground">
                          Frame {frameIndex}
                        </div>
                        
                        <div className="w-full flex justify-center">
                          {frames[6][frameIndex] !== -1 ? (
                            <motion.div
                              initial={{ scale: 0.8, opacity: 0 }}
                              animate={{ scale: 1, opacity: 1 }}
                              className={`h-10 w-10 ${
                                frameIndex === 0 ? "bg-primary/10" : "bg-secondary"
                              } rounded-md flex items-center justify-center`}
                            >
                              <span className={`${
                                frameIndex === 0 ? "text-primary" : "text-foreground"
                              } font-medium`}>{frames[6][frameIndex]}</span>
                            </motion.div>
                          ) : (
                            <span className="text-sm text-muted-foreground">Empty</span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Algorithms */}
      <section className="py-20 bg-secondary/30">
        <div className="container px-4 mx-auto">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <motion.span
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="inline-block px-4 py-1.5 mb-4 text-sm font-medium bg-primary/10 text-primary rounded-full"
              >
                Comprehensive Coverage
              </motion.span>
              
              <motion.h2
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="text-3xl md:text-4xl font-bold tracking-tight"
              >
                Supported Algorithms
              </motion.h2>
              
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto"
              >
                Explore and compare the behavior of these essential page replacement strategies
              </motion.p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {algorithms.map((algorithm, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-sm border border-border/50 flex flex-col h-full"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
                      {algorithm.icon}
                      <span className="ml-1 text-primary font-semibold">{algorithm.acronym}</span>
                    </div>
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{algorithm.title}</h3>
                  <p className="text-muted-foreground text-sm flex-grow">{algorithm.description}</p>
                  <div className="mt-6 pt-4 border-t border-border">
                    <Link to="/simulator" className="text-sm font-medium text-primary hover:text-primary/80 transition-colors flex items-center gap-1">
                      Learn more <ArrowRight className="h-3.5 w-3.5" />
                    </Link>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA */}
      <section className="py-24 bg-gradient-to-b from-background to-secondary/30">
        <div className="container px-4 mx-auto">
          <div className="max-w-4xl mx-auto text-center">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-3xl md:text-4xl font-bold tracking-tight"
            >
              Ready to Master Page Replacement?
            </motion.h2>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto"
            >
              Start your journey with our state-of-the-art simulator and deepen your understanding of operating system memory management
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mt-10"
            >
              <Link
                to="/simulator"
                className="px-8 py-4 text-base font-medium text-primary-foreground bg-primary rounded-lg hover:bg-primary/90 transition-colors shadow-lg shadow-primary/10 inline-flex items-center"
              >
                Launch Simulator
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
