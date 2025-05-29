'use client'

import { motion } from 'framer-motion'
import { ChevronLeft, ChevronRight, Music, Sparkles, User, Settings, HelpCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

interface PremiumNavigationProps {
  currentStep: number
  totalSteps: number
  onStepChange: (step: number) => void
  canGoBack: boolean
  canGoForward: boolean
}

const steps = [
  { id: 1, title: 'Mood Input', description: 'Tell us how you feel' },
  { id: 2, title: 'Persona Selection', description: 'Choose your vibe' },
  { id: 3, title: 'Your Playlist', description: 'Discover your music' }
]

export function PremiumNavigation({ 
  currentStep, 
  totalSteps, 
  onStepChange, 
  canGoBack, 
  canGoForward 
}: PremiumNavigationProps) {
  const progress = (currentStep / totalSteps) * 100

  return (
    <motion.header 
      className="sticky top-0 z-50 w-full border-b border-slate-200/60 bg-white/80 backdrop-blur-xl"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo and Brand */}
          <motion.div 
            className="flex items-center space-x-3"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.2 }}
          >
            <div className="relative">
              <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-indigo-500 to-violet-500 opacity-20 blur-sm"></div>
              <div className="relative rounded-lg bg-gradient-to-r from-indigo-500 to-violet-500 p-2">
                <Music className="h-5 w-5 text-white" />
              </div>
            </div>
            <div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
                Mood2Song
              </h1>
              <div className="flex items-center space-x-2">
                <span className="inline-flex items-center rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-medium text-slate-800">
                  Professional
                </span>
                <Sparkles className="h-3 w-3 text-amber-500" />
              </div>
            </div>
          </motion.div>

          {/* Progress Section */}
          <div className="hidden md:flex flex-1 max-w-md mx-8 flex-col space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="font-medium text-slate-700">
                Step {currentStep} of {totalSteps}
              </span>
              <span className="text-slate-500">
                {steps[currentStep - 1]?.title}
              </span>
            </div>
            <div className="relative">
              <Progress 
                value={progress} 
                className="h-2 bg-slate-100"
              />
              <motion.div
                className="absolute top-0 left-0 h-2 bg-gradient-to-r from-indigo-500 to-violet-500 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              />
            </div>
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center space-x-3">
            {/* Step Navigation */}
            <div className="hidden sm:flex items-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => onStepChange(currentStep - 1)}
                disabled={!canGoBack}
                className="h-9 px-3 border-slate-200 hover:border-slate-300 hover:bg-slate-50"
              >
                <ChevronLeft className="h-4 w-4 mr-1" />
                Back
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => onStepChange(currentStep + 1)}
                disabled={!canGoForward}
                className="h-9 px-3 border-slate-200 hover:border-slate-300 hover:bg-slate-50"
              >
                Next
                <ChevronRight className="h-4 w-4 ml-1" />
              </Button>
            </div>

            {/* User Menu */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-9 w-9 rounded-full">
                  <Avatar className="h-9 w-9 border-2 border-slate-200">
                    <AvatarImage src="/images/avatar.jpg" alt="User" />
                    <AvatarFallback className="bg-gradient-to-r from-indigo-500 to-violet-500 text-white text-sm font-medium">
                      U
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">Music Lover</p>
                    <p className="text-xs leading-none text-muted-foreground">
                      user@example.com
                    </p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="cursor-pointer">
                  <User className="mr-2 h-4 w-4" />
                  <span>Profile</span>
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer">
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Settings</span>
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer">
                  <HelpCircle className="mr-2 h-4 w-4" />
                  <span>Help & Support</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        {/* Mobile Progress */}
        <div className="md:hidden pb-3">
          <div className="flex items-center justify-between text-sm mb-2">
            <span className="font-medium text-slate-700">
              {steps[currentStep - 1]?.title}
            </span>
            <span className="text-slate-500">
              {currentStep}/{totalSteps}
            </span>
          </div>
          <Progress value={progress} className="h-1.5" />
        </div>
      </div>
    </motion.header>
  )
} 