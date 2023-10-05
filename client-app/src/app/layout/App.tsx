import { observer } from "mobx-react-lite"
import { useStore } from "../stores/store"
import { useEffect } from "react";
import LoadingComponent from "./LoadingComponent";
import { Container } from "semantic-ui-react"
import { useLocation } from "react-router-dom";
import HomePage from "../../features/home/HomePage";
import ModalContainer from "../common/modal/ModalContainer";

export default observer(function App() {
  const location = useLocation();
  const {commonStore, userStore} = useStore();

  useEffect(() => {
    if(commonStore.token) {
      userStore.loginCurrentUser().finally(() => commonStore.setAppLoaded());
    } else {
      commonStore.setAppLoaded();
    }
  }, [userStore, commonStore])

  if(!commonStore.appLoaded) return <LoadingComponent content="Загрузка приложения..."/>

  return (
    <>
      <ModalContainer />

      {location.pathname === '/' ? (<HomePage />) : (
        <Container>
          <div>
            Test
          </div>
        </Container>
      )}
    </>
  )
})
