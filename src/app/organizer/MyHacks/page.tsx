"use client";

import React, { useEffect, useState } from "react";
import { useAccount } from "wagmi";
import { getPublicClient } from "@wagmi/core";
import { useRouter } from "next/navigation";
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

      // 1. Get the public client
      const publicClient = getPublicClient(config as any, { chainId });

      // 2. Call getHackathonAddresses to get array of addresses
      const hackathonAddresses = (await publicClient.readContract({
        address: HackNexusFactoryAddress[chainId] as `0x${string}`,
        abi: HackNexusFactoryAbi,
        functionName: "getHackathonAddresses",
        args: [userAddress],
      })) as `0x${string}[]`;

      console.log("User Address:", userAddress);
      console.log("Hackathon Addresses:", hackathonAddresses);

      const hackathonDataPromises = hackathonAddresses.map(async (hackAddr) => {
        console.log("Reading hackathon at:", hackAddr);
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

      // Force a new array reference
      setHackathons([...validHackathons]);
      console.log("Valid Hackathons:", validHackathons);
    } catch (err) {
      console.error("Error fetching hackathons:", err);
      setError("Failed to fetch hackathons. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  // Fetch hackathons on mount and whenever the user address changes
  useEffect(() => {
    if (userAddress) {
      fetchHackathons();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userAddress]);

  // For debugging: log whenever hackathons state updates
  useEffect(() => {
    console.log("Hackathons state updated:", hackathons);
  }, [hackathons]);

  // Separate hackathons into upcoming vs. past based on hackathonDate.
  // If the date is invalid, we'll assume it's upcoming.
  const now = new Date();
  const upcomingHackathons = hackathons.filter((hack) => {
    const hackDate = new Date(hack.hackathonDate);
    if (isNaN(hackDate.getTime())) {
      return true;
    }
    return hackDate >= now;
  });
  const pastHackathons = hackathons.filter((hack) => {
    const hackDate = new Date(hack.hackathonDate);
    if (isNaN(hackDate.getTime())) {
      return false;
    }
    return hackDate < now;
  });

  // Sort upcoming (earlier first) and past (most recent first)
  upcomingHackathons.sort(
    (a, b) =>
      new Date(a.hackathonDate).getTime() - new Date(b.hackathonDate).getTime()
  );
  pastHackathons.sort(
    (a, b) =>
      new Date(b.hackathonDate).getTime() - new Date(a.hackathonDate).getTime()
  );

  // Navigate to the hackathon details page
  const handleLearnMore = (hackAddr: string) => {
    router.push(`/hackathons/${hackAddr}`);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Loading hackathons...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-500">
        {error}
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl p-8">
      {/* Heading and tabs */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-4">Events</h1>
        <div className="flex space-x-6 text-lg">
          <Button variant="ghost" className="px-0">
            All
          </Button>
          <Button variant="ghost" className="px-0">
            Hackathons
          </Button>
          <Button variant="ghost" className="px-0">
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
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {upcomingHackathons.map((hack) => (
              <Card
                key={hack.address}
                className="relative overflow-hidden bg-white dark:bg-zinc-900 transition-all hover:border-purple-500/50 hover:shadow-lg hover:shadow-purple-500/10 cursor-pointer"
              >
                <CardHeader className="border-b border-gray-200 dark:border-zinc-800 pb-3">
                  <CardTitle className="text-gray-900 dark:text-zinc-100">
                    {hack.hackathonName}
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-6 space-y-2">
                  <div className="flex items-center justify-between">
                    <Label className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">
                      HACKATHON
                    </Label>
                    <span className="text-sm text-zinc-500">
                      {hack.latitude}, {hack.longitude}
                    </span>
                  </div>
                  <p className="text-sm text-gray-800 dark:text-gray-200">
                    {hack.hackathonDate}
                  </p>
                  <Button
                    variant="outline"
                    className="mt-2"
                    onClick={() => handleLearnMore(hack.address)}
                  >
                    Learn More
                  </Button>
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
                className="flex items-center justify-between border-b border-gray-200 dark:border-zinc-800 py-3"
              >
                <div>
                  <p className="font-semibold text-gray-900 dark:text-zinc-100">
                    {hack.hackathonName}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {hack.hackathonDate}
                  </p>
                </div>
                <div className="flex items-center space-x-3">
                  <Label className="px-2 py-1 bg-gray-100 text-gray-800 rounded-full text-xs">
                    HACKATHON
                  </Label>
                  <Button
                    variant="outline"
                    onClick={() => handleLearnMore(hack.address)}
                  >
                    View Details
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
