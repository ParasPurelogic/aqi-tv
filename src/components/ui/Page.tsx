import cn from "@/utility/cn";

type Props = {
  className?: string;
  pageName: string;
  children: React.ReactNode;
  style?: React.CSSProperties;
};

const Page = (props: Props) => {
  return (
    <div
      data-page={props.pageName}
      className={cn("page", props.pageName, props.className)}
      style={props.style}
    >
      {props.children}
    </div>
  );
};

export default Page;
