import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { User } from "../types";

interface UserState {
  data: User | null; 
  isInitializing: boolean;
}

const initialState: UserState = {
  data: null,
  isInitializing: true,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      state.data = action.payload;
      state.isInitializing = false;
    },
    resetUser: (state) => {
      state.data = null;
      state.isInitializing = false;
    },
  },
});

export const { setUser, resetUser } = userSlice.actions;
export default userSlice.reducer;
