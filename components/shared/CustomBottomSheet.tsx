import Icon from "@expo/vector-icons/Ionicons";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import React, { forwardRef } from "react";
import { StyleSheet, View } from "react-native";

interface CustomBottomSheetProps {
  title: string;
  panDownClose: boolean;
  snapPoints?: string[];
  content: any;
}

type Ref = BottomSheet;

// eslint-disable-next-line react/display-name
const CustomBottomSheet = forwardRef<Ref, CustomBottomSheetProps>(
  (props, ref) => {
    const snapPoints = props.snapPoints || ["50%"];

    const onPressClose = () => {
      if (ref && typeof ref !== "function") {
        ref.current?.close();
      }
    };

    return (
      <BottomSheet
        ref={ref}
        index={-1}
        snapPoints={snapPoints}
        animateOnMount={true}
        handleIndicatorStyle={props.panDownClose ? {} : { display: "none" }}
        enablePanDownToClose={props.panDownClose}
        enableDynamicSizing={false}
      >
        <BottomSheetView style={styles.mainContainer}>
          <View style={{ flexDirection: "row", justifyContent: "flex-end" }}>
            <Icon
              name="close"
              color={"black"}
              size={24}
              onPress={onPressClose}
            />
          </View>
          <View style={styles.contentContainer}>{props.content}</View>
        </BottomSheetView>
      </BottomSheet>
    );
  },
);

export default CustomBottomSheet;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    paddingHorizontal: 20,
  },
  contentContainer: {},
});
