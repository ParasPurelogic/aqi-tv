"use client";

import { Button, Divider, SearchBar } from "@/components/elements";
import Page from "@/components/ui/Page";
import { FNGetSingleScreen } from "@/fetchers/type";
import { useRouter } from "next/navigation";

type Props = {
  screen: FNGetSingleScreen;
};

const Index = (props: Props) => {
  // Router
  const router = useRouter();

  // Screen
  const screen = props.screen;

  // Return JSX
  return (
    <Page name="screen-info -m-body border-l flex flex-col w-[calc(100%_+_var(--body-padding)_+_var(--body-padding))] h-[calc(100%_+_var(--body-padding)_+_var(--body-padding))]">
      {/* Header */}
      <div className="bg-[#F2F5FF] p-[2rem_var(--body-padding)] w-full flex sm:items-center gap-[2.5rem]">
        {/* Back BTN */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="transition aspect-square w-[3.5rem] h-fit hover:opacity-70 cursor-pointer"
          fill="none"
          viewBox="0 0 39 39"
          onClick={() => router.back()}
        >
          <rect
            width="38.943"
            height="38.943"
            fill="#31343D"
            rx="19.472"
            transform="matrix(-1 0 0 1 38.943 0)"
          ></rect>
          <path
            fill="#fff"
            d="M27 18.428a.88.88 0 1 1 0 1.76zM11.375 19.93a.88.88 0 0 1 0-1.244l5.6-5.602a.88.88 0 1 1 1.245 1.245l-4.978 4.979 4.978 4.979a.88.88 0 1 1-1.244 1.244zM27 20.188H11.997v-1.76H27z"
          ></path>
        </svg>

        {/* Name */}
        <p className="text-title text-[2rem] sm:text-[2.2rem] -ml-[0.5rem] flex flex-col gap-[0.2rem]">
          {/* Name */}
          <span>{screen.ScreenName}</span>
          {/* Serial No. */}
          <span className="sm:hidden text-para text-[1.4rem]">
            {screen?.serialNo ?? "N/A"}
          </span>
        </p>

        {/* Divider */}
        <Divider orientation="vr" className="max-sm:hidden h-[5rem]" />

        {/* Serial Number */}
        <div className="max-sm:hidden flex flex-col self-center leading-[1] gap-[0.5rem]">
          <span className="text-[1.4rem]">Serial Number</span>
          <span className="text-title uppercase">
            {screen?.serialNo ?? "N/A"}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-col h-[20rem] grow p-body pt-0">
        {/* Header */}
        <div className="grid grid-cols-[1fr_auto_auto] items-center gap-[1.5rem] py-[2rem] border-b border-black/[14%]">
          {/* Entries */}
          <div className=""></div>

          {/* Search */}
          <SearchBar className="md:w-[20rem] lg:w-[25rem] 2xl:w-[30rem] max-w-[300px] h-full" />

          {/* Create Playlist */}
          <Button className="md:w-[20rem] lg:w-[25rem] 2xl:w-[30rem] h-full">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="aspect-square min-w-[2rem] max-w-[2rem] sm:hidden"
              viewBox="0 0 24 24"
            >
              <path stroke="none" d="M0 0h24v24H0z"></path>
              <path d="M12 5v14M5 12h14"></path>
            </svg>
            <span className="max-sm:hidden">Create New Playlist</span>
          </Button>
        </div>

        {/* Content */}
        <div className="content border h-[5rem] grow overflow-y-auto m-[2rem_0_5rem]"></div>

        {/* Actions */}
        <div className="actions flex flex-wrap items-center sm:justify-end gap-[1.5rem] max-sm:mb-[2rem]">
          {/* Back */}
          <Button
            className="max-sm:flex-1 sm:w-[20rem] bg-transparent text-primary"
            onClick={() => router.back()}
          >
            Back
          </Button>

          {/* Save */}
          <Button className="max-sm:flex-1 sm:w-[20rem]">Save</Button>
        </div>
      </div>
    </Page>
  );
};

export default Index;
