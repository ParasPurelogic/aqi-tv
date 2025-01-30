"use client";

import { routes } from "@/config/routes";
import ErrorIcon from "../misc/ErrorIcon";
import { Button } from "../elements";

type Props = {
  error: string;
};

const ShowUnexpectedError = (props: Props) => {
  return (
    <section className="unexpected-error min-h-[70vh] m-body flex flex-col">
      <div className="min-h-fit grow w-full max-w-ultraMax bg-white dark:bg-dark_bg rounded-[2rem] shadow-[2px_5px_36px_0_rgba(0,0,0,0.07)] flex items-center justify-center lg:mx-auto py-body">
        <div className="wrapper w-full h-full md:max-w-[400px] p-body sm:p-[6rem] mx-auto flex flex-col justify-center text-center gap-[1.5rem]">
          {/* Image */}
          <ErrorIcon />

          {/* Title */}
          <h1 className="text-title dark:text-dark_title font-bold text-[2.5rem] mt-[0.7rem]">
            Oops! Something Unexpected Happened.
          </h1>
          {/* Desc */}
          <p>
            <span>Error: </span>
            <span className="text-[#c26768]">
              {props?.error ||
                "Sorry for the inconvenience, something Unexpected Happened."}
            </span>
          </p>
          {/* Actions */}
          <div className="actions flex flex-wrap items-center gap-[1.5rem] max-w-[250px] min-w-fit mt-[1rem] mx-auto">
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
              onClick={() => window?.location?.reload()}
              aria-label="Retry"
              className="flex-1 w-full min-w-[15rem]"
            >
              Retry
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ShowUnexpectedError;
