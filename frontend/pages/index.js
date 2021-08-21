import React,{useState,useEffect} from 'react';
import Home from "./home.js";
import Login from "./login.js";
import Test from "./test.js";
import ApolloClient from "apollo-boost";
import {ApolloProvider} from "@apollo/react-hooks";

// const axios = require('axios');

const client = new ApolloClient({
  uri: 'http://localhost:4000/grapphql'
})

export default function Index() {
  return (
    <ApolloProvider>
      <Test/>
    </ApolloProvider>
  )
}

// export default function Index() {
//   const [token, setToken] = useState(false);

//   useEffect(() => {
//     // You need to restrict it at some point
//     // This is just dummy code and should be replaced by actual
//     if (!token) {
//         authenticate();
//     }
//   }, []);


<<<<<<< Updated upstream
  const authenticate = async () => {
    await axios.get('http://localhost:8080/',{withCredentials: true})
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
=======
//   const authenticate = async () => {
//     await axios.get('http://localhost:8080'+'/',{withCredentials: true})
//     .then(response => {
//       console.log(response.status)
//       if (response.status == 200) {
//         console.log('hi')
//         setToken(true)
//       }
//     })
//     .catch((error) => {
//       // console.log(error)
//       setToken(false)
//     })
//   }
//   return (token?<Home/>:<Login/>);
// }
>>>>>>> Stashed changes
