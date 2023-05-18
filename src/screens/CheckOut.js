//CheckOut Screen which has the functionality and content of related to CheckOut

import { Text, View } from "react-native";
import React, { useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch, useSelector } from "react-redux";
import { checkOutConfirmation } from "../redux/features/productApi";
import _ from "lodash";
import TabBar from "../components/TabBar";
import Spinner from "../components/Spinner";
import Loader from "../components/Loader";
import { styles } from "../Style/Style";

const CheckOut = () => {
  const dispatch = useDispatch();

  const { cartValidateInfo, cartCheckOutInfo, itemLength, checkOutData } =
    useSelector((state) => ({
      ...state.products,
    }));

  const { poData } = useSelector((state) => ({ ...state.auth }));
  const orderId = cartValidateInfo?.order?.id;

  useEffect(() => {
    dispatch(checkOutConfirmation(orderId));
  }, [dispatch]);

  let pricedFulfillmentGroups = _.orderBy(
    _.filter(
      checkOutData?.fulfillmentGroups,
      (fulfillmentGroup) => !_.isUndefined(fulfillmentGroup.merchandiseTotal)
    ),
    ["fulfillmentType.friendlyName"],
    ["desc"]
  );

  function isFgCsos(fg) {
    return _.get(fg, "fulfillmentType.type") === "CSOS";
  }

  function getFriendlyFulfillmentType(order, fg) {
    if (_.size(order?.fulfillmentGroups) > 1) {
      return fg?.fulfillmentType?.friendlyName;
    }

    if (isFgCsos(fg)) {
      return fg?.fulfillmentType?.friendlyName;
    } else {
      return "Items";
    }
  }

  return (
    <SafeAreaView style={styles.safeAreaView} edges={["right", "left", "top"]}>
      <View style={{ flex: 1, backgroundColor: "#fff" }}>
        <View style={{ flex: 1 }}>
          {cartCheckOutInfo ? (
            <View>
              <View style={styles.thankYouContainer}>
                <Text style={styles.thankYouText}>
                  Thank You For Your Order!
                </Text>
              </View>
              <View style={styles.summaryContainer}>
                <Text style={styles.summaryText}>Order Summary</Text>
                <Text style={styles.orderText}>
                  Your Order Number is: {checkOutData?.orderNumber}
                </Text>
              </View>
              <View>
                <View style={styles.itemQuantityContainer}>
                  {poData?.length > 0 ? (
                    <View style={styles.quantityBox}>
                      <Text style={{ color: "#494c4c", fontWeight: "700" }}>
                        P.O.#
                      </Text>
                      <Text style={{ color: "#494c4c", fontWeight: "700" }}>
                        {poData}
                      </Text>
                    </View>
                  ) : null}
                  <View style={styles.itemResponseContainer}>
                    <Text style={styles.itemText}>Items:</Text>
                    <View style={styles.itemResponseTextContainer}>
                      <Text style={styles.itemResponseText}>{itemLength}</Text>
                    </View>
                  </View>
                  <View style={styles.itemResponseContainer}>
                    <Text style={styles.itemText}>Item Quantities:</Text>
                    <View style={styles.itemResponseTextContainer}>
                      <Text style={styles.itemResponseText}>
                        {checkOutData?.itemCount}
                      </Text>
                    </View>
                  </View>
                </View>
                <View style={styles.itemQuantityContainer}>
                  <View>
                    {_?.map(pricedFulfillmentGroups, (fulfillmentGroup, i) => {
                      const fieldName = getFriendlyFulfillmentType(
                        checkOutData,
                        fulfillmentGroup
                      );
                      return (
                        <View style={styles.itemResponseContainer} key={i}>
                          <Text style={styles.itemSubTotal}>
                            {fieldName} Subtotal:
                          </Text>
                          <View style={styles.itemResponseTextContainer}>
                            <Text style={styles.itemSubTotal}>
                              $
                              {fulfillmentGroup?.merchandiseTotal?.amount?.toFixed(
                                2
                              )}
                            </Text>
                          </View>
                        </View>
                      );
                    })}
                  </View>
                  <View style={styles.itemResponseContainer}>
                    <Text style={styles.itemSubTotal}>Shipping Fee:</Text>
                    <View style={styles.itemResponseTextContainer}>
                      {checkOutData?.totalShipping?.amount > 0 ? (
                        <Text style={styles.itemSubTotal}>
                          ${checkOutData?.totalShipping?.amount?.toFixed(2)}
                        </Text>
                      ) : (
                        <Text style={styles.itemSubTotalResponseText}>
                          Waived
                        </Text>
                      )}
                    </View>
                  </View>
                </View>
                <View style={styles.itemQuantityContainer}>
                  <View style={styles.itemResponseContainer}>
                    <Text style={styles.itemEstimated}>Estimated Tax:</Text>
                    <View style={styles.itemResponseTextContainer}>
                      <Text style={styles.itemSubTax}>
                        {" "}
                        ${checkOutData?.totalTax?.amount?.toFixed(2)}
                      </Text>
                    </View>
                  </View>
                  <View style={styles.itemResponseContainer}>
                    <Text style={styles.itemTotal}>Order Total:</Text>
                    <View style={styles.itemResponseTotalCostContainer}>
                      <Text style={styles.itemTotalResponseText}>
                        ${checkOutData?.total?.amount?.toFixed(2)}
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
            </View>
          ) : (
            <View>
              <Loader />
            </View>
          )}
        </View>
        <View style={{ left: 0, right: 0, bottom: 0 }}>
          <TabBar />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default CheckOut;
