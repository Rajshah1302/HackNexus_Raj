"use cient";
import Image from "next/image";
import Link from "next/link";
import React from "react";

interface NotificationComponentProps {
	className?: string;
	property1?: string;
	title: string;
	category: string;
	time: string;
	cta: string;
	link: string;
	description: string;
	showChips?: boolean;
	pool?: boolean;
	land?: boolean;
	tokens?: boolean;
	map?: boolean;
	collected?: boolean;
	tickerOne?: string;
	tickerTwo?: string;
	landName?: string;
	tokenAmount?: string;
	distance?: string;
}

const NotificationComponent: React.FC<NotificationComponentProps> = ({
	className = "",
	property1 = "",
	title,
	category,
	time,
	cta,
	link,
	description,
	showChips = false,
	pool = false,
	land = false,
	tokens = false,
	map = false,
	collected = false,
	tickerOne = "$TKN1",
	tickerTwo = "$TKN2",
	landName = "Land Name Here, Street 123",
	tokenAmount = "1000",
	distance = "1500",
}) => {
	return (
		<Link
			href={`/quest/${link}`}
			className={`w-full max-w-md rounded-lg bg-purple-600 overflow-hidden flex flex-row items-center p-4 mb-4 gap-4 text-white cursor-pointer ${className}`}
		>
			{/* Icon */}
			<Image
				src="/tokenpic.svg"
				alt="Token"
				width={50}
				height={50}
				className="rounded-full"
			/>

			{/* Content */}
			<div className="flex-1 flex flex-col gap-2">
				<div className="flex justify-between items-center">
					<div className="flex items-center gap-2">
						<span className="font-bold text-lg">{title}</span>
						<div className="rounded-81xl bg-purple-400 flex flex-row items-center justify-center py-[0.125rem] px-[0.5rem] text-[0.75rem] text-highlight">
							{category}
						</div>
					</div>
					<div className="text-xs text-gray-300">{time} ago</div>
				</div>
				<p className="relative overflow-hidden text-ellipsis whitespace-nowrap">
					{description}
				</p>
				<div className="flex flex-wrap items-center justify-end  gap-2 text-xs text-gray-300">
					{/* Chips */}
					{showChips && (
						<div className="flex items-center gap-1 px-2 py-1 bg-gray-800 rounded-full">
							<span>Max 0</span>
						</div>
					)}

					{/* Pool */}
					{pool && (
						<div className="rounded-sm border-primary border-[1px] border-solid flex flex-row items-center justify-start p-[0.25rem] gap-[0.125rem]">
							<Image
								src="/tablericonpool.svg"
								alt="Pool"
								width={16}
								height={16}
							/>
							<span>{tickerOne}</span>
							<span>/</span>
							<span>{tickerTwo}</span>
						</div>
					)}

					{/* Tokens */}
					{tokens && (
						<div className="rounded-sm border-primary border-[1px] border-solid flex flex-row items-center justify-start p-[0.25rem] gap-[0.125rem]">
							<Image
								src="/tablericoncoins.svg"
								alt="Coins"
								width={16}
								height={16}
							/>
							<span>{tokenAmount}</span>
							<span>{tickerOne}</span>
							<span>for grabs</span>
						</div>
					)}

					{/* Land */}
					{land && (
						<div className="w-[11.375rem] rounded-sm border-primary border-[1px] border-solid box-border flex flex-row items-center justify-start p-[0.25rem] gap-[0.125rem]">
							<Image
								src="/tablericonmap2.svg"
								alt="Map"
								width={16}
								height={16}
							/>
							<span className="truncate">{landName}</span>
						</div>
					)}

					{/* Map */}
					{map && (
						<div className="rounded-sm bg-highlight flex flex-row items-center justify-center p-[0.25rem] gap-[0.25rem] text-purple-800">
							<div className="rounded-81xl bg-purple-800 flex flex-row items-center justify-center p-[0.25rem]">
								<Image
									src="/tablericonlocation.svg"
									alt="Location"
									width={10}
									height={10}
								/>
							</div>
							<div className="flex flex-row items-center justify-start gap-[0.125rem]">
								<span>{distance} m</span>
							</div>
						</div>
					)}

					{/* Collected */}
					{collected && (
						<div className="w-[10.813rem] rounded-sm border-primary border-[1px] border-solid box-border flex flex-row items-center justify-start p-[0.25rem] gap-[0.125rem]">
							<Image
								src="/tablericonpaperbag.svg"
								alt="Collected"
								width={16}
								height={16}
							/>
							<span>Collected:</span>
							<span>{tickerOne}</span>
							<span>+</span>
							<span>{tickerTwo}</span>
						</div>
					)}
				</div>
			</div>
		</Link>
	);
};

export default NotificationComponent;
