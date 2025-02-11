"use client";

import { FNGetAllPlaylist } from "@/fetchers/type";
import { TypeSlide } from "@/types/misc";
import StepComp from "../Sidebar/Step";
import cn from "@/utility/cn";
import { Button } from "@/components/elements";

type Props = {
  playlist: FNGetAllPlaylist[0];
  selectedSlide?: TypeSlide;
  onClick?: (slide: TypeSlide) => void;
  disable?: boolean;
};

const SlidesStep = (props: Props) => {
  // Return JSX
  return (
    <div className="relative leading-[1] max-md:overflow-x-auto w-full h-fit max-md:p-body">
      <div className="wrapper flex max-md:gap-[1rem] md:flex-col max-md:pr-body max-md:min-w-fit">
        {props.playlist?.slides_json?.map((slide, index) => {
          // Selected Slide Index
          const selectedSlideIndex = props.playlist?.slides_json?.findIndex(
            (s) =>
              s?.slide_no != null &&
              s?.slide_no == props?.selectedSlide?.slide_no
          );

          // isSelectedSlide
          const isSelectedSlide =
            slide?.slide_no != null &&
            props.selectedSlide?.slide_no == slide?.slide_no;

          // Return comp
          return (
            <Button
              key={index}
              onClick={() => props?.onClick?.(slide)}
              disabled={props.disable}
              className={cn(
                "min-w-0 md:text-left max-md:text-para/30 max-md:border-current bg-[#F7F8F9] md:bg-transparent text-[1.3rem] md:text-[1.5rem] p-[0.6em_1em] md:p-0 md:border-0 md:h-[5rem] md:last:h-fit md:justify-normal md:items-[unset]",
                index == 0 && "md:h-[9rem]",
                isSelectedSlide &&
                  "max-md:bg-primary max-md:border-primary max-md:text-white"
              )}
            >
              {/* Step Comp */}
              <StepComp
                key={index}
                name={
                  <span className="leading-[1] flex items-center gap-[0.7rem] w-full justify-between">
                    {/* Name */}
                    <span className="w-[10%] grow truncate">
                      {" "}
                      {slide.slide_name}
                    </span>
                    {/* Arrow Icon */}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="aspect-[6/11] min-w-[0.7rem] max-w-[0.7rem]"
                      fill="none"
                      viewBox="0 0 6 11"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="1.5"
                        d="M.785 10.004 5 5.79.785 1.574"
                      ></path>
                    </svg>
                  </span>
                }
                isCurrentStep={isSelectedSlide}
                isPreviousStep={
                  index <
                  (selectedSlideIndex == -1 ? 0 : selectedSlideIndex ?? 0)
                }
                className={cn(
                  "w-full [&_>_span]:w-full max-md:hidden h-full",
                  index == 0 && "[&_.point]:first:before:!block md:pt-[4rem]"
                )}
              />

              {/* Text */}
              <span className="md:hidden truncate">
                {slide?.slide_name ?? ""}
              </span>
            </Button>
          );
        })}
      </div>
    </div>
  );
};

export default SlidesStep;
