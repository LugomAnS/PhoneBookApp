import { Grid, Image } from "semantic-ui-react";
import { User } from "../../../app/models/user";
import { observer } from "mobx-react-lite";

interface Props {
  user: User;
}

export default observer(function UserHeader({user}: Props) {
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
          <p>{user.surname }</p>
          <p>{user.name || <span style={{fontStyle: 'italic'}}>{"<пусто>"}</span> }</p>
          <p>{user.patronymic || <span style={{fontStyle: 'italic'}}>{"<пусто>"}</span> }</p>
        </Grid.Column>
      </Grid>
    </Grid.Column>
  )
})
