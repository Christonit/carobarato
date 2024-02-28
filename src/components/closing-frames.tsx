import type { NextPage } from "next";

export type ClosingFramesType = {
  nacional?: string;
};

const ClosingFrames: NextPage<ClosingFramesType> = ({ nacional }) => {
  return (
    <div className="self-stretch flex flex-row items-start justify-between py-4 px-[15px] gap-[20px] text-left text-sm text-black font-inter border-[1px] border-solid border-black">
      <div className="flex flex-col items-start justify-start gap-[10px_0px]">
        <div className="flex flex-row items-start justify-start gap-[0px_12px]">
          <div className="h-5 w-5 relative rounded-[50%] bg-gainsboro" />
          <div className="relative">Carne Angus</div>
        </div>
        <div className="flex flex-row items-start justify-start gap-[0px_10px]">
          <b className="relative whitespace-nowrap">$320.00</b>
          <div className="relative">{nacional}</div>
        </div>
      </div>
      <div className="w-5 relative text-xl material-icons inline-block mq450:text-base">
        close
      </div>
    </div>
  );
};

export default ClosingFrames;
