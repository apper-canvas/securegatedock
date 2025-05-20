import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { getIcon } from '../utils/iconUtils';

// Icons
const ShieldLockIcon = getIcon('shield-lock');
const AlertCircleIcon = getIcon('alert-circle');
const HomeIcon = getIcon('home');

function NotFound({ isDarkMode, toggleDarkMode }) {
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
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-md mx-auto text-center">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", stiffness: 100 }}
              className="inline-block p-8 rounded-full bg-red-100 dark:bg-red-900/30 mb-6"
            >
              <AlertCircleIcon className="h-16 w-16 text-red-500" />
            </motion.div>
            
            <motion.h1 
              className="text-4xl md:text-5xl font-bold mb-4"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.1 }}
            >
              404
            </motion.h1>
            
            <motion.h2
              className="text-2xl md:text-3xl font-semibold mb-4"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              Page Not Found
            </motion.h2>
            
            <motion.p
              className="text-surface-600 dark:text-surface-400 mb-8"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              The page you are looking for doesn't exist or has been moved.
            </motion.p>
            
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              <Link 
                to="/" 
                className="inline-flex items-center px-5 py-3 rounded-lg bg-primary hover:bg-primary-dark text-white transition-colors"
              >
                <HomeIcon className="w-5 h-5 mr-2" />
                Back to Home
              </Link>
            </motion.div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-surface-200 dark:bg-surface-800 py-6">
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

export default NotFound;