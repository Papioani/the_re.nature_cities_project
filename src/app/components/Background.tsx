// components/Background.tsx
import Image from "next/image";

export default function Background() {
  return (
    <div className="fixed inset-0 z-[-1]">
      {" "}
      {/* z-[-1] to place it behind other content */}
      <Image
        src="/background-forest.png"
        alt="Background"
        fill
        style={{ objectFit: "cover", opacity: 0.6 }}
        quality={75}
        priority
      />
    </div>
  );
}
