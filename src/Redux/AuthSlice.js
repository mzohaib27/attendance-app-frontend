import { createSlice } from "@reduxjs/toolkit";

// storage.removeItem("persist:root");

const initialState = {
  loading: null,
  error: null,
  user: null,
};

const AuthSlice = createSlice({
  name: "auth",
  initialState,

  reducers: {
    SetUsers(state, action) {
      state.user = action.payload;
      state.error = null;
    },
    clearUser(state, action) {
      state.user = null;
      state.error = null;
    },
  },
});

export const { SetUsers, clearUser } = AuthSlice.actions;
export default AuthSlice.reducer;

export const logout = async (dispatch) => {
  dispatch(clearUser());
};
