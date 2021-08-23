import router from 'next/router';
import React,{useEffect,useState} from 'react'
import { getAccessToken, setAccessToken } from '../components/accessToken';
import Home from './home'
import LoginRegister from './loginregister'


const Index:React.FC = () => {
  const [Loading, setLoading] = useState(true);

  useEffect(() => {
    console.log("page entered");
    fetch("http://localhost:8080/auth/token_refresh", {
      method: "POST",
      credentials: "include"
    }).then(async x => {
      const { accessToken } = await x.json();
      setAccessToken(accessToken);
      setLoading(false);
    });
  }, []);
  if (!Loading){
    if (getAccessToken()) return <Home/>;
    else return <LoginRegister/>
  }
  return <div>hi</div>
}

export default Index;