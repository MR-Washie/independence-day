import { Link, NavLink } from 'react-router-dom'

export default function Navbar() {
  const linkBase = "px-3 py-2 rounded-xl text-sm font-medium hover:bg-slate-100"
  const active = ({isActive}) => isActive ? linkBase + " bg-slate-200" : linkBase

  return (
    <header className="sticky top-0 z-50 backdrop-blur bg-white/70 border-b">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="text-2xl font-extrabold tracking-tight">
          🇮🇳 Azaadi Mela
        </Link>
        <nav className="flex gap-2">
          <NavLink to="/" className={active}>Home</NavLink>
          <NavLink to="/timeline" className={active}>Timeline</NavLink>
          <NavLink to="/quiz" className={active}>Quiz</NavLink>
          <NavLink to="/leaderboard" className={active}>Leaderboard</NavLink>
          <NavLink to="/gallery" className={active}>Gallery</NavLink>
          <NavLink to="/messages" className={active}>Messages</NavLink>
        </nav>
      </div>
    </header>
  )
}
