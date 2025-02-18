import Image from "next/image";
import React, { useEffect, useState } from "react";
import { Timeline } from "@/components/ui/timeline";
import Link from "next/link";

// Import NFT images
import nft1 from "@/assets/nft1.jpeg";
import nft2 from "@/assets/nft2.jpeg";
import nft3 from "@/assets/nft3.jpeg";
import nft4 from "@/assets/nft4.jpeg";
import nft5 from "@/assets/nft5.jpeg";
import nft6 from "@/assets/nft6.jpeg";
import nft7 from "@/assets/nft1.jpeg";
import nft8 from "@/assets/nft2.jpeg";

export function TimelineDemo() {
  const [showNft1, setShowNft1] = useState(false);

  useEffect(() => {
    // Check if localStorage has nft1 set to true
    const nft1Status = localStorage.getItem("nft1");
    if (nft1Status === "true") {
      setShowNft1(true);
    }
  }, []);

  const data = [
    {
      year: "2024",
      items: [
        showNft1 && { id: 1, image: nft1, alt: "NFT 1" }, // Conditionally add nft1
        { id: 2, image: nft2, alt: "NFT 2" },
        { id: 3, image: nft3, alt: "NFT 3" },
      ].filter(Boolean), // Remove undefined entries
    },
    {
      year: "2023",
      items: [
        { id: 5, image: nft5, alt: "NFT 5" },
        { id: 6, image: nft6, alt: "NFT 6" },
        // { id: 7, image: nft7, alt: "NFT 7" },
        // { id: 8, image: nft8, alt: "NFT 8" },
      ],
    },
  ];

  return (
    <div className="w-full">
      <Timeline
        data={data.map(({ year, items }) => ({
          title: year,
          content: (
            <div className="grid grid-cols-2 gap-4">
              {items.map(({ id, image, alt }) => (
                <Link href={`/dashboard/hackathon/${id}`} key={id}>
                  <Image
                    src={image}
                    alt={alt}
                    width={500}
                    height={500}
                    className="rounded-lg object-cover h-20 md:h-44 lg:h-60 w-full shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset]"
                  />
                </Link>
              ))}
            </div>
          ),
        }))}
      />
    </div>
  );
}
