import {
  Text,
  View,
  Pressable,
  ScrollView,
  Dimensions,
  ActivityIndicator,
} from "react-native";
import React, { useState, useEffect, useRef } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch, useSelector } from "react-redux";
import Navbar from "../Searchbar";
import Pagination from "../Pagination";
import TabBar from "../TabBar";
import Spinner from "../Spinner";
import Filter from "./filter";
import Loader from "../Loader";
import ProductScreen from "../ProductScreen";
import {
  andaContractItems,
  userInfo,
  orderLimitReset,
} from "../../redux/features/productApi";
import _ from "lodash";
import { styles } from "../../Style/Style";
const { width, height } = Dimensions.get("window");
const guidelineBaseHeight = 812;
const verticalScale = (size) => (height / guidelineBaseHeight) * size;

const VolumeDiscount = () => {
  const scrollRef = useRef();
  const dispatch = useDispatch();
  const [modalVisible, setModalVisible] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [notFound, setNotFound] = useState(false);
  const [orderLimit, setOrderLimit] = useState(false);
  const [sortUrl, setSortUrl] = useState();

  //Api responses
  const {
    andaContractItemsData,
    userInfoData,
    loading,
    addItemData,
    addItemToListData,
    removeItemFromData,
    screenName,
    targetUrl,
  } = useSelector((state) => ({
    ...state.products,
  }));

  var { andaContractItemsUrls, sortingUrl } = useSelector((state) => ({
    ...state.auth,
  }));

  const onPressTouch = () => {
    scrollRef?.current?.scrollTo({
      y: 0,
      animated: true,
    });
  };
  const data = andaContractItemsData?.products;
  let urlStructure = andaContractItemsUrls?.map((url) => {
    return `${url?.fieldName}=${encodeURIComponent(url?.item)}&`;
  });

  const url = urlStructure.join("");

  useEffect(() => {
    if (sortingUrl?.length > 0) {
      setSortUrl(`sort=${sortingUrl}`);
    }
  }, [sortingUrl]);

  //Api calling functions
  useEffect(() => {
    dispatch(
      andaContractItems({
        targetUrl: targetUrl,
        value: url,
        currentPage,
        sortValues: sortUrl,
      })
    );
    dispatch(userInfo());
  }, [
    url,
    sortingUrl,
    currentPage,
    sortUrl,
    addItemToListData,
    removeItemFromData,
  ]);
  const result = andaContractItemsData;
  const userData = userInfoData;

  //Pagination functionality
  const apiCall = async (currentPage) => {
    setCurrentPage(currentPage);
    onPressTouch();
  };

  useEffect(() => {
    apiCall(currentPage);
  }, []);

  const currentFirst = (currentPage) => {
    return (currentPage - 1) * result?.pageSize + 1;
  };
  const pageFirst = currentFirst(currentPage);
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
  const pageLast = currentLast(currentPage);

  useEffect(() => {
    const loadingFunction = () => {
      setNotFound(true);
    };
    if (!loading) {
      if (result?.totalResults == 0 || result?.totalResults == undefined) {
        loadingFunction();
      } else {
        setNotFound(false);
      }
    }
  }, [result, dispatch]);

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
        data={andaContractItemsData}
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
          <View style={{ justifyContent: "center", flex: 1 }}>
            <Text style={styles.screenNameText}>{screenName}</Text>
          </View>

          <Pressable
            style={styles.filterButton}
            onPress={() => setModalVisible(true)}
          >
            <Text style={styles.filterButtonText}>Filter</Text>
          </Pressable>
        </View>
        <View style={styles.componentDividerBorder} />
        {result.totalResults > 0 ? (
          <Text style={styles.pageCountingText}>
            Showing {pageFirst} - {pageLast} of {result.totalResults} results
          </Text>
        ) : null}

        <View style={{ flex: 1 }}>
          {loading && <Loader top="-200" />}
          {result.totalResults == 0 ? (
            <View style={{ justifyContent: "center", alignItems: "center" }}>
              <Text style={{ fontWeight: "bold", color: "#494c4c" }}>
                No product found
              </Text>
            </View>
          ) : (
            <View
              style={{
                flex: 1,
              }}
            >
              {data?.length > 0 ? (
                <ScrollView
                  ref={scrollRef}
                  showsVerticalScrollIndicator={false}
                >
                  <View
                    style={loading ? styles.mainBoxLoading : styles.mainBox}
                  >
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
                          key={i}
                          style={{
                            zIndex: -i,
                          }}
                        >
                          <ProductScreen
                            url={item?.mediaMap?.primary?.url}
                            name={item?.defaultSku?.name}
                            externalId={item?.defaultSku?.externalId}
                            nationalDrugCode={
                              item?.defaultSku?.nationalDrugCode
                            }
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
                            hazardousMaterial={
                              item?.defaultSku?.hazardousMaterial
                            }
                            groundShip={item?.defaultSku?.groundShip}
                            dropShipOnly={item?.defaultSku?.dropShipOnly}
                            itemRating={item?.defaultSku?.itemRating}
                            rewardItem={item?.defaultSku?.rewardItem}
                            priceType={item?.defaultSku?.priceType}
                            inventoryClassKey={
                              item?.defaultSku?.inventoryClassKey
                            }
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
                            favorited={item?.defaultSku?.favorited}
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
              ) : (
                <Loader top="-200" />
              )}
            </View>
          )}
        </View>

        <View style={styles.tabBarBox}>
          <TabBar />
        </View>
      </View>
    </SafeAreaView>
  );
};
export default VolumeDiscount;
