//This is Heading details components which shows the content of screens like "Ordering options and hours", "Openeing an account"

import { Text, View, Linking } from "react-native";
import React from "react";
import { styles } from "../Style/Style";

const Component = (props) => {
  return (
    <>
      <View
        style={{
          paddingVertical: 10,
          borderColor: "#006ba6",
          borderBottomWidth: 1,
        }}
      >
        <View style={{ paddingHorizontal: 10 }}>
          <View>
            <Text style={[styles.BlueTextColor, styles.FontWeight700]}>
              {props.heading}
            </Text>
          </View>
          <View style={{ marginTop: 15 }}>
            <Text style={[styles.BlackTextColor]}>{props.value}</Text>
          </View>
          {props.phone ? (
            <View style={{ flexDirection: "row", marginTop: 3 }}>
              <Text style={[styles.BlackTextColor, styles.FontWeight700]}>
                Call
              </Text>
              <Text
                style={[styles.BlueTextColor, styles.FontWeight700]}
                onPress={() => Linking.openURL(`tel:${props.phone}`)}
              >
                {" "}
                {props.phone}
              </Text>
            </View>
          ) : null}
        </View>
      </View>
    </>
  );
};

export default Component;
