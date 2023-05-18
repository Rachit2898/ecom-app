//This is AlertBox Components Which comes on DashBoard Screen

import { Text, View, Image, Linking } from "react-native";
import { useNavigation } from "@react-navigation/native";
import React, { useState, useEffect } from "react";
import getEnvVars from "../config/enviroment";
import { showAlert } from "../redux/features/authUser";
import { useDispatch, useSelector } from "react-redux";

const MessageComponent = (props) => {
  const navigation = useNavigation();
  const { ALERT_IMAGE } = getEnvVars();

  if (!!props)
    return (
      <View
        style={{
          flexDirection: "row",
          paddingHorizontal: 5,
          justifyContent: "center",
          alignSelf: "center",
          alignItems: "center",
        }}
      >
        <View
          style={{
            flex: 1,
            width: "100%",
            alignItems: "center",
            textAlign: "center",
            flexDirection: "row",
            alignSelf: "center",
          }}
        >
          <Image
            source={ALERT_IMAGE}
            style={{
              width: 15,
              height: 15,
              justifyContent: "center",
              alignItems: "center",
            }}
          />

          <Text
            style={{
              fontSize: 12,
              color: "#494c4c",
              justifyContent: "center",
            }}
          >
            {props.message}
            {props.command ? (
              <Text
                onPress={() =>
                  Linking.openURL(
                    "https://www.deadiversion.usdoj.gov/meth/index.html#self_cert"
                  )
                }
                style={{
                  color: "#ed8b00",
                  fontSize: 12,
                  textAlign: "center",
                }}
              >
                {props.command}
              </Text>
            ) : null}
            {props.verify ? (
              <Text
                onPress={() => navigation.navigate("VerifyEmail")}
                style={{
                  color: "#ed8b00",
                  fontSize: 12,
                  textAlign: "center",
                }}
              >
                {props.verify}
              </Text>
            ) : null}
          </Text>
        </View>
      </View>
    );
};
const AccountAlertComponent = (props) => {
  const isMobile = true;
  const dispatch = useDispatch();
  const [license, setLicense] = useState(false);
  const [licenseType, setLicenseType] = useState();
  const [unsignedOrder, setUnsignedOrder] = useState(false);
  const [emailVerification, setEmailVerification] = useState(false);
  const [shipStatus, setShipStatus] = useState(false);
  const [approvedRestock, setApprovedRestock] = useState(false);
  const [approvedReturnNotShipped, setApprovedReturnNotShipped] =
    useState(false);
  const [openRecallNotifications, setOpenRecallNotifications] = useState(false);
  const [expiringCSOSCertificate, setExpiringCSOSCertificate] = useState(false);
  const [rebates, setRebates] = useState(false);
  const [expiringCMEACertificate, setExpiringCMEACertificate] = useState(false);

  const ALERT_TYPES = {
    EMAIL_VERIFICATION: "emailVerification",
    EXPIRING_DEA_LICENSE: "expiringDeaLicense",
    EXPIRING_STATE_LICENSE: "expiringStateLicense",
    EXPIRING_STATE_CONTROL_LICENSE: "expiringStateControlLicense",
    EXPIRING_CMEA_CERTIFICATE: "expiringCmeaCertificate",
    EXPIRING_CSOS_CERTIFICATE: "expiringCsosCertificate",
    UNSIGNED_ORDER: "unsignedOrders",
    REBATES: "rebates",
    NO_SHIP_ACCOUNT_STATUS: "noShipAccountStatus",
    OPEN_RECALL_NOTIFICATIONS: "numberOfOpenRecallNotifications",
    APPROVED_RETURN_NOT_SHIPPED: "approvedReturnsNotShipped",
    APPROVED_RESTOCK_RETURN_NOT_SHIPPED: "approvedRestockReturnNotShipped",
  };

  function getDaysUntilExpirationString(numDays) {
    if (numDays === 0) {
      return "today";
    }
    return `in ${numDays} day${numDays === 1 ? "" : "s"}`;
  }

  useEffect(() => {
    const loadData = async () => {
      if (props.type === ALERT_TYPES.EMAIL_VERIFICATION) {
        setEmailVerification(true);
        dispatch(showAlert(true));
      } else if (props.type === ALERT_TYPES.NO_SHIP_ACCOUNT_STATUS) {
        setShipStatus(true);
        dispatch(showAlert(true));
      } else if (
        props.type === ALERT_TYPES.APPROVED_RESTOCK_RETURN_NOT_SHIPPED &&
        !isMobile
      ) {
        setApprovedRestock(true);
        dispatch(showAlert(false));
      } else if (
        props.type === ALERT_TYPES.APPROVED_RETURN_NOT_SHIPPED &&
        !isMobile
      ) {
        setApprovedReturnNotShipped(true);
        dispatch(showAlert(false));
      } else if (
        props.type === ALERT_TYPES.OPEN_RECALL_NOTIFICATIONS &&
        !isMobile
      ) {
        setOpenRecallNotifications(true);
        dispatch(showAlert(false));
      } else if (
        props.type === ALERT_TYPES.EXPIRING_DEA_LICENSE ||
        props.type === ALERT_TYPES.EXPIRING_STATE_LICENSE ||
        props.type === ALERT_TYPES.EXPIRING_STATE_CONTROL_LICENSE
      ) {
        if (props.type === ALERT_TYPES.EXPIRING_DEA_LICENSE) {
          setLicenseType("DEA");
          dispatch(showAlert(true));
        } else if (props.type === ALERT_TYPES.EXPIRING_STATE_LICENSE) {
          setLicenseType("state");
          dispatch(showAlert(true));
        } else {
          setLicenseType("state control");
          dispatch(showAlert(true));
        }

        setLicense(true);
      } else if (props.type === ALERT_TYPES.UNSIGNED_ORDER && !isMobile) {
        setUnsignedOrder(true);
      } else if (
        props.type === ALERT_TYPES.EXPIRING_CSOS_CERTIFICATE &&
        !isMobile
      ) {
        setExpiringCSOSCertificate(true);
        dispatch(showAlert(false));
      } else if (props.type === ALERT_TYPES.REBATES && !isMobile) {
        setRebates(true);
        dispatch(showAlert(true));
      } else if (props.type === ALERT_TYPES.EXPIRING_CMEA_CERTIFICATE) {
        setExpiringCMEACertificate(true);
        dispatch(showAlert(true));
      } else {
        return null;
      }
    };

    loadData();
  }, [props.daysUntilExpired]);

  return (
    <>
      <View style={{}}>
        <View style={{ paddingHorizontal: 5 }}>
          {emailVerification ? (
            <MessageComponent
              message={"Your email address has not been verified."}
              verify={"Verify"}
            />
          ) : null}
          {approvedRestock ? (
            <View>
              {props.numberOfReturns > 1 ? (
                <MessageComponent
                  message={`You have ${
                    props.numberOfReturns
                  } return requests that should be returned by ${moment
                    .tz(props.returnByDate, moment.tz.guess())
                    .format("MMMM DD, YYYY")}{" "}`}
                />
              ) : (
                <MessageComponent
                  message={`You have 1 return requests that should be returned by ${moment
                    .tz(props.returnByDate, moment.tz.guess())
                    .format("MMMM DD, YYYY")}{" "}`}
                />
              )}
            </View>
          ) : null}
          {approvedReturnNotShipped ? (
            <View>
              {props.approvedReturnsNotShipped > 1 ? (
                <MessageComponent
                  message={`You have ${props.approvedReturnsNotShipped} return requests that are approved pending shipment `}
                />
              ) : (
                <MessageComponent
                  message={`You have a ${props.approvedReturnsNotShipped} return requests that are approved pending shipment `}
                />
              )}
            </View>
          ) : null}

          {openRecallNotifications ? (
            <MessageComponent
              message={`You have ${props.numberOfRecallNotifications} pending recall notifications `}
              command={"Respond"}
            />
          ) : null}

          {expiringCSOSCertificate ? (
            <MessageComponent
              message={`You have (${props.certificatesExpired}) CSOS Certificate(s) close to
          expiring.`}
              command={"View"}
            />
          ) : null}
          {shipStatus ? (
            <MessageComponent message={"This account has a no ship status."} />
          ) : null}
          {license ? (
            <MessageComponent
              message={`Your ${licenseType} license ${
                props.expired
                  ? "is expired."
                  : `expires ${getDaysUntilExpirationString(
                      props.daysUntilExpired
                    )}.`
              }`}
              command={"View"}
            />
          ) : null}

          {unsignedOrder ? (
            <MessageComponent
              message={`You have (${props.numOrders}) unsigned CII orders.`}
              command={"View"}
            />
          ) : null}

          {rebates ? (
            <MessageComponent
              message={`You're only away from increasing your ${props.rebateType} to ${props.upcomingRebateAmount}`}
              command={"Rebate Details"}
            />
          ) : null}
          {expiringCMEACertificate ? (
            <MessageComponent
              message={`Your CMEA certificate expires ${getDaysUntilExpirationString(
                props.daysUntilExpired
              )} Click here, or contact your sales representative for details.`}
              command={"Rebate Details"}
            />
          ) : null}
        </View>
      </View>
    </>
  );
};

export default AccountAlertComponent;
