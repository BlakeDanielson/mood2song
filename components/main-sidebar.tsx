'use client'

import Link from "next/link"
import { motion } from "framer-motion"
import { 
  Music4, 
  Palette, 
  Smile, 
  GitBranch, 
  Github, 
  Briefcase, 
  Coffee,
  Library, 
  X,
  Menu
} from "lucide-react"

interface MainSidebarProps {
  isOpen: boolean
  onClose: () => void
}

export function MainSidebar({ isOpen, onClose }: MainSidebarProps) {
  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <motion.aside
        initial={{ x: -320 }}
        animate={{ x: isOpen ? 0 : -320 }}
        transition={{ type: "spring", damping: 25, stiffness: 200 }}
        className="fixed left-0 top-0 h-full w-80 bg-black/80 backdrop-blur-md border-r border-white/20 z-50 flex flex-col"
      >
        {/* Header */}
        <div className="p-6 border-b border-white/10">
          <div className="flex items-center justify-between mb-4">
            <Link href="/" className="flex items-center gap-3">
              <div className="relative">
                <Music4 className="h-8 w-8 text-blue-400" />
                <div className="absolute inset-0 bg-blue-400/20 rounded-full blur-md" />
              </div>
              <div>
                <span className="font-bold text-xl bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                  MoodTune
                </span>
                <div className="text-xs text-gray-400 font-medium">
                  (M2S for short!)
                </div>
              </div>
            </Link>
            <button
              onClick={onClose}
              className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
            >
              <X className="h-5 w-5 text-white" />
            </button>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-6 space-y-3">
          {/* Alternative Design */}
          <Link 
            href="/alt7" 
            className="flex items-center gap-3 p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-all group"
            onClick={onClose}
          >
            <Palette className="h-5 w-5 text-blue-400 group-hover:text-cyan-400 transition-colors" />
            <span className="font-medium text-white group-hover:text-cyan-400 transition-colors">
              Alternative Design
            </span>
          </Link>

          {/* About Section */}
          <div className="text-xs font-semibold text-blue-400 uppercase tracking-wider mb-4 mt-8">
            About
          </div>

          <Link 
            href="https://blakemakesthings.com" 
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-all group"
          >
            <Smile className="h-5 w-5 text-blue-400 group-hover:text-cyan-400 transition-colors" />
            <span className="font-medium text-white group-hover:text-cyan-400 transition-colors">
              Hi, I&apos;m Blake
            </span>
          </Link>

          <Link 
            href="https://www.blakemakesthings.com/contact" 
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-all group"
          >
            <Briefcase className="h-5 w-5 text-blue-400 group-hover:text-cyan-400 transition-colors" />
            <span className="font-medium text-white group-hover:text-cyan-400 transition-colors">
              Try and hire me
            </span>
          </Link>

          {/* Project Links Section */}
          <div className="text-xs font-semibold text-blue-400 uppercase tracking-wider mb-4 mt-8">
            Project Links
          </div>

          <Link 
            href="https://github.com/BlakeDanielson/mood2song" 
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-all group"
          >
            <GitBranch className="h-5 w-5 text-blue-400 group-hover:text-cyan-400 transition-colors" />
            <span className="font-medium text-white group-hover:text-cyan-400 transition-colors">
              M2S Github
            </span>
          </Link>

          <Link 
            href="https://github.com/BlakeDanielson" 
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-all group"
          >
            <Github className="h-5 w-5 text-blue-400 group-hover:text-cyan-400 transition-colors" />
            <span className="font-medium text-white group-hover:text-cyan-400 transition-colors">
              My Github
            </span>
          </Link>

          {/* Support Me Section */}
          <div className="text-xs font-semibold text-blue-400 uppercase tracking-wider mb-4 mt-8">
            Support me
          </div>

          <Link 
            href="https://www.beatstars.com/BLVKE" 
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-all group"
          >
            <Library className="h-5 w-5 text-blue-400 group-hover:text-cyan-400 transition-colors" />
            <span className="font-medium text-white group-hover:text-cyan-400 transition-colors">
              Buy My Beats
            </span>
          </Link>

          <Link 
            href="https://buymeacoffee.com/blvke" 
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-all group"
          >
            <Coffee className="h-5 w-5 text-blue-400 group-hover:text-cyan-400 transition-colors" />
            <span className="font-medium text-white group-hover:text-cyan-400 transition-colors">
              Buy me a coffee
            </span>
          </Link>
        </nav>
      </motion.aside>
    </>
  )
}

export function MainSidebarToggle({ onClick }: { onClick: () => void }) {
  return (
    <motion.button
      onClick={onClick}
      className="fixed top-6 left-6 z-30 p-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl hover:bg-white/20 transition-all group"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <Menu className="h-5 w-5 text-white group-hover:text-blue-400 transition-colors" />
    </motion.button>
  )
} 