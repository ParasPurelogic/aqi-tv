import { routes } from "@/config/routes";
import { Link } from "../elements";
import Logo from "../misc/Logo";

const GlobalHeader = () => {
  // Return JSX
  return (
    <header className="bg-white w-full z-[99999999] flex items-center gap-[1.5rem] px-body py-[1.5rem] border-b border-[#33444C]/[14%]">
      {/* Logo */}
      <Link href={routes.home.url}>
        <Logo className="" />
      </Link>
    </header>
  );
};

export default GlobalHeader;
