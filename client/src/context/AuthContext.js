import { createContext, useEffect, useReducer } from "react";

const INITIAL_STATE = {
  user: JSON.parse(localStorage.getItem("user")) || null,
  loading: false,
  error: null,
  isAdmin:JSON.parse(localStorage.getItem("isAdmin"))||false
};

export const AuthContext = createContext(INITIAL_STATE);

const AuthReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN_START":
      return {
        user: null,
        loading: true,
        error: null,
        isAdmin:false
      };
    case "LOGIN_SUCCESS":
      console.log("this",action.payload)
      return {
        user: action.payload.username,
        loading: false,
        error: null,
        isAdmin:action.payload.isAdmin===false||action.payload.isAdmin==='false'?false:true
      };
    case "LOGIN_FAILURE":
      return {
        user: null,
        loading: false,
        error: action.payload,
        isAdmin:false
      };
    case "LOGOUT":
      return {
        user: null,
        loading: false,
        error: null,
        isAdmin:false
      };
    default:
      return state;
  }
};

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE);

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(state.user));
    localStorage.setItem("isAdmin", JSON.stringify(state.isAdmin));
  }, [state.user]);

  return (
    <AuthContext.Provider
      value={{
        user: state.user,
        loading: state.loading,
        error: state.error,
        dispatch,
        isAdmin:state.isAdmin
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
