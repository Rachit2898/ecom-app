import { Text, View, Pressable, Alert, Linking } from "react-native";
import React, { useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch, useSelector } from "react-redux";
import { cartCheckOut, resetDataHandler } from "../redux/features/productApi";
import { useNavigation } from "@react-navigation/native";
import TabBar from "../components/TabBar";
import CartInfo from "../components/CartInfo";
import CartScreen from "../components/CartScreen";
import { ScrollView } from "react-native-gesture-handler";
import { styles } from "../Style/Style";
import Spinner from "../components/Spinner";
import Loader from "../components/Loader";
import getEnvVars from "../config/enviroment";

const SubmitCart = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { apiUrl } = getEnvVars();

  const { cartLength, cartValidateInfo, userInfoData, cartInfoData, loading } =
    useSelector((state) => ({
      ...state.products,
    }));
  const { poData } = useSelector((state) => ({
    ...state.auth,
  }));
  const userData = userInfoData;

  const resetHandler = () => {
    dispatch(resetDataHandler());
    navigation.navigate("Cart");
  };

  const checkOutHandler = async (orderId) => {
    try {
      const data = await dispatch(cartCheckOut(orderId));

      if (data?.payload?.validations?.length > 0) {
        if (data?.payload?.validations[0]?.level === "ERROR") {
          Alert.alert("ERROR", `${data?.payload?.validations[0]?.message}`, [
            { text: "OK", onPress: () => resetHandler() },
          ]);
        }
      } else {
        navigation.navigate("CheckOut");
      }
    } catch (error) {
      Alert.alert("ERROR", `${data?.payload?.validations[0]?.message}`, [
        { text: "OK", onPress: () => resetHandler() },
      ]);
    }
  };
  const editOrderNavigation = () => {
    navigation.navigate("Cart");
  };

  const data = cartInfoData?.orderItems;

  return (
    <SafeAreaView
      style={{ backgroundColor: "#fff", flex: 1 }}
      edges={["right", "left"]}
    >
      <View style={{ flex: 1 }}>
        {loading && <Loader />}
        <View
          style={loading ? styles.mainSubmitBoxLoading : styles.mainSubmitBox}
        >
          <View style={{ marginTop: 10 }}>
            <View style={styles.detailsContainer}>
              <View>
                <Text style={styles.orderText}>Order Summary</Text>
              </View>
              <Pressable
                onPress={() => {
                  editOrderNavigation();
                }}
              >
                <Text style={styles.editOrderText}>EDIT ORDER</Text>
              </Pressable>
            </View>
            {poData?.length > 0 ? (
              <View
                style={{
                  paddingVertical: 5,
                  paddingHorizontal: 10,
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Text style={{ color: "#494c4c", fontWeight: "700" }}>
                  P.O.#
                </Text>
                <Text style={{ color: "#494c4c", fontWeight: "700" }}>
                  {poData}
                </Text>
              </View>
            ) : null}
            <CartInfo
              quantity={cartInfoData?.itemCount}
              amount={cartInfoData?.total?.amount}
              totalTax={cartInfoData?.totalTax?.amount?.toFixed(2)}
              cartData={cartInfoData}
              cartLength={cartLength}
              totalShipping={cartInfoData?.totalShipping?.amount?.toFixed(2)}
            />

            <Pressable
              android_ripple={{ color: "#ccc" }}
              style={styles.submitButtonContainer}
              onPress={() => checkOutHandler(cartValidateInfo?.order?.id)}
            >
              <Text style={styles.submitButton}>SUBMIT YOUR CART</Text>
            </Pressable>
            <ScrollView showsVerticalScrollIndicator={false}>
              <View>
                <View style={{ alignItems: "center", marginVertical: 10 }}>
                  <Text style={{ textAlign: "center" }}>
                    <Text style={{ color: "#494c4c" }}>
                      By placing your order, you agree to Anda's{" "}
                    </Text>
                  </Text>
                  <Text
                    onPress={() =>
                      Linking.openURL(`${apiUrl}/content/terms-of-use`)
                    }
                    style={{ color: "#006ba6" }}
                  >
                    Terms & Conditions
                  </Text>
                </View>

                <View
                  style={{
                    borderBottomWidth: 2,
                    borderBottomColor: "#f2f2f2",
                    paddingVertical: 5,
                  }}
                >
                  <Text
                    style={{
                      textAlign: "center",
                      fontWeight: "bold",
                      color: "#494c4c",
                      fontSize: 15,
                    }}
                  >
                    Shipping Information
                  </Text>
                </View>
                <View style={{ alignItems: "center" }}>
                  <View style={{ padding: 10, alignItems: "center" }}>
                    <View style={{ flexDirection: "row", marginTop: 5 }}>
                      <Text style={{ color: "#494c4c", textAlign: "center" }}>
                        {userData?.selectedAccount.addresses[0]?.companyName}
                      </Text>
                    </View>
                    <View style={{ flexDirection: "row", marginTop: 5 }}>
                      <Text style={{ color: "#494c4c" }}>
                        {userData?.selectedAccount.addresses[0]?.addressLine1}
                      </Text>
                    </View>
                    <View style={{ flexDirection: "row", marginTop: 5 }}>
                      <Text style={{ color: "#494c4c" }}>
                        {userData?.selectedAccount.addresses[0]?.addressLine2}
                      </Text>
                    </View>
                    <View style={{ flexDirection: "row", marginTop: 5 }}>
                      <Text style={{ color: "#494c4c" }}>
                        {userData?.selectedAccount.addresses[0]?.city},{" "}
                        {
                          userData?.selectedAccount.addresses[0]
                            ?.countrySubdivision?.abbreviation
                        }{" "}
                        {userData?.selectedAccount.addresses[0]?.postalCode}
                      </Text>
                    </View>
                  </View>
                </View>
                <View>
                  {data?.map((item, i) => {
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
                          message={item?.sku?.itemMessages}
                          itemReturnable={item?.sku?.returnable}
                          isCart={false}
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
                        />
                      </View>
                    );
                  })}
                </View>
              </View>
            </ScrollView>
          </View>
        </View>
        <View style={{ left: 0, right: 0, bottom: 0 }}>
          <TabBar />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default SubmitCart;
