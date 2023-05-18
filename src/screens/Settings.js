//This screen hai biometrics unable/enable settings functionality

import { StyleSheet, Text, View, Pressable } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Ionicons from "@expo/vector-icons/Ionicons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getBioMetricsDetails } from "../utility/utils";
import TabBar from "../components/TabBar";
import { styles } from "../Style/Style";
const Settings = () => {
  const [isChecked, setChecked] = useState(false);

  const [values, setValue] = useState();
  const bioMetrics = async () => {
    const bioMetrics = await getBioMetricsDetails();
    if (!bioMetrics) {
      setValue(false);
    } else {
      setValue(bioMetrics);
    }

    return bioMetrics;
  };
  bioMetrics();

  function MyCheckbox({
    checked,
    onPress,
    onChange,
    buttonStyle = {},
    activeButtonStyle = {},
    inactiveButtonStyle = {},
  }) {
    function onCheckmarkPress() {
      onChange(!checked);
      onPress();
    }

    return (
      <View>
        <Pressable
          style={[
            buttonStyle,
            checked ? activeButtonStyle : inactiveButtonStyle,
          ]}
          onPress={onCheckmarkPress}
        >
          {checked && <Ionicons name="checkmark" size={20} color="white" />}
        </Pressable>
      </View>
    );
  }

  const myCheckHandler = async (value) => {
    setChecked(!isChecked);
    AsyncStorage.setItem("bioMetrics", JSON.stringify(value));
    setValue(value);
  };

  return (
    <SafeAreaView
      style={{ backgroundColor: "#fff", flex: 1 }}
      edges={["right", "left"]}
    >
      <View style={{ flex: 1 }}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            padding: 10,
          }}
        >
          <View style={{ justifyContent: "center" }}>
            <Text style={{ fontSize: 20, fontWeight: "bold" }}>Settings</Text>
          </View>
        </View>
        <View style={{ flexDirection: "row", marginLeft: 10 }}>
          <MyCheckbox
            style={styles.checkbox}
            checked={values === true}
            onChange={myCheckHandler}
            onPress={() => {
              values === false ? myCheckHandler(true) : myCheckHandler(false);
            }}
            buttonStyle={styles.checkboxBase}
            activeButtonStyle={styles.checkboxChecked}
          />
          <View style={{ marginVertical: 7 }}>
            <Text style={{ color: "#494c4c", fontWeight: "bold" }}>
              Biometrics Enabled?
            </Text>
          </View>
        </View>
        <View style={{ position: "absolute", left: 0, right: 0, bottom: 0 }}>
          <TabBar />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Settings;
