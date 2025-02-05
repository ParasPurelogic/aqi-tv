"use client";

import { Button, InputText } from "@/components/elements";
import IconLoader from "@/components/misc/IconLoader";
import Popup from "@/components/ui/Popup";
import { domainName } from "@/config/misc";
import { useUserInfo } from "@/contexts/UserInfo";
import addScreen from "@/fetchers/screen/addScreen";
import updateScreen from "@/fetchers/screen/updateScreen";
import { FNGetAllScreens } from "@/fetchers/type";
import Image from "next/image";
import { useCallback, useState } from "react";
import { toast } from "sonner";

type Props = {
  screen?: FNGetAllScreens[0];
  onSuccess: (screens: (FNGetAllScreens[0] & { isNew?: boolean })[]) => void;
  onClose: () => void;
};

const AddScreenModal = (props: Props) => {
  // userinfo
  const userInfo = useUserInfo();

  // Screen
  const [screenInfo, setScreenInfo] = useState({
    name: props.screen?.ScreenName,
    serialNo: props.screen?.serialNo,
  });

  // Flags
  const [isSaving, setIsSaving] = useState(false);

  // Handle Submit
  const handleSubmit = useCallback(async (info: typeof screenInfo) => {
    try {
      // Set saving flag
      setIsSaving(true);

      // Save
      const newScreens = props.screen
        ? await updateScreen({
            options: {
              token: userInfo?.token ?? "",
              userId: userInfo?.id ?? 0,
              screenName: info.name ?? "",
              screenSerialNo: info.serialNo ?? "",
            },
            onError: (err) => {
              throw new Error(err);
            },
          })
        : await addScreen({
            options: {
              token: userInfo?.token ?? "",
              userId: userInfo?.id ?? 0,
              screenName: info.name ?? "",
              screenSerialNo: info.serialNo ?? "",
            },
            onError: (err) => {
              throw new Error(err);
            },
          });

      // Run props.onClose and props.onSuccess
      props?.onClose();
      props?.onSuccess(
        (newScreens ?? []).map((s) => ({
          ...s,
          isNew: !props.screen && s.serialNo == info.serialNo,
        }))
      );

      // Show toast
      toast.success(
        props.screen
          ? "Screen Updated Successfully"
          : "Screen Added Successfully"
      );

      //
    } catch (error: any) {
      // Set saving flag
      setIsSaving(false);
      // Show error
      toast.error(error?.message);
    }

    // eslint-disable-next-line
  }, []);

  // Return JSX
  return (
    <Popup
      fitWrapperHeight
      className="p-0"
      wrapperClassName="sm:max-w-[600px] lg:max-w-[750px] 2xl:max-w-[900px]"
      contentClassName="grid sm:grid-cols-[auto_1fr]"
    >
      {/* Header */}
      <div className="col-span-full text-title text-center flex items-center gap-[1.5rem] border-b pb-[1.5rem] sm:pb-[2.5rem]">
        {/* Heading */}
        <p className="text-[2.5rem] leading-[1]">
          {props.screen ? "Update Screen" : "Add Screen"}
        </p>
        {/* Close BTN */}
        <Popup.CloseButton
          className="float-right w-[4rem] h-[4rem]"
          onClose={props.onClose}
          disabled={isSaving}
        />
      </div>

      {/* Preview */}
      <div className="flex flex-col items-center gap-[3rem] w-[25rem] mt-[3rem] mx-auto">
        {/* Image */}
        <Image
          src={`${domainName}/media/misc/screen-preview.jpg`}
          alt=""
          width={250}
          height={500}
          className="w-full"
        />
        {/* Text */}
        <span className="text-center">
          Serial number will be there on TV screen
        </span>
      </div>

      {/* Form */}
      <div className="flex flex-col h-full gap-[2.5rem] sm:border-l p-[3rem_0_2rem] sm:p-[3rem_0_0_3rem] sm:ml-[3rem]">
        {/* Name Field */}
        <InputText
          disabled={isSaving}
          placeholder="Screen Name"
          defaultValue={screenInfo.name}
          onChange={(e) =>
            setScreenInfo({ ...screenInfo, name: e.target.value })
          }
        />

        {/* Serial No. Field */}
        <InputText
          disabled={isSaving || !!props.screen?.serialNo}
          placeholder="Serial Number"
          defaultValue={screenInfo.serialNo}
          onChange={(e) =>
            setScreenInfo({ ...screenInfo, serialNo: e.target.value })
          }
        />

        {/* Actions */}
        <div className="max-sm:w-full flex flex-wrap gap-[1.5rem] justify-end pt-[5rem] md:pt-[10rem] mt-auto">
          {/* Cancel */}
          <Button
            disabled={isSaving}
            onClick={props.onClose}
            className="max-sm:flex-1  min-w-[15rem] bg-transparent text-primary"
          >
            Cancel
          </Button>
          {/* Add/Remove */}
          <Button
            disabled={!screenInfo.name || !screenInfo.serialNo || isSaving}
            className="max-sm:flex-1  min-w-[15rem]"
            onClick={() => handleSubmit(screenInfo)}
          >
            {isSaving ? <IconLoader /> : props.screen ? "Update" : "Add"}
          </Button>
        </div>
      </div>
    </Popup>
  );
};

export default AddScreenModal;
