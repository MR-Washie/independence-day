import { useEffect, useState } from 'react'
import { api } from '../api'

export default function Messages() {
  const [items, setItems] = useState([])
  const [name, setName] = useState('')
  const [text, setText] = useState('')

  const load = async () => {
    try {
      const res = await api.get('/messages')
      setItems(res.data)
    } catch (err) {
      setItems([])
      console.error('Failed to load messages:', err)
    }
  }
  useEffect(() => { load() }, [])

  const submit = async (e) => {
    e.preventDefault()
    try {
      await api.post('/messages', { name, text })
      setName(''); setText('')
      load()
    } catch (err) {
      console.error('Failed to post message:', err)
    }
  }

  return (
    <div className="max-w-xl mx-auto">
      <form onSubmit={submit} className="bg-white p-4 rounded-xl shadow">
        <h2 className="text-xl font-semibold mb-2">Why I love India ❤️</h2>
        <input className="w-full border rounded-lg px-3 py-2 mb-2" placeholder="Your name" value={name} onChange={e=>setName(e.target.value)} />
        <textarea className="w-full border rounded-lg px-3 py-2" rows="3" placeholder="Write your message…" value={text} onChange={e=>setText(e.target.value)} />
        <button className="mt-3 px-4 py-2 rounded-lg bg-green-700 text-white disabled:opacity-50" disabled={!name.trim() || !text.trim()}>
          Post
        </button>
      </form>

      <div className="mt-4 space-y-3">
        {items.map(m => (
          <div key={m._id || Math.random()} className="bg-white p-4 rounded-xl shadow">
            <div className="font-semibold">{m.name || 'Anonymous'}</div>
            <div className="text-slate-700">{m.text || ''}</div>
            <div className="text-xs text-slate-500 mt-1">{m.createdAt ? new Date(m.createdAt).toLocaleString() : ''}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
