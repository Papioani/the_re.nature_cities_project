// components/Background.tsx
import Image from "next/image";

export default function Background() {
  return (
    <div
      className="fixed inset-0 z-[-1] overflow-hidden h-[100dvh] w-screen"
      aria-hidden="true"
    >
      {" "}
      {/* z-[-1] to place it behind other content */}
      <Image
        src="/background-forest.webp"
        alt=""
        fill
        style={{
          objectFit: "cover",
          opacity: 1.2,
          maskImage: "linear-gradient(to bottom, rgba(0,0,0,1), rgba(0,0,0,0))",
          WebkitMaskImage:
            "linear-gradient(to bottom, rgba(0,0,0,1), rgba(0,0,0,0))",
          willChange: "transform", // Optimize for animations
          transform: "translateZ(0)", // Force GPU acceleration
          height: "100%",
          width: "100%",
        }}
        quality={40}
        priority
        sizes="100vw"
      />
    </div>
  );
}
