"use client";
import Image from "next/image";
import {
  FunctionComponent,
  useMemo,
  type CSSProperties,
  useCallback,
} from "react";
import Chips from "./chips";
import Link from "next/link";

export type NotificationTopType = {
  className?: string;
  category?: string;
  cta?: string;
  description?: string;
  time?: string;
  title?: string;
  collected?: boolean;
  land?: boolean;
  map?: boolean;
  participants?: boolean;
  pool?: boolean;
  tokens?: boolean;
  showNotification?: boolean;
  showChips?: boolean;
  to: string;

  /** Variant props */
  property1?: "Default";

  /** Style props */
  notificationWidth?: CSSProperties["width"];
  notificationMargin?: CSSProperties["margin"];
  notificationPosition?: CSSProperties["position"];
  notificationTop?: CSSProperties["top"];
  notificationLeft?: CSSProperties["left"];
  notificationAlignSelf?: CSSProperties["alignSelf"];
  descHeight?: CSSProperties["height"];
  descDisplay?: CSSProperties["display"];
  tickerOneHeight?: CSSProperties["height"];
  tickerOneWidth?: CSSProperties["width"];
  tickerOneDisplay?: CSSProperties["display"];
  divHeight?: CSSProperties["height"];
  divWidth?: CSSProperties["width"];
  divDisplay?: CSSProperties["display"];
  tickerTwoHeight?: CSSProperties["height"];
  tickerTwoWidth?: CSSProperties["width"];
  tickerTwoDisplay?: CSSProperties["display"];
  landNameHeight?: CSSProperties["height"];
  landNameWidth?: CSSProperties["width"];
  landNameDisplay?: CSSProperties["display"];
  landNameFlex?: CSSProperties["flex"];
  tokenAmmountHeight?: CSSProperties["height"];
  tokenAmmountWidth?: CSSProperties["width"];
  tokenAmmountDisplay?: CSSProperties["display"];
  tickerOneHeight1?: CSSProperties["height"];
  tickerOneWidth1?: CSSProperties["width"];
  tickerOneDisplay1?: CSSProperties["display"];
  forGrabsHeight?: CSSProperties["height"];
  forGrabsWidth?: CSSProperties["width"];
  forGrabsDisplay?: CSSProperties["display"];
  distanceHeight?: CSSProperties["height"];
  distanceWidth?: CSSProperties["width"];
  distanceDisplay?: CSSProperties["display"];
  mHeight?: CSSProperties["height"];
  mWidth?: CSSProperties["width"];
  mDisplay?: CSSProperties["display"];
  landNameHeight1?: CSSProperties["height"];
  landNameWidth1?: CSSProperties["width"];
  landNameDisplay1?: CSSProperties["display"];
  tickerOneHeight2?: CSSProperties["height"];
  tickerOneWidth2?: CSSProperties["width"];
  tickerOneDisplay2?: CSSProperties["display"];
  tickerOneHeight3?: CSSProperties["height"];
  tickerOneWidth3?: CSSProperties["width"];
  tickerOneDisplay3?: CSSProperties["display"];
  tickerTwoHeight1?: CSSProperties["height"];
  tickerTwoWidth1?: CSSProperties["width"];
  tickerTwoDisplay1?: CSSProperties["display"];
};

const NotificationTop: FunctionComponent<NotificationTopType> = ({
  className = "",
  to = "",
  property1 = "Default",
  category = "meme",
  cta = "Share",
  description = "our most recent post",
  time = "0h",
  title = "TokenName",
  collected = false,
  land = false,
  map = true,
  participants = false,
  pool = false,
  tokens = true,
  showNotification,
  notificationWidth,
  notificationMargin,
  notificationPosition,
  notificationTop,
  notificationLeft,
  notificationAlignSelf,
  descHeight,
  descDisplay,
  tickerOneHeight,
  tickerOneWidth,
  tickerOneDisplay,
  divHeight,
  divWidth,
  divDisplay,
  tickerTwoHeight,
  tickerTwoWidth,
  tickerTwoDisplay,
  landNameHeight,
  landNameWidth,
  landNameDisplay,
  landNameFlex,
  tokenAmmountHeight,
  tokenAmmountWidth,
  tokenAmmountDisplay,
  tickerOneHeight1,
  tickerOneWidth1,
  tickerOneDisplay1,
  forGrabsHeight,
  forGrabsWidth,
  forGrabsDisplay,
  distanceHeight,
  distanceWidth,
  distanceDisplay,
  mHeight,
  mWidth,
  mDisplay,
  landNameHeight1,
  landNameWidth1,
  landNameDisplay1,
  tickerOneHeight2,
  tickerOneWidth2,
  tickerOneDisplay2,
  tickerOneHeight3,
  tickerOneWidth3,
  tickerOneDisplay3,
  tickerTwoHeight1,
  tickerTwoWidth1,
  tickerTwoDisplay1,
  showChips,
}) => {
  const notificationStyle: CSSProperties = useMemo(() => {
    return {
      width: notificationWidth,
      margin: notificationMargin,
      position: notificationPosition,
      top: notificationTop,
      left: notificationLeft,
      alignSelf: notificationAlignSelf,
    };
  }, [
    notificationWidth,
    notificationMargin,
    notificationPosition,
    notificationTop,
    notificationLeft,
    notificationAlignSelf,
  ]);

  const descStyle: CSSProperties = useMemo(() => {
    return {
      height: descHeight,
      display: descDisplay,
    };
  }, [descHeight, descDisplay]);

  const tickerOneStyle: CSSProperties = useMemo(() => {
    return {
      height: tickerOneHeight,
      width: tickerOneWidth,
      display: tickerOneDisplay,
    };
  }, [tickerOneHeight, tickerOneWidth, tickerOneDisplay]);

  const divStyle: CSSProperties = useMemo(() => {
    return {
      height: divHeight,
      width: divWidth,
      display: divDisplay,
    };
  }, [divHeight, divWidth, divDisplay]);

  const tickerTwoStyle: CSSProperties = useMemo(() => {
    return {
      height: tickerTwoHeight,
      width: tickerTwoWidth,
      display: tickerTwoDisplay,
    };
  }, [tickerTwoHeight, tickerTwoWidth, tickerTwoDisplay]);

  const landNameStyle: CSSProperties = useMemo(() => {
    return {
      height: landNameHeight,
      width: landNameWidth,
      display: landNameDisplay,
      flex: landNameFlex,
    };
  }, [landNameHeight, landNameWidth, landNameDisplay, landNameFlex]);

  const tokenAmmountStyle: CSSProperties = useMemo(() => {
    return {
      height: tokenAmmountHeight,
      width: tokenAmmountWidth,
      display: tokenAmmountDisplay,
    };
  }, [tokenAmmountHeight, tokenAmmountWidth, tokenAmmountDisplay]);

  const tickerOne1Style: CSSProperties = useMemo(() => {
    return {
      height: tickerOneHeight1,
      width: tickerOneWidth1,
      display: tickerOneDisplay1,
    };
  }, [tickerOneHeight1, tickerOneWidth1, tickerOneDisplay1]);

  const forGrabsStyle: CSSProperties = useMemo(() => {
    return {
      height: forGrabsHeight,
      width: forGrabsWidth,
      display: forGrabsDisplay,
    };
  }, [forGrabsHeight, forGrabsWidth, forGrabsDisplay]);

  const distanceStyle: CSSProperties = useMemo(() => {
    return {
      height: distanceHeight,
      width: distanceWidth,
      display: distanceDisplay,
    };
  }, [distanceHeight, distanceWidth, distanceDisplay]);

  const mStyle: CSSProperties = useMemo(() => {
    return {
      height: mHeight,
      width: mWidth,
      display: mDisplay,
    };
  }, [mHeight, mWidth, mDisplay]);

  const landName1Style: CSSProperties = useMemo(() => {
    return {
      height: landNameHeight1,
      width: landNameWidth1,
      display: landNameDisplay1,
    };
  }, [landNameHeight1, landNameWidth1, landNameDisplay1]);

  const tickerOne2Style: CSSProperties = useMemo(() => {
    return {
      height: tickerOneHeight2,
      width: tickerOneWidth2,
      display: tickerOneDisplay2,
    };
  }, [tickerOneHeight2, tickerOneWidth2, tickerOneDisplay2]);

  const tickerOne3Style: CSSProperties = useMemo(() => {
    return {
      height: tickerOneHeight3,
      width: tickerOneWidth3,
      display: tickerOneDisplay3,
    };
  }, [tickerOneHeight3, tickerOneWidth3, tickerOneDisplay3]);

  const tickerTwo1Style: CSSProperties = useMemo(() => {
    return {
      height: tickerTwoHeight1,
      width: tickerTwoWidth1,
      display: tickerTwoDisplay1,
    };
  }, [tickerTwoHeight1, tickerTwoWidth1, tickerTwoDisplay1]);

  return (
    showNotification && (
      <Link
        className={`w-[23.563rem] !m-[0] absolute top-[0.5rem] left-[calc(50%_-_188.5px)] rounded-lg bg-purple-600 overflow-hidden flex flex-row items-center justify-start p-[0.5rem] box-border gap-[0.5rem] cursor-pointer z-[2] text-left text-[1rem] text-primary   ${className}`}
        href={to}
        data-property1={property1}
        style={notificationStyle}
      >
        <Image src="/tokenpic.svg" alt="" width={50} height={50} />
        <div className="flex-1 flex flex-col items-end justify-start gap-[0.5rem]">
          <div className="self-stretch flex flex-col items-start justify-start gap-[0.25rem]">
            <div className="self-stretch flex flex-row items-center justify-between">
              <div className="flex flex-row items-center justify-start gap-[0.25rem]">
                <div className="relative">{title}</div>
                <div className="rounded-81xl bg-purple-400 flex flex-row items-center justify-center py-[0.125rem] px-[0.5rem] text-[0.75rem] text-highlight">
                  <div className="relative">{category}</div>
                </div>
              </div>
              <div className="flex flex-row items-center justify-start gap-[0.125rem] text-[0.75rem]">
                <div className="relative">{time}</div>
                <div className="relative">ago</div>
              </div>
            </div>
            <div className="self-stretch flex flex-row items-start justify-start gap-[0.187rem]">
              <div className="relative overflow-hidden text-ellipsis whitespace-nowrap">
                {cta}
              </div>
              <div
                className="relative overflow-hidden text-ellipsis whitespace-nowrap"
                style={descStyle}
              >
                {description}
              </div>
            </div>
          </div>
          <div className="flex flex-row items-center justify-start gap-[0.25rem] text-[0.75rem]">
            <Chips chips="MaxPlayers" maxPlayers="0" showChips={showChips} />
            {pool && (
              <div className="rounded-sm border-primary border-[1px] border-solid flex flex-row items-center justify-start p-[0.25rem] gap-[0.125rem]">
                <img
                  className="w-[1rem] relative h-[1rem] overflow-hidden shrink-0"
                  alt=""
                  src="/tablericonpool.svg"
                />
                <b
                  className="h-[1rem] w-[2.438rem] relative inline-block"
                  style={tickerOneStyle}
                >
                  $TKN1
                </b>
                <div
                  className="h-[1rem] w-[0.375rem] relative inline-block"
                  style={divStyle}
                >
                  /
                </div>
                <b
                  className="h-[1rem] w-[2.438rem] relative inline-block"
                  style={tickerTwoStyle}
                >
                  $TKN2
                </b>
              </div>
            )}
            {land && (
              <div className="w-[11.375rem] rounded-sm border-primary border-[1px] border-solid box-border flex flex-row items-center justify-start p-[0.25rem] gap-[0.125rem]">
                <img
                  className="w-[1rem] relative h-[1rem] overflow-hidden shrink-0"
                  alt=""
                  src="/tablericonmap2.svg"
                />
                <div
                  className="h-[1rem] w-[9.938rem] relative inline-block overflow-hidden text-ellipsis whitespace-nowrap shrink-0"
                  style={landNameStyle}
                >
                  Land Name Here, Street 123
                </div>
              </div>
            )}
            {tokens && (
              <div className="rounded-sm border-primary border-[1px] border-solid flex flex-row items-center justify-start p-[0.25rem] gap-[0.125rem]">
                <img
                  className="h-[1rem] w-[1rem] relative overflow-hidden shrink-0"
                  loading="lazy"
                  alt=""
                  src="/tablericoncoins.svg"
                />
                <div className="relative" style={tokenAmmountStyle}>
                  1000
                </div>
                <b className="relative" style={tickerOne1Style}>
                  $TKN1
                </b>
                <div className="relative" style={forGrabsStyle}>
                  for grabs
                </div>
              </div>
            )}
            {map && (
              <div className="rounded-sm bg-highlight flex flex-row items-center justify-center p-[0.25rem] gap-[0.25rem] text-purple-800">
                <div className="rounded-81xl bg-purple-800 flex flex-row items-center justify-center p-[0.25rem]">
                  <img
                    className="h-[0.5rem] w-[0.5rem] relative overflow-hidden shrink-0"
                    loading="lazy"
                    alt=""
                    src="/tablericonlocation.svg"
                  />
                </div>
                <div className="flex flex-row items-center justify-start gap-[0.125rem]">
                  <div className="relative" style={distanceStyle}>
                    1500
                  </div>
                  <b className="relative" style={mStyle}>
                    m
                  </b>
                </div>
              </div>
            )}
            {collected && (
              <div className="w-[10.813rem] rounded-sm border-primary border-[1px] border-solid box-border flex flex-row items-center justify-start p-[0.25rem] gap-[0.125rem]">
                <img
                  className="w-[1rem] relative h-[1rem] overflow-hidden shrink-0"
                  alt=""
                  src="/tablericonpaperbag.svg"
                />
                <div
                  className="h-[1rem] w-[3.438rem] relative inline-block overflow-hidden text-ellipsis whitespace-nowrap"
                  style={landName1Style}
                >
                  Collected:
                </div>
                <b
                  className="h-[1rem] w-[2.438rem] relative inline-block"
                  style={tickerOne2Style}
                >
                  $TKN1
                </b>
                <b
                  className="h-[1rem] w-[0.5rem] relative inline-block"
                  style={tickerOne3Style}
                >
                  +
                </b>
                <b
                  className="h-[1rem] w-[2.438rem] relative inline-block"
                  style={tickerTwo1Style}
                >
                  $TKN2
                </b>
              </div>
            )}
          </div>
        </div>
      </Link>
    )
  );
};

export default NotificationTop;
