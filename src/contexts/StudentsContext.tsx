import { StudentsSelectedFields } from "@/app/students";
import BottomSheet from "@gorhom/bottom-sheet/lib/typescript/components/bottomSheet/BottomSheet";
import {
  Dispatch,
  SetStateAction,
  createContext,
  useRef,
  useState,
} from "react";
import React from "react";

interface StudentsProps {
  bottomSheetUseRef: React.RefObject<BottomSheet>;
  handleBottomMenuPress: () => void;
  handleBottomMenuClose: () => void;
  student?: StudentsSelectedFields;
  setStudent: Dispatch<SetStateAction<StudentsSelectedFields | undefined>>;
}

export const StudentsContext = createContext<StudentsProps>(
  {} as StudentsProps,
);

export const StudentsProvider = ({ children }: React.PropsWithChildren) => {
  const [student, setStudent] = useState<StudentsSelectedFields>();

  const bottomSheetUseRef = useRef<BottomSheet>(null);

  const handleBottomMenuPress = () => {
    bottomSheetUseRef.current?.expand();
  };

  const handleBottomMenuClose = () => {
    bottomSheetUseRef.current?.snapToIndex(0);
  };

  const value: StudentsProps = {
    bottomSheetUseRef,
    handleBottomMenuPress,
    handleBottomMenuClose,
    setStudent,
    student,
  };
  return (
    <StudentsContext.Provider value={value}>
      {children}
    </StudentsContext.Provider>
  );
};
