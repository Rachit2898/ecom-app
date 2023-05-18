import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  Pressable,
  Linking,
} from "react-native";
import React, { useState, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import getEnvVars from "../config/enviroment";

const InputComponent = (props) => {
  const [show, setShow] = useState(true);
  const showPasswordHandler = (value) => {
    setShow((pre) => !pre);
  };
  const { EYE_OPEN_IMAGE, EYE_CLOSE_IMAGE } = getEnvVars();
  return (
    <View>
      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholderTextColor="#9d9b9b"
          secureTextEntry={show}
          onChangeText={props.onChangeText}
          placeholder={props.placeholder}
        />
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
            <Image style={{ height: 15, width: 18 }} source={EYE_CLOSE_IMAGE} />
          ) : (
            <Image style={{ height: 15, width: 18 }} source={EYE_OPEN_IMAGE} />
          )}
        </Pressable>
      </View>
    </View>
  );
};
const ForgotScreen = (props) => {
  const navigation = useNavigation();
  const { ERROR_ALERT_IMAGE, LOGO_IMAGE, apiUrl } = getEnvVars();
  return (
    <SafeAreaView
      style={{ backgroundColor: "#063e63", flex: 1 }}
      edges={["right", "left"]}
    >
      <View style={{ backgroundColor: "#fff", flex: 1 }}>
        <View style={{ marginTop: 20 }}>
          <Pressable onPress={() => navigation.navigate("Login")}>
            <Image style={styles.image} source={LOGO_IMAGE} />
          </Pressable>
          <View
            style={{
              marginTop: 15,
              justifyContent: "center",
              alignSelf: "center",
            }}
          >
            <Text
              style={{ fontSize: 25, fontWeight: "bold", color: "#494c4c" }}
            >
              {props.heading}
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
                textAlign: "center",
                color: "#494c4c",
              }}
            >
              {props.message}
            </Text>
          </View>
          {props.subHeading ? (
            <View
              style={{
                backgroundColor: "#063e63",
                marginTop: 20,
                paddingVertical: 15,
              }}
            >
              <Text
                style={{
                  fontWeight: "bold",
                  color: "#fff",
                  fontSize: 15,
                  marginLeft: 20,
                }}
              >
                {props.subHeading}
              </Text>
            </View>
          ) : null}
          {props.passwordMatchError ? (
            <View style={styles.errorView}>
              <Image
                style={{ height: 19, width: 18 }}
                source={ERROR_ALERT_IMAGE}
              />
              <Text style={{ color: "#990909", marginHorizontal: 10 }}>
                {props.passwordMatchErrorMessage}
              </Text>
            </View>
          ) : null}
          {props.placeholder ? (
            <View style={styles.inputView}>
              <TextInput
                style={styles.TextInput}
                placeholderTextColor="#9d9b9b"
                placeholder={props.placeholder}
                onChangeText={props.onChangeTextFirst}
              />
            </View>
          ) : null}
          {props.error ? (
            <View style={styles.errorView}>
              <Image
                style={{ height: 19, width: 18 }}
                source={ERROR_ALERT_IMAGE}
              />
              <Text style={{ color: "#990909", marginHorizontal: 10 }}>
                {props.errorMessage}
              </Text>
            </View>
          ) : null}
          {props.validationError ? (
            <View style={styles.errorView}>
              <Image
                style={{ height: 19, width: 18 }}
                source={ERROR_ALERT_IMAGE}
              />
              <Text style={{ color: "#990909", marginHorizontal: 10 }}>
                {props.validationErrorMessage}
              </Text>
            </View>
          ) : null}
          {props.placeholder2 ? (
            <InputComponent
              onChangeText={props.onChangeTextSecond}
              placeholder={props.placeholder2}
            />
          ) : null}
          {props.passwordError ? (
            <View style={styles.errorView}>
              <Image
                style={{ height: 19, width: 18 }}
                source={ERROR_ALERT_IMAGE}
              />
              <Text style={{ color: "#990909", marginHorizontal: 10 }}>
                {props.passwordErrorMessage}
              </Text>
            </View>
          ) : null}
          {props.strongPasswordError ? (
            <View style={styles.errorView}>
              <Image
                style={{ height: 19, width: 18 }}
                source={ERROR_ALERT_IMAGE}
              />
              <Text style={{ color: "#990909", marginHorizontal: 10 }}>
                {props.strongPasswordErrorMessage}
              </Text>
            </View>
          ) : null}
          {props.placeholder3 ? (
            <InputComponent
              placeholder={props.placeholder3}
              onChangeText={props.onChangeTextThird}
            />
          ) : null}
          {props.confirmPasswordError ? (
            <View style={styles.errorView}>
              <Image
                style={{ height: 19, width: 18 }}
                source={ERROR_ALERT_IMAGE}
              />
              <Text style={{ color: "#990909", marginHorizontal: 10 }}>
                {props.confirmPasswordErrorMessage}
              </Text>
            </View>
          ) : null}
          {props.onPress ? (
            <Pressable
              onPress={props.onPress}
              style={{
                backgroundColor: "#006ba6",
                width: "40%",
                justifyContent: "center",
                alignSelf: "center",
                marginVertical: 30,
                borderRadius: 5,
              }}
            >
              <Text
                style={{
                  color: "#fff",
                  textAlign: "center",
                  paddingVertical: 10,
                  fontWeight: "bold",
                }}
              >
                Submit
              </Text>
            </Pressable>
          ) : null}
        </View>
      </View>

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
    </SafeAreaView>
  );
};

export default ForgotScreen;

const styles = StyleSheet.create({
  image: {
    width: 150,
    height: 40,
    alignSelf: "center",
    justifyContent: "center",
    marginBottom: 20,
  },
  TextInput: {
    paddingHorizontal: 10,
    fontSize: 16,
    color: "#494c4c",
    backgroundColor: "#fff",
    width: "80%",
  },
  inputView: {
    backgroundColor: "#fff",
    borderWidth: 0.3,
    borderColor: "#9d9b9b",
    width: "80%",
    height: 45,
    flexDirection: "row",
    borderRadius: 3,
    padding: 2,
    marginTop: 20,
    justifyContent: "space-between", //Centered horizontally
    alignSelf: "center",
  },
  errorView: {
    backgroundColor: "#f9caca",
    borderWidth: 0.4,
    borderColor: "#990909",
    width: "80%",
    height: 45,
    marginTop: 10,
    borderRadius: 3,
    justifyContent: "center",
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "center",
  },
});
