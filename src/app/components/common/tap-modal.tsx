import { FunctionComponent } from "react";

export type TapModalType = {
  className?: string;
  onClose?: () => void;
  title?: string;
  description?: string;
  time?: string;
};

const TapModal: FunctionComponent<TapModalType> = ({
  className = "",
  title = "UserTokenChest",
  description = "This is a description text",
  time = "0h",
}) => {
  return (
    <div
      className={`w-[180px] relative [backdrop-filter:blur(20px)] rounded-lg bg-gray-100 flex flex-col items-start justify-start p-2 box-border gap-1 max-w-full max-h-full overflow-auto text-left text-base text-primary   ${className}`}
    >
      <div className="self-stretch flex flex-row items-center justify-between">
        <div className="relative">{title}</div>
        <div className="rounded bg-purple-400 flex flex-row items-center justify-start p-0.5 gap-0.5 text-xs text-highlight">
          <div className="relative">{time}</div>
          <div className="relative">ago</div>
        </div>
      </div>
      <div className="self-stretch relative text-xs [display:-webkit-inline-box] overflow-hidden text-ellipsis [-webkit-line-clamp:2] [-webkit-box-orient:vertical]">
        {description}
      </div>
    </div>
  );
};

export default TapModal;
