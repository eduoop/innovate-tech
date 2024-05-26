import { View, Text, Pressable } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { api } from "@/lib/api";
import { Student } from "@/types/student";
import Search from "@/components/Search";
import ListStudents from "@/components/ListStudents";
import { colors } from "@/theme/colors";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Keyboard } from "react-native";
import ListStudentsSkeleton from "@/components/ListStudentsSkeleton";
import GenderFilters from "@/components/GenderFilters";
import { BottomSheetMenu } from "@/components/BottomSheetMenu";
import AntDesign from "@expo/vector-icons/AntDesign";
import { StudentsContext } from "@/contexts/StudentsContext";
import useStorage from "@/hooks/useStorage";
export interface GenderFilter {
  male: boolean;
  female: boolean;
}

export interface StudentsSelectedFields extends Partial<Student> {
  gender: Student["gender"];
  id: Student["id"];
  name: Student["name"];
  registered: Student["registered"];
  picture: Student["picture"];
}

const Students = () => {
  const [page, setPage] = useState(1);
  const [students, setStudents] = useState<StudentsSelectedFields[]>([]);
  const [filteredStudents, setFilteredStudents] = useState<
    StudentsSelectedFields[]
  >([]);
  const [search, setSearch] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [genderFilters, setGenderFilters] = useState<GenderFilter>({
    male: true,
    female: true,
  });
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  const { setStorageArray, getStorageValue } = useStorage();

  const { bottomSheetUseRef, student, handleBottomMenuClose } =
    useContext(StudentsContext);

  const getStudents = async () => {
    setIsLoading(true);

    const cachedStudents = await getStorageValue("students");

    if (cachedStudents) {
      setStudents(cachedStudents);
      setFilteredStudents(cachedStudents);
      setIsLoading(false);
      return;
    }

    try {
      const data = await api.get(`?results=20&page=${page}`);
      setStudents(data.data.results);
      setFilteredStudents(data.data.results);
      setStorageArray("students", data.data.results);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const searchStudents = async () => {
    setIsLoading(true);
    try {
      const data = await api.get(
        `?results=20${page && `&page=${page}`}${search && `&search=${search}`}`,
      );
      setStudents(data.data.results);
      filterStudents(data.data.results);
      Keyboard.dismiss();
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const filterStudents = (studentsParam?: StudentsSelectedFields[]) => {
    if (genderFilters.male && genderFilters.female) {
      setFilteredStudents(studentsParam ? studentsParam : students);
    } else if (!genderFilters.male && !genderFilters.female) {
      setFilteredStudents(studentsParam ? studentsParam : students);
    } else {
      if (studentsParam) {
        const filteredStudents = studentsParam.filter((student) => {
          return (
            (student.gender === "male" && genderFilters.male) ||
            (student.gender === "female" && genderFilters.female)
          );
        });
        setFilteredStudents(filteredStudents);
      } else {
        const filteredStudents = students.filter((student) => {
          return (
            (student.gender === "male" && genderFilters.male) ||
            (student.gender === "female" && genderFilters.female)
          );
        });
        setFilteredStudents(filteredStudents);
      }
    }
  };

  const loadMore = () => {
    setIsLoadingMore(true);
    setPage(page + 1);
    api
      .get(`?results=20&page=${page}${search && `&search=${search}`}`)
      .then((response) => {
        setStudents([...students, ...response.data.results]);
        filterStudents();
        setIsLoadingMore(false);
      });
  };

  useEffect(() => {
    filterStudents();
  }, [genderFilters]);

  useEffect(() => {
    getStudents();
  }, []);

  return (
    <View className="flex-1 items-center bg-primaryZinc-900 pt-16">
      <View className="mb-5 w-full items-center border-b-[1px] border-b-zinc-600/15 px-3 pb-4">
        <Text className="font-medium text-3xl text-primaryRed-900 ">
          InnovateTech
        </Text>
      </View>

      <View className="w-full flex-1">
        <View className="gap-4 px-5">
          <View className="w-full flex-row items-center gap-3">
            <Search setValue={setSearch} value={search} />
            {!isLoading ? (
              <Pressable onPress={searchStudents}>
                <Ionicons
                  name={"arrow-forward-circle"}
                  size={32}
                  color={colors.white}
                />
              </Pressable>
            ) : (
              <AntDesign
                name={"loading2"}
                className="animate-spin"
                size={32}
                color={colors.white}
              />
            )}
          </View>
          <GenderFilters
            setGenderFilters={setGenderFilters}
            genderFilters={genderFilters}
          />
        </View>
        <View className="mt-6 w-full flex-1 px-5">
          {isLoading ? (
            <ListStudentsSkeleton count={10} />
          ) : (
            <ListStudents
              students={filteredStudents}
              isLoadingMore={isLoadingMore}
              getMoreStudents={loadMore}
            />
          )}
        </View>
      </View>
      {student && (
        <BottomSheetMenu
          onClose={handleBottomMenuClose}
          ref={bottomSheetUseRef}
        />
      )}
    </View>
  );
};

export default Students;
