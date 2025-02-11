"use client";

import Popup from "@/components/ui/Popup";
import widgets from "@/config/widgets";
import { TypeWidget } from "@/types/misc";
import Image from "next/image";

type Props = {
  onClose?: () => void;
  onSelect?: (widget: TypeWidget) => void;
};

const AddWidgetModal = (props: Props) => {
  // Return JSX
  return (
    <Popup fitWrapperHeight wrapperClassName="sm:max-w-[800px]">
      {/* Header */}
      <div className="col-span-full text-title text-center flex items-center gap-[1.5rem] border-b pb-[1.5rem] sm:pb-[2.5rem] mb-[1.5rem] sm:mb-[3.5rem]">
        {/* Heading */}
        <p className="text-[2.5rem] leading-[1]">Select WIdget</p>
        {/* Close BTN */}
        <Popup.CloseButton
          className="float-right w-[4rem] h-[4rem]"
          onClose={props.onClose}
        />
      </div>

      {/* List */}
      <div className="grid grid-cols-2 min-[500px]:grid-cols-3 md:grid-cols-4 gap-[3rem] md:gap-[5rem] w-full text-[1.6rem]">
        {widgets.map((widget) => (
          <div
            key={widget.widget_id}
            className="w-full flex flex-col items-center justify-center text-center gap-[1.2rem] cursor-pointer"
            onClick={() => {
              // Close
              props?.onClose?.();

              // Run props.onSave
              props?.onSelect?.(widget);
            }}
          >
            {/* Preview */}
            <Image
              alt=""
              width={100}
              height={100}
              src={widget.previewIcon ?? ""}
              className="w-full aspect-[183/144] bg-[#D9D9D9] rounded-[1rem] sm:rounded-[1.5rem] overflow-hidden transition hover:border-primary border-transparent border"
            />

            {/* Name */}
            <span>{widget?.widget_name}</span>
          </div>
        ))}
      </div>
    </Popup>
  );
};

export default AddWidgetModal;
