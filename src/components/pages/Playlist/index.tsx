"use client";

import Page from "@/components/ui/Page";
import { FNGetAllPlaylist } from "@/fetchers/type";
import { useState } from "react";
import AddSlides from "./AddSlides";
import ManageSlides from "./ManageSlides";
import { useRouter } from "next/navigation";

export type Step = "playlist-name" | "add-slides" | "manage-slides";

type Props =
  | {
      type: "add";
      playlist?: FNGetAllPlaylist[0];
    }
  | {
      type: "edit";
      playlist: FNGetAllPlaylist[0];
    };

const Playlist = (props: Props) => {
  // Router
  const router = useRouter();

  // Flags
  const [flags, setFlags] = useState({
    step: "add-slides" as Step,
    playlist: props?.playlist as FNGetAllPlaylist[0],
  });

  // Return JSX
  return (
    <Page name={`playlist-${props.type}`} className="w-full h-full">
      {/* Wrapper */}
      <div className="wrapper w-full h-full min-h-fit">
        {/* Add Slides Screen */}
        {flags.step == "add-slides" && (
          <AddSlides
            playlist={flags.playlist}
            onBack={() => router?.back()}
            onSave={(p) =>
              setFlags((prev) => ({
                ...prev,
                step: "manage-slides",
                playlist: p,
              }))
            }
          />
        )}

        {/* Manage Slides */}
        {flags.step == "manage-slides" && (
          <ManageSlides
            playlist={flags.playlist}
            onBack={() => setFlags((prev) => ({ ...prev, step: "add-slides" }))}
          />
        )}
      </div>
    </Page>
  );
};

export default Playlist;
