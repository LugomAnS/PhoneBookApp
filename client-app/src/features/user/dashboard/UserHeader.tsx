import { Button, Grid, Image } from "semantic-ui-react";
import { User } from "../../../app/models/user";
import { observer } from "mobx-react-lite";
import { useStore } from "../../../app/stores/store";
import PhotoUploadModal from "../../photo/PhotoUploadModal";

interface Props {
  user: User;
  uploadPhoto: (file: Blob) => void;
}

export default observer(function UserHeader({user, uploadPhoto}: Props) {
  const {modalStore: {openModal}, userStore: {photoUploading, deletePhoto}} = useStore();
  return (
    <Grid.Column width={15} style={{fontSize: '24px'}}>
      <Grid verticalAlign='middle'>
        <Grid.Column width={4}>
          <Image src={user.image || '/src/assets/user.png'} size='small' floated='left' />
          <Button.Group vertical>
            <Button positive content={user.image ? "Заменить фото" : "Добавить фото"}
              onClick={() => openModal(<PhotoUploadModal uploadPhoto={uploadPhoto} />, 'small')}
              loading={photoUploading}
            />
            <Button negative content="Удалить фото" onClick={() => deletePhoto()}
              loading={photoUploading} disabled={user.image === undefined}
            />
          </Button.Group>
        </Grid.Column>
        <Grid.Column width={3}>
          <p>{"Фамилия: "}</p>
          <p>{"Имя: "}</p>
          <p>{"Отчество:"}</p>
        </Grid.Column>
        <Grid.Column width={9}>
          <p>{user.surname }</p>
          <p>{user.name || <span style={{fontStyle: 'italic'}}>{"<пусто>"}</span> }</p>
          <p>{user.patronymic || <span style={{fontStyle: 'italic'}}>{"<пусто>"}</span> }</p>
        </Grid.Column>
      </Grid>
    </Grid.Column>
  )
})
