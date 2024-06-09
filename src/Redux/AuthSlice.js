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
    updateUser(state, action) {
      state.user = {
        ...state.user,
        ...action.payload,
      };
    },
  },
});

export const { SetUsers, clearUser, updateUser } = AuthSlice.actions;
export default AuthSlice.reducer;

export const logout = async (dispatch) => {
  dispatch(clearUser());
};
