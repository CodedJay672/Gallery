import React from "react";
import { toast } from "react-toastify";
import Login from "./Login";
import useToken from "../App/useToken";

export default function ReqLogin({ children }) {
  const { token, setToken } = useToken();
  
  if (!token) {
    toast.error("You are not logged in!", {
      position: "bottom-right"
    });
    return <Login setToken={setToken} />;
  }

  return children;
}