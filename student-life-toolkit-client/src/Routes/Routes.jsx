import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MainLayout from "../Layout/MainLayout";
import Home from "../Pages/Home";
import ScheduleTracker from "../Pages/Schedule";
import Login from "../Common/Login";
import SignUp from "../Common/SignUp";
import PrivateRoute from "./PrivateRoute";
import ExamQuiz from "../Pages/ExamQuiz";
import GroupSubject from "../Components/ExamQuiz/GroupSubject";
import ExamQuestions from "../Components/ExamQuiz/ExamQuestions";
import StudyPlanner from "../Pages/StudyPlanner";
import Error404Page from "../Common/Error404Page";
import BudgetTracker from "../Pages/BudgetTracker";
import Dashboard from "../Pages/Dashboard";
import Motivation from "../Pages/Motivation";
import SynoAnto from "../Pages/SynoAnto";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout></MainLayout>,
    errorElement: <Error404Page></Error404Page>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/dashboard",
        element: <Dashboard></Dashboard>,
      },
      {
        path: "/schedule",
        element: <PrivateRoute><ScheduleTracker></ScheduleTracker></PrivateRoute>,
      },
      {
        path: "/budget",
        element: <PrivateRoute><BudgetTracker></BudgetTracker></PrivateRoute>,
      },
      {
        path: "/examQ&A",
        element: <PrivateRoute><ExamQuiz></ExamQuiz></PrivateRoute>,
      },
      {
        path: "/examQ&A/:stream",
        element: <PrivateRoute><GroupSubject></GroupSubject></PrivateRoute>,
      },
      {
        path: "/examQ&A/:stream/:subject",
        element: <PrivateRoute><ExamQuestions></ExamQuestions></PrivateRoute>,
      },
      {
        path: "/planner",
        element: <PrivateRoute><StudyPlanner></StudyPlanner></PrivateRoute>,
      },
      {
        path: "/motivation",
        element: <Motivation></Motivation>,
      },
      {
        path: "/translate",
        element: <SynoAnto></SynoAnto>,
      },
    ],
  },
  {
    path: "login",
    element: <Login></Login>,
  },
  {
    path: "signUp",
    element: <SignUp></SignUp>,
  },
]);

export default router;
