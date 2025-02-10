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

  // Step
  const [step, setStep] = useState<Step>("manage-slides");

  // Playlist
  const [playlist, setPlaylist] = useState(props.playlist ?? {});

  // Return JSX
  return (
    <Page name={`playlist-${props.type}`} className="w-full h-full">
      {/* Wrapper */}
      <div className="wrapper w-full h-full min-h-fit">
        {/* Add Slides Screen */}
        {step == "add-slides" && (
          <AddSlides
            playlist={playlist}
            onBack={() => router?.back()}
            onSave={(p) => {
              // Update Playlist
              setPlaylist(p);
              // Update step
              setStep("manage-slides");
            }}
          />
        )}

        {/* Manage Slides */}
        {step == "manage-slides" && (
          <ManageSlides
            playlist={playlist}
            onBack={() => setStep("add-slides")}
          />
        )}
      </div>
    </Page>
  );
};

export default Playlist;
