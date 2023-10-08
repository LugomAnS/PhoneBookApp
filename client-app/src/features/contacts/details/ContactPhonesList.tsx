import { observer } from "mobx-react-lite";
import { Phone } from "../../../app/models/contact";
import { Button, Grid, Label, List, Segment } from "semantic-ui-react";

interface Props {
  phones: Phone[] | null;
}

export default observer(function ContactPhoneList({phones}: Props) {
  return (
    <Grid.Column width={16}>
      <Segment attached>
        <Label attached='top' content='Список номеров' />
          <List>
            {phones ? (
              phones.map(p => (
                <List.Item key={p.id}>
                  <Grid verticalAlign="middle">
                    <Grid.Column width={2}>
                      <div>{(p.type || "<Без категории>") + ": "}</div>
                    </Grid.Column>
                    <Grid.Column width={4}>
                      <div>{"+" + p.phoneNumber}</div>
                    </Grid.Column>
                    <Grid.Column width={10}>
                      <Button.Group size='tiny' floated="right">
                        <Button icon='edit' />
                        <Button icon='delete' />
                      </Button.Group>
                    </Grid.Column>
                  </Grid>
                </List.Item>
              ))
            ) : <div style={{fontStyle: 'italic'}}>Нет добавленных номеров</div>}
          </List>
      </Segment>
    </Grid.Column>
  )
})
