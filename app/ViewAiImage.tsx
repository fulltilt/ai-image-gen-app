import { View, Image, Text, TouchableOpacity } from "react-native";
import React, { useEffect } from "react";
import { useLocalSearchParams, useNavigation } from "expo-router";
import Colors from "@/constants/Colors";
import * as MediaLibrary from "expo-media-library";
import * as FileSystem from "expo-file-system";
import Toast from "react-native-root-toast";

export default function ViewAiImage() {
  const navigation = useNavigation();
  const params = useLocalSearchParams();

  const [permissionResponse, requestPermission] = MediaLibrary.usePermissions();

  useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTitle: "AI Generated Image",
    });
  }, []);

  const downloadImage = async () => {
    try {
      if (!permissionResponse?.granted) {
        const permission = await requestPermission();
        if (!permission.granted) {
          Toast.show("You do not permission to download the image.", {
            duration: Toast.durations.LONG,
          });
          return;
        }
      }

      const fileUri = `${
        FileSystem.documentDirectory
      }${Date.now()}_ImaginAI.jpg`;

      const { uri } = await FileSystem.downloadAsync(params.imageUrl, fileUri);

      // used to save in gallery
      const asset = await MediaLibrary.createAssetAsync(uri);
      if (asset)
        Toast.show("Image downloaded", {
          duration: Toast.durations.LONG,
        });
      else
        Toast.show("Internal server error", {
          duration: Toast.durations.LONG,
        });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={{ padding: 20 }}>
      <Image
        source={{ uri: params.imageUrl }}
        style={{ width: "100%", height: 400, borderRadius: 20 }}
      />
      <Text style={{ marginVertical: 12, fontSize: 16, color: Colors.PRIMARY }}>
        PROMPT: {params.prompt}
      </Text>

      <View
        style={{
          display: "flex",
          flexDirection: "row",
          gap: 12,
          marginTop: 52,
        }}
      >
        <TouchableOpacity
          onPress={downloadImage}
          style={{
            padding: 16,
            backgroundColor: Colors.PRIMARY,
            borderRadius: 12,
            width: "50%",
          }}
        >
          <Text
            style={{
              color: Colors.WHITE,
              textAlign: "center",
              fontSize: 16,
            }}
          >
            Download
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={{
            padding: 16,
            backgroundColor: Colors.YELLOW,
            borderRadius: 12,
            width: "50%",
          }}
        >
          <Text
            style={{
              color: Colors.WHITE,
              textAlign: "center",
              fontSize: 16,
            }}
          >
            Share
          </Text>
        </TouchableOpacity>
      </View>

      <Text style={{ marginVertical: 12, fontSize: 12, color: Colors.GRAY }}>
        NOTE: Image will be available only for the next 30 minutes.
      </Text>
    </View>
  );
}
