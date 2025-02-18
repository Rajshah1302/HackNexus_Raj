import { FunctionComponent, useState, useCallback, useEffect } from "react";
import Image from "next/image";
import PortalPopup from "./portal-popup";
import ProfileModal from "./profile-modal";
import { useDynamicContext } from "@dynamic-labs/sdk-react-core";

export type PlayerProfileType = {
  className?: string;
};

interface UserProfile {
  username: string;
  isWorldcoinVerified: boolean;
  team?: {
    primary: string;
    secondary: string;
  };
}

const PlayerProfile: FunctionComponent<PlayerProfileType> = ({
  className = "",
}) => {
  const [isModalvrOpen, setModalvrOpen] = useState(false);
  const [profileData, setProfileData] = useState<UserProfile | null>(null);
  const { user, primaryWallet } = useDynamicContext();

  useEffect(() => {
    const savedProfile = localStorage.getItem("userProfile");
    if (savedProfile) {
      setProfileData(JSON.parse(savedProfile));
    }
  }, []);

  const openModalvr = useCallback(() => {
    setModalvrOpen(true);
  }, []);

  const closeModalvr = useCallback(() => {
    setModalvrOpen(false);
  }, []);

  return (
    <>
      <div
        className={`self-stretch rounded-lg bg-purple-600 border-rainbow border-[2px] border-solid overflow-hidden flex flex-row items-center justify-start py-3 px-3 gap-2 min-h-[8rem] cursor-pointer hover:bg-purple-700 transition-colors duration-200 ${className}`}
        onClick={openModalvr}
      >
        <div className="relative size-28 flex-shrink-0">
          <Image
            src="/teams.png"
            alt="Profile"
            width={256}
            height={256}
            className="object-fill"
            priority
          />
        </div>

        <div className="flex-1 flex flex-col items-start justify-center gap-2 min-w-[9.438rem] overflow-hidden">
          <h1 className="m-0 self-stretch relative text-[2rem] font-semibold text-primary truncate">
            {profileData?.username || "Sage"}
          </h1>

          <div className="relative text-[1rem] text-thistle overflow-hidden text-wrap whitespace-nowrap w-full">
            Building in web3, catching all the tokens.
          </div>

          <div className="flex items-center gap-2">
            <Image
              src="/tablericonwallet.svg"
              alt="Wallet"
              width={20}
              height={20}
              className="flex-shrink-0"
            />
            <div className="text-primary text-bold text-[1.2rem]">
              $0.5
            </div>
          </div>
        </div>
      </div>

      {isModalvrOpen && (
        <PortalPopup
          overlayColor="rgba(113, 113, 113, 0.3)"
          placement="Centered"
          onOutsideClick={closeModalvr}
        >
          <ProfileModal onClose={closeModalvr} />
        </PortalPopup>
      )}
    </>
  );
};

export default PlayerProfile;
