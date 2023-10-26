import { observer } from "mobx-react-lite";
import { Link, NavLink } from "react-router-dom";
import { Container, Dropdown, Image, Menu } from "semantic-ui-react";
import { useStore } from "../stores/store";

export default observer(function NavBar() {
  const {userStore: {displayName, logout, user}} = useStore();
  return (
    <Menu pointing secondary>
      <Container>
        <Menu.Item
          name="Главная"
          as={NavLink} to='/'
        />
        <Menu.Item
          name="Контакты"
          as={NavLink} to='contacts'
        />

        <Menu.Item position='right'>
          <Image src={user?.imageUrl || '/src/assets/user.png'} avatar spaced='right'/>
          <Dropdown pointing='top right' text={displayName}>
            <Dropdown.Menu fixed='right'>
              <Dropdown.Item text='Профиль' icon='user' as={Link} to='/profile'/>
              <Dropdown.Item text='Выйти' onClick={logout} icon='power'/>
            </Dropdown.Menu>
          </Dropdown>
        </Menu.Item>
      </Container>
    </Menu>
  )
})
