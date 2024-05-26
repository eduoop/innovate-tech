import AsyncStorage from "@react-native-async-storage/async-storage";

const useStorage = () => {
  const setStorageArray = async (key: string, value: unknown) => {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem(key, jsonValue);
    } catch (e) {
      console.log(e);
    }
  };

  const getStorageValue = async (key: string) => {
    try {
      const jsonValue = await AsyncStorage.getItem(key);
      return jsonValue !== null ? JSON.parse(jsonValue) : null;
    } catch (e) {
      console.log(e);
    }
  };

  return { AsyncStorage, getStorageValue, setStorageArray };
};

export default useStorage;
