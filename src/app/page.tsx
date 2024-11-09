export default function Home() {
  return (
    <div className="flex flex-col">
      <main className="flex flex-col gap-4 items-start sm:items-start p-8 pb-10">
        <div className="w-full flex justify-center items-start gap-4">
          <div className="line"></div> {/* Line on the left */}
          <h1 className="centered-heading flex flex-col items-center text-center">
            {" "}
            Welcome to Re.Nature Cities
          </h1>
          <div className="line"></div> {/* Line on the right */}
        </div>

        <p className="text-lg leading-relaxed mb-6 border-l-4 border-[#059669] pl-4">
          This research project focuses on experimental and numerical methods to
          assess the role of street trees as a Nature-Based Solution for climate
          change adaptation in urban areas.
        </p>
        <p className="text-lg leading-relaxed mb-6 border-l-4 border-[#059669] pl-4">
          The research project is implemented in the framework of the H.F.R.I
          call “Basic Research Financing (Horizontal support of all Sciences)”
          under the National Recovery and Resilience Plan “Greece 2.0,” funded
          by the European Union - NextGenerationEU (H.F.R.I. Project Number:
          15566).
        </p>
        <div className="text-lg leading-relaxed mb-6 border-t border-gray-500 pt-4 text-left">
          <p className="marker-square mb-1">
            <span className="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400 font-bold">
              Project Duration:
            </span>{" "}
            24 months (2/10/2023 - 01/10/2025)
          </p>
          <p className="marker-square">
            <span className="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400 font-bold">
              Total Budget (€):
            </span>{" "}
            162,084
          </p>
        </div>
      </main>
    </div>
  );
}
