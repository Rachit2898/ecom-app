import { Alert, StyleSheet } from "react-native";
import React, { useState, useEffect } from "react";
import ForgotScreen from "../components/ForgotScreen";
import { resetPassword, removeUrls } from "../redux/features/authUser";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";

const ResetPassword = (props) => {
  const [code, setCode] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [codeError, setCodeError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [confirmPasswordError, setConfirmPasswordError] = useState(false);
  const [passwordMatchError, setPasswordMatchError] = useState(false);
  const [strongPasswordError, setStrongPasswordError] = useState(false);
  const dispatch = useDispatch();
  const navigation = useNavigation();
  // resetPasswordData

  const { resetPasswordData } = useSelector((state) => ({
    ...state.auth,
  }));
  const resetHandler = () => {
    setCode("");
    setPassword("");
    setConfirmPassword("");
    dispatch(removeUrls());
  };
  const successHandler = () => {
    dispatch(removeUrls());
    navigation.navigate("Login");
  };

  useEffect(() => {
    if (resetPasswordData?.validations?.length > 0) {
      if (resetPasswordData?.validations[0]?.level) {
        Alert.alert("ERROR", `${resetPasswordData?.validations[0]?.message}`, [
          { text: "OK", onPress: () => resetHandler() },
        ]);
      }
    }
    if (resetPasswordData === "success") {
      Alert.alert("SUCCESS", "Your password has been reset", [
        { text: "OK", onPress: () => successHandler() },
      ]);
    }
  }, [resetPasswordData]);
  function checkPassword(str) {
    var re = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{6,64}$/;
    return re.test(str);
  }

  const submitHandler = () => {
    if (!code.length) {
      setCodeError(true);
      return;
    } else if (!password.length) {
      setPasswordError(true);
      return;
    } else if (!checkPassword(password)) {
      setStrongPasswordError(true);
      return;
    } else if (!confirmPassword.length) {
      setConfirmPasswordError(true);
      return;
    } else if (password != confirmPassword) {
      setPasswordMatchError(true);
      return;
    } else {
      dispatch(resetPassword({ password: password, token: code }));
    }
  };
  const codeHandler = (value) => {
    setCode(value);
    setCodeError(false);
    setPasswordMatchError(false);
  };
  const passwordHandler = (value) => {
    setPassword(value);
    setPasswordError(false);
    setPasswordMatchError(false);
    setStrongPasswordError(false);
  };
  const confirmPasswordHandler = (value) => {
    setConfirmPassword(value);
    setConfirmPasswordError(false);
    setPasswordMatchError(false);
    setStrongPasswordError(false);
  };
  return (
    <ForgotScreen
      heading="Reset Password"
      message="Please check your email for instructions on how to reset your password"
      subHeading="Reset Password"
      onPress={() => submitHandler()}
      onChangeTextFirst={(value) => codeHandler(value)}
      onChangeTextSecond={(value) => passwordHandler(value)}
      onChangeTextThird={(value) => confirmPasswordHandler(value)}
      placeholder="Verification code*"
      placeholder2="Password"
      placeholder3="Confirm Password"
      error={codeError}
      errorMessage={"Verification Code is required."}
      passwordError={passwordError}
      passwordErrorMessage={"Password is required."}
      confirmPasswordError={confirmPasswordError}
      confirmPasswordErrorMessage={"Confirm Password is required."}
      passwordMatchError={passwordMatchError}
      passwordMatchErrorMessage={"Passwords must match."}
      strongPasswordError={strongPasswordError}
      strongPasswordErrorMessage={"Strong password is required."}
    />
  );
};

export default ResetPassword;

const styles = StyleSheet.create({});
