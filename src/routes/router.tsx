import { lazy, memo } from "react";
import GeneralLayout from "@/layout/GeneralLayout";
import { useRoutes, type RouteObject } from "react-router-dom";

const Login = lazy(() => import('@/page/Login/Login'));
const Home = lazy(() => import('@/page/Home/Home'));

export const routes: RouteObject[] = [
    {
        path: "/",
        element: <GeneralLayout />,
        children: 
        [
            {
                path: "home",
                element: <Home />
            },
            {
                index: true,
                element: <Login />
            }
        ]
    }, 

];

export const AppRouter = memo(() => {
  return useRoutes(routes);
});
