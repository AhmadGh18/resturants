import { createContext, useContext, useState } from "react";

const StateContext = createContext({
  User: null,
  setUser: () => {},
  setToken: () => {},
  token: null,
  RegestrationInfo: null,
  setRegistrationInfo: () => {},
  restaurant: null,
  setRestaurant: () => {},
});
export const ContextProvider = ({ children }) => {
  const [User, setUser] = useState({});
  const [restaurant, setRestaurant] = useState({});
  const [RegestrationInfo, setRegistrationInfo] = useState({
    name: "",
    city: "",
    phoneNumber: "",
    longitude: "",
    latitude: "",
    profile_picture: null,
    user_id: "",
    type: "",
  });

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
        RegestrationInfo,
        setRegistrationInfo,
        setUser,
        setRestaurant,
        restaurant,
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
