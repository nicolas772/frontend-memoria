import { useContext } from "react";
import { DemoUserContext } from "../context/demoUser";

export const useDemoUser = () => {
  const context = useContext(DemoUserContext)

  if (context === undefined) {
    throw new Error('useDemoUser debe ser usado con el DemoUserProvider')
  }

  return context
}