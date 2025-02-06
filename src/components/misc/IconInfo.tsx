import cn from "@/utility/cn";

type Props = { className?: string };

const IconInfo = (props: Props) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={cn(
        "aspect-square min-w-[1.8rem] max-w-[1.8rem] text-para",
        props.className
      )}
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      viewBox="0 0 24 24"
    >
      <path stroke="none" d="M0 0h24v24H0z"></path>
      <path d="M3 12a9 9 0 1 0 18 0 9 9 0 0 0-18 0M12 9h.01"></path>
      <path d="M11 12h1v4h1"></path>
    </svg>
  );
};

export default IconInfo;
