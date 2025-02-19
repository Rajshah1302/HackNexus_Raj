"use client";

import { useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { writeContract } from "@wagmi/core";
import { HackNexusFactoryAbi } from "@/utlis/contractsABI/HackNexusFactoryAbi";
import { HackNexusFactoryAddress } from "@/utlis/addresses";
import { toast } from "@/components/ui/use-toast";
import { config } from "@/utlis/config";

interface HackathonFormData {
  name: string;
  symbol: string;
  hackathonName: string;
  hackathonDate: string;
  latitude: string;
  longitude: string;
  totalPrizePool: string;
  tracks: { name: string; bounty: string }[];
  svgImage: string; // Changed from FileList to string
}

export function HackathonForm() {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<HackathonFormData>({
    defaultValues: {
      tracks: [{ name: "", bounty: "" }],
      svgImage: "",
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "tracks",
  });

  const [submitStatus, setSubmitStatus] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data: HackathonFormData) => {
    setLoading(true);
    try {
      const chainId = config.state.chainId;

      const latitude = data.latitude.trim();
      const longitude = data.longitude.trim();

      const trackNames = data.tracks.map((track) => track.name);
      const trackBounties = data.tracks.map((track) => track.bounty);

      // Directly use the entered SVG text.
      const svgImageText = data.svgImage.trim();

      const tx = await writeContract(config as any, {
        address: HackNexusFactoryAddress[chainId],
        abi: HackNexusFactoryAbi,
        functionName: "hostHackathon",
        args: [
          data.name,
          data.symbol,
          data.hackathonName,
          data.hackathonDate,
          latitude,
          longitude,
          data.totalPrizePool,
          trackNames,
          trackBounties,
          svgImageText,
        ],
      });

      console.log("Transaction:", tx);
      setSubmitStatus("Hackathon created successfully!");
      toast({
        title: "Success",
        description: "Hackathon created successfully!",
      });
    } catch (error: any) {
      console.error("Error creating hackathon:", error);
      setSubmitStatus("Error creating hackathon.");
      toast({
        title: "Error",
        description:
          error?.message || "An error occurred while creating the hackathon.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
      // Clear the status after 3 seconds.
      setTimeout(() => setSubmitStatus(null), 3000);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div>
        <Label htmlFor="name">Token Name</Label>
        <Input
          id="name"
          className="rounded-md border border-gray-300 bg-white text-black"
          {...register("name", { required: "Token name is required" })}
        />
        {errors.name && <p className="text-red-500">{errors.name.message}</p>}
      </div>

      <div>
        <Label htmlFor="symbol">Token Symbol</Label>
        <Input
          id="symbol"
          className="rounded-md border border-gray-300 bg-white text-black"
          {...register("symbol", { required: "Token symbol is required" })}
        />
        {errors.symbol && (
          <p className="text-red-500">{errors.symbol.message}</p>
        )}
      </div>

      <div>
        <Label htmlFor="hackathonName">Hackathon Name</Label>
        <Input
          id="hackathonName"
          className="rounded-md border border-gray-300 bg-white text-black"
          {...register("hackathonName", {
            required: "Hackathon name is required",
          })}
        />
        {errors.hackathonName && (
          <p className="text-red-500">{errors.hackathonName.message}</p>
        )}
      </div>

      <div>
        <Label htmlFor="hackathonDate">Hackathon Date</Label>
        <Input
          id="hackathonDate"
          className="rounded-md border border-gray-300 bg-white text-black"
          {...register("hackathonDate", {
            required: "Hackathon date is required",
          })}
        />
        {errors.hackathonDate && (
          <p className="text-red-500">{errors.hackathonDate.message}</p>
        )}
      </div>

      <div>
        <Label htmlFor="latitude">Latitude</Label>
        <Input
          id="latitude"
          className="rounded-md border border-gray-300 bg-white text-black"
          {...register("latitude", { required: "Latitude is required" })}
        />
        {errors.latitude && (
          <p className="text-red-500">{errors.latitude.message}</p>
        )}
      </div>

      <div>
        <Label htmlFor="longitude">Longitude</Label>
        <Input
          id="longitude"
          className="rounded-md border border-gray-300 bg-white text-black"
          {...register("longitude", { required: "Longitude is required" })}
        />
        {errors.longitude && (
          <p className="text-red-500">{errors.longitude.message}</p>
        )}
      </div>

      <div>
        <Label htmlFor="totalPrizePool">Total Prize Pool</Label>
        <Input
          id="totalPrizePool"
          className="rounded-md border border-gray-300 bg-white text-black"
          {...register("totalPrizePool", {
            required: "Total prize pool is required",
          })}
        />
        {errors.totalPrizePool && (
          <p className="text-red-500">{errors.totalPrizePool.message}</p>
        )}
      </div>

      <div>
        <Label>Tracks and Bounties</Label>
        {fields.map((field, index) => (
          <div key={field.id} className="flex space-x-2 mt-2">
            <Input
              {...register(`tracks.${index}.name` as const, {
                required: "Track name is required",
              })}
              placeholder="Track Name"
              className="rounded-md border border-gray-300 bg-white text-black"
            />
            <Input
              {...register(`tracks.${index}.bounty` as const, {
                required: "Track bounty is required",
              })}
              placeholder="Bounty"
              className="rounded-md border border-gray-300 bg-white text-black"
            />
            <Button
              type="button"
              className="border border-black"
              onClick={() => remove(index)}
            >
              Remove
            </Button>
          </div>
        ))}
        <Button
          type="button"
          onClick={() => append({ name: "", bounty: "" })}
          className="mt-4 border border-black"
        >
          Add Track
        </Button>
      </div>

      <div>
        <Label htmlFor="svgImage">SVG Image Text</Label>
        <textarea
          id="svgImage"
          {...register("svgImage", { required: "SVG Image text is required" })}
          className="w-full h-40 p-2 border border-gray-300 bg-white text-black rounded-md"
          placeholder="Enter SVG content here..."
        />
        {errors.svgImage && (
          <p className="text-red-500">{errors.svgImage.message}</p>
        )}
      </div>

      <Button type="submit" className="border border-black" disabled={loading}>
        {loading ? "Submitting..." : "Submit"}
      </Button>

      {submitStatus && <p className="text-green-500">{submitStatus}</p>}
    </form>
  );
}


