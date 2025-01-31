import cn from "@/utility/cn";

type Props = {
  className?: string;
  fullScreen?: boolean;
};

const ShowLoader = (props: Props) => {
  return (
    <div
      aria-label="Please wait... Loading"
      className={cn(
        "default-loader h-full w-full flex items-center justify-center !pointer-events-none !cursor-progress",
        props.fullScreen &&
          `bg-transparent fixed z-[9999999999999] top-0 left-0 backdrop-blur-[10px]`,
        props.className
      )}
    >
      <div className="spinner relative inline-block text-[4rem] w-[1em] h-[1em] aspect-square">
        <div className="spinner-blade" />
        <div className="spinner-blade" />
        <div className="spinner-blade" />
        <div className="spinner-blade" />
        <div className="spinner-blade" />
        <div className="spinner-blade" />
        <div className="spinner-blade" />
        <div className="spinner-blade" />
        <div className="spinner-blade" />
        <div className="spinner-blade" />
        <div className="spinner-blade" />
        <div className="spinner-blade" />
      </div>
    </div>
  );
};

export default ShowLoader;
