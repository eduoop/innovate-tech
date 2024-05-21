import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import { api } from "@/lib/api";
import { useQuery } from "react-query";
import { Student } from "@/types/student";
import Search from "@/components/Search";

const fetchStudents = async (page: number) => {
  const res = await api.get(`?results=10&page=${page}`);
  return res.data.results;
};

const Students = () => {
  const [page, setPage] = useState(1);
  const [students, setStudents] = useState<Student[]>([]);
  const [search, setSearch] = useState("");

  const { isLoading, data } = useQuery(
    ["students", page],
    () => fetchStudents(page),
    {
      keepPreviousData: true,
    },
  );

  useEffect(() => {
    if (data) {
      setStudents((prev) => [...prev, ...data]);
    }
  }, [data]);

  const loadMore = () => {
    setPage((prevPage) => prevPage + 1);
  };

  if (isLoading) return <Text>Loading...</Text>;

  console.log(students, loadMore);

  console.log(search);

  return (
    <View className="flex-1 items-center bg-primaryZinc-900 pt-16">
      <View className="mb-5 w-full items-center border-b-[1px] border-b-zinc-600/15 px-3 pb-4">
        <Text className="font-medium text-3xl text-primaryRed-900 ">
          InnovateTech
        </Text>
      </View>
      <View className="w-full px-5">
        <Search setValue={setSearch} />
      </View>
    </View>
  );
};

export default Students;
