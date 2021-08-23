import React, {useEffect} from 'react';
import router from "next/router";

const sendJoinGrouprReq = async() => {
  const response = await randomMutation();
  if (response && response.data) router.push("/");
}

const Joingroup:React.FC = () => {
  useEffect(() => {
    sendJoinGrouprReq()
  }, [])
  return <div>Joining group...</div>
}