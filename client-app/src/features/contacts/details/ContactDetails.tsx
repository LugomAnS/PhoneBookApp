import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { Button,Grid, Label, Popup, Segment} from "semantic-ui-react";
import { useStore } from "../../../app/stores/store";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import ContactIndexPage from "./ContactIndexPage";
import ContactHeader from "./ContactHeader";
import ContactAddress from "./ContactAddress";
import ContactPhonesList from "./ContactPhonesList";

export default observer(function ContactDetails() {
  const {profileStore: {selectedContact, loadContactDetails, loadingDetails}} = useStore();
  const {id} = useParams();

  useEffect(() => {
    if(id) {
      loadContactDetails(id);
    }
  }, [loadContactDetails, id])

  if(loadingDetails) return <LoadingComponent content="Загрузка информации о контакте..."/>
  if(selectedContact == null) return <ContactIndexPage />

  return (
    <>
      <Grid>
        <Grid.Row>
            <ContactHeader contact={selectedContact!} />
          <Grid.Column width={1}>
            <Button.Group vertical floated='right'>
              <Popup hoverable
                position='left center'
                trigger={
                  <Button icon='close' as={Link} to='/contacts' size="tiny"/>
                }
              ><p>Закрыть</p></Popup>
              <Popup hoverable
                position='left center'
                trigger={
                  <Button icon='edit' size="tiny" positive/>
                }
              ><p>Редактировать</p></Popup>
              <Popup hoverable
                position='left center'
                trigger={
                  <Button icon='trash' size="tiny" negative/>
                }
              ><p>Удалить контакт</p></Popup>
            </Button.Group>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column width={16}>
            <Segment attached>
              <Label attached="top" content="Описание" />
              <p>{selectedContact?.description}</p>
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
