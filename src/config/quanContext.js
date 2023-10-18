import { createContext, useState, useContext } from "react";

const QuanContext = createContext();

export const QuanProvider = ({ children }) => {
  const [quanNum, setQuanNum] = useState(0);

  return (
    <QuanContext.Provider value={{ quanNum, setQuanNum }}>
      {children}
    </QuanContext.Provider>
  );
};

export default QuanContext;
