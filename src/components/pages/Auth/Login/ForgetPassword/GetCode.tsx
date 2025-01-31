import { Button, InputEmail } from "@/components/elements";
import IconLoader from "@/components/misc/IconLoader";
import { regexChecks } from "@/config/misc";
import forgetPassword from "@/fetchers/user/forgetPassword";
import { useState } from "react";
import { toast } from "sonner";

type Props = {
  onCodeSend: (email: string) => void;
  onCancel: () => void;
};

const GetCode = (props: Props) => {
  // Flags
  const [flags, setFlags] = useState({
    email: "",
    emailError: "",
    isSendingCode: false,
  });

  // Get code handler
  const handleGetCode = async () => {
    // If not a valid email id
    if (!regexChecks.email.test(flags.email))
      return setFlags({
        ...flags,
        emailError: "Invalid email id",
      });

    // Send OTP
    await forgetPassword({
      onFetching: () =>
        setFlags({ ...flags, isSendingCode: true, emailError: "" }),
      options: {
        email: flags.email,
      },
      onError: (msg) => {
        // Show error
        toast.error(msg);
        // Update Flags
        setFlags({
          ...flags,
          emailError: msg,
          isSendingCode: false,
        });
      },
      onSuccess: (msg) => {
        // Show toast
        toast.success(msg);
        // Set screen
        props?.onCodeSend?.(flags.email);
        // Update flags
        setFlags({
          ...flags,
          emailError: "",
          isSendingCode: false,
        });
      },
    });
  };

  // Return JSX
  return (
    <div className="get-code">
      {/* Info */}
      <div className="info">
        <p className="truncate text-title font-bold text-[1.7rem]">
          Enter Email Id
        </p>
        <span className="mt-[1rem] mb-[5rem] block">
          Enter the email associated with your account and we’ll send an email
          with code to reset your password
        </span>
      </div>

      {/* Form */}
      <div className="form space-y-[8rem]">
        {/* Email Field */}
        <InputEmail
          required
          disabled={flags.isSendingCode}
          placeholder="Enter your email"
          errorMessage={flags.emailError}
          onChange={(e) => {
            if (!flags.isSendingCode && e.isTrusted) {
              setFlags({
                ...flags,
                email: `${e.target.value}`,
                emailError: "",
              });
            }
          }}
        />

        {/* Actions */}
        <div className="grid xs:grid-cols-2 gap-[1.5rem]">
          {/* Cancel */}
          <Button
            onClick={props.onCancel}
            className="bg-white border border-primary text-primary w-full"
          >
            Cancel
          </Button>

          {/* Submit Button */}
          <Button
            disabled={flags.isSendingCode || !flags.email}
            onClick={handleGetCode}
            className="w-full"
          >
            {flags.isSendingCode ? (
              <>
                <span>Proceeding...</span>
                <IconLoader />
              </>
            ) : (
              "Proceed"
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default GetCode;
