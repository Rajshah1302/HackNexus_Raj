"use client";

import Image from "next/image";
import { Github } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useEffect, useState } from "react";
import { getPublicClient } from "@wagmi/core";
import { HackNexusAbi } from "@/utlis/contractsABI/HackNexusAbi";
import ChatPage from "@/app/chatbot/page";
import fallbackImg from "@/assets/nft1.jpeg";
import { config } from "@/utlis/config";

interface HackathonDetails {
  hackathonName: string;
  hackathonDate: string;
  latitude: string;
  longitude: string;
  totalPrizePool: string;
  imageURL: string;
}

interface ProjectDetailsData {
  projectName: string;
  github: string;
  youtube: string;
}

interface ProjectDetailsProps {
  hackAddress: string;
  chainId: number;
  tokenId: number; // token to query the project details mapping
}

export function ProjectDetails({
  hackAddress,
  chainId,
  tokenId,
}: ProjectDetailsProps) {
  const [hackathonDetails, setHackathonDetails] =
    useState<HackathonDetails | null>(null);
  const [projectDetails, setProjectDetails] =
    useState<ProjectDetailsData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Helper function to return a valid image src for Next.js Image
  const getValidImageSrc = (imgStr: string) => {
    if (!imgStr) return fallbackImg;
    if (imgStr.startsWith("data:") || imgStr.startsWith("http")) {
      return imgStr;
    }
    // Convert raw SVG string to base64-encoded data URL
    try {
      return `data:image/svg+xml;base64,${btoa(imgStr)}`;
    } catch (e) {
      console.error("Error encoding image string", e);
      return fallbackImg;
    }
  };

  useEffect(() => {
    if (!hackAddress || !chainId || tokenId === undefined) return;

    const fetchDetails = async () => {
      try {
        setLoading(true);
        const publicClient = getPublicClient(config as any, { chainId });

        // Fetch hackathon details with explicit casting to string
        const hackathonName = (await publicClient.readContract({
          address: hackAddress as `0x${string}`,
          abi: HackNexusAbi,
          functionName: "hackathonName",
        })) as string;

        const hackathonDate = (await publicClient.readContract({
          address: hackAddress as `0x${string}`,
          abi: HackNexusAbi,
          functionName: "hackathonDate",
        })) as string;

        const latitude = (await publicClient.readContract({
          address: hackAddress as `0x${string}`,
          abi: HackNexusAbi,
          functionName: "latitude",
        })) as string;

        const longitude = (await publicClient.readContract({
          address: hackAddress as `0x${string}`,
          abi: HackNexusAbi,
          functionName: "longitude",
        })) as string;

        const totalPrizePool = (await publicClient.readContract({
          address: hackAddress as `0x${string}`,
          abi: HackNexusAbi,
          functionName: "totalPrizePool",
        })) as string;

        const imageURL = (await publicClient.readContract({
          address: hackAddress as `0x${string}`,
          abi: HackNexusAbi,
          functionName: "imageURL",
        })) as string;

        setHackathonDetails({
          hackathonName,
          hackathonDate,
          latitude,
          longitude,
          totalPrizePool,
          imageURL,
        });

        // Fetch project details using tokenDetails mapping with proper type casting
        const details = (await publicClient.readContract({
          address: hackAddress as `0x${string}`,
          abi: HackNexusAbi,
          functionName: "tokenDetails",
          args: [tokenId],
        })) as [string, string, string];

        const [projectName, github, youtube] = details;

        setProjectDetails({
          projectName,
          github,
          youtube,
        });
      } catch (err) {
        console.error("Error fetching details:", err);
        setError("Failed to load details");
      } finally {
        setLoading(false);
      }
    };

    fetchDetails();
  }, [hackAddress, chainId, tokenId]);

  if (loading) {
    return <p className="p-4 text-slate-50">Loading details...</p>;
  }

  if (error || !hackathonDetails || !projectDetails) {
    return <p className="p-4 text-red-500">{error || "Details not found"}</p>;
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50 p-4 md:p-8">
      {/* Hackathon Header */}
      <div className="max-w-6xl mx-auto mb-10">
        <Card className="bg-slate-800 border-slate-700">
          <CardHeader>
            <CardTitle className="text-3xl font-bold">
              {hackathonDetails.hackathonName}
            </CardTitle>
            <p className="text-lg">{hackathonDetails.hackathonDate}</p>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-4">
              <Badge variant="secondary">
                Latitude: {hackathonDetails.latitude}
              </Badge>
              <Badge variant="secondary">
                Longitude: {hackathonDetails.longitude}
              </Badge>
              <Badge variant="secondary">
                Prize Pool: {hackathonDetails.totalPrizePool}
              </Badge>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto grid gap-6 md:grid-cols-2">
        {/* Left Column: Hackathon Image */}
        <div className="space-y-6">
                <ChatPage repo="https://github.com/Rajshah1302/Frontend" />
        </div>

        {/* Right Column: Project Details */}
        <div className="space-y-6">
          <Card className="border-slate-800 bg-slate-900">
            <CardHeader>
              <CardTitle className="text-xl font-semibold">
                {projectDetails.projectName}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-slate-300">
                This project represents your hackathon participation. Additional
                project details can be displayed here.
              </p>
            </CardContent>
          </Card>

          {/* Demo Video */}
          <Card className="border-slate-800 bg-slate-900">
            <CardHeader>
              <CardTitle className="text-xl font-semibold">
                Demo Video
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mt-2 text-slate-300">
                <a
                  href={projectDetails.youtube}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline hover:text-blue-400"
                >
                  Watch Demo Video
                </a>
              </p>
            </CardContent>
          </Card>

          {/* GitHub Link */}
          <Card className="border-slate-800 bg-slate-900/50">
            <CardContent className="p-6">
              <Button
                variant="outline"
                className="w-full border-slate-700 hover:bg-slate-800 hover:text-slate-50"
                onClick={() => window.open(projectDetails.github, "_blank")}
              >
                <Github className="mr-2 h-4 w-4" />
                View on GitHub
              </Button>
            </CardContent>
          </Card>

          {/* ChatBot or Extra Component */}
        </div>
      </div>
    </div>
  );
}
