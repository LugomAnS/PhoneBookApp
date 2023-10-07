import { observer } from "mobx-react-lite";
import { useStore } from "../../app/stores/store";
import { Button, Grid, Header, List, Segment } from "semantic-ui-react";
import { useEffect } from "react";
import LoadingComponent from "../../app/layout/LoadingComponent";
import ContactListItem from "./ContactListItem";
import { Outlet } from "react-router-dom";

export default observer(function ContactsDashboard() {
  const {profileStore} = useStore();
  const {contactsList, loadProfile, loadingContacts, contacts} = profileStore;

  useEffect(() => {
    loadProfile();
  }, [loadProfile])

  if(loadingContacts) return <LoadingComponent content="Загрузка контактов" />

  return(
    <Segment style={{borderRadius: '15px'}}>
      <Grid divided>
        <Grid.Column width={4}>
          <Button
            primary
            fluid
            content="Добавить контакт"
          />
          {contacts.size > 0 ? (
            <List selection>
              {contactsList.map(e => (
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
