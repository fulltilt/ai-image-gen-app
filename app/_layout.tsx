import * as SecureStore from "expo-secure-store";
import { ClerkProvider, ClerkLoaded } from "@clerk/clerk-expo";
import { Stack } from "expo-router";
import { UserDetailContext } from "@/context/UserDetailContext";
import { useState } from "react";
import { RootSiblingParent } from "react-native-root-siblings"; // used to Toast's in iOS

export default function RootLayout() {
  const [userDetail, setUserDetail] = useState();

  const tokenCache = {
    async getToken(key: string) {
      try {
        const item = await SecureStore.getItemAsync(key);
        if (item) {
          console.log(`${key} was used 🔐 \n`);
        } else {
          console.log("No values stored under key: " + key);
        }
        return item;
      } catch (error) {
        console.error("SecureStore get item error: ", error);
        await SecureStore.deleteItemAsync(key);
        return null;
      }
    },
    async saveToken(key: string, value: string) {
      try {
        return SecureStore.setItemAsync(key, value);
      } catch (err) {
        return;
      }
    },
  };

  const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY!;

  if (!publishableKey) {
    throw new Error("Add EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY in your .env");
  }

  return (
    <ClerkProvider tokenCache={tokenCache} publishableKey={publishableKey}>
      <ClerkLoaded>
        <RootSiblingParent>
          <UserDetailContext.Provider value={{ userDetail, setUserDetail }}>
            <Stack
              screenOptions={{
                headerShown: false,
                headerBackTitleVisible: false,
              }}
            >
              <Stack.Screen name="(tabs)" />
              <Stack.Screen
                name="login/index"
                options={{ headerShown: false, headerBackTitleVisible: false }}
              />
            </Stack>
          </UserDetailContext.Provider>
        </RootSiblingParent>
      </ClerkLoaded>
    </ClerkProvider>
  );
}
