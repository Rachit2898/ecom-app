import { Button, View } from "react-native";
import React, { useState, useCallback, useRef } from "react";
import ForgotScreen from "../components/ForgotScreen";
import { useNavigation } from "@react-navigation/native";
import Recaptcha from "react-native-recaptcha-that-works";
import { forgotPassword } from "../redux/features/authUser";
import { useDispatch, useSelector } from "react-redux";
import getEnvVars from "../config/enviroment";

const ForgotPassword = (props) => {
  const dispatch = useDispatch();
  const [name, setPassword] = useState("");
  const [isError, setIsError] = useState(false);
  const { apiUrl } = getEnvVars();
  const navigation = useNavigation();
  const size = "normal";
  const $recaptcha = useRef();
  const changeTextHandler = (value) => {
    setPassword(value);
    setIsError(false);
  };
  //forgotPasswordData
  const { forgotPasswordData } = useSelector((state) => ({
    ...state.auth,
  }));

  const handleOpenPress = useCallback(() => {
    $recaptcha.current.open();
  }, []);

  const handleClosePress = useCallback(() => {
    $recaptcha.current.close();
  }, []);
  const submitHandler = () => {
    if (!name.length) {
      setIsError(true);
      return;
    }
    handleOpenPress();
  };
  const submitApiHandler = (token) => {
    if (token) {
      dispatch(forgotPassword({ token: token, name: name }));
    }
    navigation.navigate("ResetPassword");
  };

  return (
    <>
      <ForgotScreen
        heading="Forgot Password"
        message="Enter your username to reset your password. An email will be sent to the address on file."
        subHeading="Username"
        onPress={() => submitHandler()}
        onChangeTextFirst={(value) => changeTextHandler(value)}
        placeholder="Enter Username"
        error={isError}
        errorMessage={"Username is required."}
      >
        <View
          style={{
            paddingHorizontal: 10,
            backgroundColor: "#fff",
          }}
        >
          <Button
            style={{
              paddingHorizontal: 10,
              color: "#fff",
            }}
            title="Close"
            onPress={handleClosePress}
          />
        </View>
      </ForgotScreen>
      <Recaptcha
        ref={$recaptcha}
        lang="en"
        headerComponent={<Button title="Close" onPress={handleClosePress} />}
        siteKey="6LeFpDsUAAAAAEH42hEfizz1r977dUTyqdr55tPj"
        baseUrl={apiUrl}
        size={size}
        theme="light"
        onError={(err) => {
          console.warn("error", err);
        }}
        onVerify={(token) => {
          submitApiHandler(token);
        }}
      />
    </>
  );
};

export default ForgotPassword;
