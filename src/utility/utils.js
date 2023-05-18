import AsyncStorage from "@react-native-async-storage/async-storage";
import { useMemo } from "react";
import getEnvVars from "../config/enviroment";
async function authenticate(credentials) {
  const { apiUrl } = getEnvVars();
  var url = `${apiUrl}/api/login`;
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  })
    .then((data) => {
      return data.json();
    })
    .catch((error) => {
      return error;
    });

  return response;
}
export async function changePassword(credentials) {
  const { apiUrl } = getEnvVars();
  const token = await getToken();
  var url = `${apiUrl}/api/customer/changePassword`;
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
        return "success";
      }
      return data.json();
    })
    .catch((error) => {
      return error;
    });

  const myData = await response;

  return myData;
}

export async function forgot_Password(credentials) {
  const { apiUrl } = getEnvVars();
  const token = await getToken();
  var url = `${apiUrl}/api/authentication/forgot-password`;
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
    body: JSON.stringify(credentials),
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      throw new Error("Something went wrong");
    })
    .catch((error) => {});
  const myData = await response.json();

  return myData;
}

export async function update_UserName(credentials) {
  const { apiUrl } = getEnvVars();
  const token = await getToken();
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

  const myData = await response;
  return myData;
}
export async function updateUserNameAndEmail(credentials) {
  const { apiUrl } = getEnvVars();
  const token = await getToken();
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

export function updateUserName(body) {
  const credentials = {
    username: body.userName,
  };
  return update_UserName(credentials);
}

export async function forgot_user(credentials) {
  const { apiUrl } = getEnvVars();
  var url = `${apiUrl}/api/authentication/forgot-username`;
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  })
    .then((data) => {
      if (data.ok) {
        return "success";
      }
      return data.json();
    })
    .catch((error) => {
      return error;
    });

  const myData = await response;
  return myData;
}
export async function register_user(credentials) {
  const { apiUrl } = getEnvVars();
  var url = `${apiUrl}/api/customer/account/register`;
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  }).then((data) => data);
  const mydata = response;

  return mydata;
}
export async function reset_Password(credentials) {
  const { apiUrl } = getEnvVars();
  var url = `${apiUrl}/api/authentication/reset-password`;
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  })
    .then((data) => {
      if (data.ok) {
        return "success";
      }
      return data.json();
    })
    .catch((error) => {
      return error;
    });

  const myData = await response;

  return myData;
}
export async function productList() {
  const token = await getToken();
  const { apiUrl } = getEnvVars();
  var url = `${apiUrl}/api/customer/product-list/lists`;
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

export async function cartValidate() {
  const { apiUrl } = getEnvVars();
  const token = await getToken();
  var url = `${apiUrl}/api/cart/validate`;
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
  }).then((data) => data.json());

  const data = response;

  return data;
}
export async function poData_Inserter(credentials) {
  const { apiUrl } = getEnvVars();
  const token = await getToken();
  var url = `${apiUrl}/api/fulfillment/poNumber`;
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
    body: JSON.stringify(credentials),
  }).then((data) => data.json());

  const data = response;

  return data;
}

async function favoriteHandler(credentials) {
  const token = await getToken();

  const { apiUrl } = getEnvVars();
  var url = `${apiUrl}/api/customer/product-list/items`;
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
    body: JSON.stringify(credentials),
  }).then((data) => data.json());

  const data = response;

  return data;
}

export function favorites(body) {
  const credentials = {
    type: "FAVORITE",
    items: [
      {
        skuId: body.id,
        quantity: 1,
      },
    ],
  };
  return favoriteHandler(credentials);
}

export function favoritesRemove(body) {
  const credentials = {
    type: "FAVORITE",
    items: [
      {
        skuId: body.id,
        quantity: 0,
      },
    ],
  };
  return favoriteHandler(credentials);
}

export async function emptyCart(credentials) {
  const token = await getToken();
  const { apiUrl } = getEnvVars();
  var url = `${apiUrl}/api/cart`;
  const response = await fetch(url, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
    body: JSON.stringify(credentials),
  }).then((data) => data.json());

  const data = response;

  return data;
}

export async function login(body) {
  const token = await getToken();
  const credentials = {
    username: body.email,
    password: body.password,
    params: {
      apiLogin: true,
      appLogin: true,
      fingerprint: token,
    },
  };

  const data = await authenticate(credentials);
  return data;
}

export const getToken = async () => {
  const token = await AsyncStorage.getItem("token");
  return token;
};
export const getPushToken = async () => {
  const token = await AsyncStorage.getItem("pushToken");
  return token;
};

async function updateItem(credentials) {
  const token = await getToken();
  const { apiUrl } = getEnvVars();
  var url = `${apiUrl}/api/cart/items`;
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
    body: JSON.stringify(credentials),
  }).then((data) => data.json());

  const data = response;

  return data;
}

async function addItem(credentials) {
  const token = await getToken();
  const { apiUrl } = getEnvVars();
  var url = `${apiUrl}/api/cart/items`;
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
    body: JSON.stringify(credentials),
  }).then((data) => data.json());
  const data = response;
  return data;
}
export function addItems(body) {
  const credentials = {
    updateItemDtos: [
      {
        accountId: body.accountId,
        quantity: body.quantity,
        skuID: body.skuId,
      },
    ],
  };
  return addItem(credentials);
}

export function updateCartItems(body) {
  const credentials = {
    updateItemDtos: [
      {
        orderItemId: body.Id,
        quantity: body.count,
      },
    ],
  };
  return updateItem(credentials);
}

export function deleteItems(body) {
  const credentials = {
    updateItemDtos: [
      {
        orderItemId: body.Id,
        quantity: 0,
      },
    ],
  };
  return updateItem(credentials);
}

export async function checkOutCart(orderId) {
  const token = await getToken();
  const { apiUrl } = getEnvVars();
  var url = `${apiUrl}/api/order/${orderId}/checkout?paymentType=invoice&source=app`;

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
  }).then((data) => data.json());

  const myData = response;

  return myData;
}

export const getBioMetricsDetails = async () => {
  const bioMetrics = JSON.parse(await AsyncStorage.getItem("bioMetrics"));

  return bioMetrics;
};

const range = (start, end) => {
  let length = end - start + 1;
  return Array.from({ length }, (_, idx) => idx + start);
};

export const DOTS = "...";
export const usePagination = ({
  totalCount,
  pageSize,
  siblingCount = 1,
  currentPage,
}) => {
  const paginationRange = useMemo(() => {
    const totalPageCount = Math.ceil(totalCount / pageSize);
    const totalPageNumbers = siblingCount + 5;
    if (totalPageNumbers >= totalPageCount) {
      return range(1, totalPageCount);
    }
    const leftSiblingIndex = Math.max(currentPage - siblingCount, 1);
    const rightSiblingIndex = Math.min(
      currentPage + siblingCount,
      totalPageCount
    );
    const shouldShowLeftDots = leftSiblingIndex > 2;
    const shouldShowRightDots = rightSiblingIndex < totalPageCount - 2;

    const firstPageIndex = 1;
    const lastPageIndex = totalPageCount;
    if (!shouldShowLeftDots && shouldShowRightDots) {
      let leftItemCount = 3 + 2 * siblingCount;
      let leftRange = range(1, leftItemCount);

      return [...leftRange, DOTS, totalPageCount];
    }
    if (shouldShowLeftDots && !shouldShowRightDots) {
      let rightItemCount = 3 + 2 * siblingCount;
      let rightRange = range(
        totalPageCount - rightItemCount + 1,
        totalPageCount
      );
      return [firstPageIndex, DOTS, ...rightRange];
    }
    if (shouldShowLeftDots && shouldShowRightDots) {
      let middleRange = range(leftSiblingIndex, rightSiblingIndex);
      return [firstPageIndex, DOTS, ...middleRange, DOTS, lastPageIndex];
    }
  }, [totalCount, pageSize, siblingCount, currentPage]);

  return paginationRange;
};
