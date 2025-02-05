import { Divider } from "@/components/elements";
import Page from "@/components/ui/Page";
import { FNGetSingleScreen } from "@/fetchers/type";
import BackBtn from "./BackBtn";

type Props = {
  screen: FNGetSingleScreen;
};

const index = (props: Props) => {
  // Screen
  const screen = props.screen;

  // Return JSX
  return (
    <Page name="screen-info -m-body border-l">
      {/* Header */}
      <div className="bg-[#F2F5FF] p-[2rem_var(--body-padding)] w-full flex sm:items-center gap-[2.5rem]">
        {/* Back BTN */}
        <BackBtn />

        {/* Name */}
        <p className="text-title text-[2rem] sm:text-[2.2rem] -ml-[0.5rem] flex flex-col gap-[0.2rem]">
          {/* Name */}
          <span>{screen.ScreenName}</span>
          {/* Serial No. */}
          <span className="sm:hidden text-para text-[1.4rem]">
            {screen?.serialNo ?? "N/A"}
          </span>
        </p>

        {/* Divider */}
        <Divider orientation="vr" className="max-sm:hidden h-[5rem]" />

        {/* Serial Number */}
        <div className="max-sm:hidden flex flex-col self-center leading-[1] gap-[0.5rem]">
          <span className="text-[1.4rem]">Serial Number</span>
          <span className="text-title uppercase">
            {screen?.serialNo ?? "N/A"}
          </span>
        </div>
      </div>
    </Page>
  );
};

export default index;
