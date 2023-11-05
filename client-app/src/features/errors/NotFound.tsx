import { Link } from "react-router-dom";
import { Button, Header, Icon, Segment } from "semantic-ui-react";

export default function NotFound() {
  return (
    <Segment placeholder>
      <Header icon>
        <Icon name='search' />
        Что-то пошло не так, искомый ресурс не найден!
      </Header>
      <Segment.Inline>
        <Button as={Link} to='/contacts'>
          Вернуться к контактам
        </Button>
      </Segment.Inline>
    </Segment>
  )
}
