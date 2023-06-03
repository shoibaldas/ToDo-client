import { createBrowserRouter } from "react-router-dom";
import Main from "../../layout/Main/Main";
import Home from "../../pages/Home/Home";
import AddEmployee from "../../pages/AddEmployee/AddEmployee";
import CreateTask from "../../pages/CreateTask/CreateTask";

export const routes = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/add-employee",
        element: <AddEmployee></AddEmployee>,
      },
      {
        path: "/create-task",
        element: <CreateTask></CreateTask>,
      },
    ],
  },
]);
