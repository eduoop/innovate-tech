import { View, Text, Pressable } from "react-native";
import React, { useEffect, useState } from "react";
import { api } from "@/lib/api";
import { Student } from "@/types/student";
import Search from "@/components/Search";
import ListStudents from "@/components/ListStudents";
import { colors } from "@/theme/colors";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Keyboard } from "react-native";
import ListStudentsSkeleton from "@/components/ListStudentsSkeleton";
import GenderFilters from "@/components/GenderFilters";
export interface GenderFilter {
  male: boolean;
  female: boolean;
}

const Students = () => {
  const [page, setPage] = useState(1);
  const [students, setStudents] = useState<Student[]>([]);
  const [search, setSearch] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [genderFilters, setGenderFilters] = useState<GenderFilter>({
    male: true,
    female: true,
  });

  const searchStudents = async () => {
    setIsLoading(true);
    try {
      const data = await api.get(
        `?results=10${page && `&page=${page}`}${search && `&search=${search}`}`,
      );
      setStudents(data.data.results);
      Keyboard.dismiss();
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const loadMore = () => {
    setPage(page + 1);
  };

  useEffect(() => {
    searchStudents();
  }, []);

  return (
    <View className="flex-1 items-center bg-primaryZinc-900 pt-16">
      <View className="mb-5 w-full items-center border-b-[1px] border-b-zinc-600/15 px-3 pb-4">
        <Text className="font-medium text-3xl text-primaryRed-900 ">
          InnovateTech
        </Text>
      </View>

      <View className="mb-32 w-full flex-1">
        <View className="gap-4 px-5">
          <View className="w-full flex-row items-center gap-3">
            <Search setValue={setSearch} value={search} />
            <Pressable onPress={searchStudents}>
              <Ionicons
                name={"arrow-forward-circle"}
                size={30}
                color={colors.white}
              />
            </Pressable>
          </View>
          <GenderFilters
            setGenderFilters={setGenderFilters}
            genderFilters={genderFilters}
          />
        </View>
        <View className="mb-50 mt-6 w-full px-5">
          {isLoading ? (
            <ListStudentsSkeleton count={10} />
          ) : (
            <ListStudents
              students={students}
              getMoreStudents={() => console.log(loadMore())}
            />
          )}
        </View>
      </View>
    </View>
  );
};

export default Students;
