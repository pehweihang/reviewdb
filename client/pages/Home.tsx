import React from "react";
import { useHelloQuery } from "../generated/graphql";

const Home: React.FC = () => {
  const { data, loading} = useHelloQuery()

  if (loading || !data) {
    return <div>loading...</div>;
  }

  return <div>{data.hello}</div>;
};

export default Home;