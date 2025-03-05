"use client";

import { useSearchParams } from "next/navigation";
import { ProjectDetails } from "./projectDetails";

export default function ProjectDetailPage() {
  const searchParams = useSearchParams();

  const chainIdParam = searchParams.get("chainId");
  const hackAddress = searchParams.get("hackAddress") || "";

  const chainId = chainIdParam ? Number(chainIdParam) : 0;
  // console.log(hackAddress, chainId);

  return <ProjectDetails hackAddress={hackAddress} chainId={chainId} tokenId={1}/>;
}
