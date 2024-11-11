import { View, Text, Image, Button, TouchableOpacity } from "react-native";
import React, { useContext, useEffect } from "react";
import Colors from "@/constants/Colors";
import { useUser, useAuth } from "@clerk/clerk-expo";
import { UserDetailContext } from "./../../context/UserDetailContext";
import { router } from "expo-router";

export default function Header() {
  const { user } = useUser();
  const { signOut, isSignedIn } = useAuth();

  useEffect(() => {
    if (!isSignedIn) {
      router.push("/");
    }
  }, [isSignedIn]);

  const { userDetail, setUserDetail } = useContext(UserDetailContext);

  return (
    <View
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginTop: 8,
      }}
    >
      <Text style={{ fontSize: 30, color: Colors.PRIMARY, fontWeight: "bold" }}>
        ImaginAI
      </Text>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          gap: 12,
        }}
      >
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            gap: 4,
            borderWidth: 0.4,
            borderRadius: 99,
            paddingHorizontal: 8,
          }}
        >
          <Image
            source={require("./../../assets/images/coin.jpeg")}
            style={{
              width: 25,
              height: 25,
            }}
          />
          <Text>{userDetail?.credits}</Text>
        </View>
        <TouchableOpacity onPress={async () => await signOut()}>
          <Image
            source={{ uri: user?.imageUrl }}
            style={{
              width: 30,
              height: 30,
              borderRadius: 99,
            }}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}
