import { useState } from "react";
import GetCode from "./GetCode";
import dynamic from "next/dynamic";
import ShowLoader from "@/components/ui/ShowLoader";

type Props = {
  onBack: () => void;
};

// VerifyCOde Comp
const VerifyCode = dynamic(() => import("../../VerifyCode"), {
  ssr: false,
  loading: () => <ShowLoader className="w-full min-h-[20rem]" />,
});

// SetPassword Comp
const SetPassword = dynamic(() => import("./SetPassword"), {
  ssr: false,
  loading: () => <ShowLoader className="w-full min-h-[20rem]" />,
});

const Index = (props: Props) => {
  // Flags
  const [flags, setFlags] = useState({
    currentScreen: "get-code" as "get-code" | "verify-code" | "set-password",
    userEmail: "",
  });

  // Return JSX
  return (
    <div className="forget-password space-y-[5rem] mt-[3rem]">
      {/* Header */}
      <div className="flex items-center gap-[3rem] text-title">
        {/* Back Icon */}
        <i
          className="aspect-[10/17] w-[1rem] cursor-pointer"
          onClick={props?.onBack}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 10 17"
            fill="none"
          >
            <path
              d="M8.3676 15.2503L1.375 8.25773L8.3676 1.26514"
              stroke="currentColor"
              strokeWidth="2.33087"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </i>
        {/* Heading */}
        <p className="truncate font-bold text-[2.2rem] leading-[1]">
          Password Reset
        </p>
      </div>

      {/* Content */}
      <div className="content sm:ml-[4rem]">
        {/* If get code screen */}
        {flags.currentScreen == "get-code" && (
          <GetCode
            onCancel={props.onBack}
            onCodeSend={(mail) => {
              setFlags((prev) => ({
                ...prev,
                currentScreen: "verify-code",
                userEmail: mail,
              }));
            }}
          />
        )}

        {/* If Verify Code Screen */}
        {flags.currentScreen == "verify-code" && (
          <VerifyCode
            email={flags.userEmail}
            onCodeVerified={() =>
              setFlags((prev) => ({ ...prev, currentScreen: "set-password" }))
            }
          />
        )}

        {/* If set password */}
        {flags.currentScreen == "set-password" && (
          <SetPassword email={flags.userEmail} onSuccess={props.onBack} />
        )}
      </div>
    </div>
  );
};

export default Index;
