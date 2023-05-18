//This is Loader Components Which comes on various Screens

import { ActivityIndicator, StyleSheet, Text, View, Modal } from "react-native";

function Spinner() {
  return (
    <View
      style={{
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Modal
        animationType={"fade"}
        transparent={true}
        visible={true}
        onRequestClose={() => {}}
        propagateSwipe={true}
      >
        <ActivityIndicator
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
          }}
          size="large"
        />
      </Modal>
    </View>
  );
}

export default Spinner;

const styles = StyleSheet.create({});
