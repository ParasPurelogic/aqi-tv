"use client";

import { Button } from "@/components/elements";
import { useState } from "react";
import cn from "@/utility/cn";

type Props = {
  className?: string;
  minLimit?: number;
  maxLimit?: number;
  default?: number;
  disabled?: boolean;
  onCountChange: (count: number) => void;
};

const InputCounter = (props: Props) => {
  // Counter
  const [count, setCount] = useState(props.default ?? 0);

  // Button Handler
  const handler = (type: "add" | "minus") => {
    // If disabled
    if (props.disabled) return;

    let newCount = count;

    // If add
    if (type == "add") {
      newCount =
        props.maxLimit && newCount + 1 > props.maxLimit
          ? newCount
          : newCount + 1;
    }

    // If minus
    else {
      // newCount = props.minLimit && newCount - 1 < props.minLimit ? newCount : newCount - 1
      // If minus
      newCount =
        props.minLimit && newCount - 1 < props.minLimit
          ? newCount
          : newCount - 1;
      // Ensure newCount doesn't go below the minimum limit
      newCount = Math.max(newCount, props.minLimit ?? -Infinity);
    }

    // If change
    if (count != newCount) {
      // Update count State
      setCount(newCount);

      // Run props.fn
      props?.onCountChange?.(newCount);
    }
  };

  return (
    <div
      className={cn(
        "input-counter bg-[#F5F6F8] rounded-[1.5rem] overflow-hidden flex gap-[2rem] items-center justify-between p-[0.6rem]",
        props.className
      )}
    >
      <Button
        disabled={props.minLimit != null && count == props.minLimit}
        className="bg-title px-[0em] py-[0.4em] w-[2.4em]"
        onClick={() => handler("minus")}
      >
        -
      </Button>
      <span className="leading-[1] text-title font-bold">{count}</span>
      <Button
        disabled={props.maxLimit != null && count == props.maxLimit}
        className="bg-title px-[0em] py-[0.4em] w-[2.4em]"
        onClick={() => handler("add")}
      >
        +
      </Button>
    </div>
  );
};

export default InputCounter;
