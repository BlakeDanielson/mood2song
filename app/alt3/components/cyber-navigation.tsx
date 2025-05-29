"use client"

import { motion } from "framer-motion"
import { Terminal, Disc, Zap, Home, Settings, Power } from "lucide-react"

interface CyberNavigationProps {
  currentStep: 'input' | 'persona' | 'results'
  onStepChange: (step: 'input' | 'persona' | 'results') => void
  hasData: boolean
  selectedPersona: string | null
  songs: any[]
}

export function CyberNavigation({ currentStep, onStepChange, hasData, selectedPersona, songs }: CyberNavigationProps) {
  const steps = [
    { id: 'input', label: 'MOOD_INPUT', icon: Terminal, color: '#00ff41' },
    { id: 'persona', label: 'PERSONA_SELECT', icon: Zap, color: '#ff0080' },
    { id: 'results', label: 'MATRIX_OUTPUT', icon: Disc, color: '#00ffff' },
  ] as const

  return (
    <motion.nav
      className="fixed top-0 left-0 right-0 z-50 bg-black/90 backdrop-blur-sm border-b border-green-400/30"
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <motion.div
            className="flex items-center space-x-3"
            whileHover={{ scale: 1.05 }}
          >
            <motion.div
              className="w-10 h-10 bg-gradient-to-br from-green-400 to-cyan-400 rounded-lg flex items-center justify-center relative"
              animate={{ 
                boxShadow: ['0 0 20px #00ff4140', '0 0 30px #00ff4160', '0 0 20px #00ff4140']
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Home className="w-6 h-6 text-black" />
              <motion.div
                className="absolute inset-0 bg-green-400/20 rounded-lg"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </motion.div>
            <div className="font-mono">
              <div className="text-green-400 font-bold text-lg">MOOD2SONG</div>
              <div className="text-cyan-400 text-xs">v3.0_MATRIX</div>
            </div>
          </motion.div>

          {/* Step Navigation */}
          <div className="flex items-center space-x-1 bg-black/60 rounded-lg p-2 border border-green-400/30">
            {steps.map((step, index) => {
              const Icon = step.icon
              const isActive = currentStep === step.id
              const isCompleted = (
                (step.id === 'input' && hasData) ||
                (step.id === 'persona' && selectedPersona) ||
                (step.id === 'results' && songs.length > 0)
              )
              const isAccessible = (
                step.id === 'input' ||
                (step.id === 'persona' && hasData) ||
                (step.id === 'results' && hasData && selectedPersona)
              )

              return (
                <motion.button
                  key={step.id}
                  onClick={() => isAccessible && onStepChange(step.id)}
                  className={`
                    relative px-4 py-2 rounded font-mono text-sm transition-all duration-300
                    ${isActive 
                      ? 'text-white' 
                      : isAccessible 
                      ? 'text-slate-400 hover:text-white' 
                      : 'text-slate-600 cursor-not-allowed'
                    }
                  `}
                  disabled={!isAccessible}
                  whileHover={isAccessible ? { scale: 1.05 } : {}}
                  whileTap={isAccessible ? { scale: 0.95 } : {}}
                >
                  {/* Active Background */}
                  {isActive && (
                    <motion.div
                      className="absolute inset-0 rounded"
                      style={{
                        background: `linear-gradient(90deg, ${step.color}20, ${step.color}10)`,
                        border: `1px solid ${step.color}60`
                      }}
                      layoutId="activeStep"
                      transition={{ type: "spring", stiffness: 500, damping: 30 }}
                    />
                  )}

                  {/* Content */}
                  <div className="relative flex items-center space-x-2">
                    <div className="relative">
                      <Icon 
                        className="w-4 h-4" 
                        style={{ 
                          color: isActive ? step.color : isAccessible ? '#64748b' : '#374151' 
                        }}
                      />
                      {isCompleted && !isActive && (
                        <motion.div
                          className="absolute -top-1 -right-1 w-2 h-2 bg-green-400 rounded-full"
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ duration: 0.3 }}
                        />
                      )}
                    </div>
                    <span className="hidden md:block">{step.label}</span>
                  </div>

                  {/* Glow Effect */}
                  {isActive && (
                    <motion.div
                      className="absolute inset-0 rounded"
                      style={{
                        background: `radial-gradient(circle, ${step.color}20 0%, transparent 70%)`,
                        filter: 'blur(10px)'
                      }}
                      animate={{ opacity: [0.5, 1, 0.5] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                  )}
                </motion.button>
              )
            })}
          </div>

          {/* System Status */}
          <div className="flex items-center space-x-4">
            {/* Connection Status */}
            <div className="flex items-center space-x-2 font-mono text-xs">
              <motion.div
                className="w-2 h-2 bg-green-400 rounded-full"
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              />
              <span className="text-green-400">ONLINE</span>
            </div>

            {/* Settings */}
            <motion.button
              className="p-2 text-slate-400 hover:text-white transition-colors"
              whileHover={{ scale: 1.1, rotate: 90 }}
              whileTap={{ scale: 0.9 }}
            >
              <Settings className="w-5 h-5" />
            </motion.button>

            {/* Power */}
            <motion.button
              className="p-2 text-slate-400 hover:text-red-400 transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <Power className="w-5 h-5" />
            </motion.button>
          </div>
        </div>

        {/* Progress Bar */}
        <motion.div
          className="mt-4 h-px bg-slate-800 rounded-full overflow-hidden"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
        >
          <motion.div
            className="h-full bg-gradient-to-r from-green-400 via-cyan-400 to-purple-400"
            initial={{ scaleX: 0 }}
            animate={{ 
              scaleX: currentStep === 'input' ? 0.33 : currentStep === 'persona' ? 0.66 : 1 
            }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            style={{ transformOrigin: 'left' }}
          />
        </motion.div>
      </div>

      {/* Scan Line Effect */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-green-400/50 to-transparent"
        animate={{ x: ['-100%', '100%'] }}
        transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
      />
    </motion.nav>
  )
} 