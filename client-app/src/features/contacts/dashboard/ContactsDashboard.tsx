import { observer } from "mobx-react-lite";
import { useStore } from "../../../app/stores/store";
import { Button, Divider, Grid, Header, List, Search, Segment } from "semantic-ui-react";
import { useEffect } from "react";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import ContactListItem from "./ContactListItem";
import { Link, Outlet } from "react-router-dom";

export default observer(function ContactsDashboard() {
  const {profileStore} = useStore();
  const {loadProfile, loadingContacts, contacts, setContactFilter, filteredList} = profileStore;

  useEffect(() => {
    loadProfile();
  }, [loadProfile])


  if(loadingContacts) return <LoadingComponent content="Загрузка контактов" />

  return(
    <Segment style={{borderRadius: '15px'}}>
      <Grid divided>
        <Grid.Column width={4}>
          <Button as={Link} to='/contacts/create'
            primary
            fluid
            content="Добавить контакт"
            icon='add'
          />
          <Divider />
            <Search
              size="large"
              showNoResults={false}
              placeholder="Поиск"
              resultRenderer={() => <></>}
              onSearchChange={(_, values) => setContactFilter(values.value as string)}
            />
          {contacts.size > 0 ? (
            <List selection>
              {filteredList.map(e => (
                <ContactListItem key={e.id} contact={e} />
              ))}
            </List>
          ) : (
            <Header as='h3' textAlign='center' content='Нет контактов' style={{fontStyle: 'italic'}}  />
          )}
        </Grid.Column>
        <Grid.Column width={12}>
          <Outlet />
        </Grid.Column>
      </Grid>
    </Segment>
  )
})
