import { FNGetAllPlaylist } from "@/fetchers/type";
import cn from "@/utility/cn";
import { Screen } from ".";

type Props = {
  playlist: FNGetAllPlaylist[0];
  className?: string;
  currentScreen: Screen;
  children: React.ReactNode;
};

// List
const list: { id: Screen; name: string }[] = [
  {
    id: "playlist-name",
    name: "Playlist Name",
  },
  {
    id: "add-slides",
    name: "Add Slide(s)",
  },
  {
    id: "manage-slides",
    name: "Manage Slides",
  },
];

// Export pointer css

const Sidebar = (props: Props) => {
  // Return JSX
  return (
    <div
      className={cn(
        "md:bg-[#F2F5FF] flex w-full md:max-w-[200px] xl:max-w-[300px] h-full py-body md:p-[4rem] lg:p-[5rem] xl:p-[6rem] md:border-r min-w-0",
        props.className
      )}
    >
      <div className="relative text-[1.4rem] md:text-[1.6rem] leading-[1] flex md:flex-col w-full h-fit">
        {list.map((screen, index) => {
          // Is current screens
          const isCurrentScreen = screen.id == props.currentScreen;

          // Current Screen Index
          const currentScreenIndex = list.findIndex(
            (s) => s.id == props.currentScreen
          );

          // Is Previous Screen
          const isPreviousScreen = index < currentScreenIndex;

          // Return JSX
          return (
            <div
              key={screen.id}
              className={cn(
                "step max-md:flex-1 text-title/[20%] transition min-h-fit flex max-md:flex-col max-md:items-center max-md:text-center gap-[1rem] overflow-hidden",
                (isPreviousScreen || isCurrentScreen) && "text-primary",
                index != 2 && "md:h-[13rem]"
              )}
            >
              {/* Point */}
              <div
                className={cn(
                  "shadow-[inset_0_0_0_3px_currentColor] max-w-[2rem] min-w-[2rem] h-[2rem] rounded-full relative flex transition",
                  isPreviousScreen && "bg-current",
                  isCurrentScreen &&
                    "shadow-[inset_0_0_0_0.7rem_currentColor] bg-white",
                  // Pseudo elements
                  "after:content-[''] after:absolute before:content-[''] before:absolute after:bg-current before:bg-current",
                  isCurrentScreen && "after:bg-title/[20%]",
                  index == 0 && "before:hidden",
                  index == 2 && "after:hidden",
                  // Mobile
                  "max-md:after:w-[200px] max-md:after:h-[3px] max-md:before:w-[200px] max-md:before:h-[3px] max-md:after:top-1/2 max-md:after:-translate-y-1/2 max-md:before:top-1/2 max-md:before:-translate-y-1/2 max-md:after:right-0 max-md:after:translate-x-full max-md:before:left-0 max-md:before:-translate-x-full",
                  // Large Screens
                  "md:after:h-[200px] md:after:w-[3px] md:before:h-[200px] md:before:w-[3px] md:after:left-1/2 md:after:-translate-x-1/2 md:before:left-1/2 md:before:-translate-X-1/2 md:after:bottom-0 md:after:translate-y-full md:before:top-0 md:before:-translate-y-full"
                )}
              >
                {/* Check Icon */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  className={cn(
                    "aspect-square w-[70%] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-0 transition",
                    isPreviousScreen && "opacity-100"
                  )}
                  fill="none"
                  stroke="white"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="4"
                  viewBox="0 0 24 24"
                >
                  <path stroke="none" d="M0 0h24v24H0z"></path>
                  <path d="m5 12 5 5L20 7"></path>
                </svg>
              </div>

              {/* Text */}
              <span
                className={cn(
                  "truncate text-title/50 max-w-full flex flex-col max-md:items-center max-md:justify-center gap-[0.5em] md:translate-y-[0.2em] max-md:px-[1rem]",
                  (isCurrentScreen || isPreviousScreen) && "text-title"
                )}
              >
                {/* Title */}
                <span>{screen.name}</span>
                {/* Sub title */}
                <span className="text-[0.9em] md:text-[0.8em] opacity-70 max-w-full whitespace-break-spaces leading-[120%]">
                  {index == 0
                    ? props?.playlist?.name
                    : index == 1
                    ? "No. of Slides: " + props?.playlist?.slides_json?.length
                    : ""}
                </span>
              </span>
            </div>
          );
        })}

        {/* Slides */}
        {props?.playlist?.slides_json?.map(slide => )}
      </div>
    </div>
  );
};

export default Sidebar;
