//This is navigation file where we are handling all routes.

import React, { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useSelector } from "react-redux";
import Cart from "./screens/Cart";
import CheckOut from "./screens/CheckOut";
import LoginScreen from "./screens/Login";
import DashBoard from "./screens/DashBoard";
import SubmitCart from "./screens/SubmitCart";
import Account from "./screens/Account";
import Products from "./components/ProductScreenComponent";
import ProductDetails from "./screens/ProductDetails";
import SearchProduct from "./components/SearchProduct";
import OrderingOptions from "./screens/OrderingAndOptions.js";
import OpeningAccount from "./screens/OpeningAccount.js";
import PaymentOptions from "./screens/Payment.js";
import ReturnPolicy from "./screens/ReturnPolicy.js";
import Settings from "./screens/Settings";
import FingerPrint from "./screens/FingerPrints";
import Spinner from "./components/Spinner";
import TabBar from "./components/TabBar";
import OrderHistory from "./components/OrderHistory";
import Faq from "./screens/Faq.js";
import Barcode from "./screens/Barcode";
import VerifyEmail from "./screens/VerifyEmail";
import ForgotPassword from "./screens/ForgotPassword";
import ResetPassword from "./screens/ResetPassword";
import ForgotUser from "./screens/ForgotUser";
import SignUpAccess from "./screens/SignupAccess";
import MenuBar from "./components/MenuBar";
import _ from "lodash";
import { getBioMetricsDetails, getToken } from "./utility/utils";
import OrderDetails from "./screens/OrderDetails";

const Stack = createNativeStackNavigator();

//Once user is logout the user will get the screens from here
function LogOutStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        animation: "none",

        headerStyle: { backgroundColor: "white" },
        headerTintColor: "white",
        contentStyle: { backgroundColor: "white" },
      }}
    >
      <Stack.Screen
        name="Login"
        screenOptions={{
          backgroundColor: "white",
        }}
        options={{
          headerShown: false,
        }}
        component={LoginScreen}
      />
      <Stack.Screen
        name="ForgotPassword"
        screenOptions={{
          backgroundColor: "white",
        }}
        options={{
          headerShown: true,
          title: null,
          headerStyle: {
            backgroundColor: "#063e63",
          },
        }}
        component={ForgotPassword}
      />
      <Stack.Screen
        name="ForgotUser"
        screenOptions={{
          backgroundColor: "white",
        }}
        options={{
          headerShown: true,
          title: null,
          headerStyle: {
            backgroundColor: "#063e63",
          },
          headerTintColor: "#fff",
        }}
        component={ForgotUser}
      />

      <Stack.Screen
        name="ResetPassword"
        screenOptions={{
          backgroundColor: "white",
        }}
        options={{
          headerShown: true,
          title: null,
          headerStyle: {
            backgroundColor: "#063e63",
          },
          headerTintColor: "#fff",
        }}
        component={ResetPassword}
      />
      <Stack.Screen
        name="SignUpAccess"
        screenOptions={{
          backgroundColor: "white",
        }}
        options={{
          headerShown: true,
          title: null,
          headerStyle: {
            backgroundColor: "#063e63",
          },
          headerTintColor: "#fff",
        }}
        component={SignUpAccess}
      />
    </Stack.Navigator>
  );
}

//Once user is login the user will get the screens from here
function AuthenticatedStack() {
  return (
    <>
      <Stack.Navigator
        initialRouteName={"DashBoard"}
        screenOptions={{ animation: "none" }}
      >
        <>
          <Stack.Screen
            name="Spinner"
            component={Spinner}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="DashBoard"
            component={DashBoard}
            options={{
              headerShown: false,
            }}
          />

          <Stack.Screen
            name="Products"
            component={Products}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="SubmitCart"
            component={SubmitCart}
            options={{
              headerShown: true,
              title: null,
              headerStyle: {
                backgroundColor: "#063e63",
              },
              headerTintColor: "#fff",
            }}
          />
          <Stack.Screen
            name="CheckOut"
            component={CheckOut}
            options={{
              headerShown: false,
            }}
          />

          <Stack.Screen
            name="ProductDetails"
            component={ProductDetails}
            options={{
              headerShown: true,
              title: null,
              headerStyle: {
                backgroundColor: "#063e63",
              },
              headerTintColor: "#fff",
            }}
          />
          <Stack.Screen
            name="SearchProduct"
            component={SearchProduct}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="Barcode"
            component={Barcode}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="OrderingOptions"
            component={OrderingOptions}
            options={{
              headerShown: true,
              title: "Ordering Options and Hours",
              headerStyle: {
                backgroundColor: "#063e63",
              },
              headerTintColor: "#fff",
            }}
          />
          <Stack.Screen
            name="OpeningAccount"
            component={OpeningAccount}
            options={{
              headerShown: true,
              title: "Opening an Account",
              headerStyle: {
                backgroundColor: "#063e63",
              },
              headerTintColor: "#fff",
            }}
          />
          <Stack.Screen
            name="Payment"
            component={PaymentOptions}
            options={{
              headerShown: true,
              title: "Payment Options",
              headerStyle: {
                backgroundColor: "#063e63",
              },
              headerTintColor: "#fff",
            }}
          />
          <Stack.Screen
            name="ReturnPolicy"
            component={ReturnPolicy}
            options={{
              headerShown: true,
              title: "Return Policy",
              headerStyle: {
                backgroundColor: "#063e63",
              },
              headerTintColor: "#fff",
            }}
          />
          <Stack.Screen
            name="VerifyEmail"
            component={VerifyEmail}
            options={{
              headerShown: true,
              title: null,
              headerStyle: {
                backgroundColor: "#063e63",
              },
              headerTintColor: "#fff",
            }}
          />
          <Stack.Screen
            name="Faq"
            component={Faq}
            options={{
              headerShown: true,
              title: "FAQs",
              headerStyle: {
                backgroundColor: "#063e63",
              },
              headerTintColor: "#fff",
            }}
          />
          <Stack.Screen
            name="Cart"
            component={Cart}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="Settings"
            component={Settings}
            options={{
              headerShown: true,
              title: "Settings",
              headerStyle: {
                backgroundColor: "#063e63",
              },
              headerTintColor: "#fff",
            }}
          />
          <Stack.Screen
            name="TabBar"
            component={TabBar}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="MenuBar"
            component={MenuBar}
            options={{
              headerShown: false,
            }}
          />

          <Stack.Screen
            name="Account"
            component={Account}
            options={{
              headerShown: false,
            }}
          />

          <Stack.Screen
            name="OrderHistory"
            component={OrderHistory}
            options={{
              headerShown: true,
              title: "Order History",
              headerStyle: {
                backgroundColor: "#063e63",
              },
              headerTintColor: "#fff",
            }}
          />
          <Stack.Screen
            name="OrderDetails"
            component={OrderDetails}
            options={{
              headerShown: true,
              title: "Order Details",
              headerStyle: {
                backgroundColor: "#063e63",
              },
              headerTintColor: "#fff",
            }}
          />
        </>
      </Stack.Navigator>
    </>
  );
}

// This stack handles the biometric stacks. if user has enabled the biometric then the value of isFinger will be
// true and user will get BioMetricAuthenticatedStack, which further divided in two parts like fingerprint and AuthenticatedStack
//then fingerPrint screens comes first and then user will authenticate from there then he will get the AuthenticatedStack
function LogInStack() {
  const [isFinger, setFinger] = useState(false);
  const bioMetrics = async () => {
    const bioMetrics = await getBioMetricsDetails();
    setFinger(bioMetrics);
  };
  useEffect(() => {
    bioMetrics();
  }, [isFinger]);

  return (
    <>{isFinger ? <BioMetricAuthenticatedStack /> : <AuthenticatedStack />}</>
  );
}

function BioMetricAuthenticatedStack() {
  const { isFinger } = useSelector((state) => ({
    ...state.auth,
  }));
  return <>{isFinger ? <AuthenticatedStack /> : <FingerPrint />}</>;
}

export default function Navigation() {
  const { isAuthenticated } = useSelector((state) => ({
    ...state.auth,
  }));

  const { loading, addLoading } = useSelector((state) => ({
    ...state.products,
  }));

  return (
    <NavigationContainer>
      {isAuthenticated ? <LogInStack /> : <LogOutStack />}
    </NavigationContainer>
  );
}
