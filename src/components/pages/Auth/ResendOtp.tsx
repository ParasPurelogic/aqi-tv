import resendOTP from "@/fetchers/user/resendOtp";
import cn from "@/utility/cn";
import { useState } from "react";
import { toast } from "sonner";

type Props = {
  disable: boolean;
  onResend: () => void;
  email: string;
};

const ResendOtp = (props: Props) => {
  // Resend Status
  const [isResending, setIsResending] = useState(false);

  // Handle Resend OTP
  const handleResend = async () => {
    // Resend OTP
    await resendOTP({
      onFetching: () => setIsResending(true),
      onError: (msg) => {
        // Show Error
        toast.error(msg ?? "Error while sending OTP");
        // Update state
        setIsResending(false);
      },
      options: {
        email: props.email,
      },
      onSuccess: (msg) => {
        // Show Success
        toast.success(msg);
        // Run props.onResend
        props?.onResend?.();
        // Update state
        setIsResending(false);
      },
    });
  };

  // Return JSX
  return (
    <div className="resend-otp flex w-full justify-center items-center gap-x-[0.5rem] max-xs:flex-wrap">
      {/* Label */}
      <p>Didn’t Received OTP?</p>
      {/* Action Text */}
      <p
        className={cn(
          "text-primary hover:text-slate-800 transition cursor-pointer",
          (isResending || props.disable) &&
            "opacity-50 pointer-events-none cursor-wait animate-pulse"
        )}
        onClick={() => {
          if (!isResending && !props.disable) {
            handleResend();
          }
        }}
      >
        {isResending ? "Sending..." : "Resend?"}
      </p>
    </div>
  );
};

export default ResendOtp;
