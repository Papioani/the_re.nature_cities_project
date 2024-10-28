export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start relative">
        {/* <div className="bg-black bg-opacity-70 p-8 rounded-lg shadow-lg"> */}
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
