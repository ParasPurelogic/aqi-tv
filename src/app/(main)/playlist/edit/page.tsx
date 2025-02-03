import { Button } from "@/components/elements";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Edit Playlist",
};

export default function Page(props: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  // Return JSX
  return <Button>Edit Playlist</Button>;
}
