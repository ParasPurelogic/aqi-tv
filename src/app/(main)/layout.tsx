import { UserInfoProvider } from "@/contexts/UserInfo";
import getUserInfo from "@/utility/server/getUserInfo";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Return JSX
  return (
    <UserInfoProvider userInfo={await getUserInfo()}>
      {children}
    </UserInfoProvider>
  );
}
