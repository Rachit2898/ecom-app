//This is Filter Components.

import { StyleSheet, Text, View, Image, Pressable } from "react-native";
import React, { useState } from "react";
import getEnvVars from "../config/enviroment";

const Filters = (props) => {
  const [filterOpen, setFilterOpen] = useState(false);

  const openHandler = () => {
    setFilterOpen((pre) => !pre);
  };
  const { DOWN_IMAGE, RIGHT_IMAGE } = getEnvVars();

  return (
    <View>
      {props.values?.length > 0 ? (
        <View key={props.label}>
          <Pressable
            style={styles.headingAvailability}
            onPress={() => {
              openHandler();
            }}
          >
            <Text style={styles.headingAvalText}>
              {props.label}
              {props.active && <Text style={{ fontSize: 22 }}> &bull;</Text>}
            </Text>

            <View>
              {filterOpen ? (
                <Image style={{ height: 15, width: 15 }} source={DOWN_IMAGE} />
              ) : (
                <Image style={{ height: 15, width: 15 }} source={RIGHT_IMAGE} />
              )}
            </View>
          </Pressable>
          {filterOpen ? (
            <View>
              <View
                style={{
                  flexDirection: "row",
                  marginTop: 5,
                }}
              >
                {props.MyFilter}
              </View>
            </View>
          ) : null}
        </View>
      ) : null}
    </View>
  );
};

export default Filters;

const styles = StyleSheet.create({
  headingAvailability: {
    borderBottomWidth: 1,
    borderBottomColor: "#f2f2f2",
    paddingTop: 20,
    paddingBottom: 10,

    flexDirection: "row",
    justifyContent: "space-between",
  },
  heading: {
    alignItems: "center",
    textAlign: "center",
    backgroundColor: "#ddd",
    paddingVertical: 6,
  },
  headingSortingText: {
    paddingLeft: 10,
    fontWeight: "bold",
    fontSize: 18,
    color: "#494c4c",
  },
  headingAvalText: {
    paddingLeft: 5,
    fontWeight: "bold",
    fontSize: 14,
    color: "#494c4c",
  },
});
