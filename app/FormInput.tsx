import { View, Text, TouchableOpacity, ActivityIndicator } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { useLocalSearchParams, useNavigation, useRouter } from "expo-router";
import Colors from "@/constants/Colors";
import TextInputC from "@/components/FormInput/TextInputC";
import ImageUploadComponent from "@/components/FormInput/ImageUploadComponent";
import { AiModel } from "@/schema";
import GlobalApi from "@/services/GlobalApi";
import { UserDetailContext } from "@/context/UserDetailContext";
import { Cloudinary } from "@cloudinary/url-gen";
import { upload } from "cloudinary-react-native";
import Toast from "react-native-root-toast";

const cld = new Cloudinary({
  cloud: {
    cloudName: "dq9xu1101",
  },
  url: {
    secure: true,
  },
});

const options = {
  upload_preset: "wahoqpvy",
  unsigned: true,
};

export default function FormInput() {
  const params = useLocalSearchParams();
  const navigation = useNavigation();
  const router = useRouter();

  const { userDetail, setUserDetail } = useContext(UserDetailContext);

  const [aiModel, setAiModel] = useState<AiModel>();
  const [userInput, setUserInput] = useState<string>();
  const [userImage, setUserImage] = useState<string>();
  const [generatedImage, setGeneratedImage] = useState<string>();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setAiModel(params);
    navigation.setOptions({
      headerShown: true,
      headerTitle: params.name,
    });
  }, []);

  const onGenerate = async () => {
    if (userDetail.credits <= 0) {
      Toast.show("You do not have enough credits.", {
        duration: Toast.durations.LONG,
      });
      return;
    }

    if (aiModel.userImageUpload === "false" || !aiModel.userImageUpload) {
      textToImage();
    } else {
      imageToAiImage();
    }
  };

  const textToImage = async () => {
    const data = {
      aiModelName: aiModel?.aiModelName,
      inputPrompt: userInput,
      defaultPrompt: aiModel?.defaultPrompt,
    };

    try {
      setLoading(true);

      const result = await GlobalApi.AIGenerateImage(data);
      const url = result.url;
      uploadImageAndSave(url);

      // update User credits
      const updatedResults = await GlobalApi.UpdateUserCredits(
        userDetail.documentId,
        { credits: Number(userDetail.credits) - 1 }
      );
      console.log("UpdateUserCredits", updatedResults.data);
      setUserDetail(updatedResults.data);
    } catch (e) {
      Toast.show("Error generating AI image.", {
        duration: Toast.durations.LONG,
      });
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  const imageToAiImage = async () => {
    // upload original image to Cloudinary
    setLoading(true);
    try {
      await upload(cld, {
        file: userImage,
        options: options,
        callback: async (error: any, response: any) => {
          if (error) {
            console.log("Error: ", error.message);
            Toast.show(error.message, {
              duration: Toast.durations.LONG,
            });
            setLoading(false);
            return;
          }

          setLoading(true);
          const data = {
            defaultPrompt: aiModel.defaultPrompt,
            userImageUrl: response.url,
            aiModelName: aiModel.aiModelName,
          };

          // call Replicate AI model
          try {
            const result = await GlobalApi.AIGenerateImage(data);
            console.log("imageToAiImage", result);
            if (result["Error"]) throw new Error(JSON.stringify(result));
            const replicateUrl = result.url;
            uploadImageAndSave(replicateUrl);
          } catch (err) {
            console.log(err);
            Toast.show("Error generating AI image.", {
              duration: Toast.durations.LONG,
            });
            setLoading(false);
          }
        },
      });
    } catch (err) {
      Toast.show("Error generating AI image.", {
        duration: Toast.durations.LONG,
      });
    }
  };

  const uploadImageAndSave = async (url: string) => {
    setLoading(true);
    await upload(cld, {
      file: url,
      options: options,
      callback: async (error: any, response: any) => {
        if (error) {
          Toast.show(
            `Error saving AI generated image to Cloudinary: ${error.message}`,
            {
              duration: Toast.durations.LONG,
            }
          );
          console.log("Error: ", error.message);
          return;
        }

        url = response.url; // set url to be the Cloudinary url instead of the Replicate url as that is temporary
        const data = {
          defaultPrompt: aiModel.defaultPrompt,
          userImageUrl: response.url,
          aiModelName: aiModel.aiModelName,
        };
        const result = await GlobalApi.AIGenerateImage(data);
      },
    });

    // upload image data to Strapi
    const saveImageData = {
      imageUrl: url,
      userEmail: userDetail.userEmail,
    };
    const saveImageResult = await GlobalApi.AddAiImageRecord(saveImageData);
    console.log(saveImageResult.data);

    router.push({
      pathname: "/ViewAiImage",
      params: {
        imageUrl: url,
        prompt: userInput,
      },
    });

    setLoading(false);
  };

  return (
    <View
      style={{
        padding: 20,
        backgroundColor: Colors.WHITE,
        height: "100%",
      }}
    >
      <Text
        style={{
          fontSize: 20,
          fontWeight: "bold",
        }}
      >
        {aiModel?.name}
      </Text>
      <View>
        {aiModel?.userImageUpload !== "true" ? (
          <TextInputC userInputValue={(value: string) => setUserInput(value)} />
        ) : (
          <ImageUploadComponent
            setUserImage={(value: string) => setUserImage(value)}
          />
        )}
        <Text style={{ color: Colors.GRAY, marginVertical: 8 }}>
          NOTE: 1 Credit will be used to generate AI Image
        </Text>

        <TouchableOpacity
          onPress={onGenerate}
          disabled={loading}
          style={{
            padding: 12,
            backgroundColor: Colors.PRIMARY,
            borderRadius: 16,
            marginVertical: 16,
            width: "100%",
          }}
        >
          {loading ? (
            <ActivityIndicator size={"large"} color={"#fff"} />
          ) : (
            <Text
              style={{
                color: Colors.WHITE,
                textAlign: "center",
                fontSize: 20,
              }}
            >
              Generate
            </Text>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
}
