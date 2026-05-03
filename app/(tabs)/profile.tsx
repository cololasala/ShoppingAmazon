import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import React, { useCallback, useRef, useState } from "react";
import { Button, StyleSheet, Text, View } from "react-native";

const Profile = () => {
  // ref
  const bottomSheetRef = useRef<BottomSheet>(null);

  const [open, setOpen] = useState<boolean>(false);
  // callbacks
  const handleSheetChanges = useCallback((index: number) => {
    console.log("handleSheetChanges", index);
  }, []);

  return (
    <View style={styles.container}>
      <Text>Profile</Text>
      <Button
        title="Open Bottom Sheet"
        onPress={() => bottomSheetRef.current?.expand()}
      />
      <BottomSheet
        ref={bottomSheetRef}
        index={-1}
        animateOnMount={true}
        enablePanDownToClose={true}
        enableDynamicSizing={true}
      >
        <BottomSheetView style={styles.contentContainer}>
          <Text>Awesome 🎉</Text>
        </BottomSheetView>
      </BottomSheet>
    </View>
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
