import { FNGetAllPlaylist } from "@/fetchers/type";
import Header from "../Header";
import Sidebar from "../Sidebar";
import { Button } from "@/components/elements";
import { Fragment, useState } from "react";
import StepComp from "../Sidebar/Step";
import cn from "@/utility/cn";

type Props = {
  playlist: FNGetAllPlaylist[0];
  onBack: () => void;
};

const Index = (props: Props) => {
  // Playlist
  const [playlist, setPlaylist] = useState(props.playlist ?? {});

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
            <div className="relative text-[1.5rem] leading-[1] flex md:flex-col flex-wrap w-full h-fit">
              {playlist?.slides_json?.map((slide, index) => {
                // Return comp
                return (
                  <StepComp
                    key={index}
                    name={slide?.slide_name ?? ""}
                    isCurrentStep={false}
                    isPreviousStep={false}
                    className={cn(
                      "max-md:flex-1 md:h-[5rem] last:h-fit",
                      index == 0 &&
                        "[&_.point]:first:before:!block md:h-[10rem] md:pt-[5rem]"
                    )}
                  />
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
