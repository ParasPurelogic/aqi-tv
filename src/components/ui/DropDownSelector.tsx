"use client";

import cn from "@/utility/cn";
import { JSX, useEffect, useRef, useState } from "react";
import { SearchBar } from "@/components/elements";
import useClickOutside from "@/hooks/useClickOutside";

export type Option = {
  id: string;
  name: string;
  disable?: boolean;
  customComp?: JSX.Element;
};

type Props = {
  options: Option[];
  pickerComp?: (option?: Option) => JSX.Element;
  pickerText?: string;
  disableSelection?: boolean;
  showSearchBar?: boolean;
  onSelect?: (option: Option) => void;
  noCloseOnSelect?: boolean;
  selectedOption?: Option;
  className?: string;
};

const DropDownSelector = (props: Props) => {
  // Create a reference of the component
  const parentRef = useRef(null);

  // Selected Option Ref
  const selectedOptionRef = useRef<HTMLLIElement>(null);

  // Flags
  const [flags, setFlags] = useState({
    selectedOption: props.selectedOption as Option | undefined,
    showDropDown: false,
    searchedTerm: "",
  });

  // Set the showDropDown state to false if clicked outside the parentRef.
  useClickOutside([parentRef], () => {
    setFlags((prev) => ({ ...prev, showDropDown: false, searchedTerm: "" }));
  });

  // Scroll to selected option
  useEffect(() => {
    if (flags.showDropDown && selectedOptionRef?.current) {
      selectedOptionRef?.current?.scrollIntoView({
        behavior: "instant",
        block: "nearest",
        inline: "nearest",
      });
    }
  }, [flags.showDropDown]);

  // Return JSX
  return (
    <div
      ref={parentRef}
      className={cn("drop-down-selector text-title", props.className)}
    >
      <div className="wrapper relative select-none h-full">
        {/* Dropdown Handler */}
        <div
          className="handler cursor-pointer h-full"
          title={props.pickerText ?? flags?.selectedOption?.name ?? "Select"}
          onClick={() =>
            !props.disableSelection &&
            setFlags((prev) => ({ ...prev, showDropDown: !prev.showDropDown }))
          }
        >
          {props.pickerComp ? (
            // If pickerComp is provided
            props.pickerComp(flags?.selectedOption)
          ) : (
            // If pickerComp is not provided
            <div
              className={cn(
                "handler h-full rounded-[1rem] flex items-center justify-between gap-[1rem] leading-[1] px-[1.4em] py-[1em] text-[1.5rem] border border-[#CECECE]/[50]",
                props.disableSelection &&
                  "opacity-50 pointer-events-none cursor-not-allowed"
              )}
            >
              {/* Heading */}
              <div className="heading line-clamp-1 leading-[1] font-semibold">
                {props.pickerText ?? flags?.selectedOption?.name ?? "Select"}
              </div>

              {/* Icon */}
              <i
                className={cn(
                  "icon transition ml-auto flex items-center justify-center",
                  flags?.showDropDown && "rotate-[180deg]"
                )}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 12 6"
                  fill="none"
                  className="aspect-[12/6] w-[1em] inline-block"
                >
                  <path
                    d="M10.9351 1.19984L6.8189 4.87438C6.33279 5.30833 5.53733 5.30833 5.05122 4.87438L0.935059 1.19984"
                    stroke="currentColor"
                    strokeWidth="0.862007"
                    strokeMiterlimit="10"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </i>
            </div>
          )}
        </div>

        {/* Dropdown Options */}
        {flags?.showDropDown && !props.disableSelection && (
          <div className="drop-down-options absolute -bottom-[1rem] right-0 translate-y-full border-l-[1.3rem] border-r-[0.8rem] border-y-[1.3rem] pr-[0.5rem] border-transparent flex flex-col bg-white/70 backdrop-blur-[35px] h-fit max-h-[50vh] w-[20rem] overflow-auto shadow-[0px_8px_28px_0px_rgba(0,0,0,0.12)] rounded-[1.4rem] text-[1.4rem] leading-[1] [--scrollbarWidth:0.5rem] z-[10]">
            {/* Render a Search Bar */}
            {props.showSearchBar && (
              <SearchBar
                className="z-[2] sticky rounded-[0.7rem] top-[0]"
                onSearch={(t) =>
                  setFlags((prev) => ({ ...prev, searchedTerm: t }))
                }
                placeholder="Search"
                onClear={() =>
                  setFlags((prev) => ({ ...prev, searchedTerm: "" }))
                }
              />
            )}

            {/* Options List*/}
            {
              <ul className="category-options flex flex-col">
                {props?.options?.map((option) => (
                  <li
                    ref={
                      flags?.selectedOption?.id === option.id
                        ? selectedOptionRef
                        : null
                    }
                    onClick={() =>
                      setFlags((prev) => {
                        // Run props.onSelect
                        if (option.id != flags?.selectedOption?.id) {
                          props?.onSelect?.(option);
                        }

                        // Return
                        return {
                          ...prev,
                          selectedOption: option,
                          showDropDown: !!props.noCloseOnSelect,
                          searchedTerm: "",
                        };
                      })
                    }
                    key={option.id}
                    className={cn(
                      "cursor-pointer relative leading-[120%] transition hover:bg-black/5 hover:rounded-[1rem] border-t border-[#343B3E]/10 first:border-t-0",
                      !option.customComp && "p-[1.4rem]",
                      flags?.searchedTerm &&
                        !option?.name
                          ?.toLowerCase()
                          ?.includes(flags?.searchedTerm?.toLowerCase()) &&
                        "hidden"
                    )}
                  >
                    {option.customComp ?? option.name}

                    {/* if Selected */}
                    {flags?.selectedOption?.id === option?.id && (
                      <i className="absolute selected-option-pill top-2/4 left-0 -translate-y-2/4 w-[0.3rem] h-[30%] rounded-[0.2rem] bg-primary"></i>
                    )}
                  </li>
                ))}
              </ul>
            }
          </div>
        )}
      </div>
    </div>
  );
};

export default DropDownSelector;
