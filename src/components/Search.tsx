import { View, TextInput, Pressable } from "react-native";
import React, { Dispatch, SetStateAction, memo } from "react";
import { colors } from "@/theme/colors";
import Ionicons from "@expo/vector-icons/Ionicons";
import { cn } from "@/lib/utils";

interface SearchProps {
  setValue: Dispatch<SetStateAction<string>>;
  value: string;
  resetStudents: () => void;
}

const Search = ({ setValue, value, resetStudents }: SearchProps) => {
  return (
    <View className="flex-1 flex-row items-center gap-2 rounded-2xl border border-zinc-600/15 bg-zinc-800/20 px-4 py-1">
      <TextInput
        cursorColor={colors.primaryRed[900]}
        className="w-[90%] bg-transparent py-3 text-[16px] text-white"
        onChangeText={setValue}
        value={value}
        placeholder="Buscar aluno..."
      />

      <Pressable
        onPress={() => {
          setValue("");
          resetStudents();
        }}
        className={cn("hidden opacity-40", {
          block: value.length > 0,
        })}
      >
        <Ionicons name={"close-circle"} size={22} color={colors.white} />
      </Pressable>
    </View>
  );
};

export default memo(Search);
