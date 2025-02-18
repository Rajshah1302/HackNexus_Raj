import { FunctionComponent } from "react";

export type TableRowTokenType = {
  className?: string;
  ticker?: string;
  tokenName?: string;
  price?: string;
  tokenAmount?: string;
};

const TableRowToken: FunctionComponent<TableRowTokenType> = ({
  className = "",
  ticker = "TKN",
  tokenName = "TokenName",
  price = "0000",
  tokenAmount = "0000",
}) => {
  return (
    <div
      className={`self-stretch border-purple-400 border-b-[1px] border-solid flex flex-row items-center justify-start p-[0.5rem] text-left text-[1rem] text-primary   ${className}`}
    >
      <div className="flex-1 flex flex-row items-center justify-start gap-[0.5rem]">
        <div className="rounded-81xl bg-purple-400 flex flex-row items-center justify-start p-[0.125rem]">
          <img
            className="h-[1.5rem] w-[1.5rem] relative overflow-hidden shrink-0"
            loading="lazy"
            alt=""
            src="/tokenicon.svg"
          />
        </div>
        <div className="flex flex-row items-center justify-center gap-[0.5rem]">
          <div className="relative">{tokenName}</div>
          <div className="relative text-[0.75rem]">{ticker}</div>
        </div>
      </div>
      <div className="w-[6.875rem] flex flex-row items-center justify-end gap-[0.25rem]">
        <div className="flex-1 flex flex-row items-center justify-end gap-[0.187rem]">
          <div className="relative">$</div>
          <div className="relative">{price}</div>
        </div>
        <div className="rounded bg-purple-400 flex flex-row items-center justify-center py-[0.125rem] px-[0.25rem] text-[0.75rem]">
          <div className="relative">{tokenAmount}</div>
        </div>
      </div>
    </div>
  );
};

export default TableRowToken;
