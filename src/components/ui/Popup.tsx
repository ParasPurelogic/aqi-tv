"use client";

import cn from "@/utility/cn";
import { ReactNode, useEffect, useState } from "react";
import ReactDOM from "react-dom";

interface PopupProps {
  children: ReactNode;
  className?: string;
  fitWrapperHeight?: boolean;
  wrapperClassName?: string;
  contentClassName?: string;
  onClose?: () => void;
  closeButtonClassName?: string;
  customCloseButton?: boolean;
  backdropClose?: boolean;
  noBackdrop?: boolean;
}

const Popup = (props: PopupProps) => {
  // Portal Container
  const [portalContainer, setPortalContainer] = useState<HTMLElement | null>(
    null
  );

  // Get the element with the id "glb-popup"
  useEffect(() => {
    // Get the element with the id "glb-popup"
    const element = document.getElementById("glb-popup");
    // Check if the element exists
    if (element) {
      setPortalContainer(element);
    }
  }, []);

  if (!portalContainer) {
    return null; // Return null if the portal container is not found
  }

  // Return the portal container
  return ReactDOM.createPortal(
    <div
      className={cn(
        "popup fixed top-0 left-0 w-full min-h-full max-h-full z-[999999] flex flex-col p-body",
        props.className
      )}
    >
      {/* Wrapper Area */}
      <div
        className={cn(
          "wrapper w-full h-[5rem] grow flex items-center flex-col gap-[1.5rem] z-[20] mx-auto my-auto",
          props.wrapperClassName,
          props.fitWrapperHeight && "grow-0 h-fit glb-popup-fit-height"
        )}
      >
        {/* Close Button */}
        {!props.customCloseButton && props.onClose && (
          <CloseButton
            className={props.closeButtonClassName}
            onClose={() => props.onClose && props.onClose()}
          />
        )}

        {/* Content */}
        <div
          className={cn(
            "content w-full h-[20%] grow bg-white border-[2rem] border-t-[3rem] border-r-[1rem] p-[1rem] pt-0 pr-[1.5rem] sm:border-x-[2rem] sm:px-[2rem] sm:border-y-[3rem] rounded-[1.6rem] border-white shadow-[4px_7px_37px_0px_rgba(69,69,69,0.06)] overflow-y-auto",
            props.contentClassName
          )}
        >
          {props.children}
        </div>
      </div>

      {/* Backdrop */}
      {!props?.noBackdrop && (
        <div
          className={`backdrop z-10 absolute top-0 left-0 w-full h-full bg-[#0404048F]`}
        ></div>
      )}
    </div>,
    portalContainer
  );
};

// Close Button Comp
function CloseButton({
  className,
  onClose,
  disabled,
}: {
  className?: string;
  onClose?: () => void;
  disabled?: boolean;
}) {
  return (
    <div
      className={cn(
        "close-button relative cursor-pointer transition hover:bg-zinc-200 bg-white aspect-square ml-auto w-[3rem] h-[3rem] rounded-full flex items-center justify-center text-title",
        className,
        disabled && "pointer-events-nonecursor-not-allowed"
      )}
      onClick={() => !disabled && onClose?.()}
    >
      <svg
        className="absolute aspect-square w-[40%] top-2/4 left-2/4 -translate-x-2/4 -translate-y-2/4"
        viewBox="0 0 20 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M19.7076 18.2925C19.8005 18.3854 19.8742 18.4957 19.9245 18.6171C19.9747 18.7385 20.0006 18.8686 20.0006 19C20.0006 19.1314 19.9747 19.2615 19.9245 19.3829C19.8742 19.5043 19.8005 19.6146 19.7076 19.7075C19.6147 19.8004 19.5044 19.8741 19.383 19.9244C19.2616 19.9747 19.1315 20.0006 19.0001 20.0006C18.8687 20.0006 18.7386 19.9747 18.6172 19.9244C18.4958 19.8741 18.3855 19.8004 18.2926 19.7075L10.0001 11.4137L1.70757 19.7075C1.51993 19.8951 1.26543 20.0006 1.00007 20.0006C0.734704 20.0006 0.480208 19.8951 0.292568 19.7075C0.104927 19.5199 -0.000488276 19.2654 -0.000488281 19C-0.000488286 18.7346 0.104927 18.4801 0.292568 18.2925L8.58632 10L0.292568 1.7075C0.104927 1.51986 -0.000488281 1.26536 -0.000488281 0.999999C-0.000488281 0.734635 0.104927 0.48014 0.292568 0.292499C0.480208 0.104858 0.734704 -0.000556946 1.00007 -0.000556946C1.26543 -0.000556946 1.51993 0.104858 1.70757 0.292499L10.0001 8.58625L18.2926 0.292499C18.4802 0.104858 18.7347 -0.000556951 19.0001 -0.000556946C19.2654 -0.000556941 19.5199 0.104858 19.7076 0.292499C19.8952 0.48014 20.0006 0.734635 20.0006 0.999999C20.0006 1.26536 19.8952 1.51986 19.7076 1.7075L11.4138 10L19.7076 18.2925Z"
          fill="currentColor"
          strokeWidth="1"
          stroke="currentColor"
        />
      </svg>
    </div>
  );
}

Popup.CloseButton = CloseButton;

export default Popup;
