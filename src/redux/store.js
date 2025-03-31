import { configureStore } from "@reduxjs/toolkit";
import AuthSlice from "./slice/UsersSlice";
import quizSlice from "./slice/QuizSlice";
import questionSlice from "./slice/QuestionSlice";
import moduleSlice from "./slice/ModuleSlice";
const store = configureStore({
    reducer: {
        users: AuthSlice,
        quiz: quizSlice,
        question: questionSlice,
        module: moduleSlice,
    }
})

store.subscribe(() => {
    // console.log("Store change : ", store.getState())
})

export default store