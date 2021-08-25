import router from 'next/router';
import React,{useEffect,useState} from 'react'
import { getAccessToken } from '../components/accessToken';
import { refreshToken } from '../components/refreshToken';
import Home from '../routes/home'
import LoginRegister from '../routes/loginregister'


const Index:React.FC = () => {
  const [Loading, setLoading] = useState(true);

  useEffect(() => {
    console.log("page entered");
    refreshToken(setLoading);
  }, []);
  if (!Loading){
    console.log(getAccessToken());
    if (getAccessToken()) return <Home/>;
    else return <LoginRegister/>
  }
  return <div>loading...</div>
}

export default Index;