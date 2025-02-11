import cn from "@/utility/cn";

type Props = {
  title: string;
  subTitle: string;
  className?: string;
};

const NoScreens = (props: Props) => {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center max-w-[290px] text-title text-center my-[7rem]",
        props.className
      )}
    >
      {/* Icon */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="aspect-[154/108] min-w-[15rem] max-w-[15rem]"
        fill="none"
        viewBox="0 0 154 108"
      >
        <path
          stroke="currentColor"
          strokeLinecap="round"
          strokeWidth="3.904"
          d="M151.167 105.917h-3.708c-10.241 0-18.542-8.302-18.542-18.542v-66.75c0-10.24 8.301-18.542 18.542-18.542h3.708M2.833 105.917h3.708c10.24 0 18.542-8.302 18.542-18.542v-66.75c0-10.24-8.301-18.542-18.542-18.542H2.833M99.248 3.017c2.872.625 5.039 1.669 6.781 3.41 4.344 4.345 4.344 11.337 4.344 25.322v44.5c0 13.985 0 20.977-4.344 25.322s-11.337 4.345-25.322 4.345H73.29c-13.985 0-20.978 0-25.322-4.345-4.345-4.345-4.345-11.337-4.345-25.322v-44.5c0-13.985 0-20.977 4.345-25.322C51.91 2.485 58.032 2.12 69.582 2.086"
        ></path>
      </svg>
      {/* Text */}
      <span className="text-[2.5rem] font-bold my-[1.5rem]">{props.title}</span>
      {/* Sub Text */}
      <span>{props.subTitle}</span>
    </div>
  );
};

export default NoScreens;
