import { View, useWindowDimensions } from "react-native";
import React, { useEffect } from "react";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSequence,
  withTiming,
  runOnJS,
} from "react-native-reanimated";
import { router } from "expo-router";

const Splash = () => {
  const logoScale = useSharedValue(1);
  const logoPositionY = useSharedValue(0);
  const contentDisplay = useSharedValue(0);

  const dimensions = useWindowDimensions();

  const logoAnimatedStyles = useAnimatedStyle(() => ({
    transform: [
      { scale: logoScale.value },
      { translateY: logoPositionY.value },
    ],
  }));

  function logoAnimation() {
    logoScale.value = withSequence(
      withTiming(0.7),
      withTiming(1.3),
      withTiming(1, undefined, (finished) => {
        if (finished) {
          logoPositionY.value = withSequence(
            withTiming(50, undefined, () => (contentDisplay.value = 1)),
            withTiming(-dimensions.height, { duration: 400 }),
          );

          runOnJS(onEndSplash)();
        }
      }),
    );
  }

  function onEndSplash() {
    setTimeout(() => {
      router.push("/students");
    }, 350);
  }

  useEffect(() => {
    logoAnimation();
  }, []);

  return (
    <View className="flex-1 items-center justify-center bg-white px-3">
      <Animated.Image
        style={logoAnimatedStyles}
        source={require("../assets/logo.jpeg")}
        className="h-[130px] w-[130px]"
      />
    </View>
  );
};

export default Splash;
