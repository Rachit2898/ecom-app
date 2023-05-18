//This is LikeButton Components Which has the functionality of adding and removing of favorites

import { Pressable } from "react-native";

import React, { useState, useEffect } from "react";

import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useSelector } from "react-redux";
import Spinner from "../components/Spinner";
const LikeButton = (props) => {
  const [final, setFinal] = useState(props.value);
  const LikeHandler = () => {
    if (props.value) {
      setFinal((pre) => !pre);
    } else {
      setFinal((pre) => !pre);
    }
    props.onPress();
  };

  return (
    <>
      <Pressable onPress={() => LikeHandler()}>
        <MaterialCommunityIcons
          name={final ? "heart" : "heart-outline"}
          size={20}
          color={final ? "red" : "grey"}
        />
      </Pressable>
    </>
  );
};

export default LikeButton;
