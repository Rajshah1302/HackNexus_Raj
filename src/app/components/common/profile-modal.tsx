import { FunctionComponent } from "react";
import ThemeButton from "./theme-button";

export type ProfileModalType = {
  className?: string;
  onClose?: () => void;
};

const ProfileModal: FunctionComponent<ProfileModalType> = ({
  className = "",
  onClose,
}) => {
  return (
    <div
      className={`w-[340px] h-[480px] relative rounded-lg bg-purple-800 border-rainbow border-[4px] border-solid box-border overflow-hidden flex flex-col items-center justify-between py-[11px] px-3 leading-[normal] tracking-[normal] max-w-full max-h-full text-left text-13xl text-primary   ${className}`}
    >
      <h1 className="m-0 self-stretch relative text-inherfont-semiboldold  ">
        Edit Profile
      </h1>
      <section className="self-stretch flex flex-col items-center justify-start text-left text-5xl text-thistle  ">
        <div className="w-60 h-60 rounded-481xl overflow-hidden shrink-0 flex flex-row items-center justify-center py-[55px] px-14 box-border bg-[url('/public/frame-39@3x.png')] bg-cover bg-no-repeat bg-[top]">
          <img
            className="h-[120px] w-[120px] relative overflow-hidden shrink-0"
            loading="lazy"
            alt=""
            src="/tablericoncamera.svg"
          />
        </div>
        <div className="self-stretch rounded-lg bg-purple-600 flex flex-row items-center justify-start p-3 z-[1] mt-[-28px]">
          <h3 className="m-0 relative text-inhfont-semiboldabold  ">
            Add User Name_
          </h3>
        </div>
      </section>
      <div className="self-stretch flex flex-col items-start justify-start gap-1 text-xs">
        <div className="self-stretch relative overflow-hidden text-ellipsis whitespace-nowrap">
          Edit Description
        </div>
        <div className="bg-purple-600 flex flex-row items-center justify-center py-2.5 px-1 text-base text-thistle">
          <div className="relative overflow-hidden text-ellipsis whitespace-nowrap">
            Building in web3, catching all the tokens.
          </div>
        </div>
      </div>
      <div className="self-stretch flex flex-row items-center justify-center gap-1 text-base">
        <div className="flex flex-row items-center justify-center py-2 px-[57px]">
          <div className="relative inline-block min-w-[37px]">Back</div>
        </div>
        <ThemeButton
          btn="large"
          text="Save"
          defaultFlex="1"
          defaultHeight="unset"
          defaultPadding="8px 16px"
          defaultGap="2px"
          tablerIconBrandX="/tablericondevicefloppy.svg"
          tablerIconBrandXHeight="24px"
          tablerIconBrandXWidth="24px"
          brandLabelHeight="unset"
          brandLabelDisplay="unset"
          brandLabelFontSize="16px"
          brandLabelWidth="unset"
        />
      </div>
    </div>
  );
};

export default ProfileModal;
