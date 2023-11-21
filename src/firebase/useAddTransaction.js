import { addDoc, collection } from "firebase/firestore";
import { db } from "./firebase";

export const useAddTransactions = () => {
  const transactionCollectionRef = collection(db, "transactions");
  const addTransaction = async (transactionObj) => {
    try {
      await addDoc(transactionCollectionRef, transactionObj);
    } catch (err) {
      return err
    }
  };
  return { addTransaction };
};
