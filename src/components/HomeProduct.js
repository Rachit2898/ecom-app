//This is HomeProduct Components Which comes on DashBoard Screen

import {
  StyleSheet,
  Text,
  View,
  Image,
  Pressable,
  Alert,
  Dimensions,
} from "react-native";
import React from "react";
import LikeButton from "./LikeButton";
import Spinner from "./Spinner";
import AddButton from "./AddButton";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import {
  addItem,
  productDetails,
  addFavorites,
  removeFavorites,
  resetDataHandler,
} from "../redux/features/productApi";
import _ from "lodash";
import getEnvVars from "../config/enviroment";
const windowDimensions = Dimensions.get("window");

const HomeProduct = (props) => {
  const { addLoading } = useSelector((state) => ({
    ...state.products,
  }));
  const { CAMERA_IMAGE, apiUrl } = getEnvVars();
  const dispatch = useDispatch();
  const navigation = useNavigation();
  async function addItemIntoCart(skuId) {
    const accountId = props.accountId;
    try {
      dispatch(addItem({ accountId, skuId, quantity: 1 }));
    } catch (error) {
      Alert.alert("Could not Update Product!!");
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
  return (
    <View style={{ flexDirection: "row" }}>
      <View
        style={{
          justifyContent: "center",
          flexDirection: "row",
        }}
        key={props?.id}
      >
        <View
          style={
            windowDimensions?.width > 500
              ? {
                  borderWidth: 0.3,
                  borderColor: "#ececec",
                  borderRadius: 7,
                  backgroundColor: "#fafafa",
                  width: 280,
                  height: 250,
                  marginHorizontal: 2,
                }
              : {
                  borderWidth: 0.3,
                  borderColor: "#ececec",
                  borderRadius: 7,
                  backgroundColor: "#fafafa",
                  width: 180,
                  height: 220,
                  marginHorizontal: 2,
                }
          }
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
            }}
          >
            <Pressable
              onPress={() => {
                productDetailHandler(props?.id);
              }}
              style={{
                alignItems: "center",
              }}
            >
              {props?.primaryUrl ? (
                <Image
                  style={{
                    borderRadius: 3,
                    marginVertical: 5,
                    width: 80,
                    borderRadius: 7,
                    height: 80,
                    justifyContent: "center",
                    alignSelf: "center",
                  }}
                  source={{
                    uri: `${apiUrl}${props?.primaryUrl}`,
                  }}
                />
              ) : (
                <Image
                  style={{
                    borderRadius: 3,
                    marginVertical: 5,
                    width: 80,
                    height: 80,
                    borderRadius: 7,
                    justifyContent: "center",
                    alignSelf: "center",
                    backgroundColor: "grey",
                  }}
                  source={CAMERA_IMAGE}
                />
              )}
            </Pressable>
            <View
              style={{
                marginVertical: 5,
                marginLeft: "25%",
              }}
            >
              <LikeButton
                onPress={() => {
                  favoriteHandler(props.id, props?.favorited);
                }}
                value={props?.favorited}
              />
            </View>
          </View>

          <Pressable
            style={{
              margin: 5,
              height: 30,
            }}
            onPress={() => {
              productDetailHandler(props?.id);
            }}
          >
            <Text
              style={{
                color: "#006ba6",
                fontWeight: "700",
                fontSize: 10,
                flexWrap: "wrap",
                width: "100%",
              }}
            >
              {props?.name}
            </Text>
          </Pressable>
          <View style={{ margin: 5 }}>
            <View style={{ flexDirection: "row" }}>
              <Text
                style={{
                  fontWeight: "700",
                  fontSize: 10,
                  color: "#494c4c",
                }}
              >
                NDC:
              </Text>
              <Text style={{ fontSize: 10 }}>{props?.nationalDrugCode}</Text>
            </View>
            <View style={{ flexDirection: "row" }}>
              <Text
                style={{
                  fontWeight: "700",
                  fontSize: 10,
                  color: "#494c4c",
                }}
              >
                ITEM:
              </Text>
              <Text style={{ fontSize: 10 }}>{props?.externalId}</Text>
            </View>
            <View
              style={{
                marginVertical: 10,
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <View
                style={{
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Text
                  style={{
                    fontWeight: "700",
                    fontSize: 12,
                    color: "#494c4c",
                  }}
                >
                  ${props?.amount?.toFixed(2)}
                </Text>
              </View>

              <View style={{ marginHorizontal: 10 }}>
                <AddButton
                  onPress={() => addItemIntoCart(props?.id)}
                  count={1}
                />
              </View>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

export default HomeProduct;

const styles = StyleSheet.create({});
