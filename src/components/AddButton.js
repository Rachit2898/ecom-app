//This is ADD Button UI component

import { StyleSheet, Text, View, Pressable, Image } from "react-native";
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import getEnvVars from "../config/enviroment";

const AddButton = (props) => {
  const { tickLoading } = useSelector((state) => ({
    ...state.products,
  }));
  const { CHECK_IMGAE } = getEnvVars();

  const [isChecked, setChecked] = useState(false);
  const [final, setFinal] = useState(false);
  const openHandler = () => {
    if (props.count > 0) {
      setChecked(true);
    }
    props.onPress();
  };
  useEffect(() => {
    setFinal(isChecked && tickLoading);
  }, [isChecked, tickLoading]);

  return (
    <View>
      <Pressable
        style={{
          backgroundColor: "#ed8b00",
          width: 60,
          height: 25,
          borderRadius: 3,
          borderRadius: 4,
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "row",
        }}
        onPress={openHandler}
      >
        <Text
          style={{
            color: "#fff",
            fontWeight: "bold",
            fontSize: 12,
          }}
        >
          ADD
        </Text>
        {final ? (
          <View>
            <Image
              style={{
                width: 12,
                height: 12,
              }}
              source={CHECK_IMGAE}
            />
          </View>
        ) : null}
      </Pressable>
    </View>
  );
};

export default AddButton;

const styles = StyleSheet.create({});
