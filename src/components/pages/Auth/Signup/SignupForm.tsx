"use client";

import {
  Button,
  InputText,
  InputPassword,
  InputEmail,
  InputPhoneNumber,
} from "@/components/elements";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { useCallback } from "react";
import { regexChecks } from "@/config/misc";
import IconLoader from "@/components/misc/IconLoader";
import signup from "@/fetchers/user/signup";
import logMeIn from "@/actions/logMeIn";
import { routes } from "@/config/routes";

type Props = {
  onSuccess: (cred: { email: string; password: string }) => void;
};

const SignupForm = (props: Props) => {
  // Form hook
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
    clearErrors,
  } = useForm();

  // On submit function
  const onSubmit = useCallback(
    async (data: any) => {
      // Start Sign up
      const isSignedUp = await signup({
        options: {
          email: data.email,
          password: data.password,
          firstName: data.firstName,
          lastName: data.lastName,
          mobileNumber: data.mobileNumber,
        },
        onError: (msg) => {
          toast.error(msg);
        },
        onSuccess: () => {
          // Run props.onSuccess
          props?.onSuccess?.({ email: data.email, password: data.password });
        },
      });

      // Login if signed up
      if (isSignedUp) {
        // Login user
        const email = String(data.email) || "";
        const password = String(data.password) || "";

        // Login User
        const loginStatus = await logMeIn({
          email,
          password,
        });

        // If failed success
        if (loginStatus.status) {
          // Show success toast
          toast.success("Login successful!");

          // Redirect User
          if (typeof window != "undefined") {
            window.location.href = routes.screens.url;
          }
        }
      }
    },
    // eslint-disable-next-line
    []
  );

  // Return JSX
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      method="post"
      className="signup-form flex flex-col w-full"
    >
      {/* Input Fields  */}
      <div className="fields mb-[5rem] grid grid-cols-[1fr] xs:grid-cols-2 gap-y-[2.2rem] gap-x-[1.1rem]">
        {/* First Name  */}
        <InputText
          required
          errorMessage={`${errors.firstName?.message || ""}`}
          placeholder="First Name"
          disabled={isSubmitting}
          {...register("firstName", {
            required: "First Name is required",
            pattern: {
              value: regexChecks.simpleStringCheck,
              message: "Invalid First Name",
            },
          })}
          onChange={(e) => {
            setValue("firstName", e.target.value);
            if (errors.firstName) clearErrors("firstName");
          }}
        />

        {/* Last Name  */}
        <InputText
          required
          errorMessage={`${errors.lastName?.message || ""}`}
          placeholder="Last Name"
          disabled={isSubmitting}
          {...register("lastName", {
            required: "Last Name is required",
            pattern: {
              value: regexChecks.simpleStringCheck,
              message: "Invalid Last Name",
            },
          })}
          onChange={(e) => {
            setValue("lastName", e.target.value);
            if (errors.lastName) clearErrors("lastName");
          }}
        />

        {/* Email  */}
        <InputEmail
          required
          errorMessage={`${errors.email?.message || ""}`}
          placeholder="Email Address"
          disabled={isSubmitting}
          className={"col-span-full"}
          {...register("email", {
            required: "Email is required",
            pattern: {
              value: regexChecks.email,
              message: "Invalid email address",
            },
          })}
          onChange={(e) => {
            setValue("email", e.target.value);
            if (errors.email) clearErrors("email");
          }}
        />

        {/* Password  */}
        <InputPassword
          required
          errorMessage={`${errors.password?.message || ""}`}
          placeholder="Password"
          disabled={isSubmitting}
          className={"col-span-full"}
          {...register("password", {
            required: "Password is required",
            pattern: {
              value: regexChecks.password,
              message: "Password must be at least 6 characters long",
            },
          })}
          onChange={(e) => {
            setValue("password", e.target.value);
            if (errors.password) clearErrors("password");
          }}
        />

        {/* Mobile Number  */}
        <InputPhoneNumber
          required
          errorMessage={`${errors.mobileNumber?.message || ""}`}
          placeholder="Mobile Number"
          disabled={isSubmitting}
          className={"col-span-full"}
          {...register("mobileNumber", {
            required: "Mobile Number is required",
            pattern: {
              value: regexChecks.phoneNumber,
              message: "Invalid Mobile Number",
            },
            minLength: {
              value: 10,
              message: "Mobile Number must be at least 10 characters long",
            },
          })}
          onChange={(e) => {
            setValue("mobileNumber", e.target.value);
            if (errors.mobileNumber) clearErrors("mobileNumber");
          }}
        />
      </div>

      {/* Submit button  */}
      <Button
        type="submit"
        disabled={isSubmitting}
        className="w-full py-[1.2rem]"
      >
        {isSubmitting ? <IconLoader /> : "Proceed"}
      </Button>
    </form>
  );
};

export default SignupForm;
