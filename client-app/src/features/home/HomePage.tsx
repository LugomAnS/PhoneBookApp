import { observer } from "mobx-react-lite"
import { Container, Header, Segment, Divider, List, Button } from "semantic-ui-react"
import { useStore } from "../../app/stores/store"
import LoginForm from "../user/LoginForm";
import RegistryForm from "../user/RegistryForm";

export default observer(function HomePage() {
  const {userStore, modalStore} = useStore();
  return (
    <Segment textAlign='center' vertical>
      <Container text>
        <Header content='Телефонная книга' as='h1' style={{marginTop: 125}}/>
        <Divider />
        <p>
          Приложение для ведения списка контактов.<br /> Вы можете зарегистрироваться либо воспользоваться тестовой учетной записью.
        </p>
        <Divider />
        <List>
          <List.Item>Логин: test@test.com</List.Item>
          <List.Item>Пароль: Pa$$w0rd</List.Item>
        </List>
        <Divider />
        {userStore.isLogedIn ? (
          <Button content='Перейти к контактам' onClick={() => userStore.logout()}/>
        ) : (
          <>
            <Button inverted color='green' content='Войти' onClick={() => modalStore.openModal(<LoginForm />)}/>
            <Button primary color='green' content='Зарегистрироваться' onClick={() => modalStore.openModal(<RegistryForm />)}/>
          </>
        )}
      </Container>
    </Segment>
  )
})
