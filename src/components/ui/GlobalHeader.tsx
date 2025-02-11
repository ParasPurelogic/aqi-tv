import { routes } from "@/config/routes";
import { Link } from "../elements";
import Logo from "../misc/Logo";
import getUserInfo from "@/utility/server/getUserInfo";

const GlobalHeader = async () => {
  // User Info
  const userInfo = await getUserInfo();
  // Return JSX
  return (
    <header className="bg-white w-full z-[99999999] flex items-center max-sm:justify-center gap-[1.5rem] px-body sm:px-[calc(3_*_var(--body-padding))] py-[1.5rem] border-b border-[#33444C]/[14%]">
      {/* Logo */}
      <Link href={userInfo?.token ? routes.screens.url : routes.authLogin.url}>
        <Logo className="" />
      </Link>
    </header>
  );
};

export default GlobalHeader;
