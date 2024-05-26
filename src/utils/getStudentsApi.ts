import { StudentsSelectedFields } from "@/app/students";
import { api } from "@/lib/api";

export const getStudentsApi = async (): Promise<
  StudentsSelectedFields[] | undefined
> => {
  const randomPage = Math.floor(Math.random() * 10) + 1;
  const data = await api.get(`?results=20&page=${randomPage}`);
  return data.data.results;
};
