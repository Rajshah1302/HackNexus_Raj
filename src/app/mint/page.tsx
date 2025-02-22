// "use client";

// import { useState } from "react";
// import { motion } from "framer-motion";
// import { useForm } from "react-hook-form";
// import Link from "next/link";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Textarea } from "@/components/ui/textarea";
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardFooter,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import { Label } from "@/components/ui/label";
// import { Loader2, CheckCircle, XCircle } from "lucide-react";
// const snarkjs = require("snarkjs");
// import { LocationService } from "../../services/LocationService";
// import verification_key from "../verification_key.json";
// import { useRouter } from "next/navigation";
// // Location-related functions
// async function generateProof(input) {
//   try {
//     if (!snarkjs || !snarkjs.groth16) {
//       throw new Error("snarkjs not properly loaded");
//     }

//     const { proof, publicSignals } = await snarkjs.groth16.fullProve(
//       input,
//       "locationCheck_js/locationCheck.wasm",
//       "circuit_final.zkey"
//     );

//     console.log("Generated Proof:", proof);
//     console.log("Public Signals:", publicSignals);

//     return { proof, publicSignals };
//   } catch (err) {
//     console.error("Error in proof generation:", err);
//     throw err;
//   }
// }

// async function verifyProof(proof, publicSignals) {
//   try {
//     if (!snarkjs || !snarkjs.groth16) {
//       throw new Error("snarkjs not properly loaded");
//     }

//     const verified = await snarkjs.groth16.verify(
//       verification_key,
//       publicSignals,
//       proof
//     );

//     console.log("Verification Result:", verified);
//     return {
//       isInRange: publicSignals[0] === "1",
//       verified: verified,
//     };
//   } catch (err) {
//     console.error("Error in proof verification:", err);
//     throw err;
//   }
// }

// const verifyLocation = async (
//   setStatus,
//   setError,
//   setProofData,
//   groupName,
//   groupId
// ) => {
//   const router = useRouter(); // Initialize the router

//   try {
//     setStatus("getting-location");
//     setError(null);

//     const location = await LocationService.getCurrentPosition();
//     console.log("Current location:", location);

//     setStatus("generating-proof");
//     const input = {
//       latitude: Math.floor(location.latitude * 100),
//       longitude: Math.floor(location.longitude * 100),
//       minLatitude: 120, // Bangalore coordinates
//       maxLatitude: 13320,
//       minLongitude: 7740,
//       maxLongitude: 7780,
//     };

//     try {
//       const { proof, publicSignals } = await generateProof(input);
//       console.log(publicSignals);
//       const verificationResult = await verifyProof(proof, publicSignals);

//       if (verificationResult.verified) {
//         console.log(
//           `User successfully verified for group: ${groupName} (ID: ${groupId})`
//         );
//         setProofData({
//           proof: {
//             pi_a: proof.pi_a.slice(0, -1),
//             pi_b: proof.pi_b.slice(0, -1),
//             pi_c: proof.pi_c.slice(0, -1),
//           },
//           publicSignals,
//           verificationResult,
//         });
//         setStatus("success");
//       } else {
//         throw new Error("You are not in the specified location zone");
//       }
//     } catch (err) {
//       throw new Error(
//         "Location verification failed - You must be physically present in the to verify"
//       );
//     }
//   } catch (err) {
//     console.error("Location error:", err);
//     setError(err.message);
//     setStatus("error");
//   } finally {
//     router.push("/mint");
//     setTimeout(() => {}, 4000);
//   }
// };

// type ProjectDetails = {
//   name: string;
//   description: string;
//   githubLink: string;
// };

// export default function NFTMinterPage() {
//   const router = useRouter(); // Initialize the router

//   const [isLocationVerified, setIsLocationVerified] = useState(false);
//   const [isVerifyingLocation, setIsVerifyingLocation] = useState(false);
//   const [isMinting, setIsMinting] = useState(false);
//   const [isSaving, setIsSaving] = useState(false);
//   const [nftMinted, setNftMinted] = useState(false);
//   const [status, setStatus] = useState("idle");
//   const [error, setError] = useState(null);
//   const [proofData, setProofData] = useState(null);
//   const [ipfsNameHash, setIpfsNameHash] = useState<string | null>(null);
//   const [ipfsDescriptionHash, setIpfsDescriptionHash] = useState<string | null>(
//     null
//   );
//   const [ipfsGithubLinkHash, setIpfsGithubLinkHash] = useState<string | null>(
//     null
//   );

//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm<ProjectDetails>();

//   const handleVerifyLocation = async () => {
//     setIsVerifyingLocation(true);
//     try {
//       await verifyLocation(
//         setStatus,
//         setError,
//         setProofData,
//         "Group Name",
//         "Group ID"
//       );
//       setIsLocationVerified(true);
//     } catch (error) {
//       console.error("Location verification failed:", error);
//       setIsLocationVerified(true);
//     } finally {
//       setIsVerifyingLocation(false);
//     }
//   };

//   const mintNFT = async () => {
//     setIsMinting(true);
//     try {
//       await new Promise((resolve) => setTimeout(resolve, 2000));
//       setNftMinted(true);
//       localStorage.setItem("nft1", "true");
//     } catch (error) {
//       console.error("Error minting NFT:", error);
//     } finally {
//       setIsMinting(false);
//     }
//   };

//   const uploadToIPFS = async (data: ProjectDetails) => {
//     try {
//       const formData = new FormData();
//       formData.append("name", data.name);
//       formData.append("description", data.description);
//       formData.append("githubLink", data.githubLink);

//       const response = await fetch("/api/upload", {
//         method: "POST",
//         body: formData,
//       });
//       const responseData = await response.json();

//       // Store individual IPFS hashes
//       setIpfsNameHash(responseData.nameHash);
//       setIpfsDescriptionHash(responseData.descriptionHash);
//       setIpfsGithubLinkHash(responseData.githubLinkHash);

//       return responseData;
//     } catch (error) {
//       console.error("IPFS upload error:", error);
//       throw error;
//     }
//   };

//   const onSubmit = async (data: ProjectDetails) => {
//     setIsSaving(true);
//     try {
//       const ipfsResult = await uploadToIPFS(data);

//       console.log("Project details saved to IPFS:", ipfsResult);
//       router.push("/dashboard");
//     } catch (error) {
//       console.error("Error saving project details:", error);
//     } finally {
//       setIsSaving(false);
//     }
//   };

//   return (
//     <motion.div
//       initial={{ opacity: 0 }}
//       animate={{ opacity: 1 }}
//       transition={{ duration: 0.5 }}
//       className="min-h-screen bg-gradient-to-b from-blue-900 to-black text-white"
//     >
//       <div className="container mx-auto p-6 pt-20">
//         <Card className="w-full max-w-2xl mx-auto bg-blue-950/50 border-blue-500/20">
//           <CardHeader>
//             <CardTitle className="text-2xl text-blue-300">
//               Mint Your Hackathon NFT
//             </CardTitle>
//             <CardDescription className="text-blue-200">
//               Commemorate your hackathon participation with an NFT
//             </CardDescription>
//           </CardHeader>
//           <CardContent>
//             <div className="space-y-4">
//               <Button
//                 onClick={handleVerifyLocation}
//                 disabled={isMinting || nftMinted}
//                 className="w-full bg-blue-600 hover:bg-blue-500 text-white"
//               >
//                 {isVerifyingLocation ? (
//                   <>
//                     <Loader2 className="mr-2 h-4 w-4 animate-spin" />
//                     Verfying...
//                   </>
//                 ) : isLocationVerified ? (
//                   <>
//                     <CheckCircle className="mr-2 h-4 w-4" />
//                     Location Verified
//                   </>
//                 ) : (
//                   "Verify Location"
//                 )}
//               </Button>
//               {isLocationVerified && (
//                 <Button
//                   onClick={mintNFT}
//                   disabled={isMinting || nftMinted}
//                   className="w-full bg-blue-600 hover:bg-blue-500 text-white"
//                 >
//                   {isMinting ? (
//                     <>
//                       <Loader2 className="mr-2 h-4 w-4 animate-spin" />
//                       Minting...
//                     </>
//                   ) : nftMinted ? (
//                     <>
//                       <CheckCircle className="mr-2 h-4 w-4" />
//                       NFT Minted
//                     </>
//                   ) : (
//                     "Mint NFT"
//                   )}
//                 </Button>
//               )}

//               {nftMinted && (
//                 <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
//                   <div className="space-y-2">
//                     <Label htmlFor="name" className="text-blue-300">
//                       Project Name
//                     </Label>
//                     <Input
//                       id="name"
//                       {...register("name", {
//                         required: "Project name is required",
//                       })}
//                       placeholder="Enter your project name"
//                       className="bg-blue-900/30 border-blue-500/20 text-blue-100"
//                     />
//                     {errors.name && (
//                       <p className="text-red-400 text-sm">
//                         {errors.name.message}
//                       </p>
//                     )}
//                   </div>
//                   <div className="space-y-2">
//                     <Label htmlFor="description" className="text-blue-300">
//                       Project Description
//                     </Label>
//                     <Textarea
//                       id="description"
//                       {...register("description", {
//                         required: "Project description is required",
//                       })}
//                       placeholder="Describe your project"
//                       rows={4}
//                       className="bg-blue-900/30 border-blue-500/20 text-blue-100"
//                     />
//                     {errors.description && (
//                       <p className="text-red-400 text-sm">
//                         {errors.description.message}
//                       </p>
//                     )}
//                   </div>
//                   <div className="space-y-2">
//                     <Label htmlFor="githubLink" className="text-blue-300">
//                       GitHub Repository Link
//                     </Label>
//                     <Input
//                       id="githubLink"
//                       {...register("githubLink", {
//                         required: "GitHub link is required",
//                         pattern: {
//                           value: /^https?:\/\/github\.com\/.+\/.+$/,
//                           message: "Please enter a valid GitHub repository URL",
//                         },
//                       })}
//                       placeholder="https://github.com/username/repo"
//                       className="bg-blue-900/30 border-blue-500/20 text-blue-100"
//                     />
//                     {errors.githubLink && (
//                       <p className="text-red-400 text-sm">
//                         {errors.githubLink.message}
//                       </p>
//                     )}
//                   </div>
//                   <Button
//                     type="submit"
//                     disabled={isSaving}
//                     className="w-full bg-green-600 hover:bg-green-500 text-white"
//                   >
//                     {isSaving ? (
//                       <>
//                         <Loader2 className="mr-2 h-4 w-4 animate-spin" />
//                         Saving...
//                       </>
//                     ) : (
//                       "Save Project Details"
//                     )}
//                   </Button>
//                 </form>
//               )}
//             </div>
//           </CardContent>
//           <CardFooter className="text-sm text-blue-200">
//             <p>All rights reserved by the Hackathon Organizers.</p>
//           </CardFooter>
//         </Card>
//       </div>
//     </motion.div>
//   );
// }
