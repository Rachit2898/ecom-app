//FingerPrint Screen which has the functionality and content of related to FingerPrint

import { StyleSheet, Text, View } from "react-native";
import React, { useState, useEffect } from "react";
import { fingers } from "../redux/features/authUser";
import * as LocalAuthentication from "expo-local-authentication";
import { useDispatch } from "react-redux";

function FingerPrint() {
  const dispatch = useDispatch();
  const [value, setValue] = useState(false);
  const fallBackToDefaultAuth = () => {};

  const twoButtonAlert = () => {
    dispatch(fingers(true));
  };

  const handleFingerPrintAuth = async () => {
    const isFingerPrintAvailable = await LocalAuthentication.hasHardwareAsync();
    if (!isFingerPrintAvailable) {
      fallBackToDefaultAuth();
    }

    const savedFingerPrint = await LocalAuthentication.isEnrolledAsync();
    if (!savedFingerPrint) {
      fallBackToDefaultAuth();
    }

    const FingerPrintAuth = await LocalAuthentication.authenticateAsync({
      disableDeviceFallback: false,
    });
    if (!!FingerPrintAuth?.success) {
      twoButtonAlert();
    }
    if (!!FingerPrintAuth?.warning) {
      setValue(true);
    }
  };

  useEffect(() => {
    handleFingerPrintAuth();
  }, []);

  return (
    <View style={styles.container}>
      {value ? (
        <View style={styles.modal}>
          <View style={styles.modalView}>
            <Text
              style={{
                fontWeight: "bold",
                marginTop: 20,
                fontSize: 14,

                color: "#006ba6",
              }}
            >
              Fingerprint operation cancelled by user.
            </Text>
          </View>
        </View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center", //Centered vertically
    alignItems: "center", // Centered horizontally
  },
  button: {
    backgroundColor: "#0c002b",
    padding: 10,
    alignSelf: "center",
  },
  modalView: {
    backgroundColor: "#fff",
    height: 100,
    paddingHorizontal: 10,
    marginHorizontal: 10,
    paddingVertical: 20,
    zIndex: 1,
    shadowColor: "#000",
    textAlign: "center",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
});
export default FingerPrint;
