import { View, Text, FlatList, Image, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import GlobalApi from "@/services/GlobalApi";
import Colors from "@/constants/Colors";
import { AiModel } from "@/schema";
import { useRouter } from "expo-router";

export default function AiFeaturedModel() {
  const router = useRouter();

  const [aiModelList, setAiModelList] = useState<AiModel>([]);

  useEffect(() => {
    GetAiModelFeaturedList();
  }, []);

  const GetAiModelFeaturedList = async () => {
    const result = await GlobalApi.GetFeaturedCategoryList();
    setAiModelList(result.data);
  };

  const onClickAiModel = (item) => {
    router.push({
      pathname: "FormInput",
      params: item,
    });
  };

  return (
    <View style={{ marginTop: 20 }}>
      <Text style={{ fontSize: 24, fontWeight: "bold" }}>FEATURED</Text>
      <FlatList
        data={aiModelList}
        numColumns={4}
        style={{ marginTop: 8 }}
        renderItem={({ item, index }) => (
          <TouchableOpacity
            onPress={() => onClickAiModel(item)}
            style={{ flex: 1, alignItems: "center" }}
          >
            <View
              style={{
                padding: 12,
                borderRadius: 8,
                backgroundColor: Colors.LIGHT_GRAY,
              }}
            >
              <Image
                source={{ uri: item?.icon?.url }}
                style={{ width: 36, height: 36 }}
              />
            </View>
            <Text
              style={{
                fontSize: 12,
                textAlign: "center",
                color: Colors.PRIMARY,
                marginTop: 4,
              }}
            >
              {item.name}
            </Text>
          </TouchableOpacity>
        )}
      ></FlatList>
    </View>
  );
}
