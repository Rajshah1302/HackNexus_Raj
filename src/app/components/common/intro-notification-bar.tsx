import { FunctionComponent, useMemo, type CSSProperties } from "react";
import Notificationheader from "./notificationheader";

export type IntroNotificationBarType = {
	className?: string;
	catGuideNobg1?: string;

	/** Style props */
	frameSectionAlignItems?: CSSProperties["alignItems"];
	frameSectionBackgroundImage?: CSSProperties["backgroundImage"];
};

const IntroNotificationBar: FunctionComponent<IntroNotificationBarType> = ({
	className = "",
	frameSectionAlignItems,
	frameSectionBackgroundImage,
	catGuideNobg1,
}) => {
	const frameSectionStyle: CSSProperties = useMemo(() => {
		return {
			alignItems: frameSectionAlignItems,
			backgroundImage: frameSectionBackgroundImage,
		};
	}, [frameSectionAlignItems, frameSectionBackgroundImage]);

	return (
		<section
			className={`self-stretch rounded-2xl overflow-hidden shrink-0 flex flex-col items-end justify-between bg-[url('/frame-691@3x.png')] bg-cover bg-no-repeat bg-[top] ${className}`}
			style={frameSectionStyle}
		>
			<Notificationheader className="pb-[1rem]" />
			<img
				className="self-stretch relative max-w-full overflow-hidden max-h-full object-cover z-[1]"
				alt=""
				src={catGuideNobg1}
			/>
		</section>
	);
};

export default IntroNotificationBar;
