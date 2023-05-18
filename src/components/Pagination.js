//This is Pagination Components Which comes on various screens

import React from "react";
import { StyleSheet, Text, View, Pressable, Image } from "react-native";
import { usePagination, DOTS } from "../utility/utils";
import getEnvVars from "../config/enviroment";
const Pagination = (props) => {
  const {
    onPageChange,
    totalCount,
    siblingCount = 1,
    currentPage,
    pageSize,
  } = props;

  const paginationRange = usePagination({
    currentPage,
    totalCount,
    siblingCount,
    pageSize,
  });

  const onNext = () => {
    onPageChange(currentPage + 1);
  };

  const onPrevious = () => {
    onPageChange(currentPage - 1);
  };
  const { BACK_IMAGE, FORWARD_IMAGE } = getEnvVars();

  return (
    <View style={styles.paginationComponent}>
      <Pressable
        onPress={() => onPrevious()}
        disabled={currentPage === 1}
        style={{
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Image source={BACK_IMAGE} style={{ width: 15, height: 15 }} />
      </Pressable>
      {paginationRange?.map((pageNumber, i) => {
        const myValue = pageNumber === currentPage;

        if (pageNumber === DOTS) {
          return (
            <View key={i}>
              <View>
                <Text>&#8230;</Text>
              </View>
            </View>
          );
        }

        return (
          <Pressable
            key={i + "A"}
            style={
              myValue
                ? {
                    backgroundColor: "rgba(0, 0, 0, 0.08)",
                    borderRadius: 50,
                    alignItems: "center",
                    marginHorizontal: 5,
                  }
                : {
                    borderRadius: 50,
                    alignItems: "center",
                    marginHorizontal: 5,
                  }
            }
            onPress={() => onPageChange(pageNumber)}
            selected={pageNumber === currentPage}
          >
            <Text key={i + 5} style={styles.paginationNumber}>
              {pageNumber}
            </Text>
          </Pressable>
        );
      })}
      <Pressable
        android_ripple={{ color: "#ccc" }}
        onPress={() => onNext()}
        disabled={currentPage === paginationRange.slice(-1)[0]}
        style={{
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Image
          source={FORWARD_IMAGE}
          style={{
            width: 15,
            height: 15,
          }}
        />
      </Pressable>
    </View>
  );
};

export default Pagination;
const styles = StyleSheet.create({
  paginationComponent: {
    flexDirection: "row",
    alignSelf: "center",
    marginBottom: 20,
    justifyContent: "center",
  },
  paginationNumber: {
    fontWeight: "800",
    color: "#494c4c",
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
});
