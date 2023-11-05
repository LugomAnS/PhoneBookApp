import { observer } from "mobx-react-lite";
import { ContactDetails } from "../../../app/models/contact";
import { Button, Grid, Image } from "semantic-ui-react";
import { useStore } from "../../../app/stores/store";
import PhotoUploadModal from "../../photo/PhotoUploadModal";

interface Props {
  contact: ContactDetails | null;
}

export default observer(function ContactHeader({contact}: Props) {
  const {profileStore: {uploadContactPhoto, deleteContactPhoto, loadingPhoto}, modalStore: {openModal}} = useStore();
  return (
    <Grid.Column width={15} style={{fontSize: '24px'}}>
      <Grid verticalAlign='middle'>
        <Grid.Column width={4}>
          <Image src={contact?.image || '/src/assets/user.png'} size='small' floated='left' />
          <Button.Group vertical>
            <Button positive content='Добавить фото' onClick={() => openModal(<PhotoUploadModal uploadPhoto={uploadContactPhoto}/>, 'small')}
              loading={loadingPhoto}
            />
            <Button negative content="Удалить фото" onClick={() => deleteContactPhoto()}
              loading={loadingPhoto} disabled={contact!.image === undefined}
            />
          </Button.Group>
        </Grid.Column>
        <Grid.Column width={3}>
          <p>{"Фамилия: "}</p>
          <p>{"Имя: "}</p>
          <p>{"Отчество:"}</p>
        </Grid.Column>
        <Grid.Column width={9}>
          <p>{contact?.surname }</p>
          <p>{contact?.name || <span style={{fontStyle: 'italic'}}>{"<пусто>"}</span> }</p>
          <p>{contact?.patronymic || <span style={{fontStyle: 'italic'}}>{"<пусто>"}</span> }</p>
        </Grid.Column>
      </Grid>
    </Grid.Column>
  )
})
