import { Button } from "@/components/elements";
import getUserInfo from "@/utility/server/getUserInfo";
import { Metadata } from "next";
import PageScreen from "@/components/pages/Screen";
import { notFound } from "next/navigation";
import getSingleScreen from "@/fetchers/screen/getSingleScreen";

export const metadata: Metadata = {
  title: "Screen Details",
};

export default async function Page(props: {
  params: Promise<{ "@screenId": string }>;
}) {
  // User Info
  const userInfo = await getUserInfo();

  // Screen ID
  const screenId = (await props.params)["@screenId"]?.split("-")?.at(-1);

  // Fetch Info
  const screen = await getSingleScreen({
    options: {
      token: userInfo?.token ?? "",
      screenId: Number(screenId ?? 0),
    },
  });

  // If screen not received, throw 404
  if (!screen) {
    return notFound();
  }

  // Return JSX
  return <PageScreen screen={screen} />;
}
