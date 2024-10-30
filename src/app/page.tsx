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
      <main className="flex flex-col gap-8 items-center sm:items-start p-8 pb-20">
        <div className="bg-gray-900 bg-opacity-40 p-8 rounded-lg shadow-lg">
          <h1 className="text-white text-2xl font-extrabold mb-4 leading-tight">
            Welcome to Re.Nature Cities
          </h1>
          <p className="text-white text-lg leading-relaxed mb-6 font-bold">
            This research project focuses on experimental and numerical methods
            to assess the role of street trees as a Nature-Based Solution for
            climate change adaptation in urban areas.
          </p>
          <p className="text-white text-lg leading-relaxed mb-6 font-bold">
            The research project is implemented in the framework of the H.F.R.I
            call “Basic Research Financing (Horizontal support of all Sciences)”
            under the National Recovery and Resilience Plan “Greece 2.0,” funded
            by the European Union – NextGenerationEU (H.F.R.I. Project Number:
            15566).
          </p>
          <div className="text-white text-lg leading-relaxed mb-6 font-bold">
            <p>
              <strong>Project Duration:</strong> 24 months (2/10/2023 -
              01/10/2025)
            </p>
            <p>
              <strong>Total Budget (€):</strong> 162,084
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
