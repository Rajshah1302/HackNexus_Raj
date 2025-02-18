import Link from "next/link";
import { FunctionComponent } from "react";

export type ChatStripType = {
  className?: string;
  time?: string;
  userName?: string;
  summay?: string;
  id: string;
  summaryEnabled: boolean;
};

const ChatStrip: FunctionComponent<ChatStripType> = ({
  className = "",
  time = "0h",
  userName = "UserName",
  summay = "Last message summary here",
  id = "",
  summaryEnabled = true,
}) => {
  return (
    <Link
      href={`/friends/${id}/chat`}
      className={`self-stretch rounded-lg bg-purple-600 overflow-hidden shrink-0 flex flex-row items-center justify-start p-[0.75rem] gap-[0.625rem] text-left text-[1.5rem] text-primary   ${className}`}
    >
      <img
        className="h-[3.375rem] w-[3.375rem] relative rounded-tl-2xl rounded-tr-81xl rounded-b-81xl overflow-hidden shrink-0 object-cover"
        loading="lazy"
        alt=""
        src="/teams@2x.png"
      />
      <div className="flex-1 flex flex-col items-start justify-center gap-[0.5rem]">
        <div className="self-stretch flex flex-row items-start justify-between">
          <h1 className="m-0 relative text-inherit font-semibold  ">
            {userName}
          </h1>
          <div className="rounded bg-purple-400 flex flex-row items-center justify-start p-[0.125rem] gap-[0.125rem] text-[0.75rem] text-highlight">
            <div className="relative">{time}</div>
            <div className="relative">ago</div>
          </div>
        </div>
        {summaryEnabled ? (
          <div className="self-stretch flex flex-row items-center justify-start gap-[0.25rem] text-[0.75rem]">
            <img
              className="h-[1rem] w-[1rem] relative overflow-hidden shrink-0"
              loading="lazy"
              alt=""
              src="/tablericonmessages.svg"
            />
            <div className="flex-1 relative overflow-hidden text-ellipsis whitespace-nowrap">
              {summay}
            </div>
          </div>
        ) : (
          ""
        )}
      </div>
    </Link>
  );
};

export default ChatStrip;
