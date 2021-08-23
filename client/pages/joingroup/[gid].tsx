import React, {useState,useEffect} from 'react';
import router from "next/router";
import { getAccessToken } from '../../components/accessToken';
import { useJoinGroupMutation } from '../../generated/graphql';
import { refreshToken } from '../../components/refreshToken';


const Joingroup:React.FC = () => {
  const [loading,setLoading] = useState(true);
  useEffect(() => {
    refreshToken(setLoading);
  }, [])
 
  const [sendreq] = useJoinGroupMutation();
  const sendJoinGroupReq = async() => {
    const { gid } = router.query as any;
    try{
    const response = await sendreq({
      variables: {
        joinGroupToken:gid,
      },
    });
    router.push("/?referer=joingroup");
    } catch(error){
      console.log(error);
    }
    
  }
  if (!loading && getAccessToken()) sendJoinGroupReq();


  return <div>Joining group...</div>
}

export default Joingroup;