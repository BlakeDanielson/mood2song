"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { 
  Briefcase, 
  Coffee,
  Library, 
  ExternalLink
} from "lucide-react"

const sidebarLinks = [
  {
    href: "https://www.blakemakesthings.com/contact",
    icon: Briefcase,
    title: "Try and recruit me",
    description: "Looking to hire? Let's talk!",
    color: "from-green-500 to-emerald-500"
  },
  {
    href: "https://www.beatstars.com/BLVKE",
    icon: Library,
    title: "Buy My Beats",
    description: "Support my music production",
    color: "from-blue-500 to-cyan-500"
  },
  {
    href: "https://www.buymeacoffee.com/BLVKE",
    icon: Coffee,
    title: "Buy Me A Coffee",
    description: "Support the development",
    color: "from-amber-500 to-yellow-500"
  }
]

export function SidebarLinkTiles() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.6 }}
      className="max-w-6xl mx-auto mb-16"
    >
      <div className="text-center mb-8">
        <h3 className="text-2xl font-bold text-white mb-2">Quick Links</h3>
        <p className="text-gray-400">Explore more projects and connect with the creator</p>
      </div>
      
      <div className="flex justify-center">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl">
          {sidebarLinks.map((link, index) => {
            const IconComponent = link.icon
            return (
              <motion.div
                key={link.href}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 * index }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group block"
                >
                  <div className="relative p-6 bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl hover:bg-white/10 transition-all duration-300 h-full">
                    {/* Gradient background on hover */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${link.color} opacity-0 group-hover:opacity-10 rounded-2xl transition-opacity duration-300`} />
                    
                    {/* Content */}
                    <div className="relative z-10">
                      <div className="flex items-center justify-between mb-3">
                        <div className={`p-3 rounded-xl bg-gradient-to-br ${link.color} bg-opacity-20`}>
                          <IconComponent className="h-6 w-6 text-white" />
                        </div>
                        <ExternalLink className="h-4 w-4 text-gray-400 group-hover:text-white transition-colors" />
                      </div>
                      
                      <h4 className="text-white font-semibold text-lg mb-2 group-hover:text-white transition-colors">
                        {link.title}
                      </h4>
                      
                      <p className="text-gray-400 text-sm group-hover:text-gray-300 transition-colors">
                        {link.description}
                      </p>
                    </div>
                    
                    {/* Hover effect border */}
                    <div className={`absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-gradient-to-br group-hover:${link.color} opacity-0 group-hover:opacity-50 transition-opacity duration-300`} />
                  </div>
                </Link>
              </motion.div>
            )
          })}
        </div>
      </div>
    </motion.div>
  )
} 