import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  Button,
  Image,
  Pressable,
  SafeAreaView,
  Alert,
  Platform,
  StyleSheet,
  Linking,
} from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import { searchProducts } from "../redux/features/productApi";
import { searchValues } from "../redux/features/authUser";
import getEnvVars from "../config/enviroment";

function Barcode() {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const isFocused = useIsFocused();
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);

  const { CLOSE_IMAGE } = getEnvVars();

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);
  const handleBarCodeScanned = async ({ type, data }) => {
    // alert(`Bar code with type ${type} and data ${data} has been scanned!`);
    setScanned(true);
    (async () => {
      try {
        if (Platform.OS === "android") {
          if (data.length === 12) {
            dispatch(searchProducts({ searchedValue: data, currentPage: 1 }));
            dispatch(searchValues(data));
            setScanned(true);
            navigation.navigate("SearchProduct");
            return;
          } else if (data.length >= 16) {
            dispatch(
              searchProducts({
                searchedValue: data.substring(5, 17),
                currentPage: 1,
              })
            );
            dispatch(searchValues(data.substring(5, 17)));
            setScanned(true);
            navigation.navigate("SearchProduct");
            return;
          } else {
            setScanned(true);
            Alert.alert(`Invalid Barcode ${data}, Please Try Again!`);
          }
        }
        if (Platform.OS === "ios") {
          if (data.length === 13) {
            if (data.substring(0, 1) === "0") {
              dispatch(
                searchProducts({
                  searchedValue: data.substring(1),
                  currentPage: 1,
                })
              );
              dispatch(searchValues(data.substring(1)));
              setScanned(true);
              navigation.navigate("SearchProduct");
            } else {
              setScanned(true);
              Alert.alert(`Invalid Barcode ${data}, Please Try Again!`);
            }
          } else if (data.length >= 16) {
            // To handle 2D barcodes of length 16 and more.
            dispatch(
              searchProducts({
                searchedValue: data.substring(4, 16),
                currentPage: 1,
              })
            );
            dispatch(searchValues(data.substring(4, 16)));
            setScanned(true);
            navigation.navigate("SearchProduct");
          } else {
            setScanned(true);
            Alert.alert(`Invalid Barcode ${data}, Please Try Again!`);
          }
          return;
        }
      } catch (e) {
        setScanned(true);
        Alert.alert(e.message);
      }
    })();
  };

  if (hasPermission === null) {
    return (
      <SafeAreaView style={styles.container}>
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            marginTop: 200,
          }}
        >
          <Text>Requesting for camera permission</Text>
        </View>
      </SafeAreaView>
    );
  }
  if (hasPermission === false) {
    return (
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          marginTop: 200,
        }}
      >
        <Text style={{ fontWeight: "bold", color: "#494c4c" }}>
          Camera permission is not allowed. Kindly go to settings and allow
          permission to camera
        </Text>
        <Text
          style={{ fontWeight: "bold", color: "#006ba6", marginTop: 10 }}
          onPress={() => Linking.openSettings()}
        >
          {" "}
          Go to settings
        </Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <Pressable
        onPress={() => {
          navigation.goBack();
        }}
        style={{ marginLeft: "auto", marginTop: "5%", marginRight: "5%" }}
      >
        <Image source={CLOSE_IMAGE} style={styles.closeImage} />
      </Pressable>
      <View
        style={{ flex: 1, flexDirection: "column", justifyContent: "center" }}
      >
        <BarCodeScanner
          onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
          style={styles.barCodeBox}
        />
      </View>

      <View
        style={{ width: 200, justifyContent: "center", alignSelf: "center" }}
      >
        {scanned ? (
          <Button title={"Scan Again"} onPress={() => setScanned(false)} />
        ) : null}
      </View>
    </SafeAreaView>
  );
}

export default Barcode;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: 50,
    backgroundColor: "#fff",
  },
  barCodeBox: { position: "absolute", top: 50, left: 0, bottom: 50, right: 0 },
});
