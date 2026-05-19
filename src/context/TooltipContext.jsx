"use client";

import { createContext, useContext, useState } from "react";

const TooltipContext = createContext();

export const TooltipProvider = ({ children }) => {
  const [tooltip, setTooltip] = useState(null);

  return (
    <TooltipContext.Provider
      value={{
        tooltip,
        setTooltip,
      }}
    >
      {children}
    </TooltipContext.Provider>
  );
};

export const useTooltip = () => useContext(TooltipContext);
