import { View, Text, Pressable } from "react-native";
import React, { memo, useContext } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./Avatar";
import moment from "moment";

interface StudentCardProps {
  student: StudentsSelectedFields;
}
import Foundation from "@expo/vector-icons/Foundation";
import { StudentsSelectedFields } from "@/app/students";
import { StudentsContext } from "@/contexts/StudentsContext";

const StudentCardItem = ({ student }: StudentCardProps) => {
  const { handleBottomMenuPress, setStudent } = useContext(StudentsContext);
  const formatDate = moment(student.registered.date).format("DD/mm/yyyy");
  const gender =
    student.gender === "male" ? (
      <Foundation name="male-symbol" size={24} color="#319ED8" />
    ) : (
      <Foundation name="female-symbol" size={24} color="#E50064" />
    );

  const traduceGender = (gender: string) => {
    if (gender === "male") {
      return "Masculino";
    } else if (gender === "female") {
      return "Feminino";
    } else {
      return "Indefinido";
    }
  };

  const handleClickSheetOpen = () => {
    setStudent(student);
    handleBottomMenuPress();
  };

  return (
    <Pressable
      onPress={() => handleClickSheetOpen()}
      className="w-full flex-row items-center gap-2 rounded-2xl border border-zinc-600/15 bg-zinc-800/20 p-2"
    >
      <Avatar className="h-20 w-20 rounded-2xl">
        <AvatarImage
          source={{
            uri: `${student.picture.medium}`,
          }}
        />
        <AvatarFallback>CG</AvatarFallback>
      </Avatar>

      <View className="flex-1 justify-center gap-5">
        <Text className="font-medium text-[15px] text-white">
          {student.name.title} {student.name.first} {student.name.last}
        </Text>
        <View className="w-full flex-row items-center justify-between">
          <View className="flex-row items-center gap-2">
            {gender}
            <Text className="text-white/85">
              {traduceGender(student.gender)}
            </Text>
          </View>

          <Text className="text-white/85">{formatDate}</Text>
        </View>
      </View>
    </Pressable>
  );
};

export default memo(StudentCardItem);
