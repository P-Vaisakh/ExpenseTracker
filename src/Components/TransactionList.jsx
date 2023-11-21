import React, { useEffect, useState } from "react";
import { FaEdit } from "react-icons/fa";
import { useSelector } from "react-redux";
import "react-toastify/dist/ReactToastify.css";
import Modal from "./Modal";

const TransactionList = () => {
  const [itemData, setItemData] = useState({});
  const data = useSelector((state) => state.itemsSlice.data);
  const [show, setShow] = useState(false);

  const handleClick = (data) => {
    setItemData(data);
    setShow(true);
  };

  return (
    <div
      className="mt-4 px-4 lg:w-4/5 flex flex-col gap-3 py-4 mx-auto max-w-4xl"
      id="transactions"
    >
      {data.length > 0 ? (
        data.map((item) => (
          <div
            className=" flex items-center justify-center gap-4 border border-indigo-500 p-2 rounded-md "
            key={item.id}
          >
            <h1
              className={`text-3xl font-bold ${
                item.data.transactionType == "income"
                  ? "text-green-500"
                  : "text-red-500"
              }`}
            >
              $ {item.data.amount}
            </h1>
            <div>
              <h1 className="font-bold text-slate-600 text-xl">
                {item.data.transactionTitle}
              </h1>
              <h1 className="text-slate-500">{item.data.date}</h1>
            </div>
            <div className="flex-1 px-4 flex justify-end">
              {" "}
              <button onClick={() => handleClick(item)}>
                <FaEdit className="text-indigo-600 text-lg" />
              </button>
            </div>
          </div>
        ))
      ) : (
        <div className="w-screen text-center mt-10 mx-auto lg:w-4/5"> 
          <h1 className="font-bold text-lg">No transactions to show</h1>
        </div>
      )}
      {show && (
        <Modal show={show} setShow={setShow} itemData={itemData}></Modal>
      )}
    </div>
  );
};

export default TransactionList;
