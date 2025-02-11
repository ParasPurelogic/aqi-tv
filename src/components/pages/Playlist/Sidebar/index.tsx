import { FNGetAllPlaylist } from "@/fetchers/type";
import cn from "@/utility/cn";
import StepComp from "./Step";
import { Step } from "../";

type Props = {
  playlist: FNGetAllPlaylist[0];
  className?: string;
  currentStep: Step;
  otherSteps?: React.ReactNode;
};

// Steps
const steps: { id: Step; name: string }[] = [
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
        "md:bg-[#F2F5FF] flex flex-col w-full md:max-w-[200px] xl:max-w-[300px] h-full py-body md:p-[4rem] lg:p-[5rem] xl:p-[6rem] md:border-r min-w-0",
        props.className
      )}
    >
      <div className="relative text-[1.4rem] md:text-[1.6rem] leading-[1] flex md:flex-col w-full h-fit">
        {/* Main Steps */}
        {steps.map((step, index) => {
          // Current Step Index
          const currentStepIndex = steps.findIndex(
            (s) => s.id == props.currentStep
          );
          // Return JSX
          return (
            <StepComp
              key={index}
              className={cn(
                "max-md:flex-1",
                index != 2 && "md:h-[13rem]",
                index == 0 && "[&_.point]:before:hidden",
                index == 2 && "[&_.point]:after:hidden"
              )}
              isCurrentStep={step.id == props.currentStep}
              isPreviousStep={index < currentStepIndex}
              name={step.name}
              subName={
                (index == 0
                  ? props?.playlist?.name
                  : index == 1
                  ? "No. of Slides: " + props?.playlist?.slides_json?.length
                  : "") ?? ""
              }
            />
          );
        })}
      </div>

      {/* Other Steps */}
      {props?.otherSteps}
    </div>
  );
};

export default Sidebar;
