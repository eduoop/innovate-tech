import { forwardRef, useState } from "react";
import { Image, Text, View } from "react-native";
import React from "react";
import { cn } from "../lib/utils";
import PropTypes from "prop-types";

const Avatar = forwardRef<
  React.ElementRef<typeof View>,
  React.ComponentPropsWithoutRef<typeof View>
>(({ className, ...props }, ref) => (
  <View
    ref={ref}
    className={cn(
      "relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full",
      className,
    )}
    {...props}
  />
));
Avatar.displayName = "Avatar";

Avatar.propTypes = {
  className: PropTypes.string,
};

const AvatarImage = forwardRef<
  React.ElementRef<typeof Image>,
  React.ComponentPropsWithoutRef<typeof Image>
>(({ className, ...props }, ref) => {
  const [hasError, setHasError] = useState(false);

  if (hasError) {
    return null;
  }
  return (
    <Image
      ref={ref}
      onError={() => setHasError(true)}
      className={cn("aspect-square h-full w-full", className)}
      {...props}
    />
  );
});
AvatarImage.displayName = "AvatarImage";

AvatarImage.propTypes = {
  className: PropTypes.string,
};

const AvatarFallback = forwardRef<
  React.ElementRef<typeof View>,
  React.ComponentPropsWithoutRef<typeof View> & { textClassname?: string }
>(({ children, className, textClassname, ...props }, ref) => (
  <View
    ref={ref}
    className={cn(
      "bg-muted flex h-full w-full items-center justify-center rounded-full",
      className,
    )}
    {...props}
  >
    <Text className={cn("text-primary text-lg", textClassname)}>
      {children}
    </Text>
  </View>
));
AvatarFallback.displayName = "AvatarFallback";

AvatarFallback.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  textClassname: PropTypes.string,
};

export { Avatar, AvatarImage, AvatarFallback };
