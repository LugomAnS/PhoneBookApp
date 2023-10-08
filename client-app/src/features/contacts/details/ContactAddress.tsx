import { observer } from "mobx-react-lite";
import { Grid, Label, Segment } from "semantic-ui-react";
import { ContactAddress } from "../../../app/models/contact";

interface Props {
  address: ContactAddress | null
}

export default observer(function ContactAddress({address}: Props) {
  return (
    <Grid.Column width={16}>
      <Segment attached>
        <Label attached='top' content="Адрес" />
        {address ? (
          <Grid verticalAlign='middle'>
            <Grid.Column width={2}>
              <p>{"Город: "}</p>
              <p>{"Улица: "}</p>
              <p>{"Дом: "}</p>
              <p>{"Квартира: "}</p>
            </Grid.Column>
            <Grid.Column width={4}>
              <p>{address.city || <span style={{fontStyle: 'italic'}}>{"<Не указано>"}</span>}</p>
              <p>{address.venue || <span style={{fontStyle: 'italic'}}>{"<Не указано>"}</span>}</p>
              <p>{address.house || <span style={{fontStyle: 'italic'}}>{"<Не указано>"}</span>}</p>
              <p>{address.flat || <span style={{fontStyle: 'italic'}}>{"<Не указано>"}</span>}</p>
            </Grid.Column>
          </Grid>
        ) : (
          <div style={{fontStyle: 'italic'}}>Информация об адресе отсутствует</div>
        )}
      </Segment>
    </Grid.Column>
  )
})
