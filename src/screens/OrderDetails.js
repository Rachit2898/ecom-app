import {
  StyleSheet,
  Text,
  View,
  Pressable,
  ScrollView,
  Image,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import React, { useState, useEffect } from "react";
import { styles } from "../Style/Style";
import TabBar from "../components/TabBar";
import { orderDetails } from "../redux/features/productApi";
import { useDispatch, useSelector } from "react-redux";
import Moment from "moment";
import _, { findLastIndex } from "lodash";
import getEnvVars from "../config/enviroment";
import CartScreen from "../components/CartScreen";
import Spinner from "../components/Spinner";
import Loader from "../components/Loader";

const ExpandComponent = (props) => {
  const [open, setOpen] = useState(true);
  const [standardItems, setStandardItems] = useState("");
  const [cIIItems, setCIIItems] = useState("");
  const [openCII, setCIIOpen] = useState(true);
  const [newData, setNewData] = useState("");

  //This Open handler function helps in expand and shrink the Items categories sections.

  //API responses

  const cartData = props.orderDetailsData;
  const fulfillmentGroups = newData;

  useEffect(() => {
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
  }, [cartData?.id]);

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
      setCIIOpen(false);
    }
  }, [newData]);

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

  return (
    <View style={{ marginHorizontal: 10 }}>
      <View>
        {props.csosOrderNumber ? (
          <View
            style={{
              backgroundColor: "#dee2e6",
              padding: 10,
              borderRadius: 4,
              marginBottom: 10,
            }}
          >
            <Text
              style={{
                color: "#494c4c",
                fontWeight: "bold",
                fontSize: 12,
                textAlign: "center",
              }}
            >
              CII ORDER INFORMATION | Supplier: ANDA, INC.
            </Text>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-around",
                marginVertical: 10,
              }}
            >
              <View style={{ width: 80 }}>
                <Text
                  style={{ color: "#494c4c", fontWeight: "bold", fontSize: 12 }}
                >
                  Ship To:
                </Text>
              </View>
              <View style={{ width: 250 }}>
                <View style={{ flexDirection: "row" }}>
                  <Text style={[styles.BlackTextColor, { fontSize: 12 }]}>
                    {
                      props.orderDetailsData?.customer?.selectedAccount
                        ?.addresses[0]?.companyName
                    }
                  </Text>
                </View>
                <View style={{ flexDirection: "row", marginTop: 5 }}>
                  <Text style={[styles.BlackTextColor, { fontSize: 12 }]}>
                    {
                      props.orderDetailsData?.customer?.selectedAccount
                        ?.addresses[0]?.addressLine1
                    }
                  </Text>
                </View>
                <View style={{ flexDirection: "row", marginTop: 5 }}>
                  <Text style={[styles.BlackTextColor, { fontSize: 12 }]}>
                    {
                      props.orderDetailsData?.customer?.selectedAccount
                        ?.addresses[0]?.addressLine2
                    }
                  </Text>
                </View>
                <View style={{ flexDirection: "row", marginTop: 5 }}>
                  <Text style={[styles.BlackTextColor, { fontSize: 12 }]}>
                    {
                      props.orderDetailsData?.customer?.selectedAccount
                        ?.addresses[0]?.city
                    }
                    ,{" "}
                    {
                      props.orderDetailsData?.customer?.selectedAccount
                        ?.addresses[0]?.countrySubdivision?.abbreviation
                    }{" "}
                    {
                      props.orderDetailsData?.customer?.selectedAccount
                        ?.addresses[0]?.postalCode
                    }
                  </Text>
                </View>
              </View>
            </View>
            <View
              style={{
                flexDirection: "row",

                justifyContent: "space-around",
              }}
            >
              <View style={{ width: 80 }}>
                <Text
                  style={{
                    color: "#494c4c",
                    fontWeight: "bold",
                    fontSize: "12",
                  }}
                >
                  Account:{" "}
                </Text>
              </View>
              <View style={{ width: 250 }}>
                <Text style={[styles.BlackTextColor, { fontSize: 12 }]}>
                  {props.orderDetailsData?.customer?.selectedAccount?.id}
                </Text>
              </View>
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-around",
                marginVertical: 10,
              }}
            >
              <View style={{ width: 80 }}>
                <Text
                  style={{
                    color: "#494c4c",
                    fontWeight: "bold",
                    fontSize: "12",
                  }}
                >
                  DEA:{" "}
                </Text>
              </View>
              <View style={{ width: 250 }}>
                <Text style={[styles.BlackTextColor, { fontSize: 12 }]}>
                  {props.orderDetailsData?.customer?.selectedAccount?.deaNumber}
                </Text>
              </View>
            </View>
          </View>
        ) : null}
        <View
          style={{
            backgroundColor: "#dee2e6",
            paddingVertical: 10,
            borderRadius: 4,
          }}
        >
          <Pressable style={{ justifyContent: "space-around" }}>
            <View>
              <View>
                {props.tpsOrderNumber || props.csosOrderNumber ? (
                  <View
                    style={{
                      flexDirection: "row",
                      marginBottom: 10,
                      justifyContent: "space-around",
                    }}
                  >
                    <View style={{ width: 150 }}>
                      <Text
                        style={{
                          color: "#494c4c",
                          fontWeight: "bold",
                          fontSize: "12",
                        }}
                      >
                        {props.fieldName} #:
                      </Text>
                    </View>
                    {props.csosOrderNumber ? (
                      <View style={{ width: 150 }}>
                        <Text style={[styles.BlackTextColor, { fontSize: 12 }]}>
                          {props.csosOrderNumber}
                        </Text>
                      </View>
                    ) : null}

                    {props.fieldName == "Items" ||
                    props.fieldName == "Standard Items" ? (
                      <View style={{ width: 150 }}>
                        <Text style={[styles.BlackTextColor, { fontSize: 12 }]}>
                          {props.tpsOrderNumber}
                        </Text>
                      </View>
                    ) : null}
                  </View>
                ) : (
                  <View
                    style={{
                      flexDirection: "row",
                      marginVertical: 10,
                      justifyContent: "space-around",
                    }}
                  >
                    <View style={{ width: 150 }}>
                      <Text
                        style={{
                          color: "#494c4c",
                          fontWeight: "bold",
                          fontSize: 12,
                        }}
                      >
                        Order #:
                      </Text>
                    </View>
                    <View style={{ width: 150 }}>
                      <Text style={[styles.BlackTextColor, { fontSize: 12 }]}>
                        Pending
                      </Text>
                    </View>
                  </View>
                )}
              </View>

              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-around",
                }}
              >
                <View style={{ width: 150 }}>
                  <Text
                    style={{
                      color: "#494c4c",
                      fontWeight: "bold",
                      fontSize: 12,
                    }}
                  >
                    Status:
                  </Text>
                </View>
                <View style={{ width: 150 }}>
                  <Text style={{ color: "#494c4c" }}>{props?.status}</Text>
                </View>
              </View>
            </View>
            <View>
              <View
                style={{
                  flexDirection: "row",
                  marginVertical: 10,
                  justifyContent: "space-around",
                }}
              >
                <View style={{ width: 150 }}>
                  <Text
                    style={{
                      color: "#494c4c",
                      fontWeight: "bold",
                      fontSize: "12",
                    }}
                  >
                    Taxes:{" "}
                  </Text>
                </View>
                <View style={{ width: 150 }}>
                  {props?.taxes ? (
                    <Text style={[styles.BlackTextColor, { fontSize: 12 }]}>
                      ${props?.taxes}
                    </Text>
                  ) : (
                    <Text style={[styles.BlackTextColor, { fontSize: 12 }]}>
                      $0.00
                    </Text>
                  )}
                </View>
              </View>
              {cartData?.totalShipping.amount ? (
                <View
                  style={{
                    flexDirection: "row",
                    marginBottom: 10,
                    justifyContent: "space-around",
                  }}
                >
                  <View style={{ width: 150 }}>
                    <Text
                      style={{
                        color: "#494c4c",
                        fontWeight: "bold",
                        fontSize: "12",
                      }}
                    >
                      Shipping Fee:{" "}
                    </Text>
                  </View>
                  <View style={{ width: 150 }}>
                    <Text style={[styles.BlackTextColor, { fontSize: 12 }]}>
                      ${cartData?.totalShipping?.amount?.toFixed(2)}
                    </Text>
                  </View>
                </View>
              ) : null}
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-around",
                }}
              >
                <View style={{ width: 150 }}>
                  <Text
                    style={{
                      color: "#494c4c",
                      fontWeight: "bold",
                      fontSize: "12",
                    }}
                  >
                    Order Total:
                  </Text>
                </View>

                <View
                  style={{
                    width: 150,
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <Text style={[styles.BlackTextColor, { fontSize: 12 }]}>
                    ${props?.amount}
                  </Text>
                </View>
              </View>
            </View>
          </Pressable>
        </View>

        {open ? (
          <View style={props.loading ? styles.mainBoxLoading : styles.mainBox}>
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
                    isCart={false}
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
                    vendorStateLicenseValid={item?.sku?.vendorStateLicenseValid}
                    retailPrice={item?.sku?.retailPrice}
                    netPriceItem={item?.sku?.netPriceItem}
                  />
                </View>
              );
            })}
          </View>
        ) : null}
        {/* This View Section shows the C2 data  */}

        {openCII ? (
          <View style={props.loading ? styles.mainBoxLoading : styles.mainBox}>
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
                    isCart={false}
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
                    vendorStateLicenseValid={item?.sku?.vendorStateLicenseValid}
                    retailPrice={item?.sku?.retailPrice}
                    netPriceItem={item?.sku?.netPriceItem}
                  />
                </View>
              );
            })}
          </View>
        ) : null}
      </View>
    </View>
  );
};

const OrderDetails = () => {
  const { orderDetailsData, loading } = useSelector((state) => ({
    ...state.products,
  }));
  const [newReferesh, setNewRefresh] = useState(false);

  const dispatch = useDispatch();

  let pricedFulfillmentGroups = _.orderBy(
    _.filter(
      orderDetailsData?.fulfillmentGroups,
      (fulfillmentGroup) => !_.isUndefined(fulfillmentGroup.merchandiseTotal)
    ),
    ["fulfillmentType.friendlyName"],
    ["aesc"]
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

  return (
    <SafeAreaView
      style={{ backgroundColor: "#063e63", flex: 1 }}
      edges={["right", "left"]}
    >
      <View style={{ backgroundColor: "#fff", flex: 1 }}>
        {!!orderDetailsData?.orderNumber ? (
          <View style={{ marginBottom: 150 }}>
            <View
              style={{
                backgroundColor: "#dee2e6",
                margin: 10,
                paddingHorizontal: 10,
                borderRadius: 4,
                paddingBottom: 10,
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <View>
                  <View style={{ flexDirection: "row", marginVertical: 10 }}>
                    <Text
                      style={{
                        color: "#494c4c",
                        fontWeight: "bold",
                        fontSize: "12",
                      }}
                    >
                      Conf #:{" "}
                    </Text>
                    <Text
                      style={{
                        color: "#494c4c",
                        fontWeight: "bold",
                        fontSize: 12,
                      }}
                    >
                      {orderDetailsData?.orderNumber}
                    </Text>
                  </View>
                  <View style={{ flexDirection: "row" }}>
                    <Text
                      style={{
                        color: "#494c4c",
                        fontWeight: "bold",
                        fontSize: 12,
                      }}
                    >
                      Source:{" "}
                    </Text>
                    <Text
                      style={{
                        color: "#494c4c",
                        fontWeight: "bold",
                        fontSize: 12,
                      }}
                    >
                      {orderDetailsData?.orderSource}
                    </Text>
                  </View>
                </View>
                <View>
                  <View style={{ flexDirection: "row", marginVertical: 10 }}>
                    <Text
                      style={{
                        color: "#494c4c",
                        fontWeight: "bold",
                        fontSize: 12,
                      }}
                    >
                      Date:{" "}
                    </Text>
                    <Text
                      style={{
                        color: "#494c4c",
                        fontWeight: "bold",
                        fontSize: 12,
                      }}
                    >
                      {Moment(orderDetailsData?.submitDate).format(
                        "MM/DD/YYYY"
                      )}
                    </Text>
                  </View>
                  <View style={{ flexDirection: "row" }}>
                    <Text
                      style={{
                        color: "#494c4c",
                        fontWeight: "bold",
                        fontSize: 12,
                      }}
                    >
                      Time:{" "}
                    </Text>
                    <Text
                      style={{
                        color: "#494c4c",
                        fontWeight: "bold",
                        fontSize: 12,
                      }}
                    >
                      {Moment(orderDetailsData?.submitDate).format("hh:mmA")}
                    </Text>
                  </View>
                </View>
              </View>
            </View>

            <ScrollView>
              {_.map(pricedFulfillmentGroups, (fulfillmentGroup, i) => {
                const fieldName = getFriendlyFulfillmentType(
                  orderDetailsData,
                  fulfillmentGroup
                );

                return (
                  <View key={i}>
                    <ExpandComponent
                      fieldName={fieldName}
                      amount={fulfillmentGroup?.total?.amount?.toFixed(2)}
                      csosOrderNumber={fulfillmentGroup?.csosOrderNumber}
                      tpsOrderNumber={fulfillmentGroup?.tpsOrderNumber}
                      status={fulfillmentGroup?.fulfillmentOrders[0]?.status}
                      taxes={fulfillmentGroup?.totalTax?.amount?.toFixed(2)}
                      orderDetailsData={orderDetailsData}
                    />
                  </View>
                );
              })}
            </ScrollView>
          </View>
        ) : (
          <Loader />
        )}

        <View style={{ position: "absolute", left: 0, right: 0, bottom: 0 }}>
          <TabBar />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default OrderDetails;
