import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { componentsData } from '../data';
import BasePlate from '../components/BasePlate';
import { ArrowLeft, Code, Terminal, Box, Zap, Info, ChevronRight, Share2 } from 'lucide-react';

const ComponentDetail = () => {
  const { id } = useParams();
  const component = componentsData.find((c) => c.id === id);

  if (!component) {
    return (
      <BasePlate>
        <div className="min-h-screen flex flex-col items-center justify-center text-center space-y-8">
          <h1 className="text-6xl font-black tracking-tightest text-foreground">Brick Not Found</h1>
          <Link to="/" className="text-brick-blue font-black hover:underline flex items-center uppercase tracking-widest text-sm">
            <ArrowLeft className="mr-2 w-4 h-4" />
            Back to Baseplate
          </Link>
        </div>
      </BasePlate>
    );
  }

  // Physical color mapping using standard Tailwind colors for reliability
  const themes = {
    blue: {
      bg: 'bg-blue-600',
      text: 'text-blue-600',
      glow: 'shadow-blue-600/40',
      lightBg: 'bg-blue-50',
      isLight: false
    },
    red: {
      bg: 'bg-red-600',
      text: 'text-red-600',
      glow: 'shadow-red-600/40',
      lightBg: 'bg-red-50',
      isLight: false
    },
    yellow: {
      bg: 'bg-yellow-400',
      text: 'text-yellow-600',
      glow: 'shadow-yellow-400/40',
      lightBg: 'bg-yellow-50',
      isLight: true
    },
    green: {
      bg: 'bg-green-600',
      text: 'text-green-600',
      glow: 'shadow-green-600/40',
      lightBg: 'bg-green-50',
      isLight: false
    },
    orange: {
      bg: 'bg-orange-500',
      text: 'text-orange-600',
      glow: 'shadow-orange-500/40',
      lightBg: 'bg-orange-50',
      isLight: false
    },
    purple: {
      bg: 'bg-purple-600',
      text: 'text-purple-600',
      glow: 'shadow-purple-600/40',
      lightBg: 'bg-purple-50',
      isLight: false
    },
    white: {
      bg: 'bg-white',
      text: 'text-black',
      glow: 'shadow-black/5',
      lightBg: 'bg-zinc-100',
      isLight: true
    }
  };

  const theme = themes[component.color] || themes.white;
  const isDarkBrick = component.color !== 'yellow' && component.color !== 'white';

  return (
    <BasePlate>
      <div className="min-h-screen pt-32 pb-48 px-6">
        <div className="max-w-7xl mx-auto space-y-32">
          {/* Breadcrumb & Meta */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
            <Link to="/" className="inline-flex items-center space-x-3 text-black hover:text-brick-blue transition-colors group font-black uppercase tracking-[0.2em] text-xs">
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-2 transition-transform" />
              <span>Back to Baseplate</span>
            </Link>
            <div className="flex items-center space-x-4">
              <span className="text-[10px] font-black uppercase tracking-widest text-black bg-zinc-100 px-3 py-1 rounded-full">
                Series: 803 Edge AI
              </span>
            </div>
          </div>

          {/* Hero Section - 3D Brick Style */}
          <section className="flex flex-col lg:flex-row items-center gap-24">
            <div className="flex-1 space-y-12">
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className={`inline-flex items-center space-x-3 px-6 py-3 rounded-2xl ${theme.lightBg} border-2 border-current ${theme.text} text-xs font-black uppercase tracking-[0.4em]`}
              >
                <Zap size={16} fill="currentColor" />
                <span className="text-black">Active Module</span>
              </motion.div>
              
              <div className="space-y-8">
                <motion.h1 
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-7xl md:text-9xl font-black tracking-tightest leading-[0.85] text-black"
                >
                  {component.name}
                </motion.h1>
                <motion.p 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="text-2xl md:text-3xl text-zinc-800 font-bold leading-relaxed max-w-2xl"
                >
                  {component.description}
                </motion.p>
              </div>
            </div>

            <motion.div 
              initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ type: 'spring', stiffness: 100, damping: 20 }}
              className="flex-1 w-full max-w-xl relative group"
            >
              {/* 3D "Solid Plastic" Brick Header - USING THE MODULE'S COLOR */}
              <div className={`
                relative rounded-[4rem] p-12 polished-plastic shadow-brick transition-all duration-500
                ${theme.bg} text-black
                group-hover:-translate-y-4 group-hover:shadow-brick-hover
              `}>
                {/* 4 Iconic Studs - Corner placement */}
                <div className="absolute top-8 left-8 w-10 h-10 rounded-full brick-stud" style={{ backgroundColor: 'inherit' }} />
                <div className="absolute top-8 right-8 w-10 h-10 rounded-full brick-stud" style={{ backgroundColor: 'inherit' }} />
                <div className="absolute bottom-8 left-8 w-10 h-10 rounded-full brick-stud" style={{ backgroundColor: 'inherit' }} />
                <div className="absolute bottom-8 right-8 w-10 h-10 rounded-full brick-stud" style={{ backgroundColor: 'inherit' }} />

                <div className="relative z-10 space-y-10">
                  <div className="aspect-square rounded-[3.5rem] border-8 border-black/10 shadow-2xl bg-white/40 backdrop-blur-md p-8 flex items-center justify-center">
                    <img 
                      src={component.image} 
                      alt={component.name} 
                      className="max-w-full max-h-full object-contain"
                    />
                  </div>
                  <div className="flex items-center justify-between font-black uppercase tracking-[0.2em] text-xs text-black opacity-60">
                    <span>{id.toUpperCase()} MODULE</span>
                    <Box size={16} />
                  </div>
                </div>
              </div>
            </motion.div>
          </section>

          {/* Technical Specifications Audit */}
          <section className="space-y-16">
            <div className="flex items-center justify-between border-b-4 border-grid-dot pb-8">
              <div className="flex items-center space-x-4">
                <div className={`p-3 rounded-2xl ${theme.bg} ${theme.isLight ? 'text-black' : 'text-white'}`}>
                  <Info size={24} />
                </div>
                <h2 className="text-4xl font-black tracking-tightest text-black uppercase">Technical Specifications</h2>
              </div>
            </div>

            <div className="w-full">
              {/* Detailed Specs Column */}
              {component.detailedSpecs ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {component.detailedSpecs.map((section, idx) => (
                    <motion.div 
                      key={section.title}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: idx * 0.1 }}
                      className="bg-white p-10 rounded-[3rem] border-2 border-grid-dot space-y-8 shadow-sm"
                    >
                      <h3 className={`text-2xl font-black tracking-tightest uppercase ${theme.text}`}>{section.title}</h3>
                      <div className="space-y-4">
                        {Object.entries(section.items).map(([key, value]) => (
                          <div key={key} className="flex justify-between items-center border-b border-grid-dot pb-4 group">
                            <span className="text-zinc-500 font-bold uppercase text-xs tracking-widest">{key}</span>
                            <span className="text-black font-black text-lg group-hover:scale-105 transition-transform origin-right">{value}</span>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                  {Object.entries(component.specs).map(([key, value], idx) => (
                    <motion.div 
                      key={key}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: idx * 0.1 }}
                      className="bg-white p-12 rounded-4xl border-2 border-grid-dot space-y-4 hover:border-black/20 transition-all shadow-sm group"
                    >
                      <span className={`text-xs font-black uppercase tracking-[0.2em] ${theme.text}`}>{key}</span>
                      <p className="text-3xl font-black text-black group-hover:scale-105 transition-transform origin-left">{value}</p>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>
          </section>

          {/* Schematic Diagram Section - New Full Width Section */}
          {component.schematic && (
            <section className="space-y-16">
              <div className="flex items-center justify-between border-b-4 border-grid-dot pb-8">
                <div className="flex items-center space-x-4">
                  <div className={`p-3 rounded-2xl ${theme.bg} ${theme.isLight ? 'text-black' : 'text-white'}`}>
                    <Box size={24} />
                  </div>
                  <h2 className="text-4xl font-black tracking-tightest text-black uppercase">Schematic Diagram</h2>
                </div>
              </div>

              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-white p-12 md:p-24 rounded-[5rem] border-4 border-grid-dot shadow-inner overflow-hidden"
              >
                <div className="w-full flex flex-col items-center space-y-12">
                  <div className="w-full max-w-6xl aspect-auto rounded-[4rem] border-8 border-zinc-50 bg-white p-8 shadow-2xl">
                    <img 
                      src={component.schematic} 
                      alt={`${component.name} Schematic`} 
                      className="w-full h-auto object-contain"
                    />
                  </div>
                  <div className="max-w-3xl text-center space-y-6">
                    <p className="text-2xl text-zinc-600 font-bold leading-relaxed italic">
                      "Official eBrick technical reference for pin mapping and internal hardware architecture. Use this diagram to verify connection protocols."
                    </p>
                    <div className="flex justify-center items-center space-x-4 text-xs font-black uppercase tracking-[0.4em] text-zinc-400">
                      <div className="w-12 h-1 bg-current" />
                      <span>Technical Reference Ver 1.0</span>
                      <div className="w-12 h-1 bg-current" />
                    </div>
                  </div>
                </div>
              </motion.div>
            </section>
          )}

          {/* Implementation Content */}
          <section className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Quick Start Guide */}
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-white p-16 rounded-[4rem] border-2 border-grid-dot space-y-12 relative overflow-hidden shadow-sm"
            >
              <div className="flex items-center space-x-6 relative z-10">
                <div className={`w-16 h-16 ${theme.bg} rounded-3xl flex items-center justify-center shadow-lg`}>
                  <Zap className={`w-8 h-8 ${theme.isLight ? 'text-black' : 'text-white'} fill-current`} />
                </div>
                <h3 className="text-5xl font-black tracking-tightest text-black">Snap Guide</h3>
              </div>
              
              <div className="space-y-8 relative z-10">
                <div className="space-y-6">
                  {component.quickStart.connection.map((step, idx) => (
                    <div key={idx} className="flex items-center space-x-6 group">
                      <div className={`w-12 h-12 rounded-full ${theme.bg} flex items-center justify-center text-sm font-black ${theme.isLight ? 'text-black' : 'text-white'} border-4 border-black/5 shadow-md`}>
                        {idx + 1}
                      </div>
                      <span className="text-black text-xl font-bold tracking-tight group-hover:translate-x-3 transition-transform">{step}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Code Snippet - Dark Contrast for Code */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-[#1d1d1f] p-16 rounded-[4rem] space-y-12 relative shadow-2xl"
            >
              <div className="flex items-center justify-between relative z-10">
                <div className="flex items-center space-x-6">
                  <div className="w-16 h-16 bg-white/10 rounded-3xl flex items-center justify-center">
                    <Terminal className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-5xl font-black tracking-tightest text-white">Copy Code</h3>
                </div>
                <button 
                  onClick={() => {
                    navigator.clipboard.writeText(component.quickStart.code);
                    alert('Code copied to clipboard!');
                  }}
                  className="p-4 rounded-2xl bg-white/10 hover:bg-white/20 text-white transition-all border border-white/10"
                >
                  <Code size={24} />
                </button>
              </div>

              <div className="relative z-10 bg-black/40 rounded-3xl p-10 border border-white/5 overflow-hidden">
                <pre className="text-lg font-mono leading-relaxed overflow-x-auto custom-scrollbar text-white/90">
                  <code className="block">
                    {component.quickStart.code}
                  </code>
                </pre>
              </div>

              <div className="flex items-center space-x-3 text-[10px] font-black tracking-[0.4em] text-white/40 uppercase">
                <div className="w-2.5 h-2.5 rounded-full bg-brick-green shadow-[0_0_15px_rgba(36,138,61,0.6)]" />
                <span>Verified eBrick Protocol</span>
              </div>
            </motion.div>
          </section>

          {/* CTA - High Visibility */}
          <section className="pt-24">
            <div className={`
              relative p-24 rounded-[5rem] text-center space-y-12 overflow-hidden
              ${theme.bg} ${theme.isLight ? 'text-foreground' : 'text-white'} shadow-brick-hover
            `}>
              <div className="absolute inset-0 polished-plastic opacity-25" />
              <h2 className="text-6xl md:text-9xl font-black tracking-tightest relative z-10 leading-none">Ready to Build?</h2>
              <p className="text-2xl md:text-3xl font-bold opacity-90 max-w-3xl mx-auto relative z-10">
                Download the 803 series datasheet or start your next lesson in the Academy.
              </p>
              <div className="flex flex-col sm:flex-row justify-center items-center gap-8 relative z-10 pt-12">
                <button className="px-16 py-8 rounded-[2.5rem] font-black bg-white text-foreground hover:scale-105 active:scale-95 transition-all text-2xl shadow-2xl">
                  Download Docs
                </button>
                <Link to="/" className="px-16 py-8 rounded-[2.5rem] font-black bg-black/15 hover:bg-black/25 text-current transition-all text-2xl border-4 border-current">
                  Back to Board
                </Link>
              </div>
            </div>
          </section>
        </div>
      </div>
    </BasePlate>
  );
};

export default ComponentDetail;
