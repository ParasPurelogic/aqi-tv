import { Metadata } from "next";
import PageAddPlaylist from "@/components/pages/Playlist";

export const metadata: Metadata = {
  title: "Add Playlist",
};

export default function Page() {
  // Return JSX
  return <PageAddPlaylist type="add" />;
}
