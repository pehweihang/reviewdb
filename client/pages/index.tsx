import React,{useEffect,useState} from 'react'
import { setAccessToken } from '../components/accessToken';
import { useByeQuery } from '../generated/graphql';
import Home from './home'
import LoginRegister from './loginregister'


const Index:React.FC = () => {
  const [Loading, setLoading] = useState(true);

  useEffect(() => {
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
    const { data, loading, error } = useByeQuery({
      fetchPolicy: "network-only"
    });

      if (loading) {
        return <div>loading...</div>;
      }

      if (error) {
        console.log(error);
        return <LoginRegister/>;
      }

      if (!data) {
        return <div>no data</div>;
      }

      return <Home/>;
    }
  else {
    return <div>something else...</div>
  }
}

export default Index;