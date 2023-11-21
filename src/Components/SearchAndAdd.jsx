import React, { useState } from "react";
import Modal from "./Modal";
import { useDispatch } from "react-redux";
import { searchItem } from "../Redux/itemsSlice";

const SearchAndAdd = () => {
  const [show, setShow] = useState(false);
  const dispatch = useDispatch();

  return (
    <div className="w-screen h-16 flex items-center justify-center  md:px-10 px-4 gap-4 py-2">
      <input
        onChange={(e) => dispatch(searchItem(e.target.value))}
        type="text"
        className="appearance-none border border-blue-100 rounded px-4 py-3 mt-1 block  outline-none focus:border-blue-500 flex-1 max-w-[420px] placeholder:text-black"
        placeholder="Search A Transaction..."
      />
      <button
        onClick={() => setShow(true)}
        className="bg-indigo-500 rounded-lg text-white h-full px-3 font-semibold border-none hover:bg-indigo-600 transition-all duration-200"
      >
        Add a transaction
      </button>

      {show && <Modal show={show} setShow={setShow} />}
    </div>
  );
};

export default SearchAndAdd;
