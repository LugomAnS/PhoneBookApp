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
  const {modalStore: {openModal}} = useStore();
  return (
    <Grid.Column width={15} style={{fontSize: '24px'}}>
      <Grid verticalAlign='middle'>
        <Grid.Column width={4}>
          <Image src={user.imageUrl || '/src/assets/user.png'} size='small' floated='left' />
          <Button positive content='Добавить фото' onClick={() => openModal(<PhotoUploadModal uploadPhoto={uploadPhoto} />, 'small')} />
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
