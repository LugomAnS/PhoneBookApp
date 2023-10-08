import { observer } from "mobx-react-lite";
import { Contact } from "../../../app/models/contact";
import { Grid, Image } from "semantic-ui-react";

interface Props {
  contact: Contact | null;
}

export default observer(function ContactHeader({contact}: Props) {
  return (
    <Grid.Column width={15} style={{fontSize: '24px'}}>
      <Grid verticalAlign='middle'>
        <Grid.Column width={4}>
          <Image src='/src/assets/user.png' size='small' floated='left' />
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
