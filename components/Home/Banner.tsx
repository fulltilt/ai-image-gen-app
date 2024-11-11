import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import Colors from "@/constants/Colors";

export default function Banner() {
  return (
    <View
      style={{
        marginTop: 20,
      }}
    >
      <Image
        source={require("./../../assets/images/banner.png")}
        style={{
          width: "100%",
          height: 140,
          borderRadius: 16,
        }}
      />
      <View
        style={{
          position: "absolute",
          padding: 16,
        }}
      >
        <Text style={{ fontSize: 32, fontWeight: "bold", color: Colors.WHITE }}>
          Turn Words
        </Text>
        <Text
          style={{ fontSize: 32, fontWeight: "bold", color: Colors.YELLOW }}
        >
          into ART
        </Text>
      </View>

      <TouchableOpacity
        style={{
          padding: 8,
          backgroundColor: Colors.YELLOW,
          position: "absolute",
          bottom: 0,
          right: 0,
          margin: 16,
          borderRadius: 8,
          paddingHorizontal: 16,
        }}
      >
        <Text>Explore</Text>
      </TouchableOpacity>
    </View>
  );
}
