//This is Login screen

import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { signin, authTokenChanged } from "../redux/features/authUser";
import { SafeAreaView } from "react-native-safe-area-context";
import Spinner from "../components/Spinner";
import getEnvVars from "../config/enviroment";
import {
  Text,
  View,
  Image,
  TextInput,
  Pressable,
  KeyboardAvoidingView,
  Linking,
} from "react-native";
import { styles } from "../Style/Style";

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(true);
  const [credentialsError, setCredentialsError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [loginError, setLoginError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [nullValue, setNullValue] = useState(false);
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  async function Signin() {
    return dispatch(signin({ email, password }));
  }

  async function setToken(token) {
    await AsyncStorage.setItem("token", token);
  }

  const isValidPassword = (val) =>
    val.toString().length >= 6 && val.match(/^[a-zA-Z0-9!@#$%^&*]{6,64}$/);

  //This function handles the submit request
  async function submitHandler() {
    setIsAuthenticating(true);
    if (!email.length) {
      setCredentialsError(true);
      setIsAuthenticating(false);
      return;
    } else if (!password.length) {
      setIsAuthenticating(false);
      setPasswordError(true);
      return;
    } else {
      const tokenValue = await Signin();
      if (tokenValue?.payload?.token) {
        setIsAuthenticating(false);
        setToken(tokenValue?.payload?.token);
        dispatch(authTokenChanged(tokenValue?.payload?.token));
        return;
      }
      if (tokenValue?.payload?.level === "ERROR") {
        setLoginError(true);
        setCredentialsError(false);
        setIsAuthenticating(false);
        setPasswordError(false);
        setErrorMessage(tokenValue?.payload?.message);
        return;
      }
    }

    //if request fullfilled then this function helps in to stop the loading

    //if request rejected then this function helps show error
  }

  //eye open/close function
  const showPasswordHandler = (value) => {
    setShow((pre) => !pre);
  };

  //This function removes the error component
  const passwordHandler = (value) => {
    setPassword(value);
    setCredentialsError(false);
    setLoginError(false);
    setPasswordError(false);
  };
  const emailHandler = (value) => {
    setEmail(value);
    setCredentialsError(false);
    setLoginError(false);
    setPasswordError(false);
  };
  const {
    LOGO_IMAGE,
    ERROR_ALERT_IMAGE,
    EYE_OPEN_IMAGE,
    EYE_CLOSE_IMAGE,
    apiUrl,
  } = getEnvVars();

  return (
    <>
      <SafeAreaView
        style={styles.safeAreaView}
        edges={["right", "left", "top"]}
      >
        <View style={styles.mainBox}>
          <View style={styles.loginContainerBox}>
            {!isAuthenticating ? (
              <KeyboardAvoidingView style={styles.loginContainer}>
                <Image style={styles.LogoImage} source={LOGO_IMAGE} />
                <View style={styles.signInBox}>
                  <Text style={styles.signInText}>
                    Sign in to your account{" "}
                  </Text>
                </View>
                <View style={styles.loginMainBox}>
                  {loginError && (
                    <View style={styles.errorView}>
                      <Image
                        style={[
                          styles.alertImage,
                          {
                            marginLeft: 10,
                          },
                        ]}
                        source={ERROR_ALERT_IMAGE}
                      />
                      <Text
                        style={[
                          styles.errorMessage,
                          { flex: 1, flexWrap: "wrap" },
                        ]}
                      >
                        {errorMessage}
                      </Text>
                    </View>
                  )}
                  <Text style={styles.labelContainer}>USERNAME*</Text>
                  <View style={styles.inputView}>
                    <TextInput
                      style={styles.TextInput}
                      placeholderTextColor="#003f5c"
                      onChangeText={(email) => emailHandler(email)}
                    />
                  </View>
                  {credentialsError && (
                    <View style={styles.errorView}>
                      <Image
                        style={styles.alertImage}
                        source={ERROR_ALERT_IMAGE}
                      />
                      <Text style={styles.errorMessage}>
                        Username is required.
                      </Text>
                    </View>
                  )}
                  <Text style={styles.labelContainer}>PASSWORD*</Text>
                  <View style={styles.inputView}>
                    <TextInput
                      style={styles.TextInput}
                      placeholderTextColor="#003f5c"
                      secureTextEntry={show}
                      onChangeText={(password) => passwordHandler(password)}
                      returnKeyType="done"
                      onSubmitEditing={() => submitHandler()}
                      autoCapitalize="none"
                    />
                    <Pressable
                      style={styles.eyeButton}
                      onPress={() => showPasswordHandler(2)}
                    >
                      {show ? (
                        <Image
                          style={{ height: 15, width: 18 }}
                          source={EYE_CLOSE_IMAGE}
                        />
                      ) : (
                        <Image
                          style={{ height: 15, width: 18 }}
                          source={EYE_OPEN_IMAGE}
                        />
                      )}
                    </Pressable>
                  </View>
                  {passwordError && (
                    <View style={styles.errorView}>
                      <Image
                        style={{ height: 19, width: 18 }}
                        source={ERROR_ALERT_IMAGE}
                      />
                      <Text style={styles.errorMessage}>
                        Password is required.
                      </Text>
                    </View>
                  )}
                  <View>
                    <View style={{ flexDirection: "row", marginTop: 20 }}>
                      <Pressable
                        android_ripple={{ color: "#ccc" }}
                        style={styles.loginBtn}
                        onPress={() => submitHandler()}
                      >
                        <Text style={styles.loginText}>SIGN IN</Text>
                      </Pressable>
                    </View>
                  </View>
                </View>
                <View style={styles.forgotContainer}>
                  <View style={{ flexDirection: "row" }}>
                    <Text style={[styles.BlackTextColor, styles.FontWeight700]}>
                      Forgot
                    </Text>
                    <Text
                      style={styles.userAndPasswordHeading}
                      onPress={() => navigation.navigate("ForgotPassword")}
                    >
                      Password
                    </Text>
                    <Text style={[styles.BlackTextColor, styles.FontWeight700]}>
                      or
                    </Text>
                    <Text
                      style={styles.userAndPasswordHeading}
                      onPress={() => navigation.navigate("ForgotUser")}
                    >
                      Username
                    </Text>
                  </View>
                  <View style={{ marginTop: 15 }}>
                    <Text
                      style={[styles.BlueTextColor, styles.FontWeight700]}
                      onPress={() => navigation.navigate("SignUpAccess")}
                    >
                      Sign up for online access
                    </Text>
                  </View>
                </View>
              </KeyboardAvoidingView>
            ) : (
              <View>
                <Spinner />
              </View>
            )}
          </View>

          <View style={styles.footerBox}>
            <Text style={styles.footerText}>
              Anda Inc. All Rights Reserved |{" "}
            </Text>
            <Text
              style={styles.footerText}
              onPress={() => Linking.openURL(`${apiUrl}/content/terms-of-use`)}
            >
              Terms of Use |{" "}
            </Text>
            <Text
              style={styles.footerText}
              onPress={() =>
                Linking.openURL(`${apiUrl}/content/privacy-policy`)
              }
            >
              Privacy Policy
            </Text>
          </View>
        </View>
      </SafeAreaView>
    </>
  );
}
