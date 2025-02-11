import { FNGetAllPlaylist } from "@/fetchers/type";
import Header from "../Header";
import Sidebar from "../Sidebar";
import { Button } from "@/components/elements";
import { useState } from "react";
import StepComp from "../Sidebar/Step";
import cn from "@/utility/cn";
import { toast } from "sonner";

type Props = {
  playlist: FNGetAllPlaylist[0];
  onBack: () => void;
};

const Index = (props: Props) => {
  // Playlist
  const [playlist, setPlaylist] = useState(props.playlist ?? {});

  // Selected Slide
  const [selectedSlide, setSelectedSlide] = useState(
    props?.playlist?.slides_json?.[0]
  );

  // Return JSX
  return (
    <div className="w-full h-full py-body grid gap-[2rem] md:grid-cols-[1fr_auto]">
      {/* Column 1 */}
      <div className="wrapper grid md:grid-cols-[auto_1fr] grid-rows-[auto_auto_1fr] md:grid-rows-[auto_1fr] bg-white rounded-[2rem] overflow-hidden min-h-[calc(var(--page-content-height)_-_var(--body-padding)_-_var(--body-padding))]">
        {/* Header */}
        <Header playlistName={props.playlist.name ?? "Add Playlist Name"} />

        {/* Sidebar */}
        <Sidebar
          currentStep="manage-slides"
          playlist={playlist}
          className="md:col-start-1 md:col-end-2 md:row-start-1 md:row-end-3"
          otherSteps={
            <div className="relative leading-[1] flex max-md:gap-[1rem] md:flex-col max-md:overflow-x-auto w-full h-fit max-md:p-body">
              {playlist?.slides_json?.map((slide, index) => {
                // Selected Slide Index
                const selectedSlideIndex = playlist?.slides_json?.findIndex(
                  (s) => s?.slide_no == selectedSlide?.slide_no
                );

                // isSelectedSlide
                const isSelectedSlide =
                  selectedSlide?.slide_no == slide?.slide_no;

                // Return comp
                return (
                  <Button
                    key={index}
                    onClick={() => {
                      // If clicked on next slide and current slide has no widgets
                      if (
                        (selectedSlideIndex ?? 0) < index &&
                        !slide?.widgets?.length
                      ) {
                        toast.info(
                          "Please add widget(s) to selected slide first."
                        );
                        return;
                      }

                      // Update selected slide
                      setSelectedSlide(slide);
                    }}
                    className={cn(
                      "max-md:text-para/30 max-md:border-current bg-[#F7F8F9] md:bg-transparent text-[1.3rem] md:text-[1.5rem] p-[0.6em_1em] md:p-0 md:rounded-none md:border-0 md:h-[5rem] md:last:h-fit md:justify-normal md:items-[unset]",
                      index == 0 && "md:h-[8rem]",
                      isSelectedSlide &&
                        "max-md:bg-primary max-md:border-primary max-md:text-white"
                    )}
                  >
                    {/* Step Comp */}
                    <StepComp
                      key={index}
                      name={(slide?.slide_name ?? "") + " >"}
                      isCurrentStep={isSelectedSlide}
                      isPreviousStep={index < (selectedSlideIndex ?? 0)}
                      className={cn(
                        "max-md:hidden h-full",
                        index == 0 &&
                          "[&_.point]:first:before:!block md:pt-[4rem]"
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
          }
        />

        {/* Main Content */}
        <div className="p-body xl:p-[calc(var(--body-padding)_+_var(--body-padding)_/_1.5)] w-full h-full flex gap-[4rem] md:gap-[6rem] flex-col [&_.field]:flex [&_.field]:flex-col [&_.field]:gap-[1.5rem] [&_.field_span]:text-[1.4rem] [&_.field_span]:opacity-80">
          {/* Actions */}
          <div className="actions flex flex-wrap items-center mt-auto sm:justify-end gap-[1.5rem] max-sm:mb-[2rem]">
            {/* Back */}
            <Button
              className="max-sm:flex-1 sm:w-[20rem] bg-transparent text-primary"
              onClick={props?.onBack}
            >
              Back
            </Button>

            {/* Save */}
            <Button
              className="max-sm:flex-1 sm:w-[20rem]"
              disabled={playlist?.slides_json?.some?.((s) => !s?.slide_name)}
            >
              Next
            </Button>
          </div>
        </div>
      </div>

      {/* Column 2 */}
      <div className="w-full max-w-[400px] h-full rounded-[2rem] overflow-hidden bg-white p-body flex flex-col items-center justify-center"></div>
    </div>
  );
};

export default Index;
