//This is CheckBox Components Which shows the checkboxes on various screens

import { StyleSheet, View, Pressable } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import React from "react";

function CheckBox({
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
        style={[buttonStyle, checked ? activeButtonStyle : inactiveButtonStyle]}
        onPress={onCheckmarkPress}
      >
        {checked && <Ionicons name="checkmark" size={20} color="white" />}
      </Pressable>
    </View>
  );
}

export default CheckBox;

const styles = StyleSheet.create({});
