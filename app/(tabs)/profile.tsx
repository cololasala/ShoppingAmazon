import CustomBottomSheet from "@/components/shared/CustomBottomSheet";
import CustomBottomSheetModal from "@/components/shared/CustomBottomSheetModal";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import React, { useCallback, useRef, useState } from "react";
import { Button, StyleSheet, Text, View } from "react-native";

const Profile = () => {
  // ref
  const bottomSheetRef = useRef<BottomSheetModal>(null);

  const [open, setOpen] = useState<boolean>(false);
  // callbacks
  const handleSheetChanges = useCallback((index: number) => {
    console.log("handleSheetChanges", index);
  }, []);

  const bottomSheetRef2 = useRef<BottomSheetModal>(null);

  return (
    <>
      <View style={styles.container}>
        <Text>Profile</Text>
        <Button
          title="Open Bottom Sheet"
          onPress={() => bottomSheetRef.current?.present()}
        />
        <Button
          title="Open Bottom Sheet"
          onPress={() => bottomSheetRef2.current?.expand()}
        />
        <CustomBottomSheet
          title={"Awesome"}
          panDownClose={false}
          ref={bottomSheetRef2}
          content={<Text>Awesome s</Text>}
        ></CustomBottomSheet>
      </View>

      <CustomBottomSheetModal
        title={"Awesome"}
        panDownClose={true}
        ref={bottomSheetRef}
        content={<Text>Awesome 🎉</Text>}
      ></CustomBottomSheetModal>
    </>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    flex: 1,
    padding: 36,
    alignItems: "center",
  },
});
