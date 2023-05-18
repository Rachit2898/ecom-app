//This file has the functionality and content of Search Product Items screen.

import { Text, View, ScrollView, Alert, Pressable } from "react-native";
import React, { useState, useEffect, useRef } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch, useSelector } from "react-redux";
import Navbar from "../Searchbar";
import Pagination from "../Pagination";
import Filter from "./filter";
import Spinner from "../Spinner";
import TabBar from "../TabBar";
import ProductScreen from "../ProductScreen";
import { useNavigation } from "@react-navigation/native";
import {
  orderLimitReset,
  searchProducts,
  paginationValue,
  resetDataHandler,
} from "../../redux/features/productApi";
import _ from "lodash";
import { styles } from "../../Style/Style";
import Loader from "../Loader";

const SearchProduct = () => {
  const scrollRef = useRef();
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const [modalVisible, setModalVisible] = useState(false);
  const [orderLimit, setOrderLimit] = useState(false);
  const [sortUrl, setSortUrl] = useState();
  const [notFound, setNotFound] = useState(false);
  const {
    searchProducstsData,
    userInfoData,
    loading,
    addItemData,
    currentPageValue,
    addItemToListData,
    removeItemFromData,
  } = useSelector((state) => ({
    ...state.products,
  }));

  const resetHandlers = () => {
    navigation.navigate("DashBoard");
    dispatch(resetDataHandler());
  };
  const checkOutHandler = async () => {
    if (searchProducstsData?.validations?.length > 0) {
      if (searchProducstsData?.validations[0]?.level === "ERROR") {
        Alert.alert(
          "ERROR",
          `${searchProducstsData?.validations[0]?.message}`,
          [{ text: "OK", onPress: () => resetHandlers() }]
        );
      }
    }
  };
  useEffect(() => {
    checkOutHandler();
  }, [searchProducstsData]);

  //Api response
  const { searchedValue, searchProductUrls, sortingUrl } = useSelector(
    (state) => ({
      ...state.auth,
    })
  );

  let urlStructure = searchProductUrls?.map((url) => {
    return `${url?.fieldName}=${encodeURIComponent(url?.item)}&`;
  });

  const url = urlStructure.join("");

  useEffect(() => {
    if (sortingUrl?.length > 0) {
      setSortUrl(`sort=${sortingUrl}`);
    }
  }, [sortingUrl]);

  const onPressTouch = () => {
    scrollRef?.current?.scrollTo({
      y: 0,
      animated: true,
    });
  };
  const data = searchProducstsData?.products;

  const result = searchProducstsData;
  const userData = userInfoData;

  useEffect(() => {
    dispatch(
      searchProducts({
        searchedValue: encodeURI(searchedValue),
        currentPage: currentPageValue,
        value: url,
        sortValues: sortUrl,
      })
    );
  }, [
    searchedValue,
    url,
    sortingUrl,
    currentPage,
    sortUrl,
    addItemToListData,
    removeItemFromData,
  ]);

  //Pagination functionality
  const apiCall = async (currentPage) => {
    setCurrentPage(currentPage);
    dispatch(paginationValue(currentPage));
    onPressTouch();
  };

  useEffect(() => {
    apiCall(currentPage);
  }, []);

  //This function helps to reset the orderLimit value.
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

  useEffect(() => {
    const loadingFunction = () => {
      setNotFound(true);
    };
    if (!loading) {
      if (
        result?.totalResults == 0 ||
        result?.totalResults == undefined ||
        data?.length == 0
      ) {
        loadingFunction();
      } else {
        setNotFound(false);
      }
    }
  }, [data, searchedValue, result]);
  function isSubscribed(sku) {
    if (_.isNil(sku)) {
      return false;
    }
    return _.includes(
      _.map(sku.productLists, "type"),
      "INVENTORY_NOTIFICATION"
    );
  }

  return (
    <SafeAreaView style={styles.safeAreaView} edges={["right", "left", "top"]}>
      <Filter
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        data={searchProducstsData}
      />
      <View style={styles.mainBox}>
        <View
          style={{
            zIndex: 1,
            position: "absolute",
            backgroundColor: "#fff",
          }}
        >
          <Navbar />
        </View>
        <View style={styles.topBoxContainer}>
          <View style={{ justifyContent: "center" }}>
            <Text style={styles.screenNameText}>Search Products</Text>
          </View>
          <Pressable
            style={styles.filterButton}
            onPress={() => setModalVisible(true)}
          >
            <Text style={styles.filterButtonText}>Filter</Text>
          </Pressable>
        </View>
        {loading && <Spinner />}

        <View style={styles.componentDividerBorder} />
        {result?.totalResults > 0 ? (
          <Text style={styles.pageCountingText}>
            Showing {pageFirst} - {pageLast} of {result?.totalResults} results
          </Text>
        ) : null}

        <View style={loading ? styles.mainBoxLoading : styles.mainBox}>
          {notFound ? (
            <View style={{ justifyContent: "center", alignItems: "center" }}>
              <Text style={{ fontWeight: "bold", color: "#494c4c" }}>
                No products found for "{searchedValue}"
              </Text>
            </View>
          ) : null}

          {data?.length > 0 ? (
            <ScrollView ref={scrollRef} showsVerticalScrollIndicator={false}>
              <View>
                {data?.map((item, i) => {
                  let shortDateOrCloseOut =
                    (!_.isNil(item?.defaultSku?.shortOrCloseOutDate) &&
                      item?.defaultSku?.shortOrCloseOutDate !== "" &&
                      item?.defaultSku?.inventoryClassKey === "S") ||
                    item?.defaultSku?.inventoryClassKey === "C";
                  let quantityAvailable = _.get(
                    item?.defaultSku,
                    "availabilityDetail.quantityAvailable",
                    0
                  );
                  let restrictionReason = _.get(
                    item?.defaultSku,
                    "availabilityDetail.category"
                  );
                  let quantityMinimumOrder = _.get(
                    item?.defaultSku,
                    "minOrderQuantity",
                    999999
                  );

                  const subscribed = isSubscribed(item?.defaultSku);

                  return (
                    <View
                      key={item?.defaultSku?.id}
                      style={{
                        zIndex: -i,
                      }}
                    >
                      <ProductScreen
                        url={item?.mediaMap?.primary?.url}
                        name={item?.defaultSku?.name}
                        externalId={item?.defaultSku?.externalId}
                        nationalDrugCode={item?.defaultSku?.nationalDrugCode}
                        manufacturer={item?.defaultSku?.manufacturer}
                        itemForm={item?.defaultSku?.itemForm}
                        description={item?.defaultSku?.description}
                        netPriceItem={item?.defaultSku?.netPriceItem}
                        amount={item?.defaultSku?.salePrice?.amount}
                        id={item?.defaultSku?.id}
                        subscribed={subscribed}
                        generic={item?.defaultSku?.generic}
                        petFriendly={item?.defaultSku?.petFriendly}
                        schedule={item?.defaultSku?.schedule}
                        rxItem={item?.defaultSku?.rxItem}
                        refrigerated={item?.defaultSku?.refrigerated}
                        hazardousMaterial={item?.defaultSku?.hazardousMaterial}
                        groundShip={item?.defaultSku?.groundShip}
                        dropShipOnly={item?.defaultSku?.dropShipOnly}
                        itemRating={item?.defaultSku?.itemRating}
                        rewardItem={item?.defaultSku?.rewardItem}
                        priceType={item?.defaultSku?.priceType}
                        inventoryClassKey={item?.defaultSku?.inventoryClassKey}
                        orderLimit={item?.defaultSku?.dailyOrderLimit}
                        accountId={userData?.selectedAccount?.id}
                        itemReturnable={item?.defaultSku?.itemReturnable}
                        discount={item?.defaultSku?.netPriceDetail?.tiers}
                        isPriceLocked={item?.defaultSku?.priceLocked}
                        vendorStateLicenseValid={
                          item?.defaultSku?.vendorStateLicenseValid
                        }
                        retailPrice={item?.defaultSku?.retailPrice}
                        quantityAvailable={quantityAvailable}
                        restrictionReason={restrictionReason}
                        quantityMinimumOrder={quantityMinimumOrder}
                        type={item?.defaultSku?.productLists[0]?.type}
                        itemMessages={item?.defaultSku?.itemNoReturnMsg}
                        bestPrice={item?.defaultSku?.bestPrice}
                        shortDateOrCloseOut={shortDateOrCloseOut}
                      />
                    </View>
                  );
                })}
              </View>
              {result?.totalResults > 25 ? (
                <View style={styles.pagination}>
                  <Pagination
                    currentPage={currentPage}
                    totalCount={result?.totalResults}
                    pageSize={result?.pageSize}
                    onPageChange={(page) => apiCall(page)}
                  />
                </View>
              ) : (
                <View style={styles.emptyPagination} />
              )}
            </ScrollView>
          ) : null}
        </View>

        <View style={styles.tabBarBox}>
          <TabBar />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default SearchProduct;
