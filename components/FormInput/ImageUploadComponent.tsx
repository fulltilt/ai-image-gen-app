import { View, Text, TouchableOpacity, Image } from "react-native";
import React, { useState } from "react";
import Colors from "@/constants/Colors";
import * as ImagePicker from "expo-image-picker";

export default function ImageUploadComponent({
  setUserImage,
}: {
  setUserImage: (value: string) => void;
}) {
  const [image, setImage] = useState<string>();

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: false,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setUserImage(result.assets[0].uri);
      setImage(result.assets[0].uri);
    }
  };

  return (
    <View style={{ marginVertical: 5 }}>
      <Text>Upload Your Image</Text>

      <TouchableOpacity
        onPress={pickImage}
        style={{
          padding: 52,
          backgroundColor: Colors.LIGHT_GRAY,
          borderRadius: 16,
          marginVertical: 12,
          width: "100%",
          display: "flex",
          alignItems: "center",
        }}
      >
        {image ? (
          <Image
            source={{ uri: image }}
            style={{
              width: "100%",
              height: 300,
              borderRadius: 16,
            }}
          />
        ) : (
          <Image
            source={require("./../../assets/images/upload.png")}
            style={{
              width: 72,
              height: 72,
            }}
          />
        )}
      </TouchableOpacity>
    </View>
  );
}
