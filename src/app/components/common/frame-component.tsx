"use client";
import Link from "next/link";
import { FunctionComponent, useMemo, type CSSProperties } from "react";

export type TeamPair = {
  primary: string;
  secondary: string;
};

export type FrameComponentType = {
  className?: string;
  amber?: string;
  azure?: string;
  frameDivBackgroundImage?: CSSProperties["backgroundImage"];
  rootBackgroundImage?: CSSProperties["backgroundImage"];
  to: string;
  onTeamSelect?: (teams: TeamPair) => void;
  isSelected?: boolean;
};

const FrameComponent: FunctionComponent<FrameComponentType> = ({
  className = "",
  to,
  frameDivBackgroundImage,
  amber,
  rootBackgroundImage,
  azure,
  onTeamSelect,
  isSelected = false,
}) => {
  const frameDivStyle: CSSProperties = useMemo(
    () => ({
      backgroundImage: frameDivBackgroundImage,
    }),
    [frameDivBackgroundImage]
  );

  const rootStyle: CSSProperties = useMemo(
    () => ({
      backgroundImage: rootBackgroundImage,
    }),
    [rootBackgroundImage]
  );

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (onTeamSelect && amber && azure) {
      onTeamSelect({
        primary: amber,
        secondary: azure,
      });
    }
  };

  return (
    <div
      className={`self-stretch flex-1 flex flex-row items-start justify-start gap-[1rem] text-left text-[2rem] text-purple-800   ${className}`}
    >
      <div
        className={`self-stretch flex-1 rounded-lg overflow-hidden flex flex-col items-start justify-end 
  py-[1rem] px-[0.75rem] bg-cover bg-no-repeat bg-[top] cursor-pointer 
  transition-all duration-200 hover:scale-[1.02] relative`}
        style={frameDivStyle}
        onClick={handleClick}
      >
        <div
          className="self-stretch absolute bottom-4 left-4 font-semibold text-[2rem] 
    text-[#1a001a] whitespace-nowrap"
        >
          {amber}
        </div>
      </div>
      <div
        className={`self-stretch flex-1 rounded-lg overflow-hidden flex flex-col items-start justify-end 
        py-[1rem] px-[0.75rem] bg-cover bg-no-repeat bg-[top] cursor-pointer 
        transition-all duration-200 hover:scale-[1.02] relative`}
        style={rootStyle}
        onClick={handleClick}
      >
        <h3
          className="self-stretch absolute bottom-4 left-4 font-semibold text-[2rem] 
    text-[#1a001a] whitespace-nowrap"
        >
          {azure}
        </h3>
      </div>
    </div>
  );
};

export default FrameComponent;
