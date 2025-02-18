import React from "react";

export default function GroupCard({ group, logo, onJoin }) {
  return (
    <div className="p-6 bg-[rgba(59,130,246,0.1)] border border-blue-500/20 rounded-xl shadow-md hover:shadow-lg transition duration-200 backdrop-blur-sm">
      {/* Adjusted the size of the logo */}
      <img src={logo.src} alt="Nexus Logo" className="w-20 h-20 mb-4 mx-auto" />
      <h2 className="text-xl font-caudex font-semibold text-blue-300 mb-4">
        {group.name}
      </h2>
      <p className="text-blue-200 mb-4">{group.description}</p>
      <button
        onClick={onJoin}
        className="px-4 py-2 bg-blue-600/80 hover:bg-blue-500/80 text-white rounded-lg transition-colors duration-200"
      >
        Join Group
      </button>
    </div>
  );
}
