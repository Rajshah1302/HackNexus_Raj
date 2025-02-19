import { HackathonForm } from "@/components/hackathon-form";
import { Orbitron } from "next/font/google";

const orbitron = Orbitron({
  subsets: ["latin"],
  weight: "400", // adjust as needed
});

export default function Host() {
  return (
    <main
      className={`${orbitron.className} flex min-h-screen flex-col items-center justify-center p-8 bg-white text-black`}
    >
      <div className="z-10 max-w-3xl w-full text-sm">
        <h1 className="text-4xl font-bold text-center mb-8">
          Host a Hackathon
        </h1>
        <HackathonForm />
      </div>
    </main>
  );
}
