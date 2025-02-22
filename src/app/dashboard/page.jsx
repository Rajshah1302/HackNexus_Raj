"use client";

import React from "react";
import { TimelineDemo } from "../components/TimeLine";
import { useAccount } from "wagmi";
import StarsBg from "@/assets/stars.png";
import { motion } from "framer-motion";

const Dashboard = () => {
  const { address } = useAccount();

  return (
    <motion.div
      className="min-h-screen w-full relative overflow-y-auto"
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
      {/* Layered radial gradients */}
      <div className="absolute inset-0 bg-[radial-gradient(90%_300%_at_50%_50%,rgba(59,130,246,0.2)_0%,transparent_50%)]"></div>
      <div className="absolute inset-0 bg-[radial-gradient(60%_60%_at_50%_0%,rgba(59,130,246,0.15)_0%,transparent_60%)]"></div>
      <div className="absolute inset-0 bg-[radial-gradient(40%_40%_at_50%_100%,rgba(59,130,246,0.1)_0%,transparent_70%)]"></div>

      {/* Main content */}
      <main className="relative z-10 p-4">
        <section className="shadow-lg rounded-lg bg-transparent">
          {/* Removed the black/30 background */}
          <TimelineDemo />
        </section>
      </main>
    </motion.div>
  );
};

export default Dashboard;
