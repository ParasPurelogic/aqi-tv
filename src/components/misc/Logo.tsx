import { domainName } from "@/config/misc";
import cn from "@/utility/cn";
import Image from "next/image";

type Props = {
  className?: string;
};

const Logo = (props: Props) => {
  return (
    <Image
      alt="AQI Logo"
      src={`${domainName}/media/misc/aqi-logo.svg`}
      width={50}
      height={50}
      priority
      className={cn("site-logo w-[10rem] aspect-[117/55]", props.className)}
    />
  );
};

export default Logo;
