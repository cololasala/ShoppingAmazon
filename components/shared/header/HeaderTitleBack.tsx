import { AmazonEmberBold } from "@/utils/constants/constants";
import Icon from "@expo/vector-icons/MaterialIcons";
import { Pressable, Text } from "react-native";

interface HeaderTitleBackProps {
  onPress: () => void;
}

export function HeaderTitle() {
  return (
    <Text style={{ fontSize: 18, fontFamily: AmazonEmberBold }}>Amazon.in</Text>
  );
}

export function HeaderLeftBack({ onPress }: HeaderTitleBackProps) {
  return (
    <Pressable onPress={onPress}>
      <Icon name="arrow-back" color={"black"} size={24} />
    </Pressable>
  );
}
