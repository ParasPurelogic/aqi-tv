import { FNGetAllPlaylist } from "@/fetchers/type";
import Header from "../Header";
import Sidebar from "../Sidebar";
import { Button, InputCounter, InputText } from "@/components/elements";
import { useState } from "react";
import SlidesStep from "../ManageSlides/SlidesStep";

type Props = {
  playlist: FNGetAllPlaylist[0];
  onSave: (playlist: FNGetAllPlaylist[0]) => void;
  onBack: () => void;
};

const Index = (props: Props) => {
  // Playlist
  const [playlist, setPlaylist] = useState<FNGetAllPlaylist[0]>({
    ...props?.playlist,
    slides_json: props?.playlist?.slides_json?.length
      ? props.playlist?.slides_json
      : [
          {
            slide_no: 1,
            slide_name: "Slide 1 Name",
            widgets: [],
          },
        ],
  });

  // Return JSX
  return (
    <div className="w-full h-full py-body">
      <div className="wrapper grid md:grid-cols-[auto_1fr] grid-rows-[auto_auto_1fr] md:grid-rows-[auto_1fr] bg-white rounded-[2rem] overflow-hidden min-h-[calc(var(--page-content-height)_-_var(--body-padding)_-_var(--body-padding))]">
        {/* Header */}
        <Header playlistName={props.playlist.name ?? "Add Playlist Name"} />

        {/* Sidebar */}
        <Sidebar
          currentStep="add-slides"
          playlist={playlist}
          className="md:col-start-1 md:col-end-2 md:row-start-1 md:row-end-3"
          otherSteps={<SlidesStep playlist={playlist} disable />}
        />

        {/* Main Content */}
        <div className="p-body xl:p-[calc(var(--body-padding)_+_var(--body-padding)_/_1.5)] w-full h-full flex gap-[4rem] md:gap-[6rem] flex-col [&_.field]:flex [&_.field]:flex-col [&_.field]:gap-[1.5rem] [&_.field_span]:text-[1.4rem] [&_.field_span]:opacity-80">
          {/* Counter */}
          <div className="field">
            {/* Label */}
            <span>No. of Slide(s):</span>
            {/* Input */}
            <InputCounter
              className="w-fit"
              minLimit={1}
              maxLimit={6}
              default={playlist?.slides_json?.length ?? 0}
              onCountChange={(count) =>
                setPlaylist((prev) => ({
                  ...prev,
                  slides_json: Array.from(
                    { length: count },
                    (_, i) =>
                      prev?.slides_json?.[i] ?? {
                        slide_name: `Slide ${i + 1} Name`,
                      }
                  ),
                }))
              }
            />
          </div>

          {/* Slide Names */}
          <div className="field">
            {/* Label */}
            <span>Slide(s) Name:</span>
            {/* Inputs */}
            <div className="grid md:grid-cols-3 gap-[1.5rem] md:gap-[3rem]">
              {(playlist?.slides_json ?? [])?.map((slide, i) => (
                <InputText
                  key={i}
                  value={slide?.slide_name ?? ""}
                  placeholder={`Slide ${i + 1} Name`}
                  onChange={(e) =>
                    setPlaylist((prev) => ({
                      ...prev,
                      slides_json: prev?.slides_json?.map?.((s, j) => ({
                        ...s,
                        slide_name: j == i ? e.target.value : s?.slide_name,
                      })),
                    }))
                  }
                />
              ))}
            </div>
          </div>

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
              disabled={
                playlist?.slides_json?.length == 0 ||
                playlist?.slides_json?.some?.((s) => !s?.slide_name)
              }
              onClick={() =>
                props?.onSave?.({
                  ...playlist,
                  slides_json: playlist?.slides_json?.map((slide, i) => ({
                    ...slide,
                    slide_no: slide?.slide_no ?? i + 1,
                    widgets: slide?.widgets ?? [],
                  })),
                })
              }
            >
              Next Step
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
