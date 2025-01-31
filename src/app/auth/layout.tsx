import Logo from "@/components/misc/Logo";
import { domainName } from "@/config/misc";
import Image from "next/image";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Return JSX
  return (
    <div className="flex flex-col items-center justify-center h-contentHeight min-h-fit py-body">
      <div className="grid gap-body md:grid-cols-[0.45fr_0.55fr] bg-white p-[1rem] rounded-[2rem] w-full max-md:min-h-full max-w-[1500px] overflow-hidden">
        {/* Sidebar */}
        <div className="max-md:hidden w-full h-full min-h-[15rem] relative overflow-hidden rounded-tl-[1.5rem] rounded-bl-[1.5rem]">
          <Image
            src={`${domainName}/media/pages/auth/sidebar.webp`}
            alt="Sidebar"
            quality={100}
            fill
            className="w-full h-full object-cover"
          />
        </div>

        {/* Content */}
        <div className="min-h-[75vh] p-body md:p-[2rem] !pb-[10rem] md:pl-body flex flex-col gap-[3rem]">
          {/* Logo */}
          <Logo className="w-[7rem] ml-auto" />

          {/* Content */}
          {children}
        </div>
      </div>
    </div>
  );
}
