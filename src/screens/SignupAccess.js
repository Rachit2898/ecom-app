//This screen has functionality and UI of user registration page

import {
  View,
  Text,
  Image,
  TextInput,
  Linking,
  Pressable,
  ScrollView,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { registerUser } from "../redux/features/authUser";
import { useDispatch } from "react-redux";
import getEnvVars from "../config/enviroment";
import { styles } from "../Style/Style";

const InputComponent = (props) => {
  const [show, setShow] = useState(true);

  const showPasswordHandler = (value) => {
    setShow((pre) => !pre);
  };
  const { EYE_OPEN_IMAGE, EYE_CLOSE_IMAGE, ERROR_ALERT_IMAGE } = getEnvVars();
  return (
    <View styles={{ paddingHorizontal: 10 }}>
      <Text style={styles.labelContainer}>{props.label}</Text>
      <View style={styles.inputView}>
        {props.passwordValue ? (
          <TextInput
            style={styles.TextInput}
            placeholderTextColor="#003f5c"
            secureTextEntry={show}
            onChangeText={props.onChangeText}
          />
        ) : (
          <TextInput
            style={styles.TextInput}
            placeholderTextColor="#003f5c"
            onChangeText={props.onChangeText}
          />
        )}
        {props.eye && (
          <Pressable
            style={{
              justifyContent: "center",
              margin: 10,
              paddingHorizontal: 10,
              borderRadius: 3,
            }}
            onPress={() => showPasswordHandler(2)}
          >
            {show ? (
              <Image
                style={{ height: 15, width: 18 }}
                source={EYE_OPEN_IMAGE}
              />
            ) : (
              <Image
                style={{ height: 15, width: 18 }}
                source={EYE_CLOSE_IMAGE}
              />
            )}
          </Pressable>
        )}
      </View>
      {props.error && (
        <View style={styles.errorView}>
          <Image style={{ height: 19, width: 18 }} source={ERROR_ALERT_IMAGE} />
          <Text style={{ color: "#990909", marginHorizontal: 10 }}>
            {props.errorMessage}
          </Text>
        </View>
      )}
      {props.strongPasswordError && (
        <View style={styles.errorView}>
          <Image style={{ height: 19, width: 18 }} source={ERROR_ALERT_IMAGE} />
          <Text style={{ color: "#990909", marginHorizontal: 10 }}>
            {props.strongErrorMessage}
          </Text>
        </View>
      )}
      {props.matchError && (
        <View style={styles.errorView}>
          <Image style={{ height: 19, width: 18 }} source={ERROR_ALERT_IMAGE} />
          <Text style={{ color: "#990909", marginHorizontal: 10 }}>
            {props.matchErrorMessage}
          </Text>
        </View>
      )}
    </View>
  );
};

const SignUpAccess = (props) => {
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const [confirmPassword, setConfirmPassword] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [license, setLicense] = useState("");
  const [email, setEmail] = useState("");
  const [userName, setUserName] = useState("");
  const [nameLastName, setNameLastName] = useState("");
  const [error, setError] = useState(false);
  const navigation = useNavigation();
  const [isAccountNumberError, setIsAccountNumberError] = useState(false);
  const [isPasswordError, setIsPasswordError] = useState(false);
  const [isConfirmPasswordError, setIsConfirmPasswordError] = useState(false);
  const [isEmailError, setIsEmailError] = useState(false);
  const [isNameLastNameError, setIsNameLastNameError] = useState(false);
  const [strongPasswordError, setStrongPasswordError] = useState(false);
  const [strongConfirmPasswordError, setStrongConfirmPasswordError] =
    useState(false);

  function checkPassword(str) {
    var re = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{6,64}$/;
    return re.test(str);
  }

  const submitHandler = () => {
    if (!accountNumber.length) {
      setIsAccountNumberError(true);
    } else if (!password.length) {
      setIsPasswordError(true);
    } else if (!checkPassword(password)) {
      setStrongPasswordError(true);
      return;
    } else if (!checkPassword(confirmPassword)) {
      setStrongConfirmPasswordError(true);
      return;
    } else if (!confirmPassword.length) {
      setIsConfirmPasswordError(true);
    } else if (!email.length) {
      setIsEmailError(true);
    } else if (!nameLastName.length) {
      setIsNameLastNameError(true);
    } else if (password != confirmPassword) {
      setError(true);
      return;
    } else {
      dispatch(
        registerUser({
          accountNumber: accountNumber,
          password: password,
          confirmPassword: confirmPassword,
          license: license,
          email: email,
          userName: userName,
          nameLastName: nameLastName,
        })
      );
    }
  };
  const accountNumberHandler = async (value) => {
    setAccountNumber(value);
    setIsAccountNumberError(false);
    setIsPasswordError(false);
    setIsConfirmPasswordError(false);
    setIsEmailError(false);
    setIsNameLastNameError(false);
    setStrongPasswordError(false);
    setStrongConfirmPasswordError(false);
    setError(false);
  };

  const emailHandler = async (value) => {
    setEmail(value);
    setIsAccountNumberError(false);
    setIsPasswordError(false);
    setIsConfirmPasswordError(false);
    setIsEmailError(false);
    setIsNameLastNameError(false);
    setStrongPasswordError(false);
    setStrongConfirmPasswordError(false);
    setError(false);
  };
  const licenseHandler = async (value) => {
    setLicense(value);
    setIsAccountNumberError(false);
    setIsPasswordError(false);
    setIsConfirmPasswordError(false);
    setIsEmailError(false);
    setIsNameLastNameError(false);
    setStrongPasswordError(false);
    setStrongConfirmPasswordError(false);
    setError(false);
  };
  const userNameHandler = async (value) => {
    setUserName(value);
    setIsAccountNumberError(false);
    setIsPasswordError(false);
    setIsConfirmPasswordError(false);
    setIsEmailError(false);
    setIsNameLastNameError(false);
    setStrongPasswordError(false);
    setStrongConfirmPasswordError(false);
    setError(false);
  };
  const passwordHandler = (value) => {
    setPassword(value);
    setIsAccountNumberError(false);
    setIsPasswordError(false);
    setIsConfirmPasswordError(false);
    setIsEmailError(false);
    setIsNameLastNameError(false);
    setStrongPasswordError(false);
    setStrongConfirmPasswordError(false);
    setError(false);
  };
  const confirmPasswordHandler = (value) => {
    setConfirmPassword(value);
    setIsAccountNumberError(false);
    setIsPasswordError(false);
    setIsConfirmPasswordError(false);
    setIsEmailError(false);
    setIsNameLastNameError(false);
    setStrongPasswordError(false);
    setStrongConfirmPasswordError(false);
    setError(false);
  };

  const accountNameHandler = (value) => {
    setNameLastName(value);
    setIsAccountNumberError(false);
    setIsPasswordError(false);
    setIsConfirmPasswordError(false);
    setIsEmailError(false);
    setIsNameLastNameError(false);
    setStrongPasswordError(false);
    setStrongConfirmPasswordError(false);
    setError(false);
  };
  const { LOGO_IMAGE, apiUrl } = getEnvVars();
  return (
    <SafeAreaView
      style={{ backgroundColor: "#063e63", flex: 1 }}
      edges={["right", "left"]}
    >
      <View style={{ flex: 1, backgroundColor: "#fff" }}>
        <View style={{ paddingVertical: 20 }}>
          <Pressable onPress={() => navigation.navigate("Login")}>
            <Image style={styles.LogoImage} source={LOGO_IMAGE} />
          </Pressable>
          <View
            style={{
              marginTop: 10,
              justifyContent: "center",
              alignSelf: "center",
            }}
          >
            <Text
              style={{ fontSize: 25, fontWeight: "bold", color: "#494c4c" }}
            >
              User Registration
            </Text>
          </View>
          <View
            style={{
              marginTop: 20,
              justifyContent: "center",
              alignSelf: "center",
            }}
          >
            <Text
              style={{
                textAlign: "center",
                color: "#494c4c",
              }}
            >
              Complete the form below to register for online access. If your
              account already has active online users please call 1-800-331-2632
              for assistance registering new users.
            </Text>
          </View>
        </View>

        <ScrollView>
          <View>
            <View
              style={{
                marginHorizontal: 10,
              }}
            >
              <InputComponent
                eye={false}
                label="ANDA ACCOUNT NUMBER / SHIP-TO NUMBER*"
                onChangeText={(value) => {
                  accountNumberHandler(value);
                }}
                error={isAccountNumberError}
                errorMessage={
                  "Anda Account Number / Ship-To Number is required."
                }
              />
            </View>
            <View
              style={{
                marginHorizontal: 10,
              }}
            >
              <InputComponent
                onChangeText={(value) => {
                  accountNameHandler(value);
                }}
                eye={false}
                label="FIRST NAME AND LAST NAME*"
                error={isAccountNumberError}
                errorMessage={" First Name and Last Name is required."}
              />
            </View>
            <View
              style={{
                marginHorizontal: 10,
              }}
            >
              <InputComponent
                onChangeText={(value) => {
                  emailHandler(value);
                }}
                eye={false}
                label="EMAIL ADDRESS*"
                error={isEmailError}
                errorMessage={" Email Address is required."}
              />
            </View>
            <View
              style={{
                marginHorizontal: 10,
              }}
            >
              <InputComponent
                onChangeText={(value) => {
                  licenseHandler(value);
                }}
                eye={false}
                label="STATE LICENSE NUMBER"
              />
            </View>
            <View
              style={{
                marginHorizontal: 10,
              }}
            >
              <InputComponent
                onChangeText={(value) => {
                  userNameHandler(value);
                }}
                eye={false}
                label="USERNAME*"
                error={isNameLastNameError}
                errorMessage={"Username is required."}
              />
            </View>
            <View
              style={{
                marginHorizontal: 10,
              }}
            >
              <InputComponent
                onChangeText={(value) => {
                  passwordHandler(value);
                }}
                eye={true}
                label="PASSWORD*"
                passwordValue={true}
                error={isPasswordError}
                errorMessage={"Password is required."}
                strongPasswordError={strongPasswordError}
                strongErrorMessage={"Strong password is required."}
              />
            </View>
            <View
              style={{
                marginHorizontal: 10,
              }}
            >
              <InputComponent
                onChangeText={(value) => {
                  confirmPasswordHandler(value);
                }}
                eye={true}
                label="CONFIRM PASSWORD*"
                passwordValue={true}
                error={isConfirmPasswordError}
                errorMessage={"Confirm Password is required."}
                strongPasswordError={strongConfirmPasswordError}
                strongErrorMessage={"Strong password is required."}
                matchError={error}
                matchErrorMessage={"Password does not match."}
              />
            </View>
            <View>
              <View
                style={{
                  flexDirection: "row",
                  marginTop: 20,
                  alignSelf: "center",
                  marginHorizontal: 10,
                }}
              >
                <Pressable
                  android_ripple={{ color: "#ccc" }}
                  style={styles.loginBtn}
                  onPress={() => submitHandler()}
                >
                  <Text style={styles.loginText}>REGISTER</Text>
                </Pressable>
              </View>
            </View>
          </View>
        </ScrollView>

        <View
          style={{
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "#063e63",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "row",
          }}
        >
          <Text
            style={{
              color: "#fff",
              fontSize: 10,
              fontWeight: "800",
              paddingBottom: 20,
              paddingTop: 10,
            }}
          >
            Anda Inc. All Rights Reserved |{" "}
          </Text>
          <Text
            style={{
              color: "#fff",
              fontSize: 10,
              fontWeight: "800",
              paddingBottom: 20,
              paddingTop: 10,
            }}
            onPress={() => Linking.openURL(`${apiUrl}/content/terms-of-use`)}
          >
            Terms of Use |{" "}
          </Text>
          <Text
            style={{
              color: "#fff",
              fontSize: 10,
              fontWeight: "800",
              paddingBottom: 20,
              paddingTop: 10,
            }}
            onPress={() => Linking.openURL(`${apiUrl}/content/privacy-policy`)}
          >
            Privacy Policy
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default SignUpAccess;
