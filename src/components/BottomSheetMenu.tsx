import {
  View,
  StyleSheet,
  Text,
  Platform,
  TouchableOpacity,
} from "react-native";
import React, { forwardRef, useContext } from "react";
import BottomSheet from "@gorhom/bottom-sheet";
import theme from "@/theme";
import { StudentsContext } from "@/contexts/StudentsContext";
import { Avatar, AvatarFallback, AvatarImage } from "./Avatar";
import { cn } from "@/lib/utils";
import Foundation from "@expo/vector-icons/Foundation";
import moment from "moment";
import { Ionicons } from "@expo/vector-icons";

type BottomMenuProps = {
  onClose: () => void;
};

const BottomSheetMenu = forwardRef<BottomSheet, BottomMenuProps>(
  ({ onClose }, ref) => {
    const { student } = useContext(StudentsContext);

    if (!student) {
      return null;
    }

    const studentLocation = `${student.location?.country ? `${student.location?.country}, ` : "Sem país,"}${student.location?.state ? `${student.location?.state}, ` : "sem estado,"}${student.location?.city ? `${student.location?.city}` : "sem cidade"} ${student.location?.street?.name ? `${student.location?.street?.name}` : "Sem rua"}`;

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
              <AvatarFallback>{student.name.first.charAt(0)}</AvatarFallback>
            </Avatar>
          </View>
        )}
      >
        <View
          className={cn("w-full flex-1 justify-between pb-28", {
            "pb-32": Platform.OS === "ios",
          })}
        >
          <View className="w-full">
            <View className="mt-3 w-full flex-row items-center justify-center gap-3">
              <Text className="font-bold text-2xl text-white">
                {student.name.title} {student.name.first} {student.name.last}
              </Text>

              <Foundation
                name={
                  student.gender === "male" ? "male-symbol" : "female-symbol"
                }
                size={26}
                color={student.gender === "male" ? "#319ED8" : "#E50064"}
              />
            </View>
            <View className="mt-[2px] flex-row items-center justify-center gap-3 border-b-[1px] border-b-zinc-600/25 px-5 pb-3">
              <Text className="text-lg text-zinc-400">{student.email}</Text>
            </View>

            <View className="mt-4 w-full flex-row justify-between gap-2 px-5">
              <View className="w-[50%] gap-1">
                <Text className="text-white/50">Data de nascimento</Text>
                <Text className="text-[14px] font-semibold text-white">
                  {moment(student.registered.date).format("DD/MM/YYYY")}
                </Text>
              </View>
              <View className="w-[50%] gap-1">
                <Text className="text-white/50">Telefone</Text>
                <Text className="text-[14px] font-semibold text-white">
                  {student.phone}
                </Text>
              </View>
            </View>

            <View className="mt-4 w-full flex-row justify-between gap-2 px-5">
              <View className="w-[50%] gap-1">
                <Text className="text-white/50">Nacionalidade</Text>
                <Text className="text-[14px] font-semibold text-white">
                  {student.nat}
                </Text>
              </View>
              <View className="w-[50%] gap-1">
                <Text className="text-white/50">ID</Text>
                <Text className="text-[14px] font-semibold text-white">
                  {student.id.value
                    ? student.id.value.toString()
                    : "Indefinido"}
                </Text>
              </View>
            </View>

            <View className="mt-4 w-full flex-row justify-between gap-2 px-5 pr-14">
              <View className="w-full gap-1">
                <Text className="text-white/50">Endereço</Text>
                <Text className="text-[14px] font-semibold text-white">
                  {studentLocation}
                </Text>
              </View>
            </View>
          </View>

          <View className="w-full items-center justify-center">
            <TouchableOpacity
              onPress={onClose}
              activeOpacity={0.7}
              className="h-12 flex-row items-center gap-1 rounded-lg bg-gray-400/25 px-6"
            >
              <Ionicons name="close-outline" size={27} color="white" />
              <Text className=" text-xl text-white">Fechar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </BottomSheet>
    );
  },
);

BottomSheetMenu.displayName = "BottomSheetMenu";

export { BottomSheetMenu };

const styles = StyleSheet.create({
  container: {
    borderTopRightRadius: 27,
    borderTopLeftRadius: 27,
    backgroundColor: theme.colors.gray[800],
  },
});
