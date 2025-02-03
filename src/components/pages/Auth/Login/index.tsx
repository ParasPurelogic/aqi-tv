"use client";

import authUser from "@/actions/authUser";
import Page from "@/components/ui/Page";
import { routes } from "@/config/routes";
import { useEffect, useState } from "react";
import Nav from "../Nav";
import dynamic from "next/dynamic";
import ShowLoader from "@/components/ui/ShowLoader";
import LoginForm from "./LoginForm";
import cn from "@/utility/cn";

//  Forget Password Comp.
const ForgetPassword = dynamic(() => import("./ForgetPassword"), {
  loading: () => <ShowLoader fullScreen />,
});

const Index = () => {
  // Flags
  const [flags, setFlags] = useState({
    isCheckingStatus: true,
    currentScreen: "login" as "login" | "forget-password",
  });

  // Check Login Status
  useEffect(() => {
    // Function to Check Login Status
    const checkStatus = async () => {
      // Check Login Status
      const status = await authUser();

      // If logged in
      if (status?.status && typeof window !== "undefined") {
        // Redirect to screens page
        window.location.href = routes.screens.url;
      }
      // If not logged in
      else {
        setFlags({ ...flags, isCheckingStatus: false });
      }
    };

    // Check Login Status
    checkStatus();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Return JSX
  return (
    <Page
      name="login"
      className={cn(
        "login max-w-[400px]",
        flags.currentScreen == "forget-password" && "max-w-[470px]"
      )}
    >
      {/* If Login Screen */}
      {flags.currentScreen == "login" && (
        <>
          {/* Heading */}
          <h1 className="leading-[130%] text-[2.7rem] text-title pr-body">
            Lorem Ipsum is simply dummy{" "}
            <span className="text-primary">AQI.tv Dashboard</span>
          </h1>

          {/* Sub Heading */}
          <p className="m-[1rem_0_3rem] md:m-[1.5rem_0_2rem] pr-body">
            Lorem Ipsum is simply dummy text of the printing
          </p>

          {/* Nav. */}
          <Nav page="login" className="mb-[2rem]" />

          {/* LoginForm */}
          <LoginForm
            onForgetClick={() =>
              setFlags({ ...flags, currentScreen: "forget-password" })
            }
          />
        </>
      )}

      {/* If Forgot Password */}
      {flags.currentScreen == "forget-password" && (
        <ForgetPassword
          onBack={() => setFlags({ ...flags, currentScreen: "login" })}
        />
      )}

      {/* If Checking Status */}
      {flags.isCheckingStatus && <ShowLoader fullScreen />}
    </Page>
  );
};

export default Index;
