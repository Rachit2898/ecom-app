//This is ImageSlide Components Which comes on DashBoard Screen

import React, { useState, useEffect } from "react";
import { View, StyleSheet } from "react-native";
import Slideshow from "./Slide";
import getEnvVars from "../config/enviroment";
import { useDispatch, useSelector } from "react-redux";
import _ from "lodash";
const { apiUrl } = getEnvVars();

const ImageSlider = () => {
  const [position, setPosition] = useState(1);
  const { cmsResponseData } = useSelector((state) => ({
    ...state.products,
  }));

  const resultFooter = _.filter(cmsResponseData, function (o) {
    return o.headerText === "Middle Content Zone";
  });

  const dataSource = [
    {
      url: `${apiUrl}${resultFooter[0]?.imageUrl}`,
    },
    { url: `${apiUrl}${resultFooter[1]?.imageUrl}` },
    {
      url: `${apiUrl}${resultFooter[2]?.imageUrl}`,
    },
  ];

  useEffect(() => {
    const toggle = setInterval(() => {
      setPosition(position === dataSource.length - 1 ? 0 : position + 1);
    }, 3000);

    return () => clearInterval(toggle);
  }, [position]);

  const setState = () => {
    ({
      interval: setInterval(() => {
        setState({
          position: position === dataSource.length ? 0 : position + 1,
        });
      }, 2000),
    });
  };
  return (
    <View style={{ borderRadius: 5 }}>
      <Slideshow
        position={position}
        dataSource={dataSource}
        arrowSize={14}
        onPositionChanged={(position) => setState({ position })}
      />
    </View>
  );
};

const styles = StyleSheet.create({});

export default ImageSlider;
