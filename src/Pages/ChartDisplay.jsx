import React from "react";

import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";
import { useSelector } from "react-redux";

ChartJS.register(
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend
);

const ChartDisplay = () => {
  const data = useSelector((state) => state.itemsSlice.data);

  const date = new Date();
  let thisMonth = date.getMonth() + 1;
  let thisYear = date.getFullYear();

  let resultArr = data.filter((item) => {
    if (
      new Date(item.data.date).getMonth() + 1 == thisMonth &&
      new Date(item.data.date).getFullYear() == thisYear &&
      item.data.transactionType != "income"
    ) {
      return item;
    }
  });

  let expenses = resultArr.map((item) => item.data.amount);
  let dates = resultArr.map((item) => item.data.date);

  const charData = {
    labels: dates,
    datasets: [
      {
        label: "expense",
        data: expenses,
        borderColor: "#3949ab",
        backgroundColor: "#fefefe",
        tension: 0.4,
      },
    ],
  };

  const options = {};

  return (
    <div className="px-5 py-5">
      <h1 className="text-indigo-700 text-4xl text-center font-bold mb-8">
        Expense for this month
      </h1>
      <Line data={charData} options={options}></Line>
    </div>
  );
};

export default ChartDisplay;
