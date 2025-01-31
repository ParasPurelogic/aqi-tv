"use client";

import {
  Button,
  InputCheckbox,
  InputEmail,
  InputPassword,
} from "@/components/elements";
import { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { routes } from "@/config/routes";
import { regexChecks } from "@/config/misc";
import cn from "@/utility/cn";
import IconLoader from "@/components/misc/IconLoader";
import logMeIn from "@/actions/logMeIn";

type Props = {
  onForgetClick: () => void;
};

const LoginForm = (props: Props) => {
  // React Hook Form
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
    setError,
    watch,
    clearErrors,
  } = useForm();

  // Logged in flag
  const [loggedInMsg, setLoggedInMsg] = useState("");

  // On form submit function
  const onSubmit = useCallback(
    async (data: any) => {
      // Extract email and password from the fields
      const email = String(data.email) || "";
      const password = String(data.password) || "";

      // Update status
      setLoggedInMsg("Logging in...");

      // Login User
      const loginStatus = await logMeIn({
        email,
        password,
      });

      // If failed login
      if (!loginStatus.status) {
        // Reset logged in status
        setLoggedInMsg("");

        // Display error message
        toast.error(loginStatus.message);

        // Set errors for email and password fields
        setError("email", {
          type: "serverError",
          message: "Please check your email",
        });
        setError("password", {
          type: "serverError",
          message: "Please check your password",
        });

        // return
        return;
      }

      // If logged in successfully
      // Show success toast
      toast.success("Login successful!");

      // update the status
      setLoggedInMsg("Redirecting...");

      // Redirect User
      if (typeof window != "undefined") {
        window.location.href = routes.home.url;
      }
    },
    // eslint-disable-next-line
    []
  );

  // Return JSX
  return (
    <form
      className="login-form flex flex-col w-full"
      method="POST"
      onSubmit={(e) => {
        // prevent default form submission
        e.preventDefault();
        // submit the form
        handleSubmit((d) => onSubmit(d))();
      }}
    >
      {/* Input Fields  */}
      <div className="fields flex flex-col gap-[2.2rem]">
        {/* Email */}
        <InputEmail
          required
          errorMessage={`${errors.email?.message || ""}`}
          placeholder="Enter you email"
          disabled={isSubmitting || !!loggedInMsg}
          {...register("email", {
            required: "Email is required",
            pattern: {
              value: regexChecks.email,
              message: "Invalid email",
            },
          })}
          onChange={(e) => {
            setValue("email", e.target.value);
            if (errors.email) clearErrors("email");
          }}
        />
        {/* Password */}
        <InputPassword
          required
          errorMessage={`${errors.password?.message || ""}`}
          placeholder="Enter your password"
          disabled={isSubmitting || !!loggedInMsg}
          {...register("password", {
            required: "Password is required",
            minLength: {
              value: 6,
              message: "Password must be at least 6 characters long",
            },
          })}
          onChange={(e) => {
            setValue("password", e.target.value);
            if (errors.password) clearErrors("password");
          }}
        />
      </div>

      {/* Misc Actions */}
      <div
        className={cn(
          "misc-actions flex items-center flex-wrap justify-between w-full text-primary text-[1.3rem] md:text-[1.5rem] mt-[2rem] mb-[3.4rem] md:mt-[2.3rem] md:mb-[3.7rem]",
          (isSubmitting || !!loggedInMsg) && "pointer-events-none opacity-70"
        )}
      >
        {/* Remember Me */}
        <InputCheckbox labelText="Remember me?" />

        {/* Forget Password */}
        <span
          className="cursor-pointer text-right"
          onClick={() =>
            !isSubmitting &&
            !loggedInMsg &&
            props.onForgetClick &&
            props.onForgetClick()
          }
        >
          Forget Password?
        </span>
      </div>

      {/* Submit button  */}
      <Button
        type="submit"
        disabled={
          !watch("email") || !watch("password") || isSubmitting || !!loggedInMsg
        }
        className="w-full"
      >
        {isSubmitting || !!loggedInMsg ? (
          <>
            <span>{loggedInMsg}</span>
            <IconLoader />
          </>
        ) : (
          "Login"
        )}
      </Button>
    </form>
  );
};

export default LoginForm;
