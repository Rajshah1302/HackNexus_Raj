"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { writeContract } from "@wagmi/core";
import { toast } from "@/components/ui/use-toast";
import { Header } from "@/components/Header";
import { HackNexusAbi } from "@/utlis/contractsABI/HackNexusAbi";
import { config } from "@/utlis/config";

interface UploadProject {
  projectName: string;
  githubLink: string;
  demoVideoLink: string;
}

interface UploadProjectProps {
  hackAddress: string;
  chainId: number;
}

export function UploadProject({ hackAddress, chainId }: UploadProjectProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UploadProject>();

  const [loading, setLoading] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<string | null>(null);

  const onSubmit = async (data: UploadProject) => {
    setLoading(true);
    try {
      if (!chainId || !hackAddress) {
        throw new Error("Missing chainId or hack contract address");
      }

      // Call the mint function on the HackNexus contract using the passed-in props
      const tx = await writeContract(config,{
        address: hackAddress as `0x${string}`,
        abi: HackNexusAbi,
        functionName: "mint",
        args: [data.projectName, data.githubLink, data.demoVideoLink],
      });

      console.log("Transaction:", tx);
      setSubmitStatus("Project submitted successfully!");
      toast({
        title: "Success",
        description: "Project submitted successfully!",
      });
    } catch (error: any) {
      console.error("Error submitting project:", error);
      setSubmitStatus("Error submitting project.");
      toast({
        title: "Error",
        description:
          error?.message || "An error occurred while submitting the project.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
      // Clear the status after 3 seconds.
      setTimeout(() => setSubmitStatus(null), 3000);
    }
  };

  return (
    <main className="min-h-screen bg-[#0B0E11] flex items-center justify-center px-4">
      {/* Optional: You can still include the Header if needed */}
      <div className="absolute top-0 left-0 w-full">
        <Header />
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="
          w-full 
          max-w-md 
          bg-[#1A1D21] 
          p-8 
          rounded-lg 
          shadow-lg 
          space-y-6
        "
      >
        <h2 className="text-2xl font-semibold text-white">
          Project Submission
        </h2>
        <p className="text-gray-400">Share your project details with us</p>

        {/* Project Name Field */}
        <div>
          <Label htmlFor="projectName" className="text-white">
            Project Name
          </Label>
          <Input
            id="projectName"
            placeholder="Enter your project name"
            className="
              mt-1 
              w-full 
              rounded-md 
              border-none 
              bg-[#2A2E35] 
              text-white 
              placeholder-gray-400
              focus:ring-2 
              focus:ring-blue-600
            "
            {...register("projectName", {
              required: "Project name is required",
            })}
          />
          {errors.projectName && (
            <p className="text-red-500 text-sm mt-1">
              {errors.projectName.message}
            </p>
          )}
        </div>

        {/* GitHub Link Field */}
        <div>
          <Label htmlFor="githubLink" className="text-white">
            GitHub Link
          </Label>
          <Input
            id="githubLink"
            placeholder="https://github.com/username/repo"
            className="
              mt-1 
              w-full 
              rounded-md 
              border-none 
              bg-[#2A2E35] 
              text-white 
              placeholder-gray-400
              focus:ring-2 
              focus:ring-blue-600
            "
            {...register("githubLink", {
              required: "GitHub link is required",
            })}
          />
          {errors.githubLink && (
            <p className="text-red-500 text-sm mt-1">
              {errors.githubLink.message}
            </p>
          )}
        </div>

        {/* Demo Video Link Field */}
        <div>
          <Label htmlFor="demoVideoLink" className="text-white">
            Demo Video Link
          </Label>
          <Input
            id="demoVideoLink"
            placeholder="https://youtube.com/watch?v=..."
            className="
              mt-1 
              w-full 
              rounded-md 
              border-none 
              bg-[#2A2E35] 
              text-white 
              placeholder-gray-400
              focus:ring-2 
              focus:ring-blue-600
            "
            {...register("demoVideoLink", {
              required: "Demo video link is required",
            })}
          />
          {errors.demoVideoLink && (
            <p className="text-red-500 text-sm mt-1">
              {errors.demoVideoLink.message}
            </p>
          )}
        </div>

        <Button
          type="submit"
          disabled={loading}
          className="
            w-full 
            bg-blue-600 
            hover:bg-blue-700 
            text-white 
            font-medium 
            py-2 
            px-4 
            rounded-md
            transition-colors
          "
        >
          {loading ? "Submitting..." : "Submit Project"}
        </Button>

        {submitStatus && (
          <p className="text-center text-green-500 text-sm mt-2">
            {submitStatus}
          </p>
        )}
      </form>
    </main>
  );
}
