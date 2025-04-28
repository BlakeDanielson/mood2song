import Link from "next/link"
import { Home, Search, Library, Plus, Heart, Music } from "lucide-react"

export function Sidebar() {
  return (
    <aside className="flex flex-col h-full">
      <div className="mb-8 pt-4">
        <Link href="/" className="flex items-center gap-2 text-white font-bold text-xl mb-8">
          <Music className="h-8 w-8 text-[#1DB954]" />
          <span>Moodify</span>
        </Link>

        <nav className="space-y-4">
          <Link href="/" className="flex items-center gap-3 text-white hover:text-[#1DB954] transition-colors">
            <Home className="h-6 w-6" />
            <span className="font-semibold">My other projects</span>
          </Link>
          <Link href="#" className="flex items-center gap-3 text-muted-foreground hover:text-white transition-colors">
            <Search className="h-6 w-6" />
            <span className="font-semibold">My Github</span>
          </Link>
          <Link href="#" className="flex items-center gap-3 text-muted-foreground hover:text-white transition-colors">
            <Library className="h-6 w-6" />
            <span className="font-semibold">Listen to my music</span>
          </Link>
        </nav>
      </div>

      <div className="mt-8 space-y-4">
        <div className="flex items-center gap-3 text-muted-foreground hover:text-white transition-colors cursor-pointer">
          <div className="bg-muted-foreground/30 p-1 rounded">
            <Plus className="h-4 w-4" />
          </div>
          <span className="font-semibold">Try and recruit me</span>
        </div>
        <div className="flex items-center gap-3 text-muted-foreground hover:text-white transition-colors cursor-pointer">
          <div className="bg-gradient-to-br from-purple-600 to-blue-400 p-1 rounded">
            <Heart className="h-4 w-4" />
          </div>
          <span className="font-semibold">Buy me a coffee</span>
        </div>
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
