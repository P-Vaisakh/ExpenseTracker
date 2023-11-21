import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const user = useSelector((state) => state.user.user);
  const { forDashboard } = useSelector((state) => state.itemsSlice);

  const [stats, setStats] = useState({});

  useEffect(() => {
    // updating the dashboard with necessary details from itemsslice
    let income = 0;
    let balance = 0;
    let expense = 0;
    if (forDashboard.length > 0) {
      forDashboard.map((item) => {
        if (item.data.transactionType == "income") {
          income += Number(item.data.amount);
        } else {
          expense += Number(item.data.amount);
        }
      });
    }
    balance = income - expense;
    setStats({ balance, income, expense });
  }, [forDashboard]);

  return (
    <div className="w-screen h-64 bg-indigo-600 p-3 md:p-4 flex flex-col md:flex-row md:gap-14 items-center md:justify-center">
      <h1 className="text-white text-center md:text-start text-3xl font-bold md:self-center md:text-6xl">
        Welcome {user.displayName}
      </h1>
      <div className="py-5 md:items-start">
        <div className="text-center md:text-left">
          <h1 className="text-gray-50 text-opacity-90 text-2xl">
            Account Balance :{" "}
            <span className="font-bold text-white opacity-100">
              {" "}
              $ {stats.balance}
            </span>
          </h1>
        </div>
        <div className="flex  gap-2 mt-5 justify-center md:justify-start">
          <div className="bg-[#00A86B] rounded-xl py-2 px-4 text-white text-center flex justify-center gap-2 ">
            <div className="bg-white rounded-xl  self-center py-2 px-3">
              <img src="/expense.png" alt="" className="object-contain" />
            </div>
            <div>
              <h1 className="font-bold text-lg">Income</h1>
              <h1 className="font-bold text-xl">$ {stats.income}</h1>
            </div>
          </div>
          <div className="bg-[#FD3C4A] rounded-xl py-2 px-4 text-white text-center flex justify-center gap-2">
            <div className="bg-white rounded-xl  self-center py-2 px-3">
              <img src="/income.png" alt="" className="object-contain" />
            </div>
            <div>
              <h1 className="font-bold text-lg">Expense</h1>
              <h1 className="font-bold text-xl">$ {stats.expense}</h1>
            </div>
          </div>
        </div>
        <div className="w-screen text-center">
          <Link to="/chart">
            <button className="bg-slate-100 my-3 px-4 py-2 rounded-lg text-indigo-600 font-bold">
              View spending for this month
            </button>
          </Link>
        </div>{" "}
      </div>
    </div>
  );
};

export default Dashboard;
