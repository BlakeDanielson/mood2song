"use client"

import { motion } from "framer-motion"
import React, { useState } from "react"
import { Coffee, Music, UserPlus } from "lucide-react"
import { cn } from "@/lib/utils"
import Link from "next/link"

interface ActionTileProps {
  icon: React.ReactNode
  title: string
  subtitle: string
  href: string
  className?: string
}

const ActionTile = ({ icon, title, subtitle, href, className }: ActionTileProps) => {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <Link href={href} target="_blank" rel="noopener noreferrer">
      <motion.div
        className={cn(
          "relative w-full max-w-sm rounded-xl border border-[rgba(255,255,255,0.10)] bg-white/5 backdrop-blur-md p-6 shadow-[0_8px_16px_rgba(0,0,0,0.1)] overflow-hidden group cursor-pointer",
          className
        )}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        whileHover={{ 
          scale: 1.02,
          boxShadow: "0 12px 24px rgba(0,0,0,0.15)",
          borderColor: "rgba(255,255,255,0.2)"
        }}
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
      >
        {/* Glass morphism overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-white/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        {/* Sparkles animation */}
        <div className="absolute inset-0 overflow-hidden">
          <AnimatedSparkles isVisible={isHovered} />
        </div>
        
        {/* Content */}
        <div className="relative z-10 flex flex-col items-center text-center">
          <motion.div 
            className="mb-4 rounded-full bg-blue-500/20 p-3 text-blue-400"
            initial={{ scale: 1 }}
            animate={{ scale: isHovered ? 1.1 : 1 }}
            transition={{ duration: 0.3 }}
          >
            {icon}
          </motion.div>
          
          <motion.h3 
            className="mb-2 text-xl font-semibold text-white"
            animate={{ y: isHovered ? -2 : 0 }}
            transition={{ duration: 0.3 }}
          >
            {title}
          </motion.h3>
          
          <motion.p 
            className="text-sm text-gray-400"
            initial={{ opacity: 0.8 }}
            animate={{ opacity: isHovered ? 1 : 0.8 }}
            transition={{ duration: 0.3 }}
          >
            {subtitle}
          </motion.p>
        </div>
      </motion.div>
    </Link>
  )
}

const AnimatedSparkles = ({ isVisible }: { isVisible: boolean }) => {
  const randomMove = () => Math.random() * 2 - 1
  const randomOpacity = () => Math.random()
  const random = () => Math.random()

  return (
    <div className={`absolute inset-0 ${isVisible ? 'opacity-100' : 'opacity-0'} transition-opacity duration-300`}>
      {[...Array(12)].map((_, i) => (
        <motion.span
          key={`star-${i}`}
          animate={isVisible ? {
            top: `calc(${random() * 100}% + ${randomMove()}px)`,
            left: `calc(${random() * 100}% + ${randomMove()}px)`,
            opacity: randomOpacity(),
            scale: [1, 1.2, 0],
          } : { opacity: 0 }}
          transition={{
            duration: random() * 2 + 4,
            repeat: Infinity,
            ease: "linear",
          }}
          style={{
            position: "absolute",
            top: `${random() * 100}%`,
            left: `${random() * 100}%`,
            width: `2px`,
            height: `2px`,
            borderRadius: "50%",
            zIndex: 1,
          }}
          className="inline-block bg-blue-400"
        />
      ))}
    </div>
  )
}

export function ActionTiles() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.6 }}
      className="max-w-6xl mx-auto mb-16"
    >
      
      
      <div className="flex justify-center">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-7xl">
          <ActionTile 
            icon={<UserPlus size={24} />}
            title="Try and recruit me"
            subtitle="Looking for a PM or CoS? I'm a great one."
            href="https://www.blakemakesthings.com/contact"
          />
          
          <ActionTile 
            icon={<Music size={24} />}
            title="Buy My Beats"
            subtitle="Lease beats and buy exclusive tracks."
            href="https://www.beatstars.com/BLVKE"
          />
          
          <ActionTile 
            icon={<Coffee size={24} />}
            title="Buy Me A Coffee"
            subtitle="Support my work with a little coffee."
            href="https://www.buymeacoffee.com/BLVKE"
          />
        </div>
      </div>
    </motion.div>
  )
} 