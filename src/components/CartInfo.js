//This is CartInfo Components which shows the content of cart screen

import { StyleSheet, Text, View } from "react-native";
import React from "react";
import _ from "lodash";
import { useSelector } from "react-redux";

const CartInfo = (props) => {
  const { cartLength } = useSelector((state) => ({
    ...state.products,
  }));

  let pricedFulfillmentGroups = _.orderBy(
    _.filter(
      props?.cartData?.fulfillmentGroups,
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
  const cartValue = cartLength;

  return (
    <View>
      <View style={styles.summaryContainer}></View>
      <View style={styles.itemQuantityContainer}>
        <View style={styles.itemResponseContainer}>
          <Text style={styles.itemText}>Items:</Text>
          <View style={styles.itemResponseTextContainer}>
            <Text style={styles.itemResponseText}>{props.cartLength}</Text>
          </View>
        </View>
        <View style={styles.itemResponseContainer}>
          <Text style={styles.itemText}>Item Quantities:</Text>
          <View style={styles.itemResponseTextContainer}>
            <Text style={styles.itemResponseText}>{props?.quantity}</Text>
          </View>
        </View>
      </View>

      <View style={styles.itemQuantityContainer}>
        <View>
          {_?.map(pricedFulfillmentGroups, (fulfillmentGroup, i) => {
            const fieldName = getFriendlyFulfillmentType(
              props.cartData,
              fulfillmentGroup
            );
            return (
              <View key={i} style={styles.itemResponseContainer}>
                <Text style={styles.itemSubTotal}>{fieldName} Subtotal:</Text>
                <View style={styles.itemResponseTextContainer}>
                  <Text style={styles.itemSubTotal}>
                    ${fulfillmentGroup?.merchandiseTotal?.amount?.toFixed(2)}
                  </Text>
                </View>
              </View>
            );
          })}
        </View>

        <View style={styles.itemResponseContainer}>
          <Text style={styles.itemSubTotal}>Shipping Fee:</Text>
          <View style={styles.itemResponseTextContainer}>
            {props?.totalShipping > 0 ? (
              <Text style={styles.itemSubTotal}>${props?.totalShipping}</Text>
            ) : (
              <Text style={styles.itemSubTotalResponseText}>Waived</Text>
            )}
          </View>
        </View>
      </View>
      <View style={styles.itemQuantityContainer}>
        <View style={styles.itemResponseContainer}>
          <Text style={styles.itemEstimated}>Estimated Tax:</Text>
          <View style={styles.itemResponseTextContainer}>
            <Text style={styles.itemSubTax}>${props?.totalTax}</Text>
          </View>
        </View>
        <View style={styles.itemResponseContainer}>
          <Text style={styles.itemTotal}>Order Total:</Text>
          <View style={styles.itemResponseTotalCostContainer}>
            <Text style={styles.itemTotalResponseText}>
              ${props?.amount.toFixed(2)}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default CartInfo;

const styles = StyleSheet.create({
  itemTotal: {
    fontSize: 16,
    fontWeight: "800",
    color: "#494c4c",
  },
  itemResponseTotalCostContainer: {
    alignItems: "flex-end",
  },
  itemEstimated: {
    fontWeight: "600",
    color: "#494c4c",
  },
  itemTotalResponseText: {
    fontSize: 16,
    fontWeight: "800",
    color: "#494c4c",
  },
  itemSubTax: {},
  itemSubTotalResponseText: {
    color: "#409b4b",
    fontWeight: "800",
  },

  itemText: {
    color: "#9b9b9b",
    fontSize: 15,
    fontWeight: "800",
  },
  itemResponseContainer: {
    marginVertical: 5,
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
  },
  itemSubTotal: {
    fontWeight: "500",
    color: "#494c4c",
  },
  itemResponseTextContainer: {
    alignItems: "flex-end",
  },
  itemQuantityContainer: {
    marginTop: 10,
    borderBottomWidth: 0.5,
    borderBottomColor: "#9b9b9b",
    marginHorizontal: 10,
  },
  itemResponseText: {
    color: "#9b9b9b",
    fontSize: 15,
    fontWeight: "800",
  },
  orderText: {
    fontSize: 15,
    fontWeight: "800",
    color: "#494c4c",
  },
  editOrderText: {
    color: "#006ba6",
    fontSize: 12,
    fontWeight: "800",
  },
  summaryContainer: {
    marginHorizontal: 10,
    borderBottomWidth: 0.5,
    borderBottomColor: "#9b9b9b",
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
