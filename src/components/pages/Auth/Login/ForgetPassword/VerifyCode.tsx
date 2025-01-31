import React, { useCallback, useState } from "react";
import { Button, InputOTP } from "@/components/elements";
import IconLoader from "@/components/misc/IconLoader";
import ResendOtp from "../../ResendOtp";
import Timer from "../../Timer";
import verifyOTP from "@/fetchers/user/verifyOTP";
import { toast } from "sonner";

type Props = {
  email: string;
  onCodeVerified: () => void;
};

const VerifyCode = (props: Props) => {
  // Flags
  const [flags, setFlags] = useState({
    userEmail: props.email,
    timerKey: 0,
    isResendOtpDisable: true,
    otp: "",
    processMg: "",
  });

  // Handle Email Verification
  const verifyCode = useCallback(
    async (argFlags: typeof flags, argOTP?: string) => {
      // Grab OTP
      const OTP = argOTP || argFlags.otp;

      // Verify OTP
      await verifyOTP({
        onFetching: () =>
          setFlags((prev) => ({
            ...prev,
            processMg: "Verifying...",
          })),
        onError: (msg) => {
          // Show error
          toast.error(msg);
          // Update Flags
          setFlags((prev) => ({
            ...prev,
            processMg: "",
          }));
        },
        onSuccess: (msg) => {
          // Show success toast
          toast.success(msg);

          // Change Screen
          props?.onCodeVerified?.();

          // Update flags
          setFlags((prev) => ({
            ...prev,
            processMg: "",
          }));
        },
        options: {
          email: argFlags.userEmail,
          otp: OTP,
        },
      });
    },

    // eslint-disable-next-line
    []
  );

  // Return JSX
  return (
    <div className="verify-code w-full h-full min-h-[inherit] flex flex-col items-center">
      {/* Email */}
      <div className="email flex gap-[1rem] justify-center items-center flex-col max-w-[30rem] text-center">
        {/* Title */}
        <p className="text-title font-bold text-[2.2rem] truncate">
          Email Verification
        </p>
        {/* Subtitle */}
        <p>
          Enter the code sent to :
          <br />
          <span className="font-bold text-title">{flags.userEmail}</span>
        </p>
        {/* Timer */}
        <Timer
          key={flags.timerKey}
          onComplete={() => {
            setFlags({ ...flags, isResendOtpDisable: false });
          }}
        />
      </div>

      {/* Form */}
      <div className="enter-otp space-y-[3rem] mt-[3.5rem] mb-[2.5rem] w-full flex flex-col items-center">
        {/* Enter Code Field */}
        <InputOTP
          disable={!!flags.processMg}
          length={6}
          onOtpSubmit={(e) => {
            setFlags({ ...flags, otp: e });
            verifyCode(flags, e);
          }}
        />

        {/* Resend OTP */}
        <ResendOtp
          email={flags.userEmail}
          disable={flags.isResendOtpDisable || !!flags.processMg}
          onResend={() => {
            setFlags({
              ...flags,
              timerKey: flags.timerKey + 1,
              isResendOtpDisable: true,
            });
          }}
        />

        {/* Submit Button */}
        <Button
          disabled={!!flags.processMg || !flags.otp || flags.otp.length < 6}
          className="w-full"
          onClick={() => verifyCode(flags)}
        >
          {flags.processMg ? (
            <>
              <span>{flags.processMg}</span>
              <IconLoader />
            </>
          ) : (
            "Verify"
          )}
        </Button>
      </div>
    </div>
  );
};

export default VerifyCode;
