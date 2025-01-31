"use client";

import { useState } from "react";
import cn from "@/utility/cn";
import Nav from "../Nav";
import Page from "@/components/ui/Page";
import SignupForm from "./SignupForm";

// Verify Email Comp
// const VerifyEmail = dynamic(() => import("../VerifyCode"), {
//   ssr: false,

//   loading: () => <ShowLoader className="w-full min-h-[inherit]" />,
// });

const Index = () => {
  // Current Screen
  const [currentScreen, setCurrentScreen] = useState(
    "sign-up" as "sign-up" | "verify-email"
  );

  // User Creds
  // const [userCred, setUserCred] = useState<{
  //   email: string;
  //   password: string;
  // } | null>(null);

  // Return jsx
  return (
    <Page
      name="signup"
      className={cn(
        "login max-w-[400px]",
        currentScreen == "verify-email" && "max-w-[470px]"
      )}
    >
      {/* If Sign-up Screen */}
      {currentScreen == "sign-up" && (
        <>
          {/* Heading */}
          <h1 className="leading-[130%] text-[2.7rem] text-title pr-body">
            Lorem Ipsum is simply dummy{" "}
            <span className="font-bold">AQI.tv Dashboard</span>
          </h1>

          {/* Sub Heading */}
          <p className="m-[1rem_0_3rem] md:m-[1.5rem_0_2rem] pr-body">
            Lorem Ipsum is simply dummy text of the printing
          </p>

          {/* Nav. */}
          <Nav page="signup" className="mb-[2rem]" />

          {/* SignupForm */}
          <SignupForm
            onSuccess={(cred) => {
              // Update Creds
              // setUserCred({
              //   email: cred.email,
              //   password: cred.password,
              // });
              // // Update Current Screen
              // setCurrentScreen("verify-email");
            }}
          />
        </>
      )}

      {/* Verification Screen */}
      {/* {currentScreen == "verify-email" && (
        <VerifyEmail email={userCred?.email ?? ""} onCodeVerified={() => {}} />
      )} */}
    </Page>
  );
};

export default Index;
