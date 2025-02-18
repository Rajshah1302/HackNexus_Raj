"use client";
import Image from "next/image";
import Link from "next/link";
import { FunctionComponent, useMemo, type CSSProperties } from "react";

export type IconType = {
	className?: string;
	tablerIconArrowBigRight: string;

	/** Variant props */
	property1?: "def" | "active";

	/** Style props */
	iconPadding?: CSSProperties["padding"];
	tablerIconArrowBigRightHeight?: CSSProperties["height"];
	tablerIconArrowBigRightWidth?: CSSProperties["width"];

	to?: string;
};

const Icon: FunctionComponent<IconType> = ({
	className = "",
	property1 = "def",
	to,
	iconPadding,
	tablerIconArrowBigRight,
	tablerIconArrowBigRightHeight,
	tablerIconArrowBigRightWidth,
}) => {
	const icon2Style: CSSProperties = useMemo(() => {
		return {
			padding: iconPadding,
		};
	}, [iconPadding]);

	const tablerIconArrowBigRightStyle: CSSProperties = useMemo(() => {
		return {
			height: tablerIconArrowBigRightHeight,
			width: tablerIconArrowBigRightWidth,
		};
	}, [tablerIconArrowBigRightHeight, tablerIconArrowBigRightWidth]);

	return (
		<Link
			className={`shadow-[0px_-4px_2px_rgba(0,_0,_0,_0.3)_inset,_0px_4px_2px_rgba(255,_255,_255,_0.3)_inset] rounded-81xl bg-primary border-purple-400 border-[1px] border-solid overflow-hidden flex flex-row items-center justify-center p-[0.5rem] cursor-pointer data-[property1='active']:shadow-[unset] data-[property1='active']:bg-purple-800 data-[property1='active']:[border:unset] ${className}`}
			href={to || ""}
			data-property1={property1}
			style={icon2Style}
		>
			<Image
				className="h-[1.5rem] w-[1.5rem] relative overflow-hidden shrink-0"
				loading="lazy"
				alt=""
				src={tablerIconArrowBigRight}
				style={tablerIconArrowBigRightStyle}
				width={500}
				height={500}
			/>
		</Link>
	);
};

export default Icon;
