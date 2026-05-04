import DefaultButton from "@/components/shared/DefaultButton";
import { AmazonEmber } from "@/utils/constants/constants";
import { Ionicons } from "@expo/vector-icons";
import { Link } from "expo-router";
import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

enum Steps {
  EMAIL = 1,
  PASSWORD = 2,
}

const SignIn = () => {
  const [selectedStep, setSelectedStep] = useState(Steps.PASSWORD);
  const [passwordVisible, setPasswordVisible] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");
  const onPressContinue = () => {};
  return (
    <View style={styles.mainContainer}>
      <Text style={styles.textTitle}>SignIn or Create an Account</Text>
      <View style={{ gap: 10 }}>
        {selectedStep === Steps.EMAIL ? (
          <>
            <Text style={styles.textLabel}>Email</Text>
            <TextInput
              value={email}
              onChangeText={setEmail}
              style={styles.inputStyle}
              placeholder="Enter email"
            />
          </>
        ) : (
          <>
            <Text style={styles.textLabel}>Password</Text>
            <View style={styles.passwordContainer}>
              <TextInput
                value={email}
                onChangeText={setEmail}
                placeholder="Enter Password"
                secureTextEntry={!passwordVisible}
                style={{ flex: 1 }}
              />
              <TouchableOpacity
                onPress={() => setPasswordVisible(!passwordVisible)}
              >
                <Ionicons
                  name={passwordVisible ? "eye-off-outline" : "eye-outline"}
                  size={22}
                  color="#888"
                />
              </TouchableOpacity>
            </View>
          </>
        )}
      </View>
      <DefaultButton
        variant="primary"
        onPress={onPressContinue}
        style={{ marginTop: 10 }}
      >
        Continue
      </DefaultButton>
      <Text style={{ textAlign: "center" }}>
        Don't have an account?{" "}
        <Link href={"/(auth)/signUp"} style={{ color: "#f8ab05ff" }}>
          Sign Up!
        </Link>
      </Text>
      <View style={{ flexDirection: "row", justifyContent: "center" }}>
        <Link
          href={"/(auth)/signUp"}
          style={{
            color: "rgb(17, 159, 211)",
            textDecorationLine: "underline",
          }}
        >
          Conditions
        </Link>
      </View>
    </View>
  );
};

export default SignIn;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: "white",
    padding: 20,
    gap: 10,
  },
  textTitle: {
    fontFamily: AmazonEmber,
    fontSize: 18,
  },
  textLabel: {
    fontFamily: AmazonEmber,
    fontSize: 16,
  },
  inputStyle: {
    borderWidth: 1,
    borderColor: "grey",
    borderRadius: 4,
    padding: 10,
  },
  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "grey",
    borderRadius: 4,
    paddingHorizontal: 5,
  },
});
