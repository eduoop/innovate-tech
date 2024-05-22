import { View } from "react-native";
import React from "react";
import { Skeleton } from "./Skeleton";

interface ListStudentsSkeletonProps {
  count: number;
}

const ListStudentsSkeleton = ({ count }: ListStudentsSkeletonProps) => {
  return (
    <View className="w-full gap-4">
      {[...Array(count)].map((_, index) => (
        <Skeleton
          key={index + JSON.stringify(Math.random())}
          className="h-[80px] w-full rounded-2xl"
        />
      ))}
    </View>
  );
};

export default ListStudentsSkeleton;
