import { observer } from "mobx-react-lite";
import { Button, Grid, Label, Popup, Segment } from "semantic-ui-react";
import { useStore } from "../../../app/stores/store";
import { useEffect, useState } from "react";
import UserHeader from "./UserHeader";
import { Link } from "react-router-dom";
import CategoriesList from "../categories/CategoriesList";
import UserForm from "../form/UserForm";
import ProfilePagePlaceholder from "../../placeholders/ProfilePagePlaceholder";

export default observer(function UserProfilePage() {
  const {userStore: {user, loginCurrentUser, loading, uploadPhoto}, profileStore: {loadProfile, loadingContacts}} = useStore();
  const [isEdit, setIsEdit] = useState(false);

  useEffect(() => {
    if(user === null)
      loginCurrentUser();
      loadProfile()
  }, [user, loginCurrentUser, loadProfile])

  if(loading || loadingContacts) return <ProfilePagePlaceholder />

  return (
    <Segment>
      {isEdit ? (
        <UserForm setIsEdit={setIsEdit} />
      ) : (
      <Grid>
        <Grid.Row>
          <UserHeader user={user!} uploadPhoto={uploadPhoto} />
          <Grid.Column width={1}>
            <Button.Group vertical floated='right'>
              <Popup hoverable
              position='left center'
              trigger={
              <Button icon='close' size="tiny" as={Link} to='/contacts'/>
              }
              ><p>Закрыть</p></Popup>
              <Popup hoverable
              position='left center'
              trigger={
              <Button icon='edit' size="tiny" positive onClick={() => setIsEdit(true)}
              />
              }
              ><p>Редактировать</p></Popup>
            </Button.Group>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column width={16}>
          <Segment attached>
            <Label attached="top" content='Список категорий' />
            <CategoriesList />
          </Segment>
          </Grid.Column>
        </Grid.Row>
      </Grid>
      )}

    </Segment>
  )
})
