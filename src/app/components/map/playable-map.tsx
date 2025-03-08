"use client";

import React, { useState, useEffect, useCallback, useMemo } from "react";
import { useRouter } from "next/navigation";
import { useAccount } from "wagmi";
import { getPublicClient } from "@wagmi/core";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTitle,
} from "@/app/components/ui/dialog";
import MapComponent from "@/app/components/map/map";

// Icons, UI, Assets
import { X } from "lucide-react";
import NexusLogo from "@/assets/nexusLogo.png";
import Button from "@/components/Button";

// ABIs and addresses
import { HackNexusFactoryAbi } from "@/utlis/contractsABI/HackNexusFactoryAbi";
import { HackNexusAbi } from "@/utlis/contractsABI/HackNexusAbi";
import { HackNexusFactoryAddress } from "@/utlis/addresses";
import { config } from "@/utlis/config";

interface Hackathon {
  address: `0x${string}`;
  hackathonName: string;
  hackathonDate: string;
  latitude: string;
  longitude: string;
  totalPrizePool: string;
}

export default function PlayableMap() {
  const router = useRouter();
  const { address: userAddress } = useAccount();

  const [hackathons, setHackathons] = useState<Hackathon[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Modal state
  const [selectedHackathon, setSelectedHackathon] = useState<Hackathon | null>(
    null
  );
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Current user location
  const [currentUser, setCurrentUser] = useState({
    id: "current",
    latitude: 0,
    longitude: 0,
    name: "You",
    avatarUrl: "📍",
  });

  // Fetch hackathons from contract
  const fetchHackathons = async () => {
    if (!userAddress) return;
    try {
      setLoading(true);
      setError(null);

      const publicClient = getPublicClient(config as any, {
        chainId: config.state.chainId,
      });

      const hackathonAddresses = (await publicClient.readContract({
        address: HackNexusFactoryAddress[config.state.chainId] as `0x${string}`,
        abi: HackNexusFactoryAbi,
        functionName: "getHackathonAddresses",
        args: [userAddress],
      })) as `0x${string}[]`;

      const hackathonDataPromises = hackathonAddresses.map(async (addr) => {
        try {
          const [
            hackathonName,
            hackathonDate,
            latitude,
            longitude,
            totalPrizePool,
          ] = (await Promise.all([
            publicClient.readContract({
              address: addr,
              abi: HackNexusAbi,
              functionName: "hackathonName",
            }),
            publicClient.readContract({
              address: addr,
              abi: HackNexusAbi,
              functionName: "hackathonDate",
            }),
            publicClient.readContract({
              address: addr,
              abi: HackNexusAbi,
              functionName: "latitude",
            }),
            publicClient.readContract({
              address: addr,
              abi: HackNexusAbi,
              functionName: "longitude",
            }),
            publicClient.readContract({
              address: addr,
              abi: HackNexusAbi,
              functionName: "totalPrizePool",
            }),
          ])) as [string, string, string, string, string];

          return {
            address: addr,
            hackathonName,
            hackathonDate,
            latitude,
            longitude,
            totalPrizePool,
          };
        } catch (err) {
          console.error("Error reading hackathon data:", err);
          return null;
        }
      });

      const results = await Promise.all(hackathonDataPromises);
      const validHackathons = results.filter((h) => h !== null) as Hackathon[];

      setHackathons(validHackathons);
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
  }, [userAddress]);

  useEffect(() => {
    if (!navigator.geolocation) return;
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setCurrentUser((prev) => ({
          ...prev,
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        }));
      },
      (error) => console.error("Error retrieving geolocation:", error)
    );
  }, []);

  // Convert hackathons into marker format for MapComponent
  const markers = useMemo(() => {
    return hackathons.map((hack) => ({
      id: hack.address,
      name: hack.hackathonName,
      latitude: parseFloat(hack.latitude),
      longitude: parseFloat(hack.longitude),
      symbol: "HACK",
      logoUrl: "/assets/nexuslogo.png",
      backgroundColor: "#8A2BE2",
    }));
  }, [hackathons]);

  // Handle marker click: open modal with hackathon details
  const handleTokenClick = useCallback(
    (markerId: string) => {
      const found = hackathons.find((h) => h.address === markerId);
      if (found) {
        setSelectedHackathon(found);
        setIsModalOpen(true);
      }
    },
    [hackathons]
  );

  const handleModalClose = useCallback(() => {
    setIsModalOpen(false);
    setSelectedHackathon(null);
  }, []);

  // Pass props to MapComponent
  const mapProps = useMemo(
    () => ({
      tokens: markers,
      currentUser,
      onTokenClick: (token: { id: string }) => handleTokenClick(token.id),
    }),
    [markers, currentUser, handleTokenClick]
  );

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-white">
        <p>Loading hackathons...</p>
      </div>
    );
  }
  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-red-500">
        {error}
      </div>
    );
  }

  // Redirect logic for Claim
  const handleClaim = () => {
    router.push("/mint");
  };

  return (
    <>
      <main className="flex flex-col items-center justify-center min-h-screen bg-black text-white">
        <MapComponent {...mapProps} />
      </main>

      {/*
        IMPORTANT:
        - The Dialog's children are conditionally rendered
          so the backdrop only appears if `isModalOpen` is true.
      */}
      <Dialog
        open={isModalOpen}
        onOpenChange={(open) => !open && handleModalClose()}
      >
        {isModalOpen && (
          <>
            {/* Backdrop (only rendered if isModalOpen === true) */}
            <div className="fixed inset-0 bg-black/50 z-40" />

            {/* Center the modal content */}
            <div className="fixed inset-0 z-50 flex items-center justify-center">
              <DialogContent
                className="
                  relative 
                  bg-[#1a1a1a] 
                  text-white 
                  border 
                  border-[#333] 
                  rounded-lg 
                  shadow-md 
                  p-6 
                  max-w-sm 
                  w-full 
                  mx-4
                "
              >
                <DialogClose className="absolute top-4 right-4 text-gray-400 hover:text-gray-200">
                  <X className="w-5 h-5" />
                </DialogClose>

                {selectedHackathon && (
                  <>
                    <DialogTitle className="text-xl font-bold text-center mb-4">
                      {selectedHackathon.hackathonName}
                    </DialogTitle>

                    <div className="flex justify-center mb-4">
                      <img
                        src={NexusLogo.src}
                        alt="Hackathon Logo"
                        className="w-14 h-14 object-contain"
                      />
                    </div>

                    <div className="flex justify-center mb-2">
                      <span className="inline-block bg-gray-700 px-2 py-1 rounded-full text-sm font-medium">
                        {selectedHackathon.hackathonDate || "HACK"}
                      </span>
                    </div>

                    <div className="text-center text-sm text-gray-300 space-y-2 mb-4">
                      <p>Connect your wallet.</p>
                      <p>Claim rewards now!</p>
                    </div>

                    <div className="flex items-center justify-center text-base text-gray-100 mb-4">
                      <img
                        src="/someRewardIcon.png"
                        alt="Reward"
                        className="w-5 h-5 mr-2"
                      />
                      {selectedHackathon.totalPrizePool} $APT for grabs
                    </div>

                    <Button
                      onClick={handleClaim}
                      className="
                        w-full 
                        bg-blue-600 
                        hover:bg-blue-500 
                        text-white 
                        font-semibold 
                        py-2 
                        rounded-md 
                        flex 
                        items-center 
                        justify-center 
                        transition 
                        focus:outline-none 
                        focus:ring-2 
                        focus:ring-blue-400 
                        relative
                      "
                    >
                      Claim
                      <span className="absolute inset-0 rounded-md ring-2 ring-transparent group-hover:ring-blue-400 transition"></span>
                    </Button>
                  </>
                )}
              </DialogContent>
            </div>
          </>
        )}
      </Dialog>
    </>
  );
}
