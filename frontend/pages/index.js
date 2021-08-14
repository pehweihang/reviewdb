import React,{useState,useEffect} from 'react';
import Home from "./home.js";
import Login from "./login.js";
import { useRouter } from 'next/router'
const axios = require('axios');


export default function Index() {
  console.log("wtf")
  const [token, setToken] = useState(false);

  useEffect(() => {
    console.log("working")
    // You need to restrict it at some point
    // This is just dummy code and should be replaced by actual
    if (!token) {
        authenticate();
    }
  }, []);


  const authenticate = async () => {
    console.log("authenticating")
    await axios.get('http://localhost:8080'+'/',{withCredentials: true})
    .then(response => {
      console.log(response.status)
      if (response.status == 200) {
        console.log('hi')
        setToken(true)
      }
    })
    .catch((error) => {
      // console.log(error)
      setToken(false)
    })
  }
  return (token?<Home/>:<Login/>);
}