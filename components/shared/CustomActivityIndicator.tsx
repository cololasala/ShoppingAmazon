import React from "react";
import { ActivityIndicator } from "react-native";

interface CustomActivityIndicatorProps {
  size?: number;
}

const CustomActivityIndicator = ({
  size = 34,
}: CustomActivityIndicatorProps) => {
  return (
    <ActivityIndicator
      size={size}
      color="#f8ab05ff"
      style={{ marginTop: 20 }}
    ></ActivityIndicator>
  );
};

export default CustomActivityIndicator;
