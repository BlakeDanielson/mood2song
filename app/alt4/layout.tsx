import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Mood2Song - Professional Edition',
  description: 'Enterprise-grade mood-based music discovery platform with sophisticated design and premium user experience.',
}

export default function Alt4Layout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
      <div className="relative">
        {children}
      </div>
    </div>
  )
} 