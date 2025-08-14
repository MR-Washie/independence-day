import { useEffect, useState } from 'react'
import { api, API_BASE } from '../api'

export default function Gallery() {
  const [images, setImages] = useState([])
  const [file, setFile] = useState(null)

  const load = async () => {
    try {
      const res = await api.get('/gallery')
      setImages(res.data)
    } catch (err) {
      setImages([])
      console.error('Failed to load gallery:', err)
    }
  }
  useEffect(() => { load() }, [])

  const upload = async (e) => {
    e.preventDefault()
    if (!file) return
    const form = new FormData()
    form.append('image', file)
    try {
      await api.post('/gallery', form, { headers: { 'Content-Type': 'multipart/form-data' } })
      setFile(null)
      load()
    } catch (err) {
      console.error('Failed to upload image:', err)
    }
  }

  return (
    <div>
      <form onSubmit={upload} className="mb-4 p-4 bg-white rounded-xl shadow flex items-center gap-3">
        <input type="file" accept="image/*" onChange={e=>setFile(e.target.files[0])} />
        <button className="px-4 py-2 rounded-lg bg-orange-500 text-white disabled:opacity-50" disabled={!file}>Upload</button>
      </form>
      <div className="grid sm:grid-cols-3 gap-3">
        {images.map(img => (
          <div key={img._id || Math.random()} className="bg-white p-2 rounded-xl shadow">
            <img src={img.filename ? `${API_BASE}/uploads/${img.filename}` : ''} alt="user upload" className="rounded-lg w-full h-48 object-cover" />
            <div className="text-xs text-slate-500 mt-1">{img.createdAt ? new Date(img.createdAt).toLocaleString() : ''}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
