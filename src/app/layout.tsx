import "@/app/globals.css";
import theme from "@/theme";
import { Toaster } from "sonner";
import NextTopLoader from "nextjs-toploader";
import { Metadata, Viewport } from "next";
import { domainName } from "@/config/misc";
import GlobalHeader from "@/components/ui/GlobalHeader";
import Script from "next/script";

export const dynamic = "force-dynamic";

// Meta Data
export const generateMetadata = async (): Promise<Metadata> => {
  // Return Metadata
  return {
    title: {
      default: "AQI TV",
      template: `%s | AQI TV`,
    },
    icons: `${domainName}/favicon.ico`,
    applicationName: "AQI TV",
    metadataBase: new URL(domainName),
  };
};

// Viewport
export const viewport: Viewport = {
  themeColor: "#4BA9FF",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Return JSX
  return (
    <html lang="en" className={theme.misc.rootFontSizes}>
      <body className={theme.misc.bodyClasses}>
        {/* Header */}
        <GlobalHeader />

        {/* Page Content  */}
        <main className="h-contentHeight max-h-contentHeight w-full overflow-x-hidden overflow-y-auto">
          <div className="main-wrapper min-h-fit w-full px-body">
            {children}
          </div>
        </main>

        {/* Popup */}
        <div className="glb-popup" id="glb-popup"></div>

        {/* Toast  */}
        <Toaster richColors position="top-right" />

        {/* Top Page Loader */}
        <NextTopLoader
          zIndex={9999999999}
          height={5}
          showSpinner={false}
          template='<div id="top-progress-bar" class="bar" role="bar"></div>'
        />

        {/* Main Script */}
        <Script
          id="main-script"
          strategy="lazyOnload"
          async={true}
          defer={true}
          src={`${domainName}/scripts/main.js`}
        />
        <Script />
      </body>
    </html>
  );
}
