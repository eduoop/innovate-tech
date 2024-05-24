import { StatusBar } from "react-native";
import React from "react";
import {
  useFonts as useRoboto,
  Roboto_400Regular,
  Roboto_500Medium,
  Roboto_700Bold,
} from "@expo-google-fonts/roboto";
import {
  useFonts as useRaleway,
  Raleway_400Regular,
  Raleway_700Bold,
  Raleway_500Medium,
  Raleway_600SemiBold,
  Raleway_800ExtraBold,
  Raleway_300Light,
  Raleway_200ExtraLight,
  Raleway_100Thin,
} from "@expo-google-fonts/raleway";
import * as SplashScreen from "expo-splash-screen";
import { Slot } from "expo-router";
import "@/styles/global.css";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { StudentsProvider } from "@/contexts/StudentsContext";

SplashScreen.preventAutoHideAsync();

const Layout = () => {
  const [RobotoFontsLoaded] = useRoboto({
    Roboto_400Regular,
    Roboto_500Medium,
    Roboto_700Bold,
  });

  const [RalewayFontsLoaded] = useRaleway({
    Raleway_400Regular,
    Raleway_700Bold,
    Raleway_500Medium,
    Raleway_600SemiBold,
    Raleway_800ExtraBold,
    Raleway_300Light,
    Raleway_200ExtraLight,
    Raleway_100Thin,
  });

  if (RobotoFontsLoaded && RalewayFontsLoaded) {
    SplashScreen.hideAsync();
  }

  return (
    <StudentsProvider>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <StatusBar barStyle="light-content" />
        {RobotoFontsLoaded && RalewayFontsLoaded && <Slot />}
      </GestureHandlerRootView>
    </StudentsProvider>
  );
};

export default Layout;
