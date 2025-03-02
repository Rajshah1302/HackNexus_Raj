"use client";

import React, { useEffect, useState, useMemo } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { getPublicClient } from "@wagmi/core";
import { HackNexusAbi } from "@/utlis/contractsABI/HackNexusAbi";
import { config } from "@/utlis/config";
import { Button } from "@/components/ui/button";

interface Track {
  name: string;
  bounty: string;
}

export default function HackathonDetailPage() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const chainIdParam = searchParams.get("chainId");
  const hackathonAddressParam = searchParams.get("hack");

  const chainId = chainIdParam ? Number(chainIdParam) : 0;

  // Memoize the public client so it doesn't recreate on every render
  const publicClient = useMemo(() => {
    if (!chainId) return null;
    return getPublicClient(config as any, { chainId });
  }, [chainId]);

  // UI states
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Hackathon contract data
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
        // Fetch basic hackathon details in parallel
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

        // Fetch tracks in a loop (stops on error/revert)
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

  // --- RENDER STATES ---
  if (!hackathonAddressParam) {
    return (
      <div className="min-h-screen bg-[#0E1624] text-white flex items-center justify-center">
        <p className="text-gray-300">No hackathon address provided.</p>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0E1624] text-white flex items-center justify-center">
        <p className="text-gray-300">Loading hackathon details...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#0E1624] text-white flex items-center justify-center">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  // Function to navigate to the upload project page
  const handleUploadProject = () => {
    router.push(
      `/uploadProject?hackAddress=${hackathonAddressParam}&chainId=${chainId}`
    );
  };

  // --- MAIN UI ---
  return (
    <div className="min-h-screen bg-[#0E1624] text-white">
      {/* Header with Upload Project Button */}
      <header className="border-b border-gray-700 px-6 py-4 flex items-center justify-between">
        <h1 className="text-2xl font-bold">Hackathon Details</h1>
        <Button onClick={handleUploadProject}>Upload Project</Button>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-[#1B2430] border border-gray-700 rounded-lg p-6 shadow-md">
          <h2 className="text-xl font-semibold text-white mb-4">
            {hackathonName || "Untitled Hackathon"}
          </h2>

          <p className="text-gray-300 mb-2">
            <span className="font-medium text-white">Date:</span>{" "}
            {hackathonDate}
          </p>
          <p className="text-gray-300 mb-2">
            <span className="font-medium text-white">Latitude:</span> {latitude}
          </p>
          <p className="text-gray-300 mb-2">
            <span className="font-medium text-white">Longitude:</span>{" "}
            {longitude}
          </p>
          <p className="text-gray-300 mb-2">
            <span className="font-medium text-white">Total Prize Pool:</span>{" "}
            {totalPrizePool}
          </p>

          {imageURL && (
            <div className="mt-4">
              <span className="font-medium text-white">Image Preview:</span>
              <div className="mt-2 bg-gray-900 inline-block p-2">
                <img
                  src={`data:image/svg+xml;base64,${imageURL}`}
                  alt="Hackathon"
                  className="max-h-64 w-auto"
                />
              </div>
            </div>
          )}

          <div className="mt-6">
            <h3 className="text-lg font-semibold text-white mb-2">
              Tracks &amp; Bounties
            </h3>
            {tracks.length === 0 ? (
              <p className="text-gray-400">No tracks found.</p>
            ) : (
              <ul className="space-y-2">
                {tracks.map((t, idx) => (
                  <li
                    key={idx}
                    className="bg-[#2A3342] rounded-md p-3 flex items-center justify-between"
                  >
                    <span className="text-gray-200 font-medium">{t.name}</span>
                    <span className="text-blue-300 ml-4">
                      Bounty: {t.bounty}
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
