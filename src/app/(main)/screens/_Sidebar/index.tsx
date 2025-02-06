import Image from "next/image";
import LogoutButton from "./LogoutButton";
import getUserInfo from "@/utility/server/getUserInfo";
import IconUser from "@/components/misc/IconUser";
import Navs from "./Navs";

const index = async () => {
  // User Info
  const userInfo = await getUserInfo();

  // Return JSX
  return (
    <div className="w-full bg-[#F2F5FF] h-full flex flex-col gap-[1rem] max-md:hidden">
      {/* User Profile */}
      <div className="nav-user-detail flex gap-[1.2rem] items-center overflow-x-hidden p-[var(--body-padding)_var(--body-padding)_2.5rem] border-b border-[#DFE1EA]">
        {/* User Profile Pic */}
        <div className="min-w-[4.5rem] max-w-[4.5rem] aspect-square rounded-full overflow-hidden">
          {userInfo?.profileImg ? (
            <Image
              width={60}
              height={60}
              className="w-full h-full object-cover"
              src={userInfo.profileImg}
              alt="user-profile-image"
            />
          ) : (
            <IconUser className="w-full h-full" />
          )}
        </div>

        {/* User Name */}
        <div className="name-email flex flex-col grow leading-[1] gap-[0.2rem]">
          {/* Greetings */}
          <span className="text-[1.3rem]">Welcome back</span>
          {/* Full Name */}
          <span className="name text-title font-bold truncate">
            {`${userInfo?.firstName} ${userInfo?.lastName}`}
          </span>
        </div>
      </div>

      {/* Navs */}
      <Navs />

      {/* Logout Button */}
      <LogoutButton />
    </div>
  );
};

export default index;
