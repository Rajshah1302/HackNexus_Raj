"use client";

import React, { useEffect, useState } from "react";
import { useAccount } from "wagmi";
import { getPublicClient } from "@wagmi/core";
import { useRouter } from "next/navigation";

import { ArrowRight, Calendar, MapPin, Zap } from "lucide-react";
import Link from "next/link";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

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

// Props for our neon-styled event card
interface EventCardProps {
  hack: HackathonData;
  isPast?: boolean;
  glowIntensity: number;
  color: string; // gradient color from e.g. "from-blue-600 to-purple-600"
  onLearnMore: (addr: string) => void;
}

function EventCard({
  hack,
  isPast,
  glowIntensity,
  color,
  onLearnMore,
}: EventCardProps) {
  // We’re labeling everything as "HACKATHON" by default.
  // If you store event types on-chain, adjust accordingly.
  const eventType = "HACKATHON";

  return (
    <div
      className={`group border-0 bg-gray-900/30 backdrop-blur-sm overflow-hidden relative transition-transform duration-300 hover:-translate-y-1 ${
        isPast ? "opacity-70" : ""
      }`}
      style={{
        boxShadow: `0 0 ${10 * glowIntensity}px rgba(139, 92, 246, 0.4)`,
        transition: "all 0.3s ease-in-out",
      }}
    >
      <div
        className={`absolute inset-0 bg-gradient-to-r ${color} opacity-20 group-hover:opacity-30 transition-opacity`}
      ></div>
      <div
        className={`absolute top-0 left-0 w-1 h-full bg-gradient-to-b ${color}`}
      ></div>

      <CardContent className="p-6 relative z-10">
        <Badge
          className={`bg-gradient-to-r ${color} border-0 mb-3`}
          style={{
            boxShadow: `0 0 ${5 * glowIntensity}px rgba(139, 92, 246, 0.5)`,
            transition: "box-shadow 0.3s ease-in-out",
          }}
        >
          {eventType}
        </Badge>

        <h3 className="text-xl font-bold mb-2">{hack.hackathonName}</h3>

        <div className="space-y-2 mb-4">
          <div className="flex items-center gap-2 text-sm text-gray-300">
            <Calendar className="h-4 w-4" />
            {hack.hackathonDate}
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-300">
            <MapPin className="h-4 w-4" />
            <span className="font-mono">
              {hack.latitude}, {hack.longitude}
            </span>
          </div>
        </div>

        <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-800">
          <div className="text-sm text-gray-400">
            {/* If you had a prize from the contract, display it here. */}
            {/* <p>Prize Pool</p>
            <p className="font-bold">$50,000</p> */}
          </div>
          <button
            onClick={() => onLearnMore(hack.address)}
            className="flex items-center gap-1 text-gray-400 hover:text-white transition-colors"
          >
            Learn More
            <ArrowRight className="h-5 w-5" />
          </button>
        </div>
      </CardContent>
    </div>
  );
}

export default function AllHackathonsPage() {
  const router = useRouter();
  const { address: userAddress } = useAccount();

  // Glow intensity for neon effect
  const [glowIntensity, setGlowIntensity] = useState(1);

  useEffect(() => {
    const interval = setInterval(() => {
      setGlowIntensity(0.8 + Math.random() * 0.4);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const [activeTab, setActiveTab] = useState("all");

  // Hackathons from your contract
  const [hackathons, setHackathons] = useState<HackathonData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const chainId = config.state.chainId;

  // Fetch hackathons from contract
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
          const [hackathonName, hackathonDate, latitude, longitude] =
            (await Promise.all([
              publicClient.readContract({
                address: hackAddr,
                abi: HackNexusAbi,
                functionName: "hackathonName",
              }),
              publicClient.readContract({
                address: hackAddr,
                abi: HackNexusAbi,
                functionName: "hackathonDate",
              }),
              publicClient.readContract({
                address: hackAddr,
                abi: HackNexusAbi,
                functionName: "latitude",
              }),
              publicClient.readContract({
                address: hackAddr,
                abi: HackNexusAbi,
                functionName: "longitude",
              }),
            ])) as [string, string, string, string];

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
    // If hackathonDate is not a valid date, treat as upcoming
    if (isNaN(hackDate.getTime())) return true;
    return hackDate >= now;
  });
  const pastHackathons = hackathons.filter((hack) => {
    const hackDate = new Date(hack.hackathonDate);
    if (isNaN(hackDate.getTime())) return false;
    return hackDate < now;
  });

  // Sort upcoming ascending, past descending
  upcomingHackathons.sort(
    (a, b) =>
      new Date(a.hackathonDate).getTime() - new Date(b.hackathonDate).getTime()
  );
  pastHackathons.sort(
    (a, b) =>
      new Date(b.hackathonDate).getTime() - new Date(a.hackathonDate).getTime()
  );

  // Navigate to the detail page
  const handleLearnMore = (hackAddr: string) => {
    router.push(`/h?chainId=${chainId}&hack=${hackAddr}`);
  };

  // Cycle through a few gradient color combos for the cards
  const gradientColors = [
    "from-blue-600 to-purple-600",
    "from-pink-600 to-purple-600",
    "from-indigo-600 to-blue-600",
    "from-cyan-600 to-blue-600",
    "from-purple-600 to-pink-600",
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-950 via-blue-950 to-gray-950 text-white flex items-center justify-center">
        <p className="text-gray-300">Loading hackathons...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-950 via-blue-950 to-gray-950 text-white flex items-center justify-center">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-blue-950 to-gray-950 text-white">
      <div className="max-w-6xl mx-auto px-4 py-12">
        {/* Header */}
        <div className="mb-12">
          <h1
            className="text-5xl md:text-6xl font-bold tracking-tighter mb-8"
            style={{
              textShadow: `0 0 ${5 * glowIntensity}px #4f46e5, 0 0 ${
                10 * glowIntensity
              }px #818cf8`,
              transition: "text-shadow 1s ease-in-out",
            }}
          >
            Events
          </h1>

          {/* Tabs */}
          <Tabs
            defaultValue="all"
            className="w-full"
            onValueChange={setActiveTab}
          >
            <TabsList className="bg-gray-900/50 border border-gray-800">
              <TabsTrigger
                value="all"
                className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-purple-600"
              >
                All
              </TabsTrigger>
              <TabsTrigger
                value="hackathons"
                className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-purple-600"
              >
                Hackathons
              </TabsTrigger>
              <TabsTrigger
                value="summits"
                className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-purple-600"
              >
                Summits
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        {/* Upcoming Hackathons Section */}
        <section className="mb-16">
          <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2">
            <Zap className="h-5 w-5 text-purple-400" />
            Upcoming
          </h2>

          {upcomingHackathons.length === 0 ? (
            <p className="text-gray-300">No upcoming hackathons</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {upcomingHackathons.map((hack, idx) => (
                <Card key={hack.address} className="shadow-none">
                  <EventCard
                    hack={hack}
                    isPast={false}
                    glowIntensity={glowIntensity}
                    color={gradientColors[idx % gradientColors.length]}
                    onLearnMore={handleLearnMore}
                  />
                </Card>
              ))}
            </div>
          )}
        </section>

        {/* Past Hackathons Section */}
        <section>
          <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2">
            <Calendar className="h-5 w-5 text-purple-400" />
            Past
          </h2>

          {pastHackathons.length === 0 ? (
            <p className="text-gray-300">No past hackathons</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {pastHackathons.map((hack, idx) => (
                <Card key={hack.address} className="shadow-none">
                  <EventCard
                    hack={hack}
                    isPast
                    glowIntensity={glowIntensity}
                    color={gradientColors[idx % gradientColors.length]}
                    onLearnMore={handleLearnMore}
                  />
                </Card>
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
