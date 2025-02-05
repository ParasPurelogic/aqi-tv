"use client";

import { TypeUserInfo } from "@/types/misc";
import { ReactNode, createContext, useContext } from "react";

type ProviderProps = {
  children: ReactNode;
  userInfo: TypeUserInfo | undefined;
};

const UserInfoContext = createContext<TypeUserInfo | undefined>(undefined);

export function UserInfoProvider(props: ProviderProps) {
  // Get user Info;
  return (
    <UserInfoContext.Provider value={props.userInfo}>
      {props.children}
    </UserInfoContext.Provider>
  );
}

export const useUserInfo = () => {
  return useContext(UserInfoContext);
};
