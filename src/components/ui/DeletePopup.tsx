"use client";

import Popup from "./Popup";
import { Button } from "@/components/elements";
import { useState } from "react";
import { toast } from "sonner";
import IconLoader from "../misc/IconLoader";

type Props = {
  heading: string;
  subHeading: string;
  cancelBtnText?: string;
  okBtnText?: string;
  onClose: () => void;
  onDelete: () => Promise<void>;
};

const DeletePopup = (props: Props) => {
  // Is deleting
  const [isDeleting, setIsDeleting] = useState(false);

  // handle delete
  const handleDelete = async () => {
    try {
      // update deleting state
      setIsDeleting(true);

      // Run props.onDelete
      if (props.onDelete) {
        await props.onDelete();
      }

      //
    } catch (error: any) {
      // Show toast
      toast.error(error.message ?? "Something went wrong");
      // update deleting state
      setIsDeleting(false);
    }
  };

  // Return JSX
  return (
    <Popup wrapperClassName="w-[90%] sm:w-[45rem]" fitWrapperHeight>
      <div className="flex flex-col">
        {/* Info */}
        <div className="info flex max-xs:flex-wrap max-xs:justify-center max-xs:text-center gap-[2rem]">
          {/* Icon */}
          <i className="aspect-square relative max-w-[6rem] min-h-[6rem] max-h-[6rem] rounded-full bg-error">
            <svg
              className="absolute w-[70%] h-[70%] top-2/4 left-2/4 -translate-x-2/4 -translate-y-2/4"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="white"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M4 7l16 0" />
              <path d="M10 11l0 6" />
              <path d="M14 11l0 6" />
              <path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" />
              <path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" />
            </svg>
          </i>
          {/* Text */}
          <div className="flex flex-col">
            <p className="font-bold text-[2rem] text-title">{props.heading}</p>
            <span>{props.subHeading}</span>
          </div>
        </div>

        {/* Actions */}
        <div className="actions grid xs:grid-cols-2 gap-[2rem] mt-[4rem]">
          {/* Cancel Button */}
          <Button
            onClick={props?.onClose}
            disabled={isDeleting}
            className="bg-transparent border text-title border-[#66758054] hover:bg-transparent"
          >
            {props.cancelBtnText ?? "Cancel"}
          </Button>
          {/* Delete Button */}
          <Button
            disabled={isDeleting}
            onClick={handleDelete}
            className="bg-error border-error"
          >
            {isDeleting ? <IconLoader /> : props.okBtnText ?? "Delete"}
          </Button>
        </div>
      </div>
    </Popup>
  );
};

export default DeletePopup;
