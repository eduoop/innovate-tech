import { FlatList } from "react-native";
import React from "react";
import StudentCardItem from "./StudentCardItem";
import { Student } from "@/types/student";

interface ListStudentsProps {
  students: Student[];
  getMoreStudents: () => void;
}

const ListStudents = ({ students, getMoreStudents }: ListStudentsProps) => {
  return (
    <FlatList
      data={students}
      keyExtractor={(item, index) =>
        item.id.value ? item.id.value.toString() : `key-${index}`
      }
      renderItem={({ item }) => <StudentCardItem student={item} />}
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}
      contentContainerClassName="gap-4"
      onEndReached={() => getMoreStudents()}
    />
  );
};

export default ListStudents;
