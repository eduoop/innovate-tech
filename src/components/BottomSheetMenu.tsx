import { View, StyleSheet } from "react-native";
import React, { forwardRef, useContext } from "react";
import BottomSheet from "@gorhom/bottom-sheet";
import theme from "@/theme";
import { StudentsContext } from "@/contexts/StudentsContext";
import { Avatar, AvatarFallback, AvatarImage } from "./Avatar";
import { cn } from "@/lib/utils";

const BottomSheetMenu = forwardRef<BottomSheet>((props, ref) => {
  const { student } = useContext(StudentsContext);

  if (!student) {
    return null;
  }

  return (
    <BottomSheet
      ref={ref}
      index={0}
      snapPoints={[0.1, 600]}
      backgroundStyle={styles.container}
      handleIndicatorStyle={{
        backgroundColor: theme.colors.gray[700],
        width: 100,
      }}
      handleComponent={() => (
        <View className={cn("mt-6 w-full flex-row justify-center")}>
          <Avatar className="h-32 w-32 shadow-md">
            <AvatarImage
              source={{
                uri: `${student.picture.large}`,
              }}
            />
            <AvatarFallback>CG</AvatarFallback>
          </Avatar>
        </View>
      )}
    >
      <View className="w-full"></View>
    </BottomSheet>
  );
});

BottomSheetMenu.displayName = "BottomSheetMenu";

export { BottomSheetMenu };

const styles = StyleSheet.create({
  container: {
    borderTopRightRadius: 27,
    borderTopLeftRadius: 27,
    backgroundColor: theme.colors.gray[800],
  },
});
