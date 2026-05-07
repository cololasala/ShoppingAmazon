import { useContext } from "react";
import { CustomModalContext } from "./CustomModalProvider";

export const useCustomModal = () => {
  const context = useContext(CustomModalContext);
  if (!context) {
    throw new Error("useCustomModal should use inside CustomModalProvider");
  }
  return context;
};
