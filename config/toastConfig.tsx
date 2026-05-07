import { AmazonEmber } from "@/utils/constants/constants";
import {
  BaseToastProps,
  ErrorToast,
  InfoToast,
  SuccessToast
} from "react-native-toast-message";

export const toastConfig = {
  success: (props: BaseToastProps) => (
    <SuccessToast
      {...props}
      contentContainerStyle={{ paddingHorizontal: 15 }}
      text1Style={{
        fontSize: 16,
        fontFamily: AmazonEmber,
      }}
      text2Style={{
        fontSize: 14,
        fontFamily: AmazonEmber,
      }}
    />
  ),
  error: (props: BaseToastProps) => (
    <ErrorToast
      {...props}
      contentContainerStyle={{ paddingHorizontal: 15 }}
      text1Style={{
        fontSize: 16,
        fontFamily: AmazonEmber,
      }}
      text2Style={{
        fontSize: 14,
        fontFamily: AmazonEmber,
      }}
    />
  ),
  info: (props: BaseToastProps) => (
    <InfoToast
      {...props}
      contentContainerStyle={{ paddingHorizontal: 15 }}
      text1Style={{
        fontSize: 16,
        fontFamily: AmazonEmber,
      }}
      text2Style={{
        fontSize: 14,
        fontFamily: AmazonEmber,
      }}
    />
  ),
};
