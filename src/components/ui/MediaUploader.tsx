"use client";

import cn from "@/utility/cn";
import { useRef, useState } from "react";
import { toast } from "sonner";

type Data = {
  file: File;
  name: string;
  url: string;
};

type Props = {
  className?: string;
  editorClassName?: string;
  removerClassName?: string;
  onUpload?: (data: Data) => void;
  onRemove?: () => void;
  uploader?: React.ComponentType<any>;
  options: {
    errorMessage?: string;
    fileType: "image" | "video";
    maxSize: number;
  };
};

const MediaUploader = (props: Props) => {
  // Input File Reference
  const inputRef = useRef<HTMLInputElement | null>(null);

  // State to hold the selected image file
  const [media, setMedia] = useState<File | null>(null);

  // State to hold media URL
  const [mediaURL, setMediaURL] = useState<null | string>(null);

  // Validate Media
  const validateMedia = (file: File): boolean => {
    // Allowed File Types
    const allowedTypes =
      props?.options?.fileType == "image"
        ? ["image/png", "image/jpeg", "image/jpg"]
        : ["video/mp4", "video/x-m4v", "video/avi"];

    // Allowed Maximum Size in MB
    const maxSize = props.options.maxSize
      ? props.options.maxSize * 1024 * 1024
      : 1 * 1024 * 1024;

    // Check if passes
    return allowedTypes.includes(file.type) && file.size <= maxSize;
  };

  // Input Change Handler
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      // Get the selected media file
      const mediaFile = e.target.files[0];

      if (validateMedia(mediaFile)) {
        // Create a preview URL for the selected image
        const mediaLink = URL.createObjectURL(mediaFile);

        // Update the state with the selected image file and its preview URL
        setMedia(mediaFile);

        // Set media URL
        setMediaURL(mediaLink);

        // Run props.onUpload

        props?.onUpload?.({
          file: mediaFile,
          name: mediaFile.name ?? "unknown",
          url: mediaLink,
        });
      } else {
        // Reset file input
        if (inputRef.current) {
          inputRef.current.value = "";
        }
        toast.error(
          props.options?.errorMessage ?? props.options.fileType == "image"
            ? `Please upload a valid image file (png, jpg, or jpeg) and less than ${
                props.options.maxSize ?? 1
              }mb.`
            : `Please upload a valid video file (mp4, m4v, or avi) and less than ${
                props.options.maxSize ?? 1
              }mb.`
        );
      }
    }
  };

  // Handle on remove
  const handleRemove = () => {
    // Remove media URL
    if (mediaURL) {
      // Free up memory space
      URL.revokeObjectURL(mediaURL);
    }

    // Set media to null
    setMedia(null);
    if (inputRef.current) {
      inputRef.current.value = "";
    }
    // Run props.onRemove
    props?.onRemove?.();
  };

  // Return JSX
  return (
    <div
      className={cn(
        "upload-media relative h-fit w-fit border flex items-center",
        !media && "border-dashed border-[rgba(0,0,0,0.5)]",
        props.className
      )}
    >
      {/* Uploader */}
      <div
        className="uploader w-fit h-full"
        onClick={() => {
          if (inputRef.current && !media) {
            inputRef.current.click();
          }
        }}
      >
        {/* Uploader Wrapper */}
        <div className="uploader-wrapper w-full h-full">
          {props.uploader ? (
            <props.uploader />
          ) : (
            <div className="upload flex items-center justify-center w-full h-full cursor-pointer text-center py-[1.5rem] px-[2.5rem]">
              <p className="leading-[1] font-bold text-title truncate min-w-0">
                {media ? media.name : "+ Upload File"}
              </p>
            </div>
          )}
        </div>

        {/* Input */}
        <input
          ref={inputRef}
          type="file"
          accept={
            props?.options?.fileType == "image"
              ? ".png,.jpg,.jpeg,.webp"
              : ".mp4,.m4v,.avi"
          }
          onChange={handleInputChange}
          className="hidden opacity-0 invisible absolute"
        />
      </div>

      {/* Editor */}
      <div
        className={cn(
          "editor group cursor-pointer z-[2] p-[1.5rem] aspect-square w-[5rem] bg-[rgba(0,0,0,0.5)] flex items-center justify-center",
          props.editorClassName
        )}
        onClick={() => {
          if (inputRef.current) {
            inputRef.current.click();
          }
        }}
      >
        <i className="aspect-[17/18] h-full group-hover:opacity-50 transition">
          <svg
            viewBox="0 0 20 21"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M11.6332 3.05271L2.64958 12.5615C2.31037 12.9226 1.98211 13.6339 1.91645 14.1263L1.51159 17.6715C1.36934 18.9518 2.28849 19.8272 3.55779 19.6083L7.08119 19.0065C7.57359 18.919 8.26295 18.5579 8.60216 18.1858L17.5857 8.67702C19.1395 7.03568 19.8398 5.16456 17.4216 2.87763C15.0143 0.612588 13.187 1.41137 11.6332 3.05271Z"
              stroke="white"
              strokeWidth="1.64134"
              strokeMiterlimit="10"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M10.126 4.64001C10.3554 6.10721 11.0655 7.45669 12.1448 8.47663C13.2242 9.49658 14.6117 10.1292 16.0895 10.2753"
              stroke="white"
              strokeWidth="1.64134"
              strokeMiterlimit="10"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </i>
      </div>

      {/* Remover */}
      {media && (
        <div
          className={cn(
            "remover aspect-[17/19] p-[1.2rem] w-[4rem] z-[2] cursor-pointer hover:opacity-60 transition text-deviceOffline text-error",
            props.removerClassName
          )}
          onClick={handleRemove}
        >
          <svg
            className="w-full h-full"
            viewBox="0 0 17 19"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M1 4.36328H2.68156H16.134"
              stroke="currentColor"
              strokeWidth="1.68156"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M14.4506 4.36312V16.134C14.4506 16.58 14.2734 17.0077 13.9581 17.3231C13.6427 17.6384 13.215 17.8156 12.7691 17.8156H4.36125C3.91527 17.8156 3.48756 17.6384 3.17221 17.3231C2.85685 17.0077 2.67969 16.58 2.67969 16.134V4.36312M5.20203 4.36312V2.68156C5.20203 2.23558 5.37919 1.80787 5.69455 1.49252C6.0099 1.17716 6.43761 1 6.88359 1H10.2467C10.6927 1 11.1204 1.17716 11.4358 1.49252C11.7511 1.80787 11.9283 2.23558 11.9283 2.68156V4.36312"
              stroke="currentColor"
              strokeWidth="1.68156"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      )}
    </div>
  );
};

export default MediaUploader;
