import {
  View,
  Text,
  FlatList,
  Image,
  Dimensions,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
// import { Image } from "expo-image";
import React, { useCallback, useEffect, useState } from "react";
import GlobalApi from "@/services/GlobalApi";
import Colors from "@/constants/Colors";
import { router } from "expo-router";

export default function AllUsersCreations() {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [loading, setLoading] = useState(false);
  const [aiImageList, setAiImageList] = useState([]);
  const [totalImages, setTotalImages] = useState(Infinity);

  const columnWidth = (Dimensions.get("screen").width * 0.85) / 2;

  useEffect(() => {
    getAllAiImages(currentPage);
  }, []);

  const getAllAiImages = async (page: number) => {
    // you must check if it's in 'loading' state else you'll start running into concurrency issues
    if (loading || aiImageList.length >= totalImages) return;

    setLoading(true);
    const totalPages = Math.floor(totalImages / pageSize) + 1;
    if (page <= totalPages) setCurrentPage(page);
    const result = await GlobalApi.GetAllAiImages(page, pageSize);
    const total = result.meta.pagination.total;
    setTotalImages(total);

    const data = result.data;

    // console.log(
    //   data,
    //   [...aiImageList, ...data].map((x) => x.id),
    //   [...aiImageList, ...data].length
    // );
    setAiImageList((prev) => [...prev, ...data]);
    setLoading(false);
  };

  const onImageClickHandle = (item) => {
    router.push({
      pathname: "/ViewAiImage",
      params: {
        imageUrl: item.imageUrl,
        prompt: "",
      },
    });
  };

  const renderFooter = () => {
    if (loading) {
      return <ActivityIndicator size="large" color={Colors.PRIMARY} />;
    } else return null;
  };

  const renderItem = useCallback(({ item }) => {
    return (
      <TouchableOpacity
        onPress={() => onImageClickHandle(item)}
        style={{ margin: 4 }}
      >
        <Image
          source={{ uri: item.imageUrl }}
          style={{
            width: columnWidth,
            height: 250,
            borderRadius: 16,
          }}
        />
      </TouchableOpacity>
    );
  }, []);

  return (
    <View
      style={{
        marginTop: 20,
      }}
    >
      <Text
        style={{
          fontSize: 20,
          fontWeight: "bold",
        }}
      >
        User's Creations
      </Text>
      <FlatList
        data={aiImageList}
        numColumns={2}
        onEndReached={() => {
          const updatedPage = currentPage + 1;
          getAllAiImages(updatedPage);
        }}
        onEndReachedThreshold={0.7}
        ListFooterComponent={renderFooter}
        renderItem={renderItem}
        // debug={true}
      ></FlatList>
    </View>
  );
}
