import { View, TextInput, Pressable } from "react-native";
import React, { Dispatch, SetStateAction, useCallback, useState } from "react";
import { colors } from "@/theme/colors";
import Ionicons from "@expo/vector-icons/Ionicons";
import { cn } from "@/lib/utils";

interface SearchProps {
  setValue: Dispatch<SetStateAction<string>>;
}

const Search = ({ setValue }: SearchProps) => {
  const [inputValue, setInputValue] = useState("");

  const debounce = (
    cb: (...callbackArgs: string[]) => void,
  ): ((...args: unknown[]) => void) => {
    let timeout: NodeJS.Timeout | null;
    return function (this: unknown[], ...args: unknown[]) {
      if (timeout) {
        clearTimeout(timeout);
      }
      timeout = setTimeout(() => {
        timeout = null;
        cb.apply(this, args as string[]);
      }, 1000);
    };
  };

  const onInput = (searchValue: string): void => {
    setValue(searchValue);
  };

  const onInputWithDebouncing = useCallback(debounce(onInput), []);

  return (
    <View className="w-full flex-row items-center gap-2 rounded-2xl border border-zinc-600/15 bg-zinc-800/20 px-4 py-1">
      <TextInput
        cursorColor={colors.primaryRed[900]}
        className="w-[90%] bg-transparent py-3 text-[16px] text-white"
        onChangeText={(e) => {
          setInputValue(e);
          onInputWithDebouncing(e);
        }}
        value={inputValue}
        placeholder="Search"
      />

      <Pressable
        onPress={() => {
          setValue("");
          setInputValue("");
        }}
        className={cn("hidden opacity-40", {
          block: inputValue.length > 0,
        })}
      >
        <Ionicons name={"close-circle"} size={22} color={colors.white} />
      </Pressable>
    </View>
  );
};

export default Search;
