import { Navigate, RouteObject, createBrowserRouter } from "react-router-dom";
import App from "../layout/App";
import AuthRequired from "./AuthRequired";
import HomePage from "../../features/home/HomePage";
import NotFound from "../../features/errors/NotFound";
import ContactsDashboard from "../../features/contacts/ContactsDashboard";
import ContactDetails from "../../features/contacts/ContactDetails";

export const routes: RouteObject[] = [
  {
    path: '/',
    element: <App />,
    children: [
      {
        element: <AuthRequired />,
        children: [
          { path: '', element: <HomePage /> },
          { path: 'contacts/*', element: <ContactsDashboard />,
            children: [
              { path: ':id', element: <ContactDetails />}
            ]
          }
        ]
      },
      { path: 'not-found', element: <NotFound />},
      { path: '*', element: <Navigate to='not-found'/>}
    ],
  },
]

export const router = createBrowserRouter(routes);
