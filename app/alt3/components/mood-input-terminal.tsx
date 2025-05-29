"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Terminal, Send, Trash2 } from "lucide-react"

interface MoodInputTerminalProps {
  onMoodSubmit: (mood: string) => void
  currentMood: string
}

export function MoodInputTerminal({ onMoodSubmit, currentMood }: MoodInputTerminalProps) {
  const [input, setInput] = useState("")
  const [history, setHistory] = useState<string[]>([])
  const [isTyping, setIsTyping] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const terminalRef = useRef<HTMLDivElement>(null)

  const welcomeMessages = [
    "Welcome to Mood2Song Terminal v3.0",
    "Type your current mood and press Enter to discover music...",
    "Examples: 'feeling nostalgic', 'need energy', 'chill vibes'",
    ""
  ]

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight
    }
  }, [history])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim()) return

    setIsTyping(true)
    const newHistory = [...history, `> ${input}`]
    setHistory(newHistory)
    
    setTimeout(() => {
      setHistory([...newHistory, `Analyzing mood: "${input}"...`, ""])
      onMoodSubmit(input)
      setInput("")
      setIsTyping(false)
    }, 1000)
  }

  const clearTerminal = () => {
    setHistory([])
    setInput("")
  }

  const focusInput = () => {
    inputRef.current?.focus()
  }

  return (
    <motion.div
      className="w-full max-w-4xl mx-auto"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      {/* Terminal Header */}
      <div className="bg-slate-800 rounded-t-lg border border-slate-600 px-4 py-3 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="flex space-x-2">
            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
            <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
          </div>
          <div className="flex items-center space-x-2 text-slate-300">
            <Terminal className="w-4 h-4" />
            <span className="text-sm font-mono">mood2song-terminal</span>
          </div>
        </div>
        <button
          onClick={clearTerminal}
          className="text-slate-400 hover:text-white transition-colors"
          title="Clear terminal"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>

      {/* Terminal Body */}
      <div
        ref={terminalRef}
        className="bg-black rounded-b-lg border-x border-b border-slate-600 p-6 h-96 overflow-y-auto font-mono text-sm cursor-text"
        onClick={focusInput}
      >
        {/* Welcome Messages */}
        <div className="space-y-1 mb-4">
          {welcomeMessages.map((msg, index) => (
            <motion.div
              key={index}
              className="text-green-400"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: index * 0.3, duration: 0.5 }}
            >
              {msg}
            </motion.div>
          ))}
        </div>

        {/* Command History */}
        <div className="space-y-1">
          <AnimatePresence>
            {history.map((line, index) => (
              <motion.div
                key={index}
                className={`${
                  line.startsWith('>') 
                    ? 'text-cyan-400' 
                    : line.includes('Analyzing') 
                    ? 'text-yellow-400' 
                    : 'text-slate-300'
                }`}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
              >
                {line}
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Current Input Line */}
        <form onSubmit={handleSubmit} className="flex items-center mt-2">
          <span className="text-cyan-400 mr-2">{'>'}</span>
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-1 bg-transparent text-white outline-none font-mono"
            placeholder="describe your mood..."
            disabled={isTyping}
            autoFocus
          />
          {isTyping && (
            <motion.div
              className="w-2 h-5 bg-cyan-400 ml-1"
              animate={{ opacity: [1, 0] }}
              transition={{ duration: 0.8, repeat: Infinity }}
            />
          )}
        </form>

        {/* Cursor when not typing */}
        {!isTyping && input === "" && (
          <motion.div
            className="w-2 h-5 bg-cyan-400 inline-block ml-2"
            animate={{ opacity: [1, 0] }}
            transition={{ duration: 1, repeat: Infinity }}
          />
        )}
      </div>

      {/* Current Mood Display */}
      {currentMood && (
        <motion.div
          className="mt-4 p-4 bg-gradient-to-r from-purple-900/50 to-cyan-900/50 rounded-lg border border-purple-500/30"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
        >
          <div className="flex items-center justify-between">
            <div>
              <span className="text-sm text-slate-400 font-mono">CURRENT_MOOD=</span>
              <span className="text-cyan-400 font-mono">"{currentMood}"</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-xs text-green-400 font-mono">ACTIVE</span>
            </div>
          </div>
        </motion.div>
      )}

      {/* Quick Commands */}
      <div className="mt-4 flex flex-wrap gap-2">
        {[
          "feeling energetic",
          "need to relax",
          "nostalgic mood",
          "party time",
          "focus mode",
          "romantic vibes"
        ].map((command) => (
          <motion.button
            key={command}
            onClick={() => {
              setInput(command)
              setTimeout(() => {
                handleSubmit({ preventDefault: () => {} } as React.FormEvent)
              }, 100)
            }}
            className="px-3 py-1 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-xs font-mono rounded border border-slate-600 transition-all duration-200"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            disabled={isTyping}
          >
            {command}
          </motion.button>
        ))}
      </div>
    </motion.div>
  )
} 