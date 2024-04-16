import { createBrowserRouter } from "react-router-dom";
import Layout from "@/layout/index";
import Login from "@/pages/Login/Login";
import Student from "@/pages/Student/Student";
import Index from "@/pages/Index/Index";

export const menu: any = [
    {
        path: "/index",
        label: "看板",
        element: <Index />,
    },
    {
        path: "/stuList",
        label: "学生列表",
        element: <Student />,
    },
];

const router = createBrowserRouter([
    { path: "/", element: <Layout />, children: menu },
    { path: "/login", element: <Login /> },
]);

export default router;
