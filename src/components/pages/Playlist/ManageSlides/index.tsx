import { FNGetAllPlaylist } from "@/fetchers/type";
import Header from "../Header";
import Sidebar from "../Sidebar";
import { Button } from "@/components/elements";
import { Fragment, useCallback, useState } from "react";
import { toast } from "sonner";
import NoScreens from "@/components/pages/pageCommons/NoScreens";
import { TypeSlide, TypeWidget } from "@/types/misc";
import dynamic from "next/dynamic";
import ShowLoader from "@/components/ui/ShowLoader";
import IconLoader from "@/components/misc/IconLoader";
import Image from "next/image";
import createUpdatePlaylist from "@/fetchers/screen/createUpdatePlaylist";
import { useUserInfo } from "@/contexts/UserInfo";
import { routes } from "@/config/routes";
import SlidesStep from "./SlidesStep";

type Props = {
  playlist: FNGetAllPlaylist[0];
  onBack: () => void;
};

export type Playlist = Omit<FNGetAllPlaylist[0], "slides_json"> & {
  slides_json: Slide[];
};
export type Slide = Omit<TypeSlide, "widgets"> & { widgets?: Widget[] };
export type Widget = TypeWidget & { isSelected?: boolean };

type Flags = {
  showAddWidgetModal: false | number;
  playlist: Playlist;
  selectedSlide: Slide;
  isSaving: boolean;
};

// AddWidgetModal
const AddWidgetModal = dynamic(() => import("./AddWidgetModal"), {
  loading: () => <ShowLoader fullScreen />,
});

const Index = (props: Props) => {
  // userInfo
  const userInfo = useUserInfo();

  // FLags
  const [flags, setFlags] = useState<Flags>(() => {
    // Playlist
    const playlist = {
      ...(props.playlist ?? {}),
      slides_json:
        props.playlist?.slides_json?.map((s, si) => ({
          ...s,
          widgets:
            s?.widgets?.map((w, wi) => ({
              ...w,
              // Make the first widget of the each slide, selected
              isSelected: wi == 0,
            })) ?? [],
        })) ?? [],
    };

    // Return payload
    return {
      isSaving: false,
      showAddWidgetModal: false,
      playlist: playlist,
      selectedSlide: playlist?.slides_json?.[0],
    };
  });

  // Handle Save
  const handleSave = useCallback(async (playlist: Playlist) => {
    try {
      // Update Flags
      setFlags((prev) => ({ ...prev, isSaving: true }));

      // Check if every slide has at least one widget
      if (playlist?.slides_json?.some((s) => !s?.widgets?.length)) {
        throw new Error("Every slide must have at least one widget.");
      }

      // Save Playlist
      await createUpdatePlaylist({
        options: {
          token: userInfo?.token ?? "",
          userId: userInfo?.id ?? 0,
          playlistName: playlist?.name ?? "",
          playlistId: playlist?.id ?? 0,
          slides: playlist?.slides_json?.map((slide) => ({
            ...slide,
            widgets: slide?.widgets?.map((w) => ({
              previewIcon: w.previewIcon,
              previewScreen: w.previewScreen,
              widget_id: w.widget_id,
              widget_name: w.widget_name,
            })),
          })),
        },
        onError: (err) => {
          throw new Error(err);
        },
        onSuccess: () => {
          // Show Success
          toast.success("Playlist saved successfully.");
          // Redirect to manage playlist page
          if (typeof window !== "undefined") {
            window.location.href = routes.playlist.url;
          }
        },
      });

      //
    } catch (error: any) {
      // Show error
      toast.error(error?.message);
      // Update Flags
      setFlags((prev) => ({ ...prev, isSaving: false }));
    }

    // eslint-disable-next-line
  }, []);

  // Return JSX
  return (
    <div className="w-full h-full py-body grid gap-[2rem] md:grid-cols-[1fr_auto]">
      {/* Column 1 */}
      <div className="wrapper grid md:grid-cols-[auto_1fr] grid-rows-[auto_auto_1fr] md:grid-rows-[auto_1fr] bg-white rounded-[2rem] overflow-hidden md:min-h-[calc(var(--page-content-height)_-_var(--body-padding)_-_var(--body-padding))]">
        {/* Header */}
        <Header
          disableRouting={flags.isSaving}
          playlistName={flags.playlist.name ?? "Add Playlist Name"}
        />

        {/* Sidebar */}
        <Sidebar
          currentStep="manage-slides"
          playlist={flags.playlist}
          className="md:col-start-1 md:col-end-2 md:row-start-1 md:row-end-3"
          otherSteps={
            <SlidesStep
              playlist={flags.playlist}
              disable={flags.isSaving}
              selectedSlide={flags.selectedSlide}
              onClick={(slide) => {
                // Find slide index
                const slideIndex = flags.playlist?.slides_json?.findIndex(
                  (s) => s?.slide_no != null && s?.slide_no == slide?.slide_no
                );

                // Find selected slide index
                const selectedSlideIndex =
                  flags.playlist?.slides_json?.findIndex(
                    (s) =>
                      s?.slide_no != null &&
                      s?.slide_no == flags.selectedSlide?.slide_no
                  );

                // If clicked on next slide and selected slide has no widgets
                if (
                  slideIndex > (selectedSlideIndex ?? 0) &&
                  !flags.selectedSlide?.widgets?.length
                ) {
                  toast.info("Please add widget(s) to selected slide first.");
                  return;
                }

                // Update selected slide
                setFlags((prev) => ({
                  ...prev,
                  selectedSlide: {
                    ...slide,
                    // Make the first widget of the selected slide selected
                    widgets: slide?.widgets?.length
                      ? slide?.widgets?.map((w, i) => ({
                          ...w,
                          isSelected: i == 0,
                        }))
                      : [],
                  },
                }));
              }}
            />
          }
        />

        {/* Main Content */}
        <div className="p-body min-w-0 xl:p-[calc(var(--body-padding)_+_var(--body-padding)_/_1.5)] w-full h-full flex gap-[4rem] md:gap-[6rem] flex-col [&_.field]:flex [&_.field]:flex-col [&_.field]:gap-[1.5rem] [&_.field_span]:text-[1.4rem] [&_.field_span]:opacity-80">
          {/* Content */}
          <div className="w-full mb-auto flex flex-col grow min-h-fit">
            {[1].map((l) => {
              // Does selected slide have widgets
              const doesSelectedSlideHasWidget =
                !!flags.selectedSlide?.widgets?.length;

              // Does selected slide has any selected widget
              const doesSelectedSlideHasSelectedWidget =
                flags.selectedSlide?.widgets?.some(
                  (w) => w?.isSelected == true
                );

              //  If selected slide has no widget
              if (!doesSelectedSlideHasWidget) {
                return (
                  <NoScreens
                    key={l}
                    title="No Widget Added Yet"
                    subTitle="No Widget added yet, add widget(s) by clicking on 'Add Widget' button."
                    className="m-[8rem_auto] md:my-auto"
                  />
                );
              }

              // If selected slide has widgets, but no widget is selected
              if (
                doesSelectedSlideHasWidget &&
                !doesSelectedSlideHasSelectedWidget
              ) {
                return (
                  <NoScreens
                    key={l}
                    title="No Widget Selected"
                    subTitle="No Widget selected, select a widget by clicking on widget zone."
                    className="m-[8rem_auto] md:my-auto"
                  />
                );
              }

              // Else
              return (
                <Fragment key={l}>
                  {JSON.stringify(flags.selectedSlide)}
                </Fragment>
              );
            })}
          </div>

          {/* Actions */}
          <div className="actions flex flex-wrap items-center sm:justify-end gap-[1.5rem]">
            {/* Back */}
            <Button
              className="max-sm:flex-1 sm:w-[20rem] bg-transparent text-primary"
              onClick={props?.onBack}
              disabled={flags.isSaving}
            >
              Previous Step
            </Button>

            {/* Save */}
            {[1].map((i) => {
              // Selected Slide Index
              const selectedSlideIndex = flags.playlist?.slides_json?.findIndex(
                (s) => s?.slide_no == flags.selectedSlide?.slide_no
              );

              // Is Last Slide
              const isLastSlide =
                selectedSlideIndex == flags.playlist?.slides_json?.length - 1;

              // Return JSX
              return (
                <Button
                  key={i}
                  className="max-sm:flex-1 sm:w-[20rem]"
                  disabled={
                    !flags.selectedSlide?.widgets?.length || flags.isSaving
                  }
                  onClick={() =>
                    isLastSlide
                      ? handleSave(flags.playlist)
                      : setFlags((prev) => ({
                          ...prev,
                          selectedSlide:
                            prev.playlist?.slides_json?.[
                              selectedSlideIndex + 1
                            ],
                        }))
                  }
                >
                  {flags.isSaving ? (
                    <IconLoader />
                  ) : isLastSlide ? (
                    "Save"
                  ) : (
                    "Next Slide"
                  )}
                </Button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Column 2 */}
      <div className="w-full min-w-0 md:max-w-[400px] h-full rounded-[2rem] overflow-hidden bg-white p-[3rem_var(--body-padding)] flex flex-col items-center justify-center">
        {/* Screen */}
        <div className="screen border-[5px] border-b-[10px] border-title aspect-[336/598] w-[30rem] bg-[#F2F5FF] shadow-lg flex flex-col items-center justify-center">
          {/* Preview Img */}
          {!!flags.selectedSlide?.widgets?.length && (
            <Image
              src={flags.selectedSlide.widgets[0].previewScreen ?? ""}
              alt="Widget Preview on device"
              width={100}
              height={100}
              className="w-full h-full object-cover"
            />
          )}

          {/* Add Widget Button */}
          {!flags.selectedSlide?.widgets?.length && (
            <Button
              onClick={() =>
                setFlags((prev) => ({ ...prev, showAddWidgetModal: 0 }))
              }
            >
              + Add Widget
            </Button>
          )}
        </div>
      </div>

      {/* Add Widget Modal */}
      {typeof flags.showAddWidgetModal == "number" && (
        <AddWidgetModal
          onClose={() => setFlags({ ...flags, showAddWidgetModal: false })}
          onSelect={(widget) => {
            // If index available
            if (typeof flags.showAddWidgetModal == "number") {
              // Widgets
              const widgets = flags.selectedSlide?.widgets ?? [];

              // Push the widget at selected index
              widgets[flags.showAddWidgetModal] = {
                ...widget,
                isSelected: true,
              };

              // Selected Slide
              const newSelectedSlide: Slide = {
                ...flags.selectedSlide,
                widgets: widgets,
              };

              // Update Flags
              setFlags((prev) => ({
                ...prev,
                selectedSlide: newSelectedSlide,
                playlist: {
                  ...prev.playlist,
                  slides_json: prev.playlist?.slides_json?.map((s) =>
                    s?.slide_no == newSelectedSlide?.slide_no
                      ? newSelectedSlide
                      : s
                  ),
                },
              }));
            }
          }}
        />
      )}
    </div>
  );
};

export default Index;
