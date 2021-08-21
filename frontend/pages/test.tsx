import React from "react";
import { useQuery } from "@apollo/react-hooks";
import { gpl } from "apollo-boost";

export default const Test: React.FC = () =>{
  const {} = useQuery(gql`
    {
      hello
    }
  `);

  return <div>pensi</div>;
})