"use client";

import React from "react";
import { TimelineDemo } from "../components/TimeLine";
import { useAccount } from "wagmi";
import StarsBg from "@/assets/stars.png";
import { motion } from "framer-motion";

const Dashboard = () => {
  const { address } = useAccount();

  return (
    <main className="relative z-10 p-4">
      <section className="shadow-lg rounded-lg bg-transparent">
        <TimelineDemo />
      </section>
    </main>
  );
};

export default Dashboard;
