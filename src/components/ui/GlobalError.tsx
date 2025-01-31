"use client";

import theme, { primaryFont } from "@/theme";
import sendCrashReport from "@/actions/sendCrashReport";
import { Button, InputText } from "@/components/elements";
import IconLoader from "@/components/misc/IconLoader";
import { routes } from "@/config/routes";
import cn from "@/utility/cn";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import "@/app/globals.css";
import ErrorIcon from "../misc/ErrorIcon";

export default function GlobalError({
  error,
  className,
}: {
  error: Error & { digest?: string };
  className?: string;
}) {
  // IS sending report
  const [isSendingReport, setIsSendingReport] = useState(false);
  const [isReportSent, setIsReportSent] = useState(false);
  const [additionalInfo, setAdditionalInfo] = useState("");

  // Handle crash report send
  const handleSendReport = async (initialCall?: boolean) => {
    // set state
    setIsSendingReport(!initialCall);

    // Send email
    const response = await sendCrashReport({
      payload: {
        additionalInfo,
        digest: error.digest ?? "No Digest",
        error: error.message ?? "No Error Message",
        location: window.location.href,
        userAgent: navigator.userAgent,
        screenWidth: window.screen.width,
        screenHeight: window.screen.height,
        isTouchDevice: "ontouchstart" in window,
      },
    });

    // reset state
    setIsSendingReport(false);

    // Show toast
    if (response.status) {
      setIsReportSent(true);
      toast.success(response.message);
    } else {
      toast.error(response.message);
    }
  };

  // Send Report on pressing "Enter Key"
  useEffect(() => {
    // Call handleSendReport
    if (!error?.message?.toLowerCase()?.includes("loading chunk")) {
      handleSendReport(true);
    }

    //
    try {
      const handleKeyDown = (event: KeyboardEvent) => {
        if (event.key === "Enter" && !isSendingReport && !isReportSent) {
          handleSendReport();
        }
      };

      document.addEventListener("keydown", handleKeyDown);
      return () => {
        document.removeEventListener("keydown", handleKeyDown);
      };
    } catch (error) {}

    // eslint-disable-next-line
  }, [additionalInfo]);

  // Return JSX
  return (
    <html lang={"en"} className={theme.misc.rootFontSizes}>
      <body
        className={`${primaryFont.className} ${theme.misc.bodyClasses} [&_header]:!hidden [&_footer]:!hidden`}
      >
        <section
          className={cn(
            "router-error h-[calc(100dvh_-_calc(var(--body-padding)*2))] min-h-fit bg-white dark:bg-dark_bg rounded-[2rem] shadow-[2px_5px_36px_0_rgba(0,0,0,0.07)] flex items-center justify-center m-body px-body",
            isSendingReport && "pointer-events-none select-none",
            className
          )}
        >
          <div className="wrapper md:max-w-[400px] p-body sm:p-[6rem] mx-auto flex flex-col justify-center text-center gap-[1.5rem]">
            {/* Image */}
            <ErrorIcon />
            {/* Title */}
            <h1 className="text-title dark:text-dark_title font-bold text-[2.5rem] mt-[0.7rem]">
              Oops! Something Unexpected Happened.
            </h1>
            {/* Desc */}
            <p>
              We&apos;re here to help—please let us know, and we&apos;ll get it
              fixed right away!
            </p>
            {/* ACtions */}
            <div className="actions flex flex-wrap items-center gap-[1.5rem] max-w-[250px] min-w-fit mt-[1rem] mx-auto">
              {/* Additional Message */}
              <InputText
                className="w-full"
                placeholder="Additional information"
                autoFocus
                onChange={(e) => setAdditionalInfo(e?.target?.value)}
              />

              {/* Back Home */}
              <a
                href={routes.home.url}
                aria-label="Back Home"
                className="flex-1 w-full min-w-[15rem]"
              >
                <Button
                  className="text-primary bg-transparent border-primary border w-full"
                  aria-label="Back Home"
                >
                  Back Home
                </Button>
              </a>

              {/* Retry */}
              <Button
                onClick={() => handleSendReport()}
                disabled={isSendingReport || isReportSent || !additionalInfo}
                aria-label="Retry"
                className="flex-1 w-full min-w-[15rem]"
              >
                {isReportSent ? (
                  "Report Sent"
                ) : isSendingReport ? (
                  <IconLoader />
                ) : (
                  "Send report"
                )}
              </Button>
            </div>
          </div>
        </section>
      </body>
    </html>
  );
}
