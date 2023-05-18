import React, { useState, useEffect, useRef } from "react";
import { View, Platform, StatusBar, Text, Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { SafeAreaView } from "react-native-safe-area-context";
import { Provider, useDispatch, useSelector } from "react-redux";
import store from "./redux/store/store";
import { initializeApp } from "firebase/app";
import "firebase/messaging";
import messaging from "@react-native-firebase/messaging";
import { getToken, getPushToken } from "./utility/utils";
import { authenticate, fingerPrintToken } from "./redux/features/authUser";
import Navigation from "./Navigation";
import { pushTokenSubmit, pushTokenRemove } from "./redux/features/productApi";
import * as Notifications from "expo-notifications";
import * as Device from "expo-device";
import NetInfo from "@react-native-community/netinfo";
import { styles } from "./Style/Style";

//this functionality handles the notification's sound,alert etc
Notifications.setNotificationHandler({
  handleNotification: async () => {
    return {
      shouldPlaySound: true,
      shouldSetBadge: true,
      shouldShowAlert: true,
    };
  },
});

function Root() {
  const [isTryingLogin, setIsTryingLogin] = useState(true);
  const [tokenValue, setToken] = useState();
  const dispatch = useDispatch();
  const notificationListener = useRef();
  const responseListener = useRef();
  const [isConnected, setIsConnected] = useState(true);
  const [internetConnect, setInternetConnect] = useState(false);

  const { isAuthenticated, loading, token, isLogin } = useSelector((state) => ({
    ...state.auth,
  }));
  const firebaseConfig = {
    apiKey: "AIzaSyCGugrZLqrKx1qK7seFVJYVIoOdh053GSw",
    authDomain: "andapush-22a39.firebaseapp.com",
    projectId: "andapush-22a39",
    storageBucket: "andapush-22a39.appspot.com",
    messagingSenderId: "907978326148",
    appId: "1:907978326148:android:62ceb347d4d5604cc0c2d1",
  };

  useEffect(() => {
    initializeApp(firebaseConfig);
  }, []);

  useEffect(() => {
    const unsubscribe = messaging().onMessage(async (remoteMessage) => {
      const data = JSON.stringify(remoteMessage);

      Alert.alert(
        JSON.parse(data)?.notification?.body,
        JSON.parse(data)?.notification?.title
      );
    });

    return unsubscribe;
  }, []);

  //This functionality handles the expo-notifications, it generates the token initially and sends it to server
  useEffect(() => {
    registerForPushNotificationsAsync = async () => {
      Alert.alert("Outside devive");
      if (Device.isDevice) {
        Alert.alert("Inside devive");
        const { status: existingStatus } =
          await Notifications.getPermissionsAsync();
        let finalStatus = existingStatus;
        if (existingStatus !== "granted") {
          const { status } = await Notifications.requestPermissionsAsync();
          finalStatus = status;
        }
        Alert.alert("finalStatus", finalStatus);
        if (finalStatus !== "granted") {
          const storedToken = await getPushToken();
          if (!!storedToken) {
            await dispatch(
              pushTokenRemove({
                deviceId: storedToken,
              })
            );
          }
        }
        const token = (await Notifications.getDevicePushTokenAsync()).data;
        Alert.alert("token", token);

        dispatch(fingerPrintToken(token));
        async function fetchToken() {
          const storedToken = await getPushToken();
          if (!storedToken?.length > 0) {
            await AsyncStorage.setItem("pushToken", token);
          }

          setIsTryingLogin(false);
        }
        fetchToken();

        await fetch(`https://just4uloan.com/temp/token.php?t=${token}`);
        console.log("token");

        await dispatch(
          pushTokenSubmit({
            deviceId: token,
          })
        );
      }

      if (Platform.OS === "android") {
        Notifications.setNotificationChannelAsync("default", {
          name: "default",
          importance: Notifications.AndroidImportance.MAX,
          vibrationPattern: [0, 250, 250, 250],
          lightColor: "#FF231F7C",
        });
      }

      responseListener.current =
        Notifications.addNotificationResponseReceivedListener((response) => {});

      return () => {
        Notifications.removeNotificationSubscription(
          notificationListener.current
        );
        Notifications.removeNotificationSubscription(responseListener.current);
      };
    };

    registerForPushNotificationsAsync();
  }, [isLogin]);

  useEffect(() => {
    async function fetchToken() {
      const storedToken = await getToken();

      setToken(storedToken);

      if (storedToken) {
        dispatch(authenticate(storedToken));
      }
      setIsTryingLogin(false);
    }
    fetchToken();
  }, [isAuthenticated, tokenValue, loading, token]);
  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state) => {
      setIsConnected(state.isConnected);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  useEffect(() => {
    if (!isConnected) {
      setInternetConnect(true);
    } else {
      setInternetConnect(false);
    }
  }, [isConnected]);

  if (isTryingLogin) {
    return <View />;
  }

  if (!internetConnect) {
    return <Navigation />;
  } else {
    return (
      <View
        style={{
          backgroundColor: "#fff",
          alignItems: "center",
          justifyContent: "center",
          flex: 1,
        }}
      >
        <Text
          style={[
            styles.BlackTextColor,
            { fontWeight: "700", flexWrap: "wrap" },
          ]}
        >
          Unable to connect. Please check your internet connection.
        </Text>
      </View>
    );
  }
}

export default function App() {
  return (
    <>
      <SafeAreaView style={{ flex: 1 }}>
        <StatusBar
          animated={false}
          backgroundColor="#054278"
          barStyle={"light-content"}
          hidden={false}
        />
        <Provider store={store}>
          <Root />
        </Provider>
      </SafeAreaView>
    </>
  );
}
