import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import { getIcon } from '../utils/iconUtils';
import MainFeature from '../components/MainFeature';

// Icons
const ShieldLockIcon = getIcon('shield-lock');
const MoonIcon = getIcon('moon');
const SunIcon = getIcon('sun');
const HelpCircleIcon = getIcon('help-circle');

function Home({ isDarkMode, toggleDarkMode }) {
  const [showHelp, setShowHelp] = useState(false);
  
  const toggleHelp = () => {
    setShowHelp(!showHelp);
    if (!showHelp) {
      toast.info("Help mode enabled. Hover over elements to see guidance.");
    } else {
      toast.info("Help mode disabled.");
    }
  };
  
  return (
    <motion.div
      className="min-h-screen flex flex-col"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      {/* Header */}
      <header className="sticky top-0 z-10 bg-white/80 dark:bg-surface-900/80 backdrop-blur-md border-b border-surface-200 dark:border-surface-800">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center space-x-2">
              <ShieldLockIcon className="h-8 w-8 text-primary" />
              <span className="text-xl font-bold">SecureGate</span>
            </Link>
            
            <div className="flex items-center space-x-4">
              <button 
                onClick={toggleHelp} 
                className="p-2 rounded-full hover:bg-surface-200 dark:hover:bg-surface-800 transition-colors"
                aria-label={showHelp ? "Disable help mode" : "Enable help mode"}
              >
                <HelpCircleIcon className={`h-5 w-5 ${showHelp ? 'text-primary' : 'text-surface-500'}`} />
              </button>
              
              <button 
                onClick={toggleDarkMode} 
                className="p-2 rounded-full hover:bg-surface-200 dark:hover:bg-surface-800 transition-colors"
                aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
              >
                {isDarkMode ? (
                  <SunIcon className="h-5 w-5 text-yellow-400" />
                ) : (
                  <MoonIcon className="h-5 w-5 text-surface-600" />
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1">
        <div className="container mx-auto px-4 py-8">
          <section className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <motion.h1 
                className="mb-4 text-3xl md:text-4xl lg:text-5xl font-bold"
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.1 }}
              >
                Z Fighter Training
              </motion.h1>
            </div>
            
            {/* Main Interactive Feature Component */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <MainFeature showHelp={showHelp} />
            </motion.div>
          </section>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-surface-200 dark:bg-surface-800 py-6 mt-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center mb-4 md:mb-0">
              <ShieldLockIcon className="h-6 w-6 text-primary mr-2" />
              <span className="font-semibold">SecureGate</span>
            </div>
            <div className="text-sm text-surface-600 dark:text-surface-400">
              &copy; {new Date().getFullYear()} SecureGate. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </motion.div>
  );
}

export default Home;