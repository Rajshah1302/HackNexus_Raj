"use client";

import React, { FunctionComponent, useMemo, CSSProperties } from "react";
import Icon from "./icon";
import Link from "next/link";
import img1 from '@/assets/profile_icon.png';
import img2 from '@/assets/home_icon.png';
import Image from 'next/image';
export type MenuType = {
  className?: string;
  back?: boolean;
  to?: string;
  menuAlignSelf?: CSSProperties["alignSelf"];
  menuHeight?: CSSProperties["height"];
  menuGap?: CSSProperties["gap"];
  menuWidth?: CSSProperties["width"];
};

const Menu: FunctionComponent<MenuType> = ({
  className = "",
  back = false,
  to = "/",
  menuAlignSelf,
  menuHeight,
  menuGap,
  menuWidth,
}) => {
  const menuStyle: CSSProperties = useMemo(
    () => ({
      alignSelf: menuAlignSelf,
      height: menuHeight,
      gap: menuGap,
      width: menuWidth,
    }),
    [menuAlignSelf, menuHeight, menuGap, menuWidth]
  );

  return (
    <div
      className={`self-stretch h-[3.5rem] flex flex-row items-center justify-between px-60 gap-[0.5rem] ${className}`}
      style={menuStyle}
    >
      {back && to && (
        <Link href={to}>
          <img
            className="w-[2.625rem] h-[2.625rem] rounded-full overflow-hidden shrink-0 object-contain shadow-md"
            alt="Back"
            src="/icon@2x.png"
          />
        </Link>
      )}
        <Link href="/dashboard">
          <Image
            src={img1}
            alt="Profile Icon"
            height={35}
            width={35}
            className="hover:bg-blue-200 rounded-full transition-colors"
          />
        </Link>
        <Link href="/">
          <Image
            src={img2}
            alt="Profile Icon"
            height={35}
            width={35}
            className="hover:bg-blue-200 rounded-full transition-colors"
          />
        </Link>
    </div>
  );
};

export default Menu;
