import { View, Text, Pressable } from "react-native";
import React, { Dispatch, SetStateAction, memo } from "react";
import { GenderFilter } from "@/app/students";
import Foundation from "@expo/vector-icons/Foundation";
import { cn } from "@/lib/utils";

interface GenderFiltersProps {
  genderFilters: GenderFilter;
  setGenderFilters: Dispatch<SetStateAction<GenderFilter>>;
}

const GenderFilters = ({
  genderFilters,
  setGenderFilters,
}: GenderFiltersProps) => {
  const male = genderFilters.male;
  const female = genderFilters.female;

  const handleChange = (gender: "male" | "female") => {
    setGenderFilters((prev) => ({
      ...prev,
      [gender]: !prev[gender],
    }));
  };

  return (
    <View className="w-full flex-row">
      <Pressable
        onPress={() => handleChange("male")}
        className={cn(
          "w-1/2 flex-row items-center justify-center gap-3 rounded-2xl rounded-r-none border border-transparent bg-zinc-600/15 py-2 shadow-md",
          {
            "border-[#319ED8] bg-[#319ED81A]": male,
          },
        )}
      >
        <Foundation name="male-symbol" size={24} color="#319ED8" />
        <Text className="text-center font-semibold text-white">Masculino</Text>
      </Pressable>
      <Pressable
        onPress={() => handleChange("female")}
        className={cn(
          "w-1/2 flex-row items-center justify-center gap-3 rounded-2xl rounded-l-none border border-transparent bg-zinc-600/15 py-2 shadow-md",
          {
            "border-[#E50064] bg-[#E500641A]": female,
          },
        )}
      >
        <Foundation name="female-symbol" size={24} color="#E50064" />
        <Text className="text-center font-semibold text-white">Feminino</Text>
      </Pressable>
    </View>
  );
};

export default memo(GenderFilters);
