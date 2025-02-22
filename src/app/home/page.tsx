"use client";

import PlayableMap from "../components/map/playable-map";
import UserProfile  from "../components/common/user-profile"

export default function Home() {
  return (
    <div className="relative w-full h-screen overflow-hidden">
      
      <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 w-[95%] z-50">
        <UserProfile />
      </div>

      <div className="absolute inset-0 z-10">
        <PlayableMap />
      </div>
    </div>
  );
}
