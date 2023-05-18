import {
  Text,
  View,
  Pressable,
  TextInput,
  Image,
  ScrollView,
  Alert,
  StatusBar,
  Modal,
  ActivityIndicator,
} from "react-native";
import React, { useState, useEffect } from "react";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import Spinner from "../components/Spinner";
import Loader from "../components/Loader";
import { useDispatch, useSelector } from "react-redux";
import CartScreen from "../components/CartScreen";
import {
  emptyCartItems,
  cartValidating,
  orderLimitReset,
} from "../redux/features/productApi";
import { poDataInserter, setPoData } from "../redux/features/authUser";
import Navbar from "../components/Searchbar";
import TabBar from "../components/TabBar";
import moment from "moment";
import _ from "lodash";
import CartInfo from "../components/CartInfo";
import getEnvVars from "../config/enviroment";
import { styles } from "../Style/Style";

//This component has the components and functions of Items categories sections like "Standard Items" and "CII Items"
const ExpandComponent = (props) => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [standardItems, setStandardItems] = useState("");
  const [cIIItems, setCIIItems] = useState("");
  const [openCII, setCIIOpen] = useState(false);
  const [newData, setNewData] = useState("");
  const [notFound, setNotFound] = useState(true);

  //This Open handler function helps in expand and shrink the Items categories sections.
  const openHandler = (val) => {
    props.onPress();
    if (val === "Standard Items") {
      setOpen((pre) => !pre);
      setCIIOpen(false);
    }
    if (val === "CII Items") {
      setOpen(false);
      setCIIOpen((pre) => !pre);
    }
    if (val === "Items") {
      setOpen((pre) => !pre);
    }
  };

  //API responses
  const { cartValidateInfo, cartLength, updateCart, isFocused, loading } =
    useSelector((state) => ({
      ...state.products,
    }));
  const { MINUS_IMAGE, PLUS_IMAGE } = getEnvVars();

  const cartData = cartValidateInfo?.order;
  const fulfillmentGroups = newData;

  //This functionality helps in to get order items from api
  function getOrderItemsByFulfillmentGroup(order, fulfillmentGroup) {
    let orderItemIds = _.map(
      fulfillmentGroup?.fulfillmentGroupItems,

      (fgItem) => fgItem.orderItemId
    );
    return _.filter(order?.orderItems, (orderItem) =>
      _.includes(orderItemIds, orderItem.id)
    );
  }
  const getOrderItems = () => {
    return getOrderItemsByFulfillmentGroup(cartData, standardItems);
  };
  const getOrderCIIItems = () => {
    return getOrderItemsByFulfillmentGroup(cartData, cIIItems);
  };

  let orderItemsData = getOrderItems();
  let getOrderCIIItemsData = getOrderCIIItems();

  //This functionality helps in to show the data in Items categories as expanded sections initially
  useEffect(() => {
    if (fulfillmentGroups?.length > 1) {
      setStandardItems(fulfillmentGroups[0]);
      setCIIItems(fulfillmentGroups[1]);
    } else {
      setStandardItems(fulfillmentGroups[0]);
      setCIIItems(fulfillmentGroups[0]);
    }
    if (props.fieldName == "Standard Items") {
      setOpen(true);
      setCIIOpen(false);
    }
    if (props.fieldName == "CII Items") {
      setOpen(false);
      setCIIOpen(true);
    }
    if (props.fieldName === "Items") {
      setOpen(true);
    }
    {
      const data = _.map(
        _.orderBy(
          cartData?.fulfillmentGroups,
          ["fulfillmentType.friendlyName"],
          ["desc"]
        )
      );
      setNewData(data);
    }
  }, [cartData]);

  return (
    <View style={{ paddingHorizontal: 10 }}>
      {!!orderItemsData?.length ? (
        <View>
          <Pressable
            style={styles.fieldName}
            onPress={() => openHandler(props.fieldName)}
          >
            <View
              style={{
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {open || openCII ? (
                <View>
                  <Image source={MINUS_IMAGE} style={styles.expandButton} />
                </View>
              ) : (
                <View>
                  <Image source={PLUS_IMAGE} style={styles.expandButton} />
                </View>
              )}

              <Text style={{ marginHorizontal: 10 }}>{props.fieldName}</Text>
            </View>
            <Text>
              SubTotal:
              <Text> ${props?.amount?.toFixed(2)}</Text>
            </Text>
          </Pressable>
          {open ? (
            <View
              style={props.loading ? styles.mainBoxLoading : styles.mainBox}
            >
              {orderItemsData?.map((item, i) => {
                return (
                  <View key={i}>
                    <CartScreen
                      url={item?.primaryMedia?.url}
                      name={item?.sku?.name}
                      nationalDrugCode={item?.sku?.nationalDrugCode}
                      externalId={item?.sku?.externalId}
                      manufacturer={item?.sku?.manufacturer}
                      description={item?.sku?.description}
                      itemForm={item?.sku?.itemForm}
                      id={item?.id}
                      amount={item?.salePrice.amount}
                      quantity={item?.quantity}
                      skuId={item?.sku?.id}
                      orderLimit={item?.sku?.dailyOrderLimit}
                      type={item?.sku?.productLists[0]?.type}
                      itemReturnable={item?.sku?.itemReturnable}
                      isCart={true}
                      validations={item?.validationEvents}
                      generic={item?.sku?.generic}
                      petFriendly={item?.sku?.petFriendly}
                      schedule={item?.sku?.schedule}
                      rxItem={item?.sku?.rxItem}
                      refrigerated={item?.sku?.refrigerated}
                      hazardousMaterial={item?.sku?.hazardousMaterial}
                      groundShip={item?.sku?.groundShip}
                      dropShipOnly={item?.sku?.dropShipOnly}
                      itemRating={item?.sku?.itemRating}
                      rewardItem={item?.sku?.rewardItem}
                      priceType={item?.sku?.priceType}
                      inventoryClassKey={item?.sku?.inventoryClassKey}
                      discount={item?.sku?.netPriceDetail?.tiers}
                      isPriceLocked={item?.sku?.priceLocked}
                      vendorStateLicenseValid={
                        item?.sku?.vendorStateLicenseValid
                      }
                      retailPrice={item?.sku?.retailPrice}
                      netPriceItem={item?.sku?.netPriceItem}
                      itemMessages={item?.sku?.itemNoReturnMsg}
                      message={item?.sku?.itemMessages}
                    />
                  </View>
                );
              })}
            </View>
          ) : null}
          {/* This View Section shows the C2 data  */}
          {openCII ? (
            <View
              style={props.loading ? styles.mainBoxLoading : styles.mainBox}
            >
              {getOrderCIIItemsData?.map((item, i) => {
                return (
                  <View key={i}>
                    <CartScreen
                      url={item?.primaryMedia?.url}
                      name={item?.sku?.name}
                      nationalDrugCode={item?.sku?.nationalDrugCode}
                      externalId={item?.sku?.externalId}
                      manufacturer={item?.sku?.manufacturer}
                      description={item?.sku?.description}
                      itemForm={item?.sku?.itemForm}
                      id={item?.id}
                      amount={item?.salePrice.amount}
                      quantity={item?.quantity}
                      skuId={item?.sku?.id}
                      orderLimit={item?.sku?.dailyOrderLimit}
                      type={item?.sku?.productLists[0]?.type}
                      itemReturnable={item?.sku?.itemReturnable}
                      isCart={true}
                      validations={item?.validationEvents}
                      generic={item?.sku?.generic}
                      petFriendly={item?.sku?.petFriendly}
                      schedule={item?.sku?.schedule}
                      rxItem={item?.sku?.rxItem}
                      refrigerated={item?.sku?.refrigerated}
                      hazardousMaterial={item?.sku?.hazardousMaterial}
                      groundShip={item?.sku?.groundShip}
                      dropShipOnly={item?.sku?.dropShipOnly}
                      itemRating={item?.sku?.itemRating}
                      rewardItem={item?.sku?.rewardItem}
                      priceType={item?.sku?.priceType}
                      inventoryClassKey={item?.sku?.inventoryClassKey}
                      discount={item?.sku?.netPriceDetail?.tiers}
                      isPriceLocked={item?.sku?.priceLocked}
                      vendorStateLicenseValid={
                        item?.sku?.vendorStateLicenseValid
                      }
                      retailPrice={item?.sku?.retailPrice}
                      netPriceItem={item?.sku?.netPriceItem}
                      itemMessages={item?.sku?.itemNoReturnMsg}
                      message={item?.sku?.itemMessages}
                    />
                  </View>
                );
              })}
            </View>
          ) : null}
        </View>
      ) : (
        <View style={{ flex: 1, height: "100%", marginTop: "50%" }}>
          <ActivityIndicator size="large" />
        </View>
      )}
    </View>
  );
};
const Cart = () => {
  const dispatch = useDispatch();
  const isFocused = useIsFocused();
  const [modalVisible, setShow] = useState(false);
  const navigation = useNavigation();
  const [fulfillmentGroupsData, setFulfillmentGroupsData] = useState("");
  useState("");
  const [showDetails, setShowDetails] = useState(false);
  const [borderWidth, setBorderWidth] = useState(5);
  const [POValue, setPOValue] = useState();
  const [deliveryTime, setDeliveryTime] = useState("");
  const [deliveryTimeInMinutes, setDeliveryTimeInMinutes] = useState("");
  const [orderLimit, setOrderLimit] = useState(false);

  const {
    MINUS_IMAGE,
    PLUS_IMAGE,
    CLOSE_IMAGE,
    CLOCK_IMAGE,
    DELIVERY_TRUCK_IMAGE,
  } = getEnvVars();

  //Api responses
  const {
    cartInfoData,
    cartLength,
    loading,
    subtotal,
    updateCart,
    cartValidateInfo,
    addItemData,
    addLoading,
  } = useSelector((state) => ({
    ...state.products,
  }));
  const cartData = cartValidateInfo?.order;
  const fulfillmentGroups = cartData?.fulfillmentGroups;
  const minimumOrderItems =
    cartData?.customer?.selectedAccount?.minimumOrderAmount;

  //This functionality handles the Alert warning if user wants to empty the cart

  async function emptyCart(id) {
    Alert.alert(
      "Hold on!",
      "Are you sure you want to remove all items from your cart?",
      [
        {
          text: "NO",
          onPress: () => null,
          style: "NO",
        },
        { text: "YES", onPress: () => dispatch(emptyCartItems(id)) },
      ]
    );
  }

  //This functionality handles the cart submission process
  async function SubmitCart() {
    try {
      dispatch(cartValidating());
      if (!!POValue) {
        dispatch(
          poDataInserter({
            poValue: POValue,
            groupId: cartInfoData?.fulfillmentGroups[0]?.id,
          })
        );
        dispatch(setPoData(POValue));
      }

      navigation.navigate("SubmitCart");
    } catch (error) {
      Alert.alert("Could Not Empty Cart!!");
    }
  }

  //This function open/close the clock modal
  const modelOpenHandler = () => {
    setShow((pre) => !pre);
  };

  const expnadHandler = (value) => {
    if (value === "Standard Items") {
      return;
    }
    if (value === "Items") {
      setFulfillmentGroupsData(fulfillmentGroups[0]);
      return;
    }
    if (value === "CII Items") {
      if (fulfillmentGroups?.length > 1) {
      }
      return;
    }
  };

  //This functionality helps in descending order the field "fulfillmentType.friendlyName"  from the Api
  let pricedFulfillmentGroups = _.orderBy(
    _.filter(
      cartData?.fulfillmentGroups,
      (fulfillmentGroup) => !_.isUndefined(fulfillmentGroup.merchandiseTotal)
    ),
    ["fulfillmentType.friendlyName"],
    ["desc"]
  );

  function isFgCsos(fg) {
    return _.get(fg, "fulfillmentType.type") === "CSOS";
  }

  //This functionality returns the Items categories sections
  function getFriendlyFulfillmentType(order, fg) {
    if (_.size(order?.fulfillmentGroups) > 1) {
      return fg.fulfillmentType.friendlyName;
    }

    if (isFgCsos(fg)) {
      return fg.fulfillmentType.friendlyName;
    } else {
      return "Items";
    }
  }
  function getOrderItemsByFulfillmentGroup(order, fulfillmentGroup) {
    let orderItemIds = _.map(
      fulfillmentGroup?.fulfillmentGroupItems,

      (fgItem) => fgItem.orderItemId
    );
    return _.filter(order?.orderItems, (orderItem) =>
      _.includes(orderItemIds, orderItem.id)
    );
  }
  const getOrderItems = () => {
    return getOrderItemsByFulfillmentGroup(cartData, fulfillmentGroupsData);
  };

  let orderItemsData = getOrderItems();

  useEffect(() => {
    const percenTage = minimumOrderItems - subtotal;
    if (percenTage >= minimumOrderItems) {
      setBorderWidth(100);
      return;
    }
    if (percenTage < 100) {
      setBorderWidth(percenTage);
      return;
    }
  }, [subtotal]);

  //This function helps in find the time left for next delivery from Api
  const findTargetFulfillmentScheduleItem = () => {
    let currentTimeData = new Date();
    let currentTime = moment(currentTimeData);

    return _.first(
      _.filter(cartData?.fulfillmentSchedule?.scheduleItems, (item) => {
        return (
          !currentTime?.isAfter(moment(item?.cutoffDate)) &&
          currentTime?.isAfter(
            moment(item?.deliveryDate).subtract(2, "d"),
            "day"
          )
        );
      })
    );
  };
  useEffect(() => {
    dispatch(cartValidating());
  }, [cartLength, updateCart, isFocused]);

  useEffect(() => {
    let currentTimeData = new Date();
    let duration;
    let currentTime = moment(currentTimeData);
    const fulfillmentScheduleItem = findTargetFulfillmentScheduleItem();
    const cutoffDate = moment(fulfillmentScheduleItem?.cutoffDate);
    duration = moment.duration(cutoffDate?.diff(currentTime));
    setDeliveryTime(duration?.hours());
    setDeliveryTimeInMinutes(duration?.minutes());
  }, [modalVisible]);
  const poHandler = (value) => {
    setPOValue(value);
  };
  //This function helps to reset the orderLimit value
  const resetHandler = () => {
    setOrderLimit(false);
    dispatch(orderLimitReset());
  };

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
  }, [orderLimit]);

  return (
    <SafeAreaView style={styles.safeAreaView} edges={["right", "left", "top"]}>
      <StatusBar
        animated={false}
        translucent
        backgroundColor={"#063e63"}
        barStyle={"light-content"}
        hidden={false}
      />

      {addLoading && (
        <View
          style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
            position: "absolute",
            top: 200,
            bottom: 100,
            left: 0,
            right: 0,

            zIndex: 9999,
          }}
        >
          <ActivityIndicator size="large" />
        </View>
      )}

      <View style={{}}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setShow(!modalVisible);
          }}
        >
          <View style={styles.countModalView}>
            <View style={styles.shipCountBox}>
              <View style={{}}>
                <Text style={{ color: "#494c4c", fontWeight: "500" }}>
                  SHIPPING COUNT DOWN
                </Text>
              </View>
              <Pressable
                onPress={() => setShow(!modalVisible)}
                style={{ justifyContent: "center" }}
              >
                <Image source={CLOSE_IMAGE} style={styles.closeImage} />
              </Pressable>
            </View>

            <View style={styles.deliveryTimeBox}>
              <View style={{ paddingHorizontal: 10 }}>
                <Text style={{ fontWeight: "700", color: "#494c4c" }}>
                  {deliveryTime}h {deliveryTimeInMinutes}m
                </Text>
              </View>
              <View style={{ justifyContent: "center", marginHorizontal: 30 }}>
                <Text style={{ color: "#494c4c" }}>
                  Left For Next Day Delivery
                </Text>
              </View>
            </View>
          </View>
        </Modal>
      </View>
      <View
        style={{
          backgroundColor: "#fff",
          flex: 1,
        }}
      >
        <View
          style={{
            zIndex: 1,
            position: "absolute",
            backgroundColor: "#fff",
          }}
        >
          <Navbar />
        </View>

        <View style={{ flex: 1, zIndex: 0, marginTop: 60 }}>
          <View style={{ flex: 1 }}>
            {cartLength > 0 ? (
              <View style={{ marginBottom: 150 }}>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: 10,
                  }}
                >
                  <View
                    style={{
                      flexDirection: "row",
                      alignSelf: "center",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Pressable
                      onPress={() => {
                        setShowDetails((pre) => !pre);
                      }}
                      style={{ paddingHorizontal: 5 }}
                    >
                      {showDetails ? (
                        <View>
                          <Image
                            source={MINUS_IMAGE}
                            style={{
                              width: 12,
                              height: 12,
                              alignSelf: "center",
                            }}
                          />
                        </View>
                      ) : (
                        <View>
                          <View>
                            <Image
                              source={PLUS_IMAGE}
                              style={{
                                width: 12,
                                height: 12,
                                alignSelf: "center",
                              }}
                            />
                          </View>
                        </View>
                      )}
                    </Pressable>
                    <Pressable
                      onPress={() => {
                        setShowDetails((pre) => !pre);
                      }}
                    >
                      <Text style={styles.cartText}>
                        Your Cart ({cartLength} item
                        {emptyCartItems !== 1 ? "s" : ""})
                      </Text>
                    </Pressable>
                  </View>

                  <View>
                    <Text style={styles.cartText}>
                      {" "}
                      Sub Total: ${subtotal?.toFixed(2)}
                    </Text>
                  </View>
                </View>
                {showDetails ? (
                  <View style={{ justifyContent: "center" }}>
                    <Image
                      source={DELIVERY_TRUCK_IMAGE}
                      style={styles.deliveryTruckImage}
                    />
                    <View
                      style={{
                        marginHorizontal: "20%",
                        borderRadius: 3,
                        flexDirection: "row",
                        justifyContent: "space-between",
                      }}
                    >
                      <View
                        style={{
                          hieght: 10,
                          width: `${
                            borderWidth < 0 ? 100 : 100 - borderWidth
                          }%`,
                          borderWidth: 5,
                          borderColor: "#b7dd79",
                        }}
                      />
                      {borderWidth > 2 ? (
                        <View
                          style={{
                            hieght: 10,
                            width: `${borderWidth}%`,
                            borderWidth: 5,
                            borderColor: "#9b9b9b",
                          }}
                        />
                      ) : null}
                    </View>

                    {borderWidth < 0 ? (
                      <View style={styles.shippingBox}>
                        <Text>WOOHOO! Free Shipping!</Text>
                      </View>
                    ) : (
                      <View>
                        <View style={styles.shippingBox}>
                          <Text>
                            ${borderWidth?.toFixed(2)} away from free shipping
                          </Text>
                        </View>

                        <View
                          style={{
                            justifyContent: "center",
                            alignSelf: "center",
                            marginTop: 10,
                          }}
                        >
                          <Text style={{ color: "#9b9b9b" }}>
                            FREE SHIPPING AT ${minimumOrderItems}
                          </Text>
                        </View>
                      </View>
                    )}
                    <View style={{ marginVertical: 5 }}>
                      <View style={{ marginVertical: 5 }}>
                        <Text style={styles.orderText}>Order Summary</Text>
                      </View>
                      <CartInfo
                        quantity={cartData?.itemCount}
                        amount={cartData?.total?.amount}
                        totalTax={cartData?.totalTax?.amount}
                        cartData={cartData}
                        cartLength={cartLength}
                        totalShipping={cartData?.totalShipping?.amount}
                      />
                    </View>
                  </View>
                ) : null}
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-around",
                    paddingHorizontal: 30,
                  }}
                >
                  <Pressable
                    android_ripple={{ color: "#ccc" }}
                    style={styles.proceedButtonContainer}
                    onPress={() => SubmitCart()}
                  >
                    <Text style={styles.proceedButton}>
                      PROCEED TO CHECKOUT
                    </Text>
                  </Pressable>
                  <Pressable
                    onPress={() => {
                      modelOpenHandler();
                    }}
                    style={{ justifyContent: "center" }}
                  >
                    <Image
                      source={CLOCK_IMAGE}
                      style={{
                        width: 30,
                        height: 30,
                      }}
                    />
                  </Pressable>
                </View>
                <View style={styles.emptyButtonContainer}>
                  <View>
                    <TextInput
                      placeholder="Add PO#"
                      style={styles.poBox}
                      onChangeText={(value) => {
                        poHandler(value);
                      }}
                      maxLength={35}
                    />
                  </View>
                  <Pressable
                    style={styles.emptyContainer}
                    android_ripple={{ color: "#ccc" }}
                    onPress={() => emptyCart(cartData?.id)}
                  >
                    <Text style={styles.emptyText}>EMPTY CART</Text>
                  </Pressable>
                </View>

                <ScrollView>
                  {_.map(pricedFulfillmentGroups, (fulfillmentGroup, key) => {
                    const fieldName = getFriendlyFulfillmentType(
                      cartData,
                      fulfillmentGroup
                    );
                    return (
                      <View key={key}>
                        <ExpandComponent
                          fieldName={fieldName}
                          amount={fulfillmentGroup?.merchandiseTotal?.amount}
                          orderItemsData={orderItemsData}
                          loading={addLoading}
                          onPress={() => expnadHandler(fieldName)}
                        />
                      </View>
                    );
                  })}
                </ScrollView>
              </View>
            ) : (
              <View style={{ flex: 1 }}>
                <View style={styles.emptyCart}>
                  <Text style={styles.emptyCartText}>Your cart is empty</Text>
                </View>
              </View>
            )}
          </View>

          <View style={{ left: 0, right: 0, bottom: 0 }}>
            <TabBar />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Cart;
