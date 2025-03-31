import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { postData, getData, editData, deleteData } from "../../fetch";

export const fetchModules = createAsyncThunk(
  "module/fetchModules",
  async ({ url, token }, { rejectWithValue }) => {
    try {
      const data = await getData(url, token);
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const fetchModuleById = createAsyncThunk(
  "module/fetchModuleById",
  async ({ url, token }, { rejectWithValue }) => {
    try {
      const data = await getData(url, token);
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const addModule = createAsyncThunk(
  "module/addModule",
  async ({ url, newModule, token }, { rejectWithValue }) => {
    try {
      const data = await postData(url, newModule, token);
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const editModule = createAsyncThunk(
  "module/editModule",
  async ({ url, updatedModule, token }, { rejectWithValue }) => {
    try {
      const data = await editData(url, updatedModule, token);
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const deleteModule = createAsyncThunk(
  "module/deleteModule",
  async ({ url, token }, { rejectWithValue }) => {
    try {
      const data = await deleteData(url, token);
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const moduleSlice = createSlice({
  name: "module",
  initialState: {
    modules: JSON.parse(localStorage.getItem("modules")) || [],
    currentModule: null,
    status: "idle",
    error: "",
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchModules.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchModules.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.modules = action.payload;
        localStorage.setItem("modules", JSON.stringify(action.payload));
      })
      .addCase(fetchModules.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(fetchModuleById.fulfilled, (state, action) => {
        state.currentModule = action.payload;
      })
      .addCase(addModule.fulfilled, (state, action) => {
        state.modules.push(action.payload);
        localStorage.setItem("modules", JSON.stringify(state.modules));
      })
      .addCase(addModule.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(editModule.fulfilled, (state, action) => {
        const index = state.modules.findIndex(
          (module) => module.moduleId === action.payload.moduleId
        );
        if (index !== -1) {
          state.modules[index] = action.payload;
          localStorage.setItem("modules", JSON.stringify(state.modules));
        }
      })
      .addCase(deleteModule.fulfilled, (state, action) => {
        state.modules = state.modules.filter(
          (module) => module._id !== action.payload
        );
        localStorage.setItem("modules", JSON.stringify(state.modules));
      });
  },
});

export default moduleSlice.reducer;
