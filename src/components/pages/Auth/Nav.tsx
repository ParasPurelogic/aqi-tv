"use client";

import { routes } from "@/config/routes";
import { Link } from "@/components/elements";
import cn from "@/utility/cn";

type Props = {
  page: "login" | "signup";
  className?: string;
};

const CommonAuthNav = (props: Props) => {
  // detect CUrrent Page
  const currentPage =
    props.page == "login" ? routes.authLogin.id : routes.authSignup.id;

  // Return JSX
  return (
    <div className={cn("nav flex max-xs:flex-wrap", props.className)}>
      {[routes.authLogin, routes.authSignup].map((link, i) => (
        <Link
          href={link.url}
          key={link.id}
          className={cn(
            "max-xs:grow flex items-center justify-center border-b-[0.3rem] border-[#F4F4F4] text-[#667580] font-medium px-[2.6rem] py-[0.8rem] md:px-[2rem] md:py-[1rem]",
            currentPage == link.id && "font-bold text-title border-primary"
          )}
        >
          {i == 0 ? "Login" : "Signup"}
        </Link>
      ))}
    </div>
  );
};

export default CommonAuthNav;
