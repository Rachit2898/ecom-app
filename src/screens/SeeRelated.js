//This screen shows the see related data. This "See Related" is error it comes on cart screen, when items is out of stock.

import { View, Pressable, Image, ScrollView, Modal } from "react-native";
import React from "react";
import { useSelector } from "react-redux";
import ProductScreen from "../components/ProductScreen";
import _ from "lodash";
import getEnvVars from "../config/enviroment";
import { styles } from "../Style/Style";

const CartScreen = ({ modalVisible, setModalVisible }) => {
  const { seeRelatedData } = useSelector((state) => ({
    ...state.products,
  }));
  const { CLOSE_IMAGE } = getEnvVars();
  const data = seeRelatedData?.products;

  return (
    <View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.seeRelatedModal}>
          <View style={styles.seeRelatedBox}>
            <Pressable
              onPress={() => setModalVisible(false)}
              style={{ justifyContent: "center" }}
            >
              <Image source={CLOSE_IMAGE} style={styles.closeButtonImage} />
            </Pressable>
          </View>
          <ScrollView showsVerticalScrollIndicator={false}>
            <View>
              {data?.map((item, i) => {
                const values =
                  item?.defaultSku?.availabilityDetail?.quantityAvailable;

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
                      values={values}
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
                      orderLimit={item?.defaultSku?.dailyOrderLimit}
                      type={item?.defaultSku?.productLists[0]?.type}
                      itemReturnable={item?.defaultSku?.returnable}
                      discount={item?.defaultSku?.netPriceDetail?.tiers}
                    />
                  </View>
                );
              })}
            </View>
          </ScrollView>
        </View>
      </Modal>
    </View>
  );
};

export default CartScreen;
