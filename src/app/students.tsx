import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import { api } from "@/lib/api";
import { useQuery } from "react-query";
import { Student } from "@/types/student";

const fetchStudents = async (page: number) => {
  const res = await api.get(`?results=10&page=${page}`);
  return res.data.results;
};

const Students = () => {
  const [page, setPage] = useState(1);
  const [students, setStudents] = useState<Student[]>([]);

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

  return <View className="flex-1"></View>;
};

export default Students;
