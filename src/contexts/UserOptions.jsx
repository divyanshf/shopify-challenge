import { createContext, useEffect, useState } from "react";

export const UserOptions = createContext();

export const UserOptionsProvider = ({ children }) => {
  const getSettings = () => {
    const temp = localStorage.getItem("options");
    if (temp) {
      return JSON.parse(temp);
    }
    return {
      scrollData: true,
    };
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
    <UserOptions.Provider value={[options, changeSettings]}>
      {children}
    </UserOptions.Provider>
  );
};
