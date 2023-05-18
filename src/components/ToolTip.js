//This component is rendered on various screens like Top Purchses, Customer like you etc. This components has the UI part and functionality used by various screens Top Purchses, Customer like you etc.

import { Text, View, Image, TouchableOpacity, StatusBar } from "react-native";
import React, { useState } from "react";
import getEnvVars from "../config/enviroment";
import { styles } from "../Style/Style";
import Tooltip from "react-native-walkthrough-tooltip";

const TooltipContainer = (props) => {
  const [showTip, setTip] = useState(false);
  const { apiUrl } = getEnvVars();
  return (
    <View
      style={{ flexDirection: "row", paddingVertical: 5, alignItems: "center" }}
    >
      <Tooltip
        isVisible={showTip}
        content={
          <View>
            <Text> {props.value}</Text>
          </View>
        }
        onClose={() => setTip(false)}
        placement="bottom"
        // below is for the status bar of react navigation bar
        topAdjustment={Platform.OS === "android" ? -StatusBar.currentHeight : 0}
      >
        <TouchableOpacity onPress={() => setTip(true)}>
          <Image
            source={{
              uri: `${apiUrl}/${props.uri}`,
            }}
            style={styles.catagoryImage}
          />
        </TouchableOpacity>
      </Tooltip>
      <View>
        <Text style={{ color: "#494c4c", fontWeight: "600", fontSize: 12 }}>
          {" "}
          {props.title}
        </Text>
      </View>
    </View>
  );
};

export default TooltipContainer;
