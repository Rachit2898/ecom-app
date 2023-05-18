//This is filter components which shows the content and functionality of filter

import { Text, View, Modal, Pressable, Image, ScrollView } from "react-native";
import React, { useState, useEffect } from "react";
import DropDownPicker from "react-native-dropdown-picker";
import { useDispatch, useSelector } from "react-redux";
import Spinner from "../Spinner";

import { paginationValue } from "../../redux/features/productApi";
import {
  updateSearchProductUrls,
  setSorting,
  removeUrls,
} from "../../redux/features/authUser";
import Filters from "../Filters";
import MyCheckbox from "../CheckBox";
import { styles } from "../../Style/Style";
import getEnvVars from "../../config/enviroment";

const Filter = (props) => {
  const [response, setResponse] = useState();
  const [isChecked, setChecked] = useState(false);
  const [sortingOpen, setsortingOpen] = useState(false);
  const [sortingValue, setsortingValue] = useState("");
  const [sorting, setsorting] = useState([
    { label: "Item Description", value: "itemName%20asc" },
    { label: "Size", value: "packSize%20asc" },
    { label: "Price", value: "retailPrice%20asc" },
  ]);
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => ({
    ...state.products,
  }));
  useEffect(() => {
    setResponse(props.data);
  }, [props.data]);
  useEffect(() => {
    dispatch(setSorting(sortingValue));
  }, [sortingValue]);
  const filterValues = response?.searchFacets;
  const checkHandler = () => {
    setChecked(!isChecked);
  };
  const myCheckHandler = (label, labelValue) => {
    dispatch(updateSearchProductUrls({ fieldName: label, item: labelValue }));
    dispatch(paginationValue(1));
  };
  const clearHandler = () => {
    setsortingValue("");
    dispatch(removeUrls());
  };
  const { CLOSE_IMAGE } = getEnvVars();
  return (
    <View style={{}}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={props.modalVisible}
        onRequestClose={() => {
          props.setModalVisible(!props.modalVisible);
        }}
        propagateSwipe={true}
        swipeDirection="down"
      >
        <View>
          <View>
            <View style={styles.modalView}>
              <View style={styles.closeButton}>
                {loading && <Spinner />}
                <Pressable
                  style={{ alignItems: "flex-end" }}
                  onPress={() => props.setModalVisible(false)}
                >
                  <Image
                    source={CLOSE_IMAGE}
                    style={{ height: 20, width: 20 }}
                  />
                </Pressable>
              </View>
              <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.dropDownPicker}>
                  <View style={styles.headingSrting}>
                    <Text style={styles.headingSortingText}>Sorting</Text>
                  </View>

                  <View style={{ zIndex: 10, marginHorizontal: 10 }}>
                    <DropDownPicker
                      style={styles.dropdown}
                      open={sortingOpen}
                      value={sortingValue} //sortingValue
                      items={sorting}
                      setOpen={setsortingOpen}
                      setValue={setsortingValue}
                      setItems={setsorting}
                      placeholder="Select..."
                      placeholderStyle={styles.placeholderStyles}
                      zIndex={1000}
                      zIndexInverse={3000}
                    />
                  </View>

                  <View style={styles.headingSrting}>
                    <Text style={styles.headingSortingText}>Filters</Text>
                  </View>

                  {filterValues?.map((item) => {
                    return (
                      <View key={item?.label}>
                        <Filters
                          label={item.label}
                          values={item.values}
                          active={item.active}
                          MyFilter={
                            <View>
                              {item?.values?.map((value) => {
                                return (
                                  <View key={value?.value}>
                                    {value?.quantity ? (
                                      <Pressable
                                        style={styles.checkBoxButton}
                                        onPress={() => {
                                          myCheckHandler(
                                            item?.fieldName,
                                            value?.value
                                          );
                                        }}
                                      >
                                        <MyCheckbox
                                          style={styles.checkbox}
                                          checked={value?.active}
                                          onChange={checkHandler}
                                          onPress={() => {
                                            myCheckHandler(
                                              item?.fieldName,
                                              value?.value
                                            );
                                          }}
                                          buttonStyle={styles.checkboxBase}
                                          activeButtonStyle={[
                                            value?.active
                                              ? styles.checkboxChecked
                                              : "",
                                          ]}
                                        />
                                        <Text style={styles.filterValueText}>
                                          {value?.value}
                                        </Text>
                                        <Text style={styles.filterValueText}>
                                          {" "}
                                          ({value?.quantity})
                                        </Text>
                                      </Pressable>
                                    ) : null}
                                  </View>
                                );
                              })}
                            </View>
                          }
                        />
                      </View>
                    );
                  })}
                </View>
              </ScrollView>
              <View style={styles.resetBox}>
                <Pressable
                  style={styles.clearAllComponents}
                  onPress={() => clearHandler()}
                >
                  <Text style={styles.resetText}>CLEAR ALL</Text>
                </Pressable>
                <Pressable
                  style={styles.doneComponents}
                  onPress={() => props.setModalVisible(false)}
                >
                  <Text style={styles.resetText}>DONE</Text>
                </Pressable>
              </View>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};
export default Filter;
