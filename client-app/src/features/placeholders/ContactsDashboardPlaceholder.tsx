import { Button, Card, Divider, Grid, Placeholder, Search, Segment } from "semantic-ui-react";
import ContactDetailsPlaceholder from "./ContactDetailsPlaceholder";

export default function ContactsDashboardPlaceholder() {
  return (
    <Segment style={{borderRadius: '15px'}}>
      <Grid divided>
        <Grid.Column width={4}>
        <Button disabled={true}
            primary
            fluid
            content="Добавить контакт"
            icon='add'
          />
          <Divider />
            <Search
              size="large"
              showNoResults={false}
              placeholder="Поиск"
            />

          <Card.Group style={{marginTop: 15}}>
            <Card style={{borderRadius: '15px', minHeight: 60, padding: 10}}>
              <Placeholder>
                <Placeholder.Header image>
                  <Placeholder.Line />
                  <Placeholder.Line />
                </Placeholder.Header>
              </Placeholder>
            </Card>

            <Card style={{borderRadius: '15px', minHeight: 60, padding: 10}}>
              <Placeholder>
                <Placeholder.Header image>
                  <Placeholder.Line />
                  <Placeholder.Line />
                </Placeholder.Header>
              </Placeholder>
            </Card>

            <Card style={{borderRadius: '15px', minHeight: 60, padding: 10}}>
              <Placeholder>
                <Placeholder.Header image>
                  <Placeholder.Line />
                  <Placeholder.Line />
                </Placeholder.Header>
              </Placeholder>
            </Card>
          </Card.Group>

        </Grid.Column>
        <Grid.Column width={12}>
          <ContactDetailsPlaceholder />
        </Grid.Column>
      </Grid>
    </Segment>
  )
}
