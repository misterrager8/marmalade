import { createContext, useEffect, useState } from "react";

export const MultiContext = createContext();

export default function MultiProvider({ children }) {
  const [theme, setTheme] = useState(
    localStorage.getItem("marmalade-theme") || "dark"
  );
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    localStorage.setItem("marmalade-theme", theme);
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  const contextValue = {
    theme: theme,
    setTheme: setTheme,
    loading: loading,
    setLoading: setLoading,
  };

  return (
    <MultiContext.Provider value={contextValue}>
      {children}
    </MultiContext.Provider>
  );
}
