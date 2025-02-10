"use client";

import { Link } from "@/components/elements";
import Popup from "@/components/ui/Popup";
import { routes } from "@/config/routes";
import { FNGetAllPlaylist } from "@/fetchers/type";

type Props = {
  playList: FNGetAllPlaylist[0];
  onClose: () => void;
};

const PlaylistAllScreens = (props: Props) => {
  // Return JSX
  return (
    <Popup fitWrapperHeight wrapperClassName="sm:max-w-[600px]">
      {/* Header */}
      <div className="col-span-full text-title text-center flex items-center gap-[1.5rem] border-b pb-[1.5rem] sm:pb-[2.5rem] mb-[1.5rem] sm:mb-[2.5rem]">
        {/* Heading */}
        <p className="text-[2.5rem] leading-[1]">{props.playList.name}</p>
        {/* Close BTN */}
        <Popup.CloseButton
          className="float-right w-[4rem] h-[4rem]"
          onClose={props.onClose}
        />
      </div>

      {/* Title */}
      <p className="mb-[1.5rem]">Assigned to: </p>

      {/* Screen's*/}
      <div className="grid sm:grid-cols-2 gap-[1.5rem]">
        {props.playList?.assign_tvscreens?.map((screen) => (
          <Link
            key={screen.screen_serialNo}
            href={routes.singleScreen.url.replace(
              "screenId",
              String(screen?.screen_serialNo + "-" + screen?.screen_id)
            )}
            className="text-title flex-1 w-full h-fit relative border text-[1.6rem] leading-[1] p-[0.9em_1.1em] flex items-center gap-[1em] bg-white border-[#E1E7F6] transition hover:border-primary hover:bg-primary/10 rounded-[0.7em] shadow-[2px_5px_20px_0_rgba(0,0,0,0.06)] overflow-hidden"
          >
            {/* Icon */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="aspect-[24/22] min-w-[2.2rem] max-w-[2.2rem]"
              fill="none"
              viewBox="0 0 24 22"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 20.917h4.667m-4.667 0H7.333m4.667 0V16.25m0 0c4.667 0 8.75-.389 9.333-.778S22.5 11.778 22.5 8.667c0-3.112-.583-6.417-1.167-6.806-.583-.389-4.666-.778-9.333-.778s-8.75.39-9.333.778C2.083 2.25 1.5 5.555 1.5 8.667c0 3.11.583 6.416 1.167 6.805.583.39 4.666.778 9.333.778"
              ></path>
            </svg>

            {/* Name */}
            <div className="font-bold capitalize truncate">
              {screen.screen_name ?? "N/A"}
            </div>
          </Link>
        ))}
      </div>
    </Popup>
  );
};

export default PlaylistAllScreens;
