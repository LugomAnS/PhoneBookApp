import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Button,Grid, Header, Label, Popup, Segment} from "semantic-ui-react";
import { useStore } from "../../../app/stores/store";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import ContactIndexPage from "./ContactIndexPage";
import ContactHeader from "./ContactHeader";
import ContactAddress from "./ContactAddress";
import ContactPhonesList from "./ContactPhonesList";
import { router } from "../../../app/router/router";
import { ServerErrorMessage } from "../../../app/models/errorMessage";

export default observer(function ContactDetails() {
  const {profileStore: {selectedContact, loadContactDetails, loadingDetails, deleteContact, setSelectedContact}} = useStore();
  const {id} = useParams();
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if(id) {
      if(id !== selectedContact?.id)
        loadContactDetails(id);
    }
  }, [loadContactDetails, id, selectedContact])

  function handleDeleteContact() {
    setDeleting(true);
    deleteContact().catch((error) => {
      if(error) {
        error.array.forEach(({message}: ServerErrorMessage ) => {
          setError(message);
        });
      }
    }).then(() => {
    //  setDeleting(false);
      router.navigate('/contacts');
    });
  }

  function handleCloseDetailsForm() {
    router.navigate('/contacts');
    setSelectedContact(null);
  }

  if(loadingDetails) return <LoadingComponent content="Загрузка информации о контакте..."/>
  if(selectedContact == null) return <ContactIndexPage />

  return (
    <>
      <Grid>
        <Grid.Row>
            {error && (
              <Header color="red" content={error} />
            )}
            <ContactHeader contact={selectedContact!} />
          <Grid.Column width={1}>
            <Button.Group vertical floated='right'>
              <Popup hoverable
                position='left center'
                trigger={
                  <Button icon='close' onClick={() => handleCloseDetailsForm()} size="tiny"/>
                }
              ><p>Закрыть</p></Popup>
              <Popup hoverable
                position='left center'
                trigger={
                  <Button icon='edit' size="tiny" positive
                    as={Link} to={`/contacts/${selectedContact.id}/edit`}
                  />
                }
              ><p>Редактировать</p></Popup>
              <Popup hoverable
                position='left center'
                trigger={
                  <Button icon='trash' size="tiny" negative
                    loading={deleting}
                    onClick={() => handleDeleteContact()}
                  />
                }
              ><p>Удалить контакт</p></Popup>
            </Button.Group>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column width={16}>
            <Segment attached>
              <Label attached="top" content="Описание" />
              {selectedContact?.description ? (
                <p>{selectedContact.description}</p>
              ) : (
                <p style={{fontStyle: 'italic'}}>Описание не добавлено</p>
              )}
            </Segment>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <ContactAddress address={selectedContact?.contactAddress ? selectedContact.contactAddress : null} />
        </Grid.Row>
        <Grid.Row>
          <ContactPhonesList phones={selectedContact?.phones ? selectedContact.phones : null}/>
        </Grid.Row>
      </Grid>
    </>
  )
})
