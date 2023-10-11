import { Navigate, RouteObject, createBrowserRouter } from "react-router-dom";
import App from "../layout/App";
import AuthRequired from "./AuthRequired";
import HomePage from "../../features/home/HomePage";
import NotFound from "../../features/errors/NotFound";
import ContactsDashboard from "../../features/contacts/dashboard/ContactsDashboard";
import ContactDetails from "../../features/contacts/details/ContactDetails";
import ContactIndexPage from "../../features/contacts/details/ContactIndexPage";
import ContactForm from "../../features/contacts/form/ContactForm";

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
              { index: true, element: <ContactIndexPage />},
              { path: ':id', element: <ContactDetails />},
              { path: 'create', element: <ContactForm key='create'/>},
              { path: ':id/edit', element: <ContactForm key='edit'/>}
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
