//Cart Screen which has the functionality and content of related to cart

import {
  Text,
  View,
  Pressable,
  TextInput,
  Image,
  Alert,
  Modal,
} from "react-native";
import React, { useState, useEffect } from "react";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteItem,
  updateCartValues,
  productDetails,
  addFavorites,
  removeFavorites,
  resetDataHandler,
} from "../redux/features/productApi";
import LikeButton from "./LikeButton";
import _ from "lodash";
import Filter from "../screens/SeeRelated";
import getEnvVars from "../config/enviroment";
import { styles } from "../Style/Style";
import TooltipContainer from "./ToolTip";
import Spinner from "./Spinner";

const CartScreen = (props) => {
  const dispatch = useDispatch();
  const isFocused = useIsFocused();
  const navigation = useNavigation();
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [count, setCount] = useState(props.quantity);
  const [visible, setVisible] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [modal, setModal] = useState(false);

  const { loading } = useSelector((state) => ({
    ...state.products,
  }));
  const addButton = (id) => {
    setCurrentIndex(id);
    setCount(parseInt(count) + 1);
    setVisible(true);
  };

  const {
    ERROR_ALERT_IMAGE,
    CAMERA_IMAGE,
    ALERT_IMAGE,
    apiUrl,
    MINUS_IMAGE,
    PLUS_IMAGE,
    CLOSE_IMAGE,
  } = getEnvVars();

  const removeButton = (id) => {
    setCurrentIndex(id);
    setCount(count - 1);
    setVisible(true);
  };

  const deleteCartHandler = async (Id) => {
    setCurrentIndex(Id);
    try {
      dispatch(deleteItem({ Id }));
    } catch (error) {
      Alert.alert("Could Not Delete");
    }
  };
  const updateCartHandler = async (Id) => {
    setCurrentIndex(Id);

    try {
      if (count <= 0) {
        Alert.alert("Please enter quantity greater than 0");
        return;
      }
      dispatch(updateCartValues({ Id, count }));
      setVisible(false);
    } catch (error) {
      Alert.alert("Could Not Update");
    }
  };
  const productDetailHandler = async (Id) => {
    dispatch(resetDataHandler());
    navigation.navigate("ProductDetails");
    dispatch(productDetails(Id));
  };

  useEffect(() => {
    setVisible(false);
    setCount(props.quantity);
  }, [isFocused, props.quantity]);

  const favoriteHandler = (id, value) => {
    if (value === "FAVORITE") {
      dispatch(removeFavorites({ id }));
    } else {
      dispatch(addFavorites({ id }));
    }
  };
  const quantityThresholdHandler = (value, price, id) => {
    setCount(value);
    setModal(false);
    setVisible(true);
    setCurrentIndex(id);
  };
  const discountOpenHandler = () => {
    setModal((pre) => !pre);
  };

  const deleteItemHandler = (id) => {
    Alert.alert(
      "Hold on!",
      "Are you sure you want to delete this item from your cart?",
      [
        {
          text: "NO",
          onPress: () => null,
          style: "NO",
        },
        { text: "YES", onPress: () => deleteCartHandler(id) },
      ]
    );
  };
  const changeHandler = (id, value, quantity) => {
    setCount(value);
    setCurrentIndex(id);

    setVisible(true);
    if (value == quantity) {
      setVisible(false);
    }
  };
  let orderItemValidations = props?.validations;
  let orderItemErrorValidations = _.filter(
    orderItemValidations,
    (message) => message.level === "ERROR"
  );

  const seeRelatedHandler = () => {
    setModalVisible(true);
  };
  const historyPage = false;
  const returnAuthorizationsEnabled = false;
  const contractFacetLabelChangeEnabled = true;

  return (
    <View>
      <Filter modalVisible={modalVisible} setModalVisible={setModalVisible} />

      <View
        style={{
          borderTopWidth: 0.3,
          borderBottomWidth: 0.3,
          borderColor: "#ececec",
          paddingVertical: 20,
          width: "100%",
          justifyContent: "space-between",
        }}
      >
        <View style={{ flexDirection: "row" }}>
          <Pressable
            style={{
              justifyContent: "center",
              alignSelf: "center",
            }}
            onPress={() => {
              productDetailHandler(props.skuId);
            }}
          >
            {props.url ? (
              <>
                <Image
                  style={{
                    borderRadius: 3,
                    marginVertical: 5,
                    width: 80,
                    height: 80,
                  }}
                  source={{
                    uri: `${apiUrl}${props.url}`,
                  }}
                />
              </>
            ) : (
              <Image
                style={{
                  borderRadius: 3,
                  marginVertical: 5,
                  width: 80,
                  height: 80,
                }}
                source={CAMERA_IMAGE}
              />
            )}
          </Pressable>
          <LikeButton
            onPress={() => {
              favoriteHandler(props?.skuId, props.type);
            }}
            value={props.type}
          />
          <View
            style={{
              marginHorizontal: 10,
              justifyContent: "space-around",
              width: "70%",
            }}
          >
            <Pressable
              style={{ paddingBottom: 5 }}
              onPress={() => {
                productDetailHandler(props.skuId);
              }}
            >
              <Text style={{ color: "#005185" }}>{props?.name}</Text>
            </Pressable>
            <View
              style={{
                flexDirection: "row",
                width: "100%",
              }}
            >
              <View>
                <View
                  style={{
                    flexDirection: "row",
                    paddingVertical: 5,
                    width: 120,
                  }}
                >
                  <Text
                    style={{
                      fontWeight: "700",
                      fontSize: 12,
                      color: "#494c4c",
                    }}
                  >
                    NDC:
                  </Text>
                  <Text style={{ fontSize: 12 }}>{props.nationalDrugCode}</Text>
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
                    ITEM:
                  </Text>
                  <Text style={{ fontSize: 12 }}>{props.externalId}</Text>
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
                      flexWrap: "wrap",

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
                      MFR:
                    </Text>
                    <Text
                      style={{
                        fontSize: 12,
                        flexWrap: "wrap",

                        flex: 1,
                      }}
                    >
                      {props.manufacturer}
                    </Text>
                  </Text>
                </View>
              </View>
              <View
                style={{
                  padding: 5,
                  flexWrap: "wrap",
                  flex: 1,
                }}
              >
                <Text
                  style={{
                    fontSize: 12,
                    flexWrap: "wrap",
                    width: "100%",
                  }}
                >
                  {props.description}
                </Text>
                <Text
                  style={{
                    fontSize: 12,
                    flexWrap: "wrap",
                    width: "100%",
                  }}
                >
                  {props.itemForm}
                </Text>
                <View
                  style={{ flexDirection: "row", flex: 1, flexWrap: "wrap" }}
                >
                  {props.netPriceItem && !historyPage && (
                    <TooltipContainer
                      value="NET PRICE ITEM"
                      uri="/cmsstatic/images/icons/icon_netprice_hover_2.png"
                    />
                  )}
                  {!props.generic && !props.petFriendly && (
                    <TooltipContainer
                      value="BRAND"
                      uri="/cmsstatic/images/icons/icon_brand_hover.png"
                    />
                  )}
                  {props.schedule === 2 && (
                    <TooltipContainer
                      value="CII"
                      uri="/cmsstatic/images/icons/icon_cii_hover.png"
                    />
                  )}
                  {props.petFriendly && (
                    <TooltipContainer
                      value="Pet"
                      uri="/cmsstatic/images/icons/icon_pet_hover.png"
                    />
                  )}
                  {props.petFriendly && props.rxItem && (
                    <TooltipContainer
                      value="Rx"
                      uri="/cmsstatic/images/icons/icon_prescription_hover.png"
                    />
                  )}
                  {props.refrigerated && (
                    <TooltipContainer
                      value="Refrigerated"
                      uri="/cmsstatic/images/icons/icon_refrigerated_hover.png"
                    />
                  )}
                  {props.hazardousMaterial && (
                    <TooltipContainer
                      value="Hazardous"
                      uri="/cmsstatic/images/icons/icon_hazardous_hover.png"
                    />
                  )}
                  {props.groundShip && (
                    <TooltipContainer
                      value="Ground Ship"
                      uri="/cmsstatic/images/icons/icon_groundship.png"
                    />
                  )}
                  {props.dropShipOnly && (
                    <TooltipContainer
                      value="Drop Ship"
                      uri="/cmsstatic/images/icons/icon_dropship_hover.png"
                    />
                  )}
                  {props.itemRating === "AB" && (
                    <TooltipContainer
                      value="AB Rated"
                      uri="/cmsstatic/images/icons/icon_ab_rated_hover.png"
                    />
                  )}
                  {props.rewardItem && !historyPage && (
                    <TooltipContainer
                      value="Rewards"
                      uri="/cmsstatic/images/icons/icon_rewards_hover.png"
                    />
                  )}
                  {props.priceType === "INDIRECT_CONTRACT" &&
                    !contractFacetLabelChangeEnabled && (
                      <TooltipContainer
                        value="Indirect Contract"
                        uri="/cmsstatic/images/icons/icon_indirectContract_hover.png"
                      />
                    )}
                  {!_.isNil(props.priceType) &&
                    props.priceType === "DIRECT_CONTRACT" &&
                    contractFacetLabelChangeEnabled && (
                      <TooltipContainer
                        value="Anda Contract"
                        uri="/cmsstatic/images/icons/icon_anda_contract_hover.png"
                      />
                    )}
                  {props.priceType === "DIRECT_CONTRACT" &&
                    !contractFacetLabelChangeEnabled && (
                      <TooltipContainer
                        value="Formulary Contract"
                        uri="/cmsstatic/images/icons/icon_directContract_hover.png"
                      />
                    )}
                  {!_.isNil(props.priceType) &&
                    props.priceType === "INDIRECT_CONTRACT" &&
                    contractFacetLabelChangeEnabled && (
                      <TooltipContainer
                        value="Manufacturer Contract"
                        uri="/cmsstatic/images/icons/icon_anda_mfg_contract_hover.png"
                      />
                    )}

                  {!_.isNil(props.itemReturnable) &&
                    !props.itemReturnable &&
                    !returnAuthorizationsEnabled && (
                      <TooltipContainer
                        value={props?.itemMessages}
                        uri="/cmsstatic/images/icons/icon_noreturns.png"
                      />
                    )}
                </View>
              </View>
            </View>
            <View
              style={{
                marginVertical: 12,
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <Text style={{ fontWeight: "700", color: "#494c4c" }}>
                ${props?.amount?.toFixed(2)}
              </Text>
              {props.isCart ? null : (
                <View style={{ alignItems: "center" }}>
                  <Text style={{ color: "#494c4c", fontWeight: "700" }}>
                    QTY:{count}
                  </Text>
                </View>
              )}
            </View>
          </View>
        </View>
        {props.isCart ? (
          <View>
            <View
              style={{
                justifyContent: "space-between",
                flexDirection: "row",
                paddingVertical: 10,
              }}
            >
              {props?.discount?.length > 1 ? (
                <View
                  style={{
                    justifyContent: "center",
                    backgroundColor: "#fff",
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
                      visible={modal}
                      onRequestClose={() => {
                        setModal(!modal);
                      }}
                    >
                      <View style={styles.modalBox}>
                        <View style={styles.modalBoxContainer}>
                          <Pressable
                            onPress={() => setModal(!modal)}
                            style={{
                              justifyContent: "center",
                              paddingHorizontal: 10,
                            }}
                          >
                            <Image
                              source={CLOSE_IMAGE}
                              style={styles.catagoryImage}
                            />
                          </Pressable>
                        </View>

                        <View>
                          {props.discount?.map((item, i) => {
                            return (
                              <View style={{ padding: 10 }} key={i}>
                                <Pressable
                                  style={{
                                    flexDirection: "row",
                                    justifyContent: "space-between",
                                    paddingVertical: 2,
                                  }}
                                  onPress={() => {
                                    quantityThresholdHandler(
                                      item?.quantityThreshold,
                                      item?.skuPrice?.price?.amount,
                                      props?.id
                                    );
                                  }}
                                >
                                  <Text
                                    style={{
                                      fontSize: 12,
                                      fontWeight: "700",
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
                          })}
                        </View>
                      </View>
                    </Modal>
                  </View>
                </View>
              ) : (
                <>
                  <View
                    style={{
                      justifyContent: "center",
                      backgroundColor: "#fff",
                    }}
                  />
                </>
              )}
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
                    removeButton(props.id);
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
                      changeHandler(props?.id, value, props.quantity)
                    }
                    keyboardType="number-pad"
                  >
                    {count}
                  </TextInput>
                </View>
                {!!props.orderLimit ? (
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
                      addButton(props?.id);
                    }}
                    disabled={count === props.orderLimit}
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
                      addButton(props?.id);
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
              <View
                style={{
                  width: 60,
                  height: 25,
                  borderRadius: 4,
                }}
              >
                {currentIndex == props.id && visible && (
                  <Pressable
                    style={{
                      backgroundColor: "#ed8b00",
                      width: 60,
                      height: 25,
                      borderRadius: 4,
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                    android_ripple={{ color: "#ccc" }}
                    onPress={() => updateCartHandler(props.id)}
                  >
                    <View>
                      <Text
                        style={{
                          color: "#fff",
                          fontSize: 10,
                          fontWeight: "bold",
                        }}
                      >
                        UPDATE
                      </Text>
                    </View>
                  </Pressable>
                )}
              </View>
              <Pressable
                style={{
                  borderColor: "#006ba6",
                  borderWidth: 1,
                  width: 60,
                  height: 25,
                  borderRadius: 4,
                  justifyContent: "center",
                  alignItems: "center",
                }}
                android_ripple={{ color: "#ccc" }}
                onPress={() => deleteItemHandler(props.id)}
              >
                <View>
                  <Text style={styles.emptyText}>DELETE</Text>
                </View>
              </Pressable>
            </View>
            {!!props.orderLimit ? (
              <View
                style={{
                  height: 20,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                {count === props.orderLimit && currentIndex === props?.id && (
                  <Text style={{ fontSize: 12, color: "#bd1c1c" }}>
                    You Can Add Only {props.orderLimit} Items
                  </Text>
                )}
              </View>
            ) : null}

            {props?.message?.map((item) => {
              return (
                <View
                  key={item?.key}
                  style={{
                    flexDirection: "row",
                    paddingHorizontal: 5,
                    alignItems: "center",
                  }}
                >
                  <Image
                    source={ALERT_IMAGE}
                    style={{
                      width: 15,
                      height: 15,
                    }}
                  />
                  <Text
                    style={{
                      fontSize: 12,
                      color: "#ed8b00",
                      textAlign: "left",
                      margin: 5,
                    }}
                  >
                    {item?.message}
                  </Text>
                </View>
              );
            })}
            {orderItemErrorValidations.map((item, i) => {
              return (
                <View key={i} style={{ flexDirection: "column" }}>
                  <View
                    style={{
                      flexDirection: "row",
                      paddingHorizontal: 5,
                    }}
                  >
                    <Text
                      style={{
                        flex: 1,
                        flexWrap: "wrap",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <Image
                        source={ERROR_ALERT_IMAGE}
                        style={{
                          width: 15,
                          height: 15,
                          alignSelf: "center",
                          marginTop: -2,
                        }}
                      />

                      <Text
                        style={{
                          fontSize: 12,
                          color: "#990909",
                          textAlign: "center",
                          margin: 5,
                        }}
                      >
                        {" "}
                        {item?.message}
                      </Text>
                    </Text>
                  </View>
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-around",
                    }}
                  >
                    <Pressable
                      style={{
                        borderColor: "#006ba6",
                        borderWidth: 1,
                        width: 80,
                        height: 25,
                        borderRadius: 4,
                        justifyContent: "center",
                        alignItems: "center",
                        marginVertical: 10,
                      }}
                      android_ripple={{ color: "#ccc" }}
                      onPress={() => seeRelatedHandler(props.id)}
                    >
                      <View>
                        <Text style={styles.emptyText}>See Related</Text>
                      </View>
                    </Pressable>
                    <Pressable
                      style={{
                        borderColor: "#006ba6",
                        borderWidth: 1,
                        width: 80,
                        height: 25,
                        borderRadius: 4,
                        justifyContent: "center",
                        alignItems: "center",
                        marginVertical: 10,
                      }}
                      android_ripple={{ color: "#ccc" }}
                      onPress={() => deleteItemHandler(props.id)}
                    >
                      <View>
                        <Text style={styles.emptyText}>Remove Item</Text>
                      </View>
                    </Pressable>
                    <Pressable
                      style={{
                        borderColor: "#006ba6",
                        borderWidth: 1,
                        width: 80,
                        height: 25,
                        borderRadius: 4,
                        justifyContent: "center",
                        alignItems: "center",
                        marginVertical: 10,
                      }}
                      android_ripple={{ color: "#ccc" }}
                      onPress={() => deleteItemHandler(props.id)}
                    >
                      <View>
                        <Text style={styles.emptyText}>Notify Me</Text>
                      </View>
                    </Pressable>
                  </View>
                </View>
              );
            })}
          </View>
        ) : null}
      </View>
    </View>
  );
};

export default CartScreen;
