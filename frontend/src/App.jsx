import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './components/Home'
import Quiz from './components/Quiz'
import Leaderboard from './components/Leaderboard'
import Timeline from './components/Timeline'
import Gallery from './components/Gallery'
import Messages from './components/Messages'
import Footer from './components/Footer'

export default function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 max-w-6xl mx-auto px-4 py-6">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/quiz" element={<Quiz />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/timeline" element={<Timeline />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/messages" element={<Messages />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}
