import { useEffect } from 'react'

export default function Home() {
  useEffect(() => {
    // spawn a few fireworks
    const container = document.getElementById('fw-container')
    const make = () => {
      const fw = document.createElement('div')
      fw.className = 'firework'
      const x = (Math.random()*200-100) + 'px'
      const y = (Math.random()*-180) + 'px'
      fw.style.setProperty('--x', x)
      fw.style.setProperty('--y', y)
      fw.style.left = (Math.random()*100) + '%'
      fw.style.bottom = '10%'
      fw.style.background = ['#ff6b6b','#51cf66','#339af0'][Math.floor(Math.random()*3)]
      container.appendChild(fw)
      setTimeout(()=> fw.remove(), 1800)
    }
    const id = setInterval(make, 250)
    return () => clearInterval(id)
  }, [])

  const nextIndependence = (() => {
    const now = new Date()
    const year = now.getMonth() > 7 || (now.getMonth()===7 && now.getDate()>=15) ? now.getFullYear()+1 : now.getFullYear()
    return new Date(year, 7, 15)
  })()
  const daysLeft = Math.ceil((nextIndependence - new Date())/(1000*60*60*24))

  return (
    <section className="relative overflow-hidden">
      <div id="fw-container" className="pointer-events-none absolute inset-0"></div>
      <div className="grid md:grid-cols-2 gap-6 items-center">
        <div>
          <h1 className="text-4xl md:text-5xl font-extrabold leading-tight">
            India Ki <span className="text-orange-500">Azaadi</span> <span className="text-green-600">Mela</span>
          </h1>
          <p className="mt-3 text-slate-600">
            Celebrate culture, history, and the spirit of freedom with quizzes, a virtual parade, gallery, and more.
          </p>
          <div className="mt-4 text-sm text-slate-500">
            Countdown to 15 August: <span className="font-semibold">
              {/* {daysLeft} days */}
              Today
              </span>
          </div>
        </div>
        <div className="flex justify-center">
          <div className="w-72 h-48 border rounded-2xl overflow-hidden shadow-lg animate-wave">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/4/41/Flag_of_India.svg"
              alt="Indian Flag"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
      <div className="mt-8 grid sm:grid-cols-3 gap-4">
        {[
          { title: "Patriotic Quiz", desc: "Test your knowledge of India.", to: "/quiz" },
          { title: "Freedom Timeline", desc: "Walk through key milestones.", to: "/timeline" },
          { title: "Community Wall", desc: "Share why you love India.", to: "/messages" }
        ].map((c,i)=>(
          <a key={i} href={c.to} className="block p-5 bg-white rounded-2xl shadow hover:shadow-md transition">
            <div className="text-lg font-semibold">{c.title}</div>
            <div className="text-slate-600 text-sm">{c.desc}</div>
          </a>
        ))}
      </div>
    </section>
  )
}
