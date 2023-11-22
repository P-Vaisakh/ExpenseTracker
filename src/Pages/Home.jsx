import React from "react";
import Dashboard from "../Components/Dashboard";
import SearchAndAdd from "../Components/SearchAndAdd";
import TransactionList from "../Components/TransactionList";

const Home = () => {
  return (
    <div className="">
      <Dashboard></Dashboard>
      <SearchAndAdd></SearchAndAdd>
      <TransactionList></TransactionList>
    </div>
  );
};

export default Home;
