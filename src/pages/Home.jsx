import React from 'react';
import { motion } from 'framer-motion';
import { componentsData } from '../data';
import ComponentCard from '../components/ComponentCard';
import BasePlate from '../components/BasePlate';
import { ArrowRight, Sparkles, BoxSelect, Zap } from 'lucide-react';

const Home = () => {
  return (
    <BasePlate>
      <div className="min-h-screen pt-24 pb-32">
        {/* Hero Section - Text Left, Massive Photo Right */}
        <section className="relative py-32 px-6 overflow-visible">
          <div className="max-w-[1600px] mx-auto flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
            {/* Colorful Title Section (Left) */}
            <div className="flex-1 text-center lg:text-left space-y-16 z-20">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="inline-flex items-center space-x-4 px-8 py-4 rounded-3xl bg-white border-4 border-zinc-200 text-brick-blue text-sm font-black uppercase tracking-[0.5em] shadow-xl"
              >
                <Sparkles size={24} fill="currentColor" />
                <span className="text-zinc-950">Series 803 Edition</span>
              </motion.div>

              <div className="space-y-10">
                <motion.h1
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8 }}
                  className="text-8xl md:text-[13rem] font-black tracking-tightest leading-[0.75] text-black"
                >
                  <span className="glow-outline-red">Snap.</span> <br />
                  <span className="glow-outline-yellow">Code.</span> <br />
                  <span className="glow-outline-blue">Evolve.</span>
                </motion.h1>
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="text-3xl md:text-5xl text-black max-w-2xl leading-relaxed font-black pt-10"
                >
                  Modular Edge AI, <br />
                  <span className="text-zinc-800">Redefined for Creators.</span>
                </motion.p>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="flex flex-col sm:flex-row space-y-6 sm:space-y-0 sm:space-x-12 pt-16 justify-center lg:justify-start"
              >
                <button className="bg-white text-zinc-950 px-16 py-8 rounded-[3rem] font-black hover:bg-zinc-50 transition-all border-4 border-zinc-200 shadow-2xl text-3xl">
                  Watch Demo
                </button>
              </motion.div>
            </div>
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.85, x: 100 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              transition={{ duration: 1.5, type: 'spring', bounce: 0.3 }}
              className="w-full max-w-7xl relative z-10 pt-20"
            >
              <div className="relative rounded-[6rem] overflow-hidden border-[40px] border-cyan-500 shadow-[0_120px_200px_-50px_rgba(0,0,0,0.4)] bg-cyan-500 p-4">
                <img 
                  src="https://cec.clphs.oncloud.my/web/image/4231-65dc2d5b/WhatsApp%20Image%202026-03-21%20at%203.39.50%20PM.jpeg" 
                  alt="eBricks 803 Poster" 
                  className="w-full h-auto object-contain rounded-[4rem]"
                />
              </div>
              
              {/* Extra Glow behind the poster */}
              <div className="absolute -inset-20 bg-cyan-500/20 blur-[150px] -z-10 rounded-full" />
            </motion.div>
          </div>
        </section>

        {/* Collection Section - Solid Black Titles */}
        <section id="edge-ai" className="py-48 px-6">
          <div className="max-w-7xl mx-auto space-y-32">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-12 border-b-8 border-zinc-200 pb-16">
              <div className="space-y-8">
                <div className="flex items-center space-x-3 text-brick-blue font-black tracking-[0.4em] text-sm uppercase">
                  <BoxSelect className="w-5 h-5" />
                  <span className="text-black">The Collection</span>
                </div>
                <h2 className="text-6xl md:text-8xl font-black tracking-tightest leading-[0.9] text-black">
                  803 Series <br />
                  <span className="text-black">Modules.</span>
                </h2>
              </div>
              <p className="text-zinc-900 max-w-md text-2xl leading-relaxed font-black italic">
                Every component is a solid eBrick. 
                Color-coded for function, 
                built for performance.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-12">
              {componentsData.map((component, index) => (
                <ComponentCard 
                  key={component.id} 
                  component={component} 
                  index={index}
                />
              ))}
            </div>
          </div>
        </section>

        {/* Academy Section - Solid Contrast */}
        <section className="py-48 px-6 bg-white border-y-8 border-zinc-200">
          <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-24">
            <div className="flex-1 space-y-12">
              <div className="flex items-center space-x-4 text-brick-purple font-black tracking-widest text-sm uppercase">
                <Zap className="fill-current" />
                <span className="text-black">eBricks Academy</span>
              </div>
              <h2 className="text-5xl md:text-7xl font-black tracking-tightest leading-[0.9] text-black">
                Master AI. <br />
                <span className="text-brick-purple">Brick by Brick.</span>
              </h2>
              <p className="text-zinc-700 text-2xl font-black leading-relaxed max-w-2xl">
                Unlock the full potential of your 803 set with our 
                step-by-step technical guides and hands-on 
                Edge AI lessons.
              </p>
              <button className="bg-brick-purple text-white px-12 py-6 rounded-[2rem] font-black hover:scale-105 transition-all shadow-2xl shadow-brick-purple/40 text-xl">
                Start Learning
              </button>
            </div>
            <div className="flex-1 grid grid-cols-2 gap-8 w-full">
              {[
                { label: 'Gestures', color: 'bg-brick-blue' },
                { label: 'Sensors', color: 'bg-brick-orange' },
                { label: 'Displays', color: 'bg-brick-green' },
                { label: 'Logic', color: 'bg-brick-red' }
              ].map((item) => (
                <div key={item.label} className={`${item.color} aspect-square rounded-[3.5rem] p-12 flex flex-col justify-end shadow-2xl polished-plastic group hover:-translate-y-4 transition-transform duration-300`}>
                  <span className="text-white font-black text-3xl tracking-tightest">{item.label}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </BasePlate>
  );
};

export default Home;
