import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import ComponentDetail from './pages/ComponentDetail';

import ScrollToTop from './components/ScrollToTop';

function App() {
  return (
    <div className="bg-white text-zinc-950 selection:bg-brick-blue selection:text-white">
      <ScrollToTop />
      <Navbar />
      <AnimatePresence mode="wait">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/component/:id" element={<ComponentDetail />} />
        </Routes>
      </AnimatePresence>
    </div>
  );
}

export default App;
