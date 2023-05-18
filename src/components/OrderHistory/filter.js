//This is filter components which shows the content and functionality of filter

import {
  StyleSheet,
  Text,
  View,
  Modal,
  Pressable,
  Image,
  ScrollView,
  TextInput,
} from "react-native";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import DatePicker from "@react-native-community/datetimepicker";
import moment from "moment";
import MyCheckbox from "../CheckBox";
import _ from "lodash";
import {
  updateHistoryFilter,
  resetHistoryFilter,
} from "../../redux/features/productApi";
import getEnvVars from "../../config/enviroment";

const OrderHistoryModel = ({ modalVisible, setModalVisible }) => {
  const dispatch = useDispatch();
  const [startDate, setStartDate] = useState(new Date(1641038400000));
  const [isChecked, setChecked] = useState(false);
  const [endDates, setEndDate] = useState(new Date());
  const [searchValue, setSearchValue] = useState("");
  const [statusValue, setStatusValue] = useState("");
  const [showStart, setShowStart] = useState(false);
  const [showEnd, setShowEnd] = useState(false);
  var [value, setValue] = useState();
  const [showDropDown, setShowDropDown] = useState(false);
  const { userInfoData } = useSelector((state) => ({
    ...state.products,
  }));

  const dropDownHandler = () => {
    setShowDropDown((pre) => !pre);
  };
  const setValueHandler = (value, item) => {
    setValue(item);
    setStatusValue(value);
    setShowDropDown(false);
  };

  const onChange = (event, selectedDate) => {
    setShowStart(false);
    setStartDate(selectedDate);
  };

  const onChangeEnd = (event, selectedDate) => {
    setShowEnd(false);
    setEndDate(selectedDate);
  };

  const openCalendarHandler = () => {
    setShowStart((pre) => !pre);
  };
  const openEndCalendarHandler = () => {
    setShowEnd((pre) => !pre);
  };

  const dateFrom = moment(startDate).startOf("day");
  const endDate = moment(endDates).startOf("day");
  const newdatefrom = moment(dateFrom).format("MM/DD/YYYY");
  const newEndDate = moment(endDate).format("MM/DD/YYYY");
  var csosOrders = isChecked;
  var status = statusValue ? statusValue : "";

  const searchHandler = () => {
    dispatch(
      updateHistoryFilter({
        currentPageValue: 1,
        status,
        csosOrders,
        startDate: startDate,
        endDates: endDates,
        searchValue: searchValue,
      })
    );
    setModalVisible(!modalVisible);
    setSearchValue("");
  };
  const { CLOSE_IMAGE, DOWN_IMAGE, RIGHT_IMAGE, CALENDAR_IMAGE } = getEnvVars();

  const myCheckHandler = () => {
    setChecked(!isChecked);
  };

  function resetHandler() {
    setStatusValue("");
    setSearchValue("");
    setValue("");
    setStartDate(new Date(1641038400000));
    dispatch(resetHistoryFilter());
    setModalVisible(false);
    setChecked(false);
  }

  return (
    <View style={styles.modelContainer}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
        propagateSwipe={true}
        swipeDirection="down"
      >
        <ScrollView>
          <View style={styles.modalView}>
            <View style={styles.closeButton}>
              <Pressable
                style={{ alignItems: "flex-end" }}
                onPress={() => setModalVisible(false)}
                android_ripple={{ color: "#ccc" }}
              >
                <Image source={CLOSE_IMAGE} style={{ height: 20, width: 20 }} />
              </Pressable>
            </View>
            <View style={styles.searchBox}>
              <View style={styles.searchBy}>
                <View style={{ marginVertical: 5 }}>
                  <Text style={{ color: "#494c4c" }}>SEARCH BY</Text>
                </View>
                <View style={styles.inputBox}>
                  <TextInput
                    style={styles.textInput}
                    placeholder="Invoice, Item, Manufacturer, NDC, Acct#, PO#"
                    value={searchValue}
                    onChangeText={(search) => setSearchValue(search)}
                  />
                </View>
              </View>
              <View style={styles.searchBy}>
                <View style={{ marginVertical: 5 }}>
                  <Text style={{ color: "#494c4c" }}>STATUS/ACTION</Text>
                </View>
                <View>
                  <View style={styles.inputBoxSelect}>
                    <TextInput
                      style={styles.selectInput}
                      value={value}
                      placeholder="SELECT..."
                    />
                    <Pressable
                      android_ripple={{ color: "#ccc" }}
                      onPress={() => dropDownHandler()}
                      style={{
                        paddingHorizontal: 15,
                        alignSelf: "center",
                      }}
                    >
                      {showDropDown ? (
                        <Image
                          source={DOWN_IMAGE}
                          style={{ height: 15, width: 15 }}
                        />
                      ) : (
                        <Image
                          source={RIGHT_IMAGE}
                          style={{ height: 15, width: 15 }}
                        />
                      )}
                    </Pressable>
                  </View>
                </View>
              </View>
              {showDropDown && (
                <View style={styles.optionBox}>
                  <Pressable
                    style={styles.options}
                    onPress={() => setValueHandler("PENDING", "Pending")}
                  >
                    <Text style={{ color: "#494c4c" }}>Pending</Text>
                  </Pressable>
                  <Pressable
                    style={styles.options}
                    onPress={() => setValueHandler("PROCESSING", "Processing")}
                  >
                    <Text style={{ color: "#494c4c" }}>Processing</Text>
                  </Pressable>
                  <Pressable
                    style={styles.options}
                    onPress={() => setValueHandler("COMPLETED", "Completed")}
                  >
                    <Text style={{ color: "#494c4c" }}>Completed</Text>
                  </Pressable>
                  <Pressable
                    style={styles.options}
                    onPress={() => setValueHandler("CANCELLED", "Cancelled")}
                  >
                    <Text style={{ color: "#494c4c" }}>Cancelled</Text>
                  </Pressable>
                  {userInfoData?.selectedAccount?.controlledAllowed ? (
                    <View>
                      <Pressable
                        style={styles.options}
                        onPress={() =>
                          setValueHandler(
                            "PENDING_SIGNATURE",
                            "CSOS Action: Sign Order"
                          )
                        }
                      >
                        <Text style={{ color: "#494c4c" }}>
                          CSOS Action: Sign Order
                        </Text>
                      </Pressable>
                      <Pressable
                        style={styles.options}
                        onPress={() =>
                          setValueHandler(
                            "PENDING_RECEIVED",
                            "CSOS Action: Receive Order"
                          )
                        }
                      >
                        <Text style={{ color: "#494c4c" }}>
                          CSOS Action: Receive Order
                        </Text>
                      </Pressable>
                      <Pressable
                        style={styles.options}
                        onPress={() =>
                          setValueHandler(
                            "RECEIVED",
                            "CSOS Action: Archive Order"
                          )
                        }
                      >
                        <Text style={{ color: "#494c4c" }}>
                          CSOS Action: Archive Order
                        </Text>
                      </Pressable>
                      <Pressable
                        style={styles.options}
                        onPress={() =>
                          setValueHandler("REJECTED", "CSOS Rejected by User")
                        }
                      >
                        <Text style={{ color: "#494c4c" }}>
                          CSOS Rejected by User
                        </Text>
                      </Pressable>
                    </View>
                  ) : null}
                </View>
              )}
              <View style={styles.dateBox}>
                <View style={{ marginVertical: 5 }}>
                  <Text style={{ color: "#494c4c" }}>DATE RANGE</Text>
                </View>
                <View style={styles.inputBoxSelect}>
                  <TextInput
                    style={styles.selectInput}
                    value={newdatefrom}
                    placeholder="MM/DD/YYYY"
                  />
                  <Pressable
                    android_ripple={{ color: "#ccc" }}
                    style={{
                      paddingHorizontal: 15,
                      paddingVertical: 10,
                    }}
                    onPress={() => openCalendarHandler()}
                  >
                    <Image
                      source={CALENDAR_IMAGE}
                      style={{ height: 20, width: 20 }}
                    />
                  </Pressable>
                </View>
                {showStart ? (
                  <DatePicker
                    testID="dateTimePicker"
                    value={startDate}
                    onChange={onChange}
                    minimumDate={new Date(2022, 0, 1)}
                    display={Platform.OS === "ios" ? "inline" : "default"}
                    style={styles.datePicker}
                  />
                ) : null}

                {showEnd ? (
                  <DatePicker
                    testID="dateTimePicker"
                    value={endDates}
                    onChange={onChangeEnd}
                    minimumDate={new Date()}
                    display={Platform.OS === "ios" ? "inline" : "default"}
                    style={styles.datePicker}
                  />
                ) : null}
                <View style={{ marginVertical: 5 }}>
                  <Text style={{ color: "#494c4c", textAlign: "center" }}>
                    TO
                  </Text>
                </View>
                <View style={styles.inputBoxSelect}>
                  <TextInput
                    style={styles.selectInput}
                    value={newEndDate}
                    placeholder="MM/DD/YYYY"
                  />
                  <Pressable
                    android_ripple={{ color: "#ccc" }}
                    style={{
                      paddingHorizontal: 15,
                      paddingVertical: 10,
                    }}
                    onPress={() => openEndCalendarHandler()}
                  >
                    <Image
                      source={CALENDAR_IMAGE}
                      style={{ height: 20, width: 20 }}
                    />
                  </Pressable>
                </View>
                {userInfoData?.selectedAccount?.controlledAllowed ? (
                  <View
                    style={{
                      flexDirection: "row",

                      alignItems: "center",
                    }}
                  >
                    <MyCheckbox
                      style={styles.checkbox}
                      checked={isChecked}
                      onChange={myCheckHandler}
                      onPress={() => {
                        myCheckHandler;
                      }}
                      buttonStyle={styles.checkboxBase}
                      activeButtonStyle={styles.checkboxChecked}
                    />
                    <View style={{ marginVertical: 5 }}>
                      <Text style={{ color: "#494c4c" }}>CSOS Orders</Text>
                    </View>
                  </View>
                ) : null}
              </View>

              <View
                style={{
                  flexDirection: "row",
                  marginTop: 20,
                  justifyContent: "center",
                }}
              >
                <Pressable
                  style={{
                    backgroundColor: "#ed8b00",
                    paddingHorizontal: 10,
                    paddingVertical: 5,
                    borderRadius: 3,
                  }}
                  onPress={() => {
                    resetHandler();
                  }}
                >
                  <Text
                    style={{
                      fontSize: 12,
                      color: "#fff",
                      fontWeight: "bold",
                    }}
                  >
                    CLEAR ALL
                  </Text>
                </Pressable>
                <Pressable
                  style={{
                    backgroundColor: "#006ba6",
                    paddingHorizontal: 10,
                    paddingVertical: 5,
                    borderRadius: 3,
                    marginHorizontal: 10,
                  }}
                  onPress={() => {
                    searchHandler();
                  }}
                >
                  <Text
                    style={{
                      fontSize: 12,
                      color: "#fff",
                      fontWeight: "bold",
                    }}
                  >
                    SEARCH
                  </Text>
                </Pressable>
              </View>
            </View>
          </View>
        </ScrollView>
      </Modal>
    </View>
  );
};

export default OrderHistoryModel;

const styles = StyleSheet.create({
  mainBoxLoading: { flex: 1, opacity: 0.2 },
  mainBox: { flex: 1, backgroundColor: "#fff" },
  modelContainer: {
    marginTop: 10,
  },
  pagination: {
    borderTopWidth: 1,
  },
  searchBox: {
    backgroundColor: "#fff",
    width: "100%",
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  searchBy: {
    marginVertical: 10,
  },
  options: {
    backgroundColor: "#fff",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderBottomWidth: 1,
    borderBottomColor: "#ececec",
  },
  inputBoxSelect: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#ececec",
    backgroundColor: "#fff",
    paddingLeft: 10,
    color: "#494c4c",
    flexDirection: "row",
    borderRadius: 3,
  },
  optionBox: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#ececec",
    backgroundColor: "#fff",
    color: "#494c4c",
    borderRadius: 3,
  },
  selectInput: {
    width: "85%",
    height: 30,
    marginVertical: 5,

    paddingLeft: 10,
    color: "#494c4c",
  },
  textInput: {
    width: "100%",
    height: 30,
    borderWidth: 1,
    borderColor: "#ececec",
    backgroundColor: "#fff",
    paddingLeft: 10,
    color: "#494c4c",
    borderRadius: 3,
  },

  safeAreaContainer: {
    flex: 1,
    backgroundColor: "#fff",
  },

  modalView: {
    backgroundColor: "#fff",
    zIndex: 1,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    marginTop: 45,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },

  closeButton: {
    paddingVertical: 10,
    paddingHorizontal: 30,
    width: 400,
  },

  checkboxBase: {
    width: 24,
    height: 24,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 4,
    margin: 6,
    borderWidth: 2,
    borderColor: "#006ba6",
    backgroundColor: "transparent",
  },

  checkboxChecked: {
    backgroundColor: "#006ba6",
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
  },

  checkboxLabel: {
    marginLeft: 8,
    fontWeight: 500,
    fontSize: 18,
  },
  datePicker: {
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: 300,

    display: "flex",
  },
});
