import { createContext, useEffect, useState } from "react";

export const UserOptions = createContext();

export const UserOptionsProvider = ({ children }) => {
  const getSettings = () => {
    return JSON.parse(localStorage.get("options"));
  };
  const [options, setOptions] = useState(getSettings());

  const changeSettings = (key, value) => {
    setOptions((prev) => {
      const temp = { ...prev, [key]: value };
      localStorage.setItem("options", JSON.stringify(temp));
      return temp;
    });
  };

  return (
    <UserOptionsProvider.Provider value={[options, changeSettings]}>
      {children}
    </UserOptionsProvider.Provider>
  );
};
