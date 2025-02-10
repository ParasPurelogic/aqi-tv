"use client";

import { Button, Divider, Link, SearchBar } from "@/components/elements";
import IconLoader from "@/components/misc/IconLoader";
import Page from "@/components/ui/Page";
import ShowInfo from "@/components/ui/ShowInfo";
import { routes } from "@/config/routes";
import { useUserInfo } from "@/contexts/UserInfo";
import assignUnassignPlaylistToScreen from "@/fetchers/screen/assignUnassignPlaylistToScreen";
import { FNGetAllPlaylist, FNGetSingleScreen } from "@/fetchers/type";
import cn from "@/utility/cn";
import { useCallback, useState } from "react";
import { toast } from "sonner";
import dynamic from "next/dynamic";
import ShowLoader from "@/components/ui/ShowLoader";
import BackButton from "./BackButton";
import { useRouter } from "next/navigation";

type Props = {
  screen: FNGetSingleScreen;
};

// AddPlaylistPopup
const AddPlaylistPopup = dynamic(() => import("./AddPlaylistPopup"), {
  loading: () => <ShowLoader fullScreen />,
});

// PlaylistAllAssignedScreens
const PlaylistAllAssignedScreens = dynamic(
  () => import("./PlaylistAllAssignedScreens"),
  {
    loading: () => <ShowLoader fullScreen />,
  }
);

const listCSS =
  "max-w-full w-full grid grid-cols-2 md:grid-cols-[4rem_20rem_32rem_auto] items-center justify-around gap-[3rem_2rem] md:gap-[2rem] border-b first:border-t p-[1.5rem] sm:p-[2rem]";

const Index = (props: Props) => {
  // userinfo
  const userInfo = useUserInfo();

  // Router
  const router = useRouter();

  // Flags
  const [flags, setFlags] = useState({
    playlists: props?.screen?.playlists ?? [],
    assignedPlaylistId: props?.screen?.playlists?.find((p) =>
      p?.assign_tvscreens?.some((s) => s?.screen_id == props?.screen.id)
    )?.id,
    showAllScreensListOfPlaylist: undefined as FNGetAllPlaylist[0] | undefined,
    showAddPlaylistModal: false,
    isSaving: false,
  });

  // Handle Save
  const handleSave = useCallback(async (argFlags: typeof flags) => {
    try {
      // Update Flags
      setFlags((prev) => ({ ...prev, isSaving: true }));

      // Previously Assigned Playlist
      const previouslyAssignedPlaylist = props?.screen?.playlists?.find((p) =>
        p?.assign_tvscreens?.some((s) => s?.screen_id == props?.screen.id)
      )?.id;

      // Save Settings
      await assignUnassignPlaylistToScreen({
        options: {
          screenId: props?.screen?.id ?? 0,
          token: userInfo?.token ?? "",
          userId: userInfo?.id ?? 0,
          playlistId:
            previouslyAssignedPlaylist && !argFlags.assignedPlaylistId
              ? previouslyAssignedPlaylist
              : argFlags.assignedPlaylistId ?? 0,
          actions:
            previouslyAssignedPlaylist && !argFlags.assignedPlaylistId
              ? "unassign"
              : "assign",
        },
        onError: (msg) => {
          throw new Error(msg);
        },
      });

      // Show toast
      toast.success("Saved Successfully");

      // Reload Page
      if (typeof window !== "undefined") {
        window.location.reload();
      }

      //
    } catch (error: any) {
      // Show Error
      toast.error(error?.message);
      // Update Flags
      setFlags((prev) => ({ ...prev, isSaving: false }));
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Return JSX
  return (
    <Page name="screen-info -m-body border-l flex flex-col w-[calc(100%_+_var(--body-padding)_+_var(--body-padding))] h-[calc(100%_+_var(--body-padding)_+_var(--body-padding))]">
      {/* Header */}
      <div className="bg-[#F2F5FF] p-[2rem_var(--body-padding)] w-full flex sm:items-center gap-[2.5rem]">
        {/* Back BTN */}
        <BackButton />

        {/* Name */}
        <p className="text-title text-[2rem] sm:text-[2.2rem] -ml-[0.5rem] flex flex-col gap-[0.2rem]">
          {/* Name */}
          <span>{props?.screen?.ScreenName}</span>
          {/* Serial No. */}
          <span className="sm:hidden text-para text-[1.4rem]">
            {props?.screen?.serialNo ?? "N/A"}
          </span>
        </p>

        {/* Divider */}
        <Divider orientation="vr" className="max-sm:hidden h-[5rem]" />

        {/* Serial Number */}
        <div className="max-sm:hidden flex flex-col self-center leading-[1] gap-[0.5rem]">
          <span className="text-[1.4rem]">Serial Number</span>
          <span className="text-title uppercase">
            {props?.screen?.serialNo ?? "N/A"}
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
          <SearchBar
            className="md:w-[20rem] lg:w-[25rem] 2xl:w-[30rem] max-w-[300px] h-full"
            onSearch={(t) =>
              setFlags((prev) => ({
                ...prev,
                playlists:
                  props?.screen?.playlists?.filter((p) =>
                    p?.name?.toLowerCase()?.includes(t.toLowerCase())
                  ) ?? [],
              }))
            }
            onClear={() =>
              setFlags((prev) => ({
                ...prev,
                playlists: props?.screen?.playlists ?? [],
              }))
            }
          />

          {/* Create Playlist */}
          <Button
            className="md:w-[20rem] lg:w-[25rem] 2xl:w-[30rem] h-full"
            onClick={() =>
              setFlags((prev) => ({ ...prev, showAddPlaylistModal: true }))
            }
          >
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
        <div className="content min-w-full h-[5rem] grow overflow-y-auto m-[2rem_-2rem_5rem_0] pr-[1.5rem] md:text-[1.8rem] text-title [&_.label]:text-para [&_.label]:text-[1.1rem] sm:[&_.label]:text-[1.3rem] [&_.label]:mb-[0.2rem] md:[&_.label]:hidden">
          {/* info */}
          {!flags.assignedPlaylistId && (
            <ShowInfo
              className="w-full mb-[2rem]"
              message="No playlist assigned yet! Assign a playlist to this screen"
            />
          )}

          {/* Header */}
          <div
            className={cn(
              "text-[1.5rem] text-para max-md:hidden leading-[1] !pt-[0.2rem] !border-t-0",
              listCSS
            )}
          >
            <span>S. No.</span>
            <span>Playlist Name</span>
            <span>Assigned on screens</span>
            <span className="w-[28rem] xl:w-[31rem]">Actions</span>
          </div>

          {/* List */}
          {flags?.playlists?.map((playlist, i) => {
            // Is assigned
            const isAssigned = flags?.assignedPlaylistId == playlist.id;

            // Return JSX
            return (
              <div
                key={playlist.id}
                className={cn(
                  listCSS,
                  "odd:bg-[#E3E8F4]/20",
                  isAssigned && "!bg-success/10"
                )}
              >
                {/* Serial No. */}
                <span className="max-md:hidden w-fit min-w-0">{i + 1}</span>

                {/* Name */}
                <p className="flex flex-col min-w-0">
                  {/* Label */}
                  <span className="label">Playlist Name</span>
                  {/* Name */}
                  <span>{playlist.name}</span>
                  {/* If Assigned */}
                  {isAssigned && (
                    <span className="text-success text-[1.5rem] truncate mt-[0.2rem]">
                      Currently Assigned
                    </span>
                  )}
                </p>

                {/* Screens Assigned */}
                <div className="flex items-center min-w-0 md:gap-[3rem] xl:gap-[4rem]">
                  {/* List */}
                  <div className="grid h-fit w-[5rem] grow">
                    {/* Label */}
                    <span className="label">Assigned on screens</span>

                    {/* First */}
                    <span className="col-span-full mb-[0.5rem] min-w-0 truncate">
                      {playlist?.assign_tvscreens?.[0]?.screen_name ?? "N/A"}
                    </span>

                    {/* Second */}
                    <div className="flex items-center gap-[0.5rem] max-w-full leading-[1] min-w-0">
                      {playlist?.assign_tvscreens?.[1]?.screen_name && (
                        <span className="max-md:grow w-[30%] md:w-[70%] truncate">
                          {playlist?.assign_tvscreens?.[1]?.screen_name}
                        </span>
                      )}
                      {/* See More */}
                      {(playlist?.assign_tvscreens?.length ?? 0) > 1 && (
                        <span
                          className="text-primary cursor-pointer transition hover:opacity-70 md:hidden text-[1.4rem]"
                          onClick={() =>
                            setFlags((prev) => ({
                              ...prev,
                              showAllScreensListOfPlaylist: playlist,
                            }))
                          }
                        >
                          See More
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Divider and See More Button */}
                  {(playlist.assign_tvscreens?.length ?? 0) > 0 && (
                    <>
                      {/* Divider */}
                      <Divider
                        orientation="vr"
                        className="h-[5rem] max-md:hidden ml-auto"
                      />

                      {/* See More Text */}
                      <span
                        className="max-md:hidden whitespace-nowrap text-primary cursor-pointer transition hover:opacity-70"
                        onClick={() =>
                          setFlags((prev) => ({
                            ...prev,
                            showAllScreensListOfPlaylist: playlist,
                          }))
                        }
                      >
                        See More
                      </span>
                    </>
                  )}
                </div>

                {/* Actions */}
                <div className="max-md:col-span-full ml-auto min-w-0 w-fit flex items-center max-md:justify-end gap-[2rem] md:gap-[3rem] xl:gap-[4rem] 2xl:gap-[6rem]">
                  {/* Edit */}
                  <Link
                    href={routes.playlistEdit.url.replace(
                      "playlist_id",
                      String(playlist?.id)
                    )}
                    className="flex items-center gap-[0.5rem] md:gap-[0.7rem] text-[1.7rem] text-primary leading-[1] truncate"
                  >
                    {/* Icon */}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="min-w-[2rem] max-w-[2rem] aspect-square"
                      fill="none"
                      viewBox="0 0 14 14"
                    >
                      <g
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="0.875"
                        clipPath="url(#clip0_543_10043)"
                      >
                        <path d="M12.413 3.734 6.848 9.299c-.554.554-2.199.81-2.566.443-.368-.367-.117-2.012.437-2.567l5.57-5.57a1.505 1.505 0 1 1 2.124 2.129"></path>
                        <path d="M6.417 2.333H3.5a2.333 2.333 0 0 0-2.333 2.334V10.5A2.333 2.333 0 0 0 3.5 12.833h6.416c1.29 0 1.75-1.05 1.75-2.333V7.583"></path>
                      </g>
                      <defs>
                        <clipPath id="clip0_543_10043">
                          <path fill="#fff" d="M0 0h14v14H0z"></path>
                        </clipPath>
                      </defs>
                    </svg>

                    {/* Text */}
                    <span>Edit Playlist</span>
                  </Link>

                  {/* Assign/Unassign */}
                  <Button
                    onClick={() =>
                      setFlags((prev) => ({
                        ...prev,
                        assignedPlaylistId:
                          prev?.assignedPlaylistId == playlist?.id
                            ? undefined
                            : playlist.id,
                      }))
                    }
                    className={cn(
                      "rounded-[3em] gap-[0.3em] md:gap-[0.5em] md:w-[13rem] p-[0.4em_1em] md:p-[0.6em] h-fit",
                      !isAssigned && "bg-white text-primary"
                    )}
                  >
                    {/* Icon */}
                    <i>
                      {isAssigned ? (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="aspect-square w-[2.5rem]"
                          fill="none"
                          viewBox="0 0 20 20"
                        >
                          <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="1.2"
                            d="M11.407 5.703h1.63a4.074 4.074 0 0 1 0 8.148h-1.63m-3.26-8.148H6.519a4.074 4.074 0 0 0 0 8.148h1.63m-1.63-4.074h6.519M3 2.5l14.11 13"
                          ></path>
                        </svg>
                      ) : (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="aspect-square w-[2.5rem]"
                          fill="none"
                          viewBox="0 0 20 20"
                        >
                          <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="1.2"
                            d="M11.407 5.703h1.63a4.074 4.074 0 0 1 0 8.148h-1.63m-3.26-8.148H6.519a4.074 4.074 0 0 0 0 8.148h1.63m-1.63-4.074h6.519"
                          ></path>
                        </svg>
                      )}
                    </i>

                    {/* Text */}
                    {isAssigned ? "Unassign" : "Assign"}
                  </Button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Actions */}
        <div className="actions flex flex-wrap items-center sm:justify-end gap-[1.5rem] max-sm:mb-[2rem]">
          {/* Back */}
          <Button
            className="max-sm:flex-1 sm:w-[20rem] bg-transparent text-primary"
            onClick={() => router.back()}
            disabled={flags.isSaving}
          >
            Back
          </Button>

          {/* Save */}
          <Button
            disabled={
              props?.screen?.playlists?.find((p) =>
                p?.assign_tvscreens?.some(
                  (s) => s?.screen_id == props?.screen.id
                )
              )?.id == flags?.assignedPlaylistId || flags.isSaving
            }
            className="max-sm:flex-1 sm:w-[20rem]"
            onClick={() => handleSave(flags)}
          >
            {flags.isSaving ? <IconLoader /> : "Save"}
          </Button>
        </div>
      </div>

      {/* Add Playlist Modal */}
      {flags.showAddPlaylistModal && (
        <AddPlaylistPopup
          onClose={() =>
            setFlags((prev) => ({ ...prev, showAddPlaylistModal: false }))
          }
          playlists={props?.screen?.playlists ?? []}
          onSuccess={(playlist) =>
            setFlags((prev) => ({
              ...prev,
              showAddPlaylistModal: false,
              playlists: playlist
                ? [...prev.playlists, playlist]
                : prev.playlists,
            }))
          }
        />
      )}

      {/* Playlist's All Screen Modal */}
      {flags.showAllScreensListOfPlaylist && (
        <PlaylistAllAssignedScreens
          playList={flags.showAllScreensListOfPlaylist}
          onClose={() =>
            setFlags((prev) => ({
              ...prev,
              showAllScreensListOfPlaylist: undefined,
            }))
          }
        />
      )}
    </Page>
  );
};

export default Index;
