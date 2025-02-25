// components/Background.tsx
import Image from "next/image";

export default function Background() {
  return (
    <div className="fixed inset-0 z-[-1]">
      {" "}
      {/* z-[-1] to place it behind other content */}
      <Image
        src="/background-forest.jpg"
        alt="Background"
        fill
        style={{
          objectFit: "cover",
          opacity: 1.2,
          maskImage: "linear-gradient(to bottom, rgba(0,0,0,1), rgba(0,0,0,0))",
          WebkitMaskImage:
            "linear-gradient(to bottom, rgba(0,0,0,1), rgba(0,0,0,0))",
        }}
        quality={75}
        priority
      />
    </div>
  );
}
