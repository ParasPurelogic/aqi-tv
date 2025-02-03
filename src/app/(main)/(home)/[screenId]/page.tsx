import { Button } from "@/components/elements";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Screen Details",
};

export default async function Page(props: {
  params: Promise<{ screenId: string }>;
}) {
  // Screen ID
  const screenId = (await props.params).screenId;
  // Return JSX
  return <Button>Screen Details screenId:{screenId}</Button>;
}
