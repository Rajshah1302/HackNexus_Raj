"use client";
import React from "react";
import Image from "next/image";

interface TokenCardProps {
	name: string;
	symbol: string;
	amount: string;
	description: string;
	logoUrl: string;
	bgColor?: string;
	borderColor?: string;
}

const TokenCard = ({
	name,
	symbol,
	amount,
	description,
	logoUrl,
}: TokenCardProps) => {
	return (
		<div
			className={`w-full max-w-[300px] rounded-xl bg-purple-400} overflow-hidden`}
		>
			{/* Header */}
			<div className={`flex items-center gap-3 p-4`}>
				<Image
					src={logoUrl}
					alt={name}
					width={40}
					height={40}
					className="rounded-full size-12"
				/>
				<div className="flex flex-col">
					<span className="text-primary font-semibold text-xl">
						{name}
					</span>
					<span className="text-primary/80 text-md">
						{amount} ${symbol}
					</span>
				</div>
			</div>

			{/* Description */}
			<div className="p-4">
				<p className="text-sm text-primary/80 leading-relaxed">
					{description}
				</p>
			</div>

			{/* Footer with Action Buttons */}
			<div className={`flex justify-around pt-4 mt-auto`}>
				{[
					"/link-icn.svg",
					"/farcaster-icn.svg",
					"/x-icn.svg",
					"/discord-icn.svg",
				].map((item, index) => (
					<div key={index}>
						<Image
							src={item}
							alt="Social Icon"
							width={20}
							height={20}
							className="size-10"
						/>
					</div>
				))}
			</div>
		</div>
	);
};

export default TokenCard;
