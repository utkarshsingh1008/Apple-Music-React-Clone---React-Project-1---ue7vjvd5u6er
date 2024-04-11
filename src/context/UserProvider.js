import { useState, useContext, createContext } from "react";
const userContext = createContext();

export const UserProvider = ({ children })=> {
  const [name, setName] = useState(sessionStorage.getItem('name'));
  const [token, setToken] = useState(sessionStorage.getItem('token'));

  const onTokenHandeler = (data) => {
    setToken(data);
    sessionStorage.setItem('token',data);
  };

  const onNameHandeler = (data) => {
    setName(data);
    sessionStorage.setItem('name',data);
  };

  const object = {
    token,
    name,
    onTokenHandeler,
    onNameHandeler,
  };
  return (
    <div>
      <userContext.Provider value={object}>{children}</userContext.Provider>
    </div>
  );
}
export function useUser() {
  return useContext(userContext);
}

