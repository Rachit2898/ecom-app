//This is Footer Components Which comes on various Screens.

import { Text, View, Pressable, Image } from "react-native";
import React, { useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { cartInfo, cartValidating } from "../redux/features/productApi";
import { cartColor } from "../redux/features/authUser";
import { Badge } from "react-native-elements";
import getEnvVars from "../config/enviroment";
import { styles } from "../Style/Style";

const TabBar = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(cartInfo());
    dispatch(cartValidating());
  }, []);

  const { cartLength } = useSelector((state) => ({
    ...state.products,
  }));
  const { cartName } = useSelector((state) => ({
    ...state.auth,
  }));
  const {
    ICON_HOME_BLUE_IMAGE,
    ICON_HOME_IAMGE,
    SHOPPING_BLUE_CART_IMAGE,
    SHOPPING_CART_IMAGE,
    ACCOUNT_BLUE_IMAGE,
    ACCOUNT_IMAGE,
    MORE_BLUE_IAMGE,
    MORE_IAMGE,
  } = getEnvVars();

  return (
    <View
      style={{
        flexDirection: "row",
        backgroundColor: "#fff",
        paddingBottom: 20,
        borderTopWidth: 1,
        borderColor: "#ececec",
      }}
    >
      <Pressable
        onPress={() => {
          navigation.navigate("DashBoard");
          dispatch(cartColor("Home"));
        }}
        style={[
          cartName === "Home" ? styles.upperBorder : styles.upperBorderNone,
        ]}
      >
        {cartName === "Home" ? (
          <Image
            style={styles.closeButtonImage}
            source={ICON_HOME_BLUE_IMAGE}
          />
        ) : (
          <Image style={styles.closeButtonImage} source={ICON_HOME_IAMGE} />
        )}
        <Text
          style={[cartName === "Home" ? styles.logoNameLight : styles.logoName]}
        >
          Home
        </Text>
      </Pressable>
      <Pressable
        onPress={() => {
          navigation.navigate("Cart");
          dispatch(cartColor("Cart"));
        }}
        style={[
          cartName === "Cart" ? styles.upperBorder : styles.upperBorderNone,
        ]}
      >
        <View style={{ flexDirection: "row", marginLeft: 20 }}>
          {cartName === "Cart" ? (
            <Image
              style={styles.closeButtonImage}
              source={SHOPPING_BLUE_CART_IMAGE}
            />
          ) : (
            <Image
              style={styles.closeButtonImage}
              source={SHOPPING_CART_IMAGE}
            />
          )}
          <View style={{ marginTop: -5, marginLeft: -8, width: 30 }}>
            {cartLength > 0 ? (
              <Text>
                <Badge value={cartLength} />{" "}
              </Text>
            ) : null}
          </View>
        </View>
        <Text
          style={[cartName === "Cart" ? styles.logoNameLight : styles.logoName]}
        >
          Cart
        </Text>
      </Pressable>
      <Pressable
        onPress={() => {
          navigation.navigate("Account");
          dispatch(cartColor("Account"));
        }}
        style={[
          cartName === "Account" ? styles.upperBorder : styles.upperBorderNone,
        ]}
      >
        {cartName === "Account" ? (
          <Image style={styles.closeButtonImage} source={ACCOUNT_BLUE_IMAGE} />
        ) : (
          <Image style={styles.closeButtonImage} source={ACCOUNT_IMAGE} />
        )}

        <Text
          style={[
            cartName === "Account" ? styles.logoNameLight : styles.logoName,
          ]}
        >
          Account
        </Text>
      </Pressable>
      <Pressable
        onPress={() => {
          navigation.navigate("MenuBar");
          dispatch(cartColor("MenuBar"));
        }}
        style={[
          cartName === "MenuBar" ? styles.upperBorder : styles.upperBorderNone,
        ]}
      >
        {cartName === "MenuBar" ? (
          <Image style={styles.closeButtonImage} source={MORE_BLUE_IAMGE} />
        ) : (
          <Image style={styles.closeButtonImage} source={MORE_IAMGE} />
        )}

        <Text
          style={[
            cartName === "MenuBar" ? styles.logoNameLight : styles.logoName,
          ]}
        >
          More
        </Text>
      </Pressable>
    </View>
  );
};

export default TabBar;
