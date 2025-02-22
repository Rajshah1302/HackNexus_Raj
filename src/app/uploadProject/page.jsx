"use client"
import React, { useState } from "react"
import { useRouter } from "next/navigation"
import GroupCard from "@/components/GroupCard"
import StarsBg from "@/assets/stars.png"
import LogoImg from "@/assets/nexusLogo.png"
import { motion } from "framer-motion"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"

const groupsByCategory = [
  {
    title: "Hackathon Groups",
    groups: [
      {
        id: 1,
        name: "Hackathon",
        description:
          "Share your location anonymously to verify participation in the hackathon and mint an exclusive POAP!",
        logo: LogoImg,
      },
      {
        id: 2,
        name: "Hackathon",
        description: "Verify your location to confirm your presence at the hackathon and mint your unique POAP.",
        logo: LogoImg,
      },
      {
        id: 3,
        name: "Hackathon",
        description: "Prove your attendance at the hackathon by anonymously sharing your location and minting a POAP.",
        logo: LogoImg,
      },
    ],
  },
]

export default function GroupsPage() {
  const router = useRouter()
  const [selectedFile, setSelectedFile] = useState(null)
  const [ipfsHash, setIpfsHash] = useState("")
  const [loading, setLoading] = useState(false)
  const [fetchedImage, setFetchedImage] = useState("")
  const [projectName, setProjectName] = useState("")
  const [projectDescription, setProjectDescription] = useState("")
  const [githubLink, setGithubLink] = useState("")

  const handleJoinGroup = (groupId, groupName) => {
    router.push(`/verify?groupId=${groupId}&groupName=${groupName}`)
  }

  const uploadToIPFS = async () => {
    if (!selectedFile) return
    setLoading(true)

    try {
      const formData = new FormData()
      formData.append("file", selectedFile)

      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      })
      const data = await response.json()
      setIpfsHash(data.ipfsHash)
    } catch (error) {
      console.error("Upload error:", error)
    } finally {
      setLoading(false)
    }
  }

  const fetchFromIPFS = async () => {
    if (!ipfsHash) return

    try {
      const imageUrl = `http://plum-definite-skink-261.mypinata.cloud/ipfs/${ipfsHash}`
      setFetchedImage(imageUrl)
    } catch (error) {
      console.error("Fetch error:", error)
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log("Project Details:", { projectName, projectDescription, githubLink })
  }

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
        repeat: Number.POSITIVE_INFINITY,
        ease: "linear",
        duration: 120,
      }}
    >
      <div className="absolute inset-0 bg-[radial-gradient(90%_300%_at_50%_50%,rgba(59,130,246,0.2)_0%,transparent_50%)]"></div>
      <div className="absolute inset-0 bg-[radial-gradient(60%_60%_at_50%_0%,rgba(59,130,246,0.15)_0%,transparent_60%)]"></div>
      <div className="absolute inset-0 bg-[radial-gradient(40%_40%_at_50%_100%,rgba(59,130,246,0.1)_0%,transparent_70%)]"></div>

      <div className="flex justify-center items-center min-h-screen bg-gradient-to-b">
      <div className="z-10 max-w-4xl w-full rounded-2xl shadow-xl p-8 md:p-12 bg-transparent bg-opacity-10 backdrop-blur-lg border border-white/20">
      <h1 className="text-4xl md:text-5xl font-caudex text-center text-blue-400 mb-10">
      Project Details
    </h1>
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Project Name */}
      <div>
        <label htmlFor="projectName" className="block text-sm font-medium text-blue-300 mb-2">
          Project Name
        </label>
        <Input
          type="text"
          id="projectName"
          placeholder="Enter project name"
          value={projectName}
          onChange={(e) => setProjectName(e.target.value)}
          className="w-full bg-blue-900 bg-opacity-50 text-blue-100 placeholder-blue-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      {/* Project Description */}
      <div>
        <label htmlFor="projectDescription" className="block text-sm font-medium text-blue-300 mb-2">
          Project Description
        </label>
        <Textarea
          id="projectDescription"
          placeholder="Describe your project"
          value={projectDescription}
          onChange={(e) => setProjectDescription(e.target.value)}
          className="w-full bg-blue-900 bg-opacity-50 text-blue-100 placeholder-blue-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      {/* GitHub Link */}
      <div>
        <label htmlFor="githubLink" className="block text-sm font-medium text-blue-300 mb-2">
          GitHub Link
        </label>
        <Input
          type="url"
          id="githubLink"
          placeholder="Enter GitHub link"
          value={githubLink}
          onChange={(e) => setGithubLink(e.target.value)}
          className="w-full bg-blue-900 bg-opacity-50 text-blue-100 placeholder-blue-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      {/* Submit Button */}
      <Button
        type="submit"
        className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 rounded-lg shadow-lg transition duration-200"
      >
        Submit Project Details
      </Button>
    </form>
  </div>
</div>

    </motion.div>
  )
}

