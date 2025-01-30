import cn from "@/utility/cn";

type Props = {
  className?: string;
};

const IconLoader = (props: Props) => {
  return (
    <svg
      className={cn("aspect-square w-[2.4rem] animate-spin", props.className)}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      strokeWidth="2"
      stroke="currentColor"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M12 3a9 9 0 1 0 9 9" />
    </svg>
  );
};

export default IconLoader;
