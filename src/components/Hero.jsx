"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import Button from "@/components/Button";
import StarsBg from "@/assets/stars.png";
//import LogoImg from '@/assets/nexusLogo.png' // Updated logo for Nexus
import { useRef } from "react";
import Link from "next/link";

export const Hero = () => {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const backgroundPositionY = useTransform(
    scrollYProgress,
    [0, 1],
    [-300, 300]
  );

  return (
    <motion.section
      ref={sectionRef}
      className="h-screen flex items-center overflow-visible relative [mask-image:linear-gradient(to_bottom,transparent,black_10%,black_90%,transparent)]"
      style={{
        backgroundImage: `url(${StarsBg.src})`,
        backgroundPositionY: backgroundPositionY,
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
      <div className="absolute inset-0 bg-[radial-gradient(90%_300%_at_50%_50%,rgba(68,114,196,0.2)_0%,transparent_50%)]"></div>
      <div className="absolute inset-0 bg-[radial-gradient(60%_60%_at_50%_0%,rgba(68,114,196,0.15)_0%,transparent_60%)]"></div>
      <div className="absolute inset-0 bg-[radial-gradient(40%_40%_at_50%_100%,rgba(68,114,196,0.1)_0%,transparent_70%)]"></div>

      <motion.div
        style={{
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          rotate: ["0deg", "360deg"],
        }}
        transition={{
          repeat: Infinity,
          duration: 60,
          ease: "linear",
        }}
        className="absolute h-[700px] w-[700px] md:h-[1100px] md:w-[1100px] rounded-full border border-dashed border-blue-500 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
      ></motion.div>

      <motion.div
        style={{
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          rotate: "1turn",
        }}
        transition={{
          repeat: Infinity,
          duration: 60,
          ease: "linear",
        }}
        className="absolute h-[800px] w-[800px] md:h-[1200px] md:w-[1200px] rounded-full border border-blue-400 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
      ></motion.div>

      <div className="container relative text-center">
        <p className="font-caudex text-4xl max-w-xl mx-auto text-blue-300 mb-5 tracking-tight italic">
          ✨ Privacy-preserving NFTs for a connected world ✨
        </p>
        <div className="flex items-center justify-center space-x-4">
          <h1 className="font-caudex text-10xl md:text-[180px] md:leading-none tracking-tighter bg-gradient-to-br from-[#60A5FA] via-[#3B82F6] to-[#2563EB] text-transparent bg-clip-text pb-4">
            Nexus
          </h1>
        </div>
        <p className="font-caudex text-4xl max-w-2xl mx-auto text-blue-400 mt-5 tracking-tight">
          Mint NFTs securely based on your location, powered by zero-knowledge
          proofs
        </p>
        <div className="flex justify-center mt-7">
          <Link href="/home">
            <Button>Explore Nexus</Button>
          </Link>
          <Link className="ml-12" href="/organizer/host">
            <Button>Host a Hackathon</Button>
          </Link>
        </div>
      </div>
    </motion.section>
  );
};
