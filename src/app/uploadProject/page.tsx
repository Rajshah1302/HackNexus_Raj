"use client";

import { useSearchParams } from "next/navigation";
import { UploadProject } from "./UploadProject";

interface PageProps {
  searchParams: {
    hackAddress?: string;
    chainId?: string;
  };
}

export default function UploadProjectPage() {
  const searchParams = useSearchParams();
  
    const chainIdParam = searchParams.get("chainId");
    const hackAddress = searchParams.get("hackAddress") || "";
  
    const chainId = chainIdParam ? Number(chainIdParam) : 0;

  return <UploadProject hackAddress={hackAddress} chainId={chainId} />;
}
