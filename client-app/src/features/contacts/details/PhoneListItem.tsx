import { observer } from "mobx-react-lite";
import { Phone } from "../../../app/models/contact";
import { Button, Grid, List } from "semantic-ui-react";
import { useStore } from "../../../app/stores/store";
import { SyntheticEvent, useState } from "react";

interface Props {
  phone: Phone
}

export default observer(function PhoneListItem({phone}: Props) {
  const {profileStore: {selectedContact, deletePhone, loadingPhone}} = useStore();
  const [target, setTarget] = useState('');

  function handlePhoneDelete(e: SyntheticEvent<HTMLButtonElement>) {
    setTarget(e.currentTarget.name);
    deletePhone(phone.id!);
  }
  return (
  <List.Item >
    <Grid verticalAlign="middle">
      <Grid.Column width={2}>
        <div>{(phone.type || "<Без категории>") + ": "}</div>
      </Grid.Column>
      <Grid.Column width={4}>
        <div>{"+" + phone.phoneNumber}</div>
      </Grid.Column>
      <Grid.Column width={10}>
        <Button.Group size='tiny' floated="right">
          <Button icon='edit'/>
          <Button icon='trash'
            name={phone.id}
            loading={target == phone.id && loadingPhone}
            onClick={(e) => handlePhoneDelete(e)}
          />
        </Button.Group>
      </Grid.Column>
    </Grid>
  </List.Item>
  )
})
