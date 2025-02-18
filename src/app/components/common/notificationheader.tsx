import Image from "next/image";
import { FunctionComponent, useMemo, type CSSProperties } from "react";

export type NotificationheaderType = {
  className?: string;

  /** Style props */
  notificationheaderBackdropFilter?: CSSProperties["backdropFilter"];
  notificationheaderBackgroundColor?: CSSProperties["backgroundColor"];
  notificationheaderHeight?: CSSProperties["height"];
  notificationheaderPadding?: CSSProperties["padding"];
  notificationheaderGap?: CSSProperties["gap"];
  notificationheaderAlignSelf?: CSSProperties["alignSelf"];
  notificationheaderWidth?: CSSProperties["width"];
  tablerIcon3dCubeSphereHeight?: CSSProperties["height"];
  tablerIcon3dCubeSphereWidth?: CSSProperties["width"];
  appNameMargin?: CSSProperties["margin"];
  appNameTextDecoration?: CSSProperties["textDecoration"];
  appNameFontSize?: CSSProperties["fontSize"];
};

const Notificationheader: FunctionComponent<NotificationheaderType> = ({
  className = "",
  notificationheaderBackdropFilter,
  notificationheaderBackgroundColor,
  notificationheaderHeight,
  notificationheaderPadding,
  notificationheaderGap,
  notificationheaderAlignSelf,
  notificationheaderWidth,
  tablerIcon3dCubeSphereHeight,
  tablerIcon3dCubeSphereWidth,
  appNameMargin,
  appNameTextDecoration,
  appNameFontSize,
}) => {
  const notificationheaderStyle: CSSProperties = useMemo(() => {
    return {
      backdropFilter: notificationheaderBackdropFilter,
      backgroundColor: notificationheaderBackgroundColor,
      height: notificationheaderHeight,
      padding: notificationheaderPadding,
      gap: notificationheaderGap,
      alignSelf: notificationheaderAlignSelf,
      width: notificationheaderWidth,
    };
  }, [
    notificationheaderBackdropFilter,
    notificationheaderBackgroundColor,
    notificationheaderHeight,
    notificationheaderPadding,
    notificationheaderGap,
    notificationheaderAlignSelf,
    notificationheaderWidth,
  ]);

  const tablerIcon3dCubeSphereStyle: CSSProperties = useMemo(() => {
    return {
      height: tablerIcon3dCubeSphereHeight,
      width: tablerIcon3dCubeSphereWidth,
    };
  }, [tablerIcon3dCubeSphereHeight, tablerIcon3dCubeSphereWidth]);

  return (
    <div
      className={`self-stretch [backdrop-filter:blur(30px)] bg-gray-200 flex flex-row items-center justify-center px-[0rem] gap-[0.5rem] text-left pt-4 ${className}`}
      style={notificationheaderStyle}
    >
      <Image
        className="w-40 aspect-auto relative overflow-hidden shrink-0"
        loading="lazy"
        alt=""
        src="/logo-main.png"
        style={tablerIcon3dCubeSphereStyle}
        width={1087}
        height={277}
      />
    </div>
  );
};

export default Notificationheader;
