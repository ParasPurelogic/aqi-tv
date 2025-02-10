import PageEditPlaylist from "@/components/pages/Playlist";
import { conventions } from "@/config/misc";
import getAllPlaylist from "@/fetchers/screen/getAllPlaylist";
import getUserInfo from "@/utility/server/getUserInfo";
import { Metadata } from "next";
import { notFound } from "next/navigation";

export const metadata: Metadata = {
  title: "Edit Playlist",
};

export default async function Page(props: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  // userinfo
  const userInfo = await getUserInfo();

  // Playlist Id
  const playlistId = Number(
    (await props.searchParams)[conventions.query.editPlaylistId] ?? "0"
  );

  // Fetch playlist
  const playlist = (
    await getAllPlaylist({
      options: {
        token: userInfo?.token ?? "",
      },
    })
  )?.find((p) => p?.id == playlistId);

  // If playlist not found, throw 404
  if (!playlist) {
    return notFound();
  }

  // Return JSX
  return <PageEditPlaylist type="edit" playlist={playlist} />;
}
