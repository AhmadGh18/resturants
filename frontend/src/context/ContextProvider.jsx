import { createContext, useContext, useState } from "react";

const StateContext = createContext({
  User: null,
  setUser: () => {},
  setToken: () => {},
  token: null,
});
export const ContextProvider = ({ children }) => {
  const [User, setUser] = useState({});

  const [token, _setToken] = useState(localStorage.getItem("AccessToken"));

  const setToken = (token) => {
    _setToken(token);
    if (token) {
      window.localStorage.setItem("AccessToken", token);
    } else {
      localStorage.removeItem("AccessToken");
    }
  };

  return (
    <StateContext.Provider
      value={{
        User,
        token,
        setToken,

        setUser,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);

// const StateContext = createContext({
//   User: null,
//   setUser: () => {},
//   setToken: () => {},
//   token: null,
//   type: "",
//   setType: () => {},
// });

// export const ContextProvider = ({ children }) => {
//   const [User, setUser] = useState({});
//   const [type, setType] = useState("");

//   const [token, _setToken] = useState(localStorage.getItem("AccessToken"));
//   const setToken = (token) => {
//     _setToken(token);
//     if (token) {
//       window.localStorage.setItem("AccessToken", token);
//     } else {
//       localStorage.removeItem("AccessToken");
//     }
//   };

//   const updateUser = (userData) => {
//     setUser(userData);
//     localStorage.setItem("User", JSON.stringify(userData));
//   };
//   const updateType = (userType) => {
//     setType(userType);
//     localStorage.setItem("Type", JSON.stringify(userType)); // Corrected line
//   };

//   return (
//     <StateContext.Provider
//       value={{
//         User,
//         token,
//         setToken,
//         setUser: updateUser,
//         type,
//         setType: updateType, // Corrected line
//       }}
//     >
//       {children}
//     </StateContext.Provider>
//   );
// };

// export const useStateContext = () => useContext(StateContext);
