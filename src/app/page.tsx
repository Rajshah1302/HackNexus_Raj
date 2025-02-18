"use client";
//import { LocationVerifier } from '@/components/LocationVerifier'
import { Hero } from "@/components/Hero";
import { Header } from "@/components/Header";

export default function Home() {
  return (
    <main className="min-h-screen p-10">
      <div className="max-w-7xl mx-auto">
        <Header />
        <Hero />
      </div>
    </main>
  );
}
