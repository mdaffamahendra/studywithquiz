import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { deleteData, editData, getData, postData } from "../../fetch";


export const getQuestion = createAsyncThunk(
  "question/get",
  async ({ url, token }, { rejectWithValue }) => {
    try {
      const data = await getData(url, token);
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
export const getQuestionById = createAsyncThunk(
  "question/getById",
  async ({ url, token }, { rejectWithValue }) => {
    try {
      const data = await getData(url, token);
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const addQuestion = createAsyncThunk(
  "question/add",
  async ({ url, newQuestion, token }, { rejectWithValue }) => {
    try {
      const data = await postData(url, newQuestion, token);
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const editQuestion = createAsyncThunk(
  "question/edit",
  async ({ url, updatedQuestion, token }, { rejectWithValue }) => {
    try {
      const data = await editData(url, updatedQuestion, token);
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const deleteQuestion = createAsyncThunk(
  "question/delete",
  async ({url, token}) => {
    try {
        const data = await deleteData(url, token);
        return data;
      } catch (error) {
        return rejectWithValue(error);
      }
  }
);

const questionSlice = createSlice({
  name: "question",
  initialState: {
    questions: JSON.parse(localStorage.getItem("questions")) || [],
    currentQuestion: null,
    loading: false,
    error: "null",
    message: ""
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getQuestion.pending, (state) => {
        state.loading = true;
      })
      .addCase(getQuestion.fulfilled, (state, action) => {
        state.loading = false;
        state.questions = action.payload;
        localStorage.setItem("questions", JSON.stringify(action.payload))
      })
      .addCase(getQuestion.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getQuestionById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentQuestion = action.payload;
      })
      .addCase(addQuestion.fulfilled, (state, action) => {;
        state.questions = [...state.questions, action.payload];
      })
      .addCase(editQuestion.fulfilled, (state, action) => {
        state.questions = state.questions.map((q) =>
          q._id === action.payload._id ? action.payload : q
        );
        localStorage.setItem("questions", JSON.stringify(state.questions));
      })
      .addCase(deleteQuestion.fulfilled, (state, action) => {
        state.questions = state.questions.filter(
          (q) => q._id !== action.payload
        );
        localStorage.setItem("questions", JSON.stringify(state.questions));
      });
  },
});

export default questionSlice.reducer;
