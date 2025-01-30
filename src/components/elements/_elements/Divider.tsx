import cn from "@/utility/cn";

type DividerProps = {
  className?: string;
  orientation: "hr" | "vr";
  color?: string;
  style?: React.CSSProperties;
};

// bg

const Divider = (props: DividerProps) => {
  return (
    <hr
      className={cn(
        `divider border-0 min-w-[1px] min-h-[1px] opacity-25`,
        !props.color && "dark:invert",
        props.orientation === "hr" && "w-full h-[1px]",
        props.orientation === "vr" && "h-full w-[1px]",
        props.className
      )}
      style={{
        ...(props.style ?? {}),
        backgroundImage:
          props.orientation == "hr"
            ? `linear-gradient(to right, transparent, ${
                props.color ?? "#31343D"
              }, transparent)`
            : `linear-gradient(to bottom, transparent 5%, ${
                props.color ?? "#31343D"
              }, transparent 95%)`,
      }}
    />
  );
};

Divider.displayName = "Divider";

export default Divider;
