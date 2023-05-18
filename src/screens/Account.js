////This is Account Screen has the functionality and content of account screen

import {
  Text,
  View,
  Image,
  TextInput,
  Pressable,
  ScrollView,
  Linking,
  Alert,
} from "react-native";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useIsFocused } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import MyCheckbox from "../components/CheckBox";
import Loader from "../components/Loader";
import TabBar from "../components/TabBar";
import Moment from "moment";
import _ from "lodash";
import getEnvVars from "../config/enviroment";
import {
  userInfo,
  cartInfo,
  updateUserNameValidation,
  updateUserNameAndEmail,
} from "../redux/features/productApi";
import {
  changeUserPassword,
  logout,
  removeUrls,
} from "../redux/features/authUser";
import { styles } from "../Style/Style";

//This component is responsible for password related UI
const InputComponent = (props) => {
  const [show, setShow] = useState(true);
  const { EYE_OPEN_IMAGE, EYE_CLOSE_IMAGE } = getEnvVars();

  const showPasswordHandler = (value) => {
    setShow((pre) => !pre);
  };
  return (
    <View>
      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholderTextColor="#003f5c"
          secureTextEntry={show}
          onChangeText={props.onChangeText}
        />
        <Pressable
          style={{
            justifyContent: "center",
            margin: 10,
            paddingHorizontal: 10,
            borderRadius: 3,
          }}
          onPress={() => showPasswordHandler(2)}
        >
          {show ? (
            <Image style={{ height: 15, width: 18 }} source={EYE_OPEN_IMAGE} />
          ) : (
            <Image style={{ height: 15, width: 18 }} source={EYE_CLOSE_IMAGE} />
          )}
        </Pressable>
      </View>
    </View>
  );
};

const Account = () => {
  const dispatch = useDispatch();
  const { userInfoData, loading } = useSelector((state) => ({
    ...state.products,
  }));
  const { changePasswordValue, changeUserPasswordData } = useSelector(
    (state) => ({
      ...state.auth,
    })
  );
  const userData = userInfoData;
  const [value, setValue] = useState(userData?.customerAttributes[0]?.value);

  const [isChecked, setChecked] = useState(
    userData?.customerAttributes[0]?.value
  );
  const isFocused = useIsFocused();
  const [error, setError] = useState(false);
  const [nullValue, setNullValue] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [formattedNumber, setFormattedNumber] = useState("");
  const [phoneFaxNumber, setPhoneFaxNumber] = useState();
  const [phoneNumber, setPhoneNumber] = useState();
  const [userName, setUserName] = useState(userData?.username);
  const [name, setName] = useState();
  const [email, setEmail] = useState(userData?.emailAddress);
  const [userEmail, setUserEmail] = useState();
  const [isValidUserName, setUserNameValid] = useState(true);
  const [emailAndNameError, setEmailAndNameError] = useState(false);
  const [nameError, setNameError] = useState(false);
  const [strongPasswordError, setStrongPasswordError] = useState(false);
  const [strongConfirmPasswordError, setStrongConfirmPasswordError] =
    useState(false);
  const [disabled, setDisabled] = useState(true);
  const [passwordErrorMessage, setPasswordErrorMessage] = useState(false);

  //Api calling functions

  const checkHandler = () => {
    setChecked((pre) => !pre);
  };
  const { ACCOUNT_IMAGE, ERROR_ALERT_IMAGE, ALERT_IMAGE } = getEnvVars();

  const cmeaExp = userInfoData?.selectedAccount?.cmeaCertificationRequired;

  //CheckBox click Handler Function
  const myCheckHandler = async () => {
    setValue((pre) => !pre);
    setDisabled(false);
  };

  function checkPassword(str) {
    var re = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{6,64}$/;
    return re.test(str);
  }

  const updatePasswordHandler = () => {
    if (!newPassword.length) {
      setNullValue(true);
      return;
    } else if (!checkPassword(newPassword)) {
      setStrongPasswordError(true);
      return;
    } else if (!currentPassword.length) {
      setNullValue(true);
      return;
    } else if (!confirmPassword.length) {
      setNullValue(true);
      return;
    } else if (!checkPassword(confirmPassword)) {
      setStrongConfirmPasswordError(true);
      return;
    } else if (newPassword != confirmPassword) {
      setError(true);
      return;
    } else {
      setError(false);
      dispatch(changeUserPassword({ currentPassword, newPassword }));
    }
  };

  // date format, phone format functionality
  useEffect(() => {
    let stringNumber =
      userData?.selectedAccount?.accountDetail?.accountRep.number;
    if (stringNumber?.length === 10) {
      setFormattedNumber(
        stringNumber.replace(/(\d{3})(\d{3})(\d{4})/gi, "($1) $2-$3")
      );
    }
    let phoneFax =
      userData?.selectedAccount?.addresses[0]?.phoneFax?.phoneNumber;
    if (phoneFax?.length === 10) {
      setPhoneFaxNumber(
        phoneFax.replace(/(\d{3})(\d{3})(\d{4})/gi, "($1) $2-$3")
      );
    }
    let phoneNumbers =
      userData?.selectedAccount?.addresses[0]?.phonePrimary?.phoneNumber;
    if (phoneNumbers?.length === 10) {
      setPhoneNumber(
        phoneNumbers.replace(/(\d{3})(\d{3})(\d{4})/gi, "($1) $2-$3")
      );
    }
  }, [userData]);

  //Error components removing functionality
  const userNameTextHandler = (value) => {
    setUserName(value);
    setName(value);
    setEmailAndNameError(false);
    setNameError(false);
    setUserNameValid(true);
    setDisabled(false);
    setNullValue(false);
  };
  const emailChangeHandler = (value) => {
    setEmail(value);
    setUserEmail(value);
    setEmailAndNameError(false);
    setNameError(false);
    setUserNameValid(true);
    setDisabled(false);
    setNullValue(false);
  };
  function daysUntilCmeaExpiration(account) {
    return _.isNil(account.cmeaCertificationExpiration)
      ? Number.MAX_VALUE
      : moment(account.cmeaCertificationExpiration)
          .endOf("d")
          .diff(moment(), "d");
  }

  let cmeaExpirationDays = daysUntilCmeaExpiration(userData);

  const updateUserNameAndEmailHandler = async () => {
    const result = await dispatch(
      updateUserNameAndEmail({
        userName: name,
        emailMarketing: value,
        emailAddress: userEmail,
      })
    );

    if (result?.payload === "error") {
      setEmailAndNameError(true);
      return;
    } else {
      dispatch(logout(false));
    }
  };

  async function emptyCart(id) {
    Alert.alert(
      "ACCOUNT MANAGEMENT",
      "You will be required to log back in after changing your username. Do you wish to continue?",
      [
        {
          text: "NO",
          onPress: () => null,
          style: "NO",
        },
        { text: "YES", onPress: () => updateUserNameAndEmailHandler() },
      ]
    );
  }

  const updateUserNameValidationHandler = async () => {
    if (userName != userData?.username) {
      const result = await dispatch(
        updateUserNameValidation({ userName: userName })
      );
      setUserNameValid(result?.payload?.valid);
      if (result?.payload?.valid) {
        emptyCart();
      }
      return;
    } else {
      updateUserNameAndEmailHandler();
    }
  };

  const resetHandler = () => {
    dispatch(removeUrls());
  };

  useEffect(() => {
    if (changeUserPasswordData?.validations?.length > 0) {
      if (changeUserPasswordData?.validations[0]?.level === "ERROR") {
        Alert.alert(
          "ERROR",
          `${changeUserPasswordData?.validations[0]?.message}`,
          [{ text: "OK", onPress: () => resetHandler() }]
        );
      }
    }
    if (changeUserPasswordData === "success") {
      Alert.alert("SUCCESS", "Password Changed Successfully.", [
        { text: "OK", onPress: () => resetHandler() },
      ]);
    }
  }, [changeUserPasswordData]);

  const confirmPasswordHandler = (password) => {
    setConfirmPassword(password);
    setNullValue(false);
    setError(false);
    setStrongConfirmPasswordError(false);
    setStrongPasswordError(false);
  };

  const newPasswordHandler = (password) => {
    setNewPassword(password);
    setNullValue(false);
    setError(false);
    setStrongConfirmPasswordError(false);
    setStrongPasswordError(false);
  };

  const currentPasswordHandler = (password) => {
    setCurrentPassword(password);
    setNullValue(false);
    setError(false);
    setStrongConfirmPasswordError(false);
    setStrongPasswordError(false);
  };

  return (
    <SafeAreaView style={styles.safeAreaView} edges={["right", "left", "top"]}>
      <View style={{ flex: 1, backgroundColor: "#fff" }}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.AccountBox}>
            <View style={styles.AccountBoxTobBar}>
              <Image source={ACCOUNT_IMAGE} style={styles.accountImage} />
            </View>
            <Text style={styles.AccountTextName}>
              {userData?.selectedAccount?.id} |{" "}
              {userData?.selectedAccount?.name}
            </Text>
          </View>
          {loading && <Loader top="-600" />}

          <View style={loading ? styles.mainBoxLoading : styles.mainBox}>
            <View style={styles.AccountBorder} />

            <View style={styles.ChangeUserBottomBorder}>
              <Text style={styles.AccountHeadingText}>
                Change Username / Email
              </Text>
            </View>
            {emailAndNameError ? (
              <View style={styles.errorView}>
                <Image
                  style={{ height: 19, width: 18 }}
                  source={ERROR_ALERT_IMAGE}
                />
                <Text style={styles.AccountDetailsText}>
                  Something Went wrong. Please try again!
                </Text>
              </View>
            ) : null}
            <View style={{ paddingHorizontal: 10 }}>
              <Text style={styles.labelContainer}>USERNAME*</Text>

              <View style={styles.inputView}>
                <TextInput
                  style={styles.TextInput}
                  placeholderTextColor="#494c4c"
                  value={userName}
                  onChangeText={(value) => userNameTextHandler(value)}
                />
              </View>

              {!isValidUserName ? (
                <View style={styles.errorView}>
                  <Image
                    style={{ height: 19, width: 18 }}
                    source={ERROR_ALERT_IMAGE}
                  />
                  <Text style={styles.AccountDetailsText}>
                    Username already exists. Please try again.
                  </Text>
                </View>
              ) : null}
              {nameError ? (
                <View style={styles.errorView}>
                  <Image
                    style={{ height: 19, width: 18 }}
                    source={ERROR_ALERT_IMAGE}
                  />
                  <Text style={styles.AccountDetailsText}>
                    Please enter the userName.
                  </Text>
                </View>
              ) : null}
              <Text style={styles.labelContainer}>EMAIL ADDRESS*</Text>
              <View style={[styles.inputView, styles.AccountBottom]}>
                <TextInput
                  style={[styles.TextInput]}
                  placeholderTextColor="#494c4c"
                  value={email}
                  onChangeText={(value) => emailChangeHandler(value)}
                />
              </View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <View style={{ flexDirection: "row" }}>
                  <MyCheckbox
                    style={styles.checkbox}
                    checked={isChecked === "false" ? false : true}
                    onChange={checkHandler}
                    onPress={() => {
                      myCheckHandler();
                    }}
                    buttonStyle={styles.checkboxBase}
                    activeButtonStyle={[
                      isChecked ? styles.checkboxChecked : "",
                    ]}
                  />
                  <View
                    style={{
                      justifyContent: "center",
                      alignItems: "center",
                      marginLeft: 10,
                    }}
                  >
                    <Text style={styles.BlackTextColor}>
                      Receive marketings emails
                    </Text>
                  </View>
                </View>
                <Pressable
                  style={styles.AccountUpdateButton}
                  android_ripple={{ color: "#ccc" }}
                  onPress={() => updateUserNameValidationHandler()}
                  disabled={disabled}
                >
                  <View>
                    <Text style={styles.emptyText}>UPDATE</Text>
                  </View>
                </Pressable>
              </View>
            </View>
            <View style={styles.AccountBorderBox} />

            <View style={styles.AccountBoxHeadingText}>
              <Text style={styles.AccountHeadingText}>Change Password</Text>
            </View>
            <View style={{ padding: 10 }}>
              <Text style={styles.labelContainer}>CURRENT PASSWORD*</Text>
              <InputComponent
                onChangeText={(password) => currentPasswordHandler(password)}
              />
              {error ? (
                <View style={styles.errorView}>
                  <Image
                    style={{ height: 19, width: 18 }}
                    source={ERROR_ALERT_IMAGE}
                  />
                  <Text style={styles.AccountDetailsText}>
                    Passwords do not match.
                  </Text>
                </View>
              ) : null}
              {nullValue ? (
                <View style={styles.errorView}>
                  <Image
                    style={{ height: 19, width: 18 }}
                    source={ERROR_ALERT_IMAGE}
                  />
                  <Text style={styles.AccountDetailsText}>
                    Fields Cannot Be Empty!!
                  </Text>
                </View>
              ) : null}

              <Text style={styles.labelContainer}>NEW PASSWORD*</Text>
              <InputComponent
                onChangeText={(password) => newPasswordHandler(password)}
              />
              {strongPasswordError ? (
                <View style={styles.errorView}>
                  <Image
                    style={{ height: 19, width: 18 }}
                    source={ERROR_ALERT_IMAGE}
                  />
                  <Text style={styles.AccountDetailsText}>
                    Strong password is required.
                  </Text>
                </View>
              ) : null}
              {error ? (
                <View style={styles.errorView}>
                  <Image
                    style={{ height: 19, width: 18 }}
                    source={ERROR_ALERT_IMAGE}
                  />
                  <Text style={styles.AccountDetailsText}>
                    Passwords do not match.
                  </Text>
                </View>
              ) : null}
              {nullValue ? (
                <View style={styles.errorView}>
                  <Image
                    style={{ height: 19, width: 18 }}
                    source={ERROR_ALERT_IMAGE}
                  />
                  <Text style={styles.AccountDetailsText}>
                    Fields Cannot Be Empty!!
                  </Text>
                </View>
              ) : null}
              <Text style={styles.labelContainer}>CONFIRM PASSWORD*</Text>
              <InputComponent
                onChangeText={(password) => confirmPasswordHandler(password)}
              />
              {strongConfirmPasswordError ? (
                <View style={styles.errorView}>
                  <Image
                    style={{ height: 19, width: 18 }}
                    source={ERROR_ALERT_IMAGE}
                  />
                  <Text style={styles.AccountDetailsText}>
                    Strong password is required.
                  </Text>
                </View>
              ) : null}
              {error ? (
                <View style={styles.errorView}>
                  <Image
                    style={{ height: 19, width: 18 }}
                    source={ERROR_ALERT_IMAGE}
                  />
                  <Text style={styles.AccountDetailsText}>
                    Passwords do not match.
                  </Text>
                </View>
              ) : null}
              {nullValue ? (
                <View style={styles.errorView}>
                  <Image
                    style={{ height: 19, width: 18 }}
                    source={ERROR_ALERT_IMAGE}
                  />
                  <Text style={styles.AccountDetailsText}>
                    Fields Cannot Be Empty!!
                  </Text>
                </View>
              ) : null}

              {/* {passwordErrorMessage ? (
                <View style={styles.errorView}>
                  <Image
                    style={{ height: 19, width: 18 }}
                    source={ERROR_ALERT_IMAGE}
                  />
                  <Text style={styles.AccountDetailsText}>
                    {changeUserPasswordData?.validations[0]?.message}
                  </Text>
                </View>
              ) : null} */}
              <Pressable
                style={[styles.AccountUpdateButton, styles.AccountUpdate]}
                android_ripple={{ color: "#ccc" }}
                onPress={() => updatePasswordHandler()}
              >
                <View>
                  <Text style={styles.emptyText}>UPDATE</Text>
                </View>
              </Pressable>
              <View style={styles.AccountBorderBox} />
            </View>

            <View style={styles.AccountBoxHeadingText}>
              <Text style={styles.AccountHeadingText}>Account</Text>
            </View>
            <View style={{ padding: 10 }}>
              <View style={{ flexDirection: "row" }}>
                <Text style={styles.BlackTextColor}>Account Number:</Text>
                <Text style={styles.AccountDetialsValueText}>
                  {userData?.selectedAccount?.id}
                </Text>
              </View>
              <View style={{ flexDirection: "row", marginTop: 5 }}>
                <Text style={styles.BlackTextColor}>
                  Billing Account Number:
                </Text>
                <Text style={styles.AccountDetialsValueText}>
                  {userData?.selectedAccount?.jdeNumber}
                </Text>
              </View>
              <View style={{ flexDirection: "row", marginTop: 5 }}>
                <Text style={styles.BlackTextColor}>DEA Number:</Text>
                <Text style={styles.AccountDetialsValueText}>
                  {userData?.selectedAccount?.deaNumber}
                </Text>
              </View>
              <View style={{ flexDirection: "row", marginTop: 5 }}>
                <Text style={styles.BlackTextColor}>DEA Expiration:</Text>
                <Text style={styles.AccountDetialsValueText}>
                  {Moment(userData?.selectedAccount?.deaExpiration).format(
                    "MM/DD/YYYY hh:mmA"
                  )}
                </Text>
              </View>
              <View style={{ flexDirection: "row", marginTop: 5 }}>
                <Text style={styles.BlackTextColor}>State License:</Text>
                <Text style={styles.AccountDetialsValueText}>
                  {userData?.selectedAccount?.accountDetail?.stateLicense}
                </Text>
              </View>
              <View style={{ flexDirection: "row", marginTop: 5 }}>
                <Text>
                  <Text style={styles.BlackTextColor}>
                    State License Expiration:
                  </Text>
                  <Text style={styles.AccountDetialsValueText}>
                    {Moment(
                      userData?.selectedAccount?.accountDetail
                        ?.stateLicenseExpiration
                    ).format("MM/DD/YYYY hh:mmA")}
                  </Text>
                </Text>
              </View>
              <View style={{ flexDirection: "row", marginTop: 5 }}>
                <Text>
                  <Text style={styles.AccountDetialsValueText}>
                    State Control License:
                  </Text>
                  <Text style={styles.BlackTextColor}>
                    {
                      userData?.selectedAccount?.accountDetail
                        ?.stateControlLicense
                    }
                  </Text>
                </Text>
              </View>
              <View style={{ flexDirection: "row", marginTop: 5 }}>
                <Text>
                  <Text style={styles.BlackTextColor}>
                    State Control License Expiration:
                  </Text>
                  <Text style={styles.AccountDetialsValueText}>
                    {Moment(
                      userData?.selectedAccount?.accountDetail
                        ?.stateControlLicenseExpiration
                    ).format("MM/DD/YYYY hh:mmA")}
                  </Text>
                </Text>
              </View>
              <View style={{ flexDirection: "row", marginTop: 5 }}>
                <Text style={styles.BlackTextColor}>
                  CMEA Certification Date:
                </Text>
                <Text style={styles.AccountDetialsValueText}>
                  {Moment(
                    userData?.selectedAccount?.cmeaCertificationDate
                  ).format("MM/DD/YYYY")}
                </Text>
              </View>
              <View style={{ flexDirection: "row", marginTop: 5 }}>
                <Text>
                  <Text style={styles.BlackTextColor}>
                    CMEA Certification Expiration:
                  </Text>
                  <Text style={styles.AccountDetialsValueText}>
                    {Moment(
                      userData?.selectedAccount?.cmeaCertificationExpiration
                    ).format("MM/DD/YYYY hh:mmA")}
                  </Text>
                </Text>
              </View>
              <View style={{ flexDirection: "row", marginTop: 5 }}>
                <Text style={styles.BlackTextColor}>Sales Rep:</Text>
                <Text style={styles.AccountDetialsValueText}>
                  {userData?.selectedAccount?.accountDetail?.accountRep.name}
                </Text>
              </View>
              <View style={{ flexDirection: "row", marginTop: 5 }}>
                <Text style={styles.BlackTextColor}>Phone:</Text>
                <Text
                  style={{ marginLeft: 5, color: "#006ba6" }}
                  onPress={() => Linking.openURL(`tel:${formattedNumber}`)}
                >
                  {formattedNumber}
                  <Text> EXT: </Text>
                  {
                    userData?.selectedAccount?.accountDetail?.accountRep
                      .extension
                  }
                </Text>
              </View>
              <View style={{ flexDirection: "row", marginTop: 5 }}>
                <Text>
                  <Text style={styles.BlackTextColor}>Sales Rep Email:</Text>
                  <Text
                    onPress={() =>
                      Linking.openURL(
                        `mailto:${userData?.selectedAccount?.accountDetail?.accountRep.salesRepEmail}`
                      )
                    }
                    style={{ marginLeft: 5, color: "#006ba6" }}
                  >
                    {
                      userData?.selectedAccount?.accountDetail?.accountRep
                        .salesRepEmail
                    }
                  </Text>
                </Text>
              </View>
              <View style={{ flexDirection: "row", marginTop: 5 }}>
                <Text style={{ fontSize: 10, color: "#494c4c" }}>
                  For changes to your account information, please call your
                  Sales Rep
                </Text>
              </View>
            </View>
            <View style={styles.AccountBorderBox} />
            <View style={styles.AccountBoxHeadingText}>
              <Text style={styles.AccountHeadingText}>Location</Text>
            </View>
            <View style={{ padding: 10 }}>
              <View style={{ flexDirection: "row", marginTop: 5 }}>
                <Text style={styles.BlackTextColor}>
                  {userData?.selectedAccount?.addresses[0]?.companyName}
                </Text>
              </View>
              <View style={{ flexDirection: "row", marginTop: 5 }}>
                <Text style={styles.BlackTextColor}>
                  {userData?.selectedAccount?.addresses[0]?.addressLine1}
                </Text>
              </View>
              <View style={{ flexDirection: "row", marginTop: 5 }}>
                <Text style={styles.BlackTextColor}>
                  {userData?.selectedAccount?.addresses[0]?.addressLine2}
                </Text>
              </View>
              <View style={{ flexDirection: "row", marginTop: 5 }}>
                <Text style={styles.BlackTextColor}>
                  {userData?.selectedAccount?.addresses[0]?.city},{" "}
                  {
                    userData?.selectedAccount?.addresses[0]?.countrySubdivision
                      ?.abbreviation
                  }{" "}
                  {userData?.selectedAccount?.addresses[0]?.postalCode}
                </Text>
              </View>
              <View style={{ marginTop: 5 }}>
                <View style={{ flexDirection: "row", marginTop: 5 }}>
                  <Text style={styles.BlackTextColor}>Phone:</Text>
                  <Text
                    onPress={() => Linking.openURL(`tel:${phoneNumber}`)}
                    style={{ marginLeft: 5, color: "#006ba6" }}
                  >
                    {phoneNumber}
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    marginTop: 5,
                  }}
                >
                  <Text style={styles.BlackTextColor}>Phone:</Text>

                  <Text
                    onPress={() => Linking.openURL(`tel:${phoneFaxNumber}`)}
                    style={{ marginLeft: 5, color: "#006ba6" }}
                  >
                    {phoneFaxNumber}
                  </Text>
                </View>
              </View>
            </View>
            {cmeaExp ? (
              <View
                style={{
                  flexDirection: "row",
                  paddingHorizontal: 5,
                  alignItems: "center",
                }}
              >
                <Text>
                  <View style={{ flexDirection: "row" }}>
                    <Image
                      source={ALERT_IMAGE}
                      style={{
                        width: 15,
                        height: 15,
                        marginTop: 5,
                      }}
                    />
                    <Text
                      style={{
                        fontSize: 12,
                        color: "#ed8b00",
                        margin: 5,
                      }}
                    >
                      Your CMEA certificate{" "}
                      {cmeaExpirationDays >= 0 ? "is expiring" : "has expired"}
                      .CMEA certification is required to purchase scheduled
                      listed chemical products.&nbsp; For further information,
                      please click
                      <Text
                        style={{ color: "#006ba6" }}
                        onPress={() =>
                          Linking.openURL(
                            "https://www.deadiversion.usdoj.gov/meth/index.html#self_cert"
                          )
                        }
                      >
                        {" "}
                        here
                      </Text>
                      , or contact your sales representative.
                    </Text>
                  </View>
                </Text>
              </View>
            ) : null}
          </View>
        </ScrollView>
        <View style={{ left: 0, right: 0, bottom: 0 }}>
          <TabBar />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Account;
