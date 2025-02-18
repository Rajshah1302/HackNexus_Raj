import React from "react";

export default function NFTCard({ nft, logo, onViewDetails }) {
  return (
    <div className="bg-white shadow-lg rounded-xl p-4">
      <img src={logo.src} alt={nft.name} className="w-16 h-16 mx-auto mb-4" />
      <h3 className="text-xl font-bold text-center">{nft.name}</h3>
      <p className="text-gray-600 text-center mb-4">{nft.description}</p>
      <button
        className="w-full py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
        onClick={onViewDetails}
      >
        View Details
      </button>
    </div>
  );
}
