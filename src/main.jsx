import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import SignUpPage from "./pages/signUp";
import { Provider } from "react-redux";
import store from "./redux/store";
import HomePage from "./pages/home";
import JoinQuizPage from "./pages/joinQuiz";
import QuizPlayPage from "./pages/quizPlay";
import QuizPage from "./pages/quiz";
import QuestionPage from "./pages/question";
import QuizAddPage from "./pages/quizAdd";
import AddQuestion from "./pages/questionAdd";
import EditQuestion from "./pages/questionEdit";
import QuizEditPage from "./pages/quizEdit";
import QuizResult from "./pages/quizResult";
import Leaderboard from "./pages/leaderboard";
import ActivityPage from "./pages/activity";
import SignInPage from "./pages/signIn";
import ModulePage from "./pages/module";
import ModuleDetailPage from "./pages/moduleDetail";
import AddModule from "./pages/moduleAdd";
import EditModule from "./pages/moduleEdit";
import SearchModule from "./pages/searchModule";
import ProtectedRoute from "./routes/ProtectedRoute";
import NotFoundPage from "./pages/notfound";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
    },
  },
});

const router = createBrowserRouter([
  {
    path: "/login",
    element: <SignInPage />,
  },
  {
    path: "/signup",
    element: <SignUpPage />,
  },
  {
    element: <ProtectedRoute allowedRoles={["student", "teacher"]} />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      { path: "/module/:id", element: <ModuleDetailPage /> },
      { path: "/leaderboard/:quizId", element: <Leaderboard /> },
    ],
  },
  {
    element: <ProtectedRoute allowedRoles={["student"]} />,
    children: [
      { path: "/activity", element: <ActivityPage /> },
      { path: "/join-quiz", element: <JoinQuizPage /> },
      { path: "/quiz/in/:quizId", element: <QuizPlayPage /> },
      { path: "/search-module", element: <SearchModule /> },
      { path: "/result-quiz/:id", element: <QuizResult /> },
    ],
  },
  {
    element: <ProtectedRoute allowedRoles={["teacher"]} />,
    children: [
      { path: "/quiz", element: <QuizPage /> },
      { path: "/quiz/add", element: <QuizAddPage /> },
      { path: "/quiz/view/:quizId", element: <QuestionPage /> },
      { path: "/quiz/edit/:quizId", element: <QuizEditPage /> },
      { path: "/question/add", element: <AddQuestion /> },
      { path: "/question/edit", element: <EditQuestion /> },
      { path: "/module", element: <ModulePage /> },
      { path: "/module/add", element: <AddModule /> },
      { path: "/module/edit/:id", element: <EditModule /> },
    ],
  },
  {
    path: "*",
    element: <NotFoundPage />,
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </Provider>
  </StrictMode>
);
