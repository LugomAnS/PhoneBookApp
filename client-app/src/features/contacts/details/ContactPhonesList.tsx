import { observer } from "mobx-react-lite";
import { Phone } from "../../../app/models/contact";
import { Button, Grid, Label, List, Segment } from "semantic-ui-react";
import PhoneListItem from "./PhoneListItem";
import { useStore } from "../../../app/stores/store";
import PhoneForm from "../form/PhoneForm";

interface Props {
  phones: Phone[] | null;
}

export default observer(function ContactPhoneList({phones}: Props) {
  const {profileStore:{addingPhone, setAddingPhone}} = useStore();

  return (
    <Grid.Column width={16}>
      <Segment attached>
        <Label attached='top' content='Список номеров' />
          <List>
            {phones !== null && phones.length > 0 ? (
              phones.map(p => (
                <PhoneListItem key={p.id} phone={p} />
              ))
            ) : <div style={{fontStyle: 'italic'}}>Нет добавленных номеров</div>}
          </List>
          {addingPhone &&
          <PhoneForm />}
          {!addingPhone &&
          <Button content="Добавить телефон" icon="plus" fluid
            onClick={() => setAddingPhone(true)}
          />}
      </Segment>
    </Grid.Column>
  )
})
