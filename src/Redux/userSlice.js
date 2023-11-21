import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    user: {
      uid: "",
      displayName: "",
    },
    isLoading: false,
  },
  reducers: {
    updateLoginState: (state, action) => {
      state.isLoading = true;
      state.user = action.payload;
      state.isLoading = false;
    },
    updateLogoutState: (state) => {
      state.isLoading = true;
      state.user = { uid: "", displayName: "" };
      state.isLoading = false;
    },
  },
});

export default userSlice.reducer;
export const { updateLoginState, updateLogoutState } = userSlice.actions;
