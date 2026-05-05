import DefaultButton from "@/components/shared/DefaultButton";
import OtpNumInput from "@/components/shared/Screen/OtpNumInput";
import { supabase } from "@/lib/supabase";
import { AmazonEmber, AmazonEmberLight } from "@/utils/constants/constants";
import { Ionicons } from "@expo/vector-icons";
import { Link, router } from "expo-router";
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

enum Step {
  "EMAIL" = 1,
  "OTP" = 2,
  "PASSWORD" = 3,
}

const SignUp = () => {
  const [selectedStep, setSelectedStep] = useState(Step.EMAIL);
  const [passwordVisible, setPasswordVisible] = useState<boolean>(false);
  const [otp, setOtp] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const sendOtp = async () => {
    const { data, error } = await supabase.auth.signInWithOtp({
      email,
    });
    if (error) {
      console.warn(error);
    }
  };

  const register = async () => {
    try {
      if (!otp) return;
      const { data: verifyData, error: verifyError } =
        await supabase.auth.verifyOtp({
          email,
          token: otp,
          type: "email",
        });
      if (verifyError) {
        console.error("OTP verification faild:", verifyError.message);
      }
      const { data: updateData, error: updateError } =
        await supabase.auth.updateUser({
          password,
        });
      if (updateError) {
        console.error("Password update failed:", updateError.message);
        return;
      }
      router.replace("/(tabs)");
    } catch (err) {
      console.error("Registration failed:", err);
    }
  };
  return (
    <>
      <View style={styles.mainContainer}>
        <Text style={styles.textTitle}>
          {selectedStep === Step.EMAIL
            ? "Create an account"
            : selectedStep === Step.OTP
              ? "Set your otp"
              : "Set your password"}
        </Text>
        <View style={{ gap: 10 }}>
          {selectedStep === Step.EMAIL ? (
            <>
              <Text style={styles.textLabel}>Email</Text>
              <TextInput
                value={email}
                onChangeText={setEmail}
                style={styles.inputStyle}
                placeholder="Enter email"
              />
            </>
          ) : selectedStep === Step.OTP ? (
            <>
              <OtpNumInput onTextChange={setOtp} />
              {!otp && (
                <Text
                  style={{
                    alignSelf: "center",
                    fontSize: 14,
                    fontFamily: AmazonEmberLight,
                  }}
                >
                  Please fill the OTP
                </Text>
              )}
            </>
          ) : (
            <>
              <View>
                <Pressable onPress={() => setSelectedStep(Step.EMAIL)}>
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
          onPress={() => {
            if (selectedStep === Step.EMAIL) {
              sendOtp();
              setSelectedStep(Step.OTP);
            } else if (selectedStep === Step.OTP) {
              setSelectedStep(Step.PASSWORD);
            } else if (selectedStep === Step.PASSWORD) {
              register();
            }
          }}
          disabled={email.length < 5}
          style={{ marginTop: 10 }}
        >
          {selectedStep === Step.EMAIL || selectedStep === Step.OTP
            ? "Continue"
            : "Sign up"}
        </DefaultButton>
        <Text style={{ textAlign: "center" }}>
          Already have an account?{" "}
          <Link href={"/(auth)/signIn"} style={{ color: "#f8ab05ff" }}>
            Sign In!
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

export default SignUp;

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
