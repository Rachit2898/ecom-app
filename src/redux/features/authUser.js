import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";

import {
  login,
  changePassword,
  forgot_Password,
  reset_Password,
  forgot_user,
  register_user,
  poData_Inserter,
  getPushToken,
} from "../../utility/utils";
import _ from "lodash";
import jwt_decode from "jwt-decode";
const initialState = {
  loginData: {},
  token: "",
  loading: false,
  isFinger: false,
  searchedValue: "",
  searchProductUrls: [],
  andaContractItemsUrls: [],
  isAuthenticated: false,
  sortingUrl: "",
  changeUserPasswordData: {},
  changePasswordValue: false,
  cartName: "Home",
  pushToken: "",
  message: "",
  poData: "",
  showAlertBox: false,
  resetPasswordData: {},
  forgotPasswordData: {},
  forgotUserData: {},
  isLogin: false,
};

export const signin = createAsyncThunk("signin", async (body) => {
  const result = await login(body);

  if (!!result?.validations?.length) {
    if (result?.validations[0]?.level === "ERROR") {
      return result?.validations[0];
    }
  } else {
    return result;
  }
});
export const changeUserPassword = createAsyncThunk(
  "changePassword",
  async (body) => {
    const credentials = {
      currentPassword: body.currentPassword,
      newPassword: body.newPassword,
    };
    const result = await changePassword(credentials);

    return result;
  }
);

export const forgotPassword = createAsyncThunk(
  "forgotPassword",
  async (body) => {
    const token = await getPushToken();
    const credentials = {
      fingerprint: token,
      recaptcha: body.token,
      username: body.name,
    };
    const result = await forgot_Password(credentials);
    return result;
  }
);
export const registerUser = createAsyncThunk("registerUser", async (body) => {
  const token = await getPushToken();
  const credentials = {
    accountNumber: body.accountNumber,
    confirmPassword: body.confirmPassword,
    contactName: body.nameLastName,
    email: body.email,
    fingerprint: token,
    password: body.password,
    stateLicense: body.license,
    username: body.userName,
  };
  const result = await register_user(credentials);
  return result;
});
export const resetPassword = createAsyncThunk("resetPassword", async (body) => {
  const token = await getPushToken();
  const credentials = {
    fingerprint: token,
    password: body.password,
    token: body.token,
  };
  const result = await reset_Password(credentials);

  return result;
});
export const forgotUser = createAsyncThunk("forgotUser", async (body) => {
  const credentials = {
    recaptcha: body.token,
    emailAddress: body.email,
  };
  const result = await forgot_user(credentials);

  return result;
});
export const poDataInserter = createAsyncThunk(
  "poDataInserter",
  async (body) => {
    const credentials = {
      fulfillmentGroupId: body?.groupId,
      poNumber: body?.poValue,
    };
    const result = await poData_Inserter(credentials);

    return result;
  }
);

export function containsObject(obj, list) {
  var i;
  for (i = 0; i < list.length; i++) {
    if (list[i].item === obj.item) {
      return true;
    }
  }

  return false;
}

const authReducer = createSlice({
  name: "token",
  initialState,

  reducers: {
    logout: (state, action) => {
      AsyncStorage.removeItem("token");
      state.isAuthenticated = action.payload;
      state.token = "";
      state.cartName = "Home";
    },
    fingers: (state, action) => {
      state.isFinger = action.payload;
    },
    searchValues: (state, action) => {
      state.searchedValue = action.payload;
    },
    fingerPrintToken: (state, action) => {
      state.pushToken = action.payload;
    },
    authenticate: (state, action) => {
      state.loading = true;
      const storedToken = action.payload;

      const jwt_Token_decoded = jwt_decode(storedToken);

      if (storedToken) {
        if (jwt_Token_decoded.exp * 1000 < Date.now()) {
          AsyncStorage.removeItem("token");
          state.isAuthenticated = false;
          state.token = "";
        } else {
          state.token = storedToken;
          state.isAuthenticated = true;
        }
      } else {
        state.token = storedToken;
        state.isAuthenticated = false;
      }
    },

    updateSearchProductUrls: (state, action) => {
      if (containsObject(action.payload, state.searchProductUrls)) {
        _.pull(
          state.searchProductUrls,
          _.find(state.searchProductUrls, { item: action.payload.item })
        );
      } else {
        state.searchProductUrls.push(action.payload);
      }
    },
    updateAndaContractItemsUrls: (state, action) => {
      if (containsObject(action.payload, state.andaContractItemsUrls)) {
        _.pull(
          state.andaContractItemsUrls,
          _.find(state.andaContractItemsUrls, { item: action.payload.item })
        );
      } else {
        state.andaContractItemsUrls.push(action.payload);
      }
    },

    setSorting: (state, action) => {
      state.sortingUrl = action.payload;
    },
    cartColor: (state, action) => {
      state.cartName = action.payload;
    },
    setPoData: (state, action) => {
      state.poData = action.payload;
    },

    removeUrls: (state, action) => {
      state.searchProductUrls = [];
      state.andaContractItemsUrls = [];
      state.sortingUrl = "";
      state.resetPasswordData = {};
      state.changeUserPasswordData = {};
      state.forgotUserData = {};
    },
    showAlert: (state, action) => {
      state.showAlertBox = action.payload;
    },
    authTokenChanged: (state, action) => {
      state.token = action.payload;
      state.isAuthenticated = true;
      state.isLogin = true;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signin.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(signin.fulfilled, (state, action) => {
        state.loading = false;
        state.loginData = action.payload;
      })
      .addCase(signin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(changeUserPassword.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(changeUserPassword.fulfilled, (state, action) => {
        state.loading = false;
        state.changeUserPasswordData = action.payload;
        state.changePasswordValue = false;
      })
      .addCase(changeUserPassword.rejected, (state, action) => {
        state.loading = false;
        state.changePasswordValue = true;
        state.error = action.payload;
      })
      .addCase(forgotPassword.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(forgotPassword.fulfilled, (state, action) => {
        state.loading = false;
        state.forgotPasswordData = action.payload;
      })
      .addCase(forgotPassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(resetPassword.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(resetPassword.fulfilled, (state, action) => {
        state.loading = false;
        state.resetPasswordData = action.payload;
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(forgotUser.pending, (state, action) => {
        state.loading = true;
      })

      .addCase(forgotUser.fulfilled, (state, action) => {
        state.loading = false;
        state.message = action.payload;
        state.forgotUserData = action.payload;
      })
      .addCase(forgotUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(poDataInserter.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(poDataInserter.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(poDataInserter.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const {
  logout,
  authenticate,
  setSorting,
  searchValues,
  fingers,
  cartColor,
  updateAndaContractItemsUrls,
  updateSearchProductUrls,
  fingerPrintToken,
  removeUrls,
  setPoData,
  showAlert,
  authTokenChanged,
} = authReducer.actions;
export default authReducer.reducer;
