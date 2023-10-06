import { observer } from "mobx-react-lite";
import { useStore } from "../stores/store";
import { Navigate, Outlet, useLocation } from "react-router-dom";

export default observer(function AuthRequired() {
  const {userStore: {isLogedIn}} = useStore();
  const location = useLocation();

  if(!isLogedIn)
    <Navigate to='/' state={{from: location}} />

  return <Outlet />
})
