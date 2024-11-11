import { View, Text, TextInput, Platform } from "react-native";
import React from "react";
import Colors from "@/constants/Colors";

export default function TextInputC({
  userInputValue,
}: {
  userInputValue: (value: string) => void;
}) {
  const numberOfLines = 5;

  return (
    <View>
      <Text style={{ marginTop: 12 }}>Enter your prompt:</Text>
      <TextInput
        placeholder="Enter your prompt here..."
        numberOfLines={Platform.OS === "ios" ? null : numberOfLines}
        minHeight={
          Platform.OS === "ios" && numberOfLines ? 20 * numberOfLines : null
        }
        multiline={true}
        textAlignVertical="top"
        onChangeText={(value) => userInputValue(value)}
        style={{
          padding: 15,
          backgroundColor: Colors.LIGHT_GRAY,
          borderRadius: 16,
          marginTop: 12,
        }}
      />
    </View>
  );
}
