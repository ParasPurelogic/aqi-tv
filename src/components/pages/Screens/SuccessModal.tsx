"use client";

import { Button, Link } from "@/components/elements";
import Popup from "@/components/ui/Popup";
import { routes } from "@/config/routes";
import { FNGetAllScreens } from "@/fetchers/type";

type Props = {
  screen: FNGetAllScreens[0];
  onClose: () => void;
};

const SuccessModal = (props: Props) => {
  return (
    <Popup fitWrapperHeight className="p-0" wrapperClassName="max-w-[600px]">
      <div className="w-full h-full flex flex-col text-center justify-center items-center gap-[2rem] py-[3rem] sm:px-[3rem]">
        {/* Icon */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="aspect-square w-[11rem]"
          fill="none"
          viewBox="0 0 112 112"
        >
          <rect
            width="86"
            height="86"
            fill="#3CE5C2"
            rx="43"
            transform="matrix(-1 0 0 1 99 13)"
          ></rect>
          <rect
            width="112"
            height="112"
            fill="#4FC667"
            opacity="0.21"
            rx="56"
            transform="matrix(-1 0 0 1 112 0)"
          ></rect>
          <rect
            width="86"
            height="86"
            fill="#4FC667"
            rx="43"
            transform="matrix(-1 0 0 1 99 13)"
          ></rect>
          <path
            stroke="#fff"
            strokeLinecap="round"
            strokeWidth="4.503"
            d="m36.644 54.47 9.007 11.26 29.271-20.266"
          ></path>
        </svg>

        {/* Heading */}
        <p className="text-[#4FC667] text-[2.3rem]">
          Screen Added Successfully!
        </p>

        {/* Subheading */}
        <p className="max-w-[500px]">
          Screen with serial number{" "}
          <span className="font-bold text-title">
            {props?.screen?.serialNo}
          </span>{" "}
          has been added to your account successfully, you can now add/create
          playlist for this screen.
        </p>

        {/* Actions */}
        <div className="flex flex-wrap md:grid grid-cols-2 gap-[1.5rem] mt-[3rem] w-full">
          {/* Done */}
          <Button
            onClick={props?.onClose}
            className="bg-transparent text-primary flex-1"
          >
            Done
          </Button>
          {/* Add Playlist */}
          <Link
            href={routes.singleScreen.url.replace(
              "screenId",
              String(props.screen?.serialNo + "-" + props?.screen?.id)
            )}
            className="flex-1"
          >
            <Button className="w-full">Assign/Create Playlist</Button>
          </Link>
        </div>
      </div>
    </Popup>
  );
};

export default SuccessModal;
