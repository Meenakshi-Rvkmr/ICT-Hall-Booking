import { createContext, useEffect, useReducer } from "react";
import Reducer from "./Reducer";

const userValue = localStorage.getItem("user") === "undefined" ? null : JSON.parse(localStorage.getItem("user"))
const INITIAL_STATE = {
  //  user : localStorage.getItem("user")!=undefined?JSON.parse(localStorage.getItem("user")): null,
  user: { "user": userValue, token: (localStorage.getItem("token")) } || null,
  isFetching: false,
  error: false,
}

export const Context = createContext(INITIAL_STATE);

export const ContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(Reducer, INITIAL_STATE);
  console.log("state", state)
  useEffect(() => {
    if (state.user) {
      localStorage.setItem("user", JSON.stringify(state.user.user));
      localStorage.setItem("token", (state.user.token));
    }

  }, [state.user]);

  return (
    <Context.Provider
      value={{
        user: state.user,
        isFetching: state.isFetching,
        error: state.error,
        dispatch,
      }}
    >
      {children}
    </Context.Provider>
  );
};