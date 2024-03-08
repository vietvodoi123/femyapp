import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface IPageSlice {
  pageTotal: number;
  pageSize: number;
  current: number;
}

const initialState: IPageSlice = {
  pageTotal: 1,
  pageSize: 18,
  current: 1,
};

const PageSlice = createSlice({
  name: "page",
  initialState,
  reducers: {
    initPage: (state, actions: PayloadAction<IPage>) => {
      state.pageTotal = actions.payload.pageTotal;
      state.pageSize = actions.payload.pageSize;
    },
    setPage: (state, actions: PayloadAction<number>) => {
      state.current = actions.payload;
    },
  },
});

export const { initPage, setPage } = PageSlice.actions;

export default PageSlice.reducer;
