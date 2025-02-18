import { FunctionComponent } from "react";
import Image from "next/image";
import Menu from "./menu";
import img from "@/assets/username_logo.png";
export type UserProfileType = {
  className?: string;
};

const UserProfile: FunctionComponent<UserProfileType> = ({
  className = "",
}) => {
  return (
    <section
      className={`self-stretch rounded-2xl bg-gradient-to-br from-blue-600 to-blue-800 border-blue-500 border-[2px] border-opacity-50 shadow-xl overflow-hidden flex flex-col items-start justify-start p-4 gap-4 min-h-[10.5rem] text-left text-white ${className}`}
    >
      <div className="self-stretch flex flex-row items-center justify-start flex-wrap content-start gap-4">
        <Image
          className="h-20 w-20 rounded-full border-4 border-blue-400 object-cover shadow-md"
          alt="User Profile"
          src={img}
          width={80}
          height={80}
        />
        <div className="absolute bottom-0 right-0 bg-blue-500 text-white rounded-full px-2 py-0.5 text-xs">
          Amber
        </div>
        <div className="flex-1 flex flex-col items-start justify-start space-y-2">
          <div className="self-stretch flex flex-row items-center justify-between">
            <h1 className="m-0 text-2xl font-bold text-white">Web3Warden</h1>
          </div>
          <div className="self-stretch grid grid-cols-2 gap-2 text-sm">
            <div className="bg-blue-700 bg-opacity-50 rounded-lg p-3 shadow-inner">
              <p className="text-blue-200 font-medium mb-1">
                Historical Earnings
              </p>
              <p className="text-white font-bold">$2.06</p>
            </div>
            <div className="bg-blue-700 bg-opacity-50 rounded-lg p-3 shadow-inner">
              <p className="text-blue-200 font-medium mb-1">Total Explored</p>
              <p className="text-white font-bold">0.3 km</p>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full mt-2">
        <Menu
          back={false}
          to="/home"
          className="bg-blue-500 hover:bg-blue-600 transition-colors duration-300 rounded-lg"
        />
      </div>
    </section>
  );
};

export default UserProfile;
