import React from "react";

export const authContext = React.createContext();

const { Provider, Consumer } = authContext;
export { Provider, Consumer };
