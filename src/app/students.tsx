import React, { useContext, useEffect, useState } from "react";
import { View, Text, Pressable, Keyboard } from "react-native";
import { api } from "@/lib/api";
import { Student } from "@/types/student";
import Search from "@/components/Search";
import ListStudents from "@/components/ListStudents";
import { colors } from "@/theme/colors";
import Ionicons from "@expo/vector-icons/Ionicons";
import AntDesign from "@expo/vector-icons/AntDesign";
import ListStudentsSkeleton from "@/components/ListStudentsSkeleton";
import GenderFilters from "@/components/GenderFilters";
import { BottomSheetMenu } from "@/components/BottomSheetMenu";
import { StudentsContext } from "@/contexts/StudentsContext";
import useStorage from "@/hooks/useStorage";
import { getStudentsApi } from "@/utils/getStudentsApi";

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

  const searchStudents = () => {
    const nameFilterLower = search.toLowerCase().trim();
    const filterByName = (student: StudentsSelectedFields) =>
      student.name.first.toLowerCase().includes(nameFilterLower) ||
      student.name.last.toLowerCase().includes(nameFilterLower);

    const genderFilteredStudents = students.filter(
      (student) =>
        (genderFilters.male && student.gender === "male") ||
        (genderFilters.female && student.gender === "female"),
    );

    const nameAndGenderFilteredStudents =
      genderFilteredStudents.filter(filterByName);

    setFilteredStudents(nameAndGenderFilteredStudents);
    Keyboard.dismiss();
  };

  const filterStudents = (studentsParam?: StudentsSelectedFields[]) => {
    const filteredStudents = (studentsParam || students).filter(
      (student) =>
        (genderFilters.male && student.gender === "male") ||
        (genderFilters.female && student.gender === "female"),
    );
    setFilteredStudents(filteredStudents);
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

  const getRandomStudentsApi = async () => {
    setIsLoading(true);
    const data = await getStudentsApi();
    data && setStudents(data);
    data && setFilteredStudents(data);
    setIsLoading(false);
    Keyboard.dismiss();
  };

  const resetStudents = () => {
    setFilteredStudents(students);
  };

  useEffect(() => {
    filterStudents();
  }, [genderFilters]);

  useEffect(() => {
    getStudents();
  }, []);

  return (
    <View className="flex-1 items-center bg-primaryZinc-900 pt-16">
      <Pressable
        onPress={getRandomStudentsApi}
        className="mb-5 w-full items-center border-b-[1px] border-b-zinc-600/15 px-3 pb-4"
      >
        <Text className="font-medium text-3xl text-primaryRed-900">
          InnovateTech
        </Text>
      </Pressable>

      <View className="w-full flex-1">
        <View className="gap-4 px-5">
          <View className="w-full flex-row items-center gap-3">
            <Search
              setValue={setSearch}
              value={search}
              resetStudents={resetStudents}
            />
            {!isLoading ? (
              <Pressable
                onPress={search ? searchStudents : getRandomStudentsApi}
              >
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
              getMoreStudents={
                !search || (!search && filteredStudents.length >= 20)
                  ? loadMore
                  : () => {}
              }
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
