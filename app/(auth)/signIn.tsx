import DefaultButton from "@/components/shared/DefaultButton";
import { AmazonEmber, AmazonEmberLight } from "@/utils/constants/constants";
import { Ionicons } from "@expo/vector-icons";
import { Link } from "expo-router";
import React, { useState } from "react";
import {
  Dimensions,
  Pressable,
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
  const [selectedStep, setSelectedStep] = useState(Steps.EMAIL);
  const [passwordVisible, setPasswordVisible] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const onPressContinue = () => {
    //TODO: Make show password if email is registered, if not then go to SignUp

    if (email === "pepe") {
      setSelectedStep(Steps.PASSWORD);
    }
  };
  return (
    <>
      <View style={styles.mainContainer}>
        <Text style={styles.textTitle}>SignIn</Text>
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
              <View>
                <Pressable onPress={() => setSelectedStep(Steps.EMAIL)}>
                  <Text
                    style={{
                      fontFamily: AmazonEmber,
                      fontSize: 15,
                      color: "rgb(17, 159, 211)",
                    }}
                  >
                    Go back to email
                  </Text>
                </Pressable>
                <Text style={styles.textLabel}>Password</Text>
              </View>

              <View style={styles.passwordContainer}>
                <TextInput
                  value={password}
                  onChangeText={setPassword}
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
                    style={styles.icon}
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
          {Steps.EMAIL === selectedStep ? "Continue" : "Sign In"}
        </DefaultButton>
        <Text style={{ textAlign: "center" }}>
          Don&apos;t have an account?{" "}
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
        <View style={styles.line}></View>

        <Text style={styles.copyRightText}>
          © 1996-2025, Amazon.in, Inc. or its affiliates
        </Text>
      </View>
    </>
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
    textAlign: "center",
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
  icon: {
    paddingEnd: 4,
  },
  line: {
    borderWidth: 1,
    borderColor: "lightgray",
    width: Dimensions.get("window").width,
    right: 20,
  },
  copyRightText: {
    color: "gray",
    fontSize: 14,
    fontFamily: AmazonEmberLight,
    textAlign: "center",
  },
});
