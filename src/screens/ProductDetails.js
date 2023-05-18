import {
  Text,
  View,
  Image,
  Pressable,
  TextInput,
  ScrollView,
  Modal,
  Alert,
} from "react-native";
import React, { useState, useEffect } from "react";
import Spinner from "../components/Spinner";
import Moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { useIsFocused } from "@react-navigation/native";
import {
  userInfo,
  addItem,
  orderLimitReset,
  productHistory,
  productRelated,
} from "../redux/features/productApi";
import TabBar from "../components/TabBar";
import AddButton from "../components/AddButton";
import getEnvVars from "../config/enviroment";
import { SafeAreaView } from "react-native-safe-area-context";
import { styles } from "../Style/Style";
import Loader from "../components/Loader";
import _ from "lodash";
import TooltipContainer from "../components/ToolTip";
import ProductScreen from "../components/ProductScreen";

const ProductDetails = () => {
  const dispatch = useDispatch();
  const isFocused = useIsFocused();
  const [count, setCount] = useState(1);
  const [length, setLength] = useState(1);
  const [url, setUrl] = useState();
  const [secondaryUrl, setSecondaryUrl] = useState();
  const [unitPrice, setUnitPrice] = useState();
  const [modalVisible, setModalVisible] = useState(false);
  const [orderLimit, setOrderLimit] = useState(false);
  const {
    productDetailsData,
    addItemData,
    userInfoData,
    loading,
    productHistoryData,
    productRelatedData,
    addLoading,
  } = useSelector((state) => ({
    ...state.products,
  }));
  const { apiUrl, CAMERA_IMAGE, MINUS_IMAGE, PLUS_IMAGE, CLOSE_IMAGE } =
    getEnvVars();
  const userData = userInfoData;
  const items = productDetailsData;
  const data = productRelatedData?.products;

  const addButton = () => {
    setCount(parseInt(count) + 1);
  };
  useEffect(() => {
    dispatch(userInfo());
    dispatch(productHistory(items?.id));
    setCount(1);
  }, [isFocused]);

  useEffect(() => {
    if (!!items?.productId) {
      dispatch(productRelated(items?.productId));
    }
  }, [items?.productId]);

  const removeButton = () => {
    setCount(count - 1);
  };
  async function addItemIntoCart(skuId) {
    const accountId = userData?.selectedAccount?.id;
    const quantity = count;
    try {
      dispatch(addItem({ accountId, skuId, quantity }));
    } catch (error) {
      alert("Could not Update Product!!");
    }
  }
  const changeHandler = (value, orderLimit) => {
    if (value > orderLimit) {
      Alert.alert(
        `Value can't be greater than daily order limit ${orderLimit}`
      );
      setCount(orderLimit);
      return;
    }
    setCount(value);
  };
  useEffect(() => {
    if (!!items?.product?.mediaMap?.primary?.url) {
      setLength(Object.keys(items?.product?.mediaMap)?.length);
      setUrl(items?.product?.mediaMap?.primary?.url);
    }
    if (!!items?.product?.mediaMap?.secondary?.url) {
      setSecondaryUrl(items?.product?.mediaMap?.secondary?.url);
    }
    if (!!items?.product?.mediaMap?.secondary0?.url) {
      setSecondaryUrl(items?.product?.mediaMap?.secondary0?.url);
    }
  }, [productDetailsData]);
  const discountOpenHandler = () => {
    setModalVisible((pre) => !pre);
  };
  const quantityThresholdHandler = (value) => {
    setCount(value);
  };
  useEffect(() => {
    const unit = items?.retailPrice?.amount / items.packSize;
    setUnitPrice(unit?.toFixed(2));
  }, [items]);

  const resetHandler = () => {
    setOrderLimit(false);
    dispatch(orderLimitReset());
  };

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
  }, [orderLimit]);
  let quantityAvailable = _.get(
    items,
    "availabilityDetail.quantityAvailable",
    0
  );

  let groundShipMessage = _.find(_.get(items, "itemMessages"), [
    "key",
    "item.ground.ship",
  ]);

  let refrigeratedOtherMessage = _.find(_.get(items, "itemMessages"), [
    "key",
    "item.refrigerated.other",
  ]);
  let qtyMinimumExceedsQtyAvailableMessage = _.find(items.itemMessages, [
    "key",
    "order.item.minimum.quantity.exceeds.available.inventory",
  ]);

  let qtyAvailableMessage = _.find(items.itemMessages, [
    "key",
    "item.availability",
  ]);
  let qtyItemAvailableMessage = _.find(items.itemMessages, [
    "key",
    "order.item.quantity-exceeded.control-limit",
  ]);
  let hazardousMessage = _.find(_.get(items, "itemMessages"), [
    "key",
    "item.hazardous",
  ]);
  let shortDateMessage = _.find(_.get(items, "itemMessages"), [
    "key",
    "item.short-date",
  ]);
  let dropShipMessage = _.find(_.get(items, "itemMessages"), [
    "key",
    "item.dropship",
  ]);
  let refrigeratedThursdayMessage = _.find(_.get(items, "itemMessages"), [
    "key",
    "item.refrigerated.thursday",
  ]);
  let refrigeratedWeekendMessage = _.find(_.get(items, "itemMessages"), [
    "key",
    "item.refrigerated.weekend",
  ]);

  let minQuantityMessage = _.find(_.get(items, "itemMessages"), [
    "key",
    "item.minimum-order-quantity",
  ]);
  let sourcingWarehouseClosedMessage = _.find(items.itemMessages, [
    "key",
    "item.sourcing-warehouse-closed",
  ]);
  let purchaseUnitMultipleMessage = _.find(items.itemMessages, [
    "key",
    "item.purchase.unit.multiple",
  ]);
  let dailyOrderLimitMessage = _.find(items.itemMessages, [
    "key",
    "item.daily.order.limit",
  ]);
  let specialOrderMessage = _.find(_.get(items, "itemMessages"), [
    "key",
    "item.special-order",
  ]);
  const historyPage = false;
  const returnAuthorizationsEnabled = false;
  const contractFacetLabelChangeEnabled = true;
  const date = productHistoryData?.history?.lastPurchasedDate;

  function isSubscribed(sku) {
    if (_.isNil(sku)) {
      return false;
    }
    return _.includes(
      _.map(sku.productLists, "type"),
      "INVENTORY_NOTIFICATION"
    );
  }

  return (
    <SafeAreaView
      style={{ backgroundColor: "#fff", flex: 1 }}
      edges={["right", "left"]}
    >
      <View style={{ flex: 1 }}>
        <View style={styles.mainBox}>
          {loading && <Loader />}
          {!!items?.externalId ? (
            <View style={{ flex: 1 }}>
              <ScrollView showsVerticalScrollIndicator={false}>
                <View
                  style={addLoading ? styles.mainBoxLoading : styles.mainBox}
                >
                  <View>
                    <View
                      style={{
                        height: 200,
                        marginVertical: 20,

                        flexDirection: "row",
                        justifyContent: "space-around",
                      }}
                    >
                      {length > 1 && (
                        <View>
                          <Pressable
                            onPress={() => {
                              setUrl(secondaryUrl);
                            }}
                            style={[
                              url === secondaryUrl
                                ? styles.icons
                                : styles.iconsOff,
                            ]}
                          >
                            <Image
                              style={{
                                borderRadius: 3,
                                marginVertical: 5,
                                width: 40,
                                height: 40,
                                justifyContent: "center",
                              }}
                              source={{
                                uri: `${apiUrl}${secondaryUrl}`,
                              }}
                            />
                          </Pressable>
                          <Pressable
                            onPress={() => {
                              setUrl(items?.product?.mediaMap?.primary?.url);
                            }}
                            style={[
                              url === items?.product?.mediaMap?.primary?.url
                                ? styles.icons
                                : styles.iconsOff,
                            ]}
                          >
                            <Image
                              style={{
                                borderRadius: 3,
                                marginVertical: 5,
                                width: 40,
                                height: 40,
                                justifyContent: "center",
                              }}
                              source={{
                                uri: `${apiUrl}${items?.product?.mediaMap?.primary?.url}`,
                              }}
                            />
                          </Pressable>
                        </View>
                      )}
                      {!!items?.product?.mediaMap?.primary?.url ? (
                        <>
                          <Image
                            style={{
                              borderRadius: 3,
                              marginVertical: 5,
                              width: 210,
                              height: 200,
                              justifyContent: "center",
                              alignSelf: "center",
                            }}
                            source={{
                              uri: `${apiUrl}${url}`,
                            }}
                          />
                        </>
                      ) : (
                        <>
                          <Image
                            style={{
                              width: 120,
                              height: 100,
                              marginHorizontal: 10,
                              marginVertical: 60,
                              borderRadius: 6,
                              justifyContent: "center",
                              alignSelf: "center",
                              backgroundColor: "grey",
                            }}
                            source={CAMERA_IMAGE}
                          />
                        </>
                      )}
                    </View>
                    <View
                      style={{
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <Text
                        style={{
                          color: "#006ba6",
                          fontWeight: "700",
                          fontSize: 15,
                        }}
                      >
                        {items?.name}
                      </Text>
                    </View>
                    <View>
                      <View
                        style={{
                          flexDirection: "row",
                          borderWidth: 0.3,
                          justifyContent: "center",
                          margin: 10,
                        }}
                      >
                        <View style={{ paddingHorizontal: 15 }}>
                          <View style={{ paddingVertical: 10 }}>
                            <Text
                              style={{ color: "#494c4c", fontWeight: "700" }}
                            >
                              INV PRICE
                            </Text>
                          </View>
                          <View
                            style={{
                              justifyContent: "center",
                              alignItems: "center",
                              paddingVertical: 10,
                            }}
                          >
                            <Text
                              style={{ color: "#494c4c", fontWeight: "700" }}
                            >
                              ${items?.retailPrice?.amount?.toFixed(2)}
                            </Text>
                          </View>
                        </View>
                        <View
                          style={{
                            borderLeftWidth: 0.3,
                            paddingHorizontal: 15,
                          }}
                        >
                          <View style={{ paddingVertical: 10 }}>
                            <Text
                              style={{ color: "#494c4c", fontWeight: "700" }}
                            >
                              EST. NET PRICE
                            </Text>
                          </View>
                          <View
                            style={{
                              justifyContent: "center",
                              alignItems: "center",
                              paddingVertical: 10,
                            }}
                          >
                            <Text
                              style={{ color: "#494c4c", fontWeight: "700" }}
                            >
                              $
                              {items?.netPriceDetail?.basePrice?.price?.amount?.toFixed(
                                2
                              )}
                            </Text>
                          </View>
                        </View>
                        <View
                          style={{
                            borderLeftWidth: 0.3,
                            paddingHorizontal: 15,
                          }}
                        >
                          <View style={{ paddingVertical: 10 }}>
                            <Text
                              style={{ color: "#494c4c", fontWeight: "700" }}
                            >
                              PER UNIT
                            </Text>
                          </View>
                          <View
                            style={{
                              justifyContent: "center",
                              alignItems: "center",
                              paddingVertical: 10,
                            }}
                          >
                            <Text
                              style={{ color: "#494c4c", fontWeight: "700" }}
                            >
                              ${unitPrice}
                            </Text>
                          </View>
                        </View>
                      </View>
                      <View
                        style={{
                          justifyContent: "center",
                          flexDirection: "row",
                          paddingVertical: 10,
                        }}
                      >
                        {items?.netPriceDetail?.tiers?.length > 1 ? (
                          <View
                            style={{
                              justifyContent: "center",
                              backgroundColor: "#fff",
                              width: 145,
                              marginHorizontal: 10,
                            }}
                          >
                            <View
                              style={{
                                borderColor: "#ed8b00",
                                borderWidth: 2,
                                height: 25,
                                borderRadius: 4,
                                alignItems: "center",
                                flexDirection: "row",
                                paddingHorizontal: 10,
                              }}
                            >
                              <Pressable onPress={() => discountOpenHandler()}>
                                <View
                                  style={{
                                    flexDirection: "row",
                                    alignItems: "center",
                                  }}
                                >
                                  <View>
                                    <Text
                                      style={{
                                        fontWeight: "700",
                                        fontSize: 12,
                                        color: "#494c4c",
                                      }}
                                    >
                                      Volume Discount
                                    </Text>
                                  </View>
                                  <View style={{ marginLeft: 5 }}>
                                    <View
                                      style={{
                                        justifyContent: "center",
                                      }}
                                    >
                                      {modalVisible ? (
                                        <Image
                                          style={{ height: 10, width: 10 }}
                                          source={MINUS_IMAGE}
                                        />
                                      ) : (
                                        <Image
                                          style={{ height: 10, width: 10 }}
                                          source={PLUS_IMAGE}
                                        />
                                      )}
                                    </View>
                                  </View>
                                </View>
                              </Pressable>
                              <Modal
                                animationType={"fade"}
                                transparent={true}
                                visible={modalVisible}
                                onRequestClose={() => {
                                  setModalVisible(!modalVisible);
                                }}
                              >
                                <View
                                  style={{
                                    backgroundColor: "#fff",
                                    margin: 10,
                                    width: "80%",
                                    alignSelf: "center",
                                    marginTop: 250,
                                    shadowColor: "#000",
                                    shadowOffset: {
                                      width: 0,
                                      height: 2,
                                    },
                                    shadowOpacity: 0.25,
                                    shadowRadius: 4,
                                    elevation: 5,
                                    borderRadius: 5,
                                  }}
                                >
                                  <View
                                    style={{
                                      justifyContent: "flex-end",
                                      padding: 10,
                                      borderBottomWidth: 1,
                                      borderColor: "#ececec",
                                      flexDirection: "row",
                                    }}
                                  >
                                    <Pressable
                                      onPress={() =>
                                        setModalVisible(!modalVisible)
                                      }
                                      style={{
                                        justifyContent: "center",
                                        paddingHorizontal: 10,
                                      }}
                                    >
                                      <Image
                                        source={CLOSE_IMAGE}
                                        style={{
                                          width: 20,
                                          height: 20,
                                        }}
                                      />
                                    </Pressable>
                                  </View>

                                  <View>
                                    {items?.netPriceDetail?.tiers?.map(
                                      (item, i) => {
                                        return (
                                          <View key={i} style={{ padding: 10 }}>
                                            <Pressable
                                              style={{
                                                flexDirection: "row",
                                                justifyContent: "space-between",
                                              }}
                                              onPress={() => {
                                                quantityThresholdHandler(
                                                  item?.quantityThreshold,
                                                  item?.skuPrice?.price?.amount?.toFixed(
                                                    2
                                                  )
                                                );
                                              }}
                                            >
                                              <Text
                                                style={{
                                                  fontWeight: "700",
                                                  fontSize: 12,
                                                  color: "#494c4c",
                                                }}
                                              >
                                                BUY {item?.quantityThreshold}
                                              </Text>
                                              <View
                                                style={{
                                                  marginHorizontal: 10,

                                                  paddingLeft: 10,
                                                }}
                                              >
                                                <Text
                                                  style={{
                                                    fontSize: 12,
                                                    color: "#494c4c",
                                                  }}
                                                >
                                                  $
                                                  {item?.skuPrice?.price?.amount?.toFixed(
                                                    2
                                                  )}
                                                </Text>
                                              </View>
                                            </Pressable>
                                          </View>
                                        );
                                      }
                                    )}
                                  </View>
                                </View>
                              </Modal>
                            </View>
                          </View>
                        ) : null}
                        <View
                          style={{
                            backgroundColor: "#fff",
                            height: 25,
                            borderRadius: 3,
                            borderRadius: 4,
                            justifyContent: "space-between",
                            flexDirection: "row",
                            borderWidth: 1,
                            borderColor: "#878787",
                          }}
                        >
                          <Pressable
                            style={{
                              borderRightWidth: 1,
                              borderColor: "#878787",
                              alignItems: "center",
                              justifyContent: "center",
                              paddingHorizontal: 5,
                              backgroundColor: "#cfcccc",
                            }}
                            onPress={() => {
                              removeButton();
                            }}
                            disabled={count === 1}
                          >
                            <Text
                              style={{
                                fontWeight: "bold",
                                fontSize: 15,
                              }}
                            >
                              -
                            </Text>
                          </Pressable>
                          <View
                            style={{
                              alignSelf: "center",
                            }}
                          >
                            <TextInput
                              style={{
                                color: "#005185",
                                alignSelf: "center",
                                justifyContent: "center",
                                textAlign: "center",
                                width: 30,
                              }}
                              onChangeText={(value) =>
                                changeHandler(value, items.dailyOrderLimit)
                              }
                              keyboardType="number-pad"
                            >
                              {count}
                            </TextInput>
                          </View>
                          {!!items.dailyOrderLimit ? (
                            <Pressable
                              style={{
                                borderLeftWidth: 1,
                                borderColor: "#878787",
                                alignItems: "center",
                                justifyContent: "center",
                                paddingHorizontal: 5,
                                backgroundColor: "#cfcccc",
                              }}
                              onPress={() => {
                                addButton();
                              }}
                              disabled={count === items.dailyOrderLimit}
                            >
                              <Text
                                style={{
                                  fontWeight: "bold",
                                  fontSize: 15,
                                }}
                              >
                                +
                              </Text>
                            </Pressable>
                          ) : (
                            <Pressable
                              style={{
                                borderLeftWidth: 1,
                                borderColor: "#878787",
                                alignItems: "center",
                                justifyContent: "center",
                                paddingHorizontal: 5,
                                backgroundColor: "#cfcccc",
                              }}
                              onPress={() => {
                                addButton();
                              }}
                            >
                              <Text
                                style={{
                                  fontWeight: "bold",
                                  fontSize: 15,
                                }}
                              >
                                +
                              </Text>
                            </Pressable>
                          )}
                        </View>
                        <View style={{ marginHorizontal: 10 }}>
                          <AddButton
                            onPress={() => addItemIntoCart(items?.id)}
                            count={count}
                          />
                        </View>
                      </View>

                      {!!items.dailyOrderLimit && (
                        <View
                          style={{
                            height: 20,
                            justifyContent: "center",
                            alignItems: "center",
                          }}
                        >
                          {count === items.dailyOrderLimit && (
                            <Text style={{ fontSize: 12, color: "#bd1c1c" }}>
                              Daily Order Limit: {items.dailyOrderLimit}
                            </Text>
                          )}
                        </View>
                      )}
                    </View>
                    <View>
                      <View
                        style={{
                          borderWidth: 0.5,
                          borderColor: "#ececec",
                          paddingHorizontal: 10,
                        }}
                      >
                        <View
                          style={{
                            flexDirection: "row",
                            paddingVertical: 5,
                          }}
                        >
                          <Text
                            style={{
                              fontWeight: "700",
                              fontSize: 12,
                              color: "#494c4c",
                            }}
                          >
                            {items?.generic ? "Brand" : "Generic"} Equivalent:{" "}
                          </Text>
                          <Text style={{ fontSize: 12, color: "#494c4c" }}>
                            {items?.product?.name}
                          </Text>
                        </View>
                        <View
                          style={{
                            flexDirection: "row",
                            paddingVertical: 5,
                          }}
                        >
                          <Text
                            style={{
                              fontWeight: "700",
                              fontSize: 12,
                              color: "#494c4c",
                            }}
                          >
                            Item:{" "}
                          </Text>
                          <Text style={{ fontSize: 12, color: "#494c4c" }}>
                            {items?.externalId}
                          </Text>
                        </View>
                        <View
                          style={{
                            paddingVertical: 5,
                            flexWrap: "wrap",
                            flexDirection: "row",
                            flex: 1,
                          }}
                        >
                          <Text
                            style={{
                              fontWeight: "700",
                              fontSize: 12,
                              color: "#494c4c",
                            }}
                          >
                            UPC:{" "}
                          </Text>
                          <Text
                            style={{
                              fontSize: 12,
                              flexWrap: "wrap",
                              flex: 1,
                              color: "#494c4c",
                            }}
                          >
                            {items?.upc}
                          </Text>
                        </View>
                        <View
                          style={{
                            paddingVertical: 5,
                            flexWrap: "wrap",
                            flexDirection: "row",
                            flex: 1,
                          }}
                        >
                          <Text
                            style={{
                              fontWeight: "700",
                              fontSize: 12,
                              color: "#494c4c",
                            }}
                          >
                            NDC:{" "}
                          </Text>
                          <Text
                            style={{
                              fontSize: 12,
                              flexWrap: "wrap",
                              flex: 1,
                              color: "#494c4c",
                            }}
                          >
                            {items?.nationalDrugCode}
                          </Text>
                        </View>
                        <View
                          style={{
                            paddingVertical: 5,
                            flexWrap: "wrap",
                            flexDirection: "row",
                            flex: 1,
                          }}
                        >
                          <Text
                            style={{
                              fontWeight: "700",
                              fontSize: 12,
                              color: "#494c4c",
                            }}
                          >
                            Size:{" "}
                          </Text>
                          <Text
                            style={{
                              fontSize: 12,
                              flexWrap: "wrap",
                              color: "#494c4c",
                              flex: 1,
                            }}
                          >
                            {items?.packSizeDisplay}
                          </Text>
                        </View>
                        <View
                          style={{
                            paddingVertical: 5,
                            flexWrap: "wrap",
                            flexDirection: "row",
                            flex: 1,
                          }}
                        >
                          <Text
                            style={{
                              fontWeight: "700",
                              fontSize: 12,
                              color: "#494c4c",
                            }}
                          >
                            Form:{" "}
                          </Text>
                          <Text
                            style={{
                              fontSize: 12,
                              flexWrap: "wrap",
                              color: "#494c4c",
                              flex: 1,
                            }}
                          >
                            {items?.itemForm}
                          </Text>
                        </View>
                        <View
                          style={{
                            paddingVertical: 5,
                            flexWrap: "wrap",
                            flexDirection: "row",
                            flex: 1,
                          }}
                        >
                          <Text
                            style={{
                              fontWeight: "700",
                              fontSize: 12,
                              color: "#494c4c",
                            }}
                          >
                            Manufacturer:{" "}
                          </Text>
                          <Text
                            style={{
                              fontSize: 12,
                              flexWrap: "wrap",
                              color: "#494c4c",
                              flex: 1,
                            }}
                          >
                            {items?.manufacturer}
                          </Text>
                        </View>
                      </View>
                      {!_.isUndefined(groundShipMessage) ? (
                        <View style={{ margin: 10 }}>
                          <Text style={{ color: "#cd2237", fontSize: 12 }}>
                            {groundShipMessage.message}
                          </Text>
                        </View>
                      ) : null}
                      {!quantityAvailable ? (
                        <View style={{ margin: 10 }}>
                          {_.isUndefined(specialOrderMessage) ? (
                            <Text style={{ color: "#cd2237", fontSize: 12 }}>
                              {groundShipMessage?.message}
                            </Text>
                          ) : null}
                        </View>
                      ) : null}
                      {!_.isUndefined(qtyMinimumExceedsQtyAvailableMessage) ? (
                        <View style={{ margin: 10 }}>
                          <Text style={{ color: "#cd2237", fontSize: 12 }}>
                            {qtyMinimumExceedsQtyAvailableMessage.message}
                          </Text>
                        </View>
                      ) : null}
                      {!_.isUndefined(qtyAvailableMessage) ? (
                        <View style={{ margin: 10 }}>
                          <Text style={{ color: "#cd2237", fontSize: 12 }}>
                            {qtyAvailableMessage.message}
                          </Text>
                        </View>
                      ) : null}
                      {!_.isUndefined(qtyItemAvailableMessage) ? (
                        <View style={{ margin: 10 }}>
                          <Text style={{ color: "#cd2237", fontSize: 12 }}>
                            {qtyItemAvailableMessage.message}
                          </Text>
                        </View>
                      ) : null}
                      {!_.isUndefined(hazardousMessage) ? (
                        <View style={{ margin: 10 }}>
                          <Text style={{ color: "#cd2237", fontSize: 12 }}>
                            {hazardousMessage.message}
                          </Text>
                        </View>
                      ) : null}
                      {!_.isUndefined(shortDateMessage) ? (
                        <View style={{ margin: 10 }}>
                          <Text style={{ color: "#cd2237", fontSize: 12 }}>
                            {shortDateMessage.message}
                          </Text>
                        </View>
                      ) : null}
                      {!_.isUndefined(dropShipMessage) ? (
                        <View style={{ margin: 10 }}>
                          <Text style={{ color: "#cd2237", fontSize: 12 }}>
                            {dropShipMessage.message}
                          </Text>
                        </View>
                      ) : null}
                      {!_.isUndefined(refrigeratedThursdayMessage) ? (
                        <View style={{ margin: 10 }}>
                          <Text style={{ color: "#cd2237", fontSize: 12 }}>
                            {refrigeratedThursdayMessage.message}
                          </Text>
                        </View>
                      ) : null}
                      {!_.isUndefined(refrigeratedWeekendMessage) ? (
                        <View style={{ margin: 10 }}>
                          <Text style={{ color: "#cd2237", fontSize: 12 }}>
                            {refrigeratedWeekendMessage.message}
                          </Text>
                        </View>
                      ) : null}
                      {!_.isUndefined(refrigeratedOtherMessage) ? (
                        <View style={{ margin: 10 }}>
                          <Text style={{ color: "#cd2237", fontSize: 12 }}>
                            {refrigeratedOtherMessage.message}
                          </Text>
                        </View>
                      ) : null}
                      {!_.isUndefined(minQuantityMessage) ? (
                        <View style={{ margin: 10 }}>
                          <Text style={{ color: "#cd2237", fontSize: 12 }}>
                            {minQuantityMessage.message}
                          </Text>
                        </View>
                      ) : null}
                      {!_.isUndefined(sourcingWarehouseClosedMessage) ? (
                        <View style={{ margin: 10 }}>
                          <Text style={{ color: "#cd2237", fontSize: 12 }}>
                            {sourcingWarehouseClosedMessage.message}
                          </Text>
                        </View>
                      ) : null}
                      {!_.isUndefined(dailyOrderLimitMessage) &&
                      !_.isUndefined(purchaseUnitMultipleMessage) ? (
                        <View style={{ margin: 10 }}>
                          <Text style={{ color: "#cd2237", fontSize: 12 }}>
                            {dailyOrderLimitMessage.message} and{" "}
                            {purchaseUnitMultipleMessage.message}
                          </Text>
                        </View>
                      ) : null}
                      {!_.isUndefined(dailyOrderLimitMessage) ? (
                        <View style={{ margin: 10 }}>
                          <Text style={{ color: "#cd2237", fontSize: 12 }}>
                            {dailyOrderLimitMessage.message}
                          </Text>
                        </View>
                      ) : null}
                      {!_.isUndefined(purchaseUnitMultipleMessage) ? (
                        <View style={{ margin: 10 }}>
                          <Text style={{ color: "#cd2237", fontSize: 12 }}>
                            {purchaseUnitMultipleMessage.message}
                          </Text>
                        </View>
                      ) : null}
                    </View>
                    <View style={{ flex: 1 }}>
                      <View style={{ marginHorizontal: 10, marginTop: 10 }}>
                        <Text
                          style={{
                            color: "#494c4c",
                            fontWeight: "bold",
                            fontSize: 14,
                            marginBottom: 5,
                          }}
                        >
                          PRODUCT DETAILS
                        </Text>
                      </View>
                      <View
                        style={{
                          flexDirection: "column",
                          flex: 1,
                          flexWrap: "wrap",
                          marginHorizontal: 10,
                        }}
                      >
                        {items.netPriceItem && !historyPage && (
                          <TooltipContainer
                            value="NET PRICE ITEM"
                            uri="/cmsstatic/images/icons/icon_netprice_hover_2.png"
                            title="Net Price Item"
                          />
                        )}
                        {!items.generic && !items.petFriendly && (
                          <TooltipContainer
                            value="BRAND"
                            uri="/cmsstatic/images/icons/icon_brand_hover.png"
                            title="Brand"
                          />
                        )}
                        {items.schedule === 2 && (
                          <TooltipContainer
                            value="CII"
                            uri="/cmsstatic/images/icons/icon_cii_hover.png"
                            title="CII"
                          />
                        )}
                        {items.petFriendly && (
                          <TooltipContainer
                            value="Pet"
                            uri="/cmsstatic/images/icons/icon_pet_hover.png"
                            title="Pet"
                          />
                        )}
                        {items.petFriendly && items.rxItem && (
                          <TooltipContainer
                            value="Rx"
                            uri="/cmsstatic/images/icons/icon_prescription_hover.png"
                            title="Rx"
                          />
                        )}
                        {items.refrigerated && (
                          <TooltipContainer
                            value="Refrigerated"
                            uri="/cmsstatic/images/icons/icon_refrigerated_hover.png"
                            title="Refrigerated"
                          />
                        )}
                        {items.hazardousMaterial && (
                          <TooltipContainer
                            value="Hazardous"
                            uri="/cmsstatic/images/icons/icon_hazardous_hover.png"
                            title="Hazardous"
                          />
                        )}
                        {items.groundShip && (
                          <TooltipContainer
                            value="Ground Ship"
                            uri="/cmsstatic/images/icons/icon_groundship.png"
                            title="Ground Ship"
                          />
                        )}
                        {items.dropShipOnly && (
                          <TooltipContainer
                            value="Drop Ship"
                            uri="/cmsstatic/images/icons/icon_dropship_hover.png"
                            title="Drop Ship"
                          />
                        )}
                        {items.itemRating === "AB" && (
                          <TooltipContainer
                            value="AB Rated"
                            uri="/cmsstatic/images/icons/icon_ab_rated_hover.png"
                            title="AB Rated"
                          />
                        )}
                        {items.rewardItem && !historyPage && (
                          <TooltipContainer
                            value="Rewards"
                            uri="/cmsstatic/images/icons/icon_rewards_hover.png"
                            title="Rewards"
                          />
                        )}
                        {items.priceType === "INDIRECT_CONTRACT" &&
                          !contractFacetLabelChangeEnabled && (
                            <TooltipContainer
                              value="Indirect Contract"
                              uri="/cmsstatic/images/icons/icon_indirectContract_hover.png"
                              title="Indirect Contract"
                            />
                          )}
                        {!_.isNil(items.priceType) &&
                          items.priceType === "DIRECT_CONTRACT" &&
                          contractFacetLabelChangeEnabled && (
                            <TooltipContainer
                              value="Anda Contract"
                              uri="/cmsstatic/images/icons/icon_anda_contract_hover.png"
                              title="Anda Contract"
                            />
                          )}
                        {items.priceType === "DIRECT_CONTRACT" &&
                          !contractFacetLabelChangeEnabled && (
                            <TooltipContainer
                              value="Formulary Contract"
                              uri="/cmsstatic/images/icons/icon_directContract_hover.png"
                              title="Formulary Contract"
                            />
                          )}
                        {!_.isNil(items.priceType) &&
                          items.priceType === "INDIRECT_CONTRACT" &&
                          contractFacetLabelChangeEnabled && (
                            <TooltipContainer
                              value="Manufacturer Contract"
                              uri="/cmsstatic/images/icons/icon_anda_mfg_contract_hover.png"
                              title="Manufacturer Contract"
                            />
                          )}

                        {!_.isNil(items.itemReturnable) &&
                          !items.itemReturnable &&
                          !returnAuthorizationsEnabled && (
                            <TooltipContainer
                              value={items?.itemNoReturnMsg}
                              uri="/cmsstatic/images/icons/icon_noreturns.png"
                              title={items?.itemNoReturnMsg}
                            />
                          )}
                      </View>
                      <View
                        style={{
                          flexDirection: "row",
                          alignItems: "center",
                          marginHorizontal: 10,
                        }}
                      >
                        <Text
                          style={{
                            color: "#494c4c",
                            fontWeight: "bold",
                            fontSize: 12,
                          }}
                        >
                          Country Of Origin:
                        </Text>

                        <Text
                          style={{
                            color: "#494c4c",
                            fontSize: 12,
                          }}
                        >
                          {" "}
                          {items?.country}
                        </Text>
                      </View>
                      <View
                        style={{
                          flexDirection: "row",
                          alignItems: "center",
                          marginTop: 10,
                          marginHorizontal: 10,
                        }}
                      >
                        <Text
                          style={{
                            color: "#494c4c",
                            fontWeight: "bold",
                            fontSize: 12,
                          }}
                        >
                          AWP Price:
                        </Text>

                        <Text
                          style={{
                            color: "#494c4c",
                            fontSize: 12,
                          }}
                        >
                          {" "}
                          ${items?.avgWholesalePrice?.amount?.toFixed(2)}
                        </Text>
                      </View>
                      <View
                        style={{
                          flexDirection: "row",
                          alignItems: "center",
                          marginVertical: 10,
                          marginHorizontal: 10,
                        }}
                      >
                        <Text
                          style={{
                            color: "#494c4c",
                            fontSize: 12,
                            fontWeight: "bold",
                          }}
                        >
                          Your last purchased{" "}
                          {productHistoryData?.history?.lastPurchasedQuantity}{" "}
                          on {Moment(date).format(" MMMM DD, YYYY")}
                        </Text>
                      </View>
                      {data?.length > 0 ? (
                        <View style={{ marginHorizontal: 10, marginTop: 10 }}>
                          <Text
                            style={{
                              color: "#494c4c",
                              fontWeight: "bold",
                              fontSize: 14,
                              marginBottom: 5,
                            }}
                          >
                            Related Products
                          </Text>
                        </View>
                      ) : null}
                      <View>
                        {data?.length > 0 ? (
                          <View>
                            <View>
                              {data?.map((item, i) => {
                                let shortDateOrCloseOut =
                                  (!_.isNil(
                                    item?.defaultSku?.shortOrCloseOutDate
                                  ) &&
                                    item?.defaultSku?.shortOrCloseOutDate !==
                                      "" &&
                                    item?.defaultSku?.inventoryClassKey ===
                                      "S") ||
                                  item?.defaultSku?.inventoryClassKey === "C";
                                let quantityAvailable = _.get(
                                  item?.defaultSku,
                                  "availabilityDetail.quantityAvailable",
                                  0
                                );
                                let restrictionReason = _.get(
                                  item?.defaultSku,
                                  "availabilityDetail.category"
                                );
                                let quantityMinimumOrder = _.get(
                                  item?.defaultSku,
                                  "minOrderQuantity",
                                  999999
                                );

                                const subscribed = isSubscribed(
                                  item?.defaultSku
                                );

                                return (
                                  <View
                                    key={item?.defaultSku?.id}
                                    style={{
                                      zIndex: -i,
                                    }}
                                  >
                                    <ProductScreen
                                      url={item?.mediaMap?.primary?.url}
                                      name={item?.defaultSku?.name}
                                      externalId={item?.defaultSku?.externalId}
                                      nationalDrugCode={
                                        item?.defaultSku?.nationalDrugCode
                                      }
                                      manufacturer={
                                        item?.defaultSku?.manufacturer
                                      }
                                      itemForm={item?.defaultSku?.itemForm}
                                      description={
                                        item?.defaultSku?.description
                                      }
                                      netPriceItem={
                                        item?.defaultSku?.netPriceItem
                                      }
                                      amount={
                                        item?.defaultSku?.salePrice?.amount
                                      }
                                      id={item?.defaultSku?.id}
                                      subscribed={subscribed}
                                      generic={item?.defaultSku?.generic}
                                      petFriendly={
                                        item?.defaultSku?.petFriendly
                                      }
                                      schedule={item?.defaultSku?.schedule}
                                      rxItem={item?.defaultSku?.rxItem}
                                      refrigerated={
                                        item?.defaultSku?.refrigerated
                                      }
                                      hazardousMaterial={
                                        item?.defaultSku?.hazardousMaterial
                                      }
                                      groundShip={item?.defaultSku?.groundShip}
                                      dropShipOnly={
                                        item?.defaultSku?.dropShipOnly
                                      }
                                      itemRating={item?.defaultSku?.itemRating}
                                      rewardItem={item?.defaultSku?.rewardItem}
                                      priceType={item?.defaultSku?.priceType}
                                      inventoryClassKey={
                                        item?.defaultSku?.inventoryClassKey
                                      }
                                      orderLimit={
                                        item?.defaultSku?.dailyOrderLimit
                                      }
                                      accountId={userData?.selectedAccount?.id}
                                      itemReturnable={
                                        item?.defaultSku?.itemReturnable
                                      }
                                      discount={
                                        item?.defaultSku?.netPriceDetail?.tiers
                                      }
                                      isPriceLocked={
                                        item?.defaultSku?.priceLocked
                                      }
                                      vendorStateLicenseValid={
                                        item?.defaultSku
                                          ?.vendorStateLicenseValid
                                      }
                                      retailPrice={
                                        item?.defaultSku?.retailPrice
                                      }
                                      quantityAvailable={quantityAvailable}
                                      restrictionReason={restrictionReason}
                                      quantityMinimumOrder={
                                        quantityMinimumOrder
                                      }
                                      type={
                                        item?.defaultSku?.productLists[0]?.type
                                      }
                                      itemMessages={
                                        item?.defaultSku?.itemNoReturnMsg
                                      }
                                      bestPrice={item?.defaultSku?.bestPrice}
                                      shortDateOrCloseOut={shortDateOrCloseOut}
                                    />
                                  </View>
                                );
                              })}
                            </View>
                          </View>
                        ) : null}
                      </View>
                    </View>
                  </View>
                </View>
              </ScrollView>
            </View>
          ) : (
            <Loader />
          )}
        </View>
        <View style={{ left: 0, right: 0, bottom: 0 }}>
          <TabBar />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ProductDetails;
