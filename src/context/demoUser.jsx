import { useReducer, createContext } from "react";
import { demoUserReducer, demoUserInitialState } from "../reducers/demoUser";

function useDemoUserReducer () {
  const [state, dispatch] = useReducer(demoUserReducer, demoUserInitialState)

  const setDemoUser = user => dispatch({
    type: 'SET_DEMO_USER',
    payload: user
  })

  const clearDemoUser = () => dispatch({ type: 'CLEAR_DEMO_USER' })

  return {state, setDemoUser, clearDemoUser}
}

export const DemoUserContext = createContext()

export function DemoUserProvider ({children}) {
  const {state, setDemoUser, clearDemoUser} = useDemoUserReducer()

  return (
    <DemoUserContext.Provider
    value={{
      isDemoUser: state.isDemoUser,
      setDemoUser,
      clearDemoUser
    }}>
      {children}
    </DemoUserContext.Provider>
  )
}