import React,{useState,useEffect} from 'react'

const [great,setGreat] = useState(0)
if (great) console.log("hi")
const Test:React.FC = () =>{
 
  useEffect(() =>{
    console.log("effected")
  }, [])
  
  return <button onClick={() => setGreat(1)}>waddup</button >
}

export default Test;