import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Box, Menu, Search, ShoppingBag } from 'lucide-react';

const Navbar = () => {
  const location = useLocation();
  const isHome = location.pathname === '/';

  return (
    <nav className="fixed top-8 left-1/2 -translate-x-1/2 z-50 w-[calc(100%-4rem)] max-w-6xl">
      <div className="bg-white rounded-[2.5rem] border-4 border-zinc-200 px-10 h-24 flex items-center justify-between shadow-2xl">
        <Link to="/" className="flex items-center space-x-4 group">
          <div className="w-12 h-12 rounded-2xl bg-brick-blue flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg">
            <Box className="w-7 h-7 text-white" />
          </div>
          <span className="text-3xl font-black tracking-tightest text-zinc-950">eBricks-AI</span>
        </Link>

        {/* Desktop Menu - Absolute Black Text */}
        <div className="hidden lg:flex items-center space-x-12">
          <Link to="/" className={`text-sm font-black uppercase tracking-widest transition-colors ${isHome ? 'text-brick-blue' : 'text-black hover:text-brick-blue'}`}>
            Baseplate
          </Link>
          <a href="#edge-ai" className="text-sm font-black uppercase tracking-widest text-black hover:text-brick-blue transition-colors">
            803 Series
          </a>
          <a href="#" className="text-sm font-black uppercase tracking-widest text-black hover:text-brick-blue transition-colors">
            Academy
          </a>
        </div>

        <div className="flex items-center space-x-6">
          <button className="p-4 rounded-2xl bg-zinc-100 text-black hover:bg-zinc-200 transition-all border-2 border-zinc-300">
            <Search size={22} strokeWidth={3} />
          </button>
          <button className="hidden sm:flex items-center space-x-3 bg-black text-white px-10 py-4 rounded-2xl text-sm font-black uppercase tracking-widest hover:scale-105 active:scale-95 transition-all shadow-xl">
            <ShoppingBag size={18} strokeWidth={3} />
            <span>Get the Set</span>
          </button>
          <button className="lg:hidden p-4 rounded-2xl bg-zinc-100 text-black border-2 border-zinc-300">
            <Menu size={24} strokeWidth={3} />
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
