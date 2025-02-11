"use client";

import cn from "@/utility/cn";
import { useRouter } from "next/navigation";

type Props = {
  className?: string;
  disable?: boolean;
};

const BackButton = (props: Props) => {
  // Router
  const router = useRouter();

  // Return JSX
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={cn(
        "transition aspect-square min-w-[3.5rem] max-w-[3.5rem] h-fit hover:opacity-70 cursor-pointer",
        props.className
      )}
      fill="none"
      viewBox="0 0 39 39"
      onClick={() => !props?.disable && router.back()}
    >
      <rect
        width="38.943"
        height="38.943"
        fill="#31343D"
        rx="19.472"
        transform="matrix(-1 0 0 1 38.943 0)"
      ></rect>
      <path
        fill="#fff"
        d="M27 18.428a.88.88 0 1 1 0 1.76zM11.375 19.93a.88.88 0 0 1 0-1.244l5.6-5.602a.88.88 0 1 1 1.245 1.245l-4.978 4.979 4.978 4.979a.88.88 0 1 1-1.244 1.244zM27 20.188H11.997v-1.76H27z"
      ></path>
    </svg>
  );
};

export default BackButton;
