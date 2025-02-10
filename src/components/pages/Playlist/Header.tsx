import BackButton from "../Screen/BackButton";

type Props = {
  className?: string;
  playlistName: string;
};

const Header = (props: Props) => {
  return (
    <div className="bg-[#F2F5FF] p-[1.5rem_2rem] md:p-[2.7rem_5rem] h-fit w-full flex gap-[2rem] md:gap-[2.5rem] min-w-0">
      {/* Back BTN */}
      <BackButton className="max-md:max-w-[2.5rem] max-md:min-w-[2.5rem]" />

      {/* Name */}
      <p className="text-title text-[2rem] sm:text-[2.2rem] -ml-[0.5rem] flex flex-col gap-[0.2rem]">
        {/* Name */}
        <span>{props.playlistName}</span>
      </p>
    </div>
  );
};

export default Header;
