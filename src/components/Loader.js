//This is Loader Components Which comes on various Screens

import {
  ActivityIndicator,
  StyleSheet,
  Text,
  View,
  Modal,
  Dimensions,
} from "react-native";
const { width, height } = Dimensions.get("window");
const guidelineBaseHeight = 812;
const verticalScale = (size) => (height / guidelineBaseHeight) * size;

function Loader(props) {
  const height = parseInt(props.top);
  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        position: "absolute",
        top: props.top ? height : 0,
        bottom: 0,
        left: 0,
        right: 0,

        zIndex: 9999,
      }}
    >
      <ActivityIndicator size="large" />
    </View>
  );
}

export default Loader;

const styles = StyleSheet.create({});
