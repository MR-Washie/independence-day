import { Link, NavLink } from 'react-router-dom'
import { Menu, X } from 'lucide-react';
import { useState } from 'react';


export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const linkBase = "px-3 py-2 rounded-xl text-sm font-medium hover:bg-slate-100"
  const active = ({isActive}) => isActive ? linkBase + " bg-slate-200" : linkBase

  return (
    <header className="sticky top-0 z-50 backdrop-blur bg-white/70 border-b">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="text-2xl font-extrabold tracking-tight">
          🇮🇳 Azaadi Mela
        </Link>
        <nav className="flex gap-2 hidden md:flex items-center text-sm text-gray-700 font-medium">
          <NavLink to="/" className={active}>Home</NavLink>
          <NavLink to="/timeline" className={active}>Timeline</NavLink>
          <NavLink to="/quiz" className={active}>Quiz</NavLink>
          <NavLink to="/leaderboard" className={active}>Leaderboard</NavLink>
          <NavLink to="/gallery" className={active}>Gallery</NavLink>
          <NavLink to="/messages" className={active}>Messages</NavLink>
        </nav>

        <div className="md:hidden">
                  <button onClick={() => setIsOpen(!isOpen)}>
                    {isOpen ? <X size={24} /> : <Menu size={24} />}
                  </button>
        </div>
        
      </div>
      {isOpen && (
        <div className="md:hidden bg-white shadow-md">
          <nav className="flex flex-col px-4 pb-4 space-y-2 text-sm font-medium">
            <Link to="/" onClick={ () => setIsOpen(false)}>Home</Link>
            <Link to="/timeline" onClick={ () => setIsOpen(false)}>Timeline</Link>
            <Link to="/quiz" onClick={ () => setIsOpen(false)}>Quiz</Link>

            <Link to="/leaderboard" onClick={ () => setIsOpen(false)}>Leaderboard</Link>
            <Link to="/gallery" onClick={ () => setIsOpen(false)}>Gallery</Link>
            <Link to="/messages" onClick={ () => setIsOpen(false)}>Messages</Link>
           
            
            
          </nav>
        </div>
      )}

    </header>
  )
}
