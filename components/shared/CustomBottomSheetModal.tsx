import Icon from "@expo/vector-icons/Ionicons";
import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import React, { forwardRef } from "react";
import { StyleSheet, View } from "react-native";
interface CustomBottomSheetModalProps {
  title: string;
  panDownClose: boolean;
  snapPoints?: string[];
  content: any;
}

type Ref = BottomSheetModal;

// eslint-disable-next-line react/display-name
const CustomBottomSheetModal = forwardRef<Ref, CustomBottomSheetModalProps>(
  (props, ref) => {
    const snapPoints = props.snapPoints || ["50%"];

    const onPressClose = () => {
      if (ref && typeof ref !== "function") {
        ref.current?.close();
      }
    };

    return (
      <BottomSheetModal
        ref={ref}
        index={0}
        snapPoints={snapPoints}
        animateOnMount={true}
        handleIndicatorStyle={props.panDownClose ? {} : { display: "none" }}
        enablePanDownToClose={props.panDownClose}
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
      </BottomSheetModal>
    );
  },
);

export default CustomBottomSheetModal;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    paddingHorizontal: 20,
  },
  contentContainer: {
    alignItems: "center",
  },
});
