import React from "react";
import { getAccessToken, setAccessToken } from "./accessToken";


export const refreshToken = (setLoading: React.Dispatch<React.SetStateAction<boolean>>) => {
  fetch("http://localhost:8080/auth/token_refresh", {
  method: "POST",
  credentials: "include"
}).then(async x => {
  const { accessToken } = await x.json();
  setAccessToken(accessToken);
  setLoading(false);
});
}