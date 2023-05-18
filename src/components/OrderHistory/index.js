//This file has the functionality and content of Order History Items screen.

import { StyleSheet, Text, View, ScrollView, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import React, { useState, useEffect, useRef } from "react";
import Pagination from "../Pagination";
import Spinner from "../Spinner";
import TabBar from "../TabBar";
import { useDispatch, useSelector } from "react-redux";
import _ from "lodash";
import {
  orderHistory,
  userInfo,
  paginationValue,
} from "../../redux/features/productApi";
import moment from "moment";
import OrderComponent from "../../screens/OrderHistory";
import Filter from "./filter";
import Loader from "../Loader";

const OrderHistoryComponent = () => {
  const scrollRef = useRef();
  const {
    orderHistoryData,
    searchValue,
    status,
    startDate,
    endDates,
    csosOrders,
    historyLoading,
    currentPageValue,
    loading,
  } = useSelector((state) => ({
    ...state.products,
  }));
  const dispatch = useDispatch();
  const [modalVisible, setModalVisible] = useState(false);
  const [notFound, setNotFound] = useState(false);
  const result = orderHistoryData;
  const dateFrom = moment(startDate).startOf("day");
  const endDate = moment(endDates).startOf("day");

  var startDateValue = _.isNil(dateFrom) ? null : dateFrom.toISOString(true);
  var endDateValue = _.isNil(endDate)
    ? null
    : endDate?.add(1, "d").toISOString(true);

  //Api calling functions
  useEffect(() => {
    dispatch(
      orderHistory({
        currentPage: currentPageValue,
        status: status,
        startDate: encodeURIComponent(startDateValue),
        endDates: encodeURIComponent(endDateValue),
        csosOrders: csosOrders,
        searchValue: searchValue,
      })
    );

    dispatch(userInfo());
  }, [status, startDate, endDates, csosOrders, searchValue, currentPageValue]);
  const currentFirst = (currentPage) => {
    return (currentPage - 1) * result?.pageSize + 1;
  };
  let pageFirst = currentFirst(currentPageValue);
  const currentLast = (currentPage) => {
    if (currentPage == 1 && result?.totalResults >= result?.pageSize) {
      const lastPageValue = pageFirst + result?.pageSize - 1;
      return lastPageValue;
    } else if (result?.totalResults <= result?.pageSize) {
      return result?.totalResults;
    } else if (result?.totalResults <= pageFirst + result?.pageSize) {
      return result?.totalResults;
    } else {
      const lastPageValue = pageFirst + result?.pageSize - 1;
      return lastPageValue;
    }
  };
  const pageLast = currentLast(currentPageValue);

  const data = orderHistoryData?.orders;
  const onPressTouch = () => {
    scrollRef?.current?.scrollTo({
      y: 0,
      animated: true,
    });
  };

  //Pagination functionality
  const apiCall = async (currentPage) => {
    dispatch(paginationValue(currentPage));
    onPressTouch();
  };

  useEffect(() => {
    apiCall(currentPageValue);
  }, []);

  useEffect(() => {
    const loadingFunction = () => {
      setNotFound(true);
    };
    if (!historyLoading) {
      if (result.totalResults == 0) {
        loadingFunction();
      } else {
        setNotFound(false);
      }
    }
  }, [result, dispatch]);
  function getOrderNumberMapForOrder(order) {
    return _.filter(
      _.map(order?.fulfillmentGroups, (fg) => {
        let csos = fg.fulfillmentType.type === "CSOS";
        return {
          number: csos ? fg.csosOrderNumber : fg.tpsOrderNumber,
          csos,
        };
      }),
      (map) => !_.isUndefined(map.number)
    );
  }

  return (
    <SafeAreaView
      style={{ backgroundColor: "#063e63", flex: 1 }}
      edges={["right", "left"]}
    >
      <View style={{ backgroundColor: "#fff", flex: 1 }}>
        <Filter modalVisible={modalVisible} setModalVisible={setModalVisible} />

        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            padding: 10,
          }}
        >
          <View style={{ justifyContent: "center" }}>
            {result.totalResults > 0 && (
              <Text style={styles.pageText}>
                Showing {pageFirst > pageLast ? 1 : pageFirst} - {pageLast} of{" "}
                {result.totalResults} results
              </Text>
            )}
          </View>

          <Pressable
            style={{
              borderWidth: 1,
              width: 60,
              height: 25,
              borderColor: "#ed8b00",
              borderRadius: 3,
              alignItems: "center",
              justifyContent: "center",
            }}
            onPress={() => setModalVisible(true)}
          >
            <Text
              style={{ fontWeight: "bold", color: "#ed8b00", fontSize: 12 }}
            >
              Filter
            </Text>
          </Pressable>
        </View>
        {notFound && (
          <View style={{ justifyContent: "center", alignItems: "center" }}>
            <Text style={{ fontWeight: "bold", color: "#494c4c" }}>
              No Items Found
            </Text>
          </View>
        )}
        <View style={{ flex: 1 }}>
          {historyLoading && <Loader top="-200" />}
          <View style={historyLoading ? styles.mainBoxLoading : styles.mainBox}>
            {result.totalResults > 0 ? (
              <ScrollView ref={scrollRef} showsVerticalScrollIndicator={false}>
                {data?.map((item) => {
                  const date = item?.submitDate;

                  const data = getOrderNumberMapForOrder(item);

                  return (
                    <View key={item?.orderNumber}>
                      <OrderComponent
                        date={moment(date).format("MMMM DD, YYYY")}
                        orderNumber={item?.orderNumber}
                        csosOrderNumber={
                          item?.fulfillmentGroups[0]?.csosOrderNumber
                        }
                        tpsOrderNumber={
                          item?.fulfillmentGroups[0]?.tpsOrderNumber
                        }
                        invoiceNumber={
                          item?.fulfillmentGroups[0]?.fulfillmentOrders[0]
                            ?.invoiceNumber
                        }
                        item={item}
                        data={data}
                        id={item.id}
                      />
                    </View>
                  );
                })}
                {result?.totalResults > 25 && (
                  <View style={styles.pagination}>
                    <Pagination
                      currentPage={currentPageValue}
                      totalCount={result?.totalResults}
                      pageSize={result?.pageSize}
                      onPageChange={(page) => apiCall(page)}
                    />
                  </View>
                )}
              </ScrollView>
            ) : (
              <View style={styles.emptyPagination} />
            )}
          </View>
        </View>
        <View style={{ position: "absolute", left: 0, right: 0, bottom: 0 }}>
          <TabBar />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default OrderHistoryComponent;

const styles = StyleSheet.create({
  pageText: {
    color: "#494c4c",
    fontWeight: "600",
    fontSize: 18,
    paddingHorizontal: 10,
    paddingBottom: 10,
  },
  pagination: {
    marginBottom: 50,
  },
  emptyPagination: {
    marginTop: 60,
  },
  mainBoxLoading: { opacity: 0.2, flex: 1, backgroundColor: "#fff" },
  mainBox: { backgroundColor: "#fff", flex: 1 },
});
