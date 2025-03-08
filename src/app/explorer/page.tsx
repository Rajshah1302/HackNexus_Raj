"use client";

import { useEffect, useState } from "react";
import { getPublicClient } from "@wagmi/core";
import { HackNexusFactoryAbi } from "@/utlis/contractsABI/HackNexusFactoryAbi";
import { HackNexusFactoryAddress } from "@/utlis/addresses";
import { config } from "@/utlis/config";
import CardHackathon from "@/components/CardComponent";

export type HackathonData = {
  hackathonAddress: `0x${string}`;
  hackathonName: string;
  hackathonDate: string;
  latitude: string;
  longitude: string;
};

export default function ExplorerHackathons() {
  const [loading, setLoading] = useState(false);
  const [hackathons, setHackathons] = useState<HackathonData[]>([]);

  const fetchHackathons = async () => {
    try {
      setLoading(true);
      const chainId = config.state.chainId;
      const publicClient = getPublicClient(config as any, { chainId });

      // 1. Read the total number of hackathons (hackathonId)
      const totalHackathons = (await publicClient.readContract({
        address: HackNexusFactoryAddress[chainId] as `0x${string}`,
        abi: HackNexusFactoryAbi,
        functionName: "hackathonId",
      })) as bigint;

      console.log("Total hackathons:", totalHackathons);

      const hackathonData: HackathonData[] = [];
      // 2. Loop through each hackathon index (1-indexed)
      for (let i = 1; i <= Number(totalHackathons); i++) {
        const hackathon = (await publicClient.readContract({
          address: HackNexusFactoryAddress[chainId] as `0x${string}`,
          abi: HackNexusFactoryAbi,
          functionName: "hackathons",
          args: [i],
        })) as {
          hackathonAddress: `0x${string}`;
          hackathonName: string;
          hackathonDate: string;
          latitude: string;
          longitude: string;
        };

        hackathonData.push({ ...hackathon });
      }

      console.log("Hackathons:", hackathonData);
      setHackathons(hackathonData);
    } catch (error) {
      console.error("Error fetching hackathons:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHackathons();
  }, []);

  return (
    <div className="w-full space-y-6 py-8 bg-gradient-to-b from-gray-900 to-gray-800">
      {loading ? (
        <div className="text-center text-white text-lg">
          Loading hackathons...
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto px-4">
          {hackathons.map((hackathon, index) => (
            <CardHackathon
              key={`${hackathon.hackathonAddress}-${index}`}
              hackathon={hackathon}
            />
          ))}
        </div>
      )}
    </div>
  );
}
