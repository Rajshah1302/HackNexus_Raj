"use client";
import { FunctionComponent, useMemo, type CSSProperties } from "react";

export type ChipsType = {
  className?: string;
  maxPlayers?: string;
  showChips?: boolean;

  /** Variant props */
  chips?: "MaxPlayers";

  /** Style props */
  chipsPadding?: CSSProperties["padding"];
  chipsGap?: CSSProperties["gap"];
  tablerIconUsersGroupWidth?: CSSProperties["width"];
  tablerIconUsersGroupHeight?: CSSProperties["height"];
  maxHeight?: CSSProperties["height"];
  maxWidth?: CSSProperties["width"];
  maxFontSize?: CSSProperties["fontSize"];
  maxDisplay?: CSSProperties["display"];
  playerAmountHeight?: CSSProperties["height"];
  playerAmountWidth?: CSSProperties["width"];
  playerAmountFontSize?: CSSProperties["fontSize"];
  playerAmountDisplay?: CSSProperties["display"];
};

const Chips: FunctionComponent<ChipsType> = ({
  className = "",
  chips = "Land",
  maxPlayers = "0",
  showChips,
  chipsPadding,
  chipsGap,
  tablerIconUsersGroupWidth,
  tablerIconUsersGroupHeight,
  maxHeight,
  maxWidth,
  maxFontSize,
  maxDisplay,
  playerAmountHeight,
  playerAmountWidth,
  playerAmountFontSize,
  playerAmountDisplay,
}) => {
  const chipsStyle: CSSProperties = useMemo(() => {
    return {
      padding: chipsPadding,
      gap: chipsGap,
    };
  }, [chipsPadding, chipsGap]);

  const tablerIconUsersGroupStyle: CSSProperties = useMemo(() => {
    return {
      width: tablerIconUsersGroupWidth,
      height: tablerIconUsersGroupHeight,
    };
  }, [tablerIconUsersGroupWidth, tablerIconUsersGroupHeight]);

  const maxStyle: CSSProperties = useMemo(() => {
    return {
      height: maxHeight,
      width: maxWidth,
      fontSize: maxFontSize,
      display: maxDisplay,
    };
  }, [maxHeight, maxWidth, maxFontSize, maxDisplay]);

  const playerAmountStyle: CSSProperties = useMemo(() => {
    return {
      height: playerAmountHeight,
      width: playerAmountWidth,
      fontSize: playerAmountFontSize,
      display: playerAmountDisplay,
    };
  }, [
    playerAmountHeight,
    playerAmountWidth,
    playerAmountFontSize,
    playerAmountDisplay,
  ]);

  return (
    showChips && (
      <div
        className={`rounded-sm border-primary border-[1px] border-solid flex flex-row items-center justify-start p-[0.25rem] gap-[0.125rem] text-left text-[0.75rem] text-primary   ${className}`}
        data-chips={chips}
        style={chipsStyle}
      >
        <img
          className="w-[1rem] relative h-[1rem] overflow-hidden shrink-0"
          alt=""
          src="/tablericonusersgroup.svg"
          style={tablerIconUsersGroupStyle}
        />
        <b
          className="h-[1rem] w-[1.5rem] relative inline-block"
          style={maxStyle}
        >
          Max
        </b>
        <div
          className="h-[1rem] w-[0.5rem] relative inline-block"
          style={playerAmountStyle}
        >
          {maxPlayers}
        </div>
      </div>
    )
  );
};

export default Chips;
