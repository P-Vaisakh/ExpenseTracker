import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAddTransactions } from "../firebase/useAddTransaction";
import { fetchItems } from "../Redux/itemsSlice";
import { useUpdatetransactions } from "../firebase/useUpdateTransactions";

export default function Modal({ show, setShow, itemData }) {
  // necessary states for updating and adding transactions
  const [transactionTitle, setTransactionTitle] = useState(
    itemData?.data.transactionTitle || ""
  );
  const [amount, setAmount] = useState(itemData?.data.amount || "");
  const [transactionType, setTransactionType] = useState(
    itemData?.data.transactionType || ""
  );
  const [category, setCategory] = useState(itemData?.data.category || "");
  const [date, setDate] = useState(itemData?.data.date || "");

  const { addTransaction } = useAddTransactions();
  const { updateTransaction } = useUpdatetransactions();

  const { uid } = useSelector((state) => state.user.user);
  const dispatch = useDispatch();

  // function for updating transaction
  const handleTransactionSubmit = async () => {
    if (
      transactionTitle == "" ||
      transactionType == "" ||
      amount == "" ||
      category == "" ||
      date == ""
    ) {
      toast.error("Feilds cannot be empty", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } else {
      const transactionObj = {
        uid,
        transactionTitle,
        amount,
        transactionType,
        category,
        date,
      };

      // custom hook for creating a transaction
      await addTransaction(transactionObj);

      dispatch(fetchItems(uid));
      setShow(false);
      toast.success("Transaction added successfully", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };

  // function for updating transaction
  const handleUpdate = async (id) => {
    if (
      transactionTitle == "" ||
      amount == "" ||
      transactionType == "" ||
      category == "" ||
      date == ""
    ) {
      toast.error("All feilds are required.", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } else {
      const transactionObj = {
        uid,
        transactionTitle,
        amount,
        transactionType,
        category,
        date,
      };

      // custom hook for updating transaction
      updateTransaction(id, transactionObj);
      dispatch(fetchItems(uid));
      setShow(false);
      toast.success("Transaction added successfully", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };

  return (
    <div
      className="fixed -inset-y-20 inset-x-0 z-10 overflow-y-auto"
      id="modal-container"
    >
      <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity">
          <div
            className="absolute inset-0 bg-gray-500 opacity-75"
            id="modal-container"
            onClick={() => setShow(false)}
          ></div>
        </div>
        {/* <!-- This element is to trick the browser into centering the modal contents. --> */}
        <span className="hidden sm:inline-block sm:align-middle sm:h-screen"></span>
        &#8203;
        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
          <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <h1 className="mb-2 text-xl text-center">
              Provide transaction details
            </h1>
            <div className="sm:flex sm:items-center justify-center">
              <div className="mt-3 text-center sm:mt-0 sm:ml-4 ">
                <form id="transactionForm" className="text-center w-full">
                  <input
                    required
                    type="text"
                    value={transactionTitle}
                    onChange={(e) => setTransactionTitle(e.target.value)}
                    className="appearance-none border border-blue-100 rounded px-4 py-3 mt-1 block  outline-none focus:border-blue-500   placeholder:text-black w-full "
                    placeholder="Transaction title"
                  />
                  <input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="appearance-none border border-blue-100 rounded px-4 py-3 mt-1 block  outline-none focus:border-blue-500 w-64  max-w-[420px] placeholder:text-black "
                    placeholder="Amount"
                  />
                  <select
                    value={transactionType}
                    className="border border-indigo-100 rounded px-4 py-3 mt-1 block  outline-none focus:border-blue-500 flex-1 w-full"
                    onChange={(e) => setTransactionType(e.target.value)}
                  >
                    <option value="" disabled>
                      Transaction type
                    </option>
                    <option value="income">Income</option>
                    <option value="expense">Expense</option>
                  </select>
                  <select
                    type="text"
                    value={category}
                    className="border border-indigo-100 rounded px-4 py-3 mt-1 block  outline-none focus:border-blue-500 flex-1 w-full"
                    onChange={(e) => setCategory(e.target.value)}
                  >
                    <option value="" disabled>
                      Category
                    </option>
                    <option value="home">Home</option>
                    <option value="groceries">Groceries</option>
                    <option value="travel">Travel</option>
                    <option value="eatout">Eat out</option>
                    <option value="shopping">Shopping</option>
                    <option value="entertainment">Entertainment</option>
                    <option value="others">others</option>
                  </select>
                  <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="appearance-none border border-blue-100 rounded px-4 py-3 mt-1 block  outline-none focus:border-blue-500 w-64  max-w-[420px]"
                    placeholder="Search A Transaction..."
                  />
                </form>
              </div>
            </div>
          </div>
          <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
            <span className="flex w-full rounded-md shadow-sm sm:ml-3 sm:w-auto">
              {itemData ? (
                <button
                  type="submit"
                  onClick={() => handleUpdate(itemData.id)}
                  className="inline-flex justify-center w-full rounded-md border border-transparent px-4 py-2 bg-green-600 text-base leading-6 font-medium text-white shadow-sm hover:bg-green-700 focus:outline-none focus:shadow-outline-red transition ease-in-out duration-150 sm:text-sm sm:leading-5"
                >
                  Update Transaction
                </button>
              ) : (
                <button
                  type="submit"
                  onClick={() => handleTransactionSubmit()}
                  className="inline-flex justify-center w-full rounded-md border border-transparent px-4 py-2 bg-green-600 text-base leading-6 font-medium text-white shadow-sm hover:bg-green-700 focus:outline-none focus:shadow-outline-red transition ease-in-out duration-150 sm:text-sm sm:leading-5"
                >
                  Submit
                </button>
              )}
            </span>
            <span className="mt-3 flex w-full rounded-md shadow-sm sm:mt-0 sm:w-auto">
              <button
                onClick={() => setShow(false)}
                className="inline-flex justify-center w-full rounded-md border border-gray-300 px-4 py-2 bg-white text-base leading-6 font-medium text-gray-700 shadow-sm hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue transition ease-in-out duration-150 sm:text-sm sm:leading-5"
              >
                Cancel
              </button>
            </span>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}
