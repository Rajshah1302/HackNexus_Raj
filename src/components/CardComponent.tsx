"use client";

import Link from "next/link";
import { HackathonData } from "@/app/explorer/page";
// ^ adjust the path if needed

interface CardHackathonProps {
  hackathon: HackathonData;
}

export default function CardHackathon({ hackathon }: CardHackathonProps) {
  return (
    <div className="p-6 bg-[#1E293B] text-white border border-gray-700 rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300">

      <h2 className="text-2xl font-bold mb-2">
        {hackathon.hackathonName || "No Name"}
      </h2>
      <p className="mb-1">
        <span className="font-semibold">Date:</span> {hackathon.hackathonDate}
      </p>
      <p className="mb-1">
        <span className="font-semibold">Latitude:</span> {hackathon.latitude}
      </p>
      <p className="mb-1">
        <span className="font-semibold">Longitude:</span> {hackathon.longitude}
      </p>

      <Link
        href={`/hackathons/detail?chainId=5&hackathonAddress=${hackathon.hackathonAddress}`}
        className="inline-block mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-500 transition-colors"
      >
        View Details
      </Link>
    </div>
  );
}
