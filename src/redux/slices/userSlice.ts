import { createSlice } from "@reduxjs/toolkit";
import { User } from "firebase/auth";

export interface IUserState {
  currentUser: User | null | undefined;
  loading: boolean;
  error: string | null;
}
const initialState: IUserState = {
  currentUser: null,
  loading: true,
  error: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setCurrentUser: (state, action) => {
      state.currentUser = action.payload;
    },
  },
});

export const { setCurrentUser } = userSlice.actions;

export default userSlice;
