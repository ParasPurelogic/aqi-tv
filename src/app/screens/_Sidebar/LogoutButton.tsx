"use client";

import logMeOut from "@/actions/logMeOut";
import { Button } from "@/components/elements";
import IconLoader from "@/components/misc/IconLoader";
import ShowLoader from "@/components/ui/ShowLoader";
import { routes } from "@/config/routes";
import { useState } from "react";
import { toast } from "sonner";

const LogoutButton = () => {
  // isLogging out State
  const [isLoginOut, setIsLoginOut] = useState(false);

  // Function to logout
  const logout = async () => {
    // If logging out
    if (isLoginOut) {
      return;
    }
    // Logout user
    try {
      // Update state
      setIsLoginOut(true);

      // Logout
      const response = await logMeOut();

      // If not logged out
      if (!response.status) {
        throw new Error(response.message);
      }

      // Redirect to login page
      if (typeof window != "undefined") {
        window.location.href = routes.authLogin.url;
      }
      //
    } catch (error: any) {
      toast.error(error?.message);
      setIsLoginOut(false);
    }
  };

  // Return JSX
  return (
    <div className="text-error w-full border-t border-[#DFE1EA] mt-auto">
      <Button
        onClick={logout}
        disabled={isLoginOut}
        className="text-current bg-transparent !rounded-[0] w-full py-[2.5em] border-0"
      >
        {isLoginOut ? (
          <IconLoader />
        ) : (
          <>
            <span>Logout</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="aspect-square w-[2.3rem]"
              fill="none"
              viewBox="0 0 28 28"
            >
              <path
                fill="currentColor"
                d="M10.564 26.542c1.595 0 2.881 0 3.893-.136 1.05-.141 1.934-.443 2.636-1.146.613-.612.922-1.365 1.085-2.249.157-.86.188-1.91.195-3.173a.875.875 0 0 0-1.75-.01c-.007 1.276-.04 2.18-.167 2.867-.121.661-.316 1.044-.6 1.328-.323.323-.776.533-1.632.648-.882.119-2.05.12-3.724.12H9.333c-1.675 0-2.843-.001-3.724-.12-.856-.115-1.31-.325-1.632-.648-.323-.323-.534-.776-.649-1.632-.118-.882-.12-2.05-.12-3.724V9.333c0-1.674.002-2.842.12-3.723.115-.857.326-1.31.649-1.633s.776-.533 1.632-.648c.881-.119 2.05-.12 3.724-.12H10.5c1.674 0 2.842.001 3.724.12.856.115 1.309.325 1.632.648.284.284.479.667.6 1.328.127.687.16 1.59.167 2.867a.875.875 0 1 0 1.75-.01c-.007-1.262-.038-2.314-.195-3.173-.163-.884-.472-1.637-1.085-2.25-.702-.701-1.586-1.003-2.636-1.145-1.012-.136-2.298-.136-3.893-.136H9.269c-1.596 0-2.882 0-3.893.136-1.05.141-1.934.444-2.637 1.146-.702.702-1.004 1.586-1.145 2.636-.136 1.012-.136 2.298-.136 3.893v9.462c0 1.595 0 2.881.136 3.893.141 1.05.443 1.934 1.145 2.636.703.703 1.587 1.005 2.637 1.146 1.011.136 2.297.136 3.893.136z"
              ></path>
              <path
                fill="currentColor"
                d="M10.5 14.875a.875.875 0 1 1 0-1.75h12.801l-2.287-1.96a.875.875 0 1 1 1.139-1.33l4.083 3.5a.875.875 0 0 1 0 1.33l-4.083 3.5a.875.875 0 1 1-1.14-1.33l2.288-1.96z"
              ></path>
            </svg>
          </>
        )}
      </Button>

      {/* If Login out */}
      {isLoginOut && <ShowLoader fullScreen />}
    </div>
  );
};

export default LogoutButton;
