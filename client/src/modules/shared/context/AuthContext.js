import React from "react";

const AuthContext = React.createContext();

const initialState = {
    isAuthenticated: localStorage.getItem("user") ? true : false,
    user:  localStorage.getItem("user") || null
}

const reducer = (state, action) => {
    console.log(action)
    switch (action.type) {
      case "LOGIN":
        localStorage.setItem("user", JSON.stringify(action.payload));
        return {
          ...state,
          isAuthenticated: true,
          user: action
        };
      case "LOGOUT":
        localStorage.clear();
        return {
          ...state,
          isAuthenticated: false,
          user: null
        };
      default:
        return state;
    }
  };

const AuthenticationProvider = ({children}) => {
    const [state, dispatch] = React.useReducer(reducer, initialState);
      return (
        <AuthContext.Provider value={{state, dispatch}}>
            {children}
        </AuthContext.Provider>
      )
  }


const useAuthentication = () => {
    const context = React.useContext(AuthContext)
    if (context === undefined) {
      throw new Error('useAuth must be used within a AutProvider')
    }
    return context
  }

export { useAuthentication, AuthenticationProvider }