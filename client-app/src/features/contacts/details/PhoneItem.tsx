import { observer } from "mobx-react-lite";
import { Phone } from "../../../app/models/contact";
import { Grid } from "semantic-ui-react";

interface Props {
  phone: Phone
}

export default observer(function PhoneItem({phone}: Props) {
  return (
    <>
      <Grid.Column width={2}>
        <div>{(phone.type || "<Без категории>") + ":"}</div>
      </Grid.Column>
      <Grid.Column width={4}>
        <div>{phone.phoneNumber}</div>
      </Grid.Column>
    </>
  )
})
