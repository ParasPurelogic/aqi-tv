"use client";

import cn from "@/utility/cn";

type props = {
  playlist?: { name?: string; slides_json?: any[] };
  isCurrentStep: boolean;
  isPreviousStep: boolean;
  className?: string;
  name: string;
  subName?: string;
};

const Step: React.FC<props> = ({
  isCurrentStep,
  isPreviousStep,
  name,
  subName,
  className,
}) => {
  // Return JSX
  return (
    <div
      className={cn(
        "step text-title/[20%] transition min-h-fit flex max-md:flex-col max-md:items-center max-md:text-center gap-[1rem] overflow-hidden",
        (isPreviousStep || isCurrentStep) && "text-primary",
        className
      )}
    >
      {/* Point */}
      <div
        className={cn(
          "point shadow-[inset_0_0_0_3px_currentColor] max-w-[2rem] min-w-[2rem] h-[2rem] rounded-full relative flex transition last:after:hidden first:before:hidden",
          isPreviousStep && "bg-current",
          isCurrentStep && "shadow-[inset_0_0_0_0.6rem_currentColor] bg-white",
          "after:content-[''] after:absolute before:content-[''] before:absolute after:bg-current before:bg-current",
          isCurrentStep && "after:bg-title/[20%]",
          //   Mobile
          "max-md:after:w-[200px] max-md:after:h-[3px] max-md:before:w-[200px] max-md:before:h-[3px] max-md:after:top-1/2 max-md:after:-translate-y-1/2 max-md:before:top-1/2 max-md:before:-translate-y-1/2 max-md:after:right-0 max-md:after:translate-x-full max-md:before:left-0 max-md:before:-translate-x-full",
          //   Desktop
          "md:after:h-[200px] md:after:w-[3px] md:before:h-[200px] md:before:w-[3px] md:after:left-1/2 md:after:-translate-x-1/2 md:before:left-1/2 md:before:-translate-X-1/2 md:after:bottom-0 md:after:translate-y-full md:before:top-0 md:before:-translate-y-full"
        )}
      >
        {/* Check Icon */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          className={cn(
            "aspect-square w-[70%] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-0 transition",
            isPreviousStep && "opacity-100"
          )}
          fill="none"
          stroke="white"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="4"
          viewBox="0 0 24 24"
        >
          <path stroke="none" d="M0 0h24v24H0z"></path>
          <path d="m5 12 5 5L20 7"></path>
        </svg>
      </div>

      {/* Text */}
      <span
        className={cn(
          "truncate text-title/50 max-w-full flex flex-col max-md:items-center max-md:justify-center gap-[0.3em] md:gap-[0.5em] md:translate-y-[0.2em] max-md:px-[1rem]",
          (isCurrentStep || isPreviousStep) && "text-title"
        )}
      >
        <span>{name}</span>
        {subName && (
          <span className="text-[0.9em] md:text-[0.8em] opacity-70 max-w-full whitespace-break-spaces leading-[120%]">
            {subName}
          </span>
        )}
      </span>
    </div>
  );
};

export default Step;
