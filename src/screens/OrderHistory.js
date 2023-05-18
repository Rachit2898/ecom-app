import { Text, View, Pressable, Image } from "react-native";
import React, { useState } from "react";
import _ from "lodash";
import { useNavigation } from "@react-navigation/native";
import getEnvVars from "../config/enviroment";
import { orderDetails } from "../redux/features/productApi";
import { useDispatch, useSelector } from "react-redux";

const OrderComponent = (props) => {
  const [open, setOpen] = useState(false);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const openHandler = () => {
    setOpen((pre) => !pre);
  };
  const { PLUS_IMAGE, MINUS_IMAGE } = getEnvVars();

  const orderDetailsHandler = (id) => {
    navigation.navigate("OrderDetails");
    dispatch(orderDetails(id));
  };

  return (
    <View
      style={{
        borderWidth: 0.3,
        borderColor: "#ececec",
        borderRadius: 3,
        marginHorizontal: 10,
        marginVertical: 10,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          paddingHorizontal: 10,
          paddingVertical: 5,
          borderBottomWidth: 0.3,
          borderBottomColor: "#ececec",
        }}
      >
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Text
            style={{
              fontSize: 12,
              color: "#494c4c",
              fontWeight: "bold",
            }}
          >
            ORDER DETAILS:
          </Text>
        </View>
        <Pressable
          style={{ width: "50%" }}
          onPress={() => {
            orderDetailsHandler(props.id);
          }}
        >
          <Text style={{ fontSize: 12, color: "#006ba6" }}>
            {props.orderNumber}
          </Text>
        </Pressable>
      </View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          paddingHorizontal: 10,
          paddingVertical: 5,
          borderBottomWidth: 0.3,
          borderBottomColor: "#ececec",
        }}
      >
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Text
            style={{
              fontSize: 12,
              color: "#494c4c",
              fontWeight: "bold",
            }}
          >
            DATE:
          </Text>
        </View>
        <View style={{ width: "50%" }}>
          <Text style={{ fontSize: 12, color: "#494c4c" }}>{props.date}</Text>
        </View>
      </View>
      {open ? (
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            paddingHorizontal: 10,
            paddingVertical: 5,
            borderBottomWidth: 0.3,
            borderBottomColor: "#ececec",
          }}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              width: "50%",
            }}
          >
            <Text
              style={{ fontSize: 12, color: "#494c4c", fontWeight: "bold" }}
            >
              ORDER#:
            </Text>
          </View>
          {props?.data.length > 0 ? (
            <View style={{ flexDirection: "column", width: "50%" }}>
              {props?.data?.map((item, i) => {
                return (
                  <View
                    key={i}
                    style={{ width: "50%", flexDirection: "column" }}
                  >
                    <View style={{ flexDirection: "row" }}>
                      <Text style={{ fontSize: 12, color: "#494c4c" }}>
                        {item.number}{" "}
                      </Text>
                      {item?.csos ? (
                        <View
                          style={{
                            flexDirection: "row",
                            backgroundColor: "#006ba6",
                            paddingHorizontal: 5,
                            borderRadius: 10,
                            alignItems: "center",
                          }}
                        >
                          <Text
                            style={{
                              fontSize: 12,
                              textAlign: "center",
                              color: "#fff",
                            }}
                          >
                            CSOS
                          </Text>
                        </View>
                      ) : null}
                    </View>
                  </View>
                );
              })}
            </View>
          ) : (
            <View style={{ flexDirection: "row", width: "50%" }}>
              <Text style={{ fontSize: 12, color: "#494c4c" }}>Pending</Text>
            </View>
          )}
        </View>
      ) : null}
      {open ? (
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            paddingHorizontal: 10,
            paddingVertical: 5,
            borderBottomWidth: 0.3,
            borderBottomColor: "#ececec",
          }}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              width: "50%",
            }}
          >
            <Text
              style={{ fontSize: 12, color: "#494c4c", fontWeight: "bold" }}
            >
              INVOICE#:
            </Text>
          </View>
          {props?.invoiceNumber ? (
            <View style={{ flexDirection: "row", width: "50%" }}>
              <Text style={{ fontSize: 12, color: "#494c4c" }}>
                {props.invoiceNumber}{" "}
              </Text>
              <View
                style={{
                  flexDirection: "row",
                  backgroundColor: "#006ba6",
                  paddingHorizontal: 5,
                  borderRadius: 10,
                  alignItems: "center",
                }}
              >
                <Text
                  style={{
                    fontSize: 12,
                    textAlign: "center",
                    color: "#fff",
                  }}
                >
                  CSOS
                </Text>
              </View>
            </View>
          ) : (
            <View style={{ flexDirection: "row", width: "50%" }}>
              <Text style={{ fontSize: 12, color: "#494c4c" }}>Pending</Text>
            </View>
          )}
        </View>
      ) : null}
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          paddingHorizontal: 10,
          paddingVertical: 5,
          borderBottomWidth: 0.3,
          borderBottomColor: "#ececec",
        }}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            width: "50%",
          }}
        >
          <Text style={{ fontSize: 12, color: "#494c4c", fontWeight: "bold" }}>
            STATUS:
          </Text>
        </View>
        <View style={{ flexDirection: "row", width: "50%" }}>
          <Text style={{ fontSize: 12, color: "#494c4c" }}>
            {props.item?.status}
          </Text>
        </View>
      </View>
      {open ? (
        <>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              paddingHorizontal: 10,
              paddingVertical: 5,
              borderBottomWidth: 0.3,
              borderBottomColor: "#ececec",
            }}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                width: "50%",
              }}
            >
              <Text
                style={{ fontSize: 12, color: "#494c4c", fontWeight: "bold" }}
              >
                PO#:
              </Text>
            </View>
            <View style={{ flexDirection: "row", width: "50%" }}>
              <Text style={{ fontSize: 12, color: "#494c4c" }}>
                {props.item?.fulfillmentGroups[0]?.purchaseOrderNumber}
              </Text>
            </View>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              paddingHorizontal: 10,
              paddingVertical: 5,
              borderBottomWidth: 0.3,
              borderBottomColor: "#ececec",
            }}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                width: "50%",
              }}
            >
              <Text
                style={{ fontSize: 12, color: "#494c4c", fontWeight: "bold" }}
              >
                ACTION:
              </Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                width: "50%",
                alignItems: "center",
              }}
            >
              <View style={{ flexDirection: "column" }}>
                <Text style={{ fontSize: 12, color: "#494c4c" }}>
                  Account #: {props?.item?.customer?.selectedAccount?.id}
                </Text>
                <View style={{ flexDirection: "row" }}>
                  <Text style={{ fontSize: 12, color: "#494c4c" }}>
                    DEA #: {props?.item?.customer?.selectedAccount?.deaNumber}
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </>
      ) : null}
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          paddingHorizontal: 10,
          paddingVertical: 5,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            width: "50%",
          }}
        >
          <Text style={{ fontSize: 12, color: "#494c4c", fontWeight: "bold" }}>
            ORDER TOTAL :
          </Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            width: "50%",
            justifyContent: "space-between",
          }}
        >
          <Text style={{ fontSize: 12, color: "#494c4c" }}>
            ${props.item?.total?.amount?.toFixed(2)}
          </Text>
          <Pressable
            style={{
              alignItems: "flex-end",

              paddingHorizontal: 10,
            }}
            onPress={() => {
              openHandler();
            }}
          >
            {open ? (
              <Image source={MINUS_IMAGE} style={{ height: 15, width: 15 }} />
            ) : (
              <Image source={PLUS_IMAGE} style={{ height: 15, width: 15 }} />
            )}
          </Pressable>
        </View>
      </View>
    </View>
  );
};

export default OrderComponent;
