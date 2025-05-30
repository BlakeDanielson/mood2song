import Link from "next/link"
import { Home, Search, Library, Plus, Heart, Music, Folder, Briefcase, ThumbsUp, ThumbsUpIcon, Github, GitBranch, BadgeDollarSign, DollarSign, Music2, Music3, Music4, LibraryBig, LibrarySquare, Waves, LucideWaves, HandHelping, HandCoins, HandHeart, HandMetal, LucideHand, User, User2, Smile, Egg, Rocket, Palette } from "lucide-react"
import { Profiler } from "react"
import { Avatar, AvatarImage } from "@radix-ui/react-avatar"
import { AvatarFallback } from "./ui/avatar"

export function Sidebar() {
  return (
    <aside className="flex flex-col h-full">
      <div className="mb-8 pt-4">
        <Link href="/" className="flex items-center gap-2 text-[#1DB954] font-bold text-xl mb-1">
          <Music4 className="h-9 w-9 text-[#1DB954]" />
          <span className= "font-bold">Mood 2 Song</span>
        </Link>
        <span className= "flex gap-2 text-muted-foreground items-center font-bold text-xs mb-8">(M2S for short!)</span>


        <nav className="space-y-4">
          <Link href="/alt" className="flex items-center gap-3 text-muted-foreground hover:text-[#1DB954] transition-colors">
            <Palette className="h-6 w-6" />
            <span className="font-semibold">Alternative Design</span>
          </Link>
          <Link href="https://blakemakesthings.com" className="flex items-center gap-3 text-muted-foreground hover:text-[#1DB954] transition-colors">
            <Smile className="h-6 w-6" />
            <span className="font-semibold">Hi! I'm Blake</span>
          </Link>
          <Link href="https://github.com/BlakeDanielson/mood2song" className="flex items-center gap-3 text-muted-foreground hover:text-[#1DB954] transition-colors">
            <GitBranch className="h-6 w-6" />
            <span className="font-semibold">M2S Github</span>
          </Link>
          <Link href="https://github.com/BlakeDanielson" className="flex items-center gap-3 text-muted-foreground hover:text-[#1DB954] transition-colors">
            <Github className="h-6 w-6" />
            <span className="font-semibold">My Github</span>
          </Link>
          <Link href="https://www.blakemakesthings.com/contact" className="flex items-center gap-3 text-muted-foreground hover:text-[#1DB954] transition-colors">
            <Briefcase className="h-6 w-6" />
            <span className="font-semibold">Try and recruit me</span>
          </Link>
          <Link href="https://jumpscare.pro" className="flex items-center gap-3 text-muted-foreground hover:text-[#1DB954] transition-colors">
            <Rocket className="h-6 w-6" />
            <span className="font-semibold">Jumpscare Generator</span>
          </Link>
          <Link href="https://www.beatstars.com/BLVKE" className="flex items-center gap-3 text-muted-foreground hover:text-[#1DB954] transition-colors">
            <Library className="h-6 w-6" />
            <span className="font-semibold">Buy My Beats</span>
          </Link>
        </nav>
      </div>

      <div className="mt-8 pt-8 border-t border-muted">
        <div className="text-xs text-muted-foreground space-y-2">
          <p className="hover:underline cursor-pointer">Cookies</p>
          <p className="hover:underline cursor-pointer">Privacy</p>
          <p className="hover:underline cursor-pointer">Terms</p>
        </div>
      </div>
    </aside>
  )
}
