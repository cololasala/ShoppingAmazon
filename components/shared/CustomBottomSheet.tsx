import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import React, { forwardRef } from "react";
import { StyleSheet, Text } from "react-native";

interface CustomBottomSheetProps {
  title: string;
  snapPoints?: string[];
}

type Ref = BottomSheet;

// eslint-disable-next-line react/display-name
const CustomBottomSheet = forwardRef<Ref, CustomBottomSheetProps>(
  (props, ref) => {
    const snapPoints = props.snapPoints || ["50%"];
    return (
      <BottomSheet
        ref={ref}
        index={0}
        snapPoints={snapPoints}
        animateOnMount={true}
        enablePanDownToClose={true}
        enableDynamicSizing={true}
      >
        <BottomSheetView style={styles.contentContainer}>
          <Text>{props.title}</Text>
        </BottomSheetView>
      </BottomSheet>
    );
  },
);

export default CustomBottomSheet;

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    padding: 36,
    alignItems: "center",
  },
});
