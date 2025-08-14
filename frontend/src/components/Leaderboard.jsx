import { useEffect, useState } from 'react'
import { api } from '../api'

export default function Leaderboard() {
  const [items, setItems] = useState([])

  useEffect(()=>{
    api.get('/scores').then(res=> setItems(res.data))
  }, [])

  return (
    <div className="max-w-xl mx-auto p-6 bg-white rounded-2xl shadow">
      <h2 className="text-2xl font-bold mb-3">Leaderboard 🏆</h2>
      <ol className="space-y-2">
        {items.map((it, i)=>(
          <li key={it._id} className="flex justify-between border rounded-lg px-3 py-2">
            <span className="font-semibold">{i+1}. {it.name}</span>
            <span className="text-slate-600">{it.score}</span>
          </li>
        ))}
      </ol>
    </div>
  )
}
