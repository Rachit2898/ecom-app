//This is MenuBar Components Which shows the listing of screens and details

import {
  Text,
  View,
  Pressable,
  Image,
  ScrollView,
  Linking,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import React, { useState, useEffect } from "react";
import { setScreenName, setScreenMenuBar } from "../redux/features/productApi";
import { logout, removeUrls } from "../redux/features/authUser";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import TabBar from "./TabBar";
import getEnvVars from "../config/enviroment";
import { styles } from "../Style/Style";
import _ from "lodash";

const MenuBar = () => {
  const [formattedNumber, setFormattedNumber] = useState("");
  const { userInfoData, menuBarScreensData } = useSelector((state) => ({
    ...state.products,
  }));
  const { CLOSE_IMAGE, ICON_IMAGE, LINKEDIN_IMAGE, FACEBOOK_IMAGE } =
    getEnvVars();
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(!modalVisible);
  const userData = userInfoData;
  const logoutHandler = () => {
    navigation.navigate("DashBoard");
    setTimeout(() => {
      dispatch(logout(false));
    });
  };
  useEffect(() => {
    let stringNumber =
      userData?.selectedAccount?.accountDetail?.accountRep?.number;
    if (stringNumber?.length === 10) {
      setFormattedNumber(
        stringNumber?.replace(/(\d{3})(\d{3})(\d{4})/gi, "($1) $2-$3")
      );
    }
  }, [userData]);
  const resultProductList = _.filter(menuBarScreensData, function (o) {
    return o.section === "Product Lists";
  });
  const resultSavings = _.filter(menuBarScreensData, function (o) {
    return o.section === "Savings";
  });
  const supportSavings = _.filter(menuBarScreensData, function (o) {
    return o.section === "Support";
  });

  const favoritesOpen = async (result) => {
    dispatch(setScreenMenuBar(result));
    dispatch(removeUrls());
    navigation.navigate("Products");
    setModalVisible(!modalVisible);
  };

  const savingsOpen = async (result) => {
    dispatch(setScreenMenuBar(result));
    dispatch(removeUrls());
    navigation.navigate("Products");
    setModalVisible(!modalVisible);
  };

  const closeButtonHandler = async () => {
    navigation.goBack();
  };
  const OrderingOptionsOpen = async () => {
    navigation.navigate("OrderingOptions");
  };
  const OpeningAccountOpen = async () => {
    navigation.navigate("OpeningAccount");
  };
  const PaymentOpen = async () => {
    navigation.navigate("Payment");
  };
  const ReturnOpen = async () => {
    navigation.navigate("ReturnPolicy");
  };
  const FaqOpen = async () => {
    navigation.navigate("Faq");
  };
  const SettingOpen = async () => {
    navigation.navigate("Settings");
  };
  const OrderOpen = async () => {
    navigation.navigate("OrderHistory");
  };

  return (
    <SafeAreaView style={styles.safeAreaView} edges={["right", "left", "top"]}>
      <View style={styles.mainBox}>
        <View style={styles.closeMenuButton}>
          <View style={styles.topBarBox}>
            <Image source={ICON_IMAGE} style={styles.iconImage} />
            <View style={{ marginHorizontal: 5, justifyContent: "center" }}>
              <Text style={{ fontSize: 14 }}>{userData?.username}</Text>
            </View>
          </View>

          <Pressable
            onPress={() => closeButtonHandler()}
            style={styles.closeButtonPosition}
          >
            <Image source={CLOSE_IMAGE} style={styles.closeButtonImage} />
          </Pressable>
        </View>

        <ScrollView showsVerticalScrollIndicator={false}>
          <View>
            <View>
              <View style={styles.prductListBlue}>
                <Text style={styles.productText}>Product Lists</Text>
              </View>
              {resultProductList?.map((item, i) => {
                return (
                  <View style={{ marginHorizontal: 10, paddingTop: 5 }} key={i}>
                    <Pressable
                      onPress={() => {
                        favoritesOpen(item);
                      }}
                      style={styles.catagorySlab}
                    >
                      <Text style={styles.screenName}>{item?.label}</Text>
                    </Pressable>
                  </View>
                );
              })}
            </View>
            <View>
              <View style={styles.prductListBlue}>
                <Text style={styles.productText}>Savings</Text>
              </View>
              {resultSavings?.map((item, i) => {
                return (
                  <View style={{ marginHorizontal: 10, paddingTop: 5 }} key={i}>
                    <Pressable
                      onPress={() => {
                        savingsOpen(item);
                      }}
                      style={styles.catagorySlab}
                    >
                      <Text style={styles.screenName}>{item?.label}</Text>
                    </Pressable>
                  </View>
                );
              })}
            </View>
            <View>
              <View style={styles.prductListBlue}>
                <Text style={styles.productText}>Support</Text>
              </View>
              <View style={{ marginHorizontal: 10, paddingVertical: 5 }}>
                <Pressable
                  onPress={() => {
                    OrderingOptionsOpen();
                  }}
                  style={styles.catagorySlab}
                >
                  <Text style={styles.screenName}>
                    Ordering Options and Hours
                  </Text>
                </Pressable>
                <Pressable
                  onPress={() => {
                    OpeningAccountOpen();
                  }}
                  style={styles.catagorySlab}
                >
                  <Text style={styles.screenName}>Opening an Account</Text>
                </Pressable>
                <Pressable
                  onPress={() => {
                    PaymentOpen();
                  }}
                  style={styles.catagorySlab}
                >
                  <Text style={styles.screenName}>Payment Options</Text>
                </Pressable>
                <Pressable
                  onPress={() => {
                    ReturnOpen();
                  }}
                  style={styles.catagorySlab}
                >
                  <Text style={styles.screenName}>Return Policy</Text>
                </Pressable>
                <Pressable
                  onPress={() => {
                    FaqOpen();
                  }}
                  style={styles.catagorySlab}
                >
                  <Text style={styles.screenName}>FAQs</Text>
                </Pressable>
                <Pressable
                  onPress={() => {
                    OrderOpen();
                  }}
                  style={styles.catagorySlab}
                >
                  <Text style={styles.screenName}>Order History</Text>
                </Pressable>
                <Pressable
                  onPress={() => {
                    SettingOpen();
                  }}
                  style={styles.catagorySlab}
                >
                  <Text style={styles.screenName}>Settings</Text>
                </Pressable>

                <View>
                  <Text
                    style={styles.screenNameGreyText}
                    onPress={() => Linking.openURL(`tel:${18003312632}`)}
                  >
                    Toll Free:{" "}
                    <Text style={styles.BlueTextColor}>1-800-331-2632</Text>
                  </Text>
                </View>
                <View>
                  <Text
                    style={styles.screenNameGreyText}
                    onPress={() => Linking.openURL(`tel:${18872632638}`)}
                  >
                    Tech Support:{" "}
                    <Text style={styles.BlueTextColor}>1-887-263-2638</Text>
                  </Text>
                </View>
                <View>
                  <Text
                    style={styles.screenNameGreyText}
                    onPress={() =>
                      Linking.openURL(`mailto:${"info@andanet.com"}`)
                    }
                  >
                    Email:{" "}
                    <Text style={styles.BlueTextColor}>info@andanet.com</Text>
                  </Text>
                </View>
                <View style={{}}>
                  <Text style={styles.screenNameGreyText}>
                    {userData?.selectedAccount?.accountDetail?.accountRep.name}
                  </Text>
                </View>
                <View style={{}}>
                  <Text
                    style={[styles.screenName, styles.BlueTextColor]}
                    onPress={() => Linking.openURL(`tel:${formattedNumber}`)}
                  >
                    {formattedNumber} x
                    {
                      userData?.selectedAccount?.accountDetail?.accountRep
                        .extension
                    }
                  </Text>
                </View>
                <View style={{}}>
                  <Text
                    style={[styles.screenName, styles.BlueTextColor]}
                    onPress={() =>
                      Linking.openURL(
                        `mailto:${userData?.selectedAccount?.accountDetail?.accountRep.salesRepEmail}`
                      )
                    }
                  >
                    {
                      userData?.selectedAccount?.accountDetail?.accountRep
                        .salesRepEmail
                    }
                  </Text>
                </View>
                <View style={{ flexDirection: "row" }}>
                  <Text style={styles.screenNameGreyText}>
                    Follow Us @AndaInc
                  </Text>
                  <View style={{ flexDirection: "row" }}>
                    <Pressable
                      onPress={() =>
                        Linking.openURL(
                          "https://www.linkedin.com/company/andainc"
                        )
                      }
                    >
                      <Image
                        source={LINKEDIN_IMAGE}
                        style={{ height: 30, width: 30 }}
                      />
                    </Pressable>
                    <Pressable
                      onPress={() =>
                        Linking.openURL("https://www.facebook.com/AndaInc")
                      }
                    >
                      <Image
                        source={FACEBOOK_IMAGE}
                        style={{ height: 30, width: 30, marginHorizontal: 10 }}
                      />
                    </Pressable>
                  </View>
                </View>
              </View>
            </View>
            <View>
              <Pressable
                android_ripple={{ color: "#ccc" }}
                style={styles.logoutBox}
                onPress={() => logoutHandler()}
              >
                <Text style={styles.logoutText}>LOGOUT</Text>
              </Pressable>
            </View>
          </View>
        </ScrollView>
        <View style={{ left: 0, right: 0, bottom: 0 }}>
          <TabBar />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default MenuBar;
