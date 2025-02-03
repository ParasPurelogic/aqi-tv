"use client";

import { Button, Divider, Link, SearchBar } from "@/components/elements";
import DropDownSelector from "@/components/ui/DropDownSelector";
import Page from "@/components/ui/Page";
import { routes } from "@/config/routes";
import { FNGetAllScreens } from "@/fetchers/type";
import cn from "@/utility/cn";
import { useState } from "react";
import NoScreens from "../pageCommons/NoScreens";

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

const Index = (props: Props) => {
  // Screens
  const [screens, setScreens] = useState(props.screens);

  // Flags
  const [flags, setFlags] = useState({
    searchedTerm: "",
    selectedFilter: filters[0],
    showAddScreenModal: false as boolean | FNGetAllScreens[0],
    selectedScreens: null as FNGetAllScreens | null,
  });

  // Return JSX
  return (
    <Page name="home-manage-screens lg:px-body flex flex-col gap-[3rem] md:gap-[4rem] min-h-full pb-[5rem]">
      {/* Filters */}
      <div className="flex w-full items-center">
        {/* Search */}
        <SearchBar
          className="border-[0_0_1px_0] !border-b !rounded-[0] focus-within:shadow-none pb-[1em]"
          onSearch={(term) => setFlags({ ...flags, searchedTerm: term })}
          onClear={() => setFlags({ ...flags, searchedTerm: "" })}
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
          className="border border-current bg-transparent text-primary gap-[0.3em] lg:w-[25rem]"
          onClick={() => setFlags({ ...flags, selectedScreens: [] })}
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
          <span className="max-sm:hidden">Manage Screens</span>
        </Button>
      </div>

      {/* Header */}
      <div className="flex items-center gap-[2rem] justify-between">
        {/* Heading */}
        <span>All Screens</span>

        {/* Filter */}
        <DropDownSelector
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
      <div className="flex flex-col gap-[1rem] sm:gap-[1.5rem] w-full grow items-center">
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
              className="grid grid-cols-[1fr_auto] w-full items-center gap-[1.5rem] md:gap-[2.5rem]"
              key={screen.id}
            >
              {/* Link */}
              <Link
                href={routes.singleScreen.url.replace(
                  "screenId",
                  String(screen?.serialNo + "-" + screen?.id)
                )}
                className={cn(
                  "border rounded-[1.5rem] overflow-hidden border-black/[16%] flex flex-wrap max-sm:justify-between sm:grid grid-cols-[30rem_5rem_20rem_auto] gap-[1.2rem_1.5rem] sm:gap-[1.5rem_3rem] max-sm:p-[1.5rem_2rem] sm:pl-[3rem] md:pl-[5rem] w-full transition hover:border-primary hover:bg-primary/10 leading-[1]",
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
                <div className="flex flex-col gap-[0.8rem] self-center">
                  {/* Name */}
                  <span className="sm:text-[2rem] text-title">
                    {screen?.ScreenName ?? "N/A"}
                  </span>
                  {/* Online Status */}
                  <div
                    className={cn(
                      "flex items-center gap-[0.2rem]",
                      screen.isOnline ? "text-success" : "text-error"
                    )}
                  >
                    {/* Icon */}
                    <div className="aspect-square w-[1rem] rounded-full bg-current"></div>
                    {/* Na0me */}
                    <span className="text-[1.3rem]">
                      {screen?.isOnline ? "Online" : "Offline"}
                    </span>
                  </div>
                </div>

                {/* Divider */}
                <Divider orientation="vr" className="h-full min-h-[5rem]" />

                {/* Serial Number */}
                <div className="flex flex-col gap-[0.5rem] self-center">
                  <span className="text-[1.1rem]">Serial Number</span>
                  <span className="text-title uppercase">
                    {screen?.serialNo ?? "N/A"}
                  </span>
                </div>

                {/* Link Button */}
                <div className="max-sm:hidden flex items-center justify-center p-[2.8rem_1.5rem] h-full w-[10rem] ml-auto bg-[#F2F5FF]">
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
    </Page>
  );
};

export default Index;
