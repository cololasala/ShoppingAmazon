import Toast from "react-native-toast-message";

export const showToastSuccess = (title: string, message?: string) => {
  Toast.show({
    type: "success",
    text1: title,
    text2: message,
    position: "bottom",
  });
};

export const showToastError = (title: string, message?: string) => {
  Toast.show({
    type: "error",
    text1: title,
    text2: message,
    position: "bottom",
  });
};

export const showToastInfo = (title: string, message?: string) => {
  Toast.show({
    type: "info",
    text1: title,
    text2: message,
    position: "bottom",
  });
};
