import { Header, Icon, Segment } from "semantic-ui-react";

export default function ContactIndexPage() {
  return (
    <Segment placeholder>
      <Header icon>
        <Icon name='search' />
        Выберите контакт для отображения
      </Header>
    </Segment>
  )
}
