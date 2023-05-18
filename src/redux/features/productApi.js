import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import {
  getToken,
  addItems,
  emptyCart,
  cartValidate,
  checkOutCart,
  deleteItems,
  updateCartItems,
  favorites,
  favoritesRemove,
  productList,
  getPushToken,
} from "../../utility/utils";
import getEnvVars from "../../config/enviroment";
import { URL, URLSearchParams } from "react-native-url-polyfill";

export const productLists = createAsyncThunk("urls/productLists", async () => {
  const result = await productList();
  return result;
});

export const cmsResponse = createAsyncThunk(
  "urls/cmsResponse",
  async (body) => {
    const token = await getToken();
    const pushToken = await getPushToken();
    const credentials = {
      requestContexts: [
        {
          contentRequest: {
            tagAttributes: {},
            tagName: "App Secure Home Top Zone",
          },
          pathUrl: "/account/home",
        },
        {
          contentRequest: {
            tagAttributes: {},
            tagName: "App Secure Home Middle Zone",
          },
          pathUrl: "/account/home",
        },
        {
          contentRequest: {
            tagAttributes: {},
            tagName: "App Secure Home Bottom Zone",
          },
          pathUrl: "/account/home",
        },
      ],
    };
    const { apiUrl } = getEnvVars();

    var url = `${apiUrl}/api/cms/process/json`;
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify(credentials),
    })
      .then((data) => {
        if (data.ok) {
          return data.json();
        }
        return "error";
      })
      .catch((error) => {
        return error;
      });

    const myData = response;

    return myData;
  }
);

export const menuBarScreens = createAsyncThunk(
  "urls/menuBarScreens",
  async () => {
    const token = await getToken();
    const { apiUrl } = getEnvVars();

    var url = `${apiUrl}/api/menu/name?menuName=Anda - Secure App Menu`;

    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    });
    const myData = await response.json();

    return myData;
  }
);
export const updateEmailValidation = createAsyncThunk(
  "urls/updateEmailValidation",
  async (body) => {
    const token = await getToken();

    const credentials = {
      email: body.email,
    };
    const { apiUrl } = getEnvVars();
    var url = `${apiUrl}/api/customer/verify/email`;
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify(credentials),
    })
      .then((data) => {
        if (data.ok) {
          return data.json();
        }
        return "error";
      })
      .catch((error) => {
        return error;
      });

    const myData = response;

    return myData;
  }
);
export const removeItemFromList = createAsyncThunk(
  "urls/removeItemFromList",
  async (body) => {
    const token = await getToken();

    const credentials = {
      items: [
        {
          skuId: body?.id,
          quantity: 0,
        },
      ],
    };
    const { apiUrl } = getEnvVars();
    var url = `${apiUrl}/api/customer/inventory-notification/items`;

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify(credentials),
    })
      .then((data) => {
        if (data.ok) {
          return data.json();
        }
        return "error";
      })
      .catch((error) => {
        return error;
      });

    const myData = response;

    return myData;
  }
);
export const addItemToList = createAsyncThunk(
  "urls/addItemToList",
  async (body) => {
    const token = await getToken();

    const credentials = {
      items: [
        {
          skuId: body?.id,
          quantity: 1,
        },
      ],
    };
    const { apiUrl } = getEnvVars();
    var url = `${apiUrl}/api/customer/inventory-notification/items`;

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify(credentials),
    })
      .then((data) => {
        if (data.ok) {
          return data.json();
        }
        return "error";
      })
      .catch((error) => {
        return error;
      });

    const myData = response;

    return myData;
  }
);
export const verifyToken = createAsyncThunk(
  "urls/verifyToken",
  async (body) => {
    const token = await getToken();
    const pushToken = await getPushToken();
    const credentials = {
      token: body.token,
      tokenReason: "email",
      fingerprint: pushToken,
    };
    const { apiUrl } = getEnvVars();

    var url = `${apiUrl}/api/customer/verify/token`;
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify(credentials),
    })
      .then((data) => {
        if (data.ok) {
          return data.json();
        }
        return "error";
      })
      .catch((error) => {
        return error;
      });

    const myData = response;

    return myData;
  }
);

//https://staging.andanet.com/api/customer/inventory-notification/items
export const updateUserNameValidation = createAsyncThunk(
  "urls/updateUserName",
  async (body) => {
    const token = await getToken();
    const { apiUrl } = getEnvVars();
    const credentials = {
      username: body.userName,
    };
    var url = `${apiUrl}/api/customer/validate/username`;
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify(credentials),
    })
      .then((data) => {
        if (data.ok) {
          return data.json();
        }
        return "error";
      })
      .catch((error) => {
        return error;
      });

    const myData = response;
    return myData;
  }
);
export const updateUserNameAndEmail = createAsyncThunk(
  "urls/updateUserNameAndEmail",
  async (body) => {
    const token = await getToken();
    const { apiUrl } = getEnvVars();
    const bodyfromUser = {
      username: body.userName,
      emailMarketing: body.emailMarketing,
      emailAddress: body.emailAddress,
    };

    function clean(obj) {
      for (var propName in obj) {
        if (obj[propName] === null || obj[propName] === undefined) {
          delete obj[propName];
        }
      }
      return obj;
    }
    const credentials = clean(bodyfromUser);

    var url = `${apiUrl}/api/customer`;
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify(credentials),
    })
      .then((data) => {
        if (data.ok) {
          return data.json();
        }
        return "error";
      })
      .catch((error) => {
        return error;
      });

    const myData = await response;
    return myData;
  }
);

export const addItem = createAsyncThunk("additems", async (body) => {
  const result = await addItems(body);
  return result;
});
export const addFavorites = createAsyncThunk("addFav", async (body) => {
  const result = await favorites(body);
  return result;
});

export const removeFavorites = createAsyncThunk("removeFav", async (body) => {
  const result = await favoritesRemove(body);
  return result;
});
export const cartValidating = createAsyncThunk("cartValidating", async () => {
  const result = await cartValidate();
  return result;
});
export const emptyCartItems = createAsyncThunk("emptyCart", async (body) => {
  const result = await emptyCart(body);
  return result;
});
export const cartCheckOut = createAsyncThunk(
  "cartCheckOut",
  async (orderId) => {
    const result = await checkOutCart(orderId);
    return result;
  }
);
export const deleteItem = createAsyncThunk("deleteitems", async (body) => {
  const result = await deleteItems(body);
  return result;
});
export const updateCartValues = createAsyncThunk(
  "updateCartValue",
  async (body) => {
    const result = await updateCartItems(body);

    return result;
  }
);

export const yourTopPurChase = createAsyncThunk(
  "urls/topPurchase",
  async () => {
    const token = await getToken();
    const result = await productList();
    const { apiUrl } = getEnvVars();

    var url = `${apiUrl}/api/customer/product-list/${result[2]?.id}/search?pageSize=4&availability=Available`;

    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    });
    const myData = await response.json();

    return myData;
  }
);
export const backInStock = createAsyncThunk("urls/backInStock", async () => {
  const token = await getToken();
  const { apiUrl } = getEnvVars();

  var url = `${apiUrl}/api/customer/inventory-notification/inventory-watch/search?pageSize=4&availability=Available`;

  const response = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
  });
  const myData = await response.json();

  return myData;
});

export const customerLikeYou = createAsyncThunk(
  "urls/customerLikeYou",
  async () => {
    const token = await getToken();
    const result = await productList();
    const { apiUrl } = getEnvVars();

    var url = `${apiUrl}/api/customer/product-list/${result[3]?.id}/search?pageSize=4&availability=Available&previouslyPurchased=Not%20Previously%20Purchased`;

    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    });
    const myData = await response.json();
    return myData;
  }
);

export const preNegotiatedItems = createAsyncThunk(
  "urls/preNegotiatedItems",
  async () => {
    const token = await getToken();
    const { apiUrl } = getEnvVars();

    var url = `${apiUrl}/api/customer/upsell/Pre%20Negotiated%20Items?pageSize=4&availability=Available&previouslyPurchased=Previously%20Purchased`;

    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    });
    const myData = await response.json();
    return myData;
  }
);

export const userInfo = createAsyncThunk("urls/userInfo", async () => {
  const token = await getToken();
  const { apiUrl } = getEnvVars();
  var url = `${apiUrl}/api/customer`;
  const response = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
  });
  const myData = await response.json();
  return myData;
});
export const cartInfo = createAsyncThunk("urls/cartInfo", async () => {
  const token = await getToken();
  const { apiUrl } = getEnvVars();
  var url = `${apiUrl}/api/cart`;
  const response = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
  });
  const myData = await response.json();
  return myData;
});

export const checkOutConfirmation = createAsyncThunk(
  "urls/checkoutConfirm",
  async (orderId) => {
    const token = await getToken();
    const { apiUrl } = getEnvVars();
    var url = `${apiUrl}/checkout/confirmation/${orderId}`;

    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    });
    const myData = await response.json();
    return myData;
  }
);

export const andaContractItems = createAsyncThunk(
  "urls/andaContractItems",
  async (body) => {
    function clean(obj) {
      for (var propName in obj) {
        if (obj[propName] === null || obj[propName] === undefined) {
          delete obj[propName];
        }
      }
      return obj;
    }
    const bodyValue = clean(body);

    const token = await getToken();
    const { apiUrl } = getEnvVars();

    var url = body?.targetUrl.includes("?")
      ? `${apiUrl}${body?.targetUrl}${
          bodyValue?.sortValues ? bodyValue?.sortValues : ""
        }&${body?.value}page=${body?.currentPage}`
      : `${apiUrl}${body?.targetUrl}?${
          bodyValue?.sortValues ? bodyValue?.sortValues : ""
        }&${body?.value}page=${body?.currentPage}`;

    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    });
    const myData = await response.json();
    return myData;
  }
);

export const searchProducts = createAsyncThunk(
  "urls/searchProducsts",
  async (body) => {
    function clean(obj) {
      for (var propName in obj) {
        if (obj[propName] === null || obj[propName] === undefined) {
          delete obj[propName];
        }
      }
      return obj;
    }
    const bodyValue = clean(body);
    const token = await getToken();
    const { apiUrl } = getEnvVars();

    if (!!bodyValue?.searchedValue) {
      var url = `${apiUrl}/api/catalog/search?${
        bodyValue?.sortValues ? bodyValue?.sortValues : ""
      }&${bodyValue?.value ? bodyValue?.value : ""}page=${
        bodyValue?.currentPage
      }&q=${bodyValue?.searchedValue}&suggesterUsed=true`;

      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      });

      const myData = await response.json();
      return myData;
    }
  }
);

//https://staging.andanet.com/api/catalog/product/1057393/related

export const productRelated = createAsyncThunk(
  "urls/productRelated",

  async (id) => {
    const token = await getToken();
    const { apiUrl } = getEnvVars();
    var url = `${apiUrl}/api/catalog/product/${id}/related`;

    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    });
    const myData = await response.json();

    return myData;
  }
);

export const productDetails = createAsyncThunk(
  "urls/productDetails",

  async (id) => {
    const token = await getToken();
    const { apiUrl } = getEnvVars();
    var url = `${apiUrl}/api/catalog/sku/${id}`;

    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    });
    const myData = await response.json();

    return myData;
  }
);
export const searchItems = createAsyncThunk(
  "urls/searchItem",
  async (searchItem) => {
    const token = await getToken();
    const { apiUrl } = getEnvVars();
    var url = `${apiUrl}/api/catalog/search/suggest?q=${searchItem}`;
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    });
    const myData = await response.json();
    return myData;
  }
);

export const productHistory = createAsyncThunk(
  "urls/productHistory",
  async (id) => {
    const token = await getToken();
    const { apiUrl } = getEnvVars();
    var url = `${apiUrl}/api/customer/order/history/purchase-history/sku/${id}`;

    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    });
    const myData = await response.json();

    return myData;
  }
);

//https://staging.andanet.com/api/catalog/search?page=1&characteristicFacet=Anda%20Contract&q=*

//

export const accountAlert = createAsyncThunk(
  "urls/accountAlert",
  async (body) => {
    const token = await getToken();
    const { apiUrl } = getEnvVars();
    var url = `${apiUrl}/api/customer/account/alerts`;

    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    });
    const myData = await response.json();
    return myData;
  }
);

export const orderDetails = createAsyncThunk(
  "urls/orderDetails",
  async (id) => {
    const token = await getToken();
    const { apiUrl } = getEnvVars();

    var url = `${apiUrl}/api/order/id/${id}`;

    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    });
    const myData = await response.json();
    return myData;
  }
);

export const orderHistory = createAsyncThunk(
  "urls/orderHistory",
  async (body) => {
    const token = await getToken();
    const { apiUrl } = getEnvVars();

    var url = `${apiUrl}/api/customer/order/history?page=${body?.currentPage}&dateFrom=${body?.startDate}&dateTo=${body?.endDates}&status=${body?.status}&csosOrders=${body?.csosOrders}&q=${body?.searchValue}&searchMode=STANDARD`;

    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    });
    const myData = await response.json();
    return myData;
  }
);

export const orderSearchHistory = createAsyncThunk(
  "urls/orderSearchHistory",
  async (body) => {
    const token = await getToken();
    const { apiUrl } = getEnvVars();
    var url = `${apiUrl}/api/customer/order/item/history?page=${body?.currentPage}&dateTo=${body?.endDates}&csosOrders=${body?.csosOrders}&status=${body?.status}&dateFrom=${body?.startDate}&q=${body?.searchValue}&searchMode=STANDARD`;

    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    });
    const myData = await response.json();
    return myData;
  }
);
export const history = createAsyncThunk("urls/history", async (currentpage) => {
  const token = await getToken();
  const { apiUrl } = getEnvVars();
  var url = `${apiUrl}/api/order/${currentpage}`;

  const response = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
  });

  const myData = await response.json();

  return myData;
});

export const seeRelated = createAsyncThunk(
  "urls/seeRelated",
  async (currentpage) => {
    const token = await getToken();
    const { apiUrl } = getEnvVars();
    var url = `${apiUrl}/api/catalog/search?q=601038`;

    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    });

    const myData = await response.json();

    return myData;
  }
);

export const pushTokenSubmit = createAsyncThunk(
  "urls/pushTokenSubmit",
  async (body) => {
    const token = await getToken();
    const credentials = {
      deviceId: body.deviceId,
    };
    const { apiUrl } = getEnvVars();
    if (!!token) {
      var url = `${apiUrl}/api/notification/subscribe`;
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
        body: JSON.stringify(credentials),
      })
        .then((data) => {
          if (data.ok) {
            return data.json();
          }
          return "error";
        })
        .catch((error) => {
          return error;
        });

      const myData = response;

      return myData;
    }
  }
);

export const pushTokenRemove = createAsyncThunk(
  "urls/pushTokenRemove",
  async (body) => {
    const token = await getToken();
    const credentials = {
      deviceId: body.deviceId,
    };

    const { apiUrl } = getEnvVars();
    if (!!token) {
      var url = `${apiUrl}/api/notification/unsubscribe`;
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
        body: JSON.stringify(credentials),
      })
        .then((data) => {
          if (data.ok) {
            return data.json();
          }
          return "error";
        })
        .catch((error) => {
          return error;
        });

      const myData = response;

      return myData;
    }
  }
);

//

const productSlice = createSlice({
  name: "products",
  initialState: {
    topPurchaseProducts: {},
    customerLikeYouProducts: {},
    preNegotiatedItemsProducts: {},
    cartLength: 0,
    userInfoData: {},
    loading: false,
    cartCheckOutInfo: false,
    cartInfoData: {},
    subtotal: {},
    cartValidateInfo: {},
    checkOutData: {},
    itemLength: 0,
    deleteCart: {},
    productDetailsData: {},
    updateCart: {},
    searchItem: [],
    backInStockData: [],
    searchProducstsData: {},
    andaContractItemsData: {},
    productListsData: {},
    addLoading: false,
    accountAlertData: {},
    orderHistoryData: {},
    isClicked: false,
    orderSearchHistoryData: {},
    historyData: {},
    currentPageValue: 1,
    status: "",
    csosOrders: false,
    favLoading: false,
    startDate: new Date(1577862044),
    endDates: new Date(),
    searchChecked: false,
    updateUserNameValidationData: {},
    updateUserNameAndEmailData: false,
    updateEmailValidationData: {},
    verifyTokenData: {},
    tickLoading: false,
    historyLoading: false,
    seeRelatedData: {},
    searchValue: "",
    addItemData: {},
    orderDetailsData: {},
    productHistoryData: {},
    removeItemFromData: {},
    addItemToListData: {},
    cmsResponseData: {},
    screenName: {},
    targetUrl: {},
    menuBarScreensData: {},
    productRelatedData: {},
    removeFavoritesData: false,
  },
  reducers: {
    updateHistoryFilter: (state, action) => {
      state.currentPageValue = action.payload.currentPageValue;
      state.status = action.payload.status;
      state.csosOrders = action.payload.csosOrders;
      state.startDate = action.payload.startDate;
      state.endDates = action.payload.endDates;
      state.searchValue = action.payload.searchValue;
    },
    resetHistoryFilter: (state, action) => {
      state.currentPageValue = 1;
      state.status = "";
      state.csosOrders = false;
      state.startDate = new Date(1577862044);
      state.endDates = new Date();
      state.searchValue = "";
    },
    paginationValue: (state, action) => {
      state.currentPageValue = action.payload;
    },
    orderLimitReset: (state) => {
      state.addItemData = {};
    },
    resetDataHandler: (state) => {
      state.checkOutData = {};
      state.productDetailsData = {};
      state.searchProducstsData = {};
    },
    setScreenName: (state, action) => {
      state.screenName = action.payload.linkText;
      state.targetUrl = action.payload.targetUrl;
      state.andaContractItemsData = [];
    },
    setScreenMenuBar: (state, action) => {
      state.screenName = action.payload.label;
      state.targetUrl = action.payload.url;
      state.andaContractItemsData = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(productRelated.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(productRelated.fulfilled, (state, action) => {
        state.loading = false;
        state.productRelatedData = action.payload;
      })
      .addCase(productRelated.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(menuBarScreens.pending, (state, action) => {
        state.loading = true;
      })

      .addCase(menuBarScreens.fulfilled, (state, action) => {
        state.loading = false;
        state.menuBarScreensData = action.payload;
      })

      .addCase(menuBarScreens.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(cmsResponse.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(cmsResponse.fulfilled, (state, action) => {
        state.loading = false;
        state.cmsResponseData = action.payload;
      })
      .addCase(cmsResponse.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(removeItemFromList.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(removeItemFromList.fulfilled, (state, action) => {
        state.loading = false;
        state.removeItemFromData = action.payload;
      })
      .addCase(removeItemFromList.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(addItemToList.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(addItemToList.fulfilled, (state, action) => {
        state.loading = false;
        state.addItemToListData = action.payload;
      })
      .addCase(addItemToList.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(productLists.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(productLists.fulfilled, (state, action) => {
        state.loading = false;
        state.productListsData = action.payload;
      })
      .addCase(productLists.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(yourTopPurChase.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(yourTopPurChase.fulfilled, (state, action) => {
        state.loading = false;
        state.topPurchaseProducts = action.payload;
      })
      .addCase(yourTopPurChase.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(backInStock.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(backInStock.fulfilled, (state, action) => {
        state.loading = false;
        state.backInStockData = action.payload;
      })
      .addCase(backInStock.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(customerLikeYou.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(customerLikeYou.fulfilled, (state, action) => {
        state.loading = false;
        state.customerLikeYouProducts = action.payload;
      })
      .addCase(customerLikeYou.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(preNegotiatedItems.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(preNegotiatedItems.fulfilled, (state, action) => {
        state.loading = false;
        state.preNegotiatedItemsProducts = action.payload;
      })
      .addCase(preNegotiatedItems.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(addItem.pending, (state, action) => {
        state.loading = true;
        state.addLoading = true;
        state.tickLoading = false;
      })
      .addCase(addItem.fulfilled, (state, action) => {
        if (!!action.payload?.validations?.length) {
          state.addLoading = false;

          state.addItemData = action.payload;
          state.loading = false;
        } else {
          state.cartLength = action.payload?.order?.orderItems?.length;
          state.addLoading = false;
          state.tickLoading = true;
          state.addItemData = action.payload;
          state.loading = false;
        }
      })
      .addCase(addItem.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.addLoading = false;
        state.tickLoading = false;
      })
      .addCase(userInfo.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(userInfo.fulfilled, (state, action) => {
        state.loading = false;
        state.userInfoData = action.payload;
      })
      .addCase(userInfo.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(cartInfo.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(cartInfo.fulfilled, (state, action) => {
        state.loading = false;
        state.cartInfoData = action.payload;
        state.cartLength = action.payload?.orderItems?.length;
        state.subtotal = action.payload?.subTotal?.amount;
      })
      .addCase(cartInfo.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(emptyCartItems.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(emptyCartItems.fulfilled, (state, action) => {
        state.loading = false;
        state.cartLength = 0;
        state.tickLoading = false;
      })
      .addCase(emptyCartItems.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(cartValidating.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(cartValidating.fulfilled, (state, action) => {
        state.loading = false;
        state.cartValidateInfo = action.payload;
        state.subtotal = action.payload?.order?.subTotal?.amount;
      })
      .addCase(cartValidating.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(cartCheckOut.pending, (state, action) => {
        state.loading = true;
        state.cartCheckOutInfo = false;
      })
      .addCase(cartCheckOut.fulfilled, (state, action) => {
        state.loading = false;
        state.cartCheckOutInfo = true;
        state.cartLength = 0;
        state.tickLoading = false;
        state.itemLength = action.payload?.orderItems?.length;
        state.checkOutData = action.payload;
      })
      .addCase(checkOutConfirmation.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(checkOutConfirmation.fulfilled, (state, action) => {
        state.loading = false;
        state.cartLength = 0;
      })
      .addCase(checkOutConfirmation.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteItem.pending, (state, action) => {
        state.addLoading = true;
      })
      .addCase(deleteItem.fulfilled, (state, action) => {
        state.addLoading = false;
        state.cartLength = action.payload?.order?.orderItems?.length;
        state.deleteCart = action.payload;
        state.tickLoading = false;
      })
      .addCase(deleteItem.rejected, (state, action) => {
        state.addLoading = false;
        state.error = action.payload;
      })
      .addCase(updateCartValues.pending, (state, action) => {
        state.addLoading = true;
      })
      .addCase(updateCartValues.fulfilled, (state, action) => {
        state.addLoading = false;
        state.updateCart = action.payload;
        state.addItemData = action.payload;
      })
      .addCase(updateCartValues.rejected, (state, action) => {
        state.addLoading = false;
        state.error = action.payload;
      })
      .addCase(productDetails.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(productDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.productDetailsData = action.payload;
      })
      .addCase(productDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(searchItems.pending, (state, action) => {
        state.loadingSearch = true;
      })
      .addCase(searchItems.fulfilled, (state, action) => {
        state.loading = false;
        state.searchItem = action.payload;
      })
      .addCase(searchItems.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(searchProducts.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(searchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.searchProducstsData = action.payload;
      })
      .addCase(searchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(andaContractItems.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(andaContractItems.fulfilled, (state, action) => {
        state.loading = false;
        state.andaContractItemsData = action.payload;
      })
      .addCase(andaContractItems.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(addFavorites.pending, (state, action) => {
        state.favLoading = false;
        state.loading = true;
      })
      .addCase(addFavorites.fulfilled, (state, action) => {
        state.favLoading = true;
        state.loading = false;
      })
      .addCase(addFavorites.rejected, (state, action) => {
        state.favLoading = true;
        state.error = action.payload;
        state.loading = false;
      })
      .addCase(removeFavorites.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(removeFavorites.fulfilled, (state, action) => {
        state.loading = false;

        state.removeFavoritesData = true;
      })
      .addCase(removeFavorites.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(accountAlert.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(accountAlert.fulfilled, (state, action) => {
        state.loading = false;
        state.accountAlertData = action.payload;
      })
      .addCase(accountAlert.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(orderHistory.pending, (state, action) => {
        state.historyLoading = true;
      })
      .addCase(orderHistory.fulfilled, (state, action) => {
        state.historyLoading = false;
        state.orderHistoryData = action.payload;
      })
      .addCase(orderHistory.rejected, (state, action) => {
        state.historyLoading = false;
        state.error = action.payload;
      })
      .addCase(orderSearchHistory.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(orderSearchHistory.fulfilled, (state, action) => {
        state.loading = false;
        state.orderSearchHistoryData = action.payload;
      })
      .addCase(orderSearchHistory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(history.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(history.fulfilled, (state, action) => {
        state.loading = false;
        state.historyData = action.payload;
      })
      .addCase(history.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateUserNameValidation.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(updateUserNameValidation.fulfilled, (state, action) => {
        state.loading = false;

        state.updateUserNameValidationData = action.payload?.valid;
      })
      .addCase(updateUserNameValidation.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      //updateUserNameAndEmailApi
      .addCase(updateUserNameAndEmail.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(updateUserNameAndEmail.fulfilled, (state, action) => {
        state.loading = false;
        state.updateUserNameAndEmailData = true;
      })
      .addCase(updateUserNameAndEmail.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      //updateEmailValidation
      .addCase(updateEmailValidation.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(updateEmailValidation.fulfilled, (state, action) => {
        state.loading = false;
        state.updateEmailValidationData = true;
      })
      .addCase(updateEmailValidation.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      //verifyToken
      .addCase(verifyToken.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(verifyToken.fulfilled, (state, action) => {
        state.loading = false;
        state.verifyTokenData = action.payload;
      })
      .addCase(verifyToken.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // volumeDiscount
      .addCase(seeRelated.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(seeRelated.fulfilled, (state, action) => {
        state.loading = false;
        state.seeRelatedData = action.payload;
      })
      .addCase(seeRelated.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(orderDetails.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(orderDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.orderDetailsData = action.payload;
      })
      .addCase(orderDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(productHistory.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(productHistory.fulfilled, (state, action) => {
        state.productHistoryData = action.payload;
        state.loading = false;
      })
      .addCase(productHistory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});
export const {
  resetHistoryFilter,
  updateHistoryFilter,
  paginationValue,
  orderLimitReset,
  resetDataHandler,
  setScreenName,
  setScreenMenuBar,
} = productSlice.actions;
export default productSlice.reducer;
