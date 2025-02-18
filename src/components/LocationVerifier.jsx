"use client";
import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { LocationService } from "../services/LocationService";
import { StatusDisplay } from "./StatusDisplay";
import verification_key from "./verification_key.json";
import Link from "next/link";
import StarsBg from "@/assets/stars.png";
import { motion } from "framer-motion";

// Import snarkjs directly
const snarkjs = require("snarkjs");

function LocationVerifierContent() {
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState(null);
  const [proofData, setProofData] = useState(null);
  const searchParams = useSearchParams();
  const router = useRouter();

  const groupId = searchParams.get("groupId");
  const groupName = searchParams.get("groupName");

  useEffect(() => {
    if (!groupId || !groupName) {
      console.error("Missing group parameters!");
      router.push("/groups");
    }
  }, [groupId, groupName, router]);

  async function generateProof(input) {
    try {
      // Ensure snarkjs is loaded
      if (!snarkjs || !snarkjs.groth16) {
        throw new Error("snarkjs not properly loaded");
      }

      const { proof, publicSignals } = await snarkjs.groth16.fullProve(
        input,
        "locationCheck_js/locationCheck.wasm",
        "circuit_final.zkey"
      );

      console.log("Generated Proof:", proof);
      console.log("Public Signals:", publicSignals);

      return { proof, publicSignals };
    } catch (err) {
      console.error("Error in proof generation:", err);
      throw err;
    }
  }

  async function verifyProof(proof, publicSignals) {
    try {
      if (!snarkjs || !snarkjs.groth16) {
        throw new Error("snarkjs not properly loaded");
      }

      const verified = await snarkjs.groth16.verify(
        verification_key,
        publicSignals,
        proof
      );

      console.log("Verification Result:", verified);

      return {
        isInRange: publicSignals[0] === "1",
        verified: verified,
      };
    } catch (err) {
      console.error("Error in proof verification:", err);
      throw err;
    }
  }

  const verifyLocation = async () => {
    try {
      setStatus("getting-location");
      setError(null);
   
      const location = await LocationService.getCurrentPosition();
      console.log("Current location:", location);
   
      setStatus("generating-proof");
      const input = {
        latitude: Math.floor(location.latitude * 100),
        longitude: Math.floor(location.longitude * 100),
        minLatitude: 1280,  // Bangalore coordinates
        maxLatitude: 1320, 
        minLongitude: 7740,
        maxLongitude: 7780
      };
  
   
      try {
        const { proof, publicSignals } = await generateProof(input);
        console.log(publicSignals);
        const verificationResult = await verifyProof(proof, publicSignals);
   
        if (verificationResult.verified) {
          console.log(
            `User successfully verified for group: ${groupName} (ID: ${groupId})`
          );
          setProofData({
            proof: {
              pi_a: proof.pi_a.slice(0, -1),
              pi_b: proof.pi_b.slice(0, -1),
              pi_c: proof.pi_c.slice(0, -1),
            },
            publicSignals,
            verificationResult,
          });
          setStatus("success");
        } else {
          throw new Error("You are not in the specified location zone");
        }
      } catch (err) {
        throw new Error("Location verification failed - You must be physically present in the to verify");
      }
    } catch (err) {
      console.error("Location error:", err);
      setError(err.message);
      setStatus("error");
    }
   };

  return (
    <motion.div
      className="min-h-screen relative overflow-hidden"
      style={{
        backgroundImage: `url(${StarsBg.src})`,
        backgroundSize: "cover",
      }}
      animate={{
        backgroundPositionX: StarsBg.width,
      }}
      transition={{
        repeat: Infinity,
        ease: "linear",
        duration: 120,
      }}
    >
      <div className="absolute inset-0 bg-[radial-gradient(90%_300%_at_50%_50%,rgba(59,130,246,0.2)_0%,transparent_50%)]"></div>
      <div className="absolute inset-0 bg-[radial-gradient(60%_60%_at_50%_0%,rgba(59,130,246,0.15)_0%,transparent_60%)]"></div>
      <div className="absolute inset-0 bg-[radial-gradient(40%_40%_at_50%_100%,rgba(59,130,246,0.1)_0%,transparent_70%)]"></div>

      <div className="relative z-10 max-w-4xl mx-auto p-6 pt-20">
        <div className="flex flex-col md:flex-row items-center justify-between mb-8 gap-4">
          <Link
            href="/groups"
            className="text-blue-300 hover:text-blue-200 transition"
          >
            ← Back to Groups
          </Link>
          <h1 className="font-caudex text-4xl md:text-6xl text-center md:text-right text-blue-300">
            Location Verification for {groupName}
          </h1>
        </div>

        <div className="bg-[rgba(59,130,246,0.1)] border border-blue-500/20 rounded-xl p-8 backdrop-blur-sm">
          {status !== "success" && (
            <button
              onClick={verifyLocation}
              disabled={status === "getting-location" || status === "generating-proof"}
              className="w-full px-6 py-3 bg-blue-600/80 hover:bg-blue-500/80 text-white rounded-lg
                         disabled:bg-blue-400/50 font-caudex transition-colors duration-200
                         border border-blue-400/30 backdrop-blur-sm"
            >
              {status === "getting-location" || status === "generating-proof"
                ? "Processing..."
                : "Verify Location"}
            </button>
          )}

          <StatusDisplay status={status} error={error} />

          {proofData && (
            <div className="mt-6 p-4 bg-blue-900/30 rounded-lg border border-blue-500/20 backdrop-blur-sm">
              <h3 className="font-caudex text-blue-300 mb-3">Proof Data:</h3>
              <div className="space-y-4 text-blue-200">
                <div className="flex items-center gap-2">
                  <div
                    className={`w-3 h-3 rounded-full ${
                      proofData.verificationResult.verified
                        ? "bg-green-500"
                        : "bg-red-500"
                    }`}
                  ></div>
                  <span className="font-semibold">
                    Proof Status:{" "}
                    {proofData.verificationResult.verified ? "Valid" : "Invalid"}
                  </span>
                </div>

                <div className="mt-4">
                  <h4 className="font-semibold mb-2">
                    zkLocus Zero knowledge generated Proof:
                  </h4>
                  <div className="grid grid-cols-1 gap-4 text-sm">
                    <div className="p-4 bg-blue-900/20 rounded">
                      <span className="text-blue-300 block mb-2">
                        Commitment A:
                      </span>
                      <div className="font-mono break-all">
                        {proofData.proof.pi_a.map((value, index) => (
                          <div key={index} className="mb-1">
                            {value}
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="p-4 bg-blue-900/20 rounded">
                      <span className="text-blue-300 block mb-2">
                        Commitment B:
                      </span>
                      <div className="font-mono break-all">
                        {proofData.proof.pi_b.map((row, rowIndex) => (
                          <div key={rowIndex} className="mb-2">
                            {row.map((value, colIndex) => (
                              <div key={colIndex} className="mb-1">
                                {value}
                              </div>
                            ))}
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="p-4 bg-blue-900/20 rounded">
                      <span className="text-blue-300 block mb-2">
                        Commitment C:
                      </span>
                      <div className="font-mono break-all">
                        {proofData.proof.pi_c.map((value, index) => (
                          <div key={index} className="mb-1">
                            {value}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 mt-4">
                  <div
                    className={`w-3 h-3 rounded-full ${
                      proofData.verificationResult.isInRange
                        ? "bg-green-500"
                        : "bg-red-500"
                    }`}
                  ></div>
                  <span className="font-semibold">
                    Location Status:{" "}
                    {proofData.verificationResult.isInRange
                      ? "Within Range"
                      : "Out of Range"}
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}

// Main component with Suspense boundary
export function LocationVerifier() {
  return (
    <Suspense fallback={<div className="p-6">Loading...</div>}>
      <LocationVerifierContent />
    </Suspense>
  );
}
