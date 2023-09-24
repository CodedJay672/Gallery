import React, { useState } from "react";
import Login from "./Login";
import useToken from "../App/useToken";

export default function ReqLogin({ children }) {
  const { token, setToken } = useToken();

  if (!token) {
    return <Login setToken={setToken} />;
  }

  return children;
}