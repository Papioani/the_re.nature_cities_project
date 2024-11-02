export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* <div className="hero-section">
        <div className="overlay">
          <h1 className="text-white text-2xl font-extrabold mb-4 leading-tight">
            Welcome to Re.Nature Cities
          </h1>
        </div>
      </div> */}
      <main className="flex flex-col gap-8 items-start sm:items-start p-8 pb-20">
        <div className="centered-container">
          <h1 className="centered-heading"> Welcome to Re.Nature Cities</h1>
        </div>
        <p className="text-lg leading-relaxed mb-6 border-l-4 border-green-500 pl-4">
          This research project focuses on experimental and numerical methods to
          assess the role of street trees as a Nature-Based Solution for climate
          change adaptation in urban areas.
        </p>
        <p className="text-lg leading-relaxed mb-6 border-l-4 border-green-500 pl-4">
          The research project is implemented in the framework of the H.F.R.I
          call “Basic Research Financing (Horizontal support of all Sciences)”
          under the National Recovery and Resilience Plan “Greece 2.0,” funded
          by the European Union – NextGenerationEU (H.F.R.I. Project Number:
          15566).
        </p>
        <div className="text-lg leading-relaxed mb-6 border-t border-gray-300 pt-4 text-left">
          <p className="mb-1">
            <span className="font-semibold">Project Duration:</span> 24 months
            (2/10/2023 - 01/10/2025)
          </p>
          <p>
            <span className="font-semibold">Total Budget (€):</span> 162,084
          </p>
        </div>
      </main>
    </div>
  );
}
