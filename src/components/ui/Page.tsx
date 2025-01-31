import cn from "@/utility/cn";

type Props = {
  className?: string;
  name: string;
  children: React.ReactNode;
  style?: React.CSSProperties;
};

const Page = (props: Props) => {
  return (
    <div
      data-page={props.name}
      className={cn("page", props.name, props.className)}
      style={props.style}
    >
      {props.children}
    </div>
  );
};

export default Page;
