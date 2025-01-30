"use client";

import React, { forwardRef, InputHTMLAttributes } from "react";
import theme from "@/theme";
import cn from "@/utility/cn";
import generateRandomString from "@/utility/generateRandomString";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  className?: string;
  inputClassName?: string;
  labelText?: string;
}

const InputCheckbox = forwardRef<HTMLInputElement, Props>((props, ref) => {
  const { className, inputClassName, labelText, ...otherProps } = props;
  const checkboxId = generateRandomString();

  return (
    <div
      className={cn(
        "input-checkbox relative flex items-center gap-[0.8rem] cursor-pointer font-semibold",
        className
      )}
    >
      {/* Input */}
      <input
        type="checkbox"
        id={checkboxId}
        ref={ref}
        className={cn(
          `${theme.input.commonStyling}`,
          "w-[2rem] h-[2rem] cursor-pointer",
          inputClassName
        )}
        {...otherProps}
      />

      {/* Label */}
      {labelText && (
        <label
          className="cursor-pointer truncate leading-[1] grow"
          htmlFor={checkboxId}
        >
          {labelText}
        </label>
      )}
    </div>
  );
});

InputCheckbox.displayName = "InputCheckbox";

export default InputCheckbox;
