function LandingPage_Drawing() {
  return (
    <div className="w-[48%] relative aspect-video bg-zinc-950 rounded-lg border-[2px] border-zinc-900  overflow-hidden">

      {/* Top bar */}
      <div className="absolute top-0 left-0 right-0 h-12 border-b border-zinc-800 bg-zinc-900 flex items-center px-4">
        <div className="h-5 w-40 bg-zinc-800 rounded " style={{ marginLeft: "2rem" }} />
      </div>

      {/* Left vertical icons */}
      <div className="absolute top-16 left-4 bottom-4 w-12 bg-zinc-900 border border-zinc-800 rounded flex flex-col items-center  gap-4" style={{ paddingBlock: "1rem" }}>
        {new Array(5).fill(".").map((_,i) => <div key={i} className="w-6 h-6 rounded-full bg-zinc-800" />)}
      </div>

      {/* Shapes */}
      <div className="absolute top-[40%] left-[30%] w-40 h-40 border-2 border-blue-500 rounded-lg" />
      <div className="absolute top-[30%] right-[25%] w-32 h-32 border-2 border-blue-500 rounded-full" />
      <div className="absolute bottom-[25%] left-[45%] w-36 h-24 border-2 border-blue-500 transform rotate-12" />

      {/* Lines */}
      <svg className="absolute inset-0 w-full h-full">
        <line x1="220" y1="160" x2="380" y2="140" stroke="white" strokeWidth="2" />
        <line x1="380" y1="180" x2="300" y2="240" stroke="white" strokeWidth="2" />
      </svg>
    </div>
  )
}

export default LandingPage_Drawing
