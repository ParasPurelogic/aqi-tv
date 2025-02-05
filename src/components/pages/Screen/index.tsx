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
      <div className="bg-[#F2F5FF] p-[2rem_var(--body-padding)] w-full flex items-center gap-[2.5rem]">
        {/* Back BTN */}
        <BackBtn />

        {/* Name */}
        <p className="text-title text-[2.2rem] -ml-[0.5rem]">
          {screen.ScreenName}
        </p>

        {/* Divider */}
        <Divider orientation="vr" className="h-[5rem]" />

        {/* Serial Number */}
        <div className="flex flex-col self-center leading-[1] gap-[0.3rem]">
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
