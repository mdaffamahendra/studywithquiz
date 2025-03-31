import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { postData, getData, editData, deleteData } from "../../fetch";

export const fetchQuizzes = createAsyncThunk(
  "quiz/fetchQuizzes",
  async ({ url, token }, { rejectWithValue }) => {
    try {
      const data = await getData(url, token);
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const fetchQuizById = createAsyncThunk(
  "quiz/fetchQuizById",
  async ({ url, token }, { rejectWithValue }) => {
    try {
      const data = await getData(url, token);
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const addQuiz = createAsyncThunk(
  "quiz/addQuiz",
  async ({ url, newQuiz, token }, { rejectWithValue }) => {
    try {
      const data = await postData(url, newQuiz, token);
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const editQuiz = createAsyncThunk(
  "quiz/editQuiz",
  async ({ url, updatedQuiz, token }, { rejectWithValue }) => {
    try {
      const data = await editData(url, updatedQuiz, token);
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const deleteQuiz = createAsyncThunk(
  "quiz/deleteQuiz",
  async ({ url, token }, { rejectWithValue }) => {
    try {
      const data = await deleteData(url, token);
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const quizSlice = createSlice({
  name: "quiz",
  initialState: {
    quizzes: JSON.parse(localStorage.getItem("quizzes")) || [],
    currentQuiz: null,
    status: "idle",
    error: "",
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch all quizzes
      .addCase(fetchQuizzes.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchQuizzes.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.quizzes = action.payload;
        localStorage.setItem("quizzes", JSON.stringify(action.payload));
      })
      .addCase(fetchQuizzes.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      // Fetch quiz by ID
      .addCase(fetchQuizById.fulfilled, (state, action) => {
        state.currentQuiz = action.payload;
      })
      .addCase(addQuiz.fulfilled, (state, action) => {
        state.quizzes.push(action.payload);
        localStorage.setItem("quizzes", JSON.stringify(state.quizzes));
      })
      .addCase(addQuiz.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      // Edit quiz
      .addCase(editQuiz.fulfilled, (state, action) => {
        const index = state.quizzes.findIndex(
          (quiz) => quiz.quizId === action.payload.quizId
        );
        if (index !== -1) {
          state.quizzes[index] = action.payload;
          localStorage.setItem("quizzes", JSON.stringify(state.quizzes));
        }
      })
      // Delete quiz
      .addCase(deleteQuiz.fulfilled, (state, action) => {
        state.quizzes = state.quizzes.filter(
          (quiz) => quiz._id !== action.payload
        );
        localStorage.setItem("quizzes", JSON.stringify(state.quizzes));
      });
  },
});

export default quizSlice.reducer;
