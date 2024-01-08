import axios from "axios";
import { createContext, useContext, useEffect, useMemo, useState } from "react";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  
  const [token, setToken_] = useState(localStorage.getItem("token"));

  
  const setToken = (newToken) => {
    setToken_(newToken);
  };


  //Clear token state, token local storage and reset axios auth header
  const logout = () => {
    setToken_(null); 
    localStorage.removeItem('token');
    localStorage.removeItem('username'); 
    delete axios.defaults.headers.common['Authorization']; 
  }

  useEffect(() => {
    if (token) {
      axios.defaults.headers.common["Authorization"] = "Bearer " + token;
      localStorage.setItem('token',token);
    } else {
      delete axios.defaults.headers.common["Authorization"];
      localStorage.removeItem('token')
    }
  }, [token]);

  // Memoized value of the authentication context
  const contextValue = useMemo(
    () => ({
      token,
      setToken,
      logout,
    }),
    [token]
  );

  
  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};

export default AuthProvider;