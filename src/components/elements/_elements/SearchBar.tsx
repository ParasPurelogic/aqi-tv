"use client";

import theme from "@/theme";
import cn from "@/utility/cn";
import debouncer from "@/utility/debouncer";
import { useCallback } from "react";

type Props = {
  className?: string;
  onSearch?: (term: string) => void;
  placeholder?: string;
  defaultText?: string;
  value?: string;
  onClear?: () => void;
  inputRef?: React.RefObject<HTMLInputElement>;
  disable?: boolean;
  autofocus?: boolean;
  minCharacters?: number;
};

const SearchBar = (props: Props) => {
  // Handle Search
  const handleSearch = (term: string) => {
    // Run props.onSearch
    if (
      props.onSearch &&
      (term.length == 0 || term.length > (props.minCharacters ?? 0))
    )
      props.onSearch(term);
  };

  // Debounced Search with stable reference
  // eslint-disable-next-line
  const debouncedSearch = useCallback(
    debouncer((term: string) => handleSearch(term), 500),
    [handleSearch]
  );

  // Return JSX
  return (
    <div
      className={cn(
        `search-bar h-fit flex gap-[1rem] items-center border border-[#E6E6E6] dark:border-dark_bg focus-within:border-primary bg-[#F7F7FC] dark:bg-[#2B3138] rounded-[1rem] p-[0.5rem]`,
        props.className
      )}
    >
      <i className="icon relative bg-white dark:bg-dark_bg text-title dark:text-dark_title rounded-[0.5rem] aspect-[36/32] w-[5.5rem] sm:w-[4rem]">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[50%]"
          fill="none"
          viewBox="0 0 16 16"
        >
          <g
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.592"
            opacity="0.43"
          >
            <path d="M11.652 11.562l3.506 3.506M1.136 7.055a6.01 6.01 0 1012.02 0 6.01 6.01 0 00-12.02 0z"></path>
          </g>
        </svg>
      </i>
      <input
        type="search"
        disabled={props.disable}
        className={`${theme.input.commonStyling} leading-[1] bg-transparent placeholder-shown:truncate`}
        placeholder={props.placeholder ?? "Search"}
        defaultValue={props.defaultText ?? ""}
        onChange={(e) => debouncedSearch(e.target.value)}
        ref={props.inputRef}
        autoFocus={props.autofocus}
      />
    </div>
  );
};

export default SearchBar;
