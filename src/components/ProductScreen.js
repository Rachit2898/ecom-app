//This component is rendered on various screens like Top Purchses, Customer like you etc. This components has the UI part and functionality used by various screens Top Purchses, Customer like you etc.

import {
  Text,
  View,
  Image,
  Pressable,
  TextInput,
  Alert,
  Modal,
} from "react-native";
import React, { useState } from "react";
import Spinner from "./Spinner";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import {
  addItem,
  productDetails,
  addFavorites,
  removeFavorites,
  removeItemFromList,
  addItemToList,
  resetDataHandler,
} from "../redux/features/productApi";
import LikeButton from "./LikeButton";
import AddButton from "./AddButton";
import _ from "lodash";
import { styles } from "../Style/Style";
import getEnvVars from "../config/enviroment";
import TooltipContainer from "./ToolTip";
import Svg, { Polygon, G } from "react-native-svg";
import Loader from "./Loader";

function SvgComponent(props) {
  return (
    <View>
      <View
        style={{
          zIndex: 1,
          justifyContent: "center",
          alignItems: "center",
          bottom: -25,
          left: -12,
          transform: [{ rotate: "-40deg" }],
        }}
      >
        <Text
          style={{
            fontSize: 10,
            fontWeight: "bold",
            color: "#fff",
            textAlign: "center",
          }}
        >
          C/O
        </Text>
      </View>
      <Svg height="50" width="60">
        <Polygon
          points="0 25, 0 50, 50 0, 25 0"
          fill={"#ed8b00"}
          strokeWidth="1"
        />
      </Svg>
    </View>
  );
}

const ProductScreen = (props) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [count, setCount] = useState(1);
  const [modalVisible, setModalVisible] = useState(false);

  const { favLoading, removeFavoritesData } = useSelector((state) => ({
    ...state.products,
  }));
  const addButton = (id) => {
    setCount(parseInt(count) + 1);
  };
  const { apiUrl, CAMERA_IMAGE, MINUS_IMAGE, PLUS_IMAGE, CLOSE_IMAGE } =
    getEnvVars();
  const removeButton = (id) => {
    setCount(count - 1);
  };
  async function addItemIntoCart(skuId) {
    const accountId = props.accountId;
    const quantity = count;
    if (quantity <= 0) {
      Alert.alert("Please enter quantity greater than 0");
      return;
    }
    try {
      dispatch(addItem({ accountId, skuId, quantity }));
    } catch (error) {
      alert("Could not Update Product!!");
    }
  }
  const productDetailHandler = async (Id) => {
    dispatch(resetDataHandler());
    navigation.navigate("ProductDetails");
    dispatch(productDetails(Id));
  };

  const favoriteHandler = (id, value) => {
    if (value) {
      dispatch(removeFavorites({ id }));
    } else {
      dispatch(addFavorites({ id }));
    }
  };

  const quantityThresholdHandler = (value, price) => {
    setCount(value);
    setModalVisible(false);
  };
  const changeHandler = (id, value, orderLimit) => {
    if (value > orderLimit) {
      Alert.alert(
        `Value can't be greater than daily order limit ${orderLimit}`
      );
      setCount(orderLimit);
      return;
    }
    setCount(value);
  };
  const historyPage = false;
  const returnAuthorizationsEnabled = false;
  const contractFacetLabelChangeEnabled = true;
  const discountOpenHandler = () => {
    setModalVisible((pre) => !pre);
  };

  return (
    <View style={styles.mainComponent} key={props.id}>
      <View style={{ flexDirection: "row" }} key={props.id}>
        <View style={styles.centerBox}>
          {props.priceReduced && (
            <View
              style={[
                styles.bannerComponent,
                {
                  transform: [{ skewY: "-35deg" }],
                },
              ]}
            >
              <Text style={styles.bannerText}>&#36; Reduced</Text>
            </View>
          )}
          {!_.isNil(props.shortOrCloseOutDate) &&
            props.shortOrCloseOutDate !== "" &&
            props.inventoryClassKey === "S" && (
              <View
                style={[
                  styles.bannerComponent,
                  {
                    transform: [{ rotate: "-35deg" }],
                  },
                ]}
              >
                <Text style={styles.bannerText}>S/D</Text>
              </View>
            )}
          {props.inventoryClassKey === "C" && (
            <View style={{ zIndex: 1, bottom: -55, left: -10 }}>
              <SvgComponent></SvgComponent>
            </View>
          )}

          <Pressable
            style={{
              justifyContent: "center",
              alignSelf: "center",
            }}
            onPress={() => {
              productDetailHandler(props.id);
            }}
          >
            {props.url ? (
              <>
                <Image
                  style={styles.productImage}
                  source={{
                    uri: `${apiUrl}${props?.url}`,
                  }}
                />
              </>
            ) : (
              <Image style={styles.productImage} source={CAMERA_IMAGE} />
            )}
          </Pressable>
        </View>

        <LikeButton
          onPress={() => {
            favoriteHandler(props?.id, props.favorited);
          }}
          value={props.favorited}
        />

        <View
          style={{
            marginHorizontal: 10,
            justifyContent: "space-around",
            width: "70%",
          }}
        >
          {props.bestPrice ? (
            <View style={styles.bestPriceComponent}>
              <Text style={styles.bestPriceText}>BEST PRICE</Text>
            </View>
          ) : null}
          <Pressable
            style={{ paddingVertical: 5 }}
            onPress={() => {
              productDetailHandler(props.id);
            }}
          >
            <Text style={{ color: "#005185" }}>{props?.name}</Text>
          </Pressable>
          <View
            style={{
              flexDirection: "row",
              width: "100%",
              justifyContent: "space-between",
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
                    fontSize: 12,
                    fontWeight: "700",
                    color: "#494c4c",
                  }}
                >
                  NDC:
                </Text>
                <Text style={{ fontSize: 12, color: "#494c4c" }}>
                  {props?.nationalDrugCode}
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
                    fontSize: 12,
                    fontWeight: "700",
                    color: "#494c4c",
                  }}
                >
                  ITEM:
                </Text>
                <Text style={{ fontSize: 12, color: "#494c4c" }}>
                  {props?.externalId}
                </Text>
              </View>
              <View
                style={{
                  paddingVertical: 5,
                  flexWrap: "wrap",
                  flexDirection: "row",
                  flex: 1,
                  color: "#494c4c",
                }}
              >
                <Text
                  style={{
                    fontSize: 12,
                    flexWrap: "wrap",
                    color: "#494c4c",
                    flex: 1,
                  }}
                >
                  <Text
                    style={{
                      fontSize: 12,
                      fontWeight: "700",
                      color: "#494c4c",
                    }}
                  >
                    MFR:
                  </Text>
                  <Text
                    style={{
                      fontSize: 12,
                      flexWrap: "wrap",
                      color: "#494c4c",
                      flex: 1,
                    }}
                  >
                    {props?.manufacturer}
                  </Text>
                </Text>
              </View>
            </View>
            <View
              style={{
                width: "40%",
              }}
            >
              <Text
                style={{
                  fontSize: 12,
                  flexWrap: "wrap",
                  width: "100%",
                  color: "#494c4c",
                }}
              >
                {props?.itemForm}
              </Text>

              <Text style={{ fontSize: 12, color: "#494c4c" }}>
                {props?.description}
              </Text>

              <View style={{ flexDirection: "row", flex: 1, flexWrap: "wrap" }}>
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
          <View>
            <Text style={{ fontWeight: "700", color: "#494c4c" }}>
              ${props?.amount?.toFixed(2)}
            </Text>
          </View>
        </View>
      </View>
      {props?.quantityAvailable ? (
        <View>
          <View
            style={{
              flexDirection: "row",
              paddingVertical: 10,
              justifyContent: "space-between",
            }}
          >
            {props?.discount?.length > 1 ? (
              <View
                style={{
                  justifyContent: "center",
                  backgroundColor: "#fff",
                  width: 145,
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
                    <View style={styles.modalBox}>
                      <View style={styles.modalBoxContainer}>
                        <Pressable
                          onPress={() => setModalVisible(!modalVisible)}
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
                                    item?.skuPrice?.price?.amount
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
                                    ${item?.skuPrice?.price?.amount?.toFixed(2)}
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
                    width: 100,
                  }}
                />
              </>
            )}

            <View style={styles.editButtonContainer}>
              <Pressable
                style={styles.removeAddButton}
                onPress={() => {
                  removeButton(props?.id);
                }}
                disabled={count === 1}
              >
                <Text style={styles.signButton}>-</Text>
              </Pressable>
              <View
                style={{
                  alignSelf: "center",
                }}
              >
                <TextInput
                  style={styles.countInput}
                  onChangeText={(value) =>
                    changeHandler(props?.id, value, props.orderLimit)
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
                  <Text style={styles.signButton}>+</Text>
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
                  <Text style={styles.signButton}>+</Text>
                </Pressable>
              )}
            </View>
            <View style={{ marginHorizontal: 20 }}>
              {_.isNil(props.retailPrice) ||
              props.isPriceLocked ||
              !props.vendorStateLicenseValid ? (
                <View>
                  <Text> Temporarily Unavailable</Text>
                </View>
              ) : null}
              {!props.quantityAvailable &&
              props.restrictionReason === "CONTROL_LIMIT" ? (
                <View>
                  <Text>Limit Exceeded</Text>
                </View>
              ) : null}
              {props.quantityAvailable < props.quantityMinimumOrder ? (
                <View>
                  <Text>Contact Rep</Text>
                </View>
              ) : null}
              <View style={{ marginHorizontal: 20 }}>
                <AddButton
                  onPress={() => addItemIntoCart(props?.id)}
                  count={count}
                />
              </View>
            </View>
          </View>
          {!!props.orderLimit && (
            <View style={styles.orderLimitBox}>
              <Text style={styles.orderLimitText}>
                Daily Order Limit: {props.orderLimit}
              </Text>
            </View>
          )}
        </View>
      ) : (
        <>
          {props?.subscribed ? (
            <View>
              {props?.shortDateOrCloseOut ? (
                <View>
                  <Text>SOLD OUT</Text>
                </View>
              ) : (
                <View style={styles.notifyText}>
                  <Text>We will notify you when this item is in stock</Text>
                </View>
              )}
              <Pressable
                style={{ alignSelf: "center", justifyContent: "center" }}
                onPress={() => {
                  dispatch(removeItemFromList({ id: props.id }));
                }}
              >
                <Text style={{ color: "#006ba6", fontWeight: "500" }}>
                  Remove item from list.
                </Text>
              </Pressable>
            </View>
          ) : (
            <View>
              {props?.shortDateOrCloseOut ? (
                <View>
                  <Text>SOLD OUT</Text>
                </View>
              ) : (
                <Pressable
                  style={{
                    alignSelf: "center",
                    justifyContent: "center",
                    margin: 5,
                  }}
                  onPress={() => {
                    dispatch(addItemToList({ id: props.id }));
                  }}
                >
                  <Text style={{ color: "#006ba6", fontWeight: "500" }}>
                    Notify me when this item is in stock
                  </Text>
                </Pressable>
              )}
            </View>
          )}
        </>
      )}
    </View>
  );
};

export default ProductScreen;
