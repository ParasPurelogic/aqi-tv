"use client";

import { Button, InputText } from "@/components/elements";
import IconLoader from "@/components/misc/IconLoader";
import Popup from "@/components/ui/Popup";
import { regexChecks } from "@/config/misc";
import { routes } from "@/config/routes";
import { useUserInfo } from "@/contexts/UserInfo";
import createUpdatePlaylist from "@/fetchers/screen/createUpdatePlaylist";
import { FNGetAllPlaylist } from "@/fetchers/type";
import { useCallback, useState } from "react";
import { toast } from "sonner";

type Props = {
  onClose?: () => void;
  playlists: FNGetAllPlaylist;
};

const AddPlaylistPopup = (props: Props) => {
  // userInfo
  const userInfo = useUserInfo();

  // IsSaving
  const [isSaving, setIsSaving] = useState(false);

  // Playlist Name
  const [playlistName, setPlaylistName] = useState("");

  // Handle Save
  const handleSave = useCallback(async (name: string) => {
    try {
      // Regex Check
      if (!regexChecks.simpleStringCheck.test(name)) {
        throw new Error("Invalid Playlist Name");
      }

      // Update Saving FLags
      setIsSaving(true);

      // Check if playlist already exists
      if (
        props.playlists.find(
          (playlist) => playlist?.name?.toLowerCase() == name?.toLowerCase()
        )
      ) {
        throw new Error("Playlist already exists");
      }

      // Add Playlist
      const createdPlaylist = await createUpdatePlaylist({
        options: {
          token: userInfo?.token ?? "",
          userId: userInfo?.id ?? 0,
          playlistName: name,
          slides: [],
        },
        onError: (msg) => {
          throw new Error(msg);
        },
      });

      // Show Success
      toast.success("Playlist created successfully");

      // Redirect to edit playlist page
      if (typeof window !== "undefined") {
        window.location.href = routes.playlistEdit.url.replace(
          "playlist_id",
          String(createdPlaylist?.id)
        );
      }

      //
    } catch (error: any) {
      // Show toast
      toast.error(error?.message);
      // Update Saving FLags
      setIsSaving(false);
    }

    // eslint-disable-next-line
  }, []);

  // Return JSX
  return (
    <Popup fitWrapperHeight wrapperClassName="sm:max-w-[600px]">
      {/* Header */}
      <div className="col-span-full text-title text-center flex items-center gap-[1.5rem] border-b pb-[1.5rem] sm:pb-[2.5rem] mb-[1.5rem] sm:mb-[2.5rem]">
        {/* Heading */}
        <p className="text-[2.5rem] leading-[1]">Create Playlist</p>
        {/* Close BTN */}
        <Popup.CloseButton
          className="float-right w-[4rem] h-[4rem]"
          onClose={props.onClose}
          disabled={isSaving}
        />
      </div>

      {/* Form */}
      <InputText
        placeholder="Playlist Name"
        onChange={(e) => setPlaylistName(e.target.value)}
      />

      {/* Actions */}
      <div className="max-sm:w-full flex flex-wrap gap-[1.5rem] justify-end pt-[5rem] md:pt-[10rem] mt-auto">
        {/* Cancel */}
        <Button
          disabled={isSaving}
          onClick={props.onClose}
          className="max-sm:flex-1 min-w-[20rem] bg-transparent text-primary"
        >
          Cancel
        </Button>
        {/* Add/Remove */}
        <Button
          disabled={isSaving || !playlistName}
          className="max-sm:flex-1 min-w-[20rem]"
          onClick={() => handleSave(playlistName)}
        >
          {isSaving ? <IconLoader /> : "Create"}
        </Button>
      </div>
    </Popup>
  );
};

export default AddPlaylistPopup;
