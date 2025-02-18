import { FunctionComponent } from "react";
import Image from "next/image";

export type PlayerSkinsType = {
  className?: string;
};

const skins = [
  { src: "/pplion@2x.png", alt: "Lion Skin" },
  { src: "/pprhino@2x.png", alt: "Rhino Skin" },
  { src: "/ppdragon@2x.png", alt: "Dragon Skin" },
  { src: "/ppgorilla@2x.png", alt: "Gorilla Skin" },
  { src: "/ppdog-1@2x.png", alt: "Dog Skin" },
];

const PlayerSkins: FunctionComponent<PlayerSkinsType> = ({
  className = "",
}) => {
  return (
    <div
      className={`self-stretch flex flex-col items-start justify-start gap-[0.75rem] max-w-full text-left text-[1.75rem] text-primary ${className}`}
    >
      <h3 className="m-0 self-stretch relative font-semibold">My Skins</h3>
      <div className="overflow-x-auto w-full">
        <div className="flex flex-row items-center gap-4 py-2 min-w-max">
          {skins.map((skin, index) => (
            <div
              key={index}
              className="relative w-24 h-24 rounded-lg overflow-hidden shadow-lg hover:scale-105 transition-transform duration-200"
            >
              <Image
                src={skin.src}
                alt={skin.alt}
                height={161}
                width={160}
                sizes="(max-width: 768px) 96px, 96px"
                className="object-cover rounded-lg"
                priority={index < 2} // Load first two images immediately
                loading={index < 2 ? "eager" : "lazy"}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PlayerSkins;
