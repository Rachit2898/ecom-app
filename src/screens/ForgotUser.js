import { Button, Alert } from "react-native";
import React, { useState, useRef, useCallback, useEffect } from "react";
import ForgotScreen from "../components/ForgotScreen";
import Recaptcha from "react-native-recaptcha-that-works";
import { forgotUser, removeUrls } from "../redux/features/authUser";
import { useDispatch, useSelector } from "react-redux";
import getEnvVars from "../config/enviroment";

const ForgotPassword = (props) => {
  const [isError, setIsError] = useState(false);
  const [isValidError, setIsValidError] = useState(false);
  const { apiUrl } = getEnvVars();
  const [password, setPassword] = useState();
  const dispatch = useDispatch();
  const size = "normal";
  const $recaptcha = useRef();

  const handleOpenPress = useCallback(() => {
    $recaptcha.current.open();
  }, []);

  const handleClosePress = useCallback(() => {
    $recaptcha.current.close();
  }, []);
  const { forgotUserData } = useSelector((state) => ({
    ...state.auth,
  }));

  const resetHandler = () => {
    dispatch(removeUrls());
  };

  useEffect(() => {
    if (forgotUserData?.validations?.length > 0) {
      if (forgotUserData?.validations[0]?.level) {
        Alert.alert("ERROR", `${forgotUserData?.validations[0]?.message}`, [
          { text: "OK", onPress: () => resetHandler() },
        ]);
      }
    }
    if (forgotUserData === "success") {
      Alert.alert("SUCCESS", "Verification code has been sent successfully", [
        { text: "OK", onPress: () => resetHandler() },
      ]);
    }
  }, [forgotUserData]);

  const submitHandler = () => {
    if (!password?.length) {
      setIsError(true);
      return;
    }
    const emailIsValid = password?.includes("@");
    if (!emailIsValid) {
      setIsValidError(true);
      return;
    }

    handleOpenPress();
  };
  const changeTextHandler = (value) => {
    setPassword(value);
    setIsError(false);
    setIsValidError(false);
  };
  const submitApiHandler = (token) => {
    if (token) {
      const result = dispatch(forgotUser({ token: token, email: password }));
    }
  };

  return (
    <>
      <ForgotScreen
        heading="Forgot Username"
        message=" Enter your email address to retrieve your username."
        subHeading="Email Address"
        onPress={() => submitHandler()}
        onChangeTextFirst={(value) => changeTextHandler(value)}
        placeholder="Enter Email Address"
        error={isError}
        errorMessage={"Email Address is required."}
        validationError={isValidError}
        validationErrorMessage={`Not a valid email address.`}
      />
      <Recaptcha
        ref={$recaptcha}
        lang="en"
        headerComponent={<Button title="Close" onPress={handleClosePress} />}
        siteKey="6LeFpDsUAAAAAEH42hEfizz1r977dUTyqdr55tPj"
        baseUrl={apiUrl}
        size={size}
        theme="light"
        onVerify={(token) => {
          submitApiHandler(token);
        }}
      />
    </>
  );
};

export default ForgotPassword;
