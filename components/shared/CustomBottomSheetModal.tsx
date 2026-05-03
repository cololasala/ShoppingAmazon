import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import React, { forwardRef } from "react";
import { StyleSheet, Text } from "react-native";

interface CustomBottomSheetModalProps {
  title: string;
  snapPoints?: string[];
}

type Ref = BottomSheetModal;

// eslint-disable-next-line react/display-name
const CustomBottomSheetModal = forwardRef<Ref, CustomBottomSheetModalProps>(
  (props, ref) => {
    const snapPoints = props.snapPoints || ["50%"];
    return (
      <BottomSheetModal
        ref={ref}
        index={0}
        snapPoints={snapPoints}
        animateOnMount={true}
        enablePanDownToClose={true}
        enableDynamicSizing={false}
        backdropComponent={(props) => (
          <BottomSheetBackdrop
            {...props}
            appearsOnIndex={0}
            disappearsOnIndex={-1}
            opacity={0.5}
          />
        )}
      >
        <BottomSheetView style={styles.contentContainer}>
          <Text>{props.title}</Text>
        </BottomSheetView>
      </BottomSheetModal>
    );
  },
);

export default CustomBottomSheetModal;

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    padding: 36,
    alignItems: "center",
  },
});
