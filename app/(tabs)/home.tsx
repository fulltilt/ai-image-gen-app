import { View, Text, ScrollView, FlatList } from "react-native";
import React from "react";
import Banner from "@/components/Home/Banner";
import Header from "@/components/Home/Header";
import AiFeaturedModel from "@/components/Home/AiFeaturedModel";
import AiModels from "@/components/Home/AiModels";
import AllUsersCreations from "@/components/Home/AllUsersCreations";

export default function Home() {
  return (
    <FlatList
      data={[1]}
      style={{ padding: 20, marginTop: 20 }}
      nestedScrollEnabled={true}
      renderItem={({ item }) => (
        <View>
          <Header />
          <Banner />
          <AiFeaturedModel />
          <AiModels type="avatar" />
          <AiModels type="style" />
          <AllUsersCreations />

          <View style={{ height: 200 }} />
        </View>
      )}
    ></FlatList>
  );
}
