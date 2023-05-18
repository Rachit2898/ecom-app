//FAQ Screen which has the functionality and content of related to Faqs

import { StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import React, { useState, useEffect } from "react";
import TabBar from "../components/TabBar";
import WebView from "react-native-webview";
import { getToken } from "../utility/utils";
import Loader from "../components/Loader";
import getEnvVars from "../config/enviroment";

const OpeningAccount = () => {
  const [token, setToken] = useState("");
  const [visible, setVisible] = useState(false);
  const { apiUrl } = getEnvVars();
  useEffect(() => {
    async function token() {
      const tokenValue = await getToken();
      setToken(tokenValue);
    }
    token();
  }, []);

  return (
    <SafeAreaView
      style={{ backgroundColor: "#fff", flex: 1 }}
      edges={["right", "left"]}
    >
      <View style={{ flex: 1 }}>
        <WebView
          source={{
            uri: `${apiUrl}/cross-app/login?token=${token}&targetUrl=content/help/opening-account&embeddedView=true`,
          }}
          onLoadStart={() => {
            setVisible(true);
          }}
          onLoad={() => {
            setVisible(false);
          }}
        />
        {visible ? (
          <View style={{ flex: 50 }}>
            <Loader />
          </View>
        ) : null}
        <View style={{ left: 0, right: 0, bottom: 0 }}>
          <TabBar />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default OpeningAccount;

const styles = StyleSheet.create({
  prductListBlue: {
    backgroundColor: "#006ba6",
    height: 30,
    marginBottom: 10,
    justifyContent: "center",
  },
  productText: {
    color: "#fff",
    alignItems: "center",
    textAlign: "center",
    fontWeight: "800",
  },
});
