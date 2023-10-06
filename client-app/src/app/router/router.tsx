import { RouteObject, createBrowserRouter } from "react-router-dom";
import App from "../layout/App";
import AuthRequired from "./AuthRequired";
import HomePage from "../../features/home/HomePage";

export const routes: RouteObject[] = [
  {
    path: '/',
    element: <App />,
    children: [
      {
        element: <AuthRequired />,
        children: [
          { path: '', element: <HomePage /> },
          { path: 'contacts', element: <div>Test Element</div> }
        ]
      }
    ]
  },
]

export const router = createBrowserRouter(routes);
