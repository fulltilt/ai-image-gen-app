import { View, Text, FlatList, Image, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import GlobalApi from "@/services/GlobalApi";
import { AiModel } from "@/schema";
import Colors from "@/constants/Colors";
import { useRouter } from "expo-router";

export default function AiModels({ type }: { type: string }) {
  const router = useRouter();

  const [aiModelList, setAiModelList] = useState<AiModel>([]);

  useEffect(() => {
    GetAiModels();
  }, []);

  const GetAiModels = async () => {
    const result = await GlobalApi.GetAiModels(type);
    setAiModelList(result.data);
  };

  const onClickModel = (item) => {
    router.push({
      pathname: "/FormInput",
      params: item,
    });
  };

  return (
    <View>
      <Text
        style={{
          fontSize: 20,
          fontWeight: "bold",
          marginTop: 20,
          marginBottom: 12,
        }}
      >
        {type.toUpperCase()}
      </Text>

      <FlatList
        data={aiModelList}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        nestedScrollEnabled={true}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => onClickModel(item)}
            style={{ marginRight: 16 }}
          >
            <Image
              source={{ uri: item.banner.url }}
              style={{
                width: 140,
                height: 180,
                borderRadius: 16,
              }}
            />
            <Text
              style={{
                position: "absolute",
                bottom: 12,
                color: Colors.WHITE,
                width: "100%",
                textAlign: "center",
                fontWeight: "medium",
                fontSize: 16,
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
