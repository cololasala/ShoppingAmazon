import { AmazonEmber } from "@/utils/constants/constants";
import React, { createContext, ReactNode, useState } from "react";
import { Text, View } from "react-native";
import Modal from "react-native-modal";

interface CustomModalContextType {
  showModal: (title: string, content: ReactNode) => void;
  hideModal: () => void;
}

export const CustomModalContext = createContext<
  CustomModalContextType | undefined
>(undefined);

export const CustomModalProvider = ({ children }: { children: ReactNode }) => {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [modalConfig, setModalConfig] = useState<{
    title: string;
    content: ReactNode;
  }>({
    title: "",
    content: null,
  });

  const showModal = (title: string, content: ReactNode) => {
    setModalConfig({ title, content });
    setIsVisible(true);
  };

  const hideModal = () => setIsVisible(false);

  return (
    <CustomModalContext.Provider value={{ showModal, hideModal }}>
      {children}

      <Modal
        isVisible={isVisible}
        onBackdropPress={hideModal}
        onBackButtonPress={hideModal}
        animationIn="fadeInUp"
        useNativeDriver={true}
        hideModalContentWhileAnimating={true}
        backdropTransitionOutTiming={0}
      >
        <View
          style={{ backgroundColor: "white", padding: 20, borderRadius: 12 }}
        >
          <Text
            style={{ fontSize: 18, fontFamily: AmazonEmber, marginBottom: 10 }}
          >
            {modalConfig.title}
          </Text>
          <View style={{ marginBottom: 20 }}>{modalConfig.content}</View>
        </View>
      </Modal>
    </CustomModalContext.Provider>
  );
};
