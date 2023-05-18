//This screen has UI and functionality of veriy email which comes under the alert box on dashboard

import {
  Text,
  View,
  Pressable,
  TextInput,
  Image,
  Alert,
  Linking,
  ScrollView,
} from "react-native";
import React, { useState, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import {
  updateEmailValidation,
  verifyToken,
} from "../redux/features/productApi";
import Spinner from "../components/Spinner";
import getEnvVars from "../config/enviroment";
import { styles } from "../Style/Style";

const VerifyEmail = () => {
  const dispatch = useDispatch();
  const { userInfoData, loading, verifyTokenData } = useSelector((state) => ({
    ...state.products,
  }));
  const { ERROR_ALERT_IMAGE } = getEnvVars();

  const navigation = useNavigation();
  const [open, setOpen] = useState(true);
  const [email, setEmail] = useState(userInfoData?.emailAddress);
  const [code, setCode] = useState();
  const [validEmail, setValidEmail] = useState(true);
  const [verifyTokenError, setVerifyTokenError] = useState(false);
  const [codeRequiredError, setCodeRequiredError] = useState(false);

  const openHandler = () => {
    setOpen((pre) => !pre);
  };
  function emailIsValid(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }
  const onChangeText = (value) => {
    setEmail(value);
    setValidEmail(emailIsValid(value));
  };
  const onChangeCode = (value) => {
    setCode(value);
    setCodeRequiredError(false);
    setVerifyTokenError(false);
  };
  const requestCodeHandler = async () => {
    const response = await dispatch(updateEmailValidation({ email: email }));
    if (response?.meta?.requestStatus === "fulfilled") {
      emptyCart();
    }
  };
  const verifyCodeHandler = () => {
    if (!code?.length) {
      setCodeRequiredError(true);
      return;
    }
    dispatch(verifyToken({ token: code }));
  };

  useEffect(() => {
    if (open) {
      setEmail(userInfoData?.emailAddress);
    }
  }, [open]);
  async function emptyCart(id) {
    Alert.alert(
      "ACCOUNT MANAGEMENT",
      "Verifcation Code has been sent your registered email address, Please verify your account",
      [{ text: "OK", onPress: () => null }]
    );
  }

  useEffect(() => {
    if (verifyTokenData === "error") {
      setVerifyTokenError(true);
      return;
    }
    if (!!verifyTokenData?.token) {
      Alert.alert(
        "ACCOUNT MANAGEMENT",
        "Verification code successfully verified",
        [{ text: "OK", onPress: () => navigation.navigate("DashBoard") }]
      );
    }
  }, [verifyTokenData]);

  return (
    <SafeAreaView
      style={{ backgroundColor: "#fff", flex: 1 }}
      edges={["right", "left", "bottom"]}
    >
      <ScrollView style={{ flex: 1 }}>
        {loading && <Spinner />}
        <View
          style={{
            marginTop: 15,
            justifyContent: "center",
            alignSelf: "center",
          }}
        >
          <Text style={{ fontSize: 25, fontWeight: "bold", color: "#494c4c" }}>
            Email Address Verification
          </Text>
        </View>
        <View
          style={{
            marginTop: 20,
            justifyContent: "center",
            alignSelf: "center",
            paddingHorizontal: 10,
          }}
        >
          <Text
            style={{
              color: "#494c4c",
            }}
          >
            Complete this two-step verification process to confirm your user
            email account or{" "}
            <Text
              onPress={() => navigation.navigate("DashBoard")}
              style={{ color: "#006ba6" }}
            >
              continue
            </Text>{" "}
            and verify your email later.
          </Text>
        </View>
        <View
          style={{
            margin: 10,
            borderColor: "#ececec",
            borderWidth: 1,
            padding: 10,
          }}
        >
          <Text style={{ color: "#006ba6", fontWeight: "700" }}>
            1. REQUEST VERIFICATION CODE
          </Text>
          <Text style={{ color: "#494c4c", paddingVertical: 10 }}>
            Click on the button below to send a verification code to the email
            address we have on file:
          </Text>
          <Text style={{ fontWeight: "700", color: "#494c4c" }}>
            {userInfoData?.emailAddress}
          </Text>
          <Text style={{ color: "#494c4c", paddingVertical: 10 }}>
            A verification code will be sent to this address from
            <Text style={{ fontWeight: "700" }}> info@andanet.com.</Text> This
            code will expire within 30 minutes.
          </Text>
          {open ? (
            <View>
              <View style={{ flexDirection: "row" }}>
                <Pressable
                  style={{
                    backgroundColor: "#006ba6",
                    paddingHorizontal: 10,
                    paddingVertical: 5,
                    borderRadius: 3,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                  onPress={() => {
                    requestCodeHandler();
                  }}
                >
                  <Text
                    style={{
                      fontSize: 12,
                      color: "#fff",
                      fontWeight: "bold",
                    }}
                  >
                    REQUEST CODE
                  </Text>
                </Pressable>
              </View>
              <Pressable
                style={{ paddingTop: 10 }}
                onPress={() => openHandler()}
              >
                <Text
                  style={{
                    fontSize: 12,
                    color: "#006ba6",
                  }}
                >
                  Use a different email address
                </Text>
              </Pressable>
            </View>
          ) : (
            <View>
              <View>
                <Text style={{ color: "#494c4c" }}>EMAIL ADDRESS*</Text>
              </View>
              <View style={styles.inputView}>
                <TextInput
                  style={styles.TextInput}
                  placeholderTextColor="#9d9b9b"
                  onChangeText={(value) => onChangeText(value)}
                />
              </View>
              {!validEmail ? (
                <View style={styles.errorView}>
                  <Image
                    style={{ height: 19, width: 18 }}
                    source={ERROR_ALERT_IMAGE}
                  />
                  <Text style={{ color: "#990909", marginHorizontal: 10 }}>
                    Email address is not valid.
                  </Text>
                </View>
              ) : null}
              <View style={{ flexDirection: "row" }}>
                <Pressable
                  style={styles.blueButton}
                  onPress={() => {
                    requestCodeHandler();
                  }}
                  disabled={!validEmail}
                >
                  <Text
                    style={{
                      fontSize: 12,
                      color: "#fff",
                      fontWeight: "bold",
                    }}
                  >
                    REQUEST CODE
                  </Text>
                </Pressable>
              </View>
              <Pressable
                style={{ paddingTop: 10 }}
                onPress={() => openHandler()}
              >
                <Text
                  style={{
                    fontSize: 12,
                    color: "#006ba6",
                  }}
                >
                  Use existing email address.
                </Text>
              </Pressable>
            </View>
          )}
        </View>
        <View
          style={{
            margin: 10,
            borderColor: "#ececec",
            borderWidth: 1,
            padding: 10,
          }}
        >
          <Text style={{ color: "#006ba6", fontWeight: "700" }}>
            2. ENTER VERIFICATION CODE
          </Text>
          <View style={{ marginTop: 10 }}>
            <View style={{ marginBottom: 10 }}>
              <Text style={{ color: "#494c4c" }}>VERIFICATION CODE*</Text>
            </View>
            <View style={styles.inputView}>
              <TextInput
                style={styles.TextInput}
                placeholderTextColor="#9d9b9b"
                onChangeText={(value) => onChangeCode(value)}
              />
            </View>
            {codeRequiredError ? (
              <View style={styles.errorView}>
                <Image
                  style={{ height: 19, width: 18 }}
                  source={ERROR_ALERT_IMAGE}
                />
                <Text style={{ color: "#990909", marginHorizontal: 10 }}>
                  Verification Code is required.
                </Text>
              </View>
            ) : null}
            {verifyTokenError ? (
              <View style={styles.errorView}>
                <Image
                  style={{ height: 19, width: 18 }}
                  source={ERROR_ALERT_IMAGE}
                />
                <Text style={{ color: "#990909", marginHorizontal: 5 }}>
                  Verification Code is invalid. Please try again.
                </Text>
              </View>
            ) : null}
          </View>
          <View style={{ flexDirection: "row" }}>
            <Pressable
              style={styles.blueButton}
              onPress={() => verifyCodeHandler()}
            >
              <Text
                style={{
                  fontSize: 12,
                  color: "#fff",
                  fontWeight: "bold",
                }}
              >
                VERIFY CODE
              </Text>
            </Pressable>
          </View>
          <Text style={{ color: "#494c4c", paddingVertical: 10 }}>
            <Text style={{ fontWeight: "700", color: "#494c4c" }}>
              Expired Code?
            </Text>{" "}
            Click the "Request Code" button again.
          </Text>
        </View>
        <View
          style={{
            margin: 10,
            borderColor: "#ececec",
            borderWidth: 1,
            padding: 10,
          }}
        >
          <Text
            style={{ fontWeight: "700", color: "#494c4c", paddingVertical: 10 }}
          >
            Have questions?
          </Text>
          <Text style={{ fontWeight: "700", color: "#494c4c", paddingTop: 10 }}>
            Tech Support
          </Text>
          <Text
            onPress={() => Linking.openURL(`tel:${18772632638}`)}
            style={{ fontWeight: "700", color: "#006ba6" }}
          >
            1-877-263-2638
          </Text>
          <Text style={{ fontWeight: "700", color: "#494c4c", paddingTop: 10 }}>
            Monday - Friday
          </Text>
          <Text style={{ color: "#494c4c" }}>8:30 a.m. to 9:00 p.m. ET</Text>
          <Text style={{ fontWeight: "700", color: "#494c4c", paddingTop: 10 }}>
            Saturdays
          </Text>
          <Text style={{ color: "#494c4c" }}>10:00 a.m. to 3:00 p.m. ET</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default VerifyEmail;
