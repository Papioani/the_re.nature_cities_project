// components/Background.tsx
import Image from "next/image";

export default function Background() {
  return (
    <div className="fixed inset-0 z-[-1]">
      {" "}
      {/* z-[-1] to place it behind other content */}
      <Image
        src="/background-forest.webp"
        alt="Background"
        fill
        style={{
          objectFit: "cover",
          opacity: 1.2,
          maskImage: "linear-gradient(to bottom, rgba(0,0,0,1), rgba(0,0,0,0))",
          WebkitMaskImage:
            "linear-gradient(to bottom, rgba(0,0,0,1), rgba(0,0,0,0))",
        }}
        quality={40}
        priority
        sizes="(max-width: 768px) 100vw, 1920px" // How wide the image should be at that screen size
      />
    </div>
  );
}
