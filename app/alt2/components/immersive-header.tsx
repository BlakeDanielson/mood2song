"use client"

import { motion } from "framer-motion"
import { Music, Palette, Sparkles, Home } from "lucide-react"

interface ImmersiveHeaderProps {
  currentView: 'discover' | 'personas' | 'results'
  onViewChange: (view: 'discover' | 'personas' | 'results') => void
}

export function ImmersiveHeader({ currentView, onViewChange }: ImmersiveHeaderProps) {
  const navItems = [
    { id: 'discover', label: 'Discover', icon: Palette },
    { id: 'personas', label: 'Personas', icon: Sparkles },
    { id: 'results', label: 'Results', icon: Music },
  ] as const

  return (
    <motion.header
      className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-black/20 border-b border-white/10"
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <motion.div
            className="flex items-center space-x-3"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <div className="relative">
              <motion.div
                className="w-10 h-10 bg-gradient-to-br from-cyan-400 to-purple-600 rounded-xl flex items-center justify-center"
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              >
                <Music className="w-6 h-6 text-white" />
              </motion.div>
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-cyan-400 to-purple-600 rounded-xl opacity-50 blur-lg"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              />
            </div>
            <div>
              <h1 className="text-xl font-bold text-white">Mood2Song</h1>
              <p className="text-xs text-slate-400">Alt Design v2</p>
            </div>
          </motion.div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-1 bg-white/5 rounded-full p-1 backdrop-blur-sm">
            {navItems.map((item) => {
              const Icon = item.icon
              const isActive = currentView === item.id
              
              return (
                <motion.button
                  key={item.id}
                  onClick={() => onViewChange(item.id)}
                  className={`relative px-6 py-3 rounded-full flex items-center space-x-2 transition-all duration-300 ${
                    isActive 
                      ? 'text-white' 
                      : 'text-slate-400 hover:text-white'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {isActive && (
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 rounded-full border border-cyan-500/30"
                      layoutId="activeTab"
                      transition={{ type: "spring", stiffness: 500, damping: 30 }}
                    />
                  )}
                  <Icon className="w-4 h-4" />
                  <span className="text-sm font-medium">{item.label}</span>
                </motion.button>
              )
            })}
          </nav>

          {/* Mobile Navigation */}
          <div className="md:hidden flex items-center space-x-2">
            {navItems.map((item) => {
              const Icon = item.icon
              const isActive = currentView === item.id
              
              return (
                <motion.button
                  key={item.id}
                  onClick={() => onViewChange(item.id)}
                  className={`p-3 rounded-full transition-all duration-300 ${
                    isActive 
                      ? 'bg-gradient-to-r from-cyan-500/20 to-purple-500/20 border border-cyan-500/30 text-white' 
                      : 'text-slate-400 hover:text-white hover:bg-white/5'
                  }`}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Icon className="w-5 h-5" />
                </motion.button>
              )
            })}
          </div>
        </div>
      </div>

      {/* Animated underline */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-500 to-transparent"
        animate={{ opacity: [0.3, 1, 0.3] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      />
    </motion.header>
  )
} 