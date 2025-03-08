"use client";

import React, { useEffect, useState, useMemo } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { getPublicClient } from "@wagmi/core";
import { HackNexusAbi } from "@/utlis/contractsABI/HackNexusAbi";
import { config } from "@/utlis/config";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Zap, MapPin, Trophy, Layers } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Track {
  name: string;
  bounty: string;
}

interface TrackCardProps {
  name: string;
  bounty: string;
  color: string;
  glowIntensity: number;
}

function TrackCard({ name, bounty, color, glowIntensity }: TrackCardProps) {
  return (
    <Card
      className="border-0 bg-gray-900/30 backdrop-blur-sm overflow-hidden relative"
      style={{
        boxShadow: `0 0 ${10 * glowIntensity}px rgba(139, 92, 246, 0.4)`,
        transition: "box-shadow 1s ease-in-out",
      }}
    >
      <div
        className={`absolute inset-0 bg-gradient-to-r ${color} opacity-20`}
      ></div>
      <div
        className={`absolute top-0 left-0 w-1 h-full bg-gradient-to-b ${color}`}
      ></div>
      <CardContent className="p-6 relative z-10">
        <div className="flex justify-between items-start">
          <div>
            <Badge
              className={`bg-gradient-to-r ${color} border-0 mb-2`}
              style={{
                boxShadow: `0 0 ${5 * glowIntensity}px rgba(139, 92, 246, 0.5)`,
                transition: "box-shadow 1s ease-in-out",
              }}
            >
              Track
            </Badge>
            <h4 className="text-xl font-bold mb-1">{name}</h4>
          </div>
          <Trophy className="h-5 w-5 text-yellow-400" />
        </div>
        <div className="mt-4">
          <p className="text-gray-400 text-sm">Bounty:</p>
          <p className="text-2xl font-bold text-white">{bounty}</p>
        </div>
      </CardContent>
    </Card>
  );
}

export default function HackathonDetailPage() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const chainIdParam = searchParams.get("chainId");
  const hackathonAddressParam = searchParams.get("hack");
  const chainId = chainIdParam ? Number(chainIdParam) : 0;

  // Glow intensity for the neon animation
  const [glowIntensity, setGlowIntensity] = useState(1);

  useEffect(() => {
    const interval = setInterval(() => {
      setGlowIntensity(0.8 + Math.random() * 0.4);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  // Wagmi public client
  const publicClient = useMemo(() => {
    if (!chainId) return null;
    return getPublicClient(config as any, { chainId });
  }, [chainId]);

  // UI states
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Hackathon data from contract
  const [hackathonName, setHackathonName] = useState("");
  const [hackathonDate, setHackathonDate] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [totalPrizePool, setTotalPrizePool] = useState("");
  const [imageURL, setImageURL] = useState("");
  const [tracks, setTracks] = useState<Track[]>([]);

  // Fetch hackathon data
  useEffect(() => {
    if (!chainId || !hackathonAddressParam || !publicClient) return;

    async function fetchHackathonData() {
      setLoading(true);
      setError(null);
      try {
        // Fetch basic details in parallel
        const [hName, hDate, lat, lng, prizePool, imgURL] = (await Promise.all([
          publicClient?.readContract({
            address: hackathonAddressParam as `0x${string}`,
            abi: HackNexusAbi,
            functionName: "hackathonName",
          }),
          publicClient?.readContract({
            address: hackathonAddressParam as `0x${string}`,
            abi: HackNexusAbi,
            functionName: "hackathonDate",
          }),
          publicClient?.readContract({
            address: hackathonAddressParam as `0x${string}`,
            abi: HackNexusAbi,
            functionName: "latitude",
          }),
          publicClient?.readContract({
            address: hackathonAddressParam as `0x${string}`,
            abi: HackNexusAbi,
            functionName: "longitude",
          }),
          publicClient?.readContract({
            address: hackathonAddressParam as `0x${string}`,
            abi: HackNexusAbi,
            functionName: "totalPrizePool",
          }),
          publicClient?.readContract({
            address: hackathonAddressParam as `0x${string}`,
            abi: HackNexusAbi,
            functionName: "imageURL",
          }),
        ])) as [string, string, string, string, string, string];

        setHackathonName(hName);
        setHackathonDate(hDate);
        setLatitude(lat);
        setLongitude(lng);
        setTotalPrizePool(prizePool);
        setImageURL(imgURL);

        // Fetch tracks
        const tracksFetched: Track[] = [];
        for (let i = 0; i < 50; i++) {
          try {
            const [trackName, trackBounty] = (await publicClient?.readContract({
              address: hackathonAddressParam as `0x${string}`,
              abi: HackNexusAbi,
              functionName: "tracks",
              args: [BigInt(i)],
            })) as [string, string];
            tracksFetched.push({ name: trackName, bounty: trackBounty });
          } catch (err) {
            // Break when no more tracks
            break;
          }
        }
        setTracks(tracksFetched);
      } catch (err) {
        console.error("Error fetching hackathon data:", err);
        setError("Failed to fetch hackathon data. Please try again later.");
      } finally {
        setLoading(false);
      }
    }

    fetchHackathonData();
  }, [chainId, hackathonAddressParam, publicClient]);

  // Navigation
  const handleUploadProject = () => {
    router.push(
      `/uploadProject?hackAddress=${hackathonAddressParam}&chainId=${chainId}`
    );
  };

  // Edge cases
  if (!hackathonAddressParam) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-950 via-blue-950 to-gray-950 text-white flex items-center justify-center">
        <p className="text-gray-300">No hackathon address provided.</p>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-950 via-blue-950 to-gray-950 text-white flex items-center justify-center">
        <p className="text-gray-300">Loading hackathon details...</p>
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

  // Track card gradient colors (cycled through)
  const trackColors = [
    "from-blue-600 to-purple-600",
    "from-pink-600 to-purple-600",
    "from-indigo-600 to-blue-600",
    "from-cyan-600 to-blue-600",
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-blue-950 to-gray-950 text-white">
      <div className="max-w-5xl mx-auto px-4 py-12">
        {/* Hackathon Name & Date in the Center */}
        <div className="text-center mb-12">
          <h1
            className="text-6xl md:text-7xl font-bold tracking-tighter mb-2"
            style={{
              textShadow: `0 0 ${5 * glowIntensity}px #4f46e5, 0 0 ${
                10 * glowIntensity
              }px #818cf8`,
              transition: "text-shadow 1s ease-in-out",
            }}
          >
            {hackathonName || "Untitled Hackathon"}
          </h1>
          <h2
            className="text-3xl md:text-4xl font-semibold text-blue-300"
            style={{
              textShadow: `0 0 ${3 * glowIntensity}px #93c5fd`,
              transition: "text-shadow 1s ease-in-out",
            }}
          >
            {hackathonDate}
          </h2>
        </div>

        {/* Upload Project Button */}
        <div className="flex justify-center mb-12">
          <Button
            onClick={handleUploadProject}
            className="group relative px-8 py-3 rounded-lg bg-transparent overflow-hidden"
            style={{
              boxShadow: `0 0 ${8 * glowIntensity}px rgba(236, 72, 153, 0.7)`,
              transition: "all 0.3s ease",
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-pink-600 to-purple-600 opacity-80"></div>
            <div className="absolute inset-0 bg-gradient-to-r from-pink-600 to-purple-600 opacity-0 group-hover:opacity-80 transition-opacity"></div>
            <div className="relative flex items-center justify-center gap-2">
              <Zap className="h-5 w-5" />
              <span className="font-bold text-lg">Upload Project</span>
            </div>
            <div
              className="absolute inset-0 border border-pink-400 rounded-lg"
              style={{
                boxShadow: `inset 0 0 ${
                  5 * glowIntensity
                }px rgba(236, 72, 153, 0.5)`,
              }}
            ></div>
          </Button>
        </div>

        {/* Coordinates */}
        <div className="flex items-center justify-center gap-6 mb-12">
          <div className="flex items-center gap-2">
            <MapPin className="h-5 w-5 text-pink-400" />
            <div>
              <p className="text-gray-400 text-sm">Latitude:</p>
              <p className="text-pink-300 font-mono">{latitude}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="h-5 w-5 text-pink-400" />
            <div>
              <p className="text-gray-400 text-sm">Longitude:</p>
              <p className="text-pink-300 font-mono">{longitude}</p>
            </div>
          </div>
        </div>

        {/* Image Preview */}
        {/* {imageURL && (
          <div
            className="mb-12 rounded-lg overflow-hidden relative"
            style={{
              boxShadow: `0 0 ${10 * glowIntensity}px rgba(139, 92, 246, 0.5)`,
              transition: "box-shadow 1s ease-in-out",
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-tr from-purple-500/20 to-cyan-500/20 z-10"></div>
            <div className="text-center py-4 bg-black/50 absolute bottom-0 w-full z-20">
              <h3 className="text-xl font-semibold text-white">
                Image Preview
              </h3>
            </div>
            <img
              src={`data:image/svg+xml;base64,${imageURL}`}
              alt="Hackathon"
              className="w-full h-[400px] object-cover"
            />
          </div>
        )} */}

        {/* Prize Pool */}
        <div className="mb-12 text-center">
          <div className="inline-block relative">
            <h3 className="text-2xl text-gray-300 mb-2">Total Prize Pool:</h3>
            <p
              className="text-5xl md:text-6xl font-bold"
              style={{
                background: "linear-gradient(90deg, #4f46e5, #ec4899, #4f46e5)",
                backgroundSize: "200% auto",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                animation: "gradient 3s linear infinite",
                textShadow: `0 0 ${
                  8 * glowIntensity
                }px rgba(139, 92, 246, 0.7)`,
                transition: "text-shadow 1s ease-in-out",
              }}
            >
              ${totalPrizePool || "0"}
            </p>
            <style jsx>{`
              @keyframes gradient {
                0% {
                  background-position: 0% center;
                }
                100% {
                  background-position: 200% center;
                }
              }
            `}</style>
          </div>
        </div>

        {/* Tracks & Bounties */}
        <div className="mb-12">
          <div className="flex items-center gap-2 mb-6">
            <Layers className="h-6 w-6 text-purple-400" />
            <h3 className="text-2xl font-semibold">Tracks &amp; Bounties</h3>
          </div>

          {tracks.length === 0 ? (
            <p className="text-gray-400">No tracks found.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {tracks.map((track, i) => (
                <TrackCard
                  key={i}
                  name={track.name}
                  bounty={track.bounty}
                  glowIntensity={glowIntensity}
                  color={trackColors[i % trackColors.length]}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
