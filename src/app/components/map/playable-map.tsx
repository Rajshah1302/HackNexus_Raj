"use client";

import React, { useState, useEffect, useCallback, useMemo } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
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
import { X } from "lucide-react"; // For a close button (shadcn/lucide-react)
import Info from "../common/info"; // If you have a custom Info component
import NexusLogo from "@/assets/nexusLogo.png";
import Button from "@/components/Button";

// ABIs and addresses (update paths to your real files)
import { HackNexusFactoryAbi } from "@/utlis/contractsABI/HackNexusFactoryAbi";
import { HackNexusAbi } from "@/utlis/contractsABI/HackNexusAbi";
import { HackNexusFactoryAddress } from "@/utlis/addresses";
import { config } from "@/utlis/config";

// Example interface for Hackathon data
interface Hackathon {
  address: `0x${string}`;
  hackathonName: string;
  hackathonDate: string;
  latitude: string;
  longitude: string;
  totalPrizePool: string;
  // Add other fields as needed
}

export default function PlayableMap() {
  const router = useRouter();
  const { address: userAddress } = useAccount();

  // All hackathons read from the contract
  const [hackathons, setHackathons] = useState<Hackathon[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // The hackathon currently selected in the modal
  const [selectedHackathon, setSelectedHackathon] = useState<Hackathon | null>(
    null
  );

  // Modal open/close state
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

      // 1) Get all hackathon addresses for this user
      const hackathonAddresses = (await publicClient.readContract({
        address: HackNexusFactoryAddress[config.state.chainId] as `0x${string}`,
        abi: HackNexusFactoryAbi,
        functionName: "getHackathonAddresses",
        args: [userAddress],
      })) as `0x${string}[]`;

      // 2) For each hackathon address, read data from the HackNexus contract
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

  // On mount + whenever user changes
  useEffect(() => {
    if (userAddress) {
      fetchHackathons();
    }
  }, [userAddress]);

  // Get user location
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
      id: hack.address, // string
      name: hack.hackathonName, // string
      latitude: parseFloat(hack.latitude), // number
      longitude: parseFloat(hack.longitude), // number

      // Add these to satisfy the Token interface
      symbol: "HACK", // string
      logoUrl: "/assets/nexuslogo.png", // string (or a dynamic URL)
      backgroundColor: "#8A2BE2", // string
    }));
  }, [hackathons]);


  // Handle marker click
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

  // Close modal
  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedHackathon(null);
  };

  // Pass these props to MapComponent
  const mapProps = useMemo(
    () => ({
      tokens: markers, // rename to "tokens" if your map expects that prop
      currentUser,
      onTokenClick: (token: { id: string }) => handleTokenClick(token.id),
    }),
    [markers, currentUser, handleTokenClick]
  );

  // If loading or error
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

  // The "Claim" or "Mint" logic
  const handleClaim = () => {
    router.push("/mint");
  };

  return (
    <>
      {/* MAIN PAGE */}
      <main className="flex flex-col items-center justify-center min-h-screen bg-black text-white">
        {/* MAP */}
        <MapComponent
          tokens={markers} // now includes all required fields
          currentUser={currentUser}
          onTokenClick={(token) => {
            /* handle click */
          }}
        />
      </main>

      {/* MODAL (Dialog) */}
      <Dialog
        open={isModalOpen}
        onOpenChange={(open) => !open && handleModalClose()}
      >
        <DialogContent
          className="relative bg-[#1a1a1a] text-white border border-[#333] 
                                  rounded-lg shadow-md p-6 max-w-sm mx-auto"
        >
          {/* Close Button */}
          <DialogClose className="absolute top-4 right-4 text-gray-400 hover:text-gray-200">
            <X className="w-5 h-5" />
          </DialogClose>

          {selectedHackathon && (
            <>
              <DialogTitle className="text-xl font-bold text-center mb-4">
                {selectedHackathon.hackathonName}
              </DialogTitle>

              {/* Logo */}
              <div className="flex justify-center mb-4">
                <img
                  src={NexusLogo.src}
                  alt="Hackathon Logo"
                  className="w-14 h-14 object-contain"
                />
              </div>

              {/* Pill / Symbol */}
              <div className="flex justify-center mb-2">
                <span className="inline-block bg-gray-700 px-2 py-1 rounded-full text-sm font-medium">
                  {/* If you have a tokenSymbol or short name, place it here */}
                  {selectedHackathon.hackathonDate || "HACK"}
                </span>
              </div>

              {/* Info / Description */}
              <div className="text-center text-sm text-gray-300 space-y-2 mb-4">
                <p>Connect your wallet.</p>
                <p>Claim rewards now!</p>
              </div>

              {/* Reward Example */}
              <div className="flex items-center justify-center text-base text-gray-100 mb-4">
                {/* For example, show totalPrizePool or a fixed reward */}
                <img
                  src="/someRewardIcon.png"
                  alt="Reward"
                  className="w-5 h-5 mr-2"
                />
                {selectedHackathon.totalPrizePool} $APT for grabs
              </div>

              {/* Claim Button */}
              <Button
                onClick={handleClaim}
                className="w-full bg-blue-600 hover:bg-blue-500 
                           text-white font-semibold py-2 rounded-md 
                           flex items-center justify-center 
                           transition focus:outline-none 
                           focus:ring-2 focus:ring-blue-400 
                           relative"
              >
                Claim
                <span className="absolute inset-0 rounded-md ring-2 ring-transparent group-hover:ring-blue-400 transition"></span>
              </Button>
            </>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
