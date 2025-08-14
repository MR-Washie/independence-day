import { useEffect, useState } from 'react'
import { api } from '../api'

export default function Quiz() {
  const [questions, setQuestions] = useState([])
  const [idx, setIdx] = useState(0)
  const [score, setScore] = useState(0)
  const [name, setName] = useState('')
  const [finished, setFinished] = useState(false)
  const q = questions[idx]

  useEffect(()=>{
    api.get('/quiz').then(res => setQuestions(res.data))
  }, [])

  const answer = (choice) => {
    if (!q) return
    if (choice === q.answer) setScore(s => s+1)
    const next = idx + 1
    if (next >= questions.length) {
      setFinished(true)
    } else setIdx(next)
  }

  const saveScore = async () => {
    await api.post('/scores', { name, score })
    setName('')
    alert('Score submitted! Check the Leaderboard.')
  }

  if (!questions.length) return <div>Loading quiz…</div>
  if (finished) return (
    <div className="max-w-xl mx-auto p-6 bg-white rounded-2xl shadow">
      <h2 className="text-2xl font-bold">Great job! 🎉</h2>
      <p className="mt-2">Your score: <b>{score}</b> / {questions.length}</p>
      <div className="mt-4 flex gap-2 items-end">
        <div className="flex-1">
          <label className="text-sm text-slate-600">Your Name</label>
          <input className="w-full border rounded-lg px-3 py-2" value={name} onChange={e=>setName(e.target.value)} placeholder="Enter name for leaderboard" />
        </div>
        <button onClick={saveScore} className="px-4 py-2 rounded-lg bg-green-600 text-white disabled:opacity-50" disabled={!name.trim()}>
          Submit
        </button>
      </div>
    </div>
  )

  return (
    <div className="max-w-xl mx-auto p-6 bg-white rounded-2xl shadow">
      <div className="text-sm text-slate-500">Question {idx+1} / {questions.length}</div>
      <h2 className="mt-1 text-xl font-semibold">{q.question}</h2>
      <div className="mt-4 grid gap-2">
        {q.options.map((opt,i)=>(
          <button key={i} onClick={()=>answer(opt)} className="text-left border rounded-lg px-3 py-2 hover:bg-slate-50">
            {opt}
          </button>
        ))}
      </div>
    </div>
  )
}
