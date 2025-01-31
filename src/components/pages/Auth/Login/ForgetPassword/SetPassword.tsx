import { Button, InputPassword } from "@/components/elements";
import IconLoader from "@/components/misc/IconLoader";
import { regexChecks } from "@/config/misc";
import setPassword from "@/fetchers/user/setPassword";
import { useState } from "react";
import { toast } from "sonner";

type Props = {
  email: string;
  onSuccess: () => void;
};

const SetPassword = (props: Props) => {
  // Flags
  const [flags, setFlags] = useState({
    newPassword: "",
    confirmNewPassword: "",
    errorMsg: "",
    isChangingPassword: false,
  });

  // Change Password Handler
  const handlerChangePassword = async (argFlags: typeof flags) => {
    // Length check
    if (
      !regexChecks.password.test(argFlags.newPassword) ||
      !regexChecks.password.test(argFlags.confirmNewPassword)
    )
      return setFlags((prev) => ({
        ...prev,
        errorMsg: "Password must be at least 6 characters long.",
      }));

    // If confirm password != password
    if (argFlags.newPassword !== argFlags.confirmNewPassword)
      return setFlags((prev) => ({
        ...prev,
        errorMsg: "Passwords do not match.",
      }));

    // Set Password
    await setPassword({
      onFetching: () =>
        setFlags((prev) => ({ ...prev, isChangingPassword: true })),
      onError: (errorMsg) => {
        // Show Toast
        toast.error(errorMsg);
        // Update Flags
        setFlags((prev) => ({
          ...prev,
          errorMsg: errorMsg ?? "",
          isChangingPassword: false,
        }));
      },
      options: {
        email: props.email,
        password: flags.newPassword,
      },
      onSuccess: (msg) => {
        // Sow toast
        toast.success(msg);
        // Set screen
        props?.onSuccess?.();
        // Update Flags
        setFlags((prev) => ({ ...prev, isChangingPassword: false }));
      },
    });
  };

  // Return JSX
  return (
    <div className="set-password">
      {/* Create Password */}
      <InputPassword
        required
        disabled={flags.isChangingPassword}
        placeholder="Create new password"
        errorMessage={flags.errorMsg}
        onChange={(e) => {
          if (!flags.isChangingPassword) {
            setFlags((prev) => ({
              ...prev,
              newPassword: e.target.value,
              errorMsg: "",
            }));
          }
        }}
      />

      {/* Confirm Password */}
      <InputPassword
        required
        className="mb-[7rem] mt-[3rem]"
        disabled={flags.isChangingPassword}
        placeholder="Confirm new password"
        errorMessage={flags.errorMsg}
        onChange={(e) => {
          if (!flags.isChangingPassword) {
            setFlags((prev) => ({
              ...prev,
              confirmNewPassword: e.target.value,
              errorMsg: "",
            }));
          }
        }}
      />

      {/* Submit Button */}
      <Button
        onClick={() => handlerChangePassword(flags)}
        disabled={
          flags.isChangingPassword ||
          !flags.newPassword ||
          !flags.confirmNewPassword
        }
        className="w-full"
      >
        {flags.isChangingPassword ? <IconLoader /> : "Save"}
      </Button>
    </div>
  );
};

export default SetPassword;
