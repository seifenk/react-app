import { createBrowserRouter } from "react-router-dom";
import Layout from "@/layout/index";
import Login from "@/pages/Login/Login";
import Student from "@/pages/Student/Student";
import Index from "@/pages/Index/Index";
import Profile from "@/pages/Profile/index";
import Page404 from "@/pages/404/404";
import Map from "@/pages/Map/Index";
import EchartsIns from "@/pages/EchartsIns/index";

export const menu = [
    {
        path: "charts",
        label: "看板",
        element: <EchartsIns />,
    },
    {
        path: "comp",
        label: "组件",
        element: <Index />,
    },
    {
        path: "stuList",
        label: "学生列表",
        element: <Student />,
    },
    {
        path: "profile",
        label: "个人信息",
        element: <Profile />,
    },
    {
        path: "map",
        label: "地图",
        element: <Map />,
    },
];

export const routes = [
    {
        path: "/",
        element: <Layout />,
        children: menu,
    },
    { path: "/login", element: <Login /> },
    { path: "/*", element: <Page404 /> },
];

const router = createBrowserRouter(routes);

export default router;
