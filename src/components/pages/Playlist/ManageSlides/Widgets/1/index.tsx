import MediaUploader from "@/components/ui/MediaUploader";
import { TypeWidget } from "@/types/misc";
import cn from "@/utility/cn";
import { useEffect, useState } from "react";

type Props = {
  widget: TypeWidget;
  onSave: (widget: TypeWidget1) => void;
};

// Type Settings
export type TypeWidget1 = TypeWidget & {
  settings?: [
    {
      id: "uploader";
      label: "Upload Image";
    }
  ];
};

const Index = (props: Props) => {
  // Widget
  const [widget, setWidget] = useState<TypeWidget1>(props?.widget);

  // Run props.onSave
  useEffect(() => {
    if (JSON.stringify(widget) != JSON.stringify(props?.widget)) {
      props?.onSave?.(widget);
    }

    // eslint-disable-next-line
  }, [widget]);

  // Return JSX
  return (
    <div className="flex flex-col gap-[1.5rem]">
      {/* Label */}
      <span>Upload Image</span>

      {/* Uploader */}
      <MediaUploader
        // onUpload={(logo) => setClientLogo(logo)}
        // onRemove={() => setClientLogo(null)}

        options={{
          fileType: "image",
          maxSize: 1,
        }}
      />
    </div>
  );
};

export default Index;
