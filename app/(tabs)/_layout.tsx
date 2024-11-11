import { View, Text } from "react-native";
import React, { useContext, useEffect } from "react";
import { Tabs } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";
import Colors from "@/constants/Colors";
import GlobalApi from "@/services/GlobalApi";
import { useUser } from "@clerk/clerk-expo";
import { UserDetailContext } from "@/context/UserDetailContext";

export default function TabLayout() {
  const { user } = useUser();
  const { userDetail, setUserDetail } = useContext(UserDetailContext);

  const VerifyUser = async () => {
    const result = await GlobalApi.GetUserInfo(
      user?.primaryEmailAddress?.emailAddress!
    );

    if (result.data.length !== 0) {
      setUserDetail(result.data[0]);
      return;
    }

    try {
      const data = {
        userEmail: user?.primaryEmailAddress?.emailAddress!,
        userName: user?.fullName!,
      };
      const result = await GlobalApi.CreateNewUser(data);
      setUserDetail(result.data[0]);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    user && VerifyUser();
  }, [user]);

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: Colors.PRIMARY,
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: "Home",
          tabBarIcon: ({ color }) => (
            <Ionicons name="home" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="collection"
        options={{
          title: "Collection",
          tabBarIcon: ({ color }) => (
            <Ionicons name="folder-open" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "User",
          tabBarIcon: ({ color }) => (
            <Ionicons name="people-circle" size={24} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
