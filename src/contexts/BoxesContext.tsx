import React from "react";

export const UserContext = React.createContext<any>(null);

export default function App() {
  return (
    <UserContext.Provider value="Reed">
      <User />
    </UserContext.Provider>
  );
}

function User() {
  const value = React.useContext(UserContext);

  return <h1>{value}</h1>;
}
