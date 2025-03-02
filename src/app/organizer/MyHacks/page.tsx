"use client";

import React, { useEffect, useState } from "react";
import { useAccount } from "wagmi";
import { getPublicClient } from "@wagmi/core";
import { useRouter } from "next/navigation";

// If you're using lucide-react icons, import the arrow icon:
import { ArrowUpRight } from "lucide-react";

// If you're using shadcn's Card components, keep them imported:
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

import { HackNexusFactoryAbi } from "@/utlis/contractsABI/HackNexusFactoryAbi";
import { HackNexusAbi } from "@/utlis/contractsABI/HackNexusAbi";
import { HackNexusFactoryAddress } from "@/utlis/addresses";
import { config } from "@/utlis/config";

interface HackathonData {
  address: `0x${string}`;
  hackathonName: string;
  hackathonDate: string;
  latitude: string;
  longitude: string;
}

export default function AllHackathonsPage() {
  const router = useRouter();
  const { address: userAddress } = useAccount();

  const [hackathons, setHackathons] = useState<HackathonData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const chainId = config.state.chainId;

  const fetchHackathons = async () => {
    try {
      if (!userAddress) return;

      setLoading(true);
      setError(null);

      const publicClient = getPublicClient(config as any, { chainId });

      const hackathonAddresses = (await publicClient.readContract({
        address: HackNexusFactoryAddress[chainId] as `0x${string}`,
        abi: HackNexusFactoryAbi,
        functionName: "getHackathonAddresses",
        args: [userAddress],
      })) as `0x${string}[]`;

      const hackathonDataPromises = hackathonAddresses.map(async (hackAddr) => {
        try {
          const hackathonName = (await publicClient.readContract({
            address: hackAddr,
            abi: HackNexusAbi,
            functionName: "hackathonName",
          })) as string;

          const hackathonDate = (await publicClient.readContract({
            address: hackAddr,
            abi: HackNexusAbi,
            functionName: "hackathonDate",
          })) as string;

          const latitude = (await publicClient.readContract({
            address: hackAddr,
            abi: HackNexusAbi,
            functionName: "latitude",
          })) as string;

          const longitude = (await publicClient.readContract({
            address: hackAddr,
            abi: HackNexusAbi,
            functionName: "longitude",
          })) as string;

          return {
            address: hackAddr,
            hackathonName,
            hackathonDate,
            latitude,
            longitude,
          };
        } catch (err) {
          console.error(`Error reading hackathon data from ${hackAddr}:`, err);
          return null;
        }
      });

      const results = await Promise.all(hackathonDataPromises);
      const validHackathons = results.filter(
        (h) => h !== null
      ) as HackathonData[];

      setHackathons([...validHackathons]);
    } catch (err) {
      console.error("Error fetching hackathons:", err);
      setError("Failed to fetch hackathons. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (userAddress) {
      fetchHackathons();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userAddress]);

  // Separate hackathons into upcoming vs. past
  const now = new Date();
  const upcomingHackathons = hackathons.filter((hack) => {
    const hackDate = new Date(hack.hackathonDate);
    if (isNaN(hackDate.getTime())) return true; // treat invalid date as upcoming
    return hackDate >= now;
  });
  const pastHackathons = hackathons.filter((hack) => {
    const hackDate = new Date(hack.hackathonDate);
    if (isNaN(hackDate.getTime())) return false;
    return hackDate < now;
  });

  // Sort them
  upcomingHackathons.sort(
    (a, b) =>
      new Date(a.hackathonDate).getTime() - new Date(b.hackathonDate).getTime()
  );
  pastHackathons.sort(
    (a, b) =>
      new Date(b.hackathonDate).getTime() - new Date(a.hackathonDate).getTime()
  );

  const handleLearnMore = (hackAddr: string) => {
    router.push(`/h?chainId=${chainId}&hack=${hackAddr}`);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <p className="text-black">Loading hackathons...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white text-red-500">
        {error}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white text-black">
      <div className="mx-auto max-w-7xl p-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-4">Events</h1>
          <div className="flex space-x-6 text-lg">
            <Button
              variant="ghost"
              className="px-0 text-black hover:bg-gray-100"
            >
              All
            </Button>
            <Button
              variant="ghost"
              className="px-0 text-black hover:bg-gray-100"
            >
              Hackathons
            </Button>
            <Button
              variant="ghost"
              className="px-0 text-black hover:bg-gray-100"
            >
              Summits
            </Button>
          </div>
        </div>

        {/* UPCOMING HACKATHONS */}
        <section className="mb-12">
          <h2 className="text-xl font-bold mb-4">Upcoming</h2>
          {upcomingHackathons.length === 0 ? (
            <p className="text-gray-600">No upcoming hackathons</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {upcomingHackathons.map((hack) => (
                <Card
                  key={hack.address}
                  className="border border-black rounded-lg p-4 bg-white"
                >
                  <CardHeader className="p-0">
                    <div className="flex items-center justify-between">
                      <Label className="px-2 py-1 bg-[#E2F8E7] text-[#10743F] text-xs rounded-full font-medium">
                        HACKATHON
                      </Label>
                      {/* You could add a logo/icon on the right if you want */}
                    </div>
                  </CardHeader>
                  <CardContent className="p-0 mt-4">
                    <CardTitle className="text-lg font-bold">
                      {hack.hackathonName}
                    </CardTitle>
                    {/* Example: If you have a start & end date separately, display them. 
                        Otherwise, just show hack.hackathonDate directly. */}
                    <div className="mt-2 inline-flex items-center space-x-2">
                      <div className="flex items-center space-x-1 bg-[#F5F5F5] rounded-md px-2 py-1 text-sm">
                        <span>{hack.hackathonDate}</span>
                      </div>
                      {/* If you had "startDate -> endDate" you could do something like:
                          <span className="text-sm text-gray-500">→</span>
                          <div className="flex items-center space-x-1 bg-[#F5F5F5] ...">
                            <span>END DATE</span>
                          </div>
                      */}
                    </div>

                    {/* Coordinates (latitude, longitude) if you want to display them */}
                    <p className="text-sm text-gray-800 mt-2">
                      {hack.latitude}, {hack.longitude}
                    </p>

                    {/* Learn More button at bottom */}
                    <button
                      onClick={() => handleLearnMore(hack.address)}
                      className="mt-4 w-full flex items-center justify-between 
                                 bg-[#FAEAD5] hover:bg-[#f5e0c3] 
                                 rounded-md px-3 py-2 text-sm font-medium 
                                 text-black transition"
                    >
                      Learn More
                      <ArrowUpRight className="w-4 h-4" />
                    </button>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </section>

        {/* PAST HACKATHONS */}
        <section>
          <h2 className="text-xl font-bold mb-4">Past</h2>
          {pastHackathons.length === 0 ? (
            <p className="text-gray-600">No past hackathons</p>
          ) : (
            <div className="space-y-4">
              {pastHackathons.map((hack) => (
                <div
                  key={hack.address}
                  className="border border-black rounded-lg p-4 bg-white"
                >
                  <div className="flex items-center justify-between mb-2">
                    <p className="font-semibold text-lg">
                      {hack.hackathonName}
                    </p>
                    <Label className="px-2 py-1 bg-[#F5F5F5] text-black text-xs rounded-full font-medium">
                      HACKATHON
                    </Label>
                  </div>
                  <p className="text-sm text-gray-700 mb-2">
                    {hack.hackathonDate}
                  </p>
                  <p className="text-sm text-gray-700">
                    {hack.latitude}, {hack.longitude}
                  </p>
                  <div className="mt-4 flex items-center justify-end">
                    <button
                      onClick={() => handleLearnMore(hack.address)}
                      className="inline-flex items-center justify-between 
                                 bg-[#FAEAD5] hover:bg-[#f5e0c3] 
                                 rounded-md px-3 py-2 text-sm font-medium 
                                 text-black transition"
                    >
                      View Details
                      <ArrowUpRight className="w-4 h-4 ml-2" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
