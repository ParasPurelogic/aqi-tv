import PageScreens from "@/components/pages/Screens";
import { routes } from "@/config/routes";
import getAllScreens from "@/fetchers/screen/getAllScreens";
import getUserInfo from "@/utility/server/getUserInfo";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: routes.screens.name,
};

export default async function Page() {
  // userInfo
  const userInfo = await getUserInfo();

  // Screens
  const screens = await getAllScreens({
    options: {
      token: userInfo?.token ?? "",
    },
  });

  // Return JSX
  return <PageScreens screens={screens ?? []} />;
}
