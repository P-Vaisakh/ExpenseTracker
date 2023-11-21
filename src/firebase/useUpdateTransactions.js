import { doc, updateDoc } from "firebase/firestore";
import { db } from "./firebase";

export const useUpdatetransactions = () => {
    
  // getting the corresponding id of the doc and data to be updated
  const updateTransaction = async (id, data) => {
    const transactionref = doc(db, "transactions", id);
    await updateDoc(transactionref, data);
  };
  return { updateTransaction };
};
