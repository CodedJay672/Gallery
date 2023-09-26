import React from "react";
import Login from "./Login";
import useToken from "../App/useToken";
import { toast } from "react-toastify";

const userContext = React.createContext();

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