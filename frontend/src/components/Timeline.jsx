export default function Timeline() {
  const events = [
    { year: 1857, text: "First War of Indian Independence" },
    { year: 1885, text: "Indian National Congress founded" },
    { year: 1905, text: "Swadeshi Movement begins" },
    { year: 1919, text: "Jallianwala Bagh massacre" },
    { year: 1930, text: "Dandi March (Salt Satyagraha)" },
    { year: 1942, text: "Quit India Movement" },
    { year: 1947, text: "India attains Independence on 15 August" }
  ]
  return (
    <div className="max-w-2xl mx-auto">
      <h2 className="text-3xl font-extrabold mb-6">Freedom Timeline</h2>
      <div className="relative pl-6">
        <div className="absolute left-2 top-0 bottom-0 w-1 bg-slate-200 rounded"></div>
        {events.map((e, i)=>(
          <div key={i} className="relative mb-6">
            <div className="absolute -left-1.5 top-1 w-4 h-4 bg-green-600 rounded-full border-2 border-white"></div>
            <div className="bg-white p-4 rounded-xl shadow">
              <div className="font-bold">{e.year}</div>
              <div className="text-slate-600">{e.text}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
