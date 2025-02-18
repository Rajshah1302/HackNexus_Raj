import { FunctionComponent } from "react";
import TableRowToken from "../ui/table-row-tken";

export type PlayerTokensType = {
  className?: string;
};

const PlayerTokens: FunctionComponent<PlayerTokensType> = ({
  className = "",
}) => {
  return (
    <div
      className={`self-stretch rounded-lg border-purple-400 border-[1px] border-solid overflow-hidden flex flex-col items-start justify-start text-left text-[1.25rem] text-primary   ${className}`}
    >
      <div className="self-stretch bg-purple-400 flex flex-row items-center justify-between py-[0.25rem] px-[0.5rem] gap-[1.25rem]">
        <b className="relative inline-block min-w-[2.688rem]">Coin</b>
        <b className="w-[6.938rem] relative inline-block text-right shrink-0">
          Amount
        </b>
      </div>
      <TableRowToken
        ticker="TKN"
        tokenName="FEPE"
        price="100"
        tokenAmount="200"
      />
      <TableRowToken
        ticker="PKN"
        tokenName="TEPE"
        price="0.005"
        tokenAmount="1000"
      />
      <TableRowToken
        ticker="KKN"
        tokenName="PEPE"
        price="1005"
        tokenAmount="10"
      />
      <div className="self-stretch bg-purple-400 flex flex-row items-center justify-end py-[0.5rem] pl-[16rem] pr-[0.5rem] gap-[0.5rem] text-[0.75rem] text-white">
        <div className="rounded-81xl bg-primary flex flex-row items-center justify-start p-[0.25rem]">
          <img
            className="h-[0.5rem] w-[0.5rem] relative"
            loading="lazy"
            alt=""
            src="/arrow-back-ios-new.svg"
          />
        </div>
        {/* <div className="flex flex-row items-center justify-start gap-[0.25rem]">
					<div className="relative">1</div>
					<div className="relative">of</div>
					<div className="relative">5</div>
				</div> */}
        <div className="rounded-81xl bg-primary flex flex-row items-center justify-start p-[0.25rem]">
          <img
            className="h-[0.5rem] w-[0.5rem] relative"
            loading="lazy"
            alt=""
            src="/arrow-forward-ios.svg"
          />
        </div>
      </div>
    </div>
  );
};

export default PlayerTokens;
