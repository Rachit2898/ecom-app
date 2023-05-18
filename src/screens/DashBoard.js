//This Dashboard.js file has the functionality and content of Dashboard screen. After login user will see this screen.

import {
  Text,
  View,
  ScrollView,
  Image,
  Pressable,
  Alert,
  StatusBar,
  Dimensions,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import React, { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import Navbar from "../components/Searchbar";
import Spinner from "../components/Spinner";
import TabBar from "../components/TabBar";
import Loader from "../components/Loader";
import { useDispatch, useSelector } from "react-redux";
import {
  yourTopPurChase,
  customerLikeYou,
  preNegotiatedItems,
  userInfo,
  backInStock,
  productLists,
  accountAlert,
  orderLimitReset,
  cmsResponse,
  setScreenName,
  menuBarScreens,
  resetDataHandler,
  cartInfo,
} from "../redux/features/productApi";
import { authenticate, removeUrls } from "../redux/features/authUser";
import { styles } from "../Style/Style";
import ImageSlider from "../components/ImageSlide.js";
import { getToken } from "../utility/utils";
import HomeProduct from "../components/HomeProduct";
import _ from "lodash";
import AccountAlertComponent from "../components/AlertComponent";
import getEnvVars from "../config/enviroment";
const windowDimensions = Dimensions.get("window");

export default function DashBoard() {
  const { apiUrl } = getEnvVars();
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [orderLimit, setOrderLimit] = useState(false);
  const [refreshing, setRefreshing] = React.useState(false);
  const [loadingValue, setLoadingValue] = useState(false);

  const {
    topPurchaseProducts,
    customerLikeYouProducts,
    preNegotiatedItemsProducts,
    loading,
    backInStockData,
    userInfoData,
    accountAlertData,
    verifyTokenData,
    addItemData,
    cmsResponseData,
  } = useSelector((state) => ({
    ...state.products,
  }));
  const { isAuthenticated, showAlertBox } = useSelector((state) => ({
    ...state.auth,
  }));

  //Api calling functions
  useEffect(() => {
    dispatch(yourTopPurChase());
    dispatch(customerLikeYou());
    dispatch(preNegotiatedItems());
    dispatch(userInfo());
    dispatch(backInStock());
    dispatch(productLists());
    dispatch(cmsResponse());
    dispatch(menuBarScreens());
  }, [verifyTokenData]);
  useEffect(() => {
    dispatch(accountAlert());
  }, [verifyTokenData]);

  useEffect(() => {
    dispatch(userInfo());
    dispatch(cartInfo());
  }, []);

  //Navigation functions by which we can navigate from one screen to another like "TopPurchases", is screen name so we can navigate from here to "TopPurchase" screen
  const inventoryOpen = async () => {
    const result = {
      linkText: "Your Top Purchases",
      targetUrl: "/api/customer/product-list/top-purchases",
    };
    dispatch(setScreenName(result));
    dispatch(removeUrls());
    navigation.navigate("Products");
  };
  const CustomerLikeYouOpen = async () => {
    const result = {
      linkText: "Purchased by Customers Like You",
      targetUrl: "/api/customer/product-list/customers-like-you",
    };
    dispatch(setScreenName(result));
    dispatch(removeUrls());
    navigation.navigate("Products");
  };
  const preNegotiatedOpen = async () => {
    const result = {
      linkText: "Pre-Negotiated Items",
      targetUrl: "/api/customer/product-list/pre-negotiated-items",
    };
    dispatch(setScreenName(result));
    dispatch(removeUrls());
    navigation.navigate("Products");
  };
  const inventoryWatchListOpen = async () => {
    const result = {
      linkText: "Inventory Watch List",
      targetUrl: "/api/customer/product-list/inventory-watch-list",
    };
    dispatch(setScreenName(result));
    dispatch(removeUrls());
    navigation.navigate("Products");
  };
  const ProductsOpen = async (result) => {
    dispatch(setScreenName(result));
    navigation.navigate("Products");
  };

  const result = _.filter(cmsResponseData, function (o) {
    return o.headerText === "Shop Categories and Resources";
  });
  const resultFooter = _.filter(cmsResponseData, function (o) {
    return o.headerText === "Footer Content Zone";
  });

  useEffect(() => {
    async function fetchToken() {
      const storedToken = await getToken();
      if (storedToken) {
        dispatch(authenticate(storedToken));
      }
    }
    fetchToken();
  }, [isAuthenticated, refreshing]);

  const userData = userInfoData;

  //This functionality helps to show loader on page till api does not send response.
  useEffect(() => {
    setTimeout(() => {
      setLoadingValue(true);
    }, 3000);
  }, []);

  //This function helps to set the orderLimit value by which we can show the message with the help of Alert.
  useEffect(() => {
    setOrderLimit(false);
    if (!!addItemData?.validations?.length) {
      if (
        addItemData?.validations[0]?.key === "item.availability" ||
        "order.item.daily-order-limit"
      ) {
        setOrderLimit(true);
      }
      {
        orderLimit &&
          Alert.alert("WARNING", `${addItemData?.validations[0]?.message}`, [
            { text: "OK", onPress: () => resetHandler() },
          ]);
      }
    }
  }, [orderLimit, addItemData]);

  //This function helps to reset the orderLimit value.
  const resetHandler = () => {
    setOrderLimit(false);
    dispatch(orderLimitReset());
  };

  return (
    <SafeAreaView style={styles.safeAreaView} edges={["right", "left", "top"]}>
      <StatusBar
        animated={false}
        translucent
        backgroundColor={"#063e63"}
        barStyle={"light-content"}
        hidden={false}
      />

      <View style={[styles.mainBox]}>
        <View
          style={{
            zIndex: 1,
            position: "absolute",
            backgroundColor: "#fff",
          }}
        >
          <Navbar />
        </View>
        <View style={[styles.mainBox]}>
          {loading && <Loader />}
          {loadingValue ? (
            <View style={[styles.mainBox]}>
              {showAlertBox ? (
                <View style={styles.accountAlert}>
                  <View>
                    <View style={styles.accountAlertBox}>
                      <Text style={styles.accountAlertHeading}>
                        Account Alerts
                      </Text>
                    </View>

                    <View style={{ paddingVertical: 5 }}>
                      {accountAlertData?.map((item) => {
                        return (
                          <View key={item?.accountAlertType}>
                            <AccountAlertComponent
                              type={item?.accountAlertType}
                              expired={item?.expired}
                              daysUntilExpired={item?.daysUntilExpired}
                              numOrders={item?.numOrders}
                              numberOfReturns={item?.numberOfReturns}
                              returnByDate={item?.returnByDate}
                              approvedReturnsNotShipped={
                                item?.approvedReturnsNotShipped
                              }
                              numberOfRecallNotifications={
                                item?.numberOfRecallNotifications
                              }
                              certificatesExpired={item?.certificatesExpired}
                              rebateType={item?.rebateType}
                              upcomingRebateAmount={item?.upcomingRebateAmount}
                            />
                          </View>
                        );
                      })}
                    </View>
                  </View>
                </View>
              ) : null}

              <View
                style={[
                  loading ? styles.mainBoxLoading : styles.mainBox,
                  { zIndex: 0, marginTop: 50 },
                ]}
              >
                <ScrollView showsVerticalScrollIndicator={false}>
                  <View style={{ flex: 1 }}>
                    <View style={{ margin: 10 }}>
                      <Text
                        style={[styles.FontWeight700, styles.BlackTextColor]}
                      >
                        Shop Categories & Resources
                      </Text>
                    </View>

                    <ScrollView
                      horizontal={true}
                      showsHorizontalScrollIndicator={false}
                      style={{ marginHorizontal: 10 }}
                    >
                      {result?.map((result, i) => {
                        return (
                          <View
                            style={{
                              flexDirection: "row",
                              paddingHorizontal: 3,
                            }}
                            key={i}
                          >
                            <Pressable
                              onPress={() => {
                                ProductsOpen(result);
                              }}
                            >
                              <Image
                                style={styles.horizontalScrollImages}
                                source={{
                                  uri: `${apiUrl}${result?.imageUrl}`,
                                }}
                              />
                              <Text style={styles.horizontalScrollImageNames}>
                                {result?.linkText}
                              </Text>
                            </Pressable>
                          </View>
                        );
                      })}
                    </ScrollView>
                    <View style={styles.horizontalBorder} />

                    <View style={styles.imageSliderBox}>
                      <View>
                        <ImageSlider />
                      </View>
                    </View>

                    {!!backInStockData?.data?.length && (
                      <View style={styles.productDetailBox}>
                        <View style={styles.productBox}>
                          <View>
                            <Text
                              style={[
                                styles.FontWeight700,
                                styles.BlackTextColor,
                              ]}
                            >
                              Back In Stock
                            </Text>
                          </View>
                          <Pressable
                            android_ripple={{ color: "#ccc" }}
                            onPress={() => {
                              inventoryWatchListOpen();
                            }}
                          >
                            <Text
                              style={[
                                styles.FontWeight700,
                                styles.BlueTextColor,
                              ]}
                            >
                              See More
                            </Text>
                          </Pressable>
                        </View>
                        <View>
                          <ScrollView
                            horizontal={true}
                            showsHorizontalScrollIndicator={false}
                            style={styles.productHorizontalProductBox}
                          >
                            {backInStockData?.data?.map((item, i) => {
                              return (
                                <View key={i}>
                                  <HomeProduct
                                    id={item?.id}
                                    externalId={item?.externalId}
                                    accountId={userData?.selectedAccount?.id}
                                    primaryUrl={
                                      item?.product?.mediaMap?.primary?.url
                                    }
                                    type={item?.productLists[0]?.type}
                                    name={item?.name}
                                    nationalDrugCode={item?.nationalDrugCode}
                                    amount={item?.retailPrice?.amount}
                                  />
                                </View>
                              );
                            })}
                          </ScrollView>
                        </View>
                      </View>
                    )}
                    <View style={styles.thikBorder} />

                    <View>
                      {topPurchaseProducts?.products?.length && (
                        <View style={styles.productDetailBox}>
                          <View style={styles.productBox}>
                            <View>
                              <Text
                                style={[
                                  styles.FontWeight700,
                                  styles.BlackTextColor,
                                ]}
                              >
                                Your Top Purchases
                              </Text>
                            </View>
                            <Pressable
                              android_ripple={{ color: "#ccc" }}
                              onPress={() => {
                                inventoryOpen();
                              }}
                            >
                              <Text
                                style={[
                                  styles.FontWeight700,
                                  styles.BlueTextColor,
                                ]}
                              >
                                See More
                              </Text>
                            </Pressable>
                          </View>
                          <View>
                            <ScrollView
                              horizontal={true}
                              showsHorizontalScrollIndicator={false}
                              style={styles.productHorizontalProductBox}
                            >
                              {topPurchaseProducts?.products?.map((item, i) => {
                                return (
                                  <View key={i}>
                                    <HomeProduct
                                      id={item?.defaultSku?.id}
                                      externalId={item?.defaultSku?.externalId}
                                      accountId={userData?.selectedAccount?.id}
                                      primaryUrl={item?.mediaMap?.primary?.url}
                                      type={
                                        item?.defaultSku?.productLists[0]?.type
                                      }
                                      name={item.defaultSku.name}
                                      nationalDrugCode={
                                        item?.defaultSku?.nationalDrugCode
                                      }
                                      amount={
                                        item?.defaultSku?.retailPrice?.amount
                                      }
                                      favorited={item?.defaultSku?.favorited}
                                    />
                                  </View>
                                );
                              })}
                            </ScrollView>
                          </View>
                        </View>
                      )}
                    </View>

                    <View style={styles.thikBorder} />
                    {customerLikeYouProducts?.products?.length > 0 && (
                      <View style={styles.productDetailBox}>
                        <View style={styles.productBox}>
                          <View>
                            <Text
                              style={[
                                styles.FontWeight700,
                                styles.BlackTextColor,
                              ]}
                            >
                              Purchased By Customers Like You
                            </Text>
                          </View>
                          <Pressable
                            android_ripple={{ color: "#ccc" }}
                            onPress={() => {
                              CustomerLikeYouOpen();
                            }}
                          >
                            <Text
                              style={[
                                styles.FontWeight700,
                                styles.BlueTextColor,
                              ]}
                            >
                              See More
                            </Text>
                          </Pressable>
                        </View>

                        <View>
                          <ScrollView
                            horizontal={true}
                            showsHorizontalScrollIndicator={false}
                            style={styles.productHorizontalProductBox}
                          >
                            {customerLikeYouProducts?.products?.map(
                              (item, i) => {
                                return (
                                  <View key={i}>
                                    <HomeProduct
                                      id={item?.defaultSku?.id}
                                      externalId={item?.defaultSku.externalId}
                                      accountId={userData?.selectedAccount?.id}
                                      primaryUrl={item?.mediaMap?.primary?.url}
                                      type={
                                        item?.defaultSku?.productLists[0]?.type
                                      }
                                      name={item.defaultSku.name}
                                      nationalDrugCode={
                                        item?.defaultSku?.nationalDrugCode
                                      }
                                      amount={
                                        item?.defaultSku?.retailPrice?.amount
                                      }
                                      favorited={item?.defaultSku?.favorited}
                                    />
                                  </View>
                                );
                              }
                            )}
                          </ScrollView>
                        </View>
                      </View>
                    )}
                    <View style={styles.thikBorder} />
                    {preNegotiatedItemsProducts?.products?.length > 0 && (
                      <View style={styles.productDetailBox}>
                        <View style={styles.productBox}>
                          <View>
                            <Text
                              style={[
                                styles.FontWeight700,
                                styles.BlackTextColor,
                              ]}
                            >
                              Pre-Negotiated Items
                            </Text>
                          </View>
                          <Pressable
                            android_ripple={{ color: "#ccc" }}
                            onPress={() => {
                              preNegotiatedOpen();
                            }}
                          >
                            <Text
                              style={[
                                styles.FontWeight700,
                                styles.BlueTextColor,
                              ]}
                            >
                              See More
                            </Text>
                          </Pressable>
                        </View>

                        <View>
                          <ScrollView
                            horizontal={true}
                            showsHorizontalScrollIndicator={false}
                            style={styles.productHorizontalProductBox}
                          >
                            {preNegotiatedItemsProducts?.products?.map(
                              (item, i) => {
                                return (
                                  <View key={i}>
                                    <HomeProduct
                                      id={item?.defaultSku?.id}
                                      externalId={item?.defaultSku?.externalId}
                                      accountId={userData?.selectedAccount?.id}
                                      primaryUrl={item?.mediaMap?.primary?.url}
                                      type={
                                        item?.defaultSku?.productLists[0]?.type
                                      }
                                      name={item.defaultSku.name}
                                      nationalDrugCode={
                                        item?.defaultSku?.nationalDrugCode
                                      }
                                      amount={
                                        item?.defaultSku?.retailPrice?.amount
                                      }
                                      favorited={item?.defaultSku?.favorited}
                                    />
                                  </View>
                                );
                              }
                            )}
                          </ScrollView>
                        </View>
                      </View>
                    )}

                    <View style={styles.thikBorder} />
                    <View
                      style={
                        windowDimensions?.width > 500
                          ? { flexDirection: "row" }
                          : { flexDirection: "column" }
                      }
                    >
                      {resultFooter.map((result, i) => {
                        return (
                          <View
                            style={{
                              alignItems: "center",
                              paddingHorizontal: 10,
                            }}
                            key={i}
                          >
                            <Image
                              style={
                                windowDimensions?.width > 500
                                  ? styles.footerImagesTab
                                  : styles.footerImagesPhone
                              }
                              source={{
                                uri: `${apiUrl}${result?.imageUrl}`,
                              }}
                            />
                          </View>
                        );
                      })}
                    </View>
                  </View>
                </ScrollView>
              </View>
            </View>
          ) : (
            <Loader />
          )}
        </View>
        <View style={{ left: 0, right: 0, bottom: 0, zIndex: -1 }}>
          <TabBar />
        </View>
      </View>
    </SafeAreaView>
  );
}
