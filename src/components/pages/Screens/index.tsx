"use client";

import {
  Button,
  Divider,
  InputCheckbox,
  Link,
  SearchBar,
} from "@/components/elements";
import DropDownSelector from "@/components/ui/DropDownSelector";
import Page from "@/components/ui/Page";
import { routes } from "@/config/routes";
import { FNGetAllScreens } from "@/fetchers/type";
import cn from "@/utility/cn";
import { useCallback, useState } from "react";
import NoScreens from "../pageCommons/NoScreens";
import dynamic from "next/dynamic";
import ShowLoader from "@/components/ui/ShowLoader";
import deleteScreens from "@/fetchers/screen/deleteScreen";
import { useUserInfo } from "@/contexts/UserInfo";
import { toast } from "sonner";

type Props = {
  screens: FNGetAllScreens;
};

// Filters Options
const filters: {
  id: "a-z" | "z-a" | "newest" | "oldest" | "online" | "offline" | "default";
  name: string;
}[] = [
  {
    id: "default",
    name: "Default",
  },
  {
    id: "a-z",
    name: "Sort A-Z",
  },
  {
    id: "z-a",
    name: "Sort Z-A",
  },
  {
    id: "newest",
    name: "Newest",
  },
  {
    id: "oldest",
    name: "Oldest",
  },
  {
    id: "online",
    name: "Online",
  },
  {
    id: "offline",
    name: "Offline",
  },
];

// Add Screen Modal
const AddScreenModal = dynamic(() => import("./AddScreenModal"), {
  loading: () => <ShowLoader fullScreen />,
});

// Success Modal
const SuccessModal = dynamic(() => import("./SuccessModal"), {
  loading: () => <ShowLoader fullScreen />,
});

// Delete Popup
const DeletePopup = dynamic(() => import("@/components/ui/DeletePopup"), {
  loading: () => <ShowLoader fullScreen />,
});

const Index = (props: Props) => {
  // userinfo
  const userInfo = useUserInfo();

  // Screens
  const [screens, setScreens] = useState(props.screens);

  // Flags
  const [flags, setFlags] = useState({
    searchedTerm: "",
    selectedFilter: filters[0],
    selectedScreens: undefined as FNGetAllScreens | undefined,
    showAddScreenModal: false as boolean | FNGetAllScreens[0],
    showSuccessModal: undefined as undefined | FNGetAllScreens[0],
    showDeleteScreenModal: false,
  });

  // Handle Delete Screens
  const handleScreenDelete = useCallback(
    async (screens: FNGetAllScreens): Promise<string> => {
      // Delete Screens
      const newScreens = await deleteScreens({
        options: {
          token: userInfo?.token ?? "",
          userId: userInfo?.id ?? 0,
          serialNumbers: screens?.map((s) => s.serialNo ?? ""),
        },
      });

      // reset flags
      setFlags((prev) => ({
        ...prev,
        showDeleteScreenModal: false,
        selectedScreens: undefined,
      }));

      // update screens
      setScreens(newScreens ?? []);

      // return success
      toast.success("Selected screen(s) deleted successfully");
      return "Selected screen(s) deleted successfully";
    },
    []
  );

  // Return JSX
  return (
    <Page
      name="home-manage-screens lg:px-body flex flex-col gap-[3rem] md:gap-[4rem] min-h-full pb-[5rem]"
      style={{
        maxHeight:
          "calc(var(--page-content-height) - (var(--body-padding) * 4))",
      }}
    >
      {/* Filters */}
      <div className="flex w-full items-center">
        {/* Search */}
        <SearchBar
          disabled={screens?.length == 0}
          className="border-[0_0_1px_0] !border-b !rounded-[0] focus-within:shadow-none pb-[1em]"
          onSearch={(term) =>
            setFlags((prev) => ({ ...prev, searchedTerm: term }))
          }
          onClear={() => setFlags((prev) => ({ ...prev, searchedTerm: "" }))}
          placeholder="Search by name, serial no. or date added."
        />

        {/* Add Screen */}
        <Button
          className="m-[0_1rem_0_2rem] md:m-[0_2rem_0_4rem] gap-[0.3em] lg:w-[25rem]"
          onClick={() => setFlags({ ...flags, showAddScreenModal: true })}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            className="aspect-square min-w-[2rem] max-w-[2rem]"
            viewBox="0 0 24 24"
          >
            <path stroke="none" d="M0 0h24v24H0z"></path>
            <path d="M12 5v14M5 12h14"></path>
          </svg>
          <span className="max-sm:hidden">Add Screen</span>
        </Button>

        {/* Manage */}
        <Button
          className={cn(
            "border border-current bg-transparent text-primary gap-[0.3em] lg:w-[25rem]",
            Array.isArray(flags.selectedScreens) &&
              flags?.selectedScreens?.length > 0 &&
              "hidden"
          )}
          onClick={() =>
            setFlags({
              ...flags,
              selectedScreens:
                typeof flags.selectedScreens == "undefined" ? [] : undefined,
            })
          }
          disabled={screens.length == 0}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            className="aspect-square min-w-[2rem] max-w-[2rem]"
            viewBox="0 0 24 24"
          >
            <path stroke="none" d="M0 0h24v24H0z"></path>
            <path d="M12 16H4a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1h16a1 1 0 0 1 1 1v7M7 20h5M9 16v4M17.001 19a2 2 0 1 0 4 0 2 2 0 1 0-4 0M19.001 15.5V17M19.001 21v1.5M22.032 17.25l-1.299.75M17.27 20l-1.3.75M15.97 17.25l1.3.75M20.733 20l1.3.75"></path>
          </svg>
          <span className="max-sm:hidden">
            {typeof flags.selectedScreens == "undefined"
              ? "Manage Screens"
              : "Cancel"}
          </span>
        </Button>

        {/* Delete Screens */}
        {Array.isArray(flags?.selectedScreens) &&
          flags?.selectedScreens?.length > 0 && (
            <Button
              className="bg-error border-error"
              onClick={() =>
                setFlags({ ...flags, showDeleteScreenModal: true })
              }
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                className="aspect-square w-[2.1rem]"
                viewBox="0 0 24 24"
              >
                <path stroke="none" d="M0 0h24v24H0z"></path>
                <path d="M4 7h16M10 11v6M14 11v6M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2l1-12M9 7V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v3"></path>
              </svg>
              <span className="max-sm:hidden">
                Delete {flags.selectedScreens.length}{" "}
                {flags.selectedScreens.length > 1 ? "Screens" : "Screen"}
              </span>
            </Button>
          )}
      </div>

      {/* Header */}
      <div className="flex items-center gap-[2rem] justify-between">
        {/* Heading */}
        <span>All Screens</span>

        {/* Filter */}
        <DropDownSelector
          disableSelection={screens.length == 0}
          options={filters}
          pickerComp={() => (
            <div className="aspect-[25/23] min-w-[2.3rem] max-w-[2.3rem] relative">
              {/* Icon */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-full h-full"
                fill="none"
                viewBox="0 0 25 23"
              >
                <path
                  stroke="currentColor"
                  strokeWidth="1.688"
                  d="M20.375 1.375H4.625c-1.591 0-2.386 0-2.88.464-.495.463-.495 1.21-.495 2.702v.777c0 1.167 0 1.75.292 2.235s.826.784 1.893 1.385l3.277 1.845c.716.403 1.074.604 1.33.827a3 3 0 0 1 1.011 1.676c.072.32.072.696.072 1.446v3.003c0 1.024 0 1.535.283 1.934.284.399.787.596 1.794.99 2.113.825 3.17 1.239 3.922.768.751-.47.751-1.544.751-3.692v-3.003c0-.75 0-1.126.072-1.446a3 3 0 0 1 1.01-1.676c.257-.223.615-.424 1.331-.827l3.277-1.845c1.067-.6 1.6-.901 1.893-1.385s.292-1.068.292-2.235V4.54c0-1.492 0-2.239-.494-2.702s-1.29-.464-2.881-.464Z"
                ></path>
              </svg>
              {/* Circle */}
              <div
                className={cn(
                  "aspect-square w-[1rem] bg-primary rounded-full absolute top-0 right-0 translate-x-1/2 -translate-y-1/2 transition opacity-0",
                  flags.selectedFilter.id != "default" && "opacity-100"
                )}
              ></div>
            </div>
          )}
          onSelect={(op) =>
            setFlags({ ...flags, selectedFilter: op as (typeof filters)[0] })
          }
        />
      </div>

      {/* Screens */}
      <div className="flex flex-col gap-[1rem] sm:gap-[1.5rem] w-[calc(100%_+_var(--body-padding)_+_var(--scrollbarWidth))] overflow-y-auto pr-body grow items-center h:[20rem] sm:h-[10rem]">
        {[1].map((i) => {
          // Screens
          let newScreens = [...screens];

          // If filters applied
          if (flags.selectedFilter.id != "default" || flags.searchedTerm) {
            newScreens = newScreens.filter((s) => {
              // For searched term
              const matchesSearch =
                !flags.searchedTerm ||
                `${s.ScreenName} ${s.serialNo} ${s.created_at}`
                  .toLowerCase()
                  .includes(flags.searchedTerm.toLowerCase());
              // For online status
              const matchesFilter =
                flags.selectedFilter.id === "online"
                  ? s.isOnline
                  : flags.selectedFilter.id === "offline"
                  ? !s.isOnline
                  : true;

              // return
              return matchesSearch && matchesFilter;
            });

            // Other filters if applicable
            switch (flags.selectedFilter.id) {
              case "a-z":
                newScreens.sort(
                  (a, b) =>
                    a?.ScreenName?.localeCompare?.(b.ScreenName ?? "") ?? 0
                );
                break;
              case "z-a":
                newScreens.sort(
                  (a, b) =>
                    b?.ScreenName?.localeCompare?.(a.ScreenName ?? "") ?? 0
                );
                break;
              case "newest":
                newScreens.sort(
                  (a, b) =>
                    new Date(b?.created_at ?? "").getTime() -
                    new Date(a?.created_at ?? "").getTime()
                );
                break;
              case "oldest":
                newScreens.sort(
                  (a, b) =>
                    new Date(a?.created_at ?? "").getTime() -
                    new Date(b?.created_at ?? "").getTime()
                );
                break;
            }
          }

          // If no screens
          if (newScreens.length == 0) {
            return (
              <NoScreens
                key={i}
                title="No Screen Available!"
                subTitle={
                  flags.selectedFilter.id != "default" || flags.searchedTerm
                    ? "No screen available, try changing or reset the filter(s)"
                    : "No screen available, click on 'Add Screen' to add a screen"
                }
              />
            );
          }

          // Return JSX
          return newScreens.map((screen) => (
            <div
              key={screen.id}
              className={cn(
                "grid grid-cols-[1fr_auto] w-full items-center gap-[1.5rem] md:gap-[2.5rem]",
                Array.isArray(flags.selectedScreens) &&
                  "grid-cols-[auto_1fr_auto]"
              )}
            >
              {/* Checkbox */}
              {Array.isArray(flags.selectedScreens) && (
                <InputCheckbox
                  className="[&_input]:w-[2.5rem] [&_input]:h-[2.5rem]"
                  onChange={(e) => {
                    setFlags((prev) => ({
                      ...prev,
                      selectedScreens: e.target.checked
                        ? [
                            ...(prev?.selectedScreens ?? []),
                            screen as FNGetAllScreens[0],
                          ]
                        : (prev?.selectedScreens ?? []).filter(
                            (s) => s?.id != screen?.id
                          ),
                    }));
                  }}
                  checked={flags?.selectedScreens?.some(
                    (s) => s?.id == screen?.id
                  )}
                />
              )}

              {/* Link */}
              <Link
                href={routes.singleScreen.url.replace(
                  "screenId",
                  String(screen?.serialNo + "-" + screen?.id)
                )}
                className={cn(
                  "relative border rounded-[1.5rem] overflow-hidden border-black/[16%] flex flex-wrap sm:grid grid-cols-[minmax(15rem,1fr)_2px_10rem_auto] md:grid-cols-[30rem_5rem_20rem_auto] gap-[1.2rem_1.5rem] sm:gap-[1.5rem_3rem] max-sm:p-[1.5rem_2rem] sm:pl-[3rem] md:pl-[5rem] w-full transition hover:border-primary hover:bg-primary/10 leading-[130%]",
                  flags.searchedTerm &&
                    !`${screen.ScreenName} ${screen.serialNo} ${screen.created_at}`
                      ?.toLowerCase()
                      .includes(flags?.searchedTerm?.toLowerCase()) &&
                    "hidden",
                  flags.selectedFilter.id == "online" &&
                    !screen.isOnline &&
                    "hidden",
                  flags.selectedFilter.id == "offline" &&
                    screen.isOnline &&
                    "hidden"
                )}
              >
                {/* Name */}
                <div className="max-sm:w-full flex flex-col-reverse sm:flex-col self-center gap-[0.6rem]">
                  {/* Name */}
                  <span className="sm:text-[2rem] text-title">
                    {screen?.ScreenName ?? "N/A"}
                  </span>
                  {/* Online Status */}
                  <div
                    className={cn(
                      "flex items-center gap-[0.3rem]",
                      screen.isOnline ? "text-success" : "text-error"
                    )}
                  >
                    {/* Icon */}
                    <div className="aspect-square w-[1rem] rounded-full bg-current"></div>
                    {/* Na0me */}
                    <span className="text-[1.3rem] leading-[1]">
                      {screen?.isOnline ? "Online" : "Offline"}
                    </span>
                  </div>
                </div>

                {/* Divider */}
                <Divider
                  orientation="vr"
                  className="max-sm:hidden h-full min-h-[5rem]"
                />

                {/* Serial Number */}
                <div className="flex flex-col self-center">
                  <span className="text-[1.1rem] max-sm:hidden">
                    Serial Number
                  </span>
                  <span className="max-sm:text-[1.5rem] max-sm:leading-[1] sm:text-title uppercase">
                    {screen?.serialNo ?? "N/A"}
                  </span>
                </div>

                {/* Link Button */}
                <div className="max-sm:absolute max-sm:top-0 max-sm:right-0 flex items-center justify-center p-[2rem] sm:p-[2.8rem_1.5rem] h-full sm:w-[10rem] ml-auto bg-[#F2F5FF]">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="aspect-[10/17] w-[1.2rem]"
                    fill="none"
                    viewBox="0 0 10 17"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2.262"
                      d="m2 15.574 6.787-6.787L2 2"
                    ></path>
                  </svg>
                </div>
              </Link>

              {/* Edit */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="aspect-square w-[2.5rem] text-title cursor-pointer transition hover:text-primary"
                fill="none"
                viewBox="0 0 26 26"
                onClick={() =>
                  setFlags((prev) => ({ ...prev, showAddScreenModal: screen }))
                }
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.625"
                  d="M23.053 6.934 12.718 17.27c-1.029 1.03-4.084 1.506-4.766.824-.683-.683-.217-3.738.812-4.767L19.11 2.98a2.794 2.794 0 1 1 3.943 3.954"
                ></path>
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.625"
                  d="M11.917 4.333H6.5a4.333 4.333 0 0 0-4.333 4.334V19.5A4.333 4.333 0 0 0 6.5 23.833h11.917c2.394 0 3.25-1.95 3.25-4.333v-5.417"
                ></path>
              </svg>
            </div>
          ));
        })}
      </div>

      {/* Add/Update Screen Modal */}
      {flags.showAddScreenModal && (
        <AddScreenModal
          onClose={() =>
            setFlags((prev) => ({ ...prev, showAddScreenModal: false }))
          }
          onSuccess={(newScreens) => {
            // Update screens
            setScreens(newScreens);
            // Update FLags
            setFlags((prev) => ({
              ...prev,
              showSuccessModal: newScreens.find((s) => s.isNew),
            }));
          }}
          screen={
            typeof flags.showAddScreenModal == "object"
              ? flags.showAddScreenModal
              : undefined
          }
        />
      )}

      {/* Success Modal */}
      {flags.showSuccessModal && (
        <SuccessModal
          screen={flags.showSuccessModal}
          onClose={() =>
            setFlags((prev) => ({ ...prev, showSuccessModal: undefined }))
          }
        />
      )}

      {/* Delete Screen(s) Popup */}
      {flags.showDeleteScreenModal && (
        <DeletePopup
          heading="Delete selected screen(s)?"
          subHeading="Are you sure you want to delete the selected screen(s)? This action cannot be undone."
          onClose={() =>
            setFlags((prev) => ({ ...prev, showDeleteScreenModal: false }))
          }
          onDelete={async () => {
            await handleScreenDelete(flags.selectedScreens ?? []);
          }}
        />
      )}
    </Page>
  );
};

export default Index;
