import React, {useState,useEffect} from 'react';
import router from "next/router";
import { getAccessToken } from '../../components/accessToken';
import { useJoinGroupMutation } from '../../generated/graphql';
import { refreshToken } from '../../components/refreshToken';

const Joingroup:React.FC = () => {
  const [loading,setLoading] = useState(true);
  const [sendreq] = useJoinGroupMutation();
  useEffect(() => {
    refreshToken(setLoading);
  }, [])
  
  const sendJoinGroupReq = async() => {
    const { gid } = router.query as any;
    console.log("access token:",getAccessToken())
    console.log('sent req')
    try{
      const response=await sendreq({
        variables: {
          joinGroupToken:gid,
        },
      })
      if (response) {
        console.log("accesstoken after joining:",getAccessToken());
        console.log("logged in and joined group");
        router.push('/');
      }
    } catch(error) {
      console.log("error: not logged in",error);
      router.push(`/?referer=joingroup/${gid}`)
    }
  }
  if (!loading) sendJoinGroupReq();
  return <div>Joining group...</div>
}

export default Joingroup;