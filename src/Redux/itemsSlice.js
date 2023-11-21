import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../firebase/firebase";

export const fetchItems = createAsyncThunk("items/fetchItems", async (uid) => {
  const q = query(collection(db, "transactions"), where("uid", "==", uid));
  let resultArr = [];

  let querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    let result = {
      id: doc.id,
      data: doc.data(),
    };
    resultArr.push(result);
  });
  const createSort = (a, b) => {
    let dateA = new Date(a.data.date);
    let dateB = new Date(b.data.date);
    return dateB - dateA;
  };
  return resultArr.sort(createSort);
});

const itemsSlice = createSlice({
  name: "items",
  initialState: {
    isLoading: false,
    data: [],
    forDashboard: [],
    searchArr: [],
    err: "",
  },
  reducers: {
    searchItem: (state, action) => {
      state.data = state.searchArr.filter((item) =>
        item.data.transactionTitle
          .toLowerCase()
          .trim()
          .includes(action.payload.toLowerCase().trim())
      );
    },
    filterItem: (state, action) => {
      if (action.payload == "all") {
        state.data = state.searchArr;
      } else {
        state.data = state.searchArr.filter((item) => {
          return item.data.category == action.payload;
        });
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchItems.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchItems.fulfilled, (state, action) => {
      state.data = action.payload;
      state.searchArr = action.payload;
      state.forDashboard = action.payload;
      state.err = "";
      state.isLoading = false;
    });
    builder.addCase(fetchItems.rejected, (state, action) => {
      state.err = action.payload;
      state.isLoading = false;
      state.data = [];
      state.searchArr = [];
      state.forDashboard = [];
    });
  },
});

export default itemsSlice.reducer;
export const { searchItem, filterItem, dateSorted } = itemsSlice.actions;
