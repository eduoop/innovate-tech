import { FlatList, Text } from "react-native";
import React from "react";
import StudentCardItem from "./StudentCardItem";
import { StudentsSelectedFields } from "@/app/students";

interface ListStudentsProps {
  students: StudentsSelectedFields[];
  getMoreStudents: () => void;
  isLoadingMore: boolean;
}

const ListStudents = ({
  students,
  getMoreStudents,
  isLoadingMore,
}: ListStudentsProps) => {
  return (
    <FlatList
      data={students}
      keyExtractor={(item, index) =>
        item.id.value ? item.id.value.toString() : `key-${index}`
      }
      renderItem={({ item, index }) => (
        <>
          <StudentCardItem student={item} />
          {index === students.length - 1 && isLoadingMore && (
            <Text className="mt-5 text-center text-lg font-semibold text-white">
              Carregando...
            </Text>
          )}
        </>
      )}
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}
      contentContainerClassName="gap-4 pb-20"
      onEndReached={getMoreStudents}
    />
  );
};

export default ListStudents;
