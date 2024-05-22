import { useEffect, useRef } from "react";
import { Animated, type View } from "react-native";
import React from "react";
import { cn } from "../lib/utils";

function Skeleton({
  className,
  ...props
}: { className?: string } & React.ComponentPropsWithoutRef<typeof View>) {
  const fadeAnim = useRef(new Animated.Value(0.5)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(fadeAnim, {
          toValue: 0.5,
          duration: 1000,
          useNativeDriver: true,
        }),
      ]),
    ).start();
  }, [fadeAnim]);

  return (
    <Animated.View
      className={cn("rounded-md bg-zinc-600/75", className)}
      style={[{ opacity: fadeAnim }]}
      {...props}
    />
  );
}

export { Skeleton };
