"use client";
import { storeRedux } from "@/redux/store";
import React from "react";
import { Provider } from "react-redux";

const ReduxProvider = ({ children }: { children: React.ReactNode }) => {
  return <Provider store={storeRedux}>{children}</Provider>;
};

export default ReduxProvider;
