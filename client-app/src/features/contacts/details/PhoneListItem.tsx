import { observer } from "mobx-react-lite";
import { Phone } from "../../../app/models/contact";
import { Button, Grid, List } from "semantic-ui-react";
import { useStore } from "../../../app/stores/store";
import { SyntheticEvent, useState } from "react";
import PhoneItem from "./PhoneItem";
import PhoneForm from "../form/PhoneForm";

interface Props {
  phone: Phone
}

export default observer(function PhoneListItem({phone}: Props) {
  const {profileStore: {deletePhone, loadingPhone}} = useStore();
  const [target, setTarget] = useState('');
  const [isEdit, setIsEdit] = useState(false);

  function handlePhoneDelete(e: SyntheticEvent<HTMLButtonElement>) {
    setTarget(e.currentTarget.name);
    deletePhone(phone.id!);
  }
  return (
    <>
    {!isEdit ? (
      <List.Item>
      <Grid verticalAlign="middle" style={{marginTop: 0}}>
        <PhoneItem phone={phone} />
        <Grid.Column width={10}>
          <Button.Group size='tiny' floated="right">
            <Button icon='edit' onClick={() => setIsEdit(true)}/>
            <Button icon='trash'
              name={phone.id}
              loading={target == phone.id && loadingPhone}
              onClick={(e) => handlePhoneDelete(e)}
            />
          </Button.Group>
        </Grid.Column>
      </Grid>
      </List.Item>
    ): (
      <List.Item>
          <PhoneForm phone={phone} cancelEdit={setIsEdit}/>
      </List.Item>
    )}
    </>
  )
})
