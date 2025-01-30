"use client";

import { Button } from "@/components/elements";
import { routes } from "@/config/routes";
import theme from "@/theme";
import "@/app/globals.css";

export const dynamic = "force-dynamic";

export default function NotFound() {
  // Return JSX
  return (
    <html lang={"en"} className={theme.misc.rootFontSizes}>
      <body className={theme.misc.bodyClasses}>
        <section className="404-error w-[calc(100vw_-_4rem)] min-h-fit h-[calc(100vh_-_4rem)] bg-white rounded-[2rem] shadow-[2px_5px_36px_0_rgba(0,0,0,0.07)] flex items-center justify-center m-[2rem]">
          <div className="wrapper md:max-w-[400px] mx-auto flex flex-col justify-center text-center gap-[1.5rem] p-[2rem] sm:p-[6rem]">
            {/* Image */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="145"
              height="90"
              className="aspect-[145/90] mx-auto w-[80%] max-w-[30rem] text-primary"
              fill="none"
              viewBox="0 0 145 90"
            >
              <g fill="currentColor" clipPath="url(#clip0_12826_14326)">
                <path d="M142.516 49.834a28.333 28.333 0 00-6.105-9.05 28.432 28.432 0 00-9.05-6.105 28.241 28.241 0 00-8.865-2.157 21.647 21.647 0 00-1.594-6.218 21.706 21.706 0 00-4.663-6.916 21.714 21.714 0 00-6.916-4.663 21.555 21.555 0 00-8.47-1.712c-3.469 0-6.848.817-9.9 2.382A34.907 34.907 0 0075.706 4.791 34.803 34.803 0 0058.073-.002 34.68 34.68 0 0033.479 10.18a34.742 34.742 0 00-7.45 11.055 34.459 34.459 0 00-2.693 11.822A28.488 28.488 0 007.843 42.14a28.549 28.549 0 00-5.187 8.571 28.478 28.478 0 00-1.88 10.205c0 3.846.754 7.575 2.24 11.089a28.338 28.338 0 006.106 9.05 28.492 28.492 0 009.05 6.105 28.295 28.295 0 0011.089 2.241h87.022c3.846 0 7.575-.754 11.089-2.241a28.339 28.339 0 009.05-6.105 28.431 28.431 0 006.105-9.05 28.291 28.291 0 002.241-11.09 28.51 28.51 0 00-2.252-11.082zm-26.239 34.894H29.255C16.128 84.728 5.45 74.05 5.45 60.917c-.006-11.821 8.814-21.958 20.5-23.58a2.344 2.344 0 002.016-2.332v-.062-.169c0-16.602 13.505-30.107 30.107-30.107 10.717 0 20.708 5.772 26.08 15.06a2.33 2.33 0 001.487 1.103 2.349 2.349 0 001.825-.327 16.994 16.994 0 019.394-2.816c9.416 0 17.081 7.665 17.081 17.082a2.339 2.339 0 002.337 2.337c13.128 0 23.806 10.678 23.806 23.81 0 13.134-10.678 23.812-23.806 23.812z"></path>
                <path d="M85.668 62.145a18.583 18.583 0 00-13.19-5.463 18.596 18.596 0 00-13.189 5.462 18.583 18.583 0 00-5.463 13.19 2.339 2.339 0 002.337 2.337 2.339 2.339 0 002.338-2.337c0-7.71 6.273-13.978 13.978-13.978 7.704 0 13.978 6.274 13.978 13.978a2.339 2.339 0 002.337 2.337 2.339 2.339 0 002.337-2.337 18.596 18.596 0 00-5.463-13.19zM62.487 48.494a2.323 2.323 0 001.65.681c.597 0 1.194-.225 1.65-.68a2.339 2.339 0 000-3.307l-4.556-4.556 4.556-4.556a2.339 2.339 0 00-3.306-3.306l-4.556 4.556-4.55-4.55a2.339 2.339 0 00-3.306 3.306l4.556 4.556-4.556 4.556a2.339 2.339 0 000 3.306 2.323 2.323 0 001.65.681c.597 0 1.194-.225 1.65-.681l4.556-4.556 4.562 4.55zM95.458 32.775a2.339 2.339 0 00-3.306 0l-4.556 4.556-4.556-4.556a2.338 2.338 0 00-3.306 3.306l4.556 4.556-4.556 4.556a2.339 2.339 0 000 3.306 2.323 2.323 0 001.65.681c.597 0 1.194-.225 1.65-.681l4.556-4.556 4.556 4.556a2.323 2.323 0 001.65.681c.597 0 1.194-.225 1.65-.681a2.339 2.339 0 000-3.306l-4.555-4.556 4.556-4.556a2.328 2.328 0 00.011-3.306z"></path>
              </g>
              <defs>
                <clipPath id="clip0_12826_14326">
                  <path
                    fill="transparent"
                    d="M0 0H143.982V89.399H0z"
                    transform="translate(.776)"
                  ></path>
                </clipPath>
              </defs>
            </svg>
            {/* Title */}
            <h1 className="text-title dark:text-dark_title font-bold text-[2.5rem] mt-[0.7rem] text-secondary">
              Sorry! Page not found.
            </h1>
            {/* Desc */}
            <p>
              Page not found. The content you&apos;re looking for doesn&apos;t
              exist
            </p>
            {/* Actions */}
            <div className="actions flex flex-wrap items-center gap-[1.5rem] w-full max-w-[250px] min-w-fit mt-[1rem] mx-auto">
              {/* Back Home */}
              <a
                href={routes.home.url}
                aria-label="Back Home"
                className="flex-1 w-full min-w-[15rem]"
              >
                <Button className="w-full" aria-label="Back Home">
                  Back Home
                </Button>
              </a>
            </div>
          </div>
        </section>
      </body>
    </html>
  );
}
