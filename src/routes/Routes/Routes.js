import { createBrowserRouter } from "react-router-dom";
import Main from "../../layout/Main/Main";
import Home from "../../pages/Home/Home";
import AddEmployee from "../../pages/AddEmployee/AddEmployee";

export const routes = createBrowserRouter([
    {
        path:"/",
        element:<Main></Main>,
        children:[
            {
                path:"/",
                element:<Home></Home>
            },
            {
                path:"/add-employee",
                element:<AddEmployee></AddEmployee>
            }
        ]
    }
])